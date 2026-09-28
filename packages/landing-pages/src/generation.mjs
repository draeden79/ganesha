/** A durable generation exists but its local worker has not returned a result yet. */
export class GenerationPendingError extends Error {
  constructor(retryAfterMs = 30000) {
    super('Generation pending');
    this.name = 'GenerationPendingError';
    this.code = 'generation_pending';
    this.retryAfterMs = Number.isSafeInteger(retryAfterMs) ? Math.max(1000, Math.min(retryAfterMs, 300000)) : 30000;
  }
}
