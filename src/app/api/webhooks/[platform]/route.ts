import { after } from "next/server";
import { getBot, getChatState } from "@/lib/bot";
import { sharedIngress } from '@/lib/shared-ingress-runtime';
import { normalizeVerifiedSlackRequest } from '@/lib/slack-request';

export const runtime = 'nodejs';
export const maxDuration = 300;

interface Context {
  params: Promise<{ platform: string }>;
}

async function handleRequest(request: Request, context: Context) {
  const { platform } = await context.params;

  if (platform !== 'slack') return new Response('Not found', { status: 404 });
  try {
    const handle = await sharedIngress({
      isDevOpsSubscribed: async (threadKey) => {
        const state = getChatState();
        await state.connect();
        return state.isSubscribed(`slack:${threadKey.split(':').slice(1).join(':')}`);
      },
      dispatchDevOps: async (originalRequest) => {
        let phase = 'normalize';
        try {
        // The gateway has already authenticated this request. Give ordinary bot
        // DMs the same per-message thread roots as the gateway, without adding
        // Slack's broader assistant permissions just for thread isolation.
        const normalized = await normalizeVerifiedSlackRequest(originalRequest);
        phase = 'initialize';
        const bot = getBot();
        phase = 'dispatch';
        return await bot.webhooks.slack(normalized, {
        waitUntil: (task) => after(async () => {
          try { await task; } catch { console.error(JSON.stringify({ event: 'webhook_processing_failed' })); }
        }),
        });
        } catch (error) {
          const e = error as Error;
          console.error(JSON.stringify({ event: 'devops_dispatch_failed', phase, errorName: e.name,
            stackFrames: e.stack?.split('\n').slice(1, 3) }));
          throw error;
        }
      },
    });
    return await handle(request);
  } catch {
    console.error(JSON.stringify({ event: 'webhook_unavailable' }));
    return new Response('Service unavailable', { status: 503 });
  }
}

export const POST = handleRequest;
