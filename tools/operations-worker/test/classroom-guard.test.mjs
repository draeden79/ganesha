import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { CLASSROOM_RELEASE, CHECKOUT_URL, validateClassroomGuard, verifyAnonymousClassroom } from '../src/classroom-guard.mjs';
import { createActions } from '../src/actions.mjs';
import { OperationError, TEAM_ID, TEAM_SCOPE } from '../src/core.mjs';

const entry=(path,blob='a'.repeat(40))=>`100644 blob ${blob}\t${path}\0`;
const tree=Object.entries(CLASSROOM_RELEASE.blobs).map(([path,blob])=>entry(path,blob)).join('');
const secureResponse=url=>new Response(null,{status:new URL(url).pathname.startsWith('/api/')?401:303,headers:{location:CHECKOUT_URL,'cache-control':'private, no-store, max-age=0'}});

test('reviewed code and content-only updates pass; old/missing/modified guard or new route fail',()=>{
  validateClassroomGuard(tree);
  validateClassroomGuard(tree+entry('content/locales/en.json'));
  assert.throws(()=>validateClassroomGuard(entry('package.json')),/classroom_guard_mismatch/);
  for(const [path,blob] of Object.entries(CLASSROOM_RELEASE.blobs)) {
    assert.throws(()=>validateClassroomGuard(tree.replace(entry(path,blob),'')),/classroom_guard_missing/);
    assert.throws(()=>validateClassroomGuard(tree.replace(entry(path,blob),entry(path))),/classroom_guard_mismatch/);
  }
  for(const path of ['src/app/free/route.ts','app/free/page.tsx','pages/open.tsx','middleware.ts','vercel.other.json','.gitattributes','src/.gitattributes']) {
    assert.throws(()=>validateClassroomGuard(tree+entry(path)),/classroom_guard_mismatch/);
  }
});

test('anonymous pages, legacy routes, RSC, exercises and APIs stay closed with no-store',async()=>{
  const calls=[];
  assert.equal(await verifyAnonymousClassroom(async(url,options)=>{calls.push({url,options});return secureResponse(url);},'https://ganesha-classroom.vercel.app'),11);
  assert.ok(calls.every(c=>c.options.redirect==='manual' && !c.options.headers?.Cookie));
  assert.ok(calls.some(c=>c.options.headers?.RSC==='1'));
  assert.ok(calls.some(c=>c.url.endsWith('/classroom/exercises/report.py')));
});

test('public HTML, SSO/wrong checkout redirects and cacheable responses never pass health',async()=>{
  for(const response of [
    new Response('<h1>Lesson</h1>',{status:200}),
    new Response(null,{status:307,headers:{location:CHECKOUT_URL,'cache-control':'no-store'}}),
    new Response(null,{status:303,headers:{location:'https://vercel.com/login','cache-control':'no-store'}}),
    new Response(null,{status:303,headers:{location:CHECKOUT_URL+'?token=wrong','cache-control':'no-store'}}),
    new Response(null,{status:303,headers:{location:CHECKOUT_URL,'cache-control':'public, max-age=3600'}}),
  ]) await assert.rejects(verifyAnonymousClassroom(async()=>response,'https://ganesha-classroom.vercel.app'),/classroom_/);
});

test('unguarded or pre-paywall candidates, including resumed jobs, never archive or upload',async t=>{
  const root=await mkdtemp(join(tmpdir(),'ganesha-guard-test-'));
  t.after(()=>rm(root,{recursive:true,force:true}));
  for(const resumed of [false,true]) for(const failure of ['ancestor','guard']) {
    const calls=[];
    const job={id:`guard-${resumed}-${failure}`,operation:{kind:'vercel-deploy',sha:'2ac2fe859db98687fc4e3acacfbf0c56526452d9',target:'classroom'},checkpoint:resumed?{deploymentId:'dpl_old'}:{}};
    const projectId='prj_UXy2A10eweruKwCIBHufQB9glCwa';
    const run=async(exe,args)=>{
      calls.push(args);
      if(args[2]?.startsWith('/v9/projects/'))return JSON.stringify({id:projectId,name:'ganesha-classroom'});
      if(args.includes('merge-base') && args.at(-2)===CLASSROOM_RELEASE.minimumCommit && failure==='ancestor')throw new OperationError('command_failed');
      if(args.includes('ls-tree'))return entry('README.md');
      return '';
    };
    const actions=createActions({runtimeRoot:root,projectId,teamId:TEAM_ID,scope:TEAM_SCOPE,vercelCli:'C:/cache/vercel/dist/vc.js'},{run});
    await assert.rejects(actions(job,{signal:new AbortController().signal,checkpoint:async()=>{throw Error('No mutation checkpoint expected');}}),failure==='ancestor'?/commit_predates_classroom_guard/:/classroom_guard_missing/);
    assert.ok(calls.some(a=>a.includes(`+refs/heads/${CLASSROOM_RELEASE.releaseBranch}:refs/heads/release`)));
    assert.equal(calls.some(a=>a.includes('archive') || a.includes('deploy') || a[2]?.startsWith('/v13/deployments/')),false);
  }
});
