import { createHash, randomUUID } from 'node:crypto';
const hash = value => createHash('sha256').update(value).digest('hex');
const claimScript = `
local now=tonumber(ARGV[1]); local old=redis.call('GET',KEYS[1]); local r=old and cjson.decode(old) or {}
if r.status=='done' then return cjson.encode({status='done'}) end
if r.leaseUntil and r.leaseUntil>now then return cjson.encode({status='busy'}) end
local limited=r.limit
if ARGV[3]=='1' and not r.counted and not limited then
  if redis.call('EXISTS',KEYS[3])==1 then limited='cooldown'
  elseif tonumber(redis.call('GET',KEYS[2]) or '0')>=tonumber(ARGV[4]) then limited='daily'
  else
    redis.call('INCR',KEYS[2]); redis.call('EXPIRE',KEYS[2],172800)
    redis.call('SET',KEYS[3],'1','PX',10000); r.counted=true
  end
end
r.status='working'; r.token=ARGV[2]; r.leaseUntil=now+30000; r.limit=limited
redis.call('SET',KEYS[1],cjson.encode(r),'EX',604800)
return cjson.encode({status='claimed',token=r.token,limit=limited})`;
const finishScript = `
local raw=redis.call('GET',KEYS[1]); if not raw then return 0 end
local r=cjson.decode(raw); if r.status~='working' or r.token~=ARGV[1] then return 0 end
r.token=nil; r.leaseUntil=nil; r.status=ARGV[2]
redis.call('SET',KEYS[1],cjson.encode(r),'EX',604800); return 1`;

export function createRedisGatewayStore(client, { namespace, dailyLimit = 40 }) {
  if (!/^[a-zA-Z0-9:_-]+$/.test(namespace) || !Number.isSafeInteger(dailyLimit) || dailyLimit < 1 || dailyLimit > 1000) throw new Error('Invalid gateway config');
  const prefix = `{${namespace}}:`;
  const key = value => prefix + 'request:' + hash(value);
  return {
    async getBinding(threadKey) { return (await client.get(prefix + 'binding:' + hash(threadKey))) ?? undefined; },
    async bind(threadKey, agent) {
      if (!['devops', 'landing-pages'].includes(agent)) throw new Error('Invalid agent');
      const k = prefix + 'binding:' + hash(threadKey);
      await client.set(k, agent, { NX: true });
      return client.get(k);
    },
    async claim(requestKey, { userId, charge }) {
      const now = Date.now();
      const raw = await client.eval(claimScript, { keys: [key(requestKey), prefix + 'quota:' + new Date(now).toISOString().slice(0, 10), prefix + 'cooldown:' + hash(userId)],
        arguments: [String(now), randomUUID(), charge ? '1' : '0', String(dailyLimit)] });
      return JSON.parse(String(raw));
    },
    async finish(requestKey, token) {
      if (!Number(await client.eval(finishScript, { keys: [key(requestKey)], arguments: [token, 'done'] }))) throw new Error('Gateway lease lost');
    },
    async release(requestKey, token) { await client.eval(finishScript, { keys: [key(requestKey)], arguments: [token, 'pending'] }); },
    async getUser(userId) { const raw = await client.get(prefix + 'user:' + hash(userId)); return raw ? JSON.parse(raw) : null; },
    async cacheUser(userId, user) { await client.set(prefix + 'user:' + hash(userId), JSON.stringify(user), { EX: 3600 }); },
  };
}
