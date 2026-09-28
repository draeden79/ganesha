# Test checkout and protected classroom

The owner approved a **US$9.99 one-time test payment**, with a unique classroom link on the confirmation page and by email through **Resend**. Real sales remain disabled. Stripe live keys and live events are rejected in code.

## Buyer flow

1. The approved homepage links to `/checkout`.
2. The server creates Stripe Checkout for the fixed `course.first-site` offer: 999 cents, USD, quantity one, card payment, no discount or adaptive pricing. A Slack brief and browser input cannot change the price or grant.
3. A signed Stripe webhook retrieves the current Checkout Session, line item, PaymentIntent and charge. The server checks the expected order, course, amount, currency, test mode and successful payment before fulfillment. The confirmation page also checks the browser's private checkout cookie and retrieves payment status server-side.
4. Redis atomically records the entitlement and pending email. Duplicate or concurrent events produce the same entitlement. The URL is `/classroom/g_<43 opaque characters>`; it reveals no Stripe identifier. The application stores its hash. Keep `CLASSROOM_ACCESS_KEY` stable so existing emailed links remain valid.
5. Opening the link verifies its active entitlement, sets a Secure/HttpOnly/SameSite cookie and redirects to `/classroom/<locale>`. The access link is a bearer credential: anyone with it can enter. It can be reopened in another browser; learning progress remains browser-local.
6. A durable Workflow delivers the access email through Resend with an idempotency key. Email failures retry separately, up to eight sends; an exhausted Workflow needs operator review. The confirmation page remains usable during an email outage. Resend's idempotency window is limited, so a late recovery after an ambiguous send can repeat an email, while the entitlement stays unique.

Refund and dispute events revoke access. A revocation arriving before a checkout notification is retained and cannot be undone by later fulfillment. Confirmation/session IDs and `paid=true` URL flags never authorize access.

## Production configuration for the test deployment

Configure these in **ganesha-devops → Settings → Environment Variables → Production**, then deploy:

| Variable | Value |
| --- | --- |
| `PAYMENTS_MODE` | `test` |
| `PAYMENTS_PUBLIC_ORIGIN` | `https://www.iganesha.online` |
| `STRIPE_SECRET_KEY` | A Stripe sandbox/test secret starting `sk_test_` |
| `STRIPE_WEBHOOK_SECRET` | Signing secret for the exact test endpoint below |
| `RESEND_API_KEY` | Resend sending key |
| `RESEND_FROM_EMAIL` | A verified sender address (or the provider's permitted test sender/recipient combination) |
| `CLASSROOM_ACCESS_KEY` | Independent random 32 bytes encoded as 64 hex characters; retain securely |
| `CLASSROOM_SERVICE_TOKEN` | A separate random 32-byte hex secret shared with the classroom server |

`REDIS_URL` is already required by the host. Payment data uses a separate `payments:<environment>:v1` namespace. Pending orders expire after 30 days; paid/revoked records have no automatic expiration. Do not evict entitlement records. Set an appropriate retention policy before commercial launch.

In Stripe **test mode**, register `https://www.iganesha.online/api/payments/webhook` for:

- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`
- `charge.refunded`
- `charge.dispute.created`

Set the same `CLASSROOM_SERVICE_TOKEN` in **ganesha-classroom → Production**. Do not put these secrets in source, Slack, chat, a `NEXT_PUBLIC_` variable, screenshots or application logs. The classroom server calls the fixed host authorization API; its secret cannot create payment entitlements.

Missing configuration disables checkout and leaves the classroom locked. Environment presence alone does not prove a valid Stripe account, webhook or email sender. Activation acceptance requires a real Stripe **test** Checkout, signed webhook delivery, confirmation link, received email, authorized lesson access and refund revocation.

## Origin protection and release coordination

The host gates `/classroom` before proxying. The classroom origin also checks access before rendering either `/classroom/[locale]` or the legacy `/course/[locale]`, and again before loading lesson JSON. APIs and exercise downloads are gated. CSS, fonts, JS presentation bundles and decorative images remain public; no lesson JSON is placed in those bundles. Protected responses are private/no-store with no-referrer and noindex headers.

Vercel Standard Protection currently protects non-production deployment URLs (`all_except_custom_domains`). Keep it enabled and verify retired production URLs require Vercel authentication after promotion. The current production classroom alias is protected by the application itself. Do not redeploy the old public classroom code over this gate. Port the access adapter, guarded loaders/pages and proxy to future product releases before promotion.

The initial curriculum was already public, including in Git history. This gate controls the running classroom; it cannot make previously distributed content secret. Do not claim historical content has been withdrawn.

The approved homepage offer maps only to `course.first-site`. Other agent-generated demo pages stay demonstrations until an operator configures their actual classroom/offer mapping. Model-generated text cannot sell an unrelated course.

## Validation and recovery

Run `npm test`, `npm run typecheck`, `npm run build`. The payment tests cover incorrect amount/currency/course, unpaid/expired/live/refunded/disputed payments, forged/stale webhook signatures, opaque tokens, concurrent Redis fulfillment, email lease recovery, stale-worker fencing and out-of-order revocation. Redis integration uses a unique disposable namespace.

Do not simulate a successful payment by inserting a production entitlement. Use the Stripe sandbox. When email fails, inspect the Workflow and Resend delivery status without copying customer addresses or access links into shared logs. Retry the retained order's email job; do not create a new payment or key.

References: [Stripe fulfillment](https://docs.stripe.com/checkout/fulfillment?payment-ui=stripe-hosted), [webhook signatures](https://docs.stripe.com/webhooks), [Resend idempotency](https://resend.com/docs/dashboard/emails/idempotency-keys), [Vercel Standard Protection](https://vercel.com/docs/deployment-protection#standard-protection).
