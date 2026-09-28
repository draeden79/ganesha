import { authorizedToken, privateHeaders, secretEquals } from '@/lib/payment-core';
import { paymentStore } from '@/lib/payment-runtime';
export const runtime = 'nodejs';
export async function POST(request: Request) {
  const expected = process.env.CLASSROOM_SERVICE_TOKEN || '';
  if (!/^[a-f0-9]{64}$/.test(expected) || !secretEquals(request.headers.get('authorization') || '', `Bearer ${expected}`)) return new Response('Unauthorized', { status: 401, headers: privateHeaders() });
  try {
    const body = await request.text();
    if (body.length > 256) return new Response('Invalid request', { status: 400, headers: privateHeaders() });
    const data = JSON.parse(body) as { token?: unknown };
    const access = typeof data.token === 'string' ? await authorizedToken(data.token, await paymentStore()) : null;
    return Response.json(access ? { authorized: true, courseId: access.courseId, userId: access.orderId } : { authorized: false }, { headers: privateHeaders() });
  } catch { return new Response('Access verification unavailable', { status: 503, headers: privateHeaders() }); }
}
