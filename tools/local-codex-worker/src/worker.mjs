import { setTimeout as delay } from 'node:timers/promises';
import { STOP_CODES, validateJob, WorkerError } from './runner.mjs';
import { TransportError } from './client.mjs';

export async function retryPost(client, action, data, { signal, attempts = 5, sleep = delay } = {}) {
  for (let attempt = 0; ; attempt++) {
    try { return await client.post(action, data, { signal }); }
    catch (error) {
      if (signal?.aborted || !(error instanceof TransportError) ||
          (error.status >= 400 && error.status < 500 && error.status !== 429) || attempt >= attempts - 1) throw error;
      await sleep(Math.min(1000 * 2 ** attempt, 10000), undefined, { signal });
    }
  }
}

export async function executeJob(job, { client, workerId, runner, signal, heartbeatMs = 30000,
  log = () => {}, sleep = delay } = {}) {
  validateJob(job);
  const controller = new AbortController();
  const heartbeatController = new AbortController();
  const onShutdown = () => controller.abort(new WorkerError('worker_shutdown'));
  signal?.addEventListener('abort', onShutdown, { once: true });
  if (signal?.aborted) onShutdown();
  const identity = { workerId, jobId: job.jobId, leaseToken: job.leaseToken };
  let leaseExpiresAt = job.leaseExpiresAt;
  let leaseLost = false;
  const heartbeat = (async () => {
    while (!heartbeatController.signal.aborted) {
      try { await sleep(Math.min(heartbeatMs, Math.max(100, leaseExpiresAt - Date.now() - 15000)), undefined, { signal: heartbeatController.signal }); }
      catch { break; }
      if (heartbeatController.signal.aborted) break;
      try {
        const reply = await client.post('heartbeat', identity, { signal: heartbeatController.signal });
        if (reply.ok !== true || !Number.isSafeInteger(reply.leaseExpiresAt) || reply.leaseExpiresAt <= Date.now()) throw new TransportError('invalid_response');
        leaseExpiresAt = reply.leaseExpiresAt;
      } catch (error) {
        if (heartbeatController.signal.aborted) break;
        if (error.status === 409 || error.status === 401 || Date.now() >= leaseExpiresAt - 15000) {
          leaseLost = true;
          controller.abort(new WorkerError('lease_lost'));
          break;
        }
        log({ event: 'heartbeat_retry', jobId: job.jobId });
      }
    }
  })();
  try {
    log({ event: 'job_started', jobId: job.jobId, agent: job.agent });
    let generated;
    try { generated = await runner(job, { signal: controller.signal }); }
    catch (error) {
      if (leaseLost || error.code === 'lease_lost') return { state: 'lease_lost' };
      const code = error instanceof WorkerError && ['auth_required','usage_limit','model_unavailable','timeout',
        'invalid_output','runner_failed','worker_shutdown'].includes(error.code) ? error.code : 'runner_failed';
      try { await retryPost(client, 'fail', { ...identity, code, retryable: !STOP_CODES.has(code) }, { sleep }); }
      catch { log({ event: 'failure_ack_pending', jobId: job.jobId, code }); }
      log({ event: 'job_failed', jobId: job.jobId, code });
      return { state: STOP_CODES.has(code) ? 'paused' : 'failed', code };
    }
    if (leaseLost || controller.signal.aborted || Date.now() >= leaseExpiresAt) return { state: 'lease_lost' };
    try {
      const reply = await retryPost(client, 'complete', { ...identity, ...generated }, { signal: controller.signal, sleep });
      if (reply.ok !== true) throw new TransportError('invalid_response');
    } catch (error) {
      if (error.status === 409 || leaseLost) return { state: 'lease_lost' };
      if (error.status === 422) {
        try { await retryPost(client, 'fail', { ...identity, code: 'invalid_output', retryable: true }, { sleep }); } catch {}
        return { state: 'failed', code: 'invalid_output' };
      }
      // Do not send fail after an ambiguous complete response: the server may
      // already have accepted it. Stop and leave lease recovery to the broker.
      throw new WorkerError('completion_unconfirmed', { retryable: false });
    }
    log({ event: 'job_completed', jobId: job.jobId, agent: job.agent, model: generated.model });
    return { state: 'completed' };
  } finally {
    heartbeatController.abort();
    await heartbeat;
    signal?.removeEventListener('abort', onShutdown);
  }
}

export async function runWorker({ client, workerId, agents = ['landing-pages','devops'], runner,
  signal, log = () => {}, pollMs = 5000, sleep = delay, once = false }) {
  if (!/^[A-Za-z0-9_-]{1,64}$/.test(workerId) || agents.length === 0 ||
      !agents.every(a => ['landing-pages','devops'].includes(a))) throw new WorkerError('invalid_config');
  log({ event: 'worker_started', workerId, agents });
  while (!signal?.aborted) {
    let response;
    try { response = await retryPost(client, 'claim', { workerId, agents }, { signal, sleep }); }
    catch (error) {
      if (signal?.aborted) return;
      if ([401,400,404].includes(error.status) || error.code === 'invalid_response') throw error;
      log({ event: 'host_unavailable' });
      if (once) return { state: 'unavailable' };
      await sleep(30000, undefined, { signal }).catch(() => {});
      continue;
    }
    if (!Object.hasOwn(response, 'job')) throw new WorkerError('invalid_response');
    if (response.job === null) {
      if (once) return { state: 'idle' };
      await sleep(pollMs, undefined, { signal }).catch(() => {});
      continue;
    }
    const result = await executeJob(response.job, { client, workerId, runner, signal, log, sleep });
    if (result.state === 'paused' || once) return result;
  }
}
