import { NextRequest, NextResponse } from 'next/server';
import { accessCookie, authorizedToken, normalizeLocale, privateHeaders, tokenPattern } from '@/lib/payment-core';
import { paymentStore } from '@/lib/payment-runtime';
export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  // These bundles contain presentation code/assets only. Lesson payloads are loaded by authorized server routes.
  if (path.startsWith('/classroom/_next/') || path.startsWith('/classroom/images/')) return NextResponse.next();
  const entry = path.split('/').filter(Boolean);
  const linkToken = entry.length === 2 && tokenPattern.test(entry[1]) ? entry[1] : null;
  const token = linkToken || request.cookies.get(accessCookie)?.value || '';
  try {
    const grant = await authorizedToken(token, await paymentStore());
    if (!grant) {
      const target = new URL('/checkout', request.url);
      target.searchParams.set('lang', normalizeLocale(entry[1]));
      const response = NextResponse.redirect(target, 303);
      for (const [name, value] of Object.entries(privateHeaders())) response.headers.set(name, value);
      return response;
    }
    if (linkToken) {
      const response = NextResponse.redirect(new URL(`/classroom/${normalizeLocale(grant.locale)}`, request.url), 303);
      response.cookies.set(accessCookie, token, { httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 30 });
      for (const [name, value] of Object.entries(privateHeaders())) response.headers.set(name, value);
      return response;
    }
    const response = NextResponse.next();
    for (const [name, value] of Object.entries(privateHeaders())) response.headers.set(name, value);
    return response;
  } catch { return new NextResponse('Classroom access verification is temporarily unavailable.', { status: 503, headers: privateHeaders() }); }
}
export const config = { matcher: ['/classroom/:path*'] };
