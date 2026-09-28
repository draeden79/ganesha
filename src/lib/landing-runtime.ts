// Copy into ganesha/src/lib/landing-runtime.ts. Runtime I/O stays outside the workflow sandbox.
import { createClient } from 'redis';
import { generateText, Output, jsonSchema } from 'ai';
import { getToken } from '@vercel/connect';
import { createRedisLandingStore, generationSchema, instructions, GenerationPendingError, localizeGeneration, translationInstructions, type Generation, type Course } from '@ganesha/landing-pages';
import { generationBackend, localGeneration, generationId } from './generation-runtime';
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

export async function generateLandingCopy(input: { requestKey: string; brief: string; previousCourse: Course | null }) {
  if (generationBackend() === 'local-codex') {
    const result = await localGeneration({ jobId: generationId('landing-pages', input.requestKey), agent: 'landing-pages',
      system: instructions, input: JSON.stringify({ brief: input.brief, previousCourse: input.previousCourse }), outputSchema: generationSchema });
    if (!result) throw new GenerationPendingError();
    return localizeGeneration(result, async ({ locale, course }) => {
      const translated = await localGeneration({
        jobId: generationId('landing-pages', `${input.requestKey}:translation-v1:${locale}`), agent: 'landing-pages',
        system: translationInstructions(locale), input: JSON.stringify({ kind: 'course-translation-v1', locale, course }),
        outputSchema: generationSchema,
      });
      return translated;
    });
  }
  try {
  // One shared deadline keeps English + parallel translations inside the 180s domain lease.
  // This backend is an explicit operator choice; local mode never falls back to it.
  const abortSignal = AbortSignal.timeout(150000);
  const generate = async (system: string, prompt: string) => {
    const result = await generateText({
    model: process.env.LANDING_AI_MODEL || process.env.AI_MODEL || 'openai/gpt-5-nano',
    system, prompt,
    output: Output.object({ schema: jsonSchema<Generation>(generationSchema as Parameters<typeof jsonSchema>[0]) }),
    maxOutputTokens: 7000, maxRetries: 0, abortSignal,
    providerOptions: { openai: { store: false, reasoningEffort: 'low' } },
    });
    return result.output;
  };
  const result = await generate(instructions, JSON.stringify(input));
  return await localizeGeneration(result, ({ locale, course }) =>
    generate(translationInstructions(locale), JSON.stringify({ kind: 'course-translation-v1', locale, course })));
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
