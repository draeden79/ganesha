import { test } from 'node:test';
import assert from 'node:assert/strict';
import { slackIdentity, slackAgentForRoute } from '../src/lib/slack-identity.ts';

const shared = { SLACK_CONNECTOR: 'slack/ganesha', SLACK_APP_ID: 'AOLD', SLACK_BOT_USER_ID: 'UOLD' };
test('DevOps can reuse the existing identity but Landing Pages cannot borrow its credentials', () => {
  assert.equal(slackIdentity('devops', shared).connector, 'slack/ganesha');
  assert.equal(slackIdentity('devops', shared).appId, 'AOLD');
  assert.throws(() => slackIdentity('landing-pages', shared), /not configured/);
  const env = { ...shared, SLACK_LANDING_PAGES_CONNECTOR: 'slack/glandingpage', SLACK_LANDING_PAGES_APP_ID: 'ANEW', SLACK_LANDING_PAGES_BOT_USER_ID: 'UNEW' };
  assert.deepEqual(slackIdentity('landing-pages', env), { agent: 'landing-pages', connector: 'slack/glandingpage', appId: 'ANEW', botUserId: 'UNEW', userName: 'Glandingpage' });
});
test('the old webhook loses shared routing on cutover and dedicated routes remain separate', () => {
  assert.equal(slackAgentForRoute('slack', {}), 'shared');
  assert.equal(slackAgentForRoute('slack', { SLACK_DEDICATED_IDENTITIES: 'true' }), 'devops');
  assert.equal(slackAgentForRoute('slack-devops', {}), 'devops');
  assert.equal(slackAgentForRoute('slack-landing-pages', {}), 'landing-pages');
  assert.equal(slackAgentForRoute('unrecognized', {}), null);
});
