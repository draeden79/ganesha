import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { createRedisLandingStore, createRedisGatewayStore, prepareLandingPage } from '../src/index.mjs';

const redisUrl = process.env.REDIS_TEST_URL || (process.env.GANESHA_RUN_REDIS_TESTS === '1' ? process.env.REDIS_URL : undefined);
const sample = JSON.parse(readFileSync(new URL('../examples/course.json', import.meta.url), 'utf8'));

test('Real Redis: deduplication, competing workers, expired leases, atomic revisions, recovery and outbox', { skip: !redisUrl }, async t => {
  const { createClient } = await import(process.env.GANESHA_REDIS_MODULE || 'redis');
  const namespace = 'ganesha:test:' + randomUUID();
  const client = createClient({ url: redisUrl, socket: { connectTimeout: 15000 } });
  client.on('error', () => {});
  await client.connect();
  t.after(async () => {
    // Exact random test namespace only. Never FLUSHDB or touch application keys.
    for await (const keys of client.scanIterator({ MATCH: `{${namespace}}:*`, COUNT: 100 })) {
      if (keys.length) await client.del(keys);
    }
    await client.quit();
  });
  const a = createRedisLandingStore(client, { namespace });
  const b = createRedisLandingStore(client, { namespace });
  const input = { requestKey: 'EvOne', threadKey: 'TTEAM:CLANDING:1700000000.000001', text: 'AI for beginners, covering fundamentals and prompts.', actorId: 'UOWNER', now: 1000 };
  assert.equal(await a.enqueue(input), true);
  assert.equal(await b.enqueue(input), false);
  assert.equal(await a.enqueue({ ...input, requestKey: 'EvTwo', text: 'Revise the introduction.', now: 1001 }), true);
  assert.equal(await b.claimJob('EvTwo', { now: 1002, leaseMs: 100 }), null);
  const competing = await Promise.all([a.claimJob('EvOne', { now: 1002, leaseMs: 100 }), b.claimJob('EvOne', { now: 1002, leaseMs: 100 })]);
  assert.equal(competing.filter(Boolean).length, 1);
  const stale = competing.find(Boolean);
  const recovered = await b.claimJob('EvOne', { now: 1103, leaseMs: 100 });
  assert.ok(recovered); assert.notEqual(stale.token, recovered.token);
  const prepared = await prepareLandingPage({ ...recovered, publicOrigin: 'https://courses.example' }, { generate: async () => ({ status: 'ready', questions: [], course: structuredClone(sample) }) });
  const completion = { prepared, notification: { threadKey: input.threadKey, body: `Published: ${prepared.url}` }, now: 1104 };
  assert.equal(await a.completeJob(stale, completion), false);
  assert.equal(await b.readPage(prepared.slug), null);
  assert.equal(await b.completeJob(recovered, completion), true);
  assert.equal(await a.completeJob(recovered, completion), false);
  assert.match((await a.readPage(prepared.slug)).html, /Demonstration course page/);
  // Reconstruct the adapter as if the process restarted: no local memory is required.
  const restarted = createRedisLandingStore(client, { namespace });
  assert.equal((await restarted.jobStatus('EvOne')).status, 'ready');
  const next = await restarted.claimJob('EvTwo', { now: 1105, leaseMs: 100 });
  assert.equal(next.previousCourse.title, sample.title);
  assert.match(next.brief, /AI for beginners/); assert.match(next.brief, /Revise the introduction/);
  assert.equal(await restarted.failJob(next, { code: 'provider_failed', now: 1106, retryAt: 1200, notification: null }), true);
  assert.equal((await restarted.readPage(prepared.slug)).html, prepared.html);
  assert.equal(await restarted.claimJob('EvTwo', { now: 1199, leaseMs: 100 }), null);
  assert.deepEqual(await restarted.pendingJobs({ now: 1200, limit: 10 }), ['EvTwo']);
  const retry = await restarted.claimJob('EvTwo', { now: 1200, leaseMs: 100 });
  assert.equal(retry.attempt, 2);
  const revisedCourse = structuredClone(sample); revisedCourse.closing = 'Updated after recovery.';
  const revision = await prepareLandingPage({ ...retry, publicOrigin: 'https://courses.example' }, { generate: async () => ({ status: 'ready', questions: [], course: revisedCourse }) });
  assert.equal(revision.url, prepared.url);
  assert.equal(await restarted.completeJob(retry, { prepared: revision, notification: { threadKey: input.threadKey, body: 'Updated' }, now: 1201 }), true);
  assert.match((await restarted.readPage(prepared.slug)).html, /Updated after recovery/);
  const notice = await restarted.claimNotification({ requestKey: 'EvOne', now: 1202, leaseMs: 100 });
  assert.ok(notice);
  assert.equal(await a.claimNotification({ requestKey: 'EvOne', now: 1203, leaseMs: 100 }), null);
  await restarted.retryNotification(notice, { now: 1203, retryAt: 1300 });
  assert.equal(await restarted.claimNotification({ requestKey: 'EvOne', now: 1299, leaseMs: 100 }), null);
  const retryNotice = await a.claimNotification({ requestKey: 'EvOne', now: 1300, leaseMs: 100 });
  assert.equal(retryNotice.attempt, 2);
  await a.ackNotification(retryNotice, { now: 1301 });
  assert.equal((await b.notificationStatus('EvOne')).status, 'delivered');
  assert.equal(await b.claimNotification({ requestKey: 'EvOne', now: 1500, leaseMs: 100 }), null);
  const expiredNotice = await a.claimNotification({ requestKey: 'EvTwo', now: 1500, leaseMs: 100 });
  const newerNotice = await b.claimNotification({ requestKey: 'EvTwo', now: 1601, leaseMs: 100 });
  await assert.rejects(a.ackNotification(expiredNotice, { now: 1602 }));
  await b.ackNotification(newerNotice, { now: 1602 });
  assert.equal((await a.notificationStatus('EvTwo')).status, 'delivered');
  assert.equal(await a.enqueue({ ...input, requestKey: 'EvThree', text: 'Add another module.', now: 1603 }), true);
  const clarificationClaim = await b.claimJob('EvThree', { now: 1604, leaseMs: 100 });
  const clarification = await prepareLandingPage({ ...clarificationClaim, publicOrigin: 'https://courses.example' }, {
    generate: async () => ({ status: 'needs_information', questions: ['What should the module cover?'], course: null }),
  });
  assert.equal(await b.completeJob(clarificationClaim, { prepared: clarification, notification: { threadKey: input.threadKey, body: clarification.reply }, now: 1605 }), true);
  assert.match((await a.readPage(prepared.slug)).html, /Updated after recovery/);
  assert.equal((await a.jobStatus('EvThree')).status, 'needs_information');
  const unconnectedNamespace = createRedisLandingStore(client, { namespace: namespace + ':other' });
  assert.equal(await unconnectedNamespace.readPage(prepared.slug), null);
  for await (const keys of client.scanIterator({ MATCH: `{${namespace}}:page:*`, COUNT: 100 })) {
    for (const key of keys) assert.equal(await client.ttl(key), -1, 'Public page pointer must not expire with conversation history');
  }
  const gateway = createRedisGatewayStore(client, { namespace, dailyLimit: 1 });
  assert.equal(await gateway.bind('test-thread', 'landing-pages'), 'landing-pages');
  assert.equal(await gateway.bind('test-thread', 'devops'), 'landing-pages');
  assert.equal(await gateway.getBinding('test-thread'), 'landing-pages');
  const gateClaim = await gateway.claim('test-request-1', { userId: 'UONE', charge: true });
  assert.equal(gateClaim.status, 'claimed'); assert.equal(gateClaim.limit, undefined);
  assert.equal((await gateway.claim('test-request-1', { userId: 'UONE', charge: true })).status, 'busy');
  await gateway.release('test-request-1', gateClaim.token);
  const gateRetry = await gateway.claim('test-request-1', { userId: 'UONE', charge: true });
  assert.equal(gateRetry.status, 'claimed'); assert.equal(gateRetry.limit, undefined, 'Same-request retry must not consume quota or hit cooldown');
  await gateway.finish('test-request-1', gateRetry.token);
  assert.equal((await gateway.claim('test-request-1', { userId: 'UONE', charge: true })).status, 'done');
  assert.equal((await gateway.claim('test-request-2', { userId: 'UTWO', charge: true })).limit, 'daily');
  await gateway.cacheUser('UONE', { isBot: false, deleted: false });
  assert.deepEqual(await gateway.getUser('UONE'), { isBot: false, deleted: false });
});
