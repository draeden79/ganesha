import { checkoutCookie, newBrowserToken, normalizeLocale } from '@/lib/payment-core';
import { paymentConfiguration, paymentsOrigin } from '@/lib/payment-runtime';
import { escapeHtml, paymentPage } from '@/lib/payment-page';
export const dynamic = 'force-dynamic';
export async function GET(request: Request) {
  const url = new URL(request.url);
  if (url.origin !== paymentsOrigin()) return Response.redirect(`${paymentsOrigin()}${url.pathname}${url.search}`, 303);
  let configured = true;
  try { paymentConfiguration(); } catch { configured = false; }
  const locale = normalizeLocale(url.searchParams.get('lang'));
  return paymentPage('Your classroom starts here.', `
    <p>Ganesha — AI: from idea to your first project.</p><p class="price">US$9.99 <small>one-time payment</small></p>
    <p>Explore the current course beta, with guided lessons and practical activities.</p>
    <div class="notice">This is a test checkout. Use Stripe test payment details only. No real money is charged.</div>
    ${url.searchParams.has('canceled') ? '<p>Your checkout was canceled. No classroom access was issued. You can try again below.</p>' : ''}
    <ul><li>Your private classroom link appears after payment is verified.</li><li>A copy is sent to the email you enter at checkout.</li><li>Learning progress is saved in this browser.</li></ul>
    ${!configured ? '<p class="notice">Test checkout is being configured. Classroom access remains protected. Please return when checkout is available.</p>' : ''}
    <form method="post" action="/api/checkout"><input type="hidden" name="locale" value="${escapeHtml(locale)}"><button type="submit" ${configured ? '' : 'disabled'}>Continue to test payment ↗</button></form><a href="/">Back to the course</a>`, {
      headers: { 'Set-Cookie': `${checkoutCookie}=${newBrowserToken()}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=86400` },
    });
}
