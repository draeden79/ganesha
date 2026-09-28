import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID, createHash } from 'node:crypto';
import { createClient } from 'redis';
import { createDevopsStore } from '../src/lib/devops-store.mjs';
const url = process.env.REDIS_TEST_URL || (process.env.GANESHA_RUN_REDIS_TESTS === '1' ? process.env.REDIS_URL : '');
test('Redis DevOps queue preserves order, history snapshots, reply fencing and stop across restarts', { skip: !url }, async () => {
  const client = createClient({ url, socket: { connectTimeout: 15000, reconnectStrategy: false } }); client.on('error', () => {});
  const namespace = `ganesha:test:devops:${randomUUID()}`;
  const one = { requestKey: 'one', threadKey: 'thread', text: 'First request', actorId: 'person' };
  const two = { ...one, requestKey: 'two', text: 'Followup' };
  const three = { ...one, requestKey: 'three', text: 'New task' };
  const hash = (s: string) => createHash('sha256').update(s).digest('hex');
  const keys = ['one', 'two', 'three'].map(s => `{${namespace}}:job:${hash(s)}`).concat([`{${namespace}}:thread:${hash('thread')}`, `{${namespace}}:queue:${hash('thread')}`]);
  try {
    await client.connect(); const s = createDevopsStore(client, { namespace });
    assert.equal(await s.enqueue(one, [{ role: 'user', content: 'Previous context' }]), true);
    assert.equal(await s.enqueue(one), false); await s.enqueue(two);
    assert.equal(await s.prepare(two), null);
    assert.equal((await s.prepare(one))!.history[0].content, 'Previous context');
    const restarted = createDevopsStore(client, { namespace });
    assert.equal((await restarted.prepare(one))!.history[0].content, 'Previous context');
    assert.equal(await restarted.commit(one, 'Plan', [{ role: 'assistant', content: 'Plan' }], 1000), true);
    assert.equal(await s.commit(one, 'Duplicate', [], 1000), false);
    assert.equal(await s.prepare(two), null);
    const delivery = (await s.claimDelivery(one, 1001))!;
    assert.equal(await s.claimDelivery(one, 1002), null);
    assert.equal(await s.finishDelivery(one, 'stale', true, 1003), false);
    assert.equal(await s.finishDelivery(one, delivery.deliveryToken!, true, 1003), true);
    assert.equal((await s.prepare(two))!.history[0].content, 'Plan');
    await s.stop('thread');
    assert.equal((await s.prepare(two))!.status, 'cancelled');
    assert.equal(await s.commit(two, 'Stale', [], 1004), false);
    await s.enqueue(three); assert.deepEqual((await s.prepare(three))!.history, []);
  } finally { if (client.isOpen) { await client.del(keys); await client.quit(); } }
});
