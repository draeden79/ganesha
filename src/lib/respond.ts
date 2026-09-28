import { boundedHistory, cleanInput, HELP, safeReply, STATUS, type Turn } from './policy.ts';

export type Session = { agent?: 'devops' | 'landing-pages'; history?: Turn[] };
export interface Incoming { id: string; text: string; isMention?: boolean; author: { userId: string; isBot: boolean | 'unknown'; isMe: boolean } }
export interface Conversation {
  state: Promise<Session | null>;
  post: (text: string) => Promise<unknown>;
  setState: (state: Session, options?: { replace?: boolean }) => Promise<unknown>;
  subscribe: () => Promise<void>;
  unsubscribe: () => Promise<void>;
}
export interface Dependencies {
  quota: (userId: string) => Promise<'ok' | 'daily' | 'cooldown'>;
  generate: (messages: Turn[]) => Promise<string>;
  report: (event: string) => void;
  allowBot?: (message: Incoming) => boolean;
}

export async function respond(thread: Conversation, message: Incoming, skipped: Incoming[], deps: Dependencies) {
  const accepted = (m: Incoming) => !m.author.isMe && (m.author.isBot === false ||
    (m.author.isBot === true && deps.allowBot?.(m) === true));
  if (!accepted(message)) return;
  const text = cleanInput(message.text).replace(/^devops\s*:\s*/i, '');
  const command = text.toLowerCase();
  if (['encerrar', 'stop', 'parar'].includes(command)) {
    await thread.unsubscribe();
    await thread.setState({ agent: (await thread.state)?.agent, history: [] }, { replace: true });
    await thread.post('DevOps · I stopped following this thread and cleared its bot context. Mention me again when needed. Original Slack messages remain in Slack.');
    return;
  }
  if (!text || ['ajuda', 'help', '/help'].includes(command)) { await thread.subscribe(); await thread.post(HELP); return; }
  if (command === 'status') { await thread.post(STATUS); return; }
  const limit = await deps.quota(message.author.userId);
  if (limit !== 'ok') {
    await thread.post(limit === 'daily'
      ? 'DevOps · The daily request limit has been reached. It resets at midnight UTC. The bot owner can review the configured limit.'
      : 'DevOps · Please wait ten seconds before sending another request.');
    return;
  }
  await thread.subscribe();
  const session = await thread.state;
  const inputs: Turn[] = [...skipped, message]
    .filter(accepted)
    .map((m) => ({ role: 'user', content: `[Slack ${m.author.userId}] ${cleanInput(m.text)}` }));
  const history = boundedHistory(session?.history ?? [], inputs);
  try {
    const answer = safeReply(await deps.generate(history));
    if (!answer.trim()) throw new Error('empty_response');
    await thread.post(answer);
    await thread.setState({ ...session, history: boundedHistory(history, [{ role: 'assistant', content: answer }]) });
  } catch {
    // Log only a fixed event name, never SDK errors containing message bodies or tokens.
    deps.report('generation_or_delivery_failed');
    await thread.post('DevOps · I could not complete the response. No infrastructure changes were executed. Please try again or contact the bot owner.');
  }
}
