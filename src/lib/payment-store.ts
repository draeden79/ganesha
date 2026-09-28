import { randomBytes } from 'node:crypto';
import type { Order, PaymentStore, Entitlement } from './payment-core.ts';
import { idPattern } from './payment-core.ts';

type Redis = { get(key: string): Promise<string | null>; eval(script: string, options: { keys: string[]; arguments: string[] }): Promise<unknown> };
export function createPaymentStore(redis: Redis, namespace: string): PaymentStore {
  if (!/^[a-zA-Z0-9:_-]+$/.test(namespace)) throw new Error('Invalid namespace');
  const root = `ganesha:{${namespace}}:`;
  const orderKey = (id: string) => { if (!idPattern.test(id)) throw new Error('Invalid order'); return `${root}order:${id}`; };
  const evaluate = (script: string, keys: string[], args: unknown[]) => redis.eval(script, { keys, arguments: args.map(value => typeof value === 'string' ? value : JSON.stringify(value)) });
  const parse = <T>(raw: unknown): T | null => raw ? JSON.parse(String(raw)) as T : null;
  return {
    async order(id) { return parse<Order>(await redis.get(orderKey(id))); },
    async create(order) {
      return parse<Order>(await evaluate(`
        local old=redis.call('GET',KEYS[1]); if old then return old end
        redis.call('SET',KEYS[1],ARGV[1],'EX',2592000); return ARGV[1]`, [orderKey(order.id)], [order]))!;
    },
    async attach(id, sessionId, url) {
      return Number(await evaluate(`
        local raw=redis.call('GET',KEYS[1]); if not raw then return 0 end
        local o=cjson.decode(raw)
        if o.sessionId and o.sessionId~=ARGV[1] then return 0 end
        o.sessionId=ARGV[1]; o.checkoutUrl=ARGV[2]
        redis.call('SET',KEYS[1],cjson.encode(o),'KEEPTTL'); return 1`, [orderKey(id)], [sessionId, url])) === 1;
    },
    async grant(id, data) {
      return Number(await evaluate(`
        local raw=redis.call('GET',KEYS[1]); if not raw then return 0 end
        local o=cjson.decode(raw); local d=cjson.decode(ARGV[1]); local pi=redis.call('GET',KEYS[3])
        if o.status=='revoked' or pi=='revoked' or (pi and pi~=o.id) or o.sessionId~=d.sessionId then return 0 end
        if o.status=='paid' then return o.tokenHash==d.tokenHash and 1 or 0 end
        o.status='paid'; o.email=d.email; o.tokenHash=d.tokenHash; o.paymentIntent=d.paymentIntent
        o.emailStatus='pending'; o.emailAttempts=0
        redis.call('SET',KEYS[1],cjson.encode(o))
        redis.call('SET',KEYS[2],cjson.encode({courseId=o.courseId,orderId=o.id,status='active',locale=o.locale}))
        redis.call('SET',KEYS[3],o.id); return 1`,
        [orderKey(id), `${root}access:${data.tokenHash}`, `${root}intent:${data.paymentIntent}`], [data])) === 1;
    },
    async entitlement(tokenHash) {
      if (!idPattern.test(tokenHash)) return null;
      return parse<Entitlement>(await redis.get(`${root}access:${tokenHash}`));
    },
    async revoke(paymentIntent) {
      if (!/^pi_[A-Za-z0-9]+$/.test(paymentIntent)) throw new Error('Invalid payment intent');
      await evaluate(`
        local id=redis.call('GET',KEYS[1]); redis.call('SET',KEYS[1],'revoked')
        if not id or id=='revoked' then return 1 end
        local key=ARGV[1]..'order:'..id; local raw=redis.call('GET',key)
        if raw then
          local o=cjson.decode(raw); o.status='revoked'; redis.call('SET',key,cjson.encode(o))
          if o.tokenHash then redis.call('SET',ARGV[1]..'access:'..o.tokenHash,cjson.encode({courseId=o.courseId,orderId=id,status='revoked',locale=o.locale})) end
        end
        return 1`, [`${root}intent:${paymentIntent}`], [root]);
    },
    async claimEmail(id, now) {
      return parse<Order>(await evaluate(`
        local raw=redis.call('GET',KEYS[1]); if not raw then return nil end
        local o=cjson.decode(raw)
        if o.status~='paid' or o.emailStatus=='sent' or (o.emailAttempts or 0)>=8 or (o.emailLeaseUntil or 0)>tonumber(ARGV[1]) then return nil end
        o.emailClaim=ARGV[2]; o.emailLeaseUntil=tonumber(ARGV[1])+60000; o.emailAttempts=(o.emailAttempts or 0)+1
        local value=cjson.encode(o); redis.call('SET',KEYS[1],value); return value`, [orderKey(id)], [now, randomBytes(24).toString('hex')]));
    },
    async finishEmail(id, claim) {
      await evaluate(`
        local raw=redis.call('GET',KEYS[1]); if not raw then return 0 end
        local o=cjson.decode(raw); if o.emailClaim~=ARGV[1] then return 0 end
        o.emailStatus='sent'; o.emailLeaseUntil=0; o.emailClaim=nil; redis.call('SET',KEYS[1],cjson.encode(o)); return 1`, [orderKey(id)], [claim]);
    },
    async releaseEmail(id, claim) {
      await evaluate(`
        local raw=redis.call('GET',KEYS[1]); if not raw then return 0 end
        local o=cjson.decode(raw); if o.emailClaim~=ARGV[1] then return 0 end
        o.emailLeaseUntil=0; o.emailClaim=nil; redis.call('SET',KEYS[1],cjson.encode(o)); return 1`, [orderKey(id)], [claim]);
    },
  };
}
