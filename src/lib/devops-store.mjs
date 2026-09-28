import { createHash, randomUUID } from 'node:crypto';
const hash = value => createHash('sha256').update(value).digest('hex');
const enqueue = `
if redis.call('EXISTS',KEYS[1]) == 1 then return 0 end
if redis.call('ZCARD',KEYS[3]) >= 20 then return redis.error_reply('queue_full') end
local t = cjson.decode(redis.call('GET',KEYS[2]) or ARGV[2]); local j = cjson.decode(ARGV[1])
t.seq = (t.seq or 0) + 1; j.epoch = t.epoch or 0; j.status = 'pending'
redis.call('SET',KEYS[1],cjson.encode(j)); redis.call('SET',KEYS[2],cjson.encode(t)); redis.call('ZADD',KEYS[3],t.seq,j.id)
return 1`;
const prepare = `
local raw = redis.call('GET',KEYS[1]); if not raw then return false end
local j = cjson.decode(raw); local t = cjson.decode(redis.call('GET',KEYS[2]))
if j.epoch ~= (t.epoch or 0) then j.status = 'cancelled'; redis.call('SET',KEYS[1],cjson.encode(j)); redis.call('ZREM',KEYS[3],j.id); return cjson.encode(j) end
if j.status ~= 'pending' then return cjson.encode(j) end
local head = redis.call('ZRANGE',KEYS[3],0,0); if head[1] ~= j.id then return false end
if not j.historyJson then j.historyJson = t.historyJson; redis.call('SET',KEYS[1],cjson.encode(j)) end
return cjson.encode(j)`;
const commit = `
local j = cjson.decode(redis.call('GET',KEYS[1]) or 'null'); if j == cjson.null then return 0 end
local t = cjson.decode(redis.call('GET',KEYS[2])); local head = redis.call('ZRANGE',KEYS[3],0,0)
if j.status ~= 'pending' or j.epoch ~= (t.epoch or 0) or head[1] ~= j.id then return 0 end
j.status = 'ready'; j.answer = ARGV[1]; j.dueAt = tonumber(ARGV[3]); j.deliveryAttempts = 0
t.historyJson = ARGV[2]
redis.call('SET',KEYS[1],cjson.encode(j)); redis.call('SET',KEYS[2],cjson.encode(t)); return 1`;
const claimDelivery = `
local j = cjson.decode(redis.call('GET',KEYS[1]) or 'null'); if j == cjson.null then return false end
local t = cjson.decode(redis.call('GET',KEYS[2])); local now = tonumber(ARGV[1])
if j.epoch ~= (t.epoch or 0) or j.status ~= 'ready' or j.dueAt > now then return false end
j.deliveryToken = ARGV[2]; j.dueAt = now + 60000; j.deliveryAttempts = j.deliveryAttempts + 1
redis.call('SET',KEYS[1],cjson.encode(j)); return cjson.encode(j)`;
const finishDelivery = `
local j = cjson.decode(redis.call('GET',KEYS[1]) or 'null'); if j == cjson.null then return 0 end
if j.status ~= 'ready' or j.deliveryToken ~= ARGV[1] or j.dueAt <= tonumber(ARGV[2]) then return 0 end
j.deliveryToken = nil
if ARGV[3] == 'delivered' or j.deliveryAttempts >= 8 then
 j.status = ARGV[3] == 'delivered' and 'delivered' or 'delivery_failed'; redis.call('ZREM',KEYS[3],j.id)
else j.dueAt = tonumber(ARGV[2]) + math.min(3600000, 10000 * 2 ^ j.deliveryAttempts) end
redis.call('SET',KEYS[1],cjson.encode(j)); return 1`;
const stop = `
local t = cjson.decode(redis.call('GET',KEYS[1]) or '{"epoch":0,"seq":0}')
t.epoch = (t.epoch or 0) + 1; t.historyJson = '[]'
redis.call('SET',KEYS[1],cjson.encode(t)); redis.call('DEL',KEYS[2]); return 1`;

/** Durable per-thread FIFO with immutable generation snapshots and a fenced reply outbox. */
export function createDevopsStore(client, { namespace }) {
  if (!/^[A-Za-z0-9:_-]+$/.test(namespace)) throw Error('Invalid namespace');
  const prefix = `{${namespace}}:`;
  const keys = (requestKey, threadKey) => [prefix + 'job:' + hash(requestKey), prefix + 'thread:' + hash(threadKey), prefix + 'queue:' + hash(threadKey)];
  const run = (script, ks, args) => client.eval(script, { keys: ks, arguments: args.map(String) });
  const decode = raw => raw ? JSON.parse(String(raw)) : null;
  const publicJob = job => job ? { ...job, history: JSON.parse(job.historyJson || '[]') } : null;
  return {
    async enqueue(input, history = []) {
      const j = { ...input, id: hash(input.requestKey) };
      return Number(await run(enqueue, keys(input.requestKey, input.threadKey), [JSON.stringify(j), JSON.stringify({ epoch: 0, seq: 0, historyJson: JSON.stringify(history) })])) === 1;
    },
    async prepare(input) { return publicJob(decode(await run(prepare, keys(input.requestKey, input.threadKey), []))); },
    async commit(input, answer, history, now = Date.now()) { return Number(await run(commit, keys(input.requestKey, input.threadKey), [answer, JSON.stringify(history), now])) === 1; },
    async claimDelivery(input, now = Date.now()) { return publicJob(decode(await run(claimDelivery, keys(input.requestKey, input.threadKey), [now, randomUUID()]))); },
    async finishDelivery(input, token, delivered, now = Date.now()) { return Number(await run(finishDelivery, keys(input.requestKey, input.threadKey), [token, now, delivered ? 'delivered' : 'retry'])) === 1; },
    async stop(threadKey) { const ks = keys('unused', threadKey); await run(stop, ks.slice(1), []); },
    async status(input) { return publicJob(decode(await client.get(keys(input.requestKey, input.threadKey)[0]))); },
  };
}
