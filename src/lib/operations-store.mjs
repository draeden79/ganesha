import { createHash, randomUUID } from 'node:crypto';
const hash = value => createHash('sha256').update(value).digest('hex');
const enqueue = `
if redis.call('HEXISTS',KEYS[1],ARGV[1]) == 1 then return 0 end
redis.call('HSET',KEYS[1],ARGV[1],ARGV[2]); redis.call('ZADD',KEYS[2],ARGV[3],ARGV[1]); return 1`;
const claim = `
local ids=redis.call('ZRANGEBYSCORE',KEYS[2],'-inf',ARGV[1],'LIMIT',0,1)
if #ids == 0 then return false end
local j=cjson.decode(redis.call('HGET',KEYS[1],ids[1])); local now=tonumber(ARGV[1])
j.status='running'; j.leaseToken=ARGV[2]; j.leaseExpiresAt=now+tonumber(ARGV[3]); j.workerId=ARGV[4]; j.claims=(j.claims or 0)+1
redis.call('HSET',KEYS[1],j.id,cjson.encode(j)); redis.call('ZADD',KEYS[2],j.leaseExpiresAt,j.id); return cjson.encode(j)`;
const update = `
local raw=redis.call('HGET',KEYS[1],ARGV[1]); if not raw then return 0 end
local j=cjson.decode(raw); local now=tonumber(ARGV[3])
if j.status ~= 'running' or j.leaseToken ~= ARGV[2] or j.leaseExpiresAt <= now then return 0 end
if ARGV[4] == 'heartbeat' then
 j.leaseExpiresAt=now+tonumber(ARGV[5]); redis.call('ZADD',KEYS[2],j.leaseExpiresAt,j.id)
elseif ARGV[4] == 'checkpoint' then
 local p=cjson.decode(ARGV[5]); j.checkpoint=j.checkpoint or {}; for k,v in pairs(p) do j.checkpoint[k]=v end
else
 j.status='ready'; j.result=cjson.decode(ARGV[5]); j.completedAt=now; j.deliveryDueAt=now; j.deliveryAttempts=0
 redis.call('ZREM',KEYS[2],j.id)
end
redis.call('HSET',KEYS[1],j.id,cjson.encode(j)); return 1`;
const delivery = `
local raw=redis.call('HGET',KEYS[1],ARGV[1]); if not raw then return false end
local j=cjson.decode(raw); local now=tonumber(ARGV[2])
if j.status ~= 'ready' or j.deliveryDueAt > now then return false end
j.deliveryToken=ARGV[3]; j.deliveryDueAt=now+60000; j.deliveryAttempts=j.deliveryAttempts+1
redis.call('HSET',KEYS[1],j.id,cjson.encode(j)); return cjson.encode(j)`;
const finish = `
local raw=redis.call('HGET',KEYS[1],ARGV[1]); if not raw then return 0 end
local j=cjson.decode(raw); local now=tonumber(ARGV[3])
if j.status ~= 'ready' or j.deliveryToken ~= ARGV[2] or j.deliveryDueAt <= now then return 0 end
if ARGV[4] == 'true' then j.status='delivered'
elseif j.deliveryAttempts >= 8 then j.status='delivery_failed'
else j.deliveryDueAt=now+math.min(3600000,10000*2^j.deliveryAttempts) end
j.deliveryToken=nil; redis.call('HSET',KEYS[1],j.id,cjson.encode(j)); return 1`;
const retry = `
local raw=redis.call('HGET',KEYS[1],ARGV[1]); if not raw then return 0 end
local j=cjson.decode(raw)
if j.threadKey ~= ARGV[2] or (j.status ~= 'delivered' and j.status ~= 'delivery_failed') or not j.result or j.result.ok ~= false then return 0 end
j.status='pending'; j.result=nil; j.deliveryToken=nil; j.leaseToken=nil
redis.call('HSET',KEYS[1],j.id,cjson.encode(j)); redis.call('ZADD',KEYS[2],ARGV[3],j.id); return 1`;

export function createOperationsStore(client, { namespace, leaseMs = 180000 }) {
  if (!/^[A-Za-z0-9:_-]+$/.test(namespace)) throw Error('Invalid operations namespace');
  const keys = [`{${namespace}}:jobs`, `{${namespace}}:queue`];
  const run = (script, args) => client.eval(script, { keys, arguments: args.map(String) });
  const decode = raw => raw ? JSON.parse(String(raw)) : null;
  return {
    async enqueue(input, now = Date.now()) {
      const id = hash(input.requestKey);
      const job = { ...input, id, status: 'pending', createdAt: now, checkpoint: {}, claims: 0 };
      return { id, created: Number(await run(enqueue, [id, JSON.stringify(job), now])) === 1 };
    },
    async status(id) { return decode(await client.hGet(keys[0], id)); },
    async claim(workerId, now = Date.now()) { return decode(await run(claim, [now, randomUUID(), leaseMs, workerId])); },
    async heartbeat(id, token, now = Date.now()) { return Number(await run(update, [id, token, now, 'heartbeat', leaseMs])) === 1; },
    async checkpoint(id, token, data, now = Date.now()) {
      const json = JSON.stringify(data); if (json.length > 16000) throw Error('Checkpoint too large');
      return Number(await run(update, [id, token, now, 'checkpoint', json])) === 1;
    },
    async complete(id, token, result, now = Date.now()) {
      if (typeof result?.ok !== 'boolean' || typeof result.body !== 'string' || !result.body || result.body.length > 12000) throw Error('Invalid operations result');
      return Number(await run(update, [id, token, now, 'complete', JSON.stringify({ ok: result.ok, body: result.body })])) === 1;
    },
    async claimDelivery(id, now = Date.now()) { return decode(await run(delivery, [id, now, randomUUID()])); },
    async finishDelivery(id, token, delivered, now = Date.now()) { return Number(await run(finish, [id, token, now, delivered])) === 1; },
    async retry(id, threadKey, now = Date.now()) { return Number(await run(retry, [id, threadKey, now])) === 1; },
  };
}
