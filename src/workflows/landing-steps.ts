// Copy into ganesha/src/workflows/landing-steps.ts.
import { runLandingJob, deliverLandingNotification } from '@ganesha/landing-pages';
import { landingStore, generateLandingCopy, sendLandingNotification, publicOrigin } from '@/lib/landing-runtime';

export type LandingInput = { requestKey: string; threadKey: string; text: string; actorId: string; now: number };

export async function persistLandingRequest(input: LandingInput) {
  'use step';
  try {
    const store = await landingStore();
    await store.enqueue(input); // A duplicate is successful: the same retained job will be observed.
  } catch {
    // Never put raw Redis errors, brief text or credential-bearing errors in Workflow logs.
    throw new Error('Landing request could not be recorded');
  }
}
persistLandingRequest.maxRetries = 5;

export async function advanceLandingRequest(requestKey: string) {
  'use step';
  try {
    const store = await landingStore();
    await runLandingJob(requestKey, { store, publicOrigin: publicOrigin(), generate: generateLandingCopy });
    const status = await store.jobStatus(requestKey);
    return Boolean(status && ['ready', 'needs_information', 'failed'].includes(status.status));
  } catch { throw new Error('Landing worker temporarily unavailable'); }
}
advanceLandingRequest.maxRetries = 5;

export async function advanceLandingNotification(requestKey: string) {
  'use step';
  try {
    const store = await landingStore();
    await deliverLandingNotification({ store, requestKey, send: sendLandingNotification });
    const status = await store.notificationStatus(requestKey);
    return Boolean(status && ['delivered', 'failed'].includes(status.status));
  } catch { throw new Error('Landing notification temporarily unavailable'); }
}
advanceLandingNotification.maxRetries = 5;
