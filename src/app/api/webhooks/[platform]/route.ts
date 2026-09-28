import { after } from "next/server";
import { getBot } from "@/lib/bot";

export const runtime = 'nodejs';
export const maxDuration = 300;

interface Context {
  params: Promise<{ platform: string }>;
}

async function handleRequest(request: Request, context: Context) {
  const { platform } = await context.params;

  if (platform !== 'slack') return new Response('Not found', { status: 404 });
  try {
    return await getBot().webhooks.slack(request, {
      waitUntil: (task) => after(async () => {
        try { await task; } catch { console.error(JSON.stringify({ event: 'webhook_processing_failed' })); }
      }),
    });
  } catch {
    console.error(JSON.stringify({ event: 'webhook_unavailable' }));
    return new Response('Service unavailable', { status: 503 });
  }
}

// Some platforms (e.g. WhatsApp and Messenger) verify the webhook with a GET
// request before they deliver events over POST.
export const POST = handleRequest;
