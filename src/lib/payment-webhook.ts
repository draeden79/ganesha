import Stripe from 'stripe';
export function verifyPaymentWebhook(body: string, signature: string, secret: string) {
  if (!secret.startsWith('whsec_')) throw new Error('Webhook not configured');
  const event = Stripe.webhooks.constructEvent(body, signature, secret);
  if (event.livemode !== false) throw new Error('Live events are not accepted');
  return event;
}
