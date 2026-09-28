import test from 'node:test';
import assert from 'node:assert/strict';
import { randomBytes, randomUUID } from 'node:crypto';
import { createClient } from 'redis';
import { courseOffer, hash, classroomToken, authorizedToken, fulfillPayment, verifyPaidSession, secretEquals, type Order, type PaidSession } from '../src/lib/payment-core.ts';
import { createPaymentStore } from '../src/lib/payment-store.ts';
import { verifyPaymentWebhook } from '../src/lib/payment-webhook.ts';
import Stripe from 'stripe';

const key = 'c'.repeat(64);
const baseOrder: Order = { id: 'a'.repeat(64), courseId: courseOffer.id, locale: 'ar', status: 'pending', createdAt: 1, sessionId: 'cs_test_paymentA' };
const valid = (): PaidSession => ({ id: 'cs_test_paymentA', livemode: false, status: 'complete', mode: 'payment', payment_status: 'paid',
  amount_total: 999, currency: 'usd', client_reference_id: baseOrder.id,
  metadata: { orderId: baseOrder.id, courseId: courseOffer.id, integration: 'ganesha-test-v1' }, customer_details: { email: 'buyer@example.com' },
  line_items: { has_more: false, data: [{ quantity: 1, amount_total: 999, currency: 'usd', price: { unit_amount: 999, currency: 'usd' } }] },
  payment_intent: { id: 'pi_paymentA', status: 'succeeded', livemode: false, amount_received: 999, currency: 'usd', latest_charge: { refunded: false, amount_refunded: 0, disputed: false } } });

test('Webhook verification rejects forged, altered, stale and live payment events', () => {
  const secret = 'whsec_test_fixture';
  const payload = JSON.stringify({ id: 'evt_fixture', type: 'checkout.session.completed', livemode: false, data: { object: valid() } });
  const signature = Stripe.webhooks.generateTestHeaderString({ payload, secret });
  assert.equal(verifyPaymentWebhook(payload, signature, secret).id, 'evt_fixture');
  assert.throws(() => verifyPaymentWebhook(payload, 'forged', secret));
  assert.throws(() => verifyPaymentWebhook(payload.replace('999', '99'), signature, secret));
  assert.throws(() => verifyPaymentWebhook(payload, Stripe.webhooks.generateTestHeaderString({ payload, secret, timestamp: Math.floor(Date.now() / 1000) - 1000 }), secret));
  const live = JSON.stringify({ id: 'evt_live', livemode: true });
  assert.throws(() => verifyPaymentWebhook(live, Stripe.webhooks.generateTestHeaderString({ payload: live, secret }), secret));
});

test('Only the complete test payment for the approved US$9.99 offer passes verification', () => {
  assert.deepEqual(verifyPaidSession(valid(), baseOrder), { email: 'buyer@example.com', paymentIntent: 'pi_paymentA' });
  const variants: ((session: PaidSession) => void)[] = [
    s => { s.payment_status = 'unpaid'; }, s => { s.payment_status = 'no_payment_required'; }, s => { s.status = 'open'; },
    s => { s.status = 'expired'; }, s => { s.livemode = true; }, s => { s.mode = 'subscription'; }, s => { s.amount_total = 99; },
    s => { s.currency = 'brl'; }, s => { s.metadata!.courseId = 'unapproved-course'; }, s => { s.metadata!.orderId = 'b'.repeat(64); },
    s => { s.client_reference_id = 'b'.repeat(64); }, s => { s.line_items!.data[0].quantity = 2; },
    s => { s.line_items!.data[0].price!.unit_amount = 1999; }, s => { s.line_items!.has_more = true; },
    s => { s.line_items!.data.push(s.line_items!.data[0]); }, s => { s.customer_details!.email = null; },
    s => { s.payment_intent = 'pi_notexpanded'; }, s => { s.payment_intent = { ...s.payment_intent as object, status: 'processing' } as PaidSession['payment_intent']; },
    s => { (s.payment_intent as Exclude<PaidSession['payment_intent'], string | null>).latest_charge = { refunded: true, amount_refunded: 999, disputed: false }; },
    s => { (s.payment_intent as Exclude<PaidSession['payment_intent'], string | null>).latest_charge = { refunded: false, amount_refunded: 0, disputed: true }; },
  ];
  for (const mutate of variants) { const session = valid(); mutate(session); assert.throws(() => verifyPaidSession(session, baseOrder)); }
  assert.throws(() => verifyPaidSession(valid(), { ...baseOrder, status: 'revoked' }));
});

