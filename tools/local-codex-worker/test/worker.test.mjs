import test from 'node:test';
import assert from 'node:assert/strict';
import { EventEmitter } from 'node:events';
import { PassThrough } from 'node:stream';
import { mkdtemp, readFile, writeFile, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve, sep } from 'node:path';
import { createClient, TransportError } from '../src/client.mjs';
import { executeJob, runWorker } from '../src/worker.mjs';
import { childEnvironment, codexArgs, runCodex, WorkerError } from '../src/runner.mjs';

const sampleJob = () => ({ version: 1, jobId: 'opaque-job-123', agent: 'landing-pages',
  system: 'Generate course data only.', input: 'Some untrusted content $(echo secret)',
  outputSchema: { type: 'object', properties: { text: { type: 'string' } }, required: ['text'], additionalProperties: false },
  leaseToken: 'lease-token-with-enough-entropy', leaseExpiresAt: Date.now() + 180000 });
const generated = { result: { text: 'Result' }, model: 'gpt-6-astra', reasoningEffort: 'xhigh' };
const noDelay = async () => {};

test('transport requires HTTPS and sends token only to a fixed nonredirecting origin', async () => {
  assert.throws(() => createClient({ origin: 'http://example.com', token: 'x'.repeat(43) }));
  assert.throws(() => createClient({ origin: 'https://example.com/path', token: 'x'.repeat(43) }));
  assert.throws(() => createClient({ origin: 'https://evil@example.com', token: 'x'.repeat(43) }));
  let request;
  const client = createClient({ origin: 'https://example.com', token: 'x'.repeat(43), fetchImpl: async (url, options) => {
    request = { url, options }; return Response.json({ job: null });
  } });
  assert.deepEqual(await client.post('claim', { workerId: 'worker' }), { job: null });
  assert.equal(request.url, 'https://example.com/api/local-worker/claim');
  assert.equal(request.options.redirect, 'error');
  assert.equal(request.options.headers.Authorization, 'Bearer ' + 'x'.repeat(43));
  await assert.rejects(client.post('../outside', {}));
});

test('transport hides remote error content and rejects oversized bodies', async () => {
  const client = createClient({ origin: 'https://example.com', token: 'x'.repeat(43),
    fetchImpl: async () => Response.json({ error: { code: 'raw-secret-content' } }, { status: 503 }) });
  await assert.rejects(client.post('claim', {}), error => error.message === 'unavailable');
  const huge = createClient({ origin: 'https://example.com', token: 'x'.repeat(43),
    fetchImpl: async () => new Response('a'.repeat(300000)) });
  await assert.rejects(huge.post('claim', {}), error => error.code === 'invalid_response');
});

test('Codex subprocess gets no worker secret, API key, or inherited chat transport', () => {
  assert.deepEqual(childEnvironment({ PATH: 'safe-path', USERPROFILE: 'safe-home',
    CODEX_HOME: 'safe-codex-home', LOCAL_WORKER_TOKEN: 'secret', OPENAI_API_KEY: 'secret',
    CODEX_API_KEY: 'secret', CODEX_THREAD_ID: 'parent', NODE_OPTIONS: '--require bad' }),
    { PATH: 'safe-path', USERPROFILE: 'safe-home', CODEX_HOME: 'safe-codex-home' });
  const args = codexArgs({ cwd: 'work', schemaPath: 'schema', outputPath: 'output' });
  for (const value of ['read-only','approval_policy="never"','forced_login_method="chatgpt"',
    'mcp_servers={}','web_search="disabled"','--ignore-user-config','--ephemeral']) assert.ok(args.includes(value));
  for (const feature of ['shell_tool','apps','plugins','hooks','multi_agent','browser_use','computer_use']) {
    assert.equal(args[args.indexOf(feature) - 1], '--disable');
  }
  assert.throws(() => codexArgs({ model: '$(evil)', cwd: 'work', schemaPath: 'schema', outputPath: 'output' }));
});

