import { sleep } from 'workflow';
import { sendPaymentEmail } from './payment-email-step';
export async function paymentEmailWorkflow(orderId: string) {
  'use workflow';
  for (let poll = 0; poll < 30; poll++) {
    const status = await sendPaymentEmail(orderId);
    if (status === 'sent' || status === 'revoked') return;
    if (status === 'failed') throw new Error('Classroom access email needs operator review');
    await sleep('60s');
  }
  throw new Error('Classroom email recovery window exhausted');
}
