import { createHash } from 'node:crypto';
import { validateGeneration } from './course.mjs';
import { renderCourse } from './render.mjs';
export { generationSchema, courseSchema, validateGeneration, validateCourse } from './course.mjs';
export { renderCourse } from './render.mjs';
export { instructions } from './instructions.mjs';
export { routeAgent } from './router.mjs';
export { runLandingJob, deliverLandingNotification } from './jobs.mjs';
export { createRedisLandingStore } from './redis-store.mjs';
export { createSharedIngress } from './ingress.mjs';
export { createRedisGatewayStore } from './gateway-store.mjs';

export const pageHeaders = {
  'Content-Type': 'text/html; charset=utf-8',
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': "default-src 'none'; style-src 'self' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; script-src 'self'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'",
};

/** A deterministic unpublished artifact. Only the host's atomic commit makes it live. */
export async function prepareLandingPage(input, deps) {
  const { threadKey, requestKey, brief, previousCourse = null } = input;
  if (typeof threadKey !== 'string' || !threadKey || threadKey.length > 500 ||
    typeof requestKey !== 'string' || !requestKey || requestKey.length > 500 ||
    typeof brief !== 'string' || !brief.trim() || brief.length > 30000) throw new Error('Invalid landing-page request');
  const origin = new URL(input.publicOrigin);
  if (origin.protocol !== 'https:' || origin.username || origin.password || origin.pathname !== '/' || origin.search || origin.hash) {
    throw new Error('Public origin must be an HTTPS origin');
  }
  // Keep the URL stable across revisions, without exposing Slack IDs in public URLs.
  const slug = `course-${createHash('sha256').update(threadKey).digest('hex').slice(0, 24)}`;
  const result = validateGeneration(await deps.generate({ brief, previousCourse }));
  if (result.status === 'needs_information') {
    return { status: 'needs_information', requestKey, questions: result.questions,
      reply: 'Landing Pages · I need a little more detail before publishing:\n' + result.questions.map(q => `• ${q}`).join('\n') };
  }
  return { status: 'ready', requestKey, slug, url: `${origin.origin}/courses/${slug}/`,
    course: result.course, html: renderCourse(result.course).replace('<body>', '<body><aside class="prototype-notice">Ganesha prototype · Demonstration course page for workflow testing.</aside>') };
}
