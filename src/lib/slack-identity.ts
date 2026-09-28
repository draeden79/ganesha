export type SlackAgent = 'devops' | 'landing-pages';
type Environment = Record<string, string | undefined>;

export function dedicatedIdentities(env: Environment = process.env) {
  return env.SLACK_DEDICATED_IDENTITIES === 'true';
}

export function slackIdentity(agent?: SlackAgent, env: Environment = process.env) {
  const prefix = agent === 'landing-pages' ? 'SLACK_LANDING_PAGES_' : agent === 'devops' ? 'SLACK_DEVOPS_' : 'SLACK_';
  const fallback = agent === 'devops';
  const connector = env[`${prefix}CONNECTOR`] || (fallback ? env.SLACK_CONNECTOR : undefined);
  if (!connector) throw new Error('Slack connector is not configured');
  return {
    agent, connector,
    appId: env[`${prefix}APP_ID`] || (fallback ? env.SLACK_APP_ID : '') || '',
    botUserId: env[`${prefix}BOT_USER_ID`] || (fallback ? env.SLACK_BOT_USER_ID : '') || '',
    userName: agent === 'devops' ? 'Gdevops' : agent === 'landing-pages' ? 'Glandingpage' : env.BOT_USERNAME || 'Ganesha',
  };
}

export function slackAgentForRoute(platform: string, env: Environment = process.env): SlackAgent | 'shared' | null {
  if (platform === 'slack-devops') return 'devops';
  if (platform === 'slack-landing-pages') return 'landing-pages';
  if (platform === 'slack') return dedicatedIdentities(env) ? 'devops' : 'shared';
  return null;
}
