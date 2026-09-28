import { createDevopsStore } from './devops-store.mjs';
import { generationStorage } from './generation-runtime';
export async function devopsStore() {
  return createDevopsStore(await generationStorage(), { namespace: `ganesha:devops-local:${process.env.VERCEL_ENV || 'development'}` });
}
