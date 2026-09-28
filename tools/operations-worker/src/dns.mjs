import { lookup as systemLookup } from 'node:dns/promises';
import { request as httpsRequest } from 'node:https';
import { request as httpRequest } from 'node:http';
import { isIP } from 'node:net';
import { DEVOPS_PROJECT_ID, OperationError, requireCondition } from './core.mjs';

export const DOMAIN='iganesha.online';
export const HOSTS=[DOMAIN,`www.${DOMAIN}`];
// Exact scoped records observed at installation; renewal may replace these IDs.
// They are reported as known certificate records, never as proof of served TLS.
const KNOWN_CERTS={
  [DOMAIN]:'cert_Aukibu0qaFS2WxmHlo3eMppR',
  [`www.${DOMAIN}`]:'cert_DGBPdJQz6UgqY4jBdJ3rdCGc',
};
const TYPES={A:1,AAAA:28,NS:2,CNAME:5};
const PROVIDERS={Google:'https://dns.google/resolve',Cloudflare:'https://cloudflare-dns.com/dns-query'};
const clean=value=>String(value??'unknown').replace(/[\x00-\x1f<>@]/g,'').slice(0,160);
const errorCode=error=>clean(error?.cause?.code || error?.code || error?.name || 'unavailable');
const normalize=name=>String(name).toLowerCase().replace(/\.$/,'');
const summary=result=>result?.ok?'available':`unavailable (${clean(result?.error)})`;
async function observed(work) {try{return {ok:true,value:await work()};}catch(error){return {ok:false,error:errorCode(error)};}}
function timedSignal(signal,ms=12000){return signal?AbortSignal.any([signal,AbortSignal.timeout(ms)]):AbortSignal.timeout(ms);}

export function localGatewayProbe(host,{signal,requestImpl=httpRequest}={}) {
  requireCondition(HOSTS.includes(host),'invalid_dns_host');
  return new Promise((resolve,reject)=>{
    const request=requestImpl({hostname:host,port:80,path:'/',method:'HEAD',signal:timedSignal(signal)},response=>{
      const value={status:response.statusCode,gatewayDnsBlock:false};
      try {
        const destination=new URL(response.headers.location);
        if([301,302,303,307,308].includes(response.statusCode) && destination.protocol==='https:' &&
          destination.hostname==='identity.security.cfdata.org' && destination.pathname==='/gateway' &&
          !destination.username && !destination.password && !destination.port && destination.searchParams.get('cf_filter')==='dns') {
          value.gatewayDnsBlock=true;value.hostname=destination.hostname;value.filter='dns';
          value.categories=destination.searchParams.getAll('cf_request_category_names').slice(0,10)
            .filter(s=>/^[A-Za-z0-9][A-Za-z0-9 ()&/,+-]{0,79}$/.test(s));
        }
      } catch {}
      // Never return Location: Gateway redirects include account/rule/query IDs
      // and the client's IP. Only the fixed host, filter and category names leave.
      response.resume();resolve(value);
    });
    request.on('error',reject);request.end();
  });
}

