import test from 'node:test';
import assert from 'node:assert/strict';
import { EventEmitter } from 'node:events';
import { diagnoseDns, publicDns, strictLocalHttps, localGatewayProbe, DOMAIN, HOSTS } from '../src/dns.mjs';
import { DEVOPS_PROJECT_ID, validateOperation } from '../src/core.mjs';

const now=1790634000000;
function dependencies(overrides={}) {
  const paths=[];const queries=[];
  const api=async path=>{
    paths.push(path);
    if(path===`/v5/domains/${DOMAIN}`)return {domain:{name:DOMAIN,nameservers:['ns1.vercel-dns.com','ns2.vercel-dns.com'],verified:true}};
    if(path.includes('/records?'))return {records:[{name:'@',type:'A',value:'216.198.79.65',ttl:1800},{name:'@',type:'TXT',value:'secret-verification'},{name:'internal',type:'A',value:'private-record'}]};
    if(path.endsWith('/config'))return {misconfigured:false,recommendedIPv4:[{value:['216.198.79.65']}]};
    if(path.includes('/projects/'))return {name:path.split('/').at(-1),projectId:DEVOPS_PROJECT_ID,verified:true};
    if(path.startsWith('/v6/certs/'))return {cns:[path.includes('Aukibu')?DOMAIN:HOSTS[1]],expiresAt:now+86400000,autoRenew:true,cert:'do-not-print-certificate'};
    throw Error(`Unexpected path ${path}`);
  };
  const fetchImpl=async url=>{
    const u=new URL(url);queries.push(u);const host=u.searchParams.get('name'),type=u.searchParams.get('type');
    const code={A:1,AAAA:28,NS:2,CNAME:5}[type];const answers=type==='A'?[{type:1,data:'216.198.79.65',TTL:1800}]:type==='NS'?[{type:2,data:'ns1.vercel-dns.com.',TTL:1800}]:[];
    return {status:200,json:async()=>({Status:0,Question:[{name:host+'.',type:code}],Answer:answers})};
  };
  return {paths,queries,api,fetchImpl,now:()=>now,localEnabled:true,lookup:async()=>[{address:'216.198.79.65'}],tlsProbe:async()=>({status:200,contentType:'text/html'}),httpProbe:async()=>({status:200,gatewayDnsBlock:false}),env:{},...overrides};
}
test('DNS action admits only the fixed apex without arbitrary fields',()=>{
  assert.equal(validateOperation({kind:'dns-check',domain:DOMAIN}).kind,'dns-check');
  for(const domain of ['example.com',HOSTS[1],`${DOMAIN}/path`])assert.throws(()=>validateOperation({kind:'dns-check',domain}));
  assert.throws(()=>validateOperation({kind:'dns-check',domain:DOMAIN,repair:true}));
});

