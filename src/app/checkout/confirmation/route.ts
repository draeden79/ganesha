import { NextRequest } from 'next/server';
import { start } from 'workflow/api';
import { checkoutCookie, hash, idPattern, PaymentNotVerified } from '@/lib/payment-core';
import { fulfillSession, paymentStore, paymentsOrigin } from '@/lib/payment-runtime';
import { escapeHtml, paymentPage } from '@/lib/payment-page';
import { paymentEmailWorkflow } from '@/workflows/payment-email';
export const dynamic = 'force-dynamic';
export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get('session_id') || '';
  const browserToken = request.cookies.get(checkoutCookie)?.value || '';
  if (!/^cs_test_[A-Za-z0-9]+$/.test(sessionId) || !idPattern.test(browserToken)) return paymentPage('Check your classroom email.', '<p>Open the private link sent to the email used at checkout. This confirmation page is available only in the browser that started payment.</p>', { status: 403 });
  try {
    const store = await paymentStore();
    const order = await store.order(hash(browserToken));
    if (!order || order.sessionId !== sessionId) return paymentPage('Check your classroom email.', '<p>Use your private email link to open the classroom.</p>', { status: 403 });
    const access = await fulfillSession(sessionId);
    let deliveryQueued = true;
    try { await start(paymentEmailWorkflow, [access.orderId]); } catch { deliveryQueued = false; }
    const updated = await store.order(order.id);
    const url = `${paymentsOrigin()}/classroom/${access.token}`;
    return paymentPage('Your classroom is ready.', `<p>Your US$9.99 test payment is verified. No real money was charged.</p>
      <p>${updated?.emailStatus === 'sent' ? 'Your access email has been sent.' : deliveryQueued ? 'Your access email is being sent.' : 'Email delivery is delayed. Save your link below; delivery will be retried from the payment notification.'}</p>
      <p><a class="button" href="${escapeHtml(url)}">Open my classroom ↗</a></p><p class="access-link">${escapeHtml(url)}</p>
      <div class="notice">Keep this link private. Anyone with the link can open your classroom. Bookmark it or use the copy in your email.</div>`);
  } catch (error) {
    return paymentPage(error instanceof PaymentNotVerified ? 'Payment is not confirmed yet.' : 'We could not confirm payment yet.',
      '<p>Classroom access is available after a successful payment has been verified. Refresh this page shortly, or check the email used at checkout.</p><a href="/checkout">Back to checkout</a>', { status: error instanceof PaymentNotVerified ? 202 : 503 });
  }
}
