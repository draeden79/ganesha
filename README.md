# Ganesha Slack prototype

Two Slack apps, **Gdevops** and **Glandingpage**, share the Vercel project `ganesha-devops`. English is the default for replies and pages. The owner selected a **noncommercial prototype** on Vercel Hobby. Commercial operation requires a suitable hosting plan; no upgrade or paid resource purchase is authorized by this configuration.

Both apps are installed and their dedicated production routing is enabled. Generation now uses the owner's local Codex worker with ChatGPT authentication. The [agent behavior guide](docs/agents.md) states the communication contract and verification status; it is [published in #management](https://ganeshagrupo.slack.com/archives/C0C56JD9G20/p1790625234632229).

## Using the agents

| Surface | Behavior |
| --- | --- |
| Any workspace channel, including `#management` and `#devops` | Mention **@Gdevops** with an infrastructure request. Explicit `ops` commands execute supported GitHub/Vercel actions and return verified results in the thread. |
| Any workspace channel, including `#landing-pages` | Mention **@Glandingpage** with the course subject, audience, learning outcome and curriculum. Landing Pages asks for missing facts or publishes a branded demo page and replies in the original thread. |
| New DM | Message the app whose role you need; its identity selects the agent. |
| Existing thread | Replies remain with the original agent; another agent needs a new thread. |

DevOps executes the explicit GitHub/Vercel operations documented in [the guide](docs/agents.md), using a separate local operations worker. Natural-language replies remain guidance; use the returned job receipt and verified result for execution status. Commands: `help`, `status`, `stop` (Portuguese aliases `ajuda`, `encerrar`, `parar` also work). Stop clears the bot's DevOps context and subscription, while retaining the thread's agent assignment and original Slack messages.

Landing Pages uses the approved Ganesha template and illustration. Its model produces validated data, never executable code. Every new publication and revision generates English plus Brazilian Portuguese, Spanish, French, German, Japanese, Hindi, Indonesian, Arabic, Korean and Simplified Chinese. A native language selector switches versions; Arabic uses right-to-left layout. All eleven versions publish together, with English as the default. Same-thread revisions retain the URL and a failed generation preserves the previously published page. Existing English-only pages gain translations on their next revision. See the [localization contract](packages/landing-pages/docs/localization.md). Every page identifies itself as a noncommercial demonstration. Payment integration is a separate test-mode rollout; model-generated copy never configures a price or grants classroom access.

## Runtime and permissions

- Vercel Connect forwards verified events to `/api/webhooks/slack-devops` and `/api/webhooks/slack-landing-pages`. The gateway verifies the production project's OIDC token, workspace, exact app identity, sender, channel, thread assignment and quota before dispatch.
- Both apps accept mentions in any workspace channel where Slack delivers their events, and in DMs; no application channel allowlist applies. External shared channels are rejected. All verified same-workspace humans and bots may request work; bots must explicitly mention the target on every request and follow-up. Self messages and passive bot messages are ignored.
- The manifest, connector defaults and runtime token requests specify seven scopes: `app_mentions:read`, `chat:write`, `channels:history`, `channels:read`, `im:history`, `im:read`, `users:read`. Events: `app_mention`, `message.channels`, `message.im`.
- Gdevops retains the broader 24-scope grant from its original assisted setup, including file, private-channel history and additional messaging permissions. The owner explicitly accepted retaining that grant. Requesting seven scopes does not reduce an already-issued Slack token's permissions. The gateway verifies workspace, app and sender without a channel allowlist. Replacing the existing grant would require revocation and reinstall. Glandingpage was created with exactly the seven approved bot scopes and no user scopes.
- Both `slack/ganesha` (Gdevops) and `slack/glandingpage` are linked only to this project's **production** environment.
- Requests pass through Vercel and Redis to the owner's local Codex worker; inference uses OpenAI through the existing ChatGPT login. Common credential patterns are redacted before model use or workflow persistence; this is not a comprehensive secret detector. Never paste secrets into Slack. Content intended for a public page must be suitable for publication.
- Current local model: GPT-6 Astra with extra-high reasoning. Gateway remains an explicit operator option using `openai/gpt-5-nano`; it is never an automatic fallback. Default workspace model quota: 40 requests per UTC day. There is no per-caller cooldown: rapid legitimate requests queue independently. Duplicate events and workflow-start retries share the original quota charge. Deterministic operations and DNS diagnostics do not consume model quota. Account/model usage limits still apply.

DevOps retains bounded conversation history (12 turns). Local mode uses a durable per-thread FIFO and reply outbox; Gateway mode uses Chat SDK's Redis-backed queue/locks and 30-day thread-state TTL. Existing Chat SDK context is imported when a thread first uses local mode. Explicit operations use their own durable Redis queue and reply workflow; the generation model itself does not execute infrastructure changes. DM roots and agent histories remain isolated.

