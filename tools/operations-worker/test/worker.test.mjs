import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createActions } from '../src/actions.mjs';
import { executeJob } from '../src/worker.mjs';
import { validateOperation, validateArchiveTree, childEnvironment, OperationError, TEAM_ID, TEAM_SCOPE } from '../src/core.mjs';

const sha='2ac2fe859db98687fc4e3acacfbf0c56526452d9';
const projectId='prj_UXy2A10eweruKwCIBHufQB9glCwa';
const project={id:projectId,name:'ganesha-classroom'};
const op={kind:'vercel-deploy',sha,target:'classroom'};
const makeJob=(operation=op,checkpoint={})=>({id:'abc123',leaseToken:'lease1',leaseExpiresAt:Date.now()+180000,operation,checkpoint});
const config=root=>({runtimeRoot:root,projectId,teamId:TEAM_ID,scope:TEAM_SCOPE,vercelCli:'C:/cache/vercel/dist/vc.js'});
async function temporary(t) {
  const root=await mkdtemp(join(tmpdir(),'ganesha-ops-test-'));
  // mkdtemp supplies the exact path; no user-supplied path participates in cleanup.
  t.after(()=>rm(root,{recursive:true,force:true}));return root;
}
function deployment(job,state='READY') {return {id:'dpl_test123',projectId,url:'ganesha-classroom-test.vercel.app',readyState:state,meta:{ganeshaOperation:job.id,ganeshaSha:sha}};}
const alias={projectId,deploymentId:'dpl_test123'};
const healthy=()=>({status:200,text:async()=>'<script src="/classroom/_next/static/test.js"></script>'});
function context(job,patches=[]) {return {signal:new AbortController().signal,checkpoint:async p=>{patches.push(p);job.checkpoint={...job.checkpoint,...p};}};}

