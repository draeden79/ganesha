/** Normalize DM roots only after the shared ingress has authenticated the event. */
export async function normalizeVerifiedSlackRequest(request: Request): Promise<Request> {
  const envelope = await request.clone().json();
  if (!envelope.event?.channel?.startsWith('D') || envelope.event.thread_ts) return request;
  envelope.event.thread_ts = envelope.event.ts;
  // Next's incoming request wrapper cannot always be passed to native Request.
  // Preserve the authentication headers explicitly instead of copying that wrapper.
  return new Request(request.url, {
    method: request.method, headers: request.headers, body: JSON.stringify(envelope), signal: request.signal,
  });
}
