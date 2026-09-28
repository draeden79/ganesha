import { start } from 'workflow/api';
import type Stripe from 'stripe';
import { fulfillSession, paymentStore, paymentConfiguration } from '@/lib/payment-runtime';
import { verifyPaymentWebhook } from '@/lib/payment-webhook';
import { PaymentNotVerified, privateHeaders } from '@/lib/payment-core';
import { paymentEmailWorkflow } from '@/workflows/payment-email';
export const runtime = 'nodejs';
export async function POST(request: Request) {
  if (Number(request.headers.get('content-length') || 0) > 262144) return new Response('Payload too large', { status: 413 });
  let event: Stripe.Event;
  try {
    const body = await request.text();
    if (body.length > 262144) return new Response('Payload too large', { status: 413 });
    paymentConfiguration();
    event = verifyPaymentWebhook(body, request.headers.get('stripe-signature') || '', process.env.STRIPE_WEBHOOK_SECRET!);
  } catch { return new Response('Invalid webhook', { status: 400, headers: privateHeaders() }); }
  if (event.livemode) return new Response('Only test events are accepted', { status: 400 });
  try {
    if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
      const session = event.data.object;
      if (session.metadata?.integration !== 'ganesha-test-v1') return Response.json({ received: true }, { headers: privateHeaders() });
      const access = await fulfillSession(session.id);
      await start(paymentEmailWorkflow, [access.orderId]);
    } else if (event.type === 'charge.refunded' || event.type === 'charge.dispute.created') {
      const intent = event.data.object.payment_intent;
      if (intent) await (await paymentStore()).revoke(typeof intent === 'string' ? intent : intent.id);
    }
    return Response.json({ received: true }, { headers: privateHeaders() });
  } catch (error) {
    if (error instanceof PaymentNotVerified) return Response.json({ received: true, access: 'not_granted' }, { headers: privateHeaders() });
    return new Response('Payment processing temporarily unavailable', { status: 503, headers: privateHeaders() });
  }
}
