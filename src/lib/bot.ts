import { createSlackAdapter } from "@chat-adapter/slack";
import { createRedisState } from "@chat-adapter/state-redis";
import { connectSlackAdapter } from "@vercel/connect/chat";
import { Chat, type Message, type MessageContext, type Thread } from "chat";
import { generateText } from "ai";
import { acceptEnvelope, isAllowedChannel, SYSTEM } from "./policy";
import { respond, type Session } from "./respond";
import { slackScopes } from './landing-runtime';

const requireEnv = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

function createBot() {
  const teamId = requireEnv('SLACK_TEAM_ID');
  if (!/^T[A-Z0-9]+$/.test(teamId)) throw new Error('Invalid SLACK_TEAM_ID');
  const managed = connectSlackAdapter(requireEnv('SLACK_CONNECTOR'), { scopes: slackScopes });
  const adapters = { slack: createSlackAdapter({
    ...managed,
    webhookVerifier: async (request, body) => {
      if (!await managed.webhookVerifier(request, body)) return false;
      try { return acceptEnvelope(JSON.parse(body), teamId); } catch { return false; }
    },
  }) };
  const state = getChatState();
  const bot = new Chat<typeof adapters, Session>({
    userName: process.env.BOT_USERNAME || 'Ganesha', adapters, state,
    logger: 'silent', dedupeTtlMs: 86400000,
    concurrency: { strategy: 'queue', maxQueueSize: 5, queueEntryTtlMs: 90000, maxLockLifetimeMs: 250000 },
  });
  const handle = async (thread: Thread<Session>, message: Message, context?: MessageContext) => {
    if (!isAllowedChannel(thread.channelId, thread.isDM, process.env.SLACK_ALLOWED_CHANNEL_IDS)) return;
    await respond(thread, message, context?.skipped || [], {
      // The verified shared ingress applies the workspace quota once per message.
      quota: async () => 'ok',
      generate: async (messages) => {
        const result = await generateText({
          model: process.env.AI_MODEL || 'openai/gpt-5-nano',
          system: SYSTEM, messages, maxOutputTokens: 1500, maxRetries: 1,
          abortSignal: AbortSignal.any([thread.signal, AbortSignal.timeout(60000)]),
          providerOptions: { openai: { store: false, reasoningEffort: 'low' } },
        });
        return result.text;
      },
      report: (event) => console.error(JSON.stringify({ event })),
    });
  };
  bot.onNewMention(handle);
  bot.onSubscribedMessage(handle);
  bot.onDirectMessage((thread, message, _channel, context) => handle(thread, message, context));
  return bot;
}

let instance: ReturnType<typeof createBot> | undefined;
export const getBot = () => instance ??= createBot();
let chatState: ReturnType<typeof createRedisState> | undefined;
export const getChatState = () => chatState ??= createRedisState({
  url: requireEnv('REDIS_URL'), keyPrefix: `ganesha:${process.env.VERCEL_ENV || 'development'}`,
});
