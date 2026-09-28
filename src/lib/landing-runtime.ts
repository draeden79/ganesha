// Copy into ganesha/src/lib/landing-runtime.ts. Runtime I/O stays outside the workflow sandbox.
import { createClient } from 'redis';
import { generateText, Output, jsonSchema } from 'ai';
import { getToken } from '@vercel/connect';
import { createRedisLandingStore, generationSchema, instructions, type Generation, type Course } from '@ganesha/landing-pages';
import { dedicatedIdentities, slackIdentity, type SlackAgent } from '@/lib/slack-identity';
import { safeReply } from '@/lib/policy';
export const slackScopes = ['app_mentions:read', 'chat:write', 'channels:history', 'channels:read', 'im:history', 'im:read', 'users:read'];

function required(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing ${name}`);
  return value;
}

function createLandingClient() {
  return createClient({ url: required('REDIS_URL'), socket: { connectTimeout: 15000 } });
}
let connection: Promise<ReturnType<typeof createLandingClient>> | undefined;
export async function landingStore() {
  if (!connection) {
    const client = createLandingClient();
    client.on('error', () => { console.error(JSON.stringify({ event: 'landing_storage_connection_error' })); });
    connection = client.connect().then(() => client).catch(() => { connection = undefined; throw new Error('Landing storage unavailable'); });
  }
  const connectedClient = await connection;
  return createRedisLandingStore(connectedClient, { namespace: `ganesha:landing:${process.env.VERCEL_ENV || 'development'}` });
}

export const publicOrigin = () => required('PUBLIC_BASE_URL');

export async function generateLandingCopy(input: { brief: string; previousCourse: Course | null }) {
  try {
  const result = await generateText({
    model: process.env.LANDING_AI_MODEL || process.env.AI_MODEL || 'openai/gpt-5-nano',
    system: instructions, prompt: JSON.stringify(input),
    output: Output.object({ schema: jsonSchema<Generation>(generationSchema as Parameters<typeof jsonSchema>[0]) }),
    maxOutputTokens: 7000, maxRetries: 0, abortSignal: AbortSignal.timeout(120000),
    providerOptions: { openai: { store: false, reasoningEffort: 'low' } },
  });
  return result.output;
  } catch (error) {
    const e = error as { name?: string; statusCode?: number; cause?: { name?: string; statusCode?: number } };
    const safeName = (name?: string) => name && /^[A-Za-z_][A-Za-z0-9_]{0,80}$/.test(name) ? name : 'UnknownError';
    console.error(JSON.stringify({ event: 'landing_generation_failed', errorName: safeName(e.name),
      statusCode: typeof e.statusCode === 'number' ? e.statusCode : undefined,
      causeName: safeName(e.cause?.name), causeStatusCode: typeof e.cause?.statusCode === 'number' ? e.cause.statusCode : undefined }));
    throw error;
  }
}

export async function sendLandingNotification(message: { threadKey: string; body: string; notificationId: string }) {
  return sendSlackNotification(message, dedicatedIdentities() ? 'landing-pages' : undefined);
}

export async function sendSlackNotification(message: { threadKey: string; body: string; notificationId: string }, agent?: SlackAgent) {
  const [team, channel, timestamp, extra] = message.threadKey.split(':');
  if (team !== required('SLACK_TEAM_ID') || extra || !/^[CDG][A-Z0-9]+$/.test(channel) || !/^\d+\.\d+$/.test(timestamp)) {
    throw new Error('Invalid Slack delivery target');
  }
  const expectedChannel = agent === 'devops' ? process.env.SLACK_DEVOPS_CHANNEL_ID : agent === 'landing-pages' ? process.env.SLACK_LANDING_PAGES_CHANNEL_ID : undefined;
  if (expectedChannel && channel.startsWith('C') && channel !== expectedChannel) throw new Error('Wrong agent delivery channel');
  const token = await getToken(slackIdentity(agent).connector, { subject: { type: 'app' }, scopes: slackScopes });
  const response = await fetch('https://slack.com/api/chat.postMessage', {
    method: 'POST', signal: AbortSignal.timeout(25000),
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ channel, thread_ts: timestamp, text: safeReply(message.body),
      mrkdwn: false, parse: 'none', unfurl_links: false, unfurl_media: false }),
  });
  if (!response.ok) throw new Error('Slack delivery unavailable');
  const data = await response.json() as { ok?: boolean };
  if (!data.ok) throw new Error('Slack delivery failed');
}
