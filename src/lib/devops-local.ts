import { start } from 'workflow/api';
import { getChatState } from './bot';
import { boundedHistory, cleanInput, HELP, STATUS } from './policy';
import { devopsStore } from './devops-runtime';
import { sendSlackNotification } from './landing-runtime';
import { devopsWorkflow } from '@/workflows/devops';
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
  if (['stop', 'parar', 'encerrar'].includes(command)) {
    await store.stop(threadKey);
    await state.unsubscribe(sdkThreadId);
    await state.set(`thread-state:${sdkThreadId}`, { agent: 'devops', history: [] }, 30 * 86400000);
    await send('DevOps · I stopped following this thread, cleared its context and cancelled pending replies. A generation already running may finish, but its result will not be posted. Original Slack messages remain.');
  } else if (!text || ['help', '/help', 'ajuda', 'status'].includes(command)) {
    if (command !== 'status') await state.subscribe(sdkThreadId);
    await send(command === 'status' ? STATUS + ' Generation uses local Codex; requests wait while the owner’s PC is offline.'
      : HELP.replace('Vercel AI Gateway and its model provider', 'Vercel, Redis and the owner’s local Codex worker with ChatGPT authentication'));
  } else {
    await state.subscribe(sdkThreadId);
    const session = await state.get<Session>(`thread-state:${sdkThreadId}`);
    const input = { requestKey, threadKey, actorId: event.user as string, text };
    await store.enqueue(input, boundedHistory(session?.history || [], []));
    // Await durable workflow start. A failed start leaves the Slack event retryable.
    await start(devopsWorkflow, [input]);
  }
  return new Response('ok');
}
