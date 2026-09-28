# Classroom paywall integration

This branch adds payment authorization to the currently deployed four-lesson beta (`2ac2fe8`). It does not activate unreleased curriculum changes.

The host `ganesha-devops` owns Stripe test checkout, verified payments, durable entitlements and email links. Set its shared `CLASSROOM_SERVICE_TOKEN` as a server-only Production environment variable here. Missing configuration and verification outages fail closed.

Both classroom and legacy course routes authorize before rendering, and the course loaders authorize before reading/serializing lesson data. The proxy additionally gates direct origin URLs, RSC requests, APIs and exercise files. Public bundles/fonts/decorative images contain presentation assets only. Keep Vercel deployment protection enabled for historical deployment URLs.

Users arrive with the `ganesha_classroom` HttpOnly cookie set after opening their paid bearer link on the host. The server verifies its active `course.first-site` entitlement through a fixed authenticated, uncached endpoint. Browser flags and arbitrary request headers do not authorize access. Refunds/disputes revoke future requests. Progress remains in browser storage; this change does not add account sync.

Future product releases must preserve `src/lib/access-client.ts`, the `authorizeCourse` adapter, guarded loaders/pages, and the proxy. Do not restore public access while merging new curriculum. Unit tests read curriculum fixtures directly; there is no production testing bypass.

Full setup and operational contract: [host payment runbook](https://github.com/draeden79/ganesha/blob/codex/classroom-checkout/docs/payments.md).
