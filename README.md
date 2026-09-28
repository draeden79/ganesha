# Ganesha Slack prototype

One Slack app, two agents, hosted in the existing Vercel project `ganesha-devops`. English is the default for replies and pages. The owner selected a **noncommercial prototype** on Vercel Hobby. Commercial operation requires a suitable hosting plan; no upgrade or paid resource purchase is authorized by this configuration.

The owner requested separate **Gdevops** and **Glandingpage** Slack identities. The implementation is prepared behind `SLACK_DEDICATED_IDENTITIES`; installation and live acceptance are pending. The [agent behavior guide](docs/agents.md) states the communication contract and activation status. Its migration-pending version is [published in #management](https://ganeshagrupo.slack.com/archives/C0C56JD9G20/p1790625234632229).

## Using the agents

| Surface | Behavior |
| --- | --- |
| `#devops` | Mention **@Ganesha** with an infrastructure request. DevOps gathers requirements and prepares a plan, validation steps and rollback. |
| `#landing-pages` | Mention **@Ganesha** with the course subject, audience, learning outcome and curriculum. Landing Pages asks for missing facts or publishes a branded demo page and replies in the original thread. |
| New DM | Start with `devops:` or `landing-pages:`. Without a selection, Ganesha asks which agent you need. |
| Existing thread | Replies remain with the original agent; another agent needs a new thread. |

DevOps **plans and advises**. It has no infrastructure execution, shell, repository writing, ticketing or live inspection tools. An approval message does not execute a change. Commands: `help`, `status`, `stop` (Portuguese aliases `ajuda`, `encerrar`, `parar` also work). Stop clears the bot's DevOps context and subscription, while retaining the thread's agent assignment and original Slack messages.

Landing Pages uses the approved Ganesha template and illustration. Its model produces validated data, never executable code. Same-thread revisions retain the URL and a failed generation preserves the previously published page. Every page identifies itself as a noncommercial demonstration. There are no payments, enrollment capture or invented offer details.

## Runtime and permissions

- Vercel Connect forwards verified Slack events to `/api/webhooks/slack`. The gateway verifies the production project's OIDC token, workspace, app identity when present, sender, channel, thread assignment and quota before dispatch.
- Only configured public channels and DMs are supported. External shared channels are rejected. Self messages and unapproved bots are ignored. Explicitly allowlisted external bot users can submit Landing Pages briefs only when mentioning Ganesha.
- The manifest, connector defaults and runtime token requests specify seven scopes: `app_mentions:read`, `chat:write`, `channels:history`, `channels:read`, `im:history`, `im:read`, `users:read`. Events: `app_mention`, `message.channels`, `message.im`.
- The existing installed token retains the broader 24-scope grant from assisted setup, including file, private-channel history and additional messaging permissions. The owner explicitly accepted retaining that grant. Requesting seven scopes does not reduce an already-issued Slack token's permissions; the gateway still restricts processing to the configured channels and DMs. Replacing the existing grant would require revocation and reinstall.
- Link `slack/ganesha` only to this project's **production** environment.
- Requests are processed through Vercel AI Gateway and its model provider. Common credential patterns are redacted before model use or workflow persistence; this is not a comprehensive secret detector. Never paste secrets into Slack. Content intended for a public page must be suitable for publication.
- Default model: `openai/gpt-5-nano`, verified accessible with the team's current free credits. GPT-5.4 Mini returned a model-access restriction on this tier. Default workspace quota: 40 requests per UTC day and ten seconds between model requests by one user. Duplicate events and workflow-start retries share the original quota charge. Commands do not consume model quota. This is a request cap, not a dollar budget; provider allowances still apply.

DevOps uses Chat SDK's Redis-backed subscriptions, queue/locks and bounded conversation history (12 turns, default 30-day thread-state TTL). Its advisory replies may be interrupted by function termination; no infrastructure changes are performed. DM roots are normalized after gateway verification so unrelated DM threads do not share context.

Landing Pages awaits a durable Vercel Workflow start **before acknowledging Slack**. Redis provides per-thread ordered jobs, expiring worker leases, stale-worker fencing, atomic publication and a persistent notification outbox. Page revisions, live pointers, agent assignments and durable job records have no conversation TTL. Configure Redis durability and disable eviction. Model attempts retry up to three times; notification delivery retries separately up to eight times. The workflow has a bounded recovery window; exhausted work needs operator review/resubmission. Delivery is at least once: a crash after Slack accepts a reply can repeat that reply without creating another page revision.

## Deploy and operate

1. Use Node.js 24 and the checked-in Next.js/Workflow configuration. Enable Vercel system environment variables and Fluid Compute; Workflow steps need at least 180 seconds (the prototype plan supports 300 seconds).
2. Provision durable Redis and connect `REDIS_URL`. This prototype uses free Upstash in `iad1`, with automatic upgrades, production pack and eviction disabled.
3. Configure the identifiers and model settings in `.env.example`. Configure only verified Slack channel/user IDs. Bind Connect's production trigger to `/api/webhooks/slack`.
4. Use the existing owner-approved Slack installation and add it to the two channels. Keep connector defaults and the Slack manifest synchronized with the seven runtime scopes. For a fresh installation, request those seven scopes only.
5. Deploy with `vercel deploy --prod`. `/api/health` reports configuration presence only; it does not prove Slack, model or Workflow connectivity.
6. Verify actual DevOps and course-brief conversations, a clarification round trip, a stable-URL revision, and durable recovery before declaring the agents usable. Monitor the Vercel Workflow dashboard for exhausted runs. Define retention/backups before any commercial migration.

Local checks:

```sh
npm ci
npm test
npm run typecheck
npm run build
npm audit --omit=dev --audit-level=high
```

CI runs the real Redis integration tests against an isolated Redis service. Offline tests use simulated model responses, with no paid API calls. For an authorized real Redis connection, set `REDIS_TEST_URL`, or use the opt-in in `packages/landing-pages/tests/redis.test.mjs`; it creates and cleans only a unique test namespace.

Secrets and production state stay out of Git. Source is at [draeden79/ganesha](https://github.com/draeden79/ganesha). The portable module's [brand contract](packages/landing-pages/docs/design-system.md) and [image provenance](packages/landing-pages/docs/image-provenance.md) record the approved design.

## Verified installation (2026-09-28)

- The production Slack app is installed in Ganesha, with verified event forwarding and membership in [#devops](https://app.slack.com/client/T0C4LM9QGJK/C0C4M9CAPRD) and [#landing-pages](https://app.slack.com/client/T0C4LM9QGJK/C0C56E0BEJY).
- An owner-authorized DevOps request returned a staging plan, validation and rollback in its original thread. Follow-ups work without another mention.
- An incomplete course brief received clarification questions. Its completed brief published [AI Basics for Everyday Work](https://ganesha-devops.vercel.app/courses/course-7e0d08ef76670b2fffbf2458/), and a subsequent title revision preserved that URL and returned a second same-thread publication reply.
- Desktop/mobile layout, mobile navigation, curriculum accordion, public assets and security headers were checked. Redis tests cover duplicate intake, expired leases, stale writes, restart recovery and notification retries. Live workflow persistence, generation retry and Slack delivery also completed.
- External agent bot submissions remain disabled until specific bot user IDs are approved and configured. No live acceptance claim is made for that optional path. DevOps remains advisory; pages remain noncommercial demonstrations.
- The owner subsequently approved requests from all verified humans and bot users in the same workspace. Enable this with `SLACK_ALLOW_WORKSPACE_BOTS=true` during the dedicated-identity rollout; every bot request and follow-up must mention its target. The previous production policy above remains until that rollout is verified.
- Temporary installation diagnostics and their production environment secret were removed. `/api/setup-check` returns 404.

## Separate identity rollout

Reuse the existing `slack/ganesha` app as **Gdevops**. Create **Glandingpage** using [the seven-scope manifest](docs/glandingpage-manifest.json); Vercel Connect supplies its OAuth redirects and event request URL. Attach only to `ganesha-devops` production. Do not authorize broader scopes for the new app.

Configure `SLACK_LANDING_PAGES_CONNECTOR`, `SLACK_LANDING_PAGES_APP_ID` and `SLACK_LANDING_PAGES_BOT_USER_ID` from the new installation, then deploy with `SLACK_DEDICATED_IDENTITIES=true` and `SLACK_ALLOW_WORKSPACE_BOTS=true`. DevOps can retain the legacy `SLACK_CONNECTOR`, `SLACK_APP_ID` and `SLACK_BOT_USER_ID`; the optional `SLACK_DEVOPS_*` variables override them. Set the two Connect production triggers to `/api/webhooks/slack-devops` and `/api/webhooks/slack-landing-pages` respectively.

Each dedicated endpoint requires its exact app ID and processes only its configured public channel and its own DMs. New DMs default to the app's role. The legacy `/api/webhooks/slack` endpoint becomes DevOps-only after activation. Existing Redis namespaces, public thread assignments and course URLs stay unchanged. An old shared-app DM pinned to Landing Pages remains pinned and directs the user to Glandingpage instead of silently changing roles.

Add Glandingpage to `#landing-pages`, verify both human and explicitly mentioned bot requests, same-thread clarification and stable-URL revision, then update the guide with actual app/user IDs and announce activation in its existing management thread. Neither agent automatically delegates work; outgoing mentions are neutralized.

## Local Codex generation

`GENERATION_BACKEND=local-codex` sends generation to the owner's outbound Windows worker using local Codex and its existing ChatGPT authentication. The worker selects GPT-6 Astra with extra-high reasoning; the model still runs through OpenAI. Prompts pass through Vercel and Redis to that PC. OAuth credentials stay on the PC. `gateway` is a separate explicit operator setting; there is no automatic fallback or API-credit purchase.

The [worker runbook](tools/local-codex-worker/README.md) and [HTTP contract](docs/local-codex-worker-contract.md) describe startup. Set the same random 32-byte `LOCAL_WORKER_TOKEN` as a production Secret and in the worker's ignored `.env.local` alongside `GANESHA_ORIGIN=https://ganesha-devops.vercel.app`. Run `npm start` in the worker directory under the signed-in Windows user. Keep the PC awake for prompt responses; startup is manual. Never commit `.env.local`, `.runtime`, or Codex credentials.

The host authenticates requests before accessing the broker, validates schema and domain constraints before accepting generated JSON, and keeps rendering/publication/replies on Vercel. Local jobs use expiring, renewable leases with fenced completion, bounded execution failures, and no expiration while waiting. Account/authentication/model-access errors preserve pending jobs and stop the worker for operator attention. Durable workflows continue polling while the PC is offline, without holding an HTTP request open. A generation snapshot and request ID remain fixed across retries. No remote shell, browsing, cloud administration or arbitrary code execution is exposed through Slack.

Local DevOps uses an ordered thread queue and a durable reply outbox. It imports existing bounded Chat SDK history on first use. `stop` clears context and cancels pending replies; commands remain available without the local model. Replies are at least once: a crash after Slack accepts a post can repeat it. Keep the backend setting fixed for pending work; operator switching mid-conversation requires reviewing queued jobs and context first.

Acceptance of local generation requires real Slack-to-page and DevOps responses, a stable-URL revision, and a worker stop/restart cycle. Unit and real Redis tests pass; consult the activation notice for the current live status.

## References

- [Vercel Connect Slack setup](https://vercel.com/kb/guide/build-a-slack-bot-with-vercel-connect)
- [Chat SDK](https://chat-sdk.dev/docs)
- [Vercel Workflow](https://workflow-sdk.dev/worlds/vercel)
- [Slack app lifecycle and permission changes](https://docs.slack.dev/app-management/distribution/)
- [Vercel Hobby usage policy](https://vercel.com/docs/plans/hobby)
