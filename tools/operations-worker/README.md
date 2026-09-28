# Ganesha operations worker

Deterministic GitHub and Vercel actions for verified Gdevops requests. This is a
separate process from the data-only Codex generation worker. It does not invoke a
model, accept shell text, merge PRs, change billing, delete resources, or operate
on arbitrary repositories/projects.

Supported inputs are validated again locally:

- `github-status`: resolve a ref in `draeden79/ganesha`, then report checks for
  the resolved full SHA.
- `github-pr`: create a draft from existing `head`/`base` branches with a supplied
  bounded title. Existing matching PRs are reused; no branch push or merge.
- `vercel-status`: read recent deployments for the fixed `classroom` or `devops`
  project.
- `dns-check`: diagnose only `iganesha.online` and its `www` hostname. Compare
  Vercel configuration/records/assignments and scoped certificate metadata with
  Google/Cloudflare DNS-over-HTTPS. Partial failures are
  explicit. It neither changes DNS nor disables TLS validation. A successful
  diagnostic result means observations were collected, not that DNS was repaired
  or the website is reachable. Known certificate IDs can change on renewal;
  stored metadata is not proof of the certificate currently served. The latest
  completed repository workflow named `Public domain diagnostic` is linked as
  historical external evidence when available.
  Local domain DNS, HTTP, TLS and Wi-Fi probes are disabled in production at
  the owner's request. Unit-tested local probe helpers are dormant; enabling
  them requires a separate authorized code change. No OS DNS, hosts, TLS trust
  or Gateway policy changes are performed.
- `vercel-deploy`: deploy a full SHA reachable from `codex/classroom-paywall`
  to the fixed `ganesha-classroom` production project. Git fetch/archive occurs
  in this package's ignored runtime, never in the host checkout. Symlinks,
  submodules, unsafe Windows paths and environment files are rejected. The
  Vercel build runs remotely. Before an upload or a resumed job proceeds, the
  candidate must descend from secure commit
  `740dc94c2d5b74108d905d203a0e90306329cfb9` and match the reviewed code/config
  blob hashes in `src/classroom-release.json`. The manifest lives in this worker;
  candidate repositories cannot update their own approval. This pins the origin
  proxy, token verifier, authorized course loaders, route entry points, build
  configuration and their executable dependencies. Missing, modified or additional
  executable paths and archive attribute files fail closed. Content-only updates
  remain possible. Each upload extracts into a fresh directory to prevent stale
  files from previous attempts surviving.
  The public production alias must be bound to this exact project and deployment
  ID. Eleven anonymous checks require pages, legacy routes, RSC and exercises to
  return HTTP 303 to exactly `https://www.iganesha.online/checkout`, and APIs to
  return 401; all must use `Cache-Control: no-store`. Redirects are not followed.
  Public lesson HTML, Vercel SSO and incorrect checkout destinations fail the
  health check. This verifies anonymous access protection; authenticated purchase,
  lesson access and email delivery are separate checks. Unique-URL SSO protection
  remains enabled.

### Updating the classroom release policy

The secure release baseline was reviewed in the coordinated deployment chat.
It combines the payment guard with the published v0.3.0 curriculum (12 lessons,
120 steps, 11 languages); both the earlier secure baseline `3264654` and published
product release `7c7be20` are ancestors. The four-lesson protected release is no
longer an eligible deployment candidate. Token verification, origin proxy and
route guards retain their reviewed behavior, and both production loaders authorize
access before reading or serializing curriculum data. Offline QA fixtures use the
shared data adapter without being imported by production route code.
Keep content changes on `codex/classroom-paywall`. When executable classroom code
or build settings change, review the resulting access controls and rerun origin
authorization tests before updating this worker's pinned blob manifest. Do not
relax the hashes or return to anonymous HTTP 200 merely to make an older product
branch deploy. An old deployment checkpoint must pass the same policy again.

Refresh the running worker only after all package tests pass and a read-only
Redis check confirms both zero running operations and an empty operations queue.
Verify the PID against `.runtime/worker.lock` and its exact command line, recheck
idle state immediately before stopping that PID, then restart from this package
with the same environment files. Verify the new PID lock/start log. Do not stop
the independent generation worker, delete Redis jobs or clear checkpoints. If
work is active or Redis cannot be checked, wait rather than restarting blindly.

## Setup

Use the normal Windows user with existing GitHub CLI and Vercel CLI login.
Node.js 24, Git, `gh`, `tar`, the cached Vercel CLI, host dependencies, and the
host's ignored `.env.production.local` (`REDIS_URL`) are required.

Copy `.env.example` to ignored `.env.local`, set the classroom project ID supplied
by the host owner, and enable only after host intake/store/outbox are deployed.
The fixed team and scope are validated. If several Vercel CLI caches exist, set
the exact installed `OPERATIONS_VERCEL_CLI` path. No package download occurs on
worker startup.

```powershell
npm test
npm start
```

Do not start another instance in a copied directory. The PID lock protects this
runtime. Startup is manual; keep the PC awake. Stop with Ctrl+C. A stopped or
crashed worker leaves durable work/checkpoints for a later claim after lease
expiry. The Codex generation worker remains independent and should stay running.

## Recovery and credentials

The worker claims from `createOperationsStore` in the host, using the Redis
namespace `ganesha:operations:production`. Leases last 180 seconds and renew
every 30 seconds. Checkpoints and completion are fenced by the lease token.
Loss of the lease aborts local commands; it cannot cancel a deployment already
accepted by Vercel.

Before creation, the worker stores an intent checkpoint. PR bodies contain a
job marker. Deployments contain `ganeshaOperation` and `ganeshaSha` metadata;
deployment ID and URL are persisted before polling/verification. Recovery finds
these remote records instead of making another mutation. An uncertain creation
with no matching remote record stops with an explicit result requiring review.
This is not a distributed exactly-once guarantee.

Child processes use argument arrays with `shell:false`, hidden Windows windows,
bounded captured output and an OS-environment allowlist. Redis/worker/model/API
environment credentials do not reach child processes. `gh` and Vercel use their
existing local credential stores. Tokens, full requests and raw CLI output are
never logged. Runtime archives, body files, logs and PID locks stay out of Git.

The host owns sender authorization, intake syntax, queue/outbox delivery,
project configuration, deployment activation and Slack replies. Worker tests
use fake command/API implementations and create no real PR or deployment.
