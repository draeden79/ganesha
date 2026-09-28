# Payment test release — 2026-09-28

The US$9.99 one-time test flow is deployed. No real money was charged.

## Deployed source

- Host: `eef89af91825623ad4be24a2dcb1ecd310e7e64c`, deployment `dpl_EykRJS2YE4YMqduZF2AU5wWg3jHK`.
- Classroom: `3264654366b63eab6b73720c44e9326f8d1f2a33`, deployment `dpl_2vFU4FPEL2nP24nX6uGJTCk9EQdW`.
- Test checkout: https://ganesha-devops.vercel.app/checkout.
- Stripe's configured webhook remains https://www.iganesha.online/api/payments/webhook.
- Review remains separate in [host PR #4](https://github.com/draeden79/ganesha/pull/4) and [classroom PR #5](https://github.com/draeden79/ganesha/pull/5). Newer unreleased curriculum was not promoted.

The current PC cannot validate the custom domain's certificate through its network. Test return/email URLs use the verified Vercel alias. TLS validation and network policy were not weakened. Public custom-domain webhook delivery was verified by the independent payment test below.

## Acceptance evidence

1. Browser checkout opened Stripe Sandbox at exactly USD 9.99. Stripe's published test card was used; payment details were not saved.
2. Successful payment returned a unique opaque classroom link on the confirmation page. The link established a secure session and opened the English classroom and a full lesson with working controls.
3. Resend accepted the email on the first attempt. The owner confirmed receipt of the classroom access email.
4. A separate test Checkout Session was completed without its originating checkout cookie in the browser. The confirmation route rejected that browser; the signed Stripe webhook independently marked that exact retained order paid and delivered its email on the first attempt. No entitlement was inserted manually.
5. Authenticated requests returned lesson HTML with private/no-store caching at both host and classroom origin. Immediately following anonymous requests to those same URLs returned 303; paid content did not leak through the cache.
6. Eleven independent anonymous probes covered root/classroom entry, English/Portuguese/Arabic, legacy routes, RSC, exercises and APIs. Pages returned 303 to checkout, APIs returned 401, with no-store. Forged cookies and `paid=true` did not grant access.
7. The retired public beta deployment URL redirected to Vercel SSO, rather than returning lesson content.
8. Gdevops's operations worker validates the protected release branch, minimum commit and reviewed source manifest before upload. Its 30 tests passed; the restarted worker reported the protected commit. The generation worker stayed running.

[Host CI](https://github.com/draeden79/ganesha/actions/runs/36496062259) passed tests including real Redis integration, type checking, production build and audit. Classroom validation passed 21 tests, type checking, production build and content parity across all eleven languages. Refund/dispute revocation and out-of-order events are covered by automated tests; a dashboard refund was not part of this live acceptance.

## Operating limits

This is a test-mode, noncommercial prototype for the existing `course.first-site` classroom. Other generated landing pages need an explicit offer/classroom mapping. Access URLs are private bearer links; progress remains browser-local. Native review of generated translations and content remains advisable before commercial release. Live Stripe keys and live events are rejected.
