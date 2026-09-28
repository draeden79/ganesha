import { operationsStore } from '@/lib/operations-runtime';
import { sendSlackNotification } from '@/lib/landing-runtime';
export async function deliverOperation(id: string) {
  'use step';
  const store = await operationsStore();
  const job = await store.status(id);
  if (!job || ['delivered', 'delivery_failed'].includes(job.status)) return true;
  const notice = await store.claimDelivery(id);
  if (!notice) return false;
  try {
    await sendSlackNotification({ threadKey: notice.threadKey, body: notice.result.body, notificationId: id }, 'devops');
    await store.finishDelivery(id, notice.deliveryToken, true);
  } catch { await store.finishDelivery(id, notice.deliveryToken, false); }
  return false;
}
