# Ganesha local Codex worker

Runs the model-generation portion of Ganesha on the owner's Windows computer.
Vercel retains Slack authentication, request history, deterministic page
rendering/publication and delivery. The worker polls outbound HTTPS and has no
listening port. One job runs at a time using local Codex with ChatGPT sign-in.
The target is GPT-6 Astra with extra-high reasoning. Access and usage remain
subject to the signed-in account. No API fallback or purchase occurs.

## Setup and run

Requires Node.js 24 and the installed Codex CLI. Run from this directory in the
normal Windows user's PowerShell session. The Codex app's restricted shell can
report no login even when the normal user is authenticated.

```powershell
codex -c 'cli_auth_credentials_store="file"' login status
# If needed, authenticate with your own account:
codex login
npm test
npm run smoke
# After the host owner supplies .env.local securely:
npm start
```

The host owner writes `GANESHA_ORIGIN` and a random 32-byte
`LOCAL_WORKER_TOKEN` into ignored `.env.local`, matching the encrypted Vercel
configuration. `.env.example` documents optional settings. Never paste the
worker token or Codex credentials into Slack, chat, Git, or logs. Codex OAuth
stays in the existing local credential store. The worker strips API keys,
worker secrets and parent Codex transport variables from the child environment.

`npm run smoke` makes one real subscription-backed generation request. It is
separate from automated tests. `node src/smoke.mjs --check-tools` also checks
that the restricted worker resists a request to access local tools. Tests use
fake providers and never consume model usage.

## Behavior

- Codex runs in an empty per-job directory with user configuration, inherited
  project instructions, shell, browser, plugins, apps, MCP configuration,
  subagents and approvals disabled. Read-only sandbox remains enabled.
- Prompts go through stdin, never shell interpolation or command-line arguments.
  Job data never selects executable, model, CLI flags, filesystem path or tools.
- Output is a JSON object. The host validates its schema and domain facts before
  publication. Generated content is not executed as code.
- A 180-second lease is renewed every 30 seconds; a run may take up to 15 minutes.
  Lease loss aborts generation. Ambiguous completion is retried with the same
  lease; the process stops if acknowledgement cannot be confirmed.
- Auth, model-access and usage-limit errors preserve the queued request and stop
  this worker for operator attention. No silent downgrade or API fallback.
- A stopped/offline PC leaves queued work on the host. Existing page URLs remain
  served by Vercel. Keep the PC awake while accepting local generation work.
- Ctrl+C stops the current run and releases it for recovery when the host is
  reachable. Restart with `npm start`. A PID lock prevents ordinary duplicate
  launches. Startup is manual until the end-to-end deployment is verified.
- Logs contain event names, opaque job IDs and selected model only. Per-job schema
  and result files are removed after the run; `.runtime/` is ignored by Git.

The API and ownership agreement are in `../../docs/local-codex-worker-contract.md`.
This package is not activated merely by passing the smoke test. Activation also
requires host integration, a real Slack brief producing a verified public page
and same-thread reply, a revision, and offline/restart recovery verification.
