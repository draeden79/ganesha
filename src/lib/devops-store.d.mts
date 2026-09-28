import type { Turn } from './policy';
export type DevopsInput = { requestKey: string; threadKey: string; text: string; actorId: string };
export type DevopsJob = DevopsInput & { status: string; history: Turn[]; answer?: string; deliveryToken?: string; deliveryAttempts: number };
export function createDevopsStore(client: { eval(script: string, options: { keys: string[]; arguments: string[] }): Promise<unknown>; get(key: string): Promise<string | null> }, options: { namespace: string }): {
 enqueue(input: DevopsInput, history?: Turn[]): Promise<boolean>;
 prepare(input: DevopsInput): Promise<DevopsJob | null>;
 commit(input: DevopsInput, answer: string, history: Turn[], now?: number): Promise<boolean>;
 claimDelivery(input: DevopsInput, now?: number): Promise<DevopsJob | null>;
 finishDelivery(input: DevopsInput, token: string, delivered: boolean, now?: number): Promise<boolean>;
 stop(threadKey: string): Promise<void>;
 status(input: DevopsInput): Promise<DevopsJob | null>;
};
