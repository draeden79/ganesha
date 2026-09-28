import { mkdir, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { createHash } from 'node:crypto';
import { setTimeout as delay } from 'node:timers/promises';
import { REPO, REPO_URL, RELEASE_BRANCH, DEVOPS_PROJECT_ID, SHA, OperationError, requireCondition, validateOperation, validateConfig, runCommand, parseJson, childEnvironment, safeDeploymentUrl, validateArchiveTree } from './core.mjs';

const githubUrl = url => typeof url === 'string' && /^https:\/\/github\.com\/draeden79\/ganesha\/pull\/\d+$/.test(url);
const display = value => String(value ?? 'unknown').replace(/[\x00-\x1f<>@]/g,'').slice(0,100);

async function boundedHtml(response) {
  if(!response.body?.getReader) return response.text ? response.text() : '';
  const reader=response.body.getReader();const parts=[];let bytes=0;
  try {
    for(;;) {const {done,value}=await reader.read();if(done)break;bytes+=value.length;requireCondition(bytes<=2*1024*1024,'health_response_too_large');parts.push(value);}
  } finally {await reader.cancel().catch(()=>{});}
  return Buffer.concat(parts).toString('utf8');
}

export function createActions(config, { run = runCommand, sleep = delay, fetchImpl = fetch, now = Date.now } = {}) {
  validateConfig(config);
  const env = childEnvironment();
  const gh = (args, signal) => run(config.gh || 'gh', args, {cwd:config.runtimeRoot, env, signal});
  const vc = (args, signal, extra = {}) => run(process.execPath, [config.vercelCli,...args,'--scope',config.scope,'--no-color','--non-interactive'], {cwd:config.runtimeRoot,env,signal,...extra});
  const api = async (path, signal) => parseJson(await vc(['api',path,'--method','GET','--raw'], signal));
  const git = (args, cwd, signal) => run(config.git || 'git', ['-c','core.hooksPath='+join(config.runtimeRoot,'disabled-hooks'),...args], {cwd,env,signal});
  const commit = async (ref, signal) => {
    const value = parseJson(await gh(['api',`repos/${REPO}/commits/${encodeURIComponent(ref)}`],signal));
    requireCondition(SHA.test(value.sha), 'invalid_commit'); return value.sha;
  };
  async function status(op, signal) {
    const sha = await commit(op.ref,signal);
    const checks = parseJson(await gh(['api',`repos/${REPO}/commits/${sha}/check-runs?per_page=100`],signal));
    const runs = Array.isArray(checks.check_runs) ? checks.check_runs : [];
    return {ok:true,body:`GitHub ${REPO}\nCommit: ${sha}\n${runs.length ? runs.slice(0,20).map(c=>`${display(c.name)}: ${display(c.conclusion || c.status)}`).join('\n') : 'No check runs reported.'}\nhttps://github.com/${REPO}/commit/${sha}`};
  }
  async function pullRequest(job, context) {
    const {signal,checkpoint} = context; const op = job.operation;
    const marker = `<!-- ganesha-operation:${job.id} -->`;
    const find = async () => {
      const prs = parseJson(await gh(['pr','list','--repo',REPO,'--head',op.head,'--base',op.base,'--state','all','--limit','100','--json','number,url,state,isDraft,body,headRefName,baseRefName'],signal));
      requireCondition(Array.isArray(prs), 'invalid_service_response');
      return prs.find(p=>p.headRefName===op.head && p.baseRefName===op.base && p.body?.includes(marker)) ||
        prs.find(p=>p.headRefName===op.head && p.baseRefName===op.base && p.state==='OPEN');
    };
    let pr = await find();
    if (pr) { requireCondition(githubUrl(pr.url),'invalid_pull_request_url'); await checkpoint({pullRequestUrl:pr.url,phase:'pr-created'}); return {ok:true,body:`Existing pull request: ${pr.url}\nState: ${display(pr.state)}${pr.isDraft?' (draft)':''}. No merge performed.`}; }
    // An interrupted creation may have succeeded remotely. Never blindly create again.
    if (job.checkpoint?.phase === 'pr-creating' || job.checkpoint?.pullRequestUrl) throw new OperationError('pr_creation_unconfirmed');
    const headSha = await commit(op.head,signal); await commit(op.base,signal);
    const directory = join(config.runtimeRoot,'jobs',createHash('sha256').update(job.id).digest('hex'));
    await mkdir(directory,{recursive:true});
    const bodyPath = join(directory,'pull-request-body.md');
    await writeFile(bodyPath,`Draft requested through Gdevops for ${REPO}.\n\nHead: ${op.head} (${headSha})\nBase: ${op.base}\n\nReview and merge remain separate actions.\n\n${marker}\n`,{mode:0o600});
    await checkpoint({phase:'pr-creating',headSha});
    let creationError;
    try { await gh(['pr','create','--repo',REPO,'--draft','--head',op.head,'--base',op.base,'--title',op.title,'--body-file',bodyPath],signal); }
    catch(error) { creationError=error; }
    if (signal?.aborted) throw new OperationError('interrupted');
    for (let i=0;i<3;i++) { pr=await find(); if(pr) break; await sleep(1500,undefined,{signal}); }
    if (!pr) throw new OperationError(creationError ? 'pr_creation_unconfirmed':'pr_not_visible');
    requireCondition(githubUrl(pr.url),'invalid_pull_request_url');
    await checkpoint({pullRequestUrl:pr.url,phase:'pr-created'});
    return {ok:true,body:`Draft pull request: ${pr.url}\nHead: ${op.head} (${headSha})\nBase: ${op.base}. No merge performed.`};
  }
  async function prepareArchive(job,signal) {
    const directory = join(config.runtimeRoot,'jobs',createHash('sha256').update(job.id).digest('hex'));
    const repository = join(directory,'repo.git'); const source = join(directory,'source');
    await mkdir(directory,{recursive:true});
    await git(['init','--bare',repository],directory,signal);
    await git(['--git-dir',repository,'fetch','--no-tags','--force',REPO_URL,`+refs/heads/${RELEASE_BRANCH}:refs/heads/release`],directory,signal);
    try { await git(['--git-dir',repository,'merge-base','--is-ancestor',job.operation.sha,'refs/heads/release'],directory,signal); }
    catch { throw new OperationError('commit_outside_release_branch'); }
    const tree = await git(['--git-dir',repository,'ls-tree','-r','-z',job.operation.sha],directory,signal);
    validateArchiveTree(tree);
    await mkdir(source,{recursive:true});
    const archive = join(directory,'source.tar');
    await git(['--git-dir',repository,'archive','--format=tar','--output',archive,job.operation.sha],directory,signal);
    await run(config.tar || 'tar',['-xf',archive,'-C',source],{cwd:directory,env,signal});
    await mkdir(join(source,'.vercel'),{recursive:true});
    await writeFile(join(source,'.vercel','project.json'),JSON.stringify({orgId:config.teamId,projectId:config.projectId}),{mode:0o600});
    return source;
  }
  async function deploymentRecord(id,job,signal) {
    requireCondition(/^dpl_[A-Za-z0-9]+$/.test(id),'invalid_deployment_id');
    const record = await api(`/v13/deployments/${id}`,signal);
    requireCondition(record.projectId===config.projectId && record.meta?.ganeshaOperation===job.id && record.meta?.ganeshaSha===job.operation.sha,'deployment_identity_mismatch');
    if(record.url) record.verifiedUrl=safeDeploymentUrl(record.url);
    return record;
  }
  async function findDeployment(job,signal) {
    const listing = parseJson(await vc(['list','ganesha-classroom','--json','--limit','100','--meta',`ganeshaOperation=${job.id}`],signal));
    const records = Array.isArray(listing) ? listing : listing.deployments;
    requireCondition(Array.isArray(records),'invalid_service_response');
    requireCondition(records.length <= 1,'duplicate_deployment_requires_review');
    if(!records.length) return null;
    return deploymentRecord(records[0].uid || records[0].id,job,signal);
  }
  async function deploy(job,{signal,checkpoint}) {
    const project = await api(`/v9/projects/${config.projectId}`,signal);
    requireCondition(project.id===config.projectId && project.name==='ganesha-classroom','project_identity_mismatch');
    let deployment = job.checkpoint?.deploymentId ? await deploymentRecord(job.checkpoint.deploymentId,job,signal) : await findDeployment(job,signal);
    if(!deployment) {
      if(job.checkpoint?.phase==='deploy-creating') throw new OperationError('deployment_creation_unconfirmed');
      const source = await prepareArchive(job,signal);
      await checkpoint({phase:'deploy-creating',sha:job.operation.sha,projectId:config.projectId});
      // Upload and build remotely; never run repository package scripts on this PC.
      try { await vc(['deploy','--prod','--yes','--no-wait','--meta',`ganeshaOperation=${job.id}`,'--meta',`ganeshaSha=${job.operation.sha}`],signal,{cwd:source,timeoutMs:300000,env:{...env,VERCEL_PROJECT_ID:config.projectId,VERCEL_ORG_ID:config.teamId}}); }
      catch { if(signal?.aborted) throw new OperationError('interrupted'); }
      for(let i=0;i<4;i++) { deployment=await findDeployment(job,signal); if(deployment) break; await sleep(2000,undefined,{signal}); }
      if(!deployment) throw new OperationError('deployment_creation_unconfirmed');
    }
    const id=deployment.id || deployment.uid;
    await checkpoint({phase:'deploy-created',deploymentId:id,deploymentUrl:deployment.verifiedUrl || null,sha:job.operation.sha,projectId:config.projectId});
    const deadline=now()+20*60*1000;
    while(!['READY','ERROR','CANCELED'].includes(deployment.readyState || deployment.state)) {
      if(now()>=deadline) throw new OperationError('deployment_wait_timeout');
      await sleep(10000,undefined,{signal}); deployment=await deploymentRecord(id,job,signal);
    }
    requireCondition((deployment.readyState || deployment.state)==='READY','deployment_failed');
    const url=deployment.verifiedUrl || safeDeploymentUrl(deployment.url);
    await checkpoint({phase:'deploy-ready',deploymentId:id,deploymentUrl:url});
    // Production aliases can be public while unique URLs require Vercel SSO.
    // Verify the alias's exact project and deployment before using it; never
    // disable deployment protection or follow an SSO redirect.
    const publicUrl='https://ganesha-classroom.vercel.app';
    let bound=false;
    for(let attempt=0;attempt<12;attempt++) {
      const alias=await api('/v4/aliases/ganesha-classroom.vercel.app',signal);
      if(alias.projectId===config.projectId && (alias.deploymentId || alias.deployment?.id)===id) {bound=true;break;}
      if(attempt<11)await sleep(5000,undefined,{signal});
    }
    requireCondition(bound,'production_alias_not_bound');
    const assets=new Set();
    for(const path of ['/classroom/pt-BR','/classroom/ar']) {
      const response=await fetchImpl(publicUrl+path,{redirect:'manual',signal:AbortSignal.any([signal || new AbortController().signal,AbortSignal.timeout(20000)])});
      if(response.status!==200) {await response.body?.cancel();throw new OperationError('deployment_health_failed');}
      const html=await boundedHtml(response);
      for(const match of html.matchAll(/(?:src|href)=["']([^"']+)["']/g)) {
        try {const asset=new URL(match[1],publicUrl);if(asset.origin===publicUrl && /^\/(?:_next\/static\/|assets\/)/.test(asset.pathname) && /\.(?:css|js|png|svg|webp)$/.test(asset.pathname))assets.add(asset.href);} catch {}
      }
    }
    requireCondition(assets.size>0,'deployment_assets_missing');
    for(const asset of [...assets].slice(0,6)) {
      const response=await fetchImpl(asset,{redirect:'manual',signal:AbortSignal.any([signal || new AbortController().signal,AbortSignal.timeout(20000)])});
      await response.body?.cancel();requireCondition(response.status===200,'deployment_asset_failed');
    }
    await checkpoint({phase:'deploy-verified',deploymentId:id,deploymentUrl:url,publicUrl});
    return {ok:true,body:`Classroom production deployment verified.\nCommit: ${job.operation.sha}\nDeployment: ${id}\n${publicUrl}/classroom/pt-BR\n${publicUrl}/classroom/ar\nThe public alias points to this deployment; both routes and sampled assets returned HTTP 200.`};
  }
  async function vercelStatus(op,signal) {
    const projectId=op.target==='classroom'?config.projectId:DEVOPS_PROJECT_ID;
    const listing=await api(`/v6/deployments?projectId=${projectId}&limit=5`,signal);
    requireCondition(Array.isArray(listing.deployments),'invalid_service_response');
    return {ok:true,body:`Vercel ${op.target} recent deployments:\n${listing.deployments.map(d=>`${display(d.uid || d.id)}: ${display(d.state || d.readyState)}${d.url?' '+safeDeploymentUrl(d.url):''}`).join('\n') || 'No deployments reported.'}`};
  }
  return async (job,context) => {
    requireCondition(/^[A-Za-z0-9_-]{1,128}$/.test(job.id),'invalid_job'); validateOperation(job.operation);
    await mkdir(config.runtimeRoot,{recursive:true});
    if(job.operation.kind==='github-status') return status(job.operation,context.signal);
    if(job.operation.kind==='github-pr') return pullRequest(job,context);
    if(job.operation.kind==='vercel-status') return vercelStatus(job.operation,context.signal);
    return deploy(job,context);
  };
}
