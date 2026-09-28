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
- `vercel-deploy`: deploy a full SHA reachable from `codex/diretor-integracao`
  to the fixed `ganesha-classroom` production project. Git fetch/archive occurs
  in this package's ignored runtime, never in the host checkout. Symlinks,
  submodules, unsafe Windows paths and environment files are rejected. The
  Vercel build runs remotely. Successful deployment requires both classroom
  language routes and sampled assets to return HTTP 200. The public production
  alias must be bound to this exact project and deployment ID; unique-URL SSO
  protection remains enabled.

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
