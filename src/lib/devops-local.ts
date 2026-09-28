import { start } from 'workflow/api';
import { getChatState } from './bot';
import { boundedHistory, cleanInput, HELP, STATUS } from './policy';
import { devopsStore } from './devops-runtime';
import { sendSlackNotification } from './landing-runtime';
import { devopsWorkflow } from '@/workflows/devops';
import { operationsStore } from './operations-runtime';
import { parseOperation } from './operations.mjs';
import { operationsWorkflow } from '@/workflows/operations';
import type { Session } from './respond';
/** Called only after the shared ingress authenticates app/workspace/sender and charges quota. */
export async function dispatchLocalDevops(request: Request) {
  const envelope = await request.clone().json();
  const event = envelope.event;
  const threadKey = `${envelope.team_id}:${event.channel}:${event.thread_ts ?? event.ts}`;
  const requestKey = `${envelope.team_id}:${event.channel}:${event.ts}`;
  const sdkThreadId = `slack:${event.channel}:${event.thread_ts ?? event.ts}`;
  const state = getChatState(); await state.connect();
  const store = await devopsStore();
  const text = cleanInput(event.text).replace(/^devops\s*:\s*/i, '');
  const command = text.toLowerCase();
  const send = (body: string) => sendSlackNotification({ threadKey, body, notificationId: requestKey }, 'devops');
  let operation;
  try { operation = parseOperation(text); }
  catch (error) { await send((error as Error).message); return new Response('ok'); }
  if (operation) {
    const ops = await operationsStore();
    if (operation.kind === 'retry') {
      const previous = await ops.status(operation.jobId);
      if (!previous || previous.threadKey !== threadKey) { await send('DevOps · Retry must refer to a job in this same thread.'); return new Response('ok'); }
      const restarted = await ops.retry(operation.jobId, threadKey);
      // If workflow start previously failed, the queued job still needs its delivery workflow.
      if (restarted || previous.status === 'pending' || previous.status === 'running') {
        await start(operationsWorkflow, [operation.jobId]);
        await send(`DevOps · Resuming job ${operation.jobId} with its saved checkpoints. This does not intentionally create another deployment.`);
      } else await send('DevOps · Only a failed operation whose result was delivered can be retried. Successful operations are not repeated.');
      return new Response('ok');
    }
    const queued = await ops.enqueue({ requestKey, threadKey, actorId: event.user || event.bot_id, operation });
    await start(operationsWorkflow, [queued.id]);
    if (queued.created) await send(`DevOps · Accepted ${operation.kind}. Job ${queued.id} is queued for the operations worker. I will post the verified result here; it waits if the PC is offline.`);
    return new Response('ok');
  }
  if (['stop', 'parar', 'encerrar'].includes(command)) {
    await store.stop(threadKey);
    await state.unsubscribe(sdkThreadId);
    await state.set(`thread-state:${sdkThreadId}`, { agent: 'devops', history: [] }, 30 * 86400000);
    await send('DevOps · I stopped following this thread, cleared its conversational context and cancelled pending generated replies. Accepted GitHub/Vercel operations continue and will report their results here. Original Slack messages remain.');
  } else if (!text || ['help', '/help', 'ajuda', 'status'].includes(command)) {
    if (command !== 'status') await state.subscribe(sdkThreadId);
    await send(command === 'status' ? STATUS + ' Generation uses local Codex; requests wait while the owner’s PC is offline.'
      : HELP.replace('Vercel AI Gateway and its model provider', 'Vercel, Redis and the owner’s local Codex worker with ChatGPT authentication'));
  } else {
    await state.subscribe(sdkThreadId);
    const session = await state.get<Session>(`thread-state:${sdkThreadId}`);
    const input = { requestKey, threadKey, actorId: (event.user || event.bot_id) as string, text };
    await store.enqueue(input, boundedHistory(session?.history || [], []));
    // Await durable workflow start. A failed start leaves the Slack event retryable.
    await start(devopsWorkflow, [input]);
  }
  return new Response('ok');
}
