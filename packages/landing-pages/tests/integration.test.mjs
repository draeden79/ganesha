import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { routeAgent, prepareLandingPage, instructions } from '../src/index.mjs';

const config = { landingPagesChannelId: 'CLANDING', devopsChannelId: 'CDEVOPS', allowedAgentUserIds: ['UWRITER'] };
const human = { userId: 'UOWNER', isBot: false, isMe: false };
const base = { channelId: 'slack:CLANDING', isDM: false, text: '<@UGANESHA> Create a course page.', author: human };
const sample = JSON.parse(readFileSync(new URL('../examples/course.json', import.meta.url), 'utf8'));
const request = { threadKey: 'TTEAM:CLANDING:1700000000.000001', requestKey: 'EvOne', brief: 'AI for beginners, with fundamentals, prompts, creation and workflows.', publicOrigin: 'https://courses.example' };
const ready = () => ({ status: 'ready', questions: [], course: structuredClone(sample) });

test('Channel routing prevents a landing-page brief from reaching DevOps', () => {
  assert.deepEqual(routeAgent(base, config), { status: 'routed', agent: 'landing-pages', text: 'Create a course page.' });
  assert.equal(routeAgent({ ...base, channelId: 'slack:CDEVOPS' }, config).agent, 'devops');
  assert.equal(routeAgent({ ...base, text: 'devops: change infrastructure' }, config).status, 'conflict');
  assert.equal(routeAgent({ ...base, channelId: 'CGENERAL' }, config).status, 'ignored');
});

test('DM selection is explicit and an existing thread cannot switch agents', () => {
  const dm = { ...base, isDM: true, channelId: 'slack:DPRIVATE', text: 'Help me' };
  assert.equal(routeAgent(dm, config).status, 'choose');
  assert.equal(routeAgent({ ...dm, text: 'DevOps: help with DNS' }, config).agent, 'devops');
  assert.equal(routeAgent({ ...dm, assignedAgent: 'landing-pages' }, config).agent, 'landing-pages');
  assert.equal(routeAgent({ ...dm, assignedAgent: 'landing-pages', text: 'devops: help' }, config).status, 'conflict');
  assert.throws(() => routeAgent(base, { ...config, devopsChannelId: config.landingPagesChannelId }));
});

test('Self, unapproved bots and unknown identities cannot trigger work; approved bots require a mention', () => {
  assert.equal(routeAgent({ ...base, author: { ...human, isMe: true } }, config).status, 'ignored');
  assert.equal(routeAgent({ ...base, author: { ...human, isBot: 'unknown' } }, config).status, 'ignored');
  assert.equal(routeAgent({ ...base, mentioned: true, author: { ...human, isBot: true } }, config).status, 'ignored');
  const agent = { ...base, author: { userId: 'UWRITER', isBot: true, isMe: false } };
  assert.equal(routeAgent(agent, config).status, 'ignored');
  assert.equal(routeAgent({ ...agent, mentioned: true }, config).agent, 'landing-pages');
});

test('Missing information produces a clarification without a page or publication claim', async () => {
  const result = await prepareLandingPage(request, { generate: async () => ({ status: 'needs_information', questions: ['Who is the audience?'], course: null }) });
  assert.equal(result.status, 'needs_information');
  assert.equal(result.html, undefined);
  assert.equal(result.url, undefined);
  assert.match(result.reply, /Who is the audience/);
});

test('Prepared English pages use the approved template and keep the URL stable across revisions', async () => {
  const first = await prepareLandingPage(request, { generate: async () => ready() });
  const second = await prepareLandingPage({ ...request, requestKey: 'EvTwo', previousCourse: first.course }, {
    generate: async ({ previousCourse }) => {
      assert.equal(previousCourse.title, sample.title);
      const value = ready(); value.course.title = 'A revised course title'; return value;
    },
  });
  assert.equal(first.url, second.url);
  assert.match(first.html, /<html lang="en">/);
  assert.match(first.html, /Figtree/);
  assert.match(first.html, /\/assets\/ai-studio.png/);
  assert.equal(first.html.includes(request.threadKey), false);
  assert.match(second.html, /A revised course title/);
  const other = await prepareLandingPage({ ...request, threadKey: 'TTEAM:COTHER:1700000000.000001' }, { generate: async () => ready() });
  assert.notEqual(first.url, other.url);
});

test('Untrusted output is escaped, invalid output fails, and a generator failure cannot mutate a previous course', async () => {
  const value = ready(); value.course.closing = '<script>alert(1)</script>';
  const result = await prepareLandingPage(request, { generate: async () => value });
  assert.match(result.html, /&lt;script&gt;alert/);
  assert.equal(result.html.includes('<script>alert(1)'), false);
  await assert.rejects(prepareLandingPage(request, { generate: async () => ({ status: 'ready', questions: [], course: null }) }));
  const previous = structuredClone(sample);
  await assert.rejects(prepareLandingPage({ ...request, previousCourse: previous }, { generate: async () => { throw new Error('Provider unavailable'); } }));
  assert.deepEqual(previous, sample);
  await assert.rejects(prepareLandingPage({ ...request, publicOrigin: 'http://localhost' }, { generate: async () => ready() }));
  assert.match(instructions, /All visible copy must be English/);
});