export function strictLocalHttps(host,{signal,requestImpl=httpsRequest}={}) {
  requireCondition(HOSTS.includes(host),'invalid_dns_host');
  return new Promise((resolve,reject)=>{
    const request=requestImpl({hostname:host,port:443,path:'/',method:'HEAD',
      servername:host,rejectUnauthorized:true,signal:timedSignal(signal)},response=>{
      const certificate=response.socket?.getPeerCertificate?.();
      const value={status:response.statusCode,contentType:clean(response.headers['content-type'] || 'unspecified'),
        remoteAddress:response.socket?.remoteAddress,certificateExpires:certificate?.valid_to};
      if(response.headers.location) {
        try {const destination=new URL(response.headers.location,`https://${host}`);value.redirect=HOSTS.includes(destination.hostname)?destination.origin+destination.pathname:'external redirect (not followed)';} catch {value.redirect='invalid redirect (not followed)';}
      }
      response.resume();resolve(value);
    });
    request.on('error',reject);request.end();
  });
}
async function localAddresses(host,lookup,signal) {
  requireCondition(HOSTS.includes(host),'invalid_dns_host');
  let timer;let onAbort;
  try {
    const values=await Promise.race([
      lookup(host,{all:true}),
      new Promise((_,reject)=>{timer=setTimeout(()=>reject(new OperationError('local_dns_timeout')),10000);
        onAbort=()=>reject(new OperationError('interrupted'));signal?.addEventListener('abort',onAbort,{once:true});if(signal?.aborted)onAbort();}),
    ]);
    return [...new Set(values.map(v=>v.address).filter(v=>isIP(v)))];
  } finally {clearTimeout(timer);if(onAbort)signal?.removeEventListener('abort',onAbort);}
}
async function boundedJson(response) {
  requireCondition(response.status===200,`http_${response.status}`);
  if(!response.body?.getReader)return response.json();
  const reader=response.body.getReader();const parts=[];let length=0;
  try {for(;;){const {done,value}=await reader.read();if(done)break;length+=value.length;requireCondition(length<=65536,'dns_response_too_large');parts.push(value);}}
  finally{await reader.cancel().catch(()=>{});}
  try{return JSON.parse(Buffer.concat(parts).toString('utf8'));}catch{throw new OperationError('invalid_dns_response');}
}
export async function publicDns(provider,host,type,{fetchImpl=fetch,signal}={}) {
  requireCondition(Object.hasOwn(PROVIDERS,provider) && HOSTS.includes(host) && Object.hasOwn(TYPES,type),'invalid_dns_query');
  const url=new URL(PROVIDERS[provider]);url.searchParams.set('name',host);url.searchParams.set('type',type);
  const data=await boundedJson(await fetchImpl(url,{headers:{accept:'application/dns-json'},redirect:'error',signal:timedSignal(signal)}));
  requireCondition(Number.isInteger(data.Status) && data.Question?.some(q=>normalize(q.name)===host && q.type===TYPES[type]),'invalid_dns_response');
  return {status:data.Status,answers:(Array.isArray(data.Answer)?data.Answer:[])
    .filter(a=>a.type===TYPES[type] && (type==='A'||type==='AAAA'?isIP(a.data):typeof a.data==='string'))
    .slice(0,6).map(a=>({value:normalize(a.data),ttl:a.TTL}))};
}
function certSummary(record,host,now) {
  requireCondition(Array.isArray(record.cns) && record.cns.includes(host) && record.cns.every(n=>HOSTS.includes(n)),'certificate_scope_mismatch');
  const expires=record.expiresAt;
  requireCondition(Number.isFinite(expires),'certificate_expiry_unavailable');
  return {expires:new Date(expires).toISOString(),expired:expires<=now,autoRenew:record.autoRenew===true};
}
async function boundedApiChecks(entries) {
  const result={};let next=0;
  await Promise.all([0,1].map(async()=>{for(;;){const index=next++;if(index>=entries.length)return;const [name,work]=entries[index];result[name]=await observed(work);}}));
  return result;
}
export async function diagnoseDns({api,fetchImpl=fetch,lookup=systemLookup,tlsProbe=strictLocalHttps,
  httpProbe=localGatewayProbe,externalCheck,signal,now=Date.now,env=process.env,localEnabled=false}={}) {
  if(signal?.aborted)throw new OperationError('interrupted');
  const when=now();
  const entries=[['domain',async()=>{const d=await api(`/v5/domains/${DOMAIN}`,signal);requireCondition(d.domain?.name===DOMAIN,'domain_scope_mismatch');return {nameservers:d.domain.nameservers,intendedNameservers:d.domain.intendedNameservers,verified:d.domain.verified};}],
    ['records',async()=>{const d=await api(`/v4/domains/${DOMAIN}/records?limit=100`,signal);requireCondition(Array.isArray(d.records),'invalid_dns_records');const matching=d.records.filter(r=>['','@',DOMAIN,'www',`www.${DOMAIN}`].includes(normalize(r.name??'')) && ['A','AAAA','CNAME','NS','CAA'].includes(r.type));return {records:matching.slice(0,8).map(r=>({name:!r.name||r.name==='@'?'apex':r.name,type:r.type,value:r.value,ttl:r.ttl})),truncated:Boolean(d.pagination?.next)||matching.length>8};}]];
  for(const host of HOSTS) {
    entries.push([`config:${host}`,async()=>{const d=await api(`/v6/domains/${host}/config`,signal);return {misconfigured:d.misconfigured,nameservers:d.nameservers,aValues:d.aValues,recommendedIPv4:d.recommendedIPv4,recommendedCNAME:d.recommendedCNAME};}]);
    entries.push([`assignment:${host}`,async()=>{const d=await api(`/v9/projects/${DEVOPS_PROJECT_ID}/domains/${host}`,signal);requireCondition(d.name===host,'domain_scope_mismatch');return {projectId:d.projectId,verified:d.verified,redirect:d.redirect,redirectStatusCode:d.redirectStatusCode};}]);
    entries.push([`certificate:${host}`,async()=>certSummary(await api(`/v6/certs/${KNOWN_CERTS[host]}`,signal),host,when)]);
  }
  const publicQueries=[];
  for(const provider of Object.keys(PROVIDERS))for(const host of HOSTS)for(const type of ['A','AAAA',host===DOMAIN?'NS':'CNAME'])
    publicQueries.push([`${provider}:${host}:${type}`,()=>publicDns(provider,host,type,{fetchImpl,signal})]);
  const [vercel,publicResults,local,tls,http,external]=await Promise.all([
    boundedApiChecks(entries),
    Promise.all(publicQueries.map(async([key,work])=>[key,await observed(work)])).then(Object.fromEntries),
    localEnabled ? Promise.all(HOSTS.map(async host=>[host,await observed(()=>localAddresses(host,lookup,signal))])).then(Object.fromEntries) : Object.fromEntries(HOSTS.map(host=>[host,{ok:false,error:'disabled'}])),
    localEnabled ? Promise.all(HOSTS.map(async host=>[host,await observed(()=>tlsProbe(host,{signal}))])).then(Object.fromEntries) : Object.fromEntries(HOSTS.map(host=>[host,{ok:false,error:'disabled'}])),
    localEnabled ? Promise.all(HOSTS.map(async host=>[host,await observed(()=>httpProbe(host,{signal}))])).then(Object.fromEntries) : Object.fromEntries(HOSTS.map(host=>[host,{ok:false,error:'disabled'}])),
    externalCheck?observed(()=>externalCheck(signal)):Promise.resolve({ok:false,error:'not_configured'}),
  ]);
  if(signal?.aborted)throw new OperationError('interrupted');
  const lines=[`DNS diagnostic for ${DOMAIN} at ${new Date(when).toISOString()}. Read-only; no DNS or certificate changes made.`];
  for(const host of HOSTS) {
    const config=vercel[`config:${host}`],assignment=vercel[`assignment:${host}`],cert=vercel[`certificate:${host}`];
    lines.push(`${host}: Vercel config ${config.ok?`misconfigured=${clean(config.value.misconfigured)}`:summary(config)}; assignment ${assignment.ok?`${assignment.value.projectId===DEVOPS_PROJECT_ID?'ganesha-devops':'unexpected project'}, verified=${clean(assignment.value.verified)}${assignment.value.redirect?`, redirect=${clean(assignment.value.redirect)} (${clean(assignment.value.redirectStatusCode)})`:''}`:summary(assignment)}.`);
    if(config.ok) {
      const expected=(config.value.recommendedIPv4||[]).flatMap(r=>r.value||[]).slice(0,8);
      lines.push(`Vercel recommendation for ${host}: A ${expected.map(clean).join(', ')||'not supplied'}; CNAME ${(config.value.recommendedCNAME||[]).slice(0,8).map(r=>clean(r.value)).join(', ')||'not supplied'}.`);
    }
    lines.push(`Known Vercel certificate record for ${host}: ${cert.ok?`${cert.value.expired?'expired':'not expired'}, expires ${cert.value.expires}, autoRenew=${cert.value.autoRenew}`:summary(cert)}. Stored metadata does not prove which certificate is served.`);
  }
  lines.push(`Vercel nameservers: ${vercel.domain.ok?(vercel.domain.value.nameservers||[]).slice(0,8).map(clean).join(', ')||'not supplied':summary(vercel.domain)}.`);
  lines.push(`Vercel apex/www records: ${vercel.records.ok?vercel.records.value.records.map(r=>`${clean(r.name)} ${clean(r.type)} ${clean(r.value)} TTL=${clean(r.ttl)}`).join('; ')||'no explicit matching records returned (managed records may be implicit)':summary(vercel.records)}${vercel.records.value?.truncated?' (first page only)':''}.`);
  for(const [key,result] of Object.entries(publicResults)) lines.push(`${key}: ${result.ok?`rcode=${result.value.status}; ${result.value.answers.map(a=>`${clean(a.value)} (TTL ${clean(a.ttl)})`).join(', ')||'no answer'}`:summary(result)}.`);
  for(const host of localEnabled ? HOSTS : []) {
    lines.push(`Local OS ${host}: ${local[host].ok?local[host].value.join(', ')||'no address':summary(local[host])}.`);
    lines.push(`Local strict HTTPS ${host}: ${tls[host].ok?`TLS validated; HTTP ${tls[host].value.status}; ${clean(tls[host].value.contentType)}${tls[host].value.redirect?`; redirect ${clean(tls[host].value.redirect)} (not followed)`:''}`:`failed (${clean(tls[host].error)}); certificate validation was not bypassed`}.`);
    lines.push(`Local HTTP ${host}: ${http[host].ok?`HTTP ${http[host].value.status}${http[host].value.gatewayDnsBlock?`; Cloudflare Gateway DNS block redirect; categories: ${(http[host].value.categories||[]).map(clean).join(', ')||'not supplied'}; private redirect fields omitted`:'; no matching Gateway DNS block redirect observed'}`:summary(http[host])}.`);
  }
  const proxyPresent=Object.keys(env).some(k=>/^(?:https?|all)_proxy$/i.test(k) && env[k]);
  if(localEnabled)lines.push(`Proxy environment variables present: ${proxyPresent?'yes':'no'}. This alone does not establish whether a proxy handled these probes.`);
  else lines.push('Local network diagnostics are disabled. No local domain DNS, HTTP, TLS or Wi-Fi probes were run.');
  const misconfigured=HOSTS.filter(h=>vercel[`config:${h}`]?.value?.misconfigured===true);
  const localMismatch=HOSTS.filter(h=>{
    if(!local[h].ok)return false;
    const answers=Object.keys(PROVIDERS).flatMap(p=>['A','AAAA'].flatMap(t=>publicResults[`${p}:${h}:${t}`]?.value?.answers?.map(a=>a.value)||[]));
    return answers.length>0 && local[h].value.length>0 && local[h].value.every(a=>!answers.includes(normalize(a)));
  });
  const nx=HOSTS.filter(h=>Object.keys(PROVIDERS).every(p=>publicResults[`${p}:${h}:A`]?.value?.status===3));
  const gatewayBlocked=HOSTS.filter(h=>http[h]?.value?.gatewayDnsBlock);
  const configured=HOSTS.every(h=>vercel[`config:${h}`]?.value?.misconfigured===false && vercel[`assignment:${h}`]?.value?.verified===true && vercel[`assignment:${h}`]?.value?.projectId===DEVOPS_PROJECT_ID);
  lines.unshift(configured && !nx.length ? 'DevOps · Vercel currently reports both domains configured and verified. No authoritative DNS change is indicated by these checks. Public HTTPS evidence is reported separately below.' : 'DevOps · Domain diagnostics completed. Review the reported configuration issues or unavailable checks before making a DNS change.');
  if(gatewayBlocked.length)lines.push(`Finding: this connection is being redirected to Cloudflare Gateway's DNS block page for ${gatewayBlocked.join(', ')}. This is evidence of local/network DNS filtering, not a reason to change authoritative DNS. Request an authorized Gateway policy review; no OS DNS, hosts, certificate validation or Gateway policy was changed.`);
  if(misconfigured.length)lines.push(`Finding: Vercel reports a DNS configuration problem for ${misconfigured.join(', ')}. Review the authoritative records and recommendations before making a minimal correction.`);
  else if(nx.length)lines.push(`Finding: both public resolvers reported NXDOMAIN for ${nx.join(', ')}. Authoritative delegation/records need investigation; no repair was applied.`);
  else if(!gatewayBlocked.length && localMismatch.length && localMismatch.some(h=>!tls[h].ok))lines.push(`Finding: this PC's answers differ from public DNS for ${localMismatch.join(', ')}, alongside a local TLS failure. A local resolver/cache, proxy or TLS interception issue is possible; this evidence does not demonstrate an authoritative DNS defect.`);
  else if(!gatewayBlocked.length)lines.push('Finding: review the observations separately. A configured Vercel domain or differing CDN addresses alone does not prove website availability or a DNS fault.');
  if(external.ok && external.value) {
    const run=external.value;
    requireCondition(/^https:\/\/github\.com\/draeden79\/ganesha\/actions\/runs\/\d+$/.test(run.url),'invalid_diagnostic_evidence');
    lines.push(`Latest completed GitHub-hosted Public domain diagnostic: ${clean(run.conclusion)}, ${clean(run.updatedAt||run.createdAt)}. Historical external evidence: ${run.url}`);
  } else lines.push(`External hosted diagnostic: ${summary(external)}.`);
  lines.push('Do not change DNS merely to match this PC. If DNS/TLS pass externally but the homepage shows service JSON, investigate the application route separately.');
  const body=lines.join('\n');
  return {ok:true,body:body.length<=11500?body:body.slice(0,11000)+'\nReport truncated to the delivery limit. No DNS changes were made; omitted observations remain unverified.'};
}
