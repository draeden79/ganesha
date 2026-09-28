export type Agent = 'landing-pages' | 'devops';
export type FailureCode = 'auth_required' | 'usage_limit' | 'model_unavailable' | 'timeout' | 'invalid_output' | 'runner_failed' | 'worker_shutdown';
export type JsonObject = { [key: string]: unknown };
export type GenerationStatus = { status: 'pending' | 'leased' | 'completed' | 'failed'; result?: JsonObject; code?: FailureCode };
export type GenerationInput = { jobId: string; agent: Agent; system: string; input: string; outputSchema: JsonObject };
export type GenerationClaim = GenerationInput & { version: 1; leaseToken: string; leaseExpiresAt: number };
export type LeaseOwner = { workerId: string; jobId: string; leaseToken: string };
export class BrokerError extends Error { readonly code: string; constructor(code: string); }
export interface GenerationBroker {
  enqueue(input: GenerationInput): Promise<GenerationStatus>;
  status(jobId: string): Promise<GenerationStatus | null>;
  claim(input: { workerId: string; agents: Agent[] }): Promise<GenerationClaim | null>;
  heartbeat(input: LeaseOwner): Promise<{ ok: true; leaseExpiresAt: number }>;
  complete(input: LeaseOwner & { result: JsonObject; model: string; reasoningEffort: string }): Promise<{ ok: true }>;
  fail(input: LeaseOwner & { code: FailureCode; retryable: boolean }): Promise<{ ok: true }>;
}
export function createRedisGenerationBroker(client: {
  eval(script: string, options: { keys: string[]; arguments: string[] }): Promise<unknown>;
  hGet(key: string, field: string): Promise<string | null>;
}, options: {
  namespace: string; leaseMs?: number; maxPending?: number; maxAttempts?: number; now?: () => number;
  validateResult?: (input: { agent: Agent; input: string; result: JsonObject }) => void | Promise<void>;
}): GenerationBroker;
