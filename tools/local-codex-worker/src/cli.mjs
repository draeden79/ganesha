import { mkdir, open, readFile, unlink } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { createClient } from './client.mjs';
import { runWorker } from './worker.mjs';
import { runCodex, WorkerError } from './runner.mjs';

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const runtimeRoot = resolve(packageRoot, '.runtime');
const log = event => process.stdout.write(JSON.stringify({ at: new Date().toISOString(), ...event }) + '\n');
const controller = new AbortController();
process.once('SIGINT', () => controller.abort(new WorkerError('worker_shutdown')));
process.once('SIGTERM', () => controller.abort(new WorkerError('worker_shutdown')));
let lock;
const lockPath = resolve(runtimeRoot, 'worker.lock');

try {
  await mkdir(runtimeRoot, { recursive: true });
  try { lock = await open(lockPath, 'wx', 0o600); }
  catch (error) {
    if (error.code !== 'EEXIST') throw error;
    let pid;
    try { pid = Number((await readFile(lockPath, 'utf8')).trim()); } catch {}
    let running = true;
    if (Number.isSafeInteger(pid) && pid > 0) {
      try { process.kill(pid, 0); } catch (check) { if (check.code === 'ESRCH') running = false; }
    }
    if (running) throw new WorkerError('worker_already_running');
    await unlink(lockPath);
    lock = await open(lockPath, 'wx', 0o600);
  }
  await lock.writeFile(String(process.pid));
  const client = createClient({ origin: process.env.GANESHA_ORIGIN, token: process.env.LOCAL_WORKER_TOKEN });
  const model = process.env.LOCAL_CODEX_MODEL || 'gpt-6-astra';
  const reasoningEffort = process.env.LOCAL_CODEX_REASONING || 'xhigh';
  const result = await runWorker({ client, workerId: process.env.LOCAL_WORKER_ID || 'ganesha-windows-1',
    agents: (process.env.LOCAL_WORKER_AGENTS || 'landing-pages,devops').split(','),
    signal: controller.signal, log, once: process.argv.includes('--once'),
    runner: (job, { signal }) => runCodex(job, { runtimeRoot: resolve(runtimeRoot, 'jobs'),
      executable: process.env.CODEX_EXECUTABLE || 'codex', model, reasoningEffort, signal, onMetadata: log }),
  });
  if (result?.state === 'paused') { log({ event: 'worker_paused', code: result.code }); process.exitCode = 2; }
  else log({ event: 'worker_stopped', state: result?.state || 'stopped' });
} catch (error) {
  log({ event: 'worker_stopped', code: error instanceof WorkerError ? error.code : 'startup_failed' });
  process.exitCode = 1;
} finally {
  if (lock) { await lock.close(); await unlink(lockPath).catch(() => {}); }
}

