import { sleep } from 'workflow';
import { advanceDevops } from './devops-steps';
import type { DevopsInput } from '@/lib/devops-store.mjs';
export async function devopsWorkflow(input: DevopsInput) {
  'use workflow';
  // Offline PCs do not exhaust a recovery window; Redis and durable sleeps retain work.
  for (;;) {
    if (await advanceDevops(input)) return;
    await sleep('30s');
  }
}
