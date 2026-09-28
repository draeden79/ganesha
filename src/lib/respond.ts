import { boundedHistory, cleanInput, HELP, safeReply, STATUS, type Turn } from './policy.ts';

export type Session = { history?: Turn[] };
export interface Incoming { id: string; text: string; author: { userId: string; isBot: boolean | 'unknown'; isMe: boolean } }
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
}

export async function respond(thread: Conversation, message: Incoming, skipped: Incoming[], deps: Dependencies) {
  if (message.author.isBot === true || message.author.isMe) return;
  const text = cleanInput(message.text);
  const command = text.toLocaleLowerCase('pt-BR');
  if (['encerrar', 'stop', 'parar'].includes(command)) {
    await thread.unsubscribe();
    await thread.setState({ history: [] }, { replace: true });
    await thread.post('Acompanhamento encerrado e contexto desta thread removido do bot. Mencione-me novamente quando precisar. As mensagens originais continuam no Slack.');
    return;
  }
  if (!text || ['ajuda', 'help', '/help'].includes(command)) { await thread.subscribe(); await thread.post(HELP); return; }
  if (command === 'status') { await thread.post(STATUS); return; }
  const limit = await deps.quota(message.author.userId);
  if (limit !== 'ok') {
    await thread.post(limit === 'daily'
      ? 'O limite diário de solicitações do bot foi atingido. Ele renova à meia-noite UTC. Um responsável pode revisar o limite na configuração.'
      : 'Aguarde dez segundos antes de enviar outra solicitação.');
    return;
  }
  await thread.subscribe();
  const session = await thread.state;
  const inputs: Turn[] = [...skipped, message]
    .filter((m) => m.author.isBot !== true && !m.author.isMe)
    .map((m) => ({ role: 'user', content: `[Slack ${m.author.userId}] ${cleanInput(m.text)}` }));
  const history = boundedHistory(session?.history ?? [], inputs);
  try {
    const answer = safeReply(await deps.generate(history));
    if (!answer.trim()) throw new Error('empty_response');
    await thread.post(answer);
    await thread.setState({ history: boundedHistory(history, [{ role: 'assistant', content: answer }]) });
  } catch {
    // Log only a fixed event name, never SDK errors containing message bodies or tokens.
    deps.report('generation_or_delivery_failed');
    await thread.post('Não consegui concluir a resposta. Nenhuma mudança de infraestrutura foi executada. Tente novamente ou avise o responsável pelo bot.');
  }
}
