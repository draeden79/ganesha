import { createHash, randomUUID } from 'node:crypto';
import Ajv from 'ajv';

const MAX_BYTES = 256 * 1024;
const agents = new Set(['landing-pages', 'devops']);
const failureCodes = new Set(['auth_required', 'usage_limit', 'model_unavailable', 'timeout', 'invalid_output', 'runner_failed', 'worker_shutdown']);
const holdCodes = new Set(['auth_required', 'usage_limit', 'model_unavailable', 'worker_shutdown']);
const hash = value => createHash('sha256').update(value).digest('hex');
export class BrokerError extends Error {
  constructor(code) { super(code); this.name = 'BrokerError'; this.code = code; }
}
const reject = code => { throw new BrokerError(code); };
const id = value => { if (typeof value !== 'string' || !/^[A-Za-z0-9_-]{1,128}$/.test(value)) reject('invalid_request'); return value; };
const plain = value => value !== null && typeof value === 'object' && !Array.isArray(value) &&
  [Object.prototype, null].includes(Object.getPrototypeOf(value));

// Stable JSON provides content identity; reject non-JSON values and excessive nesting.
function canonical(value, code = 'invalid_request') {
  let nodes = 0;
  const visit = (v, depth) => {
    if (++nodes > 30000 || depth > 32) reject(code);
    if (v === null || typeof v === 'string' || typeof v === 'boolean') return v;
    if (typeof v === 'number' && Number.isFinite(v)) return v;
    if (Array.isArray(v)) return v.map(item => visit(item, depth + 1));
    if (!plain(v)) reject(code);
    const out = Object.create(null);
    for (const key of Object.keys(v).sort()) out[key] = visit(v[key], depth + 1);
    return out;
  };
  let encoded;
  try { encoded = JSON.stringify(visit(value, 0)); } catch (error) { if (error instanceof BrokerError) throw error; reject(code); }
  if (Buffer.byteLength(encoded) > MAX_BYTES) reject('payload_too_large');
  return encoded;
}

const enqueueScript = `-- generation-enqueue-v1
local raw = redis.call('HGET', KEYS[1], ARGV[1])
if raw then
  local j = cjson.decode(raw)
  if j.fingerprint ~= ARGV[2] then return 'job_conflict' end
  return raw
end
if redis.call('ZCARD', KEYS[2]) >= tonumber(ARGV[4]) then return 'queue_full' end
redis.call('HSET', KEYS[1], ARGV[1], ARGV[3])
redis.call('ZADD', KEYS[2], ARGV[5], ARGV[1])
return ARGV[3]`;

const claimScript = `-- generation-claim-v1
local now = tonumber(ARGV[1]); local allowed = cjson.decode(ARGV[5])
local candidates = redis.call('ZRANGEBYSCORE', KEYS[2], '-inf', now)
for _, jid in ipairs(candidates) do
  local raw = redis.call('HGET', KEYS[1], jid)
  if raw then
    local j = cjson.decode(raw)
    if allowed[j.agent] and (j.status == 'pending' or j.status == 'leased') then
      if (j.leaseExpiresAt or 0) <= now and (j.retryAt or 0) <= now then
        j.status = 'leased'; j.workerId = ARGV[3]; j.leaseToken = ARGV[4]
        j.leaseExpiresAt = now + tonumber(ARGV[2]); j.claims = (j.claims or 0) + 1
        redis.call('HSET', KEYS[1], jid, cjson.encode(j))
        redis.call('ZADD', KEYS[2], j.leaseExpiresAt, jid)
        return cjson.encode(j)
      end
    end
  end
end
return false`;

const heartbeatScript = `-- generation-heartbeat-v1
local raw = redis.call('HGET', KEYS[1], ARGV[1]); if not raw then return false end
local j = cjson.decode(raw); local now = tonumber(ARGV[4])
if j.status ~= 'leased' or j.workerId ~= ARGV[2] or j.leaseToken ~= ARGV[3] or j.leaseExpiresAt <= now then return false end
j.leaseExpiresAt = now + tonumber(ARGV[5])
redis.call('HSET', KEYS[1], ARGV[1], cjson.encode(j)); redis.call('ZADD', KEYS[2], j.leaseExpiresAt, ARGV[1])
return tostring(j.leaseExpiresAt)`;

