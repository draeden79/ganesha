// Copy into ganesha/src/lib/shared-ingress-runtime.ts.
import { createClient } from 'redis';
import { getToken } from '@vercel/connect';
import { connectSlackAdapter } from '@vercel/connect/chat';
import { start } from 'workflow/api';
import { createSharedIngress, createRedisGatewayStore } from '@ganesha/landing-pages';
import { landingPageWorkflow } from '@/workflows/landing-pages';
import { sendLandingNotification, slackScopes } from '@/lib/landing-runtime';
import { redact } from '@/lib/policy';

const required = (name: string) => { const value = process.env[name]; if (!value) throw new Error(`Missing ${name}`); return value; };
function createGatewayClient() { return createClient({ url: required('REDIS_URL'), socket: { connectTimeout: 15000 } }); }
let connecting: Promise<ReturnType<typeof createGatewayClient>> | undefined;
export async function sharedIngress(deps: { dispatchDevOps: (request: Request) => Promise<Response>; isDevOpsSubscribed: (threadKey: string) => Promise<boolean> }) {
  if (!connecting) {
    const client = createGatewayClient();
    client.on('error', () => console.error(JSON.stringify({ event: 'gateway_storage_connection_error' })));
    connecting = client.connect().then(() => client).catch(() => { connecting = undefined; throw new Error('Gateway storage unavailable'); });
  }
  const client = await connecting;
  const connector = required('SLACK_CONNECTOR');
  const teamId = required('SLACK_TEAM_ID');
  const store = createRedisGatewayStore(client, { namespace: `ganesha:gateway:${process.env.VERCEL_ENV || 'development'}:${teamId}`,
    dailyLimit: Number(process.env.DAILY_REQUEST_LIMIT || 40) });
  const managed = connectSlackAdapter(connector, { scopes: slackScopes });
  return createSharedIngress({ teamId, appId: process.env.SLACK_APP_ID, botUserId: process.env.SLACK_BOT_USER_ID || '',
    landingPagesChannelId: process.env.SLACK_LANDING_PAGES_CHANNEL_ID || '', devopsChannelId: process.env.SLACK_DEVOPS_CHANNEL_ID || '',
    allowedAgentUserIds: (process.env.SLACK_ALLOWED_AGENT_USER_IDS || '').split(',').map(id => id.trim()).filter(Boolean) }, {
    store, verify: async (request, body) => (await managed.webhookVerifier(request, body)) === true, ...deps,
    lookupUser: async (userId) => {
      const cached = await store.getUser(userId); if (cached) return cached;
      const token = await getToken(connector, { subject: { type: 'app' }, scopes: slackScopes });
      const url = new URL('https://slack.com/api/users.info'); url.searchParams.set('user', userId);
      const response = await fetch(url, { headers: { Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(15000) });
      if (!response.ok) throw new Error('Slack identity lookup unavailable');
      const data = await response.json() as { ok?: boolean; user?: { id?: string; team_id?: string; is_bot?: boolean; deleted?: boolean } };
      if (!data.ok || data.user?.id !== userId || data.user.team_id !== teamId || typeof data.user.is_bot !== 'boolean') return null;
      const user = { isBot: data.user.is_bot, deleted: data.user.deleted === true };
      await store.cacheUser(userId, user); return user;
    },
    startLanding: async (input) => { await start(landingPageWorkflow, [{ ...input, text: redact(input.text) }]); },
    send: async (message) => sendLandingNotification({ ...message, notificationId: 'gateway-reply' }),
  });
}
