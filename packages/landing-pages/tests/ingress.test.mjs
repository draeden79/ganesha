import test from 'node:test';
import assert from 'node:assert/strict';
import { createSharedIngress } from '../src/index.mjs';
const config = { teamId: 'TGANESHA', appId: 'AAPP', botUserId: 'UBOT', landingPagesChannelId: 'CLANDING', devopsChannelId: 'CDEVOPS', allowedAgentUserIds: ['UWRITER'] };
const event = (changes = {}) => ({ type: 'event_callback', team_id: config.teamId, api_app_id: 'AAPP', event_id: 'Ev1', event: { type: 'app_mention', user: 'UOWNER', channel: 'CLANDING', text: '<@UBOT> AI course for beginners: fundamentals and prompts.', ts: '1700000000.000001', ...changes } });
const request = body => new Request('https://example.test/api/webhooks/slack', { method: 'POST', body: JSON.stringify(body) });
function fixture(overrides = {}) {
  const bindings = new Map(), seen = new Map(), starts = [], replies = [], dispatched = [];
  const store = {
    getBinding: async key => bindings.get(key),
    bind: async (key, agent) => { if (!bindings.has(key)) bindings.set(key, agent); return bindings.get(key); },
    claim: async key => seen.get(key) === 'done' ? { status: 'done' } : { status: 'claimed', token: 'lease' },
    finish: async key => seen.set(key, 'done'), release: async key => seen.delete(key),
  };
  const deps = { store, verify: async () => true, lookupUser: async user => ({ isBot: user === 'UWRITER', deleted: false }),
    isDevOpsSubscribed: async () => true, send: async msg => replies.push(msg),
    startLanding: async input => starts.push(input), dispatchDevOps: async req => { dispatched.push(await req.json()); return new Response('ok'); }, ...overrides };
  return { handle: createSharedIngress(config, deps), starts, replies, dispatched, bindings, store };
}

test('OIDC/team verification precedes every state, user lookup or send; signed challenge is allowed without team', async () => {
  const blocked = fixture({ verify: async () => false, store: new Proxy({}, { get: () => assert.fail('State access before verification') }), lookupUser: () => assert.fail('Unexpected lookup') });
  assert.equal((await blocked.handle(request(event()))).status, 401);
  const other = fixture();
  assert.equal((await other.handle(request({ ...event(), team_id: 'TOTHER' }))).status, 403);
  assert.equal(other.bindings.size, 0);
  assert.equal((await blocked.handle(request({ type: 'url_verification', challenge: 'test' }))).status, 401);
  const allowed = await other.handle(request({ type: 'url_verification', challenge: 'test', api_app_id: 'AAPP' }));
  assert.deepEqual(await allowed.json(), { challenge: 'test' });
  assert.equal((await other.handle(request({ type: 'url_verification', challenge: 'test', api_app_id: 'AOTHER' }))).status, 403);
});

test('Canonical message identity suppresses app_mention/message duplication; followup retains thread', async () => {
  const f = fixture();
  assert.equal((await f.handle(request(event()))).status, 200);
  await f.handle(request({ ...event({ type: 'message' }), event_id: 'Ev2' }));
  assert.equal(f.starts.length, 1);
  await f.handle(request(event({ type: 'message', text: 'Audience: entrepreneurs.', thread_ts: '1700000000.000001', ts: '1700000001.000001' })));
  assert.equal(f.starts.length, 2);
  assert.equal(f.starts[0].threadKey, f.starts[1].threadKey);
  assert.notEqual(f.starts[0].requestKey, f.starts[1].requestKey);
});

test('No ACK until durable start resolves; failed starts remain retryable', async () => {
  let release; let calls = 0;
  const f = fixture({ startLanding: async () => { calls++; if (calls === 1) throw new Error('Transient start failure'); await new Promise(resolve => { release = resolve; }); } });
  assert.equal((await f.handle(request(event()))).status, 503);
  let settled = false;
  const pending = f.handle(request(event())).then(response => { settled = true; return response; });
  for (let i = 0; i < 10 && !release; i++) await new Promise(resolve => setImmediate(resolve));
  assert.equal(settled, false); assert.equal(typeof release, 'function');
  release(); assert.equal((await pending).status, 200); assert.equal(calls, 2);
});

test('Ordinary channels and self messages are ignored, and approved bot briefs cannot reach DevOps', async () => {
  const f = fixture();
  for (const changes of [{ text: 'General conversation', type: 'message' }, { user: 'UBOT' }, { channel: 'CGENERAL' },
    { user: 'UWRITER', channel: 'CDEVOPS' }, { user: 'UWRITER', text: 'Unmentioned bot reply' }]) await f.handle(request(event(changes)));
  assert.equal(f.starts.length, 0); assert.equal(f.dispatched.length, 0);
  await f.handle(request(event({ user: 'UWRITER' })));
  assert.equal(f.starts.length, 1);
});

test('New DM requires selection, thread cannot switch agents, and stopped DevOps followups stay silent', async () => {
  const f = fixture({ isDevOpsSubscribed: async () => false });
  await f.handle(request(event({ channel: 'DDIRECT', text: 'Hello' })));
  assert.equal(f.starts.length, 0); assert.match(f.replies[0].body, /Which Ganesha agent/);
  await f.handle(request(event({ channel: 'DDIRECT', text: 'landing-pages: An AI course', ts: '1700000001.000001', thread_ts: '1700000000.000001' })));
  assert.equal(f.starts.length, 1);
  await f.handle(request(event({ channel: 'DDIRECT', text: 'devops: Create infrastructure', ts: '1700000002.000001', thread_ts: '1700000000.000001' })));
  assert.equal(f.dispatched.length, 0); assert.match(f.replies[1].body, /another Ganesha agent/);
  await f.handle(request(event({ channel: 'CDEVOPS' })));
  assert.equal(f.dispatched.length, 1);
  await f.handle(request(event({ channel: 'CDEVOPS', type: 'message', text: 'Ordinary followup', ts: '1700000001.000001', thread_ts: '1700000000.000001' })));
  assert.equal(f.dispatched.length, 1);
});

test('Bootstrap challenge can verify before bot/channel IDs exist, while ordinary events remain disabled', async () => {
  const handle = createSharedIngress({ ...config, botUserId: '', landingPagesChannelId: '', devopsChannelId: '' }, {
    verify: async () => true, store: new Proxy({}, { get: () => assert.fail('Unexpected state access') }),
  });
  assert.equal((await handle(request({ type: 'url_verification', challenge: 'bootstrap' }))).status, 200);
  assert.equal((await handle(request(event()))).status, 503);
});

test('DevOps stop and help remain usable when model request quota is exhausted', async () => {
  const f = fixture();
  f.store.claim = async (_key, { charge }) => ({ status: 'claimed', token: 'lease', ...(charge ? { limit: 'daily' } : {}) });
  await f.handle(request(event({ channel: 'CDEVOPS', text: '<@UBOT> devops: stop' })));
  await f.handle(request(event({ channel: 'CDEVOPS', text: '<@UBOT> help', ts: '1700000001.000001' })));
  assert.equal(f.dispatched.length, 2); assert.equal(f.replies.length, 0);
  await f.handle(request(event({ channel: 'CDEVOPS', text: '<@UBOT> Plan a database', ts: '1700000002.000001' })));
  assert.equal(f.dispatched.length, 2); assert.match(f.replies[0].body, /daily request limit/);
});
