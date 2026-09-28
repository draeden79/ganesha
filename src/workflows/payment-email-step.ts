import { deliverAccessEmail } from '@/lib/payment-runtime';
export async function sendPaymentEmail(orderId: string) {
  'use step';
  try { return await deliverAccessEmail(orderId); }
  catch { throw new Error('Classroom email delivery temporarily unavailable'); }
}
sendPaymentEmail.maxRetries = 5;
