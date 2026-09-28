import Stripe from 'stripe';
import { generationStorage } from './generation-runtime';
import { createPaymentStore } from './payment-store';
import { classroomToken, courseOffer, fulfillPayment, hash, stripeLocale, type Order, type PaidSession } from './payment-core';

export const paymentsOrigin = () => {
  const origin = process.env.PAYMENTS_PUBLIC_ORIGIN || 'https://www.iganesha.online';
  if (!['https://www.iganesha.online', 'https://iganesha.online', 'https://ganesha-devops.vercel.app'].includes(origin)) throw new Error('Invalid payment origin');
  return origin;
};
export function accessKey() {
  const value = process.env.CLASSROOM_ACCESS_KEY || '';
  if (!/^[a-f0-9]{64}$/.test(value)) throw new Error('Classroom access is not configured');
  return value;
}
export function paymentConfiguration() {
  // Intentionally no live-mode switch. A real-sales launch requires a separate reviewed release.
  if (process.env.PAYMENTS_MODE !== 'test' || !/^sk_test_/.test(process.env.STRIPE_SECRET_KEY || '') ||
    !/^whsec_/.test(process.env.STRIPE_WEBHOOK_SECRET || '') || !/^re_/.test(process.env.RESEND_API_KEY || '') ||
    !process.env.RESEND_FROM_EMAIL || !/^[a-f0-9]{64}$/.test(process.env.CLASSROOM_SERVICE_TOKEN || '')) throw new Error('Test checkout is not configured');
  accessKey(); paymentsOrigin();
}
export const stripe = () => {
  paymentConfiguration();
  return new Stripe(process.env.STRIPE_SECRET_KEY!, { maxNetworkRetries: 2, timeout: 15000 });
};
export const paymentStore = async () => createPaymentStore(await generationStorage(), `payments:${process.env.VERCEL_ENV || 'development'}:v1`);
export async function startCheckout(order: Order) {
  const client = stripe();
  const session = await client.checkout.sessions.create({
    mode: 'payment', payment_method_types: ['card'], locale: stripeLocale(order.locale) as Stripe.Checkout.SessionCreateParams.Locale,
    client_reference_id: order.id, metadata: { orderId: order.id, courseId: courseOffer.id, integration: 'ganesha-test-v1' },
    line_items: [{ quantity: 1, price_data: { currency: 'usd', unit_amount: 999, product_data: { name: courseOffer.title } } }],
    allow_promotion_codes: false, automatic_tax: { enabled: false }, adaptive_pricing: { enabled: false },
    success_url: `${paymentsOrigin()}/checkout/confirmation?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${paymentsOrigin()}/checkout?canceled=1&lang=${encodeURIComponent(order.locale)}`,
    custom_text: { submit: { message: 'Test mode only. No real payment. Your classroom link appears after confirmation and is emailed to you.' } },
  }, { idempotencyKey: `ganesha-checkout-v1-${order.id}` });
  if (session.livemode || !session.id.startsWith('cs_test_') || !session.url || new URL(session.url).origin !== 'https://checkout.stripe.com') throw new Error('Unexpected checkout response');
  const store = await paymentStore();
  if (!await store.attach(order.id, session.id, session.url)) throw new Error('Checkout could not be recorded');
  return session.url;
}
export async function fulfillSession(sessionId: string) {
  if (!/^cs_test_[A-Za-z0-9]+$/.test(sessionId)) throw new Error('Invalid checkout session');
  const session = await stripe().checkout.sessions.retrieve(sessionId, { expand: ['line_items', 'payment_intent.latest_charge'] });
  return fulfillPayment(session as PaidSession, await paymentStore(), accessKey());
}
export async function deliverAccessEmail(orderId: string): Promise<'sent' | 'pending' | 'failed' | 'revoked'> {
  paymentConfiguration();
  const store = await paymentStore();
  const previous = await store.order(orderId);
  if (!previous || previous.status !== 'paid') return 'revoked';
  if (previous.emailStatus === 'sent') return 'sent';
  if ((previous.emailAttempts || 0) >= 8) return 'failed';
  const order = await store.claimEmail(orderId, Date.now());
  if (!order) return 'pending';
  try {
    const url = `${paymentsOrigin()}/classroom/${classroomToken(order.sessionId!, accessKey())}`;
    const response = await fetch('https://api.resend.com/emails', { method: 'POST', redirect: 'error', signal: AbortSignal.timeout(15000),
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': `classroom-v1-${hash(order.sessionId!)}` },
      body: JSON.stringify({ from: process.env.RESEND_FROM_EMAIL, to: [order.email], subject: 'Your Ganesha classroom access — test mode',
        text: `Your US$9.99 test payment is confirmed. No real money was charged.\n\nOpen your Ganesha classroom:\n${url}\n\nKeep this link private: anyone with it can access your classroom. You can reopen it when you change browsers.\n\nGanesha` }) });
    if (!response.ok || !(await response.json() as { id?: string }).id) throw new Error('Email provider unavailable');
    await store.finishEmail(orderId, order.emailClaim!);
    return 'sent';
  } catch {
    await store.releaseEmail(orderId, order.emailClaim!);
    return 'pending';
  }
}
