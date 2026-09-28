// Copy into ganesha/src/workflows/landing-pages.ts.
import { sleep } from 'workflow';
import { persistLandingRequest, advanceLandingRequest, advanceLandingNotification, type LandingInput } from './landing-steps';

export async function landingPageWorkflow(input: LandingInput) {
  'use workflow';
  // start(workflow, [input]) durably retains the accepted brief before HTTP acknowledgement.
  // Redis enqueue/claim/commit make duplicate workflow starts harmless to publication.
  await persistLandingRequest(input);
  let complete = false;
  for (let poll = 0; poll < 480; poll++) {
    if (await advanceLandingRequest(input.requestKey)) { complete = true; break; }
    await sleep('30s');
  }
  if (!complete) throw new Error('Landing job requires operator attention after recovery window');
  for (let poll = 0; poll < 480; poll++) {
    if (await advanceLandingNotification(input.requestKey)) return;
    await sleep('30s');
  }
  throw new Error('Landing notification requires operator attention after recovery window');
}
