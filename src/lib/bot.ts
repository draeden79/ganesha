import { createSlackAdapter } from "@chat-adapter/slack";
import { createRedisState } from "@chat-adapter/state-redis";
import { connectSlackAdapter } from "@vercel/connect/chat";
import { Chat, type Message, type MessageContext, type Thread } from "chat";
import { generateText } from "ai";
import { acceptEnvelope, isAllowedChannel, SYSTEM } from "./policy";
import { respond, type Session } from "./respond";

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
  const dailyLimit = Number(process.env.DAILY_REQUEST_LIMIT || 40);
  if (!Number.isSafeInteger(dailyLimit) || dailyLimit < 1 || dailyLimit > 1000) throw new Error('Invalid DAILY_REQUEST_LIMIT');
  const managed = connectSlackAdapter(requireEnv('SLACK_CONNECTOR'));
  const adapters = { slack: createSlackAdapter({
    ...managed,
    webhookVerifier: async (request, body) => {
      if (!await managed.webhookVerifier(request, body)) return false;
      try { return acceptEnvelope(JSON.parse(body), teamId); } catch { return false; }
    },
  }) };
  const state = createRedisState({ url: requireEnv('REDIS_URL'), keyPrefix: `ganesha:${process.env.VERCEL_ENV || 'development'}` });
  const bot = new Chat<typeof adapters, Session>({
    userName: process.env.BOT_USERNAME || 'ganesha-devops', adapters, state,
    logger: 'silent', dedupeTtlMs: 86400000,
    concurrency: { strategy: 'queue', maxQueueSize: 5, queueEntryTtlMs: 90000, maxLockLifetimeMs: 250000 },
  });
  const handle = async (thread: Thread<Session>, message: Message, context?: MessageContext) => {
    if (!isAllowedChannel(thread.channelId, thread.isDM, process.env.SLACK_ALLOWED_CHANNEL_IDS)) return;
    await respond(thread, message, context?.skipped || [], {
      quota: async (userId) => {
        if (!await state.setIfNotExists(`cooldown:${userId}`, true, 10000)) return 'cooldown';
        const key = `ganesha:quota:${process.env.VERCEL_ENV || 'development'}:${new Date().toISOString().slice(0, 10)}`;
        const count = Number(await state.getClient().eval(
          "local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],172800) end; return n",
          { keys: [key], arguments: [] },
        ));
        return count > dailyLimit ? 'daily' : 'ok';
      },
      generate: async (messages) => {
        const result = await generateText({
          model: process.env.AI_MODEL || 'openai/gpt-5.4-mini',
          system: SYSTEM, messages, maxOutputTokens: 1500, maxRetries: 1,
          abortSignal: AbortSignal.any([thread.signal, AbortSignal.timeout(60000)]),
          providerOptions: { openai: { store: false } },
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
