import { test } from 'node:test';
import assert from 'node:assert/strict';
import { acceptEnvelope, boundedHistory, cleanInput, isAllowedChannel, safeReply } from '../src/lib/policy.ts';
import { respond, type Session, type Dependencies } from '../src/lib/respond.ts';

const message = (text: string) => ({ id: '123.1', text, author: { userId: 'U123', isBot: false, isMe: false } });
function fixture() {
  let session: Session = {};
  const posts: string[] = [];
  let calls = 0;
  const thread = {
    get state() { return Promise.resolve(session); },
    post: async (text: string) => { posts.push(text); },
    setState: async (state: Session) => { session = state; },
    subscribe: async () => {}, unsubscribe: async () => {},
  };
  const deps: Dependencies = { quota: async () => 'ok', generate: async () => { calls++; return 'Plano proposto'; }, report: () => {} };
  return { thread, deps, posts, calls: () => calls };
}

test('workspace boundary rejects wrong teams and externally shared channels', () => {
  assert.equal(acceptEnvelope({ team_id: 'T123' }, 'T123'), true);
  for (const payload of [null, { team_id: 'T999' }, { team_id: 'T123', is_ext_shared_channel: true }, {}]) {
    assert.equal(acceptEnvelope(payload, 'T123'), false);
  }
});
test('channel allowlist accepts only selected channels and DMs', () => {
  assert.equal(isAllowedChannel('slack:C123', false, 'C123,C456'), true);
  assert.equal(isAllowedChannel('slack:C789', false, 'C123,C456'), false);
  assert.equal(isAllowedChannel('slack:D123', true, 'C123'), true);
});
test('secrets removed before persistence and mass mentions suppressed in replies', () => {
  assert.equal(cleanInput('<@UBOT> secret=hunter2 xoxb-example-token'), 'secret=[SECRET REMOVED] [TOKEN REMOVED]');
  assert.equal(safeReply('<!channel> @here'), '[mention] @\u200bhere');
});
test('help and status work without a model call', async () => {
  const f = fixture();
  await respond(f.thread, message('ajuda'), [], f.deps);
  await respond(f.thread, message('status'), [], f.deps);
  assert.equal(f.calls(), 0); assert.equal(f.posts.length, 2);
});

test('Slack SDK display-name mentions preserve quota-free control commands', async () => {
  const f = fixture();
  f.deps.quota = async () => { throw Error('Control command must not consume quota'); };
  await respond(f.thread, message('@Gdevops status'), [], f.deps);
  await respond(f.thread, message('@ganesha help'), [], f.deps);
  assert.equal(f.calls(), 0); assert.equal(f.posts.length, 2);
});
test('rate limit prevents model usage', async () => {
  const f = fixture(); f.deps.quota = async () => 'daily';
  await respond(f.thread, message('Preciso de infraestrutura'), [], f.deps);
  assert.equal(f.calls(), 0); assert.match(f.posts[0], /daily request limit/);
});
test('thread history and queued messages reach the model with secrets redacted', async () => {
  const f = fixture();
  await f.thread.setState({ history: [{ role: 'user', content: 'Projeto Ganesha' }] });
  f.deps.generate = async (turns) => {
    assert.equal(turns.length, 3);
    assert.match(turns[0].content, /Projeto Ganesha/);
    assert.match(turns[1].content, /homologação/);
    assert.doesNotMatch(JSON.stringify(turns), /hunter2/);
    return 'Plano';
  };
  await respond(f.thread, message('password=hunter2'), [message('homologação')], f.deps);
  assert.equal((await f.thread.state).history?.length, 4);
});
test('stop clears conversation state and bots cannot trigger model calls', async () => {
  const f = fixture();
  await f.thread.setState({ history: [{ role: 'user', content: 'private context' }] });
  await respond(f.thread, message('encerrar'), [], f.deps);
  await respond(f.thread, { ...message('deploy'), author: { userId: 'B1', isBot: true, isMe: false } }, [], f.deps);
  assert.deepEqual((await f.thread.state).history, []); assert.equal(f.calls(), 0);
});
test('model failure reports a useful error without claiming execution', async () => {
  const f = fixture(); f.deps.generate = async () => { throw new Error('secret SDK payload'); };
  await respond(f.thread, message('deploy'), [], f.deps);
  assert.match(f.posts[0], /No infrastructure changes/); assert.doesNotMatch(f.posts[0], /secret SDK/);
});
test('history is bounded and does not carry another conversation implicitly', () => {
  const history = Array.from({ length: 30 }, (_, i) => ({ role: 'user' as const, content: String(i) }));
  assert.equal(boundedHistory(history, []).length, 12);
  assert.deepEqual(boundedHistory([], []), []);
});

test('verified bot policy requires an explicit mention for each current and queued message', async () => {
  const f = fixture();
  f.deps.allowBot = m => m.isMention === true;
  const bot = (text: string, isMention: boolean, isMe = false) => ({ ...message(text), isMention,
    author: { userId: 'UOTHERBOT', isBot: true as const, isMe } });
  await respond(f.thread, bot('passive reply', false), [], f.deps);
  await respond(f.thread, bot('self echo', true, true), [], f.deps);
  assert.equal(f.calls(), 0);
  f.deps.generate = async turns => {
    assert.equal(turns.length, 2);
    assert.match(turns[0].content, /queued request/);
    assert.match(turns[1].content, /current request/);
    assert.doesNotMatch(JSON.stringify(turns), /passive|self echo/);
    return 'DevOps · proposed plan';
  };
  await respond(f.thread, bot('current request', true), [bot('passive', false), bot('queued request', true)], f.deps);
  assert.equal(f.posts.length, 1);
});
