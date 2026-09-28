# Ganesha DevOps

Custom Slack assistant hosted on Vercel. Built with the official Chat SDK and AI SDK. No Vercel Pro upgrade is required for this application.

## What the bot does

Mention **@Ganesha DevOps** or send it a direct message. It gathers infrastructure requirements, helps diagnose problems from information provided, and prepares change plans with validation and rollback. It replies in the user's language, defaulting to Brazilian Portuguese. Follow-ups stay in the same thread.

The current version **plans and advises**. It has no cloud execution, shell, repository writing, ticketing or live infrastructure inspection tools. A human operator reviews and executes changes. Textual approval does not grant execution rights.

Commands: `ajuda`, `status`, and `encerrar` (unsubscribe and clear the bot's stored context for that thread; original Slack messages remain).

## Deployment

1. Import `draeden79/ganesha` into the existing Vercel team as project `ganesha-devops`. Use Node.js 24.
2. Provision a free Redis database through Vercel Storage, then connect it to this project as `REDIS_URL`. Review the provider's plan and terms; no paid upgrade is required by the code.
3. In Vercel Connect, create a Slack connector named `ganesha-devops` in the **Ganesha** workspace. Give the bot `app_mentions:read`, `chat:write`, `channels:history`, `channels:read`, `groups:history`, `im:history`, `users:read`. Forward `app_mention`, `message.channels`, `message.groups`, and `message.im` events. Do not give it workspace administration, user impersonation, file or cloud execution permissions.
4. Review and authorize the Slack installation. Attach the connector only to this project's production environment with trigger path `/api/webhooks/slack`.
5. Configure `SLACK_CONNECTOR=slack/ganesha-devops`, `SLACK_TEAM_ID` (the Ganesha workspace ID), and `REDIS_URL`. Vercel provides OIDC authentication to Connect and AI Gateway. No permanent Slack or model key is stored in this repository.
6. Redeploy, check `/api/health`, invite the bot to the infrastructure channel, and test `ajuda`, a real infrastructure request, and a follow-up. `/api/health` checks configuration presence, not remote service health; a successful Slack conversation is the end-to-end acceptance test.

The webhook is intended for Vercel Connect forwarded traffic, not direct Slack requests. Its OIDC verifier is bound to this Vercel project/environment and the app additionally checks the Slack workspace ID. Keep deployment protection compatible with Connect forwarding; do not expose other project resources to make a webhook work.

## Local checks

```sh
npm ci
npm test
npm run typecheck
npm run build
```

For development, use `vercel link` and `vercel env pull .env.local`. Production events should continue targeting production. Environment variables are listed in `.env.example`.

## Data and usage

- Default model: `openai/gpt-5.4-mini`, configurable through `AI_MODEL`.
- Default limit: 40 model requests per UTC day across the workspace and a ten-second cooldown per user. This limits requests, not a monetary amount. Vercel hosting, Connect, Redis and model usage are subject to their respective plan allowances.
- Conversations are sent to Vercel AI Gateway and its model provider. Common credential patterns are redacted, but this is not a comprehensive secret detector; never paste secrets into Slack.
- The bot keeps at most 12 conversation turns per thread in Redis, with Chat SDK's 30-day thread-state TTL. SDK deduplication and queue entries also use Redis. Backups and service logs may follow provider retention rules.
- Chat SDK serializes concurrent messages per thread and deduplicates deliveries. This is not an exactly-once, durable work-order system: retries or platform termination can still interrupt a response. Infrastructure changes are never executed.
- Set `SLACK_ALLOWED_CHANNEL_IDS` to restrict channel use. DMs remain enabled. External Slack Connect channels are rejected.

## References

- [Vercel Connect Slack bot guide](https://vercel.com/kb/guide/build-a-slack-bot-with-vercel-connect)
- [Chat SDK](https://chat-sdk.dev/docs)
- [AI Gateway](https://vercel.com/docs/ai-gateway)
