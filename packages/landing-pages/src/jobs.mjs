import { prepareLandingPage } from './index.mjs';
import { GenerationPendingError } from './generation.mjs';

/** Process one previously persisted request. Durable scheduling belongs to the host. */
export async function runLandingJob(requestKey, deps) {
  const now = deps.now ?? Date.now;
  const claim = await deps.store.claimJob(requestKey, { now: now(), leaseMs: 180000 });
  if (!claim) return { status: 'unavailable' };
  try {
    if (claim.attempt > 3) throw new Error('Attempt limit reached after lease recovery');
    const prepared = await prepareLandingPage({ ...claim, publicOrigin: deps.publicOrigin }, { generate: deps.generate });
    const body = prepared.status === 'ready'
      ? `Landing Pages · Your course page is published: ${prepared.url}${Object.keys(prepared.localizedHtml || {}).length === 11 ? '\nAll 11 language versions are available from the language selector.' : ''}` : prepared.reply;
    // The store must fence stale claims and atomically persist result + notification.
    const committed = await deps.store.completeJob(claim, { prepared, notification: { threadKey: claim.threadKey, body }, now: now() });
    return { status: committed ? prepared.status : 'superseded' };
  } catch (error) {
    if (error instanceof GenerationPendingError) {
      const retryAfterMs = error.retryAfterMs;
      const retained = await deps.store.deferJob(claim, { now: now(), retryAt: now() + retryAfterMs });
      return { status: retained ? 'pending' : 'superseded', retryAfterMs };
    }
    // This update must be a no-op if completion already committed or the lease was lost.
    const terminal = claim.attempt >= 3;
    const retained = await deps.store.failJob(claim, {
      code: 'generation_or_publication_failed', now: now(),
      retryAt: terminal ? null : now() + (claim.attempt === 1 ? 60000 : 180000),
      notification: terminal ? { threadKey: claim.threadKey,
        body: 'Landing Pages · I could not complete this request after three attempts. The previous published page, if any, remains available. An operator can review the retained request.' } : null,
    });
    return { status: retained ? (terminal ? 'failed' : 'retry') : 'superseded' };
  }
}

/** Send a persisted notification without repeating generation/publication. */
export async function deliverLandingNotification(deps) {
  const now = deps.now ?? Date.now;
  const claim = await deps.store.claimNotification({ now: now(), leaseMs: 60000, requestKey: deps.requestKey });
  if (!claim) return { status: 'unavailable' };
  try {
    if (claim.attempt > 8) throw new Error('Delivery attempt limit reached');
    await deps.send({ threadKey: claim.threadKey, body: claim.body, notificationId: claim.id });
    await deps.store.ackNotification(claim, { now: now() });
    return { status: 'delivered' };
  } catch {
    // At-least-once delivery: a crash after Slack accepted the message can repeat it.
    const terminal = claim.attempt >= 8;
    const delay = Math.min(3600000, 10000 * 2 ** Math.min(claim.attempt, 8));
    await deps.store.retryNotification(claim, { now: now(), retryAt: terminal ? null : now() + delay });
    return { status: terminal ? 'failed' : 'retry' };
  }
}