test('runner passes input only by stdin, returns JSON and removes only its generated job directory', async () => {
  const parent = await mkdtemp(join(tmpdir(), 'ganesha-worker-test-'));
  try {
    await writeFile(join(parent, 'keep.txt'), 'keep');
    let captured;
    const result = await runCodex(sampleJob(), { runtimeRoot: parent, spawnImpl: (executable, args, options) => {
      const child = new EventEmitter();
      child.stdin = new PassThrough(); child.stdout = new PassThrough(); child.stderr = new PassThrough();
      child.kill = () => { child.killed = true; child.emit('close', 1); };
      captured = { executable, args, options, input: '' };
      child.stdin.on('data', chunk => { captured.input += chunk; });
      child.stdin.on('finish', async () => {
        const outputPath = args[args.indexOf('--output-last-message') + 1];
        await writeFile(outputPath, JSON.stringify({ text: 'Result' }));
        child.stdout.write('{"type":"turn.completed"}\n');
        child.emit('close', 0);
      });
      return child;
    } });
    assert.deepEqual(result, generated);
    assert.equal(captured.options.shell, false);
    assert.equal(captured.options.windowsHide, true);
    assert.ok(!captured.args.join(' ').includes('untrusted content'));
    assert.ok(captured.input.includes('untrusted content'));
    assert.equal(await readFile(join(parent, 'keep.txt'), 'utf8'), 'keep');
    assert.deepEqual(await readdir(parent), ['keep.txt']);
  } finally {
    const target = resolve(parent); const root = resolve(tmpdir());
    assert.ok(target.startsWith(root + sep) && target.includes('ganesha-worker-test-'));
    await rm(target, { recursive: true, force: true });
  }
});

test('lost completion acknowledgement retries identical result without regenerating', async () => {
  let generations = 0; const completions = [];
  const client = { async post(action, body) {
    assert.equal(action, 'complete'); completions.push(body);
    if (completions.length === 1) throw new TransportError('unavailable');
    return { ok: true };
  } };
  // Keep heartbeat sleeps real; make only short HTTP retry sleeps immediate.
  const sleep = (ms, value, options) => ms < 10000 ? noDelay() : import('node:timers/promises').then(m => m.setTimeout(ms, value, options));
  const result = await executeJob(sampleJob(), { client, workerId: 'worker',
    runner: async () => { generations++; return generated; }, sleep });
  assert.equal(result.state, 'completed'); assert.equal(generations, 1);
  assert.equal(completions.length, 2); assert.deepEqual(completions[0], completions[1]);
});

test('lease loss aborts generation and never completes or fails a stale job', async () => {
  const actions = [];
  const client = { async post(action) { actions.push(action); throw new TransportError('lease_lost', 409); } };
  const result = await executeJob(sampleJob(), { client, workerId: 'worker', heartbeatMs: 5,
    runner: (_job, { signal }) => new Promise((_, reject) => signal.addEventListener('abort', () => reject(signal.reason), { once: true })) });
  assert.equal(result.state, 'lease_lost'); assert.deepEqual(actions, ['heartbeat']);
});

test('usage limit retains retry information and stops the worker before a second claim', async () => {
  const actions = [];
  const client = { async post(action, body) {
    actions.push({ action, body });
    return action === 'claim' ? { job: sampleJob() } : { ok: true };
  } };
  const result = await runWorker({ client, workerId: 'worker',
    runner: async () => { throw new WorkerError('usage_limit'); } });
  assert.equal(result.state, 'paused');
  assert.deepEqual(actions.map(a => a.action), ['claim','fail']);
  assert.equal(actions[1].body.code, 'usage_limit');
  assert.equal(actions[1].body.retryable, false);
  assert.equal(Object.hasOwn(actions[1].body, 'message'), false);
});

test('uncertain completion stops without releasing a potentially completed job', async () => {
  const actions = [];
  const client = { async post(action) { actions.push(action); throw new TransportError('unavailable'); } };
  const sleep = (ms, value, options) => ms <= 10000 ? noDelay() : import('node:timers/promises').then(m => m.setTimeout(ms, value, options));
  await assert.rejects(executeJob(sampleJob(), { client, workerId: 'worker', runner: async () => generated, sleep }),
    error => error.code === 'completion_unconfirmed');
  assert.equal(actions.length, 5); assert.ok(actions.every(a => a === 'complete'));
});

test('host schema rejection follows bounded generation failure path', async () => {
  const actions = [];
  const client = { async post(action) {
    actions.push(action);
    if (action === 'complete') throw new TransportError('invalid_result', 422);
    return { ok: true };
  } };
  const result = await executeJob(sampleJob(), { client, workerId: 'worker', runner: async () => generated });
  assert.deepEqual(result, { state: 'failed', code: 'invalid_output' });
  assert.deepEqual(actions, ['complete','fail']);
});

test('idle one-shot worker exits cleanly without starting Codex', async () => {
  const result = await runWorker({ client: { post: async () => ({ job: null }) }, workerId: 'worker',
    once: true, runner: async () => { throw new Error('Must not run'); } });
  assert.equal(result.state, 'idle');
});