Landing Pages awaits a durable Vercel Workflow start **before acknowledging Slack**. Redis provides ordered jobs, renewable worker leases, stale-worker fencing, atomic publication and a persistent notification outbox. Page revisions, agent assignments and durable jobs have no conversation TTL. Configure Redis durability and disable eviction. Execution failures have bounded retries; notification delivery retries separately up to eight times. Local workflows continue waiting while the PC is offline, without consuming failed-generation attempts. Exhausted execution or delivery needs operator review. Delivery is at least once: a crash after Slack accepts a reply can repeat it without creating another page revision.

## Deploy and operate

The approved homepage now serves at the domain root. Its US$9.99 checkout is **test mode only**, and remains unavailable until Stripe test credentials, the signed webhook and Resend sender are configured. Unique classroom links require verified payment and are delivered on the confirmation page and by email. The classroom origin and host both enforce access. See [the payment runbook](docs/payments.md) for setup, acceptance and recovery. Future classroom deployments must retain the reviewed payment guards.

1. Use Node.js 24 and the checked-in Next.js/Workflow configuration. Enable Vercel system environment variables and Fluid Compute; Workflow steps need at least 180 seconds (the prototype plan supports 300 seconds).
2. Provision durable Redis and connect `REDIS_URL`. This prototype uses free Upstash in `iad1`, with automatic upgrades, production pack and eviction disabled.
3. Configure `.env.example` with verified IDs. Set the two dedicated production trigger paths and enable `SLACK_DEDICATED_IDENTITIES` and `SLACK_ALLOW_WORKSPACE_BOTS`.
4. Use the existing owner-approved installations. Gdevops is app `A0C4XCWBBQV`, user `U0C567TV76Y`; Glandingpage is app `A0C4MQV1FJT`, user `U0C56SNJD28`. Keep connector defaults and manifests synchronized with the seven runtime scopes.
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

