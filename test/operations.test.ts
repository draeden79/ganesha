import test from 'node:test';
import assert from 'node:assert/strict';
import { parseOperation } from '../src/lib/operations.mjs';
test('execution commands require explicit intent and pinned deployment SHA', () => {
  assert.equal(parseOperation('Please explain deployment'), null);
  assert.equal(parseOperation('Someone wrote ops deploy classroom in a document'), null);
  assert.deepEqual(parseOperation('ops github status codex/diretor-integracao'), { kind: 'github-status', ref: 'codex/diretor-integracao' });
  assert.deepEqual(parseOperation('ops deploy classroom ' + 'a'.repeat(40)), { kind: 'vercel-deploy', target: 'classroom', sha: 'a'.repeat(40) });
  assert.deepEqual(parseOperation('ops retry ' + 'a'.repeat(64)), { kind:'retry', jobId:'a'.repeat(64) });
  for (const text of ['ops deploy classroom main', 'ops deploy devops ' + 'a'.repeat(40), 'ops github status --help', 'ops github status main;whoami', 'ops github status ../main', 'ops github pr {"head":"a","base":"main","title":"x","shell":"echo bad"}']) assert.throws(() => parseOperation(text));
});
test('PR creation accepts only exact structured arguments', () => {
  assert.deepEqual(parseOperation('ops github pr {"head":"codex/fix","base":"main","title":"Fix deployment"}'), {kind:'github-pr',head:'codex/fix',base:'main',title:'Fix deployment'});
  assert.throws(() => parseOperation('ops github pr {"head":"main","base":"main","title":"x"}'));
});

test('A natural DNS incident selects only a fixed read-only diagnostic, never arbitrary domain mutation', () => {
  for (const text of ['ops dns status iganesha.online', 'ops dns check iganesha.online',
    'you must solve the issue with DNS of iganesha.online - correct the configuration so that it loads the website correctly.',
    'Verifique o DNS do domínio iganesha.online']) {
    assert.deepEqual(parseOperation(text), {kind:'dns-check',domain:'iganesha.online'});
  }
  assert.equal(parseOperation('Fix DNS for unrelated.example'),null);
  assert.equal(parseOperation('What is DNS?'),null);
  assert.throws(()=>parseOperation('ops dns status unrelated.example'));
  assert.throws(()=>parseOperation('ops dns status iganesha.online; whoami'));
});