const completeScript = `-- generation-complete-v1
local raw = redis.call('HGET', KEYS[1], ARGV[1]); if not raw then return 0 end
local j = cjson.decode(raw); local now = tonumber(ARGV[4])
if j.status == 'completed' and j.workerId == ARGV[2] and j.leaseToken == ARGV[3] and j.resultHash == ARGV[6] then return 1 end
if j.status ~= 'leased' or j.workerId ~= ARGV[2] or j.leaseToken ~= ARGV[3] or j.leaseExpiresAt <= now then return 0 end
j.status = 'completed'; j.resultJson = ARGV[5]; j.resultHash = ARGV[6]; j.model = ARGV[7]; j.reasoningEffort = ARGV[8]
j.finishedAt = now; j.leaseExpiresAt = nil; j.code = nil
redis.call('HSET', KEYS[1], ARGV[1], cjson.encode(j)); redis.call('ZREM', KEYS[2], ARGV[1])
return 1`;

const failScript = `-- generation-fail-v1
local raw = redis.call('HGET', KEYS[1], ARGV[1]); if not raw then return 0 end
local j = cjson.decode(raw); local now = tonumber(ARGV[4])
if j.lastFailureToken == ARGV[3] and j.lastFailureWorker == ARGV[2] and j.lastFailureCode == ARGV[5] and j.lastFailureRetryable == ARGV[6] then return 1 end
if j.status ~= 'leased' or j.workerId ~= ARGV[2] or j.leaseToken ~= ARGV[3] or j.leaseExpiresAt <= now then return 0 end
j.lastFailureToken = ARGV[3]; j.lastFailureWorker = ARGV[2]; j.lastFailureCode = ARGV[5]; j.lastFailureRetryable = ARGV[6]
j.code = ARGV[5]; j.workerId = nil; j.leaseToken = nil; j.leaseExpiresAt = nil
local hold = ARGV[7] == '1'
if not hold then j.failures = (j.failures or 0) + 1 end
if hold or (ARGV[6] == '1' and j.failures < tonumber(ARGV[8])) then
  j.status = 'pending'
  local delay = hold and 60000 or math.min(60000, 5000 * 2 ^ math.max(0, j.failures - 1))
  j.retryAt = now + delay; redis.call('ZADD', KEYS[2], j.retryAt, ARGV[1])
else
  j.status = 'failed'; j.finishedAt = now; redis.call('ZREM', KEYS[2], ARGV[1])
end
redis.call('HSET', KEYS[1], ARGV[1], cjson.encode(j)); return 1`;

