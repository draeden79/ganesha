import { createHash, randomUUID } from 'node:crypto';
const digest = value => createHash('sha256').update(value).digest('hex');

const enqueueScript = `
if redis.call('EXISTS',KEYS[1]) == 1 then return 0 end
local t = cjson.decode(redis.call('GET',KEYS[2]) or '{"seq":0,"brief":"","inputChars":0}')
local j = cjson.decode(ARGV[1])
if redis.call('ZCARD',KEYS[3]) >= 20 then return redis.error_reply('thread_queue_full') end
if t.inputChars + tonumber(ARGV[2]) > 30000 then return redis.error_reply('thread_context_full') end
t.seq = t.seq + 1; t.inputChars = t.inputChars + tonumber(ARGV[2]); j.seq = t.seq
redis.call('SET',KEYS[1],cjson.encode(j)); redis.call('SET',KEYS[2],cjson.encode(t))
redis.call('ZADD',KEYS[3],t.seq,j.id); redis.call('ZADD',KEYS[4],j.createdAt,j.id)
return 1`;

const claimScript = `
local raw = redis.call('GET',KEYS[1]); if not raw then return false end
local j = cjson.decode(raw); local now = tonumber(ARGV[1])
if j.status ~= 'queued' and j.status ~= 'running' then return false end
if (j.retryAt or 0) > now or (j.leaseUntil or 0) > now then return false end
local head = redis.call('ZRANGE',KEYS[3],0,0); if head[1] ~= j.id then return false end
local t = cjson.decode(redis.call('GET',KEYS[2]))
if t.leaseUntil and t.leaseUntil > now then return false end
if not j.generationBrief then
  j.generationBrief = t.brief .. '\\n[Slack ' .. j.actorId .. '] ' .. j.text
  j.generationCourse = t.course or cjson.null
end
j.attempt = j.attempt + 1; j.status = 'running'; j.token = ARGV[3]; j.leaseUntil = now + tonumber(ARGV[2])
t.token = j.token; t.leaseUntil = j.leaseUntil
redis.call('SET',KEYS[1],cjson.encode(j)); redis.call('SET',KEYS[2],cjson.encode(t))
redis.call('ZADD',KEYS[4],j.leaseUntil,j.id)
return cjson.encode({requestKey=j.requestKey,threadKey=j.threadKey,token=j.token,attempt=j.attempt,
  brief=j.generationBrief, previousCourse=j.generationCourse})`;

const finishScript = `
local raw = redis.call('GET',KEYS[1]); if not raw then return 0 end
local j = cjson.decode(raw); local t = cjson.decode(redis.call('GET',KEYS[2]))
local r = cjson.decode(ARGV[1]); local now = tonumber(ARGV[2])
if j.status ~= 'running' or j.token ~= ARGV[3] or t.token ~= ARGV[3] or j.leaseUntil <= now then return 0 end
if r.mode == 'complete' then
  if r.prepared.requestKey ~= j.requestKey then return redis.error_reply('request_mismatch') end
  if r.prepared.status == 'ready' then
    local revision = cjson.encode({html=r.prepared.html,revision=j.id})
    if redis.call('EXISTS',KEYS[5]) == 1 then return redis.error_reply('revision_exists') end
    redis.call('SET',KEYS[5],revision); redis.call('SET',KEYS[6],KEYS[5])
    t.course = r.prepared.course
  end
  t.brief = t.brief .. '\\n[Slack ' .. j.actorId .. '] ' .. j.text
  j.status = r.prepared.status; j.finishedAt = now
elseif r.mode == 'pending' then
  j.status = 'queued'; j.retryAt = r.retryAt; j.attempt = math.max(0, j.attempt - 1)
elseif r.retryAt ~= cjson.null then
  j.status = 'queued'; j.retryAt = r.retryAt
else
  j.status = 'failed'; j.finishedAt = now
end
j.token = nil; j.leaseUntil = nil; t.token = nil; t.leaseUntil = nil
redis.call('SET',KEYS[1],cjson.encode(j)); redis.call('SET',KEYS[2],cjson.encode(t))
if j.status == 'queued' then redis.call('ZADD',KEYS[4],j.retryAt,j.id)
else redis.call('ZREM',KEYS[3],j.id); redis.call('ZREM',KEYS[4],j.id) end
if r.notification and r.notification ~= cjson.null then
  local n = {id=j.id,threadKey=j.threadKey,body=r.notification.body,status='pending',attempt=0,dueAt=now}
  redis.call('SET',KEYS[7],cjson.encode(n)); redis.call('ZADD',KEYS[8],now,j.id)
end
return 1`;

const claimNoticeScript = `
local raw = redis.call('GET',KEYS[1]); if not raw then return false end
local n = cjson.decode(raw); local now = tonumber(ARGV[1])
if n.status ~= 'pending' or n.dueAt > now then return false end
n.attempt = n.attempt + 1; n.token = ARGV[3]; n.dueAt = now + tonumber(ARGV[2])
redis.call('SET',KEYS[1],cjson.encode(n)); redis.call('ZADD',KEYS[2],n.dueAt,n.id)
return cjson.encode(n)`;

