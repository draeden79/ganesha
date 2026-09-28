import { createOperationsStore } from './operations-store.mjs';
import { generationStorage } from './generation-runtime';
export async function operationsStore() {
  return createOperationsStore(await generationStorage(), { namespace: `ganesha:operations:${process.env.VERCEL_ENV || 'development'}` });
}
