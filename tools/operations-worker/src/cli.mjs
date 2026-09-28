import { mkdir, open, readFile, readdir, unlink, access } from 'node:fs/promises';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from 'redis';
import { createActions } from './actions.mjs';
import { runWorker } from './worker.mjs';
import { OperationError, requireCondition, TEAM_ID, TEAM_SCOPE } from './core.mjs';
import { CLASSROOM_RELEASE } from './classroom-guard.mjs';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const runtimeRoot=join(root,'.runtime'); const lockPath=join(runtimeRoot,'worker.lock');
const log=event=>process.stdout.write(JSON.stringify({at:new Date().toISOString(),...event})+'\n');
const controller=new AbortController(); let lock,client;
process.once('SIGINT',()=>controller.abort());process.once('SIGTERM',()=>controller.abort());
async function findVercel() {
  if(process.env.OPERATIONS_VERCEL_CLI)return process.env.OPERATIONS_VERCEL_CLI;
  const cache=join(process.env.LOCALAPPDATA || '', 'npm-cache','_npx');
  const candidates=[];
  for(const entry of await readdir(cache,{withFileTypes:true})) if(entry.isDirectory()) {
    const path=join(cache,entry.name,'node_modules','vercel','dist','vc.js');
    try { await access(path); candidates.push(path); } catch {}
  }
  requireCondition(candidates.length===1,'set_vercel_cli_path');return candidates[0];
}
try {
  requireCondition(process.env.OPERATIONS_WORKER_ENABLED==='true','worker_not_enabled');
  await mkdir(runtimeRoot,{recursive:true});
  try {lock=await open(lockPath,'wx',0o600);} catch(error) {
    if(error.code!=='EEXIST')throw error;
    const pid=Number((await readFile(lockPath,'utf8')).trim());requireCondition(Number.isSafeInteger(pid)&&pid>0,'invalid_lock');
    let alive=true;try{process.kill(pid,0);}catch(e){if(e.code==='ESRCH')alive=false;}
    requireCondition(!alive,'worker_already_running');await unlink(lockPath);lock=await open(lockPath,'wx',0o600);
  }
  await lock.writeFile(String(process.pid));
  const actions=createActions({runtimeRoot,projectId:process.env.OPERATIONS_CLASSROOM_PROJECT_ID,
    teamId:process.env.OPERATIONS_VERCEL_TEAM_ID || TEAM_ID,scope:process.env.OPERATIONS_VERCEL_SCOPE || TEAM_SCOPE,vercelCli:await findVercel()});
  const {createOperationsStore}=await import('../../../src/lib/operations-store.mjs');
  requireCondition(typeof process.env.REDIS_URL==='string' && /^rediss?:\/\//.test(process.env.REDIS_URL),'missing_redis_url');
  client=createClient({url:process.env.REDIS_URL});client.on('error',()=>log({event:'redis_connection_error'}));await client.connect();
  const store=createOperationsStore(client,{namespace:'ganesha:operations:production',leaseMs:180000});
  log({event:'operations_worker_started',pid:process.pid,classroomGuardCommit:CLASSROOM_RELEASE.minimumCommit});
  await runWorker({store,actions,workerId:process.env.OPERATIONS_WORKER_ID || 'ganesha-operations-windows-1',signal:controller.signal,once:process.argv.includes('--once'),log});
} catch(error) { if(!controller.signal.aborted) {log({event:'operations_worker_stopped',code:error instanceof OperationError?error.code:'startup_or_store_failure'});process.exitCode=1;} }
finally { if(client?.isOpen) await client.quit().catch(()=>client.destroy());if(lock){await lock.close();await unlink(lockPath).catch(()=>{});} }
