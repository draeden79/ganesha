import test from 'node:test';
import assert from 'node:assert/strict';
import { createRedisGenerationBroker, BrokerError } from '../src/index.mjs';

const schema = { type: 'object', properties: { text: { type: 'string', minLength: 1, maxLength: 30 } }, required: ['text'], additionalProperties: false };
const input = { jobId: 'job_1', agent: 'devops', system: 'Return a short plan.', input: 'Plan staging.', outputSchema: schema };
const owner = { jobId: 'job_1', workerId: 'worker_1', leaseToken: 'lease_1' };
const result = { ...owner, result: { text: 'Plan' }, model: 'gpt-6-astra', reasoningEffort: 'xhigh' };
const fails = code => error => error instanceof BrokerError && error.code === code;

test('Invalid identities, payloads, agent filters and failure codes never access Redis', async () => {
  const client = { eval: () => assert.fail('Redis must not run'), hGet: () => assert.fail('Redis must not run') };
  const b = createRedisGenerationBroker(client, { namespace: 'test' });
  for (const job of [{ ...input, jobId: '../oops' }, { ...input, agent: 'other' }, { ...input, input: '' },
    { ...input, outputSchema: { type: 'made-up' } }, { ...input, outputSchema: { $async: true, type: 'object' } }]) {
    await assert.rejects(b.enqueue(job), fails('invalid_request'));
  }
  await assert.rejects(b.claim({ workerId: 'worker', agents: [] }), fails('invalid_request'));
  await assert.rejects(b.claim({ workerId: 'worker', agents: ['devops', 'devops'] }), fails('invalid_request'));
  await assert.rejects(b.fail({ ...owner, code: 'raw error with a token', retryable: true }), fails('invalid_request'));
  await assert.rejects(b.enqueue({ ...input, system: '🧠'.repeat(16000), input: '🧠'.repeat(64000) }), fails('payload_too_large'));
  assert.throws(() => createRedisGenerationBroker(client, { namespace: 'bad{slot}' }), fails('invalid_request'));
});

test('Schema and domain validation reject bad output without accepting a result', async () => {
  let writes = 0;
  const record = { ...owner, status: 'leased', agent: 'devops', leaseExpiresAt: 2000, outputSchemaJson: JSON.stringify(schema) };
  const client = { hGet: async () => JSON.stringify(record), eval: async () => { writes++; return 1; } };
  const b = createRedisGenerationBroker(client, { namespace: 'test', now: () => 1000,
    validateResult: ({ result }) => { if (result.text === 'forbidden') throw new Error('domain-specific private error'); } });
  for (const text of ['', 'a'.repeat(31), 123, 'forbidden']) await assert.rejects(b.complete({ ...result, result: { text } }), fails('invalid_result'));
  await assert.rejects(b.complete({ ...result, result: { text: 'Plan', extra: true } }), fails('invalid_result'));
  assert.equal(writes, 0);
  assert.deepEqual(await b.complete(result), { ok: true }); assert.equal(writes, 1);
});

test('Wrong or expired lease authority is rejected before validation or commit; errors stay sanitized', async () => {
  let validated = false;
  const client = { hGet: async () => JSON.stringify({ ...owner, status: 'leased', leaseExpiresAt: 1000 }), eval: () => assert.fail('Unexpected write') };
  const b = createRedisGenerationBroker(client, { namespace: 'test', now: () => 1001, validateResult: () => { validated = true; } });
  await assert.rejects(b.complete(result), fails('lease_lost')); assert.equal(validated, false);
  const broken = createRedisGenerationBroker({ eval: async () => { throw new Error('SECRET'); }, hGet: async () => { throw new Error('SECRET'); } }, { namespace: 'test' });
  await assert.rejects(broken.status('job_1'), error => error.message === 'unavailable' && !error.cause);
  await assert.rejects(broken.enqueue(input), error => error.message === 'unavailable' && !error.cause);
});

test('Domain validation receives the retained source before completion, not worker-supplied source', async () => {
  const source = JSON.stringify({ locale: 'ar', course: { title: 'Original' } });
  let writes = 0;
  const record = { ...owner, status: 'leased', agent: 'landing-pages', input: source, leaseExpiresAt: 2000, outputSchemaJson: JSON.stringify(schema) };
  const broker = createRedisGenerationBroker({ hGet: async () => JSON.stringify(record), eval: async () => { writes++; return 1; } }, {
    namespace: 'source-validation', now: () => 1000,
    validateResult: ({ agent, input, result }) => {
      assert.equal(agent, 'landing-pages'); assert.equal(input, source);
      if (result.text !== 'Valid translation') throw new Error('Invalid translation');
    },
  });
  await assert.rejects(broker.complete({ ...result, input: 'untrusted substitute' }), fails('invalid_result'));
  assert.equal(writes, 0);
  await broker.complete({ ...result, result: { text: 'Valid translation' } });
  assert.equal(writes, 1);
});

test('Enqueue fingerprints are stable across object key order; collisions and full queues are explicit', async () => {
  const fingerprints = [];
  const client = { eval: async (_script, { arguments: args }) => { fingerprints.push(args[1]); return args[2]; } };
  const b = createRedisGenerationBroker(client, { namespace: 'test', now: () => 1000 });
  assert.deepEqual(await b.enqueue(input), { status: 'pending' });
  await b.enqueue({ ...input, outputSchema: { required: ['text'], additionalProperties: false, properties: schema.properties, type: 'object' } });
  assert.equal(fingerprints[0], fingerprints[1]);
  for (const code of ['job_conflict', 'queue_full']) {
    const unavailable = createRedisGenerationBroker({ eval: async () => code }, { namespace: 'test' });
    await assert.rejects(unavailable.enqueue(input), fails(code));
  }
});
