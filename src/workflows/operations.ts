import { sleep } from 'workflow';
import { deliverOperation } from './operations-steps';
export async function operationsWorkflow(id: string) {
  'use workflow';
  while (!await deliverOperation(id)) await sleep('10s');
}
