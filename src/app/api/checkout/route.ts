import { NextRequest } from 'next/server';
import { checkoutCookie, courseOffer, hash, idPattern, normalizeLocale, privateHeaders } from '@/lib/payment-core';
import { paymentConfiguration, paymentStore, paymentsOrigin, startCheckout } from '@/lib/payment-runtime';
import { paymentPage } from '@/lib/payment-page';
export const runtime = 'nodejs';
export async function POST(request: NextRequest) {
  if (request.headers.get('origin') !== paymentsOrigin() || new URL(request.url).origin !== paymentsOrigin()) return new Response('Invalid request origin', { status: 403, headers: privateHeaders() });
  const browserToken = request.cookies.get(checkoutCookie)?.value || '';
  if (!idPattern.test(browserToken)) return paymentPage('Please start from checkout.', '<p>Open the checkout page to begin a new test payment.</p><a class="button" href="/checkout">Open checkout</a>', { status: 400 });
  if (!request.headers.get('content-type')?.startsWith('application/x-www-form-urlencoded') || Number(request.headers.get('content-length') || 0) > 1024) return new Response('Invalid request', { status: 400 });
  try {
    paymentConfiguration();
    const raw = await request.text();
    if (raw.length > 1024) return new Response('Invalid request', { status: 400 });
    const data = new URLSearchParams(raw);
    const store = await paymentStore();
    const order = await store.create({ id: hash(browserToken), status: 'pending', courseId: courseOffer.id, locale: normalizeLocale(data.get('locale')), createdAt: Date.now() });
    if (order.status === 'revoked') return paymentPage('This access is unavailable.', '<p>Please contact the course team about this payment.</p>', { status: 403 });
    if (order.status === 'paid') return Response.redirect(`${paymentsOrigin()}/checkout/confirmation?session_id=${encodeURIComponent(order.sessionId!)}`, 303);
    const url = order.checkoutUrl || await startCheckout(order);
    return new Response(null, { status: 303, headers: { ...privateHeaders(), Location: url } });
  } catch { return paymentPage('Checkout is temporarily unavailable.', '<p>No classroom access has been issued. Return to checkout and try again.</p><a class="button" href="/checkout">Back to checkout</a>', { status: 503 }); }
}
