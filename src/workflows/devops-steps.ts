import { devopsStore } from '@/lib/devops-runtime';
import { localGeneration, generationId, devopsSchema, generationBroker } from '@/lib/generation-runtime';
import { boundedHistory, safeReply, SYSTEM } from '@/lib/policy';
import { sendSlackNotification } from '@/lib/landing-runtime';
import type { DevopsInput } from '@/lib/devops-store.mjs';
export async function advanceDevops(input: DevopsInput) {
  'use step';
  try {
    const store = await devopsStore();
    const job = await store.prepare(input);
    if (!job) return false;
    if (['delivered', 'delivery_failed', 'cancelled'].includes(job.status)) return true;
    if (job.status === 'pending') {
      const history = boundedHistory(job.history, [{ role: 'user', content: `[Slack ${job.actorId}] ${job.text}` }]);
      let answer: string;
      try {
        const result = await localGeneration({ jobId: generationId('devops', input.requestKey), agent: 'devops',
          system: SYSTEM, input: JSON.stringify({ messages: history }), outputSchema: devopsSchema });
        if (!result) return false;
        answer = safeReply(result.text as string);
      } catch {
        // Broker/storage faults must retry instead of replacing retained work with a failure reply.
        const status = await (await generationBroker()).status(generationId('devops', input.requestKey));
        if (status?.status !== 'failed') throw new Error('Generation unavailable');
        answer = 'DevOps · I could not complete this request after the local worker’s bounded retries. No infrastructure changes were executed. Contact the bot owner with this thread.';
      }
      await store.commit(input, answer, boundedHistory(history, [{ role: 'assistant', content: answer }]));
    }
    const delivery = await store.claimDelivery(input);
    if (!delivery) return false;
    try {
      if (delivery.deliveryAttempts > 8) throw new Error('Delivery attempts exhausted');
      await sendSlackNotification({ threadKey: delivery.threadKey, body: delivery.answer!, notificationId: input.requestKey }, 'devops');
      await store.finishDelivery(input, delivery.deliveryToken!, true);
    } catch { await store.finishDelivery(input, delivery.deliveryToken!, false); }
    const status = await store.status(input);
    return Boolean(status && ['delivered', 'delivery_failed', 'cancelled'].includes(status.status));
  } catch { throw new Error('DevOps durable processing unavailable'); }
}
advanceDevops.maxRetries = 5;
