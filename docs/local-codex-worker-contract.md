# Local Codex generation contract

Owner-authorized implementation, 2026-09-28. Vercel authenticates Slack requests,
retains jobs in Redis, validates generated data, publishes pages, and replies in
the originating thread. A single Windows worker polls outbound HTTPS and runs
Codex with ChatGPT authentication. There is no automatic paid API fallback.

## Ownership

- DevOps chat: `ganesha/`, HTTP routes, workflows, deployment, Slack verification.
- Landing Pages chat: `review/local-generation-broker/`, Redis broker and tests.
- Pro/local-worker chat: this contract and `review/local-codex-worker/`, CLI runner,
  local authentication and worker verification. No overlapping host edits.

## HTTP protocol, version 1

All routes are POST under `/api/local-worker/`, require
`Authorization: Bearer <LOCAL_WORKER_TOKEN>` and JSON, reject redirects, and return
`Cache-Control: no-store`. The host authenticates before any Redis access. The
token is a random minimum 32-byte secret and is never a Codex/OAuth credential.
No credentials or raw prompts appear in logs. Payload limit: 256 KiB.

- `claim`: request `{workerId, agents:["landing-pages","devops"]}`. Response
  `{job:null}` or `{job:{version:1, jobId, agent, system, input, outputSchema,
  leaseToken, leaseExpiresAt}}`. `system` and `input` are bounded strings;
  `outputSchema` is the trusted host's JSON Schema. `jobId` is an opaque string
  containing only ASCII letters, numbers, `_` and `-`, length 1..128. It must not
  contain raw Slack IDs or text. `leaseToken` is an opaque random string.
- `heartbeat`: request `{workerId, jobId, leaseToken}`; response
  `{ok:true, leaseExpiresAt}`. Default lease: 180 seconds, renewed every 30 seconds.
- `complete`: request `{workerId, jobId, leaseToken, result, model, reasoningEffort}`;
  response `{ok:true}`. `result` is a JSON object. The host validates against the
  job schema and domain validator before accepting it. Completion retries with
  the same lease/result are idempotent. Conflicting/stale writes return HTTP 409.
- `fail`: request `{workerId, jobId, leaseToken, code, retryable}`; response
  `{ok:true}`. No free-text error or prompt is accepted. Codes: `auth_required`,
  `usage_limit`, `model_unavailable`, `timeout`, `invalid_output`,
  `runner_failed`, `worker_shutdown`. Authentication, account limits, and model
  access failures release the job for later retry without exhausting generation
  attempts and tell the worker to stop. Other failures have a bounded retry
  policy. `worker_shutdown` is retryable without spending an attempt.

Errors use `{error:{code}}`: 401 `unauthorized`, 400 `invalid_request`, 409
`lease_lost`, 413 `payload_too_large`, 422 `invalid_result`, 503
`unavailable` or `backend_disabled`. The worker aborts a running generation on
lease loss and retains no authority to complete it afterward. Transient HTTP
failures are retried with bounded backoff; acknowledgements can be retried with
the same lease. The worker does not claim new jobs after account/auth failures.

## Broker interface

Package name `@ganesha/local-generation-broker`, ESM, Node Redis compatible.
Export `createRedisGenerationBroker(client, {namespace, leaseMs?, validateResult?,
now?, maxPending?, maxAttempts?})` returning:

- `enqueue({jobId, agent, system, input, outputSchema})`: idempotently insert a
  pending job; reject reuse with different content, return the current status.
- `status(jobId)`: return null or `{status, result?, code?}` where status is
  `pending`, `leased`, `completed`, or `failed`.
- `claim({workerId, agents})`: return a job or null using atomic claim/fencing.
- `heartbeat({workerId, jobId, leaseToken})`: renew or throw `lease_lost`.
- `complete({workerId, jobId, leaseToken, result, model, reasoningEffort})`.
- `fail({workerId, jobId, leaseToken, code, retryable})`.

The package may export validators and safe typed errors. Job IDs derive from
request identity + agent + generation version, hashed by the host. Pending jobs
and results needed by workflows cannot expire while the worker is offline.
Expired leases return to claimable state. Thread ordering remains enforced by
the existing domain queue. Fencing prevents duplicate publication. Use a bounded
request size and queue size; keep rejected work explicit.

`validateResult({agent,result})` is a host-supplied domain validation callback,
in addition to generic JSON Schema validation. `now` allows controlled-clock
tests. Defaults are 100 pending jobs and three generation attempts. Conflicting
enqueue content throws `job_conflict` (host maps to HTTP 409); a full queue throws
`queue_full` (host maps to HTTP 503/unavailable).

## Host integration

`GENERATION_BACKEND=local-codex` selects the broker. `gateway` explicitly selects
the previous provider. A pending generation must release the domain execution
lease without consuming a failed model attempt; durable workflows sleep and
check again. Do not hold a Vercel function open for a local worker. Maintain the
existing job snapshot on retries so the broker's idempotency key has one input.
Extend DevOps to a durable queued reply before routing it to this worker.

Landing Pages returns the existing `generationSchema`. DevOps returns an object
`{text:string}` with a sensible maximum length. The host determines schemas and
prompts; Slack input never selects shell flags, model, filesystem paths or tools.

## Local runtime

Node.js 24, one job at a time. Model `gpt-6-astra`, reasoning `xhigh`, selected by
local operator configuration only. Run Codex in an isolated empty working
directory, read-only sandbox, no approvals, shell/browser/plugins/MCP/subagents
disabled, with API-key environment variables removed. Use the saved ChatGPT
login; never send it to Vercel. Structured output is validated again by the host.
Raw CLI output is not logged. Local timeout initially 15 minutes with renewable
leases. Kill the child process on lease loss or shutdown. The worker polls every
five seconds while idle and backs off during service errors.

Activation requires a successful local Astra smoke test, offline failure tests,
broker Redis tests, host tests/build, then a real Slack brief yielding a verified
public URL and same-thread reply. Check an offline/restart cycle and stable-URL
revision before claiming recovery. Initial startup is manual; startup scheduling
can follow only after the flow is verified.
