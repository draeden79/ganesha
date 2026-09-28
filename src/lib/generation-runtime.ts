import { createHash } from 'node:crypto';
import { createClient } from 'redis';
import { createRedisGenerationBroker, type GenerationInput } from '@ganesha/local-generation-broker';
import { validateGeneration } from '@ganesha/landing-pages';

export function generationBackend() {
  const backend = process.env.GENERATION_BACKEND || 'gateway';
  if (!['gateway', 'local-codex'].includes(backend)) throw new Error('Invalid generation backend');
  return backend;
}
export const generationId = (agent: string, requestKey: string) => createHash('sha256')
  .update(`generation-v1:${agent}:${requestKey}`).digest('hex');
export const devopsSchema = { type: 'object', properties: { text: { type: 'string', minLength: 1, maxLength: 12000 } },
  required: ['text'], additionalProperties: false };

function createStorage() {
  if (!process.env.REDIS_URL) throw new Error('Redis configuration missing');
  return createClient({ url: process.env.REDIS_URL, socket: { connectTimeout: 15000 } });
}
let connection: Promise<ReturnType<typeof createStorage>> | undefined;
export async function generationStorage() {
  if (!connection) {
    const client = createStorage();
    client.on('error', () => console.error(JSON.stringify({ event: 'generation_storage_unavailable' })));
    connection = client.connect().then(() => client).catch(() => { connection = undefined; throw new Error('Storage unavailable'); });
  }
  return connection;
}
export async function generationBroker() {
  return createRedisGenerationBroker(await generationStorage(), {
    namespace: `ganesha:generation:${process.env.VERCEL_ENV || 'development'}`,
    validateResult: ({ agent, result }) => {
      if (agent === 'landing-pages') validateGeneration(result);
      else if (typeof result.text !== 'string' || !result.text.trim() || result.text.length > 12000 || /[\u0000-\u0008]/u.test(result.text)) {
        throw new Error('Invalid DevOps result');
      }
    },
  });
}
export async function localGeneration(input: GenerationInput) {
  const broker = await generationBroker();
  // Observe a retained snapshot first: deployment prompt changes never replace a pending job.
  const status = await broker.status(input.jobId) ?? await broker.enqueue(input);
  if (status.status === 'completed') return status.result!;
  if (status.status === 'failed') throw new Error('Local generation failed');
  return null;
}
