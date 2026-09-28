# Ganesha agent behavior and communication guide

Version 1.5 — 2026-09-28

## Where to request work

Both Gdevops and Glandingpage accept requests in **any Ganesha workspace channel** where Slack delivers events to the installed app, and in their DMs. There is no application channel allowlist. Invite the target app and mention it to start work. Private-channel access still depends on Slack membership and event delivery; explicitly mention the app for each private-channel request.

Gdevops: `<@U0C567TV76Y>` (app A0C4XCWBBQV). Glandingpage: `<@U0C56SNJD28>` (app A0C4MQV1FJT). Workspace T0C4LM9QGJK. Use Slack's actual mention format, not a plain display name.

Verified humans, bot users, and incoming-webhook bots may call. Webhook bot IDs are checked through Slack `bots.info` with the workspace token; display names never authorize a caller. Bots must explicitly mention the target on every request and clarification reply. Self messages and passive bot messages are ignored; outgoing mentions are neutralized to prevent loops. External shared channels remain outside this workspace policy.

Keep one agent/task per thread. Existing thread assignments and histories stay with their original agent. Human follow-ups in an active subscribed thread may omit the mention where Slack delivers the message event. `#management` can now dispatch requests and remains the place for substantive coordination updates.

## Gdevops operations

Gdevops now has a deterministic GitHub/Vercel operations worker for **draeden79/ganesha**. These explicit commands execute work; ordinary conversational replies provide guidance and do not silently deploy:

```text
@Gdevops ops github status codex/classroom-paywall
@Gdevops ops vercel status classroom
@Gdevops ops vercel status devops
@Gdevops ops dns status iganesha.online
@Gdevops ops github pr {"head":"codex/example","base":"main","title":"Describe the change"}
@Gdevops ops deploy classroom FULL_40_CHARACTER_COMMIT_SHA
@Gdevops ops retry FULL_64_CHARACTER_JOB_ID
```

The first command resolves the commit and checks. PR requests create or reuse a draft PR; they do not merge it. Classroom deployment accepts a full commit SHA reachable from the protected release branch `codex/classroom-paywall`, verifies the reviewed server access guards, uploads an isolated snapshot, builds remotely on Vercel and checks that anonymous classroom requests go to checkout. The earlier public `codex/diretor-integracao` release path must incorporate those guards before it can be promoted. Deployment is fixed to `ganesha-classroom`; the host project is `ganesha-devops` in team `manuel-guimaraes-pinto-filhos-projects`. Only `/classroom` and `/classroom/:path*` are proxied. Existing landing, `/api`, assets, Slack services and `/courses` remain on the host.

An accepted request returns a job ID in its original Slack thread. The durable Redis queue retains work while the PC is offline. A separate Windows operations worker uses existing GitHub/Vercel CLI authentication; credentials never enter model input or Slack. Generation remains a separate data-only Codex worker. Results are posted only from verified command/API outcomes. A checkpoint prevents automatic recreation after an ambiguous remote mutation; such uncertainty is reported for operator review. Delivery retries independently and may repeat a result after an interrupted acknowledgement.

Requests such as “fix the DNS of iganesha.online” automatically queue a fixed read-only DNS diagnostic. It checks Vercel configuration and public DNS and links timestamped independent HTTPS evidence. Local network diagnostics are disabled at the owner's request. Diagnosis does not itself change DNS, certificate trust or network policy. Other natural-language DevOps requests receive a queued acknowledgement before generation.

Use `help` for syntax, `status` for capabilities and `stop` to stop conversational generation in that thread. **Stop does not cancel an accepted infrastructure operation.** Follow an operation's job receipt/result; do not resubmit a mutation just because it is slow. An operations worker restart recovers unfinished work using the same job and deployment/PR checkpoints.

After a reported failure is resolved, use `ops retry` with the full job ID in the original thread. This resumes the same operation and checkpoints; it refuses running jobs, successful jobs and requests from another thread. Recovery checks existing remote records before creating anything.

No operation purchases resources, upgrades plans, changes credentials, merges a PR or executes arbitrary shell supplied by a message/model. The owner already selected a noncommercial demonstration on the current plan. Do not repeatedly ask the product team to reconfirm that same decision. Classroom application deployment belongs to Gdevops, not Glandingpage.

## Glandingpage

Provide course subject/title, audience, learning outcome and actual curriculum. Glandingpage asks up to three clarifying questions, then generates English copy and automatically translates the complete landing page into Brazilian Portuguese, Spanish, French, German, Japanese, Hindi, Indonesian, Arabic, Korean and Simplified Chinese. English is the default; the language selector exposes all eleven versions, with right-to-left Arabic. No translation request or language list is needed in the brief.

The complete set publishes together in the approved Ganesha template, then the agent returns its public URL in the original thread. A same-thread revision preserves its URL; a failed or incomplete translation preserves the previous complete publication. Existing English-only pages are upgraded on their next revision. The URL format is `/courses/<slug>/?lang=pt-BR` (English omits `lang`); supported codes are `en`, `pt-BR`, `es`, `fr`, `de`, `ja`, `hi`, `id`, `ar`, `ko`, `zh-CN`. Facts such as prices, dates, instructors, credentials and testimonials must come from the brief and remain consistent across languages. Translations are AI-generated and still benefit from native-speaker review before commercial use.

The brand uses Figtree, soft white/cream/lavender, purple #6C3BEE, dark text, whitespace, subtle borders and approved illustration. It publishes demonstration pages, not application code, payments, enrollment or infrastructure. It cannot deploy the classroom application.

## Test payment and classroom boundary

The owner approved a US$9.99 one-time Stripe **test** checkout for the existing `course.first-site` classroom, with access links on the confirmation page and by Resend email. This is a separate deterministic host service, not a model capability. A course brief cannot set a checkout price, mark a payment successful or issue classroom access. Other generated demo pages need an explicit offer/classroom mapping before adding checkout.

The classroom now requires a server-verified entitlement, including on its direct origin, legacy course routes and exercise downloads. Opening `/classroom/<opaque-token>` establishes the buyer's private browser session. Refund/dispute notifications revoke access. Existing public classroom URLs should no longer be advertised as free previews. Payment activation requires the owner's test Stripe and Resend configuration and a verified test transaction; see [the payment runbook](payments.md). Real sales remain disabled.

## Runtime and communication

English is the default. Generation uses local Codex with ChatGPT authentication, GPT-6 Astra and extra-high reasoning. Both local workers require this Windows PC to remain awake and authenticated; startup is currently manual. Accepted work persists offline; there is no automatic paid API fallback. Public pages remain on Vercel while workers are offline.

Keep requests concise and never paste secrets. The model quota is 40 requests per UTC day shared by both agents. One landing-page brief counts as one workspace request, while its English copy and ten translations use eleven separate model jobs and the account's model allowance. Translation jobs are durable and resume after worker outages; generating the complete set takes longer than an English-only page. The ten-second cooldown was removed because it discarded legitimate requests across threads. Deterministic operations, DNS diagnostics and help/status/stop do not consume model quota. Slack retries of one message are deduplicated. A new message is a new request even if it repeats a textual request_id.

Bot/API callers must observe the original thread for questions, acceptance and final results. An incoming webhook that can only post needs its coordinator to read the thread through an authorized Slack interface. Do not infer that the requesting bot received a reply merely because Gdevops posted one.

Worker runbooks: `tools/local-codex-worker/README.md` and `tools/operations-worker/README.md`. Source: https://github.com/draeden79/ganesha. Keep this guide and its Slack announcement synchronized with verified behavior.
