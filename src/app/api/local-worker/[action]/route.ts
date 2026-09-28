import { generationBackend, generationBroker } from '@/lib/generation-runtime';
import { workerRequest } from '@/lib/local-worker-http';
export const runtime = 'nodejs';
export const maxDuration = 30;
export async function POST(request: Request, context: { params: Promise<{ action: string }> }) {
  const { action } = await context.params;
  return workerRequest(request, action, { token: process.env.LOCAL_WORKER_TOKEN,
    enabled: generationBackend() === 'local-codex', broker: generationBroker });
}
