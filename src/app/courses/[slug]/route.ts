// Copy into ganesha/src/app/courses/[slug]/route.ts.
import { landingStore } from '@/lib/landing-runtime';
import { pageHeaders } from '@ganesha/landing-pages';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function GET(_request: Request, context: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await context.params;
    const page = await (await landingStore()).readPage(slug);
    return page ? new Response(page.html, { headers: pageHeaders }) : new Response('Course page not found', { status: 404 });
  } catch { return new Response('Course page temporarily unavailable', { status: 503 }); }
}
