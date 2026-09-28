# Local Codex implementation status

Updated 2026-09-28 by the local-worker coordination chat.

## Verified locally

- Normal Windows user is already authenticated to Codex with ChatGPT. The
  restricted shell's earlier `Not logged in` result did not reflect that login.
- Installed CLI: `0.158.0-alpha.2.1`; Node.js `24.7.0`.
- Restricted local runner uses `gpt-6-astra` with `xhigh` reasoning, ChatGPT auth,
  read-only sandbox, disabled shell/browser/plugins/apps/MCP/subagents, and no
  API-key environment variables. OAuth credentials stay on this computer.
- Real subscription smoke: expected structured marker returned successfully.
- Real tool-request probe: returned expected marker with no tool event observed.
- Real course smoke: supplied Ganesha generation schema and instructions returned
  a ready four-module course accepted by `validateGeneration`.
- Ten local-worker offline tests pass: fixed HTTPS origin/no redirects,
  credential isolation, bounded responses, stdin-only prompts, runtime cleanup,
  lost-acknowledgement idempotency, lease-loss abort, account-limit pause,
  unconfirmed-completion stop, host output rejection and idle operation.
- Worker token is provisioned in ignored `.env.local` and is never included in
  child-process environment, source control, messages or raw logs.

## Coordinated implementation

- DevOps owns the versioned worker copy in `ganesha/tools/local-codex-worker`,
  host integration and deployment. Active local runtime remains under
  `review/local-codex-worker` during integration.
- Landing Pages owns the generation broker and the domain queue deferral/snapshot
  changes. It reports offline and isolated real-Redis tests passing.
- DevOps implemented local-job polling across long PC outages and durable
  DevOps replies. Model provider selection is explicit; local failures
  never fall back to paid API generation.

## Production activation verified

- Vercel production now selects `local-codex`. The host authenticates worker
  requests with a separate secret; the PC polls outbound HTTPS.
- The background worker connected successfully on 2026-09-28 at 20:26 UTC.
- Initial live DevOps and Landing Pages jobs completed through `gpt-6-astra`
  with `xhigh` reasoning at 20:29:48 and 20:30:36 UTC, respectively.
- Both controlled bot requests received replies from the correct Slack identity
  in their original threads. Passive bot messages did not create model jobs.
- A new human brief in `#landing-pages`, root `1790627692.783079`, completed
  through local job `1dd64a7d8af57ab4dcb211b058b8605947bb4e83fe01a474e18caf27a9821e03`
  at 20:35:55 UTC. Glandingpage returned the published URL in reply
  `1790627761.711639`.
- Worker PID 43416 was stopped at 20:38:12 UTC. Revision `1790627961.050169`
  remained pending with zero claims and its previous-course snapshot intact.
  The existing public page stayed available with its original title.
- The worker restarted at 20:40:52 UTC as PID 43436 and immediately claimed
  `fea2fd853cc919543dee07cf5bba1c93dc653248e12d0b4c8a0bf7554b3ef655`.
  Astra completed it at 20:41:28 UTC. Glandingpage replied at
  `1790628118.187689` in the original thread.
- Independent HTTP verification confirmed the same public URL returned 200 with
  the revised title **AI Basics for Everyday Work — Ready to Practice**, the
  original curriculum and the demonstration notice. Landing Pages also verified
  the Slack reply and page in the browser.
- The temporary acceptance endpoint has been removed (POST returns 404).
  Unauthenticated worker requests return 401. Production health reports
  `local-codex`, `Gdevops` and `Glandingpage`.
- Startup is currently manual. The worker must remain running and the PC awake
  for new generation. Published pages continue to be served by Vercel.

Verified page: https://ganesha-devops.vercel.app/courses/course-9357ee2114d61bb9c795c634/

Slack thread: https://ganeshagrupo.slack.com/archives/C0C56E0BEJY/p1790627692783079

## Active local runtime

At verification, PID 43436 is running in the background from
`review/local-codex-worker`, using ignored `.env.local`. Safe event logs are
`.runtime/worker-02.log`; stderr is empty. The checked-in source lives under
`ganesha/tools/local-codex-worker`; do not launch both copies. Restart from the
active runtime directory with `npm start` in the normal Windows user session.
No Windows login/reboot autostart has been configured.

The PC runs the Codex worker; model inference remains on OpenAI's service.
Generation uses the signed-in ChatGPT account and its Codex usage limits.
Vercel AI Gateway is not used for these generation requests, and no automatic
paid API fallback is enabled. DevOps remains advisory; stronger generation does
not itself add infrastructure execution tools.
