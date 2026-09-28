import { WorkerError } from './runner.mjs';
export class TransportError extends WorkerError {
  constructor(code, status = 0) { super(code); this.status = status; }
}
const allowedErrors = new Set(['unauthorized','invalid_request','lease_lost','payload_too_large',
  'invalid_result','unavailable','backend_disabled']);

export function createClient({ origin, token, fetchImpl = fetch, timeoutMs = 20000 }) {
  const url = new URL(origin);
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash || url.pathname !== '/') {
    throw new WorkerError('invalid_config', { retryable: false });
  }
  if (typeof token !== 'string' || !/^[A-Za-z0-9_=-]{43,256}$/.test(token)) throw new WorkerError('invalid_config', { retryable: false });
  return {
    async post(action, payload, { signal } = {}) {
      if (!['claim','heartbeat','complete','fail'].includes(action)) throw new WorkerError('invalid_config');
      const body = JSON.stringify(payload);
      if (Buffer.byteLength(body) > 256 * 1024) throw new WorkerError('invalid_output');
      let response;
      try {
        response = await fetchImpl(`${url.origin}/api/local-worker/${action}`, {
          method: 'POST', redirect: 'error', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body, signal: signal ? AbortSignal.any([signal, AbortSignal.timeout(timeoutMs)]) : AbortSignal.timeout(timeoutMs),
        });
      } catch { throw new TransportError('unavailable'); }
      const reader = response.body?.getReader();
      const chunks = [];
      let bytes = 0;
      if (reader) {
        try {
          for (;;) {
            const { done, value } = await reader.read();
            if (done) break;
            bytes += value.byteLength;
            if (bytes > 256 * 1024) { await reader.cancel(); throw new TransportError('invalid_response'); }
            chunks.push(Buffer.from(value));
          }
        } catch (error) { throw error instanceof TransportError ? error : new TransportError('unavailable'); }
      }
      let data;
      try { data = JSON.parse(Buffer.concat(chunks).toString()); } catch { throw new TransportError('invalid_response', response.status); }
      if (!response.ok) {
        const code = allowedErrors.has(data?.error?.code) ? data.error.code : 'unavailable';
        throw new TransportError(code, response.status);
      }
      if (!data || typeof data !== 'object' || Array.isArray(data)) throw new TransportError('invalid_response');
      return data;
    },
  };
}