test('default production diagnostic performs no local domain or Wi-Fi probes',async()=>{
  const forbidden=()=>assert.fail('Local network probing is disabled by owner instruction');
  const d=dependencies({lookup:forbidden,tlsProbe:forbidden,httpProbe:forbidden});delete d.localEnabled;
  const result=await diagnoseDns(d);
  assert.match(result.body,/Local network diagnostics are disabled/);
  assert.ok(!result.body.includes('Local strict HTTPS'));
});
test('diagnostic is read-only, scoped, bounded and omits TXT/certificate contents',async()=>{
  const d=dependencies();const result=await diagnoseDns(d);
  assert.equal(result.ok,true);assert.match(result.body,/Read-only; no DNS or certificate changes made/);
  assert.ok(d.paths.every(p=>p.includes(DOMAIN)||p.startsWith('/v6/certs/cert_')));
  assert.ok(d.queries.every(u=>HOSTS.includes(u.searchParams.get('name'))));
  for(const text of ['secret-verification','private-record','do-not-print-certificate'])assert.ok(!result.body.includes(text));
  assert.ok(result.body.length<12000);assert.match(result.body,/Stored metadata does not prove/);
});
test('local DNS difference plus TLS failure is not reported as authoritative DNS failure',async()=>{
  const d=dependencies({lookup:async()=>[{address:'162.159.36.12'}],tlsProbe:async()=>{throw Object.assign(Error(),{code:'SELF_SIGNED_CERT_IN_CHAIN'});},env:{HTTPS_PROXY:'https://user:private@proxy.invalid'}});
  const result=await diagnoseDns(d);
  assert.match(result.body,/local resolver\/cache, proxy or TLS interception issue is possible/);
  assert.match(result.body,/does not demonstrate an authoritative DNS defect/);
  assert.match(result.body,/SELF_SIGNED_CERT_IN_CHAIN/);assert.ok(!result.body.includes('private@proxy'));
  assert.ok(!result.body.includes('DNS repaired'));
});
test('Vercel misconfiguration remains an explicit observation requiring review',async()=>{
  const d=dependencies();const original=d.api;d.api=async p=>p.endsWith('/config')?{misconfigured:true}:original(p);
  const result=await diagnoseDns(d);assert.match(result.body,/Vercel reports a DNS configuration problem/);assert.match(result.body,/before making a minimal correction/);
});
test('resolver and API failures are reported, not converted to healthy state',async()=>{
  const d=dependencies({api:async()=>{throw Object.assign(Error('credential-do-not-print'),{code:'command_failed'});},fetchImpl:async()=>{throw Object.assign(Error(),{code:'ENETUNREACH'});}});
  const result=await diagnoseDns(d);assert.match(result.body,/unavailable \(command_failed\)/);assert.match(result.body,/ENETUNREACH/);assert.ok(!result.body.includes('credential-do-not-print'));assert.ok(!result.body.includes('misconfigured=false'));
});
test('DoH rejects a response for a different question',async()=>{
  await assert.rejects(publicDns('Google',DOMAIN,'A',{fetchImpl:async()=>({status:200,json:async()=>({Status:0,Question:[{name:'example.com',type:1}],Answer:[]})})}),/invalid_dns_response/);
});
test('local HTTPS keeps validation enabled and does not follow redirects',async()=>{
  let options;let requests=0;
  const requestImpl=(value,callback)=>{
    options=value;requests++;
    const req=new EventEmitter();req.end=()=>queueMicrotask(()=>callback({statusCode:308,headers:{location:`https://${HOSTS[1]}/`},socket:{},resume(){}}));return req;
  };
  const result=await strictLocalHttps(DOMAIN,{requestImpl});
  assert.equal(options.rejectUnauthorized,true);assert.equal(options.servername,DOMAIN);assert.equal(options.method,'HEAD');assert.equal(requests,1);assert.equal(result.status,308);
});
test('external hosted result is timestamped historical evidence',async()=>{
  const d=dependencies({externalCheck:async()=>({conclusion:'success',updatedAt:'2026-09-28T21:00:00Z',url:'https://github.com/draeden79/ganesha/actions/runs/36487725620'})});
  const result=await diagnoseDns(d);assert.match(result.body,/Historical external evidence/);assert.match(result.body,/2026-09-28T21:00:00Z/);
});
test('Gateway redirect yields only allowed facts and never private query values',async()=>{
  const location='https://identity.security.cfdata.org/gateway?cf_filter=dns&cf_request_category_names=Newly+Seen+Domains&cf_account_id=private-account&cf_source_ip=192.0.2.123&cf_query_id=private-query';
  let requests=0;
  const requestImpl=(options,callback)=>{requests++;const req=new EventEmitter();req.end=()=>queueMicrotask(()=>callback({statusCode:303,headers:{location},resume(){}}));return req;};
  const result=await localGatewayProbe(DOMAIN,{requestImpl});assert.equal(requests,1);assert.equal(result.gatewayDnsBlock,true);assert.deepEqual(result.categories,['Newly Seen Domains']);
  const serialized=JSON.stringify(result);for(const value of ['private-account','192.0.2.123','private-query','cf_account_id'])assert.ok(!serialized.includes(value));
  const report=await diagnoseDns(dependencies({httpProbe:async()=>result}));assert.match(report.body,/Cloudflare Gateway's DNS block page/);assert.ok(!report.body.includes('private-account'));assert.match(report.body,/authorized Gateway policy review/);
});
test('lookalike redirect hosts are not treated as a verified Gateway block',async()=>{
  const requestImpl=(options,callback)=>{const req=new EventEmitter();req.end=()=>queueMicrotask(()=>callback({statusCode:303,headers:{location:'https://identity.security.cfdata.org.example.com/gateway?cf_filter=dns'},resume(){}}));return req;};
  const result=await localGatewayProbe(DOMAIN,{requestImpl});assert.equal(result.gatewayDnsBlock,false);
});