test('only bounded structured operations pass; shell flags and alternate targets fail',()=>{
  for(const ref of ['--help','main;whoami','$(echo x)','../main','https://github.com/x/y','a..b']) assert.throws(()=>validateOperation({kind:'github-status',ref}));
  assert.throws(()=>validateOperation({...op,target:'devops'}));
  assert.throws(()=>validateOperation({...op,command:'echo bad'}));
  assert.throws(()=>validateOperation({...op,sha:'2ac2fe8'}));
  assert.equal(validateOperation({kind:'github-status',ref:'codex/diretor-integracao'}).kind,'github-status');
});
test('children receive OS paths but no Redis, model, worker or API credentials',()=>{
  const env=childEnvironment({PATH:'safe',APPDATA:'safe',REDIS_URL:'secret',OPENAI_API_KEY:'secret',LOCAL_WORKER_TOKEN:'secret',GH_TOKEN:'secret',VERCEL_TOKEN:'secret',NODE_OPTIONS:'--require bad.js'});
  assert.equal(env.PATH,'safe');assert.equal(env.APPDATA,'safe');
  for(const key of ['REDIS_URL','OPENAI_API_KEY','LOCAL_WORKER_TOKEN','GH_TOKEN','VERCEL_TOKEN','NODE_OPTIONS'])assert.equal(env[key],undefined);
});
test('archive verification rejects symlinks, traversal, Windows devices and secrets',()=>{
  const entry=(path,mode='100644')=>`${mode} blob ${'a'.repeat(40)}\t${path}\0`;
  validateArchiveTree(entry('src/app.ts')+entry('.env.example'));
  for(const path of ['../escape','C:/escape','src\\escape','CON.txt','.vercel/project.json','.git/config','.env.production.local','file:stream','src/trailing.']) assert.throws(()=>validateArchiveTree(entry(path)));
  assert.throws(()=>validateArchiveTree(entry('link','120000')));
});
test('GitHub status pins the returned SHA when querying checks',async t=>{
  const calls=[];const root=await temporary(t);
  const actions=createActions(config(root),{run:async (exe,args)=>{calls.push(args);return JSON.stringify(args[1].includes('check-runs')?{check_runs:[{name:'CI',conclusion:'success'}]}:{sha});}});
  const result=await actions(makeJob({kind:'github-status',ref:'main'}),context(makeJob()));
  assert.equal(result.ok,true);assert.match(result.body,/CI: success/);assert.ok(calls[1][1].includes(sha));
});
test('draft PR creates with literal argv/body file and recovers the created PR',async t=>{
  const root=await temporary(t);const calls=[];let created=false;let body='';
  const job=makeJob({kind:'github-pr',head:'codex/test',base:'main',title:'Literal $(whoami) `text`'});
  const run=async(exe,args)=>{
    calls.push(args);
    if(args[0]==='api')return JSON.stringify({sha});
    if(args[1]==='list')return JSON.stringify(created?[{url:'https://github.com/draeden79/ganesha/pull/12',state:'OPEN',isDraft:true,headRefName:'codex/test',baseRefName:'main',body}]:[]);
    if(args[1]==='create'){body=await readFile(args[args.indexOf('--body-file')+1],'utf8');created=true;return 'https://github.com/draeden79/ganesha/pull/12';}
    throw Error('Unexpected call');
  };
  const result=await createActions(config(root),{run})(job,context(job));
  assert.equal(result.ok,true);assert.match(body,/ganesha-operation:abc123/);
  const creation=calls.find(a=>a[1]==='create');assert.ok(creation.includes('--draft'));assert.equal(creation[creation.indexOf('--title')+1],job.operation.title);
  await createActions(config(root),{run})(job,context(job));assert.equal(calls.filter(a=>a[1]==='create').length,1);
});
test('ambiguous PR creation is not automatically repeated',async t=>{
  const root=await temporary(t);const job=makeJob({kind:'github-pr',head:'codex/test',base:'main',title:'Review'},{phase:'pr-creating'});
  let commands=0;
  await assert.rejects(createActions(config(root),{run:async()=>{commands++;return '[]';}})(job,context(job)),/pr_creation_unconfirmed/);
  assert.equal(commands,1);
});
test('deployment resumes from checkpoint, verifies project and routes, never redeploys',async t=>{
  const root=await temporary(t);const job=makeJob(op,{phase:'deploy-created',deploymentId:'dpl_test123'});const calls=[];const urls=[];
  const run=async(exe,args)=>{calls.push(args);if(args[2]?.startsWith('/v9/projects/'))return JSON.stringify(project);if(args[2]?.startsWith('/v13/deployments/'))return JSON.stringify(deployment(job));if(args[2]?.startsWith('/v4/aliases/'))return JSON.stringify(alias);throw Error('Unexpected CLI call');};
  const result=await createActions(config(root),{run,fetchImpl:async url=>{urls.push(url);return healthy();}})(job,context(job));
  assert.equal(result.ok,true);assert.equal(calls.some(a=>a.includes('deploy')),false);assert.equal(urls.length,3);assert.equal(job.checkpoint.phase,'deploy-verified');assert.ok(urls.every(url=>url.startsWith('https://ganesha-classroom.vercel.app/')));
});
test('metadata recovers a remotely created deployment before any upload',async t=>{
  const root=await temporary(t);const job=makeJob(op,{phase:'deploy-creating'});let uploads=0;
  const run=async(exe,args)=>{
    if(args[1]==='list')return JSON.stringify({contextName:'test',deployments:[{url:'ganesha-classroom-test.vercel.app',state:'READY'}],pagination:{}});
    if(args[2]?.startsWith('/v9/projects/'))return JSON.stringify(project);
    if(args[2]?.startsWith('/v13/deployments/')){assert.ok(args[2].endsWith('ganesha-classroom-test.vercel.app'));return JSON.stringify(deployment(job));}
    if(args[2]?.startsWith('/v4/aliases/'))return JSON.stringify(alias);
    uploads++;throw Error('Unexpected upload');
  };
  const result=await createActions(config(root),{run,fetchImpl:async()=>healthy()})(job,context(job));assert.equal(result.ok,true);assert.equal(uploads,0);
});
test('ambiguous deployment without matching metadata requires review',async t=>{
  const root=await temporary(t);const job=makeJob(op,{phase:'deploy-creating'});
  const run=async(exe,args)=>JSON.stringify(args[1]==='list'?{deployments:[]}:project);
  await assert.rejects(createActions(config(root),{run})(job,context(job)),/deployment_creation_unconfirmed/);
});
test('a mismatched deployment project cannot be resumed or fetched',async t=>{
  const root=await temporary(t);const job=makeJob(op,{deploymentId:'dpl_test123'});
  const run=async(exe,args)=>JSON.stringify(args[2]?.startsWith('/v9/projects/')?project:{...deployment(job),projectId:'prj_other'});
  await assert.rejects(createActions(config(root),{run,fetchImpl:async()=>{throw Error('Must not fetch');}})(job,context(job)),/deployment_identity_mismatch/);
});
test('worker aborts on a fenced heartbeat without completing a stale action',async()=>{
  let completed=0;
  const result=await executeJob(makeJob(),{heartbeatMs:5,store:{heartbeat:async()=>false,complete:async()=>{completed++;}},actions:async(job,{signal})=>new Promise((resolve,reject)=>signal.addEventListener('abort',()=>reject(new OperationError('interrupted')),{once:true}))});
  assert.equal(result.state,'interrupted');assert.equal(completed,0);
});
test('public alias must match the exact deployment before health checks',async t=>{
  const root=await temporary(t);const job=makeJob(op,{deploymentId:'dpl_test123'});
  const run=async(exe,args)=>JSON.stringify(args[2]?.startsWith('/v9/projects/')?project:args[2]?.startsWith('/v4/aliases/')?{projectId,deploymentId:'dpl_other'}:deployment(job));
  await assert.rejects(createActions(config(root),{run,sleep:async()=>{},fetchImpl:async()=>{throw Error('Must not fetch');}})(job,context(job)),/production_alias_not_bound/);
});
test('commit outside the fixed release branch cannot reach archive or deployment',async t=>{
  const root=await temporary(t);const job=makeJob();const commands=[];
  const run=async(exe,args)=>{
    commands.push(args);
    if(args[1]==='list')return JSON.stringify({deployments:[]});
    if(args[2]?.startsWith('/v9/projects/'))return JSON.stringify(project);
    if(args.includes('merge-base'))throw new OperationError('command_failed');
    return '';
  };
  await assert.rejects(createActions(config(root),{run})(job,context(job)),/commit_outside_release_branch/);
  assert.ok(commands.find(a=>a.includes('fetch')).includes('https://github.com/draeden79/ganesha.git'));
  assert.equal(commands.some(a=>a.includes('archive') || a.includes('deploy')),false);
});
test('new deployment uses isolated archive and persists ID before polling health',async t=>{
  const root=await temporary(t);const job=makeJob();const calls=[];const patches=[];let uploaded=false;
  const run=async(exe,args,options)=>{
    calls.push({exe,args,options});
    if(args[1]==='list')return JSON.stringify({contextName:'test',deployments:uploaded?[{url:'ganesha-classroom-test.vercel.app',state:'READY'}]:[]});
    if(args[2]?.startsWith('/v9/projects/'))return JSON.stringify(project);
    if(args[2]?.startsWith('/v13/deployments/'))return JSON.stringify(deployment(job));
    if(args[2]?.startsWith('/v4/aliases/'))return JSON.stringify(alias);
    if(args.includes('ls-tree'))return `100644 blob ${'a'.repeat(40)}\tpackage.json\0`;
    if(args[1]==='deploy'){assert.equal(job.checkpoint.phase,'deploy-creating');uploaded=true;return '';}
    return '';
  };
  const result=await createActions(config(root),{run,fetchImpl:async()=>{assert.equal(job.checkpoint.deploymentId,'dpl_test123');return healthy();}})(job,context(job,patches));
  assert.equal(result.ok,true);
  const upload=calls.find(c=>c.args[1]==='deploy');assert.ok(upload.options.cwd.startsWith(root));assert.ok(upload.args.includes('--prod'));assert.ok(upload.args.includes('--no-wait'));assert.equal(upload.options.env.REDIS_URL,undefined);
  assert.deepEqual(JSON.parse(await readFile(join(upload.options.cwd,'.vercel','project.json'),'utf8')),{orgId:TEAM_ID,projectId});
  assert.equal(calls.some(c=>c.args.includes('checkout') || c.exe==='npm'),false);
});
test('completion acknowledgement retry does not repeat the external operation',async()=>{
  let actions=0,complete=0;
  const sleep=async(ms,value,{signal}={})=>{if(ms>=30000)await new Promise((resolve,reject)=>signal.addEventListener('abort',reject,{once:true}));};
  const result=await executeJob(makeJob(),{sleep,store:{complete:async()=>{if(++complete===1)throw Error('lost ack');return false;}},actions:async()=>{actions++;return {ok:true,body:'Done'};}});
  assert.equal(actions,1);assert.equal(complete,2);assert.equal(result.state,'fenced');
});
