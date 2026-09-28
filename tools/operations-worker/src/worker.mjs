import { setTimeout as delay } from 'node:timers/promises';
import { OperationError, requireCondition } from './core.mjs';

export async function executeJob(job,{store,actions,signal,heartbeatMs=30000,sleep=delay,log=()=>{}}) {
  requireCondition(typeof job.leaseToken==='string' && Number.isSafeInteger(job.leaseExpiresAt),'invalid_lease');
  const runController=new AbortController(); const heartbeatController=new AbortController();
  const shutdown=()=>runController.abort(); signal?.addEventListener('abort',shutdown,{once:true});
  if(signal?.aborted) shutdown();
  let expires=job.leaseExpiresAt;
  const heartbeat=(async()=>{
    while(!heartbeatController.signal.aborted) {
      try { await sleep(Math.min(heartbeatMs,Math.max(100,expires-Date.now()-15000)),undefined,{signal:heartbeatController.signal}); } catch { break; }
      if(heartbeatController.signal.aborted) break;
      try { if(!await store.heartbeat(job.id,job.leaseToken)) { runController.abort(); break; } expires=Date.now()+180000; }
      catch { if(Date.now()>=expires-15000) { runController.abort(); break; } }
    }
  })();
  const checkpoint=async patch=>{
    if(runController.signal.aborted || Date.now()>=expires) throw new OperationError('lease_lost');
    if(!await store.checkpoint(job.id,job.leaseToken,patch)) {runController.abort();throw new OperationError('lease_lost');}
    job.checkpoint={...job.checkpoint,...patch};
  };
  log({event:'operation_started',jobId:job.id,kind:job.operation?.kind});
  try {
    let result;
    try { result=await actions(job,{signal:runController.signal,checkpoint}); }
    catch(error) {
      if(runController.signal.aborted || signal?.aborted) return {state:'interrupted'};
      const code=error instanceof OperationError?error.code:'operation_failed';
      result={ok:false,body:`Operation did not complete: ${code}. Saved checkpoints are retained. Operator review may be needed before retrying.`};
      log({event:'operation_failed',jobId:job.id,code});
    }
    if(runController.signal.aborted || Date.now()>=expires) return {state:'lease_lost'};
    // The same result is retried after an ambiguous completion; no side effect is re-run.
    for(let attempt=0;attempt<4;attempt++) {
      try {
        const accepted=await store.complete(job.id,job.leaseToken,result);
        log({event:accepted?'operation_completed':'operation_completion_fenced',jobId:job.id,ok:result.ok});
        return {state:accepted?'completed':'fenced'};
      } catch {
        if(attempt===3) throw new OperationError('completion_unconfirmed');
        await sleep(1000*(attempt+1),undefined,{signal:runController.signal});
      }
    }
  } finally { heartbeatController.abort(); await heartbeat; signal?.removeEventListener('abort',shutdown); }
}
export async function runWorker({store,actions,workerId,signal,once=false,sleep=delay,log=()=>{}}) {
  requireCondition(/^[A-Za-z0-9_-]{1,64}$/.test(workerId),'invalid_worker_id');
  while(!signal?.aborted) {
    let job;
    try { job=await store.claim(workerId); }
    catch { log({event:'operations_store_unavailable'}); if(once) throw new OperationError('store_unavailable'); await sleep(10000,undefined,{signal});continue; }
    if(!job) { if(once)return; await sleep(5000,undefined,{signal}); continue; }
    await executeJob(job,{store,actions,signal,sleep,log}); if(once)return;
  }
}
