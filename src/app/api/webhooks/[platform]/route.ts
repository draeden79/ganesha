import { after } from "next/server";
import { getBot, getChatState } from "@/lib/bot";
import { sharedIngress } from '@/lib/shared-ingress-runtime';
import { normalizeVerifiedSlackRequest } from '@/lib/slack-request';
import { slackAgentForRoute } from '@/lib/slack-identity';
import { generationBackend } from '@/lib/generation-runtime';
import { dispatchLocalDevops } from '@/lib/devops-local';

export const runtime = 'nodejs';
export const maxDuration = 300;

interface Context {
  params: Promise<{ platform: string }>;
}

async function handleRequest(request: Request, context: Context) {
  const { platform } = await context.params;

  const selectedAgent = slackAgentForRoute(platform);
  if (!selectedAgent) return new Response('Not found', { status: 404 });
  try {
    const handle = await sharedIngress({
      isDevOpsSubscribed: async (threadKey) => {
        const state = getChatState();
        await state.connect();
        return state.isSubscribed(`slack:${threadKey.split(':').slice(1).join(':')}`);
      },
      dispatchDevOps: async (originalRequest) => {
        if (generationBackend() === 'local-codex') return dispatchLocalDevops(originalRequest);
        let phase = 'normalize';
        try {
          // Authentication and agent routing precede DM normalization.
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
    }, selectedAgent === 'shared' ? undefined : selectedAgent);
    return await handle(request);
  } catch {
    console.error(JSON.stringify({ event: 'webhook_unavailable' }));
    return new Response('Service unavailable', { status: 503 });
  }
}

export const POST = handleRequest;