const finishNoticeScript = `
local raw = redis.call('GET',KEYS[1]); if not raw then return 0 end
local n = cjson.decode(raw)
if n.status ~= 'pending' or n.token ~= ARGV[1] or n.dueAt <= tonumber(ARGV[2]) then return 0 end
if ARGV[3] == 'delivered' then n.status = 'delivered'
elseif ARGV[3] == 'failed' then n.status = 'failed'
else n.dueAt = tonumber(ARGV[3]) end
n.token = nil; redis.call('SET',KEYS[1],cjson.encode(n))
if n.status == 'pending' then redis.call('ZADD',KEYS[2],n.dueAt,n.id) else redis.call('ZREM',KEYS[2],n.id) end
return 1`;

/** Node-redis compatible client. Use durable Redis with no eviction; no publication key gets a TTL. */
export function createRedisLandingStore(client, { namespace = 'ganesha:landing:production' } = {}) {
  if (!/^[a-zA-Z0-9:_-]+$/.test(namespace)) throw new Error('Invalid storage namespace');
  // Keep multi-key scripts in one cluster slot. Never derive prefixes from a course brief.
  const prefix = `{${namespace}}:`;
  const jobKey = id => prefix + 'job:' + id;
  const threadKey = id => prefix + 'thread:' + id;
  const queueKey = id => prefix + 'queue:' + id;
  const pending = prefix + 'pending'; const notices = prefix + 'notices';
  const noticeKey = id => prefix + 'notice:' + id;
  const exec = (script, keys, args) => client.eval(script, { keys, arguments: args.map(String) });
  const getJob = async requestKey => {
    const raw = await client.get(jobKey(digest(requestKey))); return raw ? JSON.parse(raw) : null;
  };
  const finish = async (claim, value) => {
    const id = digest(claim.requestKey), tid = digest(claim.threadKey);
    const slug = value.prepared?.slug ?? 'none';
    if (slug !== 'none' && !/^course-[a-f0-9]{24}$/.test(slug)) throw new Error('Invalid page slug');
    return Number(await exec(finishScript, [jobKey(id), threadKey(tid), queueKey(tid), pending,
      prefix + 'revision:' + id, prefix + 'page:' + slug, noticeKey(id), notices],
      [JSON.stringify(value), value.now, claim.token])) === 1;
  };
  return {
    async enqueue(input) {
      for (const field of ['requestKey', 'threadKey', 'actorId']) if (typeof input[field] !== 'string' || !input[field] || input[field].length > 500) throw new Error('Invalid request identity');
      if (typeof input.text !== 'string' || !input.text.trim() || input.text.length > 12000 || !Number.isSafeInteger(input.now)) throw new Error('Invalid request text/time');
      const id = digest(input.requestKey), tid = digest(input.threadKey);
      const job = { ...input, id, tid, createdAt: input.now, status: 'queued', attempt: 0, retryAt: input.now };
      // Include author labels/newlines in the aggregate brief budget.
      return Number(await exec(enqueueScript, [jobKey(id), threadKey(tid), queueKey(tid), pending], [JSON.stringify(job), input.text.length + input.actorId.length + 10])) === 1;
    },
    async claimJob(requestKey, options) {
      const j = await getJob(requestKey); if (!j) return null;
      const raw = await exec(claimScript, [jobKey(j.id), threadKey(j.tid), queueKey(j.tid), pending], [options.now, options.leaseMs, randomUUID()]);
      return raw ? JSON.parse(String(raw)) : null;
    },
    async completeJob(claim, result) { return finish(claim, { ...result, mode: 'complete' }); },
    async failJob(claim, failure) { return finish(claim, { ...failure, mode: 'fail' }); },
    async deferJob(claim, pendingGeneration) { return finish(claim, { ...pendingGeneration, mode: 'pending', notification: null }); },
    async pendingJobs({ now, limit }) {
      const ids = await client.zRangeByScore(pending, '-inf', now, { LIMIT: { offset: 0, count: Math.min(limit, 100) } });
      const jobs = await Promise.all(ids.map(id => client.get(jobKey(id))));
      return jobs.filter(Boolean).map(raw => JSON.parse(raw).requestKey);
    },
    async jobStatus(requestKey) { const j = await getJob(requestKey); return j ? { status: j.status, retryAt: j.retryAt, leaseUntil: j.leaseUntil } : null; },
    async readPage(slug) {
      if (!/^course-[a-f0-9]{24}$/.test(slug)) return null;
      const key = await client.get(prefix + 'page:' + slug); if (!key) return null;
      const raw = await client.get(key); return raw ? JSON.parse(raw) : null;
    },
    async claimNotification({ now, leaseMs, requestKey }) {
      const ids = requestKey ? [digest(requestKey)] : await client.zRangeByScore(notices, '-inf', now, { LIMIT: { offset: 0, count: 1 } });
      for (const id of ids) {
        const raw = await exec(claimNoticeScript, [noticeKey(id), notices], [now, leaseMs, randomUUID()]);
        if (raw) return JSON.parse(String(raw));
      }
      return null;
    },
    async notificationStatus(requestKey) { const raw = await client.get(noticeKey(digest(requestKey))); if (!raw) return null; const n = JSON.parse(raw); return { status: n.status, dueAt: n.dueAt }; },
    async ackNotification(claim, { now }) {
      if (!await exec(finishNoticeScript, [noticeKey(claim.id), notices], [claim.token, now, 'delivered'])) throw new Error('Notification lease lost');
    },
    async retryNotification(claim, { now, retryAt }) {
      await exec(finishNoticeScript, [noticeKey(claim.id), notices], [claim.token, now, retryAt === null ? 'failed' : retryAt]);
    },
  };
}
