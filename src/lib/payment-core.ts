import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

// Trusted offer configuration. A Slack brief or browser can never set these values.
export const courseOffer = Object.freeze({ id: 'course.first-site', title: 'Ganesha — AI: from idea to your first project', amount: 999, currency: 'usd' });
export const paymentLocales = ['en', 'pt-BR', 'es', 'fr', 'de', 'ja', 'hi', 'id', 'ar', 'ko', 'zh-CN'] as const;
export const accessCookie = 'ganesha_classroom';
export const checkoutCookie = 'ganesha_checkout';
export const tokenPattern = /^g_[A-Za-z0-9_-]{43}$/;
export const idPattern = /^[a-f0-9]{64}$/;
export const hash = (value: string) => createHash('sha256').update(value).digest('hex');
export const newBrowserToken = () => randomBytes(32).toString('hex');
export const normalizeLocale = (locale: unknown) => paymentLocales.includes(locale as typeof paymentLocales[number]) ? String(locale) : 'en';
export const stripeLocale = (locale: string) => locale === 'zh-CN' ? 'zh' : ['ar', 'hi'].includes(locale) ? 'en' : normalizeLocale(locale);
export function secretEquals(a: string, b: string) {
  return Boolean(a && b) && timingSafeEqual(createHash('sha256').update(a).digest(), createHash('sha256').update(b).digest());
}
export function classroomToken(sessionId: string, key: string) {
  if (!/^cs_test_[A-Za-z0-9]+$/.test(sessionId) || !/^[a-f0-9]{64}$/.test(key)) throw new Error('Invalid access configuration');
  return `g_${createHmac('sha256', Buffer.from(key, 'hex')).update(`classroom-v1:${sessionId}`).digest('base64url')}`;
}
export type Order = { id: string; courseId: string; locale: string; createdAt: number; sessionId?: string; checkoutUrl?: string;
  status: 'pending' | 'paid' | 'revoked'; email?: string; tokenHash?: string; paymentIntent?: string;
  emailStatus?: 'pending' | 'sent'; emailClaim?: string; emailLeaseUntil?: number; emailAttempts?: number };
export type Entitlement = { courseId: string; orderId: string; status: 'active' | 'revoked'; locale: string };
export interface PaymentStore {
  order(id: string): Promise<Order | null>;
  create(order: Order): Promise<Order>;
  attach(id: string, sessionId: string, url: string): Promise<boolean>;
  grant(id: string, data: { sessionId: string; paymentIntent: string; email: string; tokenHash: string }): Promise<boolean>;
  entitlement(tokenHash: string): Promise<Entitlement | null>;
  revoke(paymentIntent: string): Promise<void>;
  claimEmail(id: string, now: number): Promise<Order | null>;
  finishEmail(id: string, claim: string): Promise<void>;
  releaseEmail(id: string, claim: string): Promise<void>;
}
// Narrow structural interface keeps the security rules independently testable.
export type PaidSession = { id: string; livemode: boolean; status: string | null; mode: string; payment_status: string;
  amount_total: number | null; currency: string | null; client_reference_id: string | null;
  metadata: Record<string, string> | null; customer_details: { email: string | null } | null;
  line_items?: { has_more: boolean; data: { quantity: number | null; amount_total: number; currency: string; price: { unit_amount: number | null; currency: string } | null }[] };
  payment_intent: string | null | { id: string; status: string; livemode: boolean; amount_received: number; currency: string;
    latest_charge?: string | null | { refunded: boolean; amount_refunded: number; disputed: boolean } } };
export class PaymentNotVerified extends Error {}
export function verifyPaidSession(session: PaidSession, order: Order) {
  const item = session.line_items?.data[0];
  const intent = typeof session.payment_intent === 'object' && session.payment_intent;
  const charge = intent && typeof intent.latest_charge === 'object' && intent.latest_charge;
  if (session.id !== order.sessionId || !/^cs_test_[A-Za-z0-9]+$/.test(session.id) || session.livemode !== false ||
    session.status !== 'complete' || session.mode !== 'payment' || session.payment_status !== 'paid' ||
    session.amount_total !== courseOffer.amount || session.currency !== courseOffer.currency ||
    session.client_reference_id !== order.id || session.metadata?.orderId !== order.id ||
    session.metadata?.courseId !== courseOffer.id || order.courseId !== courseOffer.id ||
    session.metadata?.integration !== 'ganesha-test-v1' ||
    !item || session.line_items!.has_more || session.line_items!.data.length !== 1 || item.quantity !== 1 ||
    item.amount_total !== courseOffer.amount || item.currency !== courseOffer.currency ||
    item.price?.unit_amount !== courseOffer.amount || item.price.currency !== courseOffer.currency ||
    !intent || intent.livemode !== false || intent.status !== 'succeeded' ||
    intent.amount_received !== courseOffer.amount || intent.currency !== courseOffer.currency ||
    !charge || charge.refunded || charge.amount_refunded !== 0 || charge.disputed || order.status === 'revoked') {
    throw new PaymentNotVerified('Payment has not been verified for this course');
  }
  const email = session.customer_details?.email;
  if (!email || email.length > 254 || !/^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/.test(email)) throw new PaymentNotVerified('A valid checkout email is required');
  return { email, paymentIntent: intent.id };
}
export async function fulfillPayment(session: PaidSession, store: PaymentStore, key: string) {
  const id = session.client_reference_id;
  if (!id || !idPattern.test(id)) throw new PaymentNotVerified('Unknown order');
  const order = await store.order(id);
  if (!order) throw new PaymentNotVerified('Unknown order');
  const payment = verifyPaidSession(session, order);
  const token = classroomToken(session.id, key);
  const granted = await store.grant(order.id, { ...payment, sessionId: session.id, tokenHash: hash(token) });
  if (!granted) throw new PaymentNotVerified('Access cannot be granted');
  return { orderId: order.id, token, locale: order.locale };
}
export async function authorizedToken(token: string, store: PaymentStore) {
  if (!tokenPattern.test(token)) return null;
  const grant = await store.entitlement(hash(token));
  return grant?.status === 'active' && grant.courseId === courseOffer.id ? grant : null;
}
export function privateHeaders() {
  return { 'Cache-Control': 'private, no-store, max-age=0', 'CDN-Cache-Control': 'no-store', 'Vercel-CDN-Cache-Control': 'no-store',
    'Referrer-Policy': 'no-referrer', 'X-Robots-Tag': 'noindex, nofollow', 'X-Content-Type-Options': 'nosniff' };
}
