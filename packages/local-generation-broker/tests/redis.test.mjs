import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { createClient } from 'redis';
import { createRedisGenerationBroker } from '../src/index.mjs';

const url = process.env.REDIS_TEST_URL || (process.env.GANESHA_RUN_REDIS_TESTS === '1' ? process.env.REDIS_URL : '');
test('Real Redis: claim fencing, heartbeats, restart, idempotency, schema fidelity, bounded failures and offline retention', { skip: !url, timeout: 60000 }, async () => {
  const c = createClient({ url, socket: { connectTimeout: 15000, reconnectStrategy: false } }); c.on('error', () => {});
  const namespace = `ganesha:test:${randomUUID()}`;
  const namespace2 = `${namespace}:isolated`;
  const keys = [namespace, namespace2].flatMap(n => [`{${n}}:jobs`, `{${n}}:pending`]);
  let time = 100000;
  const schema = { type: 'object', properties: { text: { type: 'string', minLength: 1 }, items: { type: 'array', items: { type: 'string' } } }, required: ['text', 'items'], additionalProperties: false };
  const job = (jobId, agent = 'landing-pages') => ({ jobId, agent, system: 'Generate JSON.', input: 'Synthetic test only.', outputSchema: schema });
  const owner = (claim, workerId = 'one') => ({ jobId: claim.jobId, workerId, leaseToken: claim.leaseToken });
  const finish = claim => ({ ...owner(claim), result: { text: 'Valid', items: [] }, model: 'gpt-6-astra', reasoningEffort: 'xhigh' });
  try {
    await c.connect();
    const options = { namespace, now: () => time, leaseMs: 1000, maxPending: 2 };
    const b = createRedisGenerationBroker(c, options), second = createRedisGenerationBroker(c, options);
    await b.enqueue(job('first')); await b.enqueue(job('second', 'devops'));
    assert.deepEqual(await b.enqueue(job('first')), { status: 'pending' });
    await assert.rejects(b.enqueue({ ...job('first'), input: 'Different' }), { code: 'job_conflict' });
    await assert.rejects(b.enqueue(job('third')), { code: 'queue_full' });
    const claims = await Promise.all([b.claim({ workerId: 'one', agents: ['landing-pages'] }), second.claim({ workerId: 'two', agents: ['landing-pages'] })]);
    assert.equal(claims.filter(Boolean).length, 1);
    const initial = claims.find(Boolean); const worker = claims[0] ? 'one' : 'two';
    assert.deepEqual(initial.outputSchema, schema);
    time += 500;
    assert.equal((await b.heartbeat(owner(initial, worker))).leaseExpiresAt, time + 1000);
    time += 600;
    assert.equal(await second.claim({ workerId: 'one', agents: ['landing-pages'] }), null);
    time += 500;
    assert.equal((await b.status('first')).status, 'pending');
    const recovered = await second.claim({ workerId: 'one', agents: ['landing-pages'] });
    assert.notEqual(initial.leaseToken, recovered.leaseToken);
    await assert.rejects(b.heartbeat(owner(initial, worker)), { code: 'lease_lost' });
    await assert.rejects(b.complete({ ...finish(initial), workerId: worker }), { code: 'lease_lost' });
    await assert.rejects(b.complete({ ...finish(recovered), result: { text: 'missing items' } }), { code: 'invalid_result' });
    assert.equal((await b.status('first')).status, 'leased');
    await b.complete(finish(recovered)); await second.complete(finish(recovered));
    await assert.rejects(b.complete({ ...finish(recovered), result: { text: 'Conflict', items: [] } }), { code: 'lease_lost' });
    // JSON strings preserve empty arrays through Redis Lua cjson round trips.
    assert.deepEqual((await createRedisGenerationBroker(c, options).status('first')).result, { items: [], text: 'Valid' });
    const isolated = createRedisGenerationBroker(c, { ...options, namespace: namespace2 });
    assert.equal(await isolated.status('first'), null);
    assert.equal(await c.ttl(keys[0]), -1); assert.equal(await c.ttl(keys[1]), -1);

    const devops = await b.claim({ workerId: 'one', agents: ['devops'] });
    await assert.rejects(b.fail({ ...owner(devops), workerId: 'intruder', code: 'timeout', retryable: true }), { code: 'lease_lost' });
    for (let i = 0; i < 5; i++) {
      const current = i ? await b.claim({ workerId: 'one', agents: ['devops'] }) : devops;
      const failure = { ...owner(current), code: i === 4 ? 'worker_shutdown' : 'auth_required', retryable: false };
      await b.fail(failure); await second.fail(failure);
      assert.equal((await b.status('second')).status, 'pending'); time += 60001;
    }
    for (let i = 0; i < 3; i++) {
      const current = await b.claim({ workerId: 'one', agents: ['devops'] });
      await b.fail({ ...owner(current), code: 'timeout', retryable: true });
      assert.equal((await b.status('second')).status, i === 2 ? 'failed' : 'pending'); time += 60001;
    }
    await b.enqueue(job('offline'));
    time += 30 * 86400000;
    assert.equal((await createRedisGenerationBroker(c, options).status('offline')).status, 'pending');
    const resumed = await second.claim({ workerId: 'one', agents: ['landing-pages'] });
    assert.equal(resumed.jobId, 'offline');
    await b.fail({ ...owner(resumed), code: 'invalid_output', retryable: false });
    assert.equal((await b.status('offline')).status, 'failed');
    assert.equal(await c.ttl(keys[0]), -1);
  } finally {
    // Only this test's exact, randomly named keys; never FLUSHDB or production namespaces.
    if (c.isOpen) { await c.del(keys); await c.quit(); }
  }
});
