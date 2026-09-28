import { timingSafeEqual } from 'node:crypto';
import type { GenerationBroker, Agent, LeaseOwner, FailureCode, JsonObject } from '@ganesha/local-generation-broker';

export function workerAuthorized(request: Request, token?: string) {
  const supplied = /^Bearer ([A-Za-z0-9_=-]{43,256})$/.exec(request.headers.get('authorization') ?? '')?.[1];
  return Boolean(token && token.length >= 43 && supplied && Buffer.byteLength(supplied) === Buffer.byteLength(token) && timingSafeEqual(Buffer.from(supplied), Buffer.from(token)));
}

export async function workerRequest(request: Request, action: string, deps: {
  token?: string; enabled: boolean; broker: () => Promise<GenerationBroker>;
}) {
  const reply = (data: unknown, status = 200) => Response.json(data, { status, headers: { 'Cache-Control': 'no-store' } });
  const error = (code: string, status: number) => reply({ error: { code } }, status);
  if (!workerAuthorized(request, deps.token)) {
    return error('unauthorized', 401);
  }
  if (!deps.enabled) return error('backend_disabled', 503);
  if (!['claim', 'heartbeat', 'complete', 'fail'].includes(action) || !request.headers.get('content-type')?.startsWith('application/json')) {
    return error('invalid_request', 400);
  }
  try {
    const reader = request.body?.getReader();
    if (!reader) return error('invalid_request', 400);
    let bytes = 0; const chunks: Uint8Array[] = [];
    for (;;) {
      const { done, value } = await reader.read(); if (done) break;
      bytes += value.length;
      if (bytes > 256 * 1024) { void reader.cancel(); return error('payload_too_large', 413); }
      chunks.push(value);
    }
    let input: Record<string, unknown>;
    try { input = JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch { return error('invalid_request', 400); }
    if (!input || typeof input !== 'object' || Array.isArray(input)) return error('invalid_request', 400);
    const fields: Record<string, string[]> = { claim: ['workerId', 'agents'], heartbeat: ['workerId', 'jobId', 'leaseToken'],
      complete: ['workerId', 'jobId', 'leaseToken', 'result', 'model', 'reasoningEffort'], fail: ['workerId', 'jobId', 'leaseToken', 'code', 'retryable'] };
    if (Object.keys(input).some(key => !fields[action].includes(key)) || fields[action].some(key => !(key in input))) return error('invalid_request', 400);
    const broker = await deps.broker();
    if (action === 'claim') return reply({ job: await broker.claim(input as { workerId: string; agents: Agent[] }) });
    if (action === 'heartbeat') return reply(await broker.heartbeat(input as LeaseOwner));
    if (action === 'complete') return reply(await broker.complete(input as LeaseOwner & { result: JsonObject; model: string; reasoningEffort: string }));
    return reply(await broker.fail(input as LeaseOwner & { code: FailureCode; retryable: boolean }));
  } catch (cause) {
    const code = (cause as { code?: string }).code;
    const statuses: Record<string, number> = { invalid_request: 400, lease_lost: 409, payload_too_large: 413, invalid_result: 422 };
    return error(code && statuses[code] ? code : 'unavailable', code && statuses[code] || 503);
  }
}
