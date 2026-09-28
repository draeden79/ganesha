import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runLandingJob, deliverLandingNotification, GenerationPendingError } from '../src/index.mjs';
const course = JSON.parse(readFileSync(new URL('../examples/course.json', import.meta.url), 'utf8'));
const claim = { requestKey: 'EvOne', threadKey: 'TTEAM:CLANDING:1.000001', token: 'lease-1', attempt: 1, brief: 'AI course for beginners: fundamentals and prompting.', previousCourse: null };
const generate = async () => ({ status: 'ready', questions: [], course });

test('Pending local generation releases the domain lease without failing, publishing or notifying', async () => {
  let deferred;
  const result = await runLandingJob('EvOne', { publicOrigin: 'https://courses.example', now: () => 1000,
    generate: async input => { assert.equal(input.requestKey, claim.requestKey); throw new GenerationPendingError(30000); },
    store: { claimJob: async () => claim, deferJob: async (lease, value) => { assert.equal(lease, claim); deferred = value; return true; },
      failJob: () => assert.fail('Waiting is not a model failure'), completeJob: () => assert.fail('Cannot publish pending work') } });
  assert.deepEqual(result, { status: 'pending', retryAfterMs: 30000 });
  assert.deepEqual(deferred, { now: 1000, retryAt: 31000 });
  const stale = await runLandingJob('EvOne', { publicOrigin: 'https://courses.example', now: () => 1000,
    generate: async () => { throw new GenerationPendingError(); }, store: { claimJob: async () => claim, deferJob: async () => false } });
  assert.equal(stale.status, 'superseded');
});

// Dependency fakes exercise worker decisions, not storage durability. The host must test its real adapter.
test('Worker makes one atomic completion request containing publication and notification', async () => {
  let committed;
  const result = await runLandingJob('EvOne', { publicOrigin: 'https://courses.example', generate,
    store: { claimJob: async () => claim, completeJob: async (lease, value) => { assert.equal(lease.token, 'lease-1'); committed = value; return true; } } });
  assert.equal(result.status, 'ready');
  assert.equal(committed.prepared.status, 'ready');
  assert.match(committed.notification.body, new RegExp(committed.prepared.url));
  assert.equal(committed.notification.threadKey, claim.threadKey);
});

test('A lost lease never reports completion; an unavailable claim never calls the model', async () => {
  const result = await runLandingJob('EvOne', { publicOrigin: 'https://courses.example', generate,
    store: { claimJob: async () => claim, completeJob: async () => false } });
  assert.equal(result.status, 'superseded');
  await runLandingJob('EvOne', { publicOrigin: 'https://courses.example', generate: () => assert.fail('Unexpected generation'),
    store: { claimJob: async () => null } });
});

test('Provider failure retains a retry and a third failure requests an explicit failure notification', async () => {
  for (const attempt of [1, 3]) {
    let failure;
    const result = await runLandingJob('EvOne', { publicOrigin: 'https://courses.example', now: () => 1000,
      generate: async () => { throw new Error('private provider error body'); },
      store: { claimJob: async () => ({ ...claim, attempt }), failJob: async (_lease, value) => { failure = value; return true; } } });
    assert.equal(result.status, attempt === 1 ? 'retry' : 'failed');
    assert.equal(failure.retryAt, attempt === 1 ? 61000 : null);
    assert.equal(JSON.stringify(failure).includes('private provider error'), false);
    assert.equal(Boolean(failure.notification), attempt === 3);
  }
});

test('Slack delivery retries the outbox independently and acknowledges only after send', async () => {
  const notice = { id: 'n1', threadKey: claim.threadKey, body: 'Published URL', token: 'n-lease', attempt: 1 };
  const calls = [];
  const store = { claimNotification: async () => notice,
    ackNotification: async () => calls.push('ack'), retryNotification: async () => calls.push('retry') };
  assert.equal((await deliverLandingNotification({ store, send: async () => { calls.push('send'); throw new Error('Slack unavailable'); } })).status, 'retry');
  assert.deepEqual(calls, ['send', 'retry']);
  calls.length = 0;
  assert.equal((await deliverLandingNotification({ store, send: async () => { calls.push('send'); } })).status, 'delivered');
  assert.deepEqual(calls, ['send', 'ack']);
});