- Cross-channel GitHub execution was verified from `#management`: Gdevops resolved the product commit and created [PR #1](https://github.com/draeden79/ganesha/pull/1), replying in the original thread. A deployment request in `#devops` published classroom commit `2ac2fe859db98687fc4e3acacfbf0c56526452d9`; same-job recovery reused deployment `dpl_AvgdR17fpJvGF1dpWBmPd2xbhaBo` after a CLI response-format fix. Portuguese/Arabic routes and sampled assets returned HTTP 200. The host proxies only `/classroom` paths to the separate service, preserving the existing public course and bot health.
- Working classroom entry: https://iganesha.online/classroom. An [independent GitHub runner](https://github.com/draeden79/ganesha/actions/runs/36487725620) verified public DNS and strict HTTPS for both apex and www, Portuguese and Arabic, returning 200. This computer's Cloudflare Gateway DNS instead returns a block-page address, classifying the new domain under security categories; that local block is separate from Vercel configuration. Incoming-webhook bot identity handling is implemented and tested; a fresh request from Diretor — Produto was requested for live acceptance.

- Both production Slack apps are installed in Ganesha, with verified event forwarding to their own routes: Gdevops in [#devops](https://app.slack.com/client/T0C4LM9QGJK/C0C4M9CAPRD) and Glandingpage in [#landing-pages](https://app.slack.com/client/T0C4LM9QGJK/C0C56E0BEJY).
- An owner-authorized DevOps request returned a staging plan, validation and rollback in its original thread. Follow-ups work without another mention.
- An incomplete course brief received clarification questions. Its completed brief published [AI Basics for Everyday Work](https://ganesha-devops.vercel.app/courses/course-7e0d08ef76670b2fffbf2458/), and a subsequent title revision preserved that URL and returned a second same-thread publication reply.
- Desktop/mobile layout, mobile navigation, curriculum accordion, public assets and security headers were checked. Redis tests cover duplicate intake, expired leases, stale writes, restart recovery and notification retries. Live workflow persistence, generation retry and Slack delivery also completed.
- Each app answered an explicitly mentioned request from the other bot through local GPT-6 Astra, in the original Slack thread. Two passive bot messages produced no replies or generation jobs, and no reply loop occurred.
- A fresh human brief through local Codex published [the acceptance course](https://ganesha-devops.vercel.app/courses/course-9357ee2114d61bb9c795c634/) and returned its URL in the original thread.
- With the worker stopped, a title revision remained pending and unclaimed while the old page stayed online. After restart it completed through Astra, updated the same URL to “AI Basics for Everyday Work — Ready to Practice,” and delivered its reply in the original thread. The worker was left running.
- Temporary installation diagnostics and the restricted four-message acceptance endpoint were removed. `/api/setup-check` and `/api/acceptance/slack` return 404; unauthenticated worker requests return 401.

## Separate identity configuration

The existing `slack/ganesha` app is **Gdevops**. **Glandingpage** uses `slack/glandingpage` and [the seven-scope manifest](docs/glandingpage-manifest.json); Vercel Connect supplies its OAuth redirects and event request URL. Both connectors are attached only to `ganesha-devops` production.

Configure `SLACK_LANDING_PAGES_CONNECTOR`, `SLACK_LANDING_PAGES_APP_ID` and `SLACK_LANDING_PAGES_BOT_USER_ID` from the new installation, then deploy with `SLACK_DEDICATED_IDENTITIES=true` and `SLACK_ALLOW_WORKSPACE_BOTS=true`. DevOps can retain the legacy `SLACK_CONNECTOR`, `SLACK_APP_ID` and `SLACK_BOT_USER_ID`; the optional `SLACK_DEVOPS_*` variables override them. Set the two Connect production triggers to `/api/webhooks/slack-devops` and `/api/webhooks/slack-landing-pages` respectively.

Each dedicated endpoint requires its exact app ID and processes requests in any workspace channel and its own DMs. New DMs default to the app's role. The legacy `/api/webhooks/slack` endpoint becomes DevOps-only after activation. Existing Redis namespaces, public thread assignments and course URLs stay unchanged. An old shared-app DM pinned to Landing Pages remains pinned and directs the user to Glandingpage instead of silently changing roles.

Both apps have verified channel membership and dedicated identities. When changing their configuration, repeat human and explicitly mentioned bot requests, same-thread clarification and stable-URL revision checks, then update the guide and its existing management thread. Neither agent automatically delegates work; outgoing mentions are neutralized.

## Local Codex generation

`GENERATION_BACKEND=local-codex` sends generation to the owner's outbound Windows worker using local Codex and its existing ChatGPT authentication. The worker selects GPT-6 Astra with extra-high reasoning; the model still runs through OpenAI. Prompts pass through Vercel and Redis to that PC. OAuth credentials stay on the PC. `gateway` is a separate explicit operator setting; there is no automatic fallback or API-credit purchase.

The [worker runbook](tools/local-codex-worker/README.md) and [HTTP contract](docs/local-codex-worker-contract.md) describe startup. Set the same random 32-byte `LOCAL_WORKER_TOKEN` as a production Secret and in the worker's ignored `.env.local` alongside `GANESHA_ORIGIN=https://ganesha-devops.vercel.app`. Run `npm start` in the worker directory under the signed-in Windows user. Keep the PC awake for prompt responses; startup is manual. Never commit `.env.local`, `.runtime`, or Codex credentials.

On the owner's current PC, the configured runtime is `../review/local-codex-worker/` relative to this repository. The versioned source is under `tools/local-codex-worker/`; do not launch a second worker there without deliberately migrating the existing configuration and stopping the first process.

The host authenticates requests before accessing the broker, validates schema and domain constraints before accepting generated JSON, and keeps rendering/publication/replies on Vercel. Local jobs use expiring, renewable leases with fenced completion, bounded execution failures, and no expiration while waiting. Account/authentication/model-access errors preserve pending jobs and stop the worker for operator attention. Durable workflows continue polling while the PC is offline, without holding an HTTP request open. A generation snapshot and request ID remain fixed across retries. No remote shell, browsing, cloud administration or arbitrary code execution is exposed through Slack.

Local DevOps uses an ordered thread queue and a durable reply outbox. It imports existing bounded Chat SDK history on first use. `stop` clears context and cancels pending replies; commands remain available without the local model. Replies are at least once: a crash after Slack accepts a post can repeat it. Keep the backend setting fixed for pending work; operator switching mid-conversation requires reviewing queued jobs and context first.

Local generation passed real Slack-to-page and DevOps requests, a stable-URL revision, and a worker stop/restart cycle. All 52 offline tests and three real Redis integration tests passed, along with type checking, production build and dependency audit. The [guide's live verification record](docs/agents.md#live-verification-record--2026-09-28) links the Slack requests and replies.

## References

- [Vercel Connect Slack setup](https://vercel.com/kb/guide/build-a-slack-bot-with-vercel-connect)
- [Chat SDK](https://chat-sdk.dev/docs)
- [Vercel Workflow](https://workflow-sdk.dev/worlds/vercel)
- [Slack app lifecycle and permission changes](https://docs.slack.dev/app-management/distribution/)
- [Vercel Hobby usage policy](https://vercel.com/docs/plans/hobby)