test('Opaque classroom links are stable per payment, secret-dependent and contain no payment identifier', () => {
  const token = classroomToken(baseOrder.sessionId!, key);
  assert.match(token, /^g_[A-Za-z0-9_-]{43}$/);
  assert.equal(token, classroomToken(baseOrder.sessionId!, key));
  assert.notEqual(token, classroomToken('cs_test_paymentB', key));
  assert.notEqual(token, classroomToken(baseOrder.sessionId!, 'd'.repeat(64)));
  assert.ok(!token.includes('cs_test') && !token.includes('paymentA'));
  assert.throws(() => classroomToken('cs_live_unsafe', key));
  assert.throws(() => classroomToken(baseOrder.sessionId!, 'weak'));
  assert.equal(secretEquals('', ''), false);
  assert.equal(secretEquals('a', 'b'), false);
});

test('Malformed, unknown, revoked and wrong-course tokens never authorize a classroom', async () => {
  const token = classroomToken(baseOrder.sessionId!, key);
  const fake = { async entitlement() { return null; } } as unknown as Parameters<typeof authorizedToken>[1];
  assert.equal(await authorizedToken('paid=true', { entitlement() { throw new Error('Must not read'); } } as unknown as typeof fake), null);
  assert.equal(await authorizedToken(token, fake), null);
  for (const value of [{ status: 'revoked', courseId: courseOffer.id }, { status: 'active', courseId: 'other' }]) {
    assert.equal(await authorizedToken(token, { async entitlement() { return value; } } as unknown as typeof fake), null);
  }
});

test('Real Redis: concurrent fulfillment grants once, email leases are fenced and refund revokes every reuse', { skip: !process.env.REDIS_TEST_URL && process.env.GANESHA_RUN_REDIS_TESTS !== '1' }, async () => {
  const redis = createClient({ url: process.env.REDIS_TEST_URL || process.env.REDIS_URL });
  redis.on('error', () => {});
  await redis.connect();
  const namespace = `payment-test:${randomUUID()}`;
  const store = createPaymentStore(redis, namespace);
  try {
    assert.equal(await store.order(baseOrder.id), null);
    const first = await store.create(baseOrder);
    assert.equal((await store.create({ ...baseOrder, locale: 'fr' })).locale, first.locale);
    assert.equal(await store.attach(baseOrder.id, baseOrder.sessionId!, 'https://checkout.stripe.com/test'), true);
    assert.equal(await store.attach(baseOrder.id, 'cs_test_different', 'https://checkout.stripe.com/test'), false);
    const [a, b] = await Promise.all([fulfillPayment(valid(), store, key), fulfillPayment(valid(), store, key)]);
    assert.equal(a.token, b.token);
    assert.equal((await authorizedToken(a.token, store))?.courseId, courseOffer.id);
    const stored = await store.order(baseOrder.id);
    assert.equal(stored?.tokenHash, hash(a.token));
    assert.ok(!JSON.stringify(stored).includes(a.token));
    const [mailA, mailB] = await Promise.all([store.claimEmail(baseOrder.id, 100), store.claimEmail(baseOrder.id, 100)]);
    assert.equal(Number(Boolean(mailA)) + Number(Boolean(mailB)), 1);
    const claimed = (mailA || mailB)!;
    const recovered = (await store.claimEmail(baseOrder.id, 60101))!;
    assert.notEqual(recovered.emailClaim, claimed.emailClaim);
    await store.finishEmail(baseOrder.id, claimed.emailClaim!);
    assert.equal((await store.order(baseOrder.id))?.emailStatus, 'pending');
    await store.finishEmail(baseOrder.id, recovered.emailClaim!);
    assert.equal(await store.claimEmail(baseOrder.id, 200000), null);
    await store.revoke('pi_paymentA');
    assert.equal(await authorizedToken(a.token, store), null);
    await assert.rejects(fulfillPayment(valid(), store, key));
    // A refund event arriving before its successful checkout cannot be undone by later fulfillment.
    const next = { ...baseOrder, id: randomBytes(32).toString('hex'), sessionId: 'cs_test_paymentC' };
    const session = valid(); session.id = next.sessionId; session.client_reference_id = next.id; session.metadata!.orderId = next.id;
    (session.payment_intent as Exclude<PaidSession['payment_intent'], string | null>).id = 'pi_paymentC';
    await store.create(next); await store.revoke('pi_paymentC');
    await assert.rejects(fulfillPayment(session, store, key));
  } finally {
    // Clean only this test's unique namespace; never the production database.
    const keys: string[] = [];
    for await (const page of redis.scanIterator({ MATCH: `ganesha:{${namespace}}:*`, COUNT: 100 })) keys.push(...page);
    if (keys.length) await redis.del(keys);
    await redis.quit();
  }
});
