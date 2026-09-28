import test from 'node:test';
import assert from 'node:assert/strict';
import { workerRequest } from '../src/lib/local-worker-http.ts';
import type { GenerationBroker } from '@ganesha/local-generation-broker';
const token = 'a'.repeat(64);
const request = (authorization: string, body = JSON.stringify({ workerId: 'test', agents: ['devops'] })) =>
  new Request('https://example.test/api/local-worker/claim', { method: 'POST', headers: { authorization, 'content-type': 'application/json' }, body });
test('worker authentication rejects malformed headers before Redis access', async () => {
  let calls = 0;
  const deps = { token, enabled: true, broker: async () => { calls++; throw Error('Must not access storage'); } };
  for (const header of ['', token, `bearer ${token}`, `Bearer ${'b'.repeat(64)}`, `Bearer ${'é'.repeat(64)}`]) {
    const r = await workerRequest(request(header), 'claim', deps);
    assert.equal(r.status, 401); assert.equal(r.headers.get('cache-control'), 'no-store');
  }
  assert.equal(calls, 0);
});
test('worker payload bounds, field validation and disabled mode precede storage', async () => {
  let calls = 0;
  const deps = { token, enabled: true, broker: async () => { calls++; throw Error('Must not access storage'); } };
  assert.equal((await workerRequest(request(`Bearer ${token}`), 'claim', { ...deps, enabled: false })).status, 503);
  for (const body of ['null', '{', '[]', JSON.stringify({ workerId: 'test', agents: ['devops'], secret: 'unexpected' })]) {
    assert.equal((await workerRequest(request(`Bearer ${token}`, body), 'claim', deps)).status, 400);
  }
  assert.equal((await workerRequest(request(`Bearer ${token}`, ' '.repeat(262145)), 'claim', deps)).status, 413);
  assert.equal(calls, 0);
});
test('worker protocol returns jobs and preserves safe broker errors', async () => {
  const broker = { claim: async () => null, heartbeat: async () => { throw Object.assign(Error('private error'), { code: 'lease_lost' }); } } as unknown as GenerationBroker;
  const deps = { token, enabled: true, broker: async () => broker };
  assert.deepEqual(await (await workerRequest(request(`Bearer ${token}`), 'claim', deps)).json(), { job: null });
  const response = await workerRequest(request(`Bearer ${token}`, JSON.stringify({ workerId: 'test', jobId: 'j', leaseToken: 'l' })), 'heartbeat', deps);
  assert.equal(response.status, 409); assert.deepEqual(await response.json(), { error: { code: 'lease_lost' } });
});
