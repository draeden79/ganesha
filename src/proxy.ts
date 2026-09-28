import { NextResponse, type NextRequest } from "next/server";
import { isLocale } from "./lib/course-schema";
import { classroomCookie, verifyClassroomToken } from './lib/access-client';
export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  // Presentation bundles, fonts and decorative images contain no lesson payloads.
  if (pathname.startsWith('/_next/') || pathname.startsWith('/classroom/_next/') ||
    pathname.startsWith('/images/') || pathname.startsWith('/classroom/images/') || pathname === '/favicon.ico') return NextResponse.next();
  const access = await verifyClassroomToken(request.cookies.get(classroomCookie)?.value || '');
  const privateHeaders = { 'Cache-Control': 'private, no-store, max-age=0', 'CDN-Cache-Control': 'no-store', 'Vercel-CDN-Cache-Control': 'no-store', 'Referrer-Policy': 'no-referrer', 'X-Robots-Tag': 'noindex, nofollow' };
  if (access.status !== 'authorized') {
    if (pathname.startsWith('/api/')) return NextResponse.json({ error: 'classroom_access_required' }, { status: 401, headers: privateHeaders });
    const response = NextResponse.redirect('https://www.iganesha.online/checkout', 303);
    for (const [name, value] of Object.entries(privateHeaders)) response.headers.set(name, value);
    return response;
  }
  const candidate = request.nextUrl.pathname.split("/")[2] ?? "";
  const headers = new Headers(request.headers);
  headers.set("x-ganesha-locale", isLocale(candidate) ? candidate : "en");
  headers.set("x-ganesha-route-base", request.nextUrl.pathname.startsWith("/classroom") ? "/classroom" : "/course");
  const response = NextResponse.next({ request: { headers } });
  for (const [name, value] of Object.entries(privateHeaders)) response.headers.set(name, value);
  return response;
}
export const config = { matcher: ['/:path*'] };
