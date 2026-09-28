import type { Operation } from './operations.mjs';
export interface OperationInput { requestKey: string; threadKey: string; actorId: string; operation: Operation }
export interface OperationJob extends OperationInput { id: string; status: 'pending'|'running'|'ready'|'delivered'|'delivery_failed'; checkpoint: Record<string,unknown>; leaseToken: string; leaseExpiresAt: number; deliveryToken: string; result: {ok:boolean;body:string}; }
export function createOperationsStore(client: unknown, config: { namespace: string; leaseMs?: number }): {
  enqueue(input: OperationInput, now?: number): Promise<{id:string;created:boolean}>;
  status(id:string): Promise<OperationJob|null>;
  claim(workerId:string,now?:number): Promise<OperationJob|null>;
  heartbeat(id:string,token:string,now?:number): Promise<boolean>;
  checkpoint(id:string,token:string,data:Record<string,unknown>,now?:number): Promise<boolean>;
  complete(id:string,token:string,result:{ok:boolean;body:string},now?:number): Promise<boolean>;
  claimDelivery(id:string,now?:number): Promise<OperationJob|null>;
  finishDelivery(id:string,token:string,delivered:boolean,now?:number): Promise<boolean>;
  retry(id:string,threadKey:string,now?:number): Promise<boolean>;
};