/** Durable generic generation queue. No Redis key has a TTL or contains raw Slack IDs. */
export function createRedisGenerationBroker(client, options) {
  const { namespace, leaseMs = 180000, maxPending = 100, maxAttempts = 3,
    now = Date.now, validateResult } = options ?? {};
  if (typeof namespace !== 'string' || !/^[A-Za-z0-9:_-]{1,120}$/.test(namespace) ||
    !Number.isSafeInteger(leaseMs) || leaseMs < 1000 || leaseMs > 3600000 ||
    !Number.isSafeInteger(maxPending) || maxPending < 1 || maxPending > 1000 ||
    !Number.isSafeInteger(maxAttempts) || maxAttempts < 1 || maxAttempts > 10 ||
    typeof now !== 'function' || (validateResult !== undefined && typeof validateResult !== 'function')) reject('invalid_request');
  const keys = [`{${namespace}}:jobs`, `{${namespace}}:pending`];
  const ajv = new Ajv({ strict: true, allErrors: false, ownProperties: true, coerceTypes: false,
    useDefaults: false, removeAdditional: false });
  const validators = new Map();
  const timestamp = () => { const time = now(); if (!Number.isSafeInteger(time) || time < 0) reject('invalid_request'); return time; };
  const exec = async (script, args) => {
    try { return await client.eval(script, { keys, arguments: args.map(String) }); }
    catch { throw new BrokerError('unavailable'); }
  };
  const read = async jobId => {
    id(jobId);
    try { const raw = await client.hGet(keys[0], jobId); return raw ? JSON.parse(raw) : null; }
    catch { throw new BrokerError('unavailable'); }
  };
  const visibleStatus = j => j ? {
    status: j.status === 'leased' && j.leaseExpiresAt <= timestamp() ? 'pending' : j.status,
    ...(j.resultJson !== undefined ? { result: JSON.parse(j.resultJson) } : {}), ...(j.code ? { code: j.code } : {}),
  } : null;
  const validator = schemaJson => {
    const fingerprint = hash(schemaJson);
    let validate = validators.get(fingerprint);
    if (!validate) {
      try {
        const schema = JSON.parse(schemaJson);
        if (!plain(schema) || schema.$async) reject('invalid_request');
        validate = ajv.compile(schema);
      } catch { reject('invalid_request'); }
      if (validators.size >= 100) validators.clear();
      validators.set(fingerprint, validate);
    }
    return validate;
  };
  const owner = input => {
    if (!plain(input)) reject('invalid_request');
    id(input.jobId); id(input.workerId); id(input.leaseToken);
  };
  return {
    async enqueue(input) {
      if (!plain(input)) reject('invalid_request');
      id(input.jobId);
      if (!agents.has(input.agent) || typeof input.system !== 'string' || !input.system.trim() || input.system.length > 32000 ||
        typeof input.input !== 'string' || !input.input.trim() || input.input.length > 128000 || !plain(input.outputSchema)) reject('invalid_request');
      const schemaJson = canonical(input.outputSchema);
      if (Buffer.byteLength(schemaJson) > 32768) reject('payload_too_large');
      validator(schemaJson);
      const stable = canonical({ agent: input.agent, system: input.system, input: input.input, outputSchema: input.outputSchema });
      const time = timestamp();
      const job = { version: 1, jobId: input.jobId, agent: input.agent, system: input.system, input: input.input,
        outputSchemaJson: schemaJson, fingerprint: hash(stable), status: 'pending', failures: 0, claims: 0, createdAt: time, retryAt: time };
      const raw = await exec(enqueueScript, [input.jobId, job.fingerprint, JSON.stringify(job), maxPending, time]);
      if (raw === 'job_conflict' || raw === 'queue_full') reject(raw);
      return visibleStatus(JSON.parse(String(raw)));
    },
    async status(jobId) { return visibleStatus(await read(jobId)); },
    async claim(input) {
      if (!plain(input)) reject('invalid_request'); id(input.workerId);
      if (!Array.isArray(input.agents) || input.agents.length < 1 || input.agents.length > 2 ||
        new Set(input.agents).size !== input.agents.length || input.agents.some(agent => !agents.has(agent))) reject('invalid_request');
      const raw = await exec(claimScript, [timestamp(), leaseMs, input.workerId, randomUUID(),
        JSON.stringify(Object.fromEntries(input.agents.map(agent => [agent, true])))]);
      if (!raw) return null;
      const j = JSON.parse(String(raw));
      return { version: 1, jobId: j.jobId, agent: j.agent, system: j.system, input: j.input,
        outputSchema: JSON.parse(j.outputSchemaJson), leaseToken: j.leaseToken, leaseExpiresAt: j.leaseExpiresAt };
    },
    async heartbeat(input) {
      owner(input);
      const expiry = await exec(heartbeatScript, [input.jobId, input.workerId, input.leaseToken, timestamp(), leaseMs]);
      if (!expiry) reject('lease_lost');
      return { ok: true, leaseExpiresAt: Number(expiry) };
    },
    async complete(input) {
      owner(input);
      if (!plain(input.result) || typeof input.model !== 'string' || !/^[A-Za-z0-9_./:-]{1,100}$/.test(input.model) ||
        typeof input.reasoningEffort !== 'string' || !/^[a-z]{1,20}$/.test(input.reasoningEffort)) reject('invalid_request');
      const job = await read(input.jobId); if (!job) reject('lease_lost');
      // Reject stale authority before validating a potentially large result.
      if (job.workerId !== input.workerId || job.leaseToken !== input.leaseToken ||
        !['leased', 'completed'].includes(job.status) || (job.status === 'leased' && job.leaseExpiresAt <= timestamp())) reject('lease_lost');
      const resultJson = canonical(input.result, 'invalid_result');
      let valid;
      try {
        valid = validator(job.outputSchemaJson)(JSON.parse(resultJson));
        if (valid && validateResult) await validateResult({ agent: job.agent, result: JSON.parse(resultJson) });
      } catch { reject('invalid_result'); }
      if (!valid) reject('invalid_result');
      if (!Number(await exec(completeScript, [input.jobId, input.workerId, input.leaseToken, timestamp(),
        resultJson, hash(resultJson), input.model, input.reasoningEffort]))) reject('lease_lost');
      return { ok: true };
    },
    async fail(input) {
      owner(input);
      if (!failureCodes.has(input.code) || typeof input.retryable !== 'boolean') reject('invalid_request');
      if (!Number(await exec(failScript, [input.jobId, input.workerId, input.leaseToken, timestamp(), input.code,
        input.retryable ? 1 : 0, holdCodes.has(input.code) ? 1 : 0, maxAttempts]))) reject('lease_lost');
      return { ok: true };
    },
  };
}
