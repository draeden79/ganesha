import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalizeVerifiedSlackRequest } from '../src/lib/slack-request.ts';

const request = (channel: string, thread_ts?: string) => new Request('https://example.test/api/webhooks/slack', {
  method: 'POST', headers: { 'content-type': 'application/json', authorization: 'Bearer test-only' },
  body: JSON.stringify({ team_id: 'T123', event: { channel, ts: '100.001', thread_ts, text: 'test' } }),
});
test('verified public-channel requests preserve the original body and request wrapper', async () => {
  const original = request('C123');
  assert.equal(await normalizeVerifiedSlackRequest(original), original);
  assert.equal((await original.json()).event.thread_ts, undefined);
});
test('DM roots retain authentication and isolate the message without changing existing thread roots', async () => {
  const original = request('D123');
  const normalized = await normalizeVerifiedSlackRequest(original);
  assert.equal(normalized.headers.get('authorization'), 'Bearer test-only');
  assert.equal(normalized.method, 'POST');
  assert.equal((await normalized.json()).event.thread_ts, '100.001');
  assert.equal((await original.json()).event.thread_ts, undefined);
  const reply = request('D123', '99.001');
  assert.equal(await normalizeVerifiedSlackRequest(reply), reply);
});
