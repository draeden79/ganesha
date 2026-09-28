// Copy into ganesha/src/app/courses/[slug]/route.ts.
import { landingStore } from '@/lib/landing-runtime';
import { pageHeaders, isLocale, selectPageLocale } from '@ganesha/landing-pages';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function GET(request: Request, context: { params: Promise<{ slug: string }> }) {
  try {
    const locale = new URL(request.url).searchParams.get('lang') || 'en';
    if (!isLocale(locale)) return new Response('Language not supported', { status: 404 });
    const { slug } = await context.params;
    const page = await (await landingStore()).readPage(slug);
    if (!page) return new Response('Course page not found', { status: 404 });
    const html = selectPageLocale(page, locale);
    return html ? new Response(html, { headers: { ...pageHeaders, 'Content-Language': locale } }) :
      new Response('This language is not available for this course yet', { status: 404 });
  } catch { return new Response('Course page temporarily unavailable', { status: 503 }); }
}
