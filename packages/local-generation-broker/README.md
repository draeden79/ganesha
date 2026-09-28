# Local generation broker

Isolated review package for the owner-authorized Windows Codex worker. Copy into `ganesha/packages/local-generation-broker` and depend on `@ganesha/local-generation-broker: file:packages/local-generation-broker`. Node.js 24, ESM, Redis 6 compatible. Keep generated `node_modules` and environment files out of the host copy.

The interface follows `docs/local-codex-worker-contract.md` in the workspace. `enqueue()` returns the same `{status, result?, code?}` shape as `status()`. Timestamps are epoch milliseconds. The host provides stable opaque job IDs hashed from the request identity, agent and generation version; reuse with different input fails explicitly. Pending and completed records have no TTL. Publication and Slack delivery remain the host's responsibility.

The factory requires a validated namespace and accepts `leaseMs` (180,000 default), `maxPending` (100 default, up to 1,000), `maxAttempts` (3 default), an optional `now` clock for tests, and `validateResult: ({agent,result}) => void | Promise<void>`. The host **must** supply its domain validation callback: Landing Pages uses `validateGeneration`; DevOps validates its bounded text object. The broker always validates JSON Schema using Ajv before this callback. It accepts trusted, synchronous draft-07 schemas, rejecting unsupported schemas rather than silently weakening validation. It never fetches schema URLs.

Use one production namespace, such as `ganesha:generation:production`, for both agents. Records live in one Redis hash and an active-job sorted set sharing a cluster hash slot. Lua makes enqueue, claim, heartbeat, completion and failure atomic. Expired leases can be reclaimed with a new token; old workers cannot commit or extend them. Completed acknowledgements with the same worker, lease and result are idempotent. Output and schemas are retained as JSON strings inside records, preserving empty arrays through Lua's cjson serialization.

`auth_required`, `usage_limit`, `model_unavailable` and `worker_shutdown` release work for a retry after 60 seconds without consuming the failure budget, even if a caller supplies `retryable:false`. The worker should stop on account/auth/model errors. Other retryable failures back off 5, 10, then at most 60 seconds, and become terminal at the configured attempt limit. A non-retryable execution/output failure is immediately terminal. Lease expiry itself does not consume this budget, preserving work across crashes and offline periods. Only an explicit failed execution spends an attempt.

The active queue limit includes pending and leased work; completed and failed records do not occupy it. Terminal records are retained for the consuming workflow and operator review, so retention/backups require an explicit operational policy. An expired lease is reported as `pending` by `status()` and reclaimed atomically by `claim()`.

Safe `BrokerError.code` values: `invalid_request`, `payload_too_large`, `job_conflict`, `queue_full`, `lease_lost`, `invalid_result`, `unavailable`. Host HTTP mapping: bad input 400, oversized payload 413, idempotency conflict or lost lease 409, invalid output 422, queue full or storage failure 503. Never log prompts, tokens, Redis errors or invalid model output. The broker sanitizes storage exceptions.

Host integration requirements:

1. Authenticate the worker before Redis access; bound the HTTP body to 256 KiB.
2. Preserve the domain request snapshot and ordering. Polling a pending broker job releases the domain lease without consuming a model attempt. Do not hold a serverless request open waiting for a PC.
3. Explicitly select `local-codex`; no implicit AI Gateway fallback.
4. Revalidate results with the domain validator and use the existing atomic page/reply publication path.
5. Use durable Redis with eviction disabled. Namespace separation is mandatory for tests and previews.

Run `npm test` for fake-client validation and policy tests. Set `REDIS_TEST_URL`, or explicitly opt in with `GANESHA_RUN_REDIS_TESTS=1` and `REDIS_URL`, for real Lua/concurrency tests. Those tests create and remove only two exact random test key pairs. They never call a model and never clear a shared database.
