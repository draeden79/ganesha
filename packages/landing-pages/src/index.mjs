import { createHash } from 'node:crypto';
import { validateGeneration } from './course.mjs';
import { renderCourse } from './render.mjs';
import { validateTranslations } from './localization.mjs';
import { locales } from './locales.mjs';
export { generationSchema, courseSchema, validateGeneration, validateCourse } from './course.mjs';
export { renderCourse } from './render.mjs';
export { instructions } from './instructions.mjs';
export { routeAgent } from './router.mjs';
export { runLandingJob, deliverLandingNotification } from './jobs.mjs';
export { createRedisLandingStore } from './redis-store.mjs';
export { createSharedIngress } from './ingress.mjs';
export { createRedisGatewayStore } from './gateway-store.mjs';
export { GenerationPendingError } from './generation.mjs';
export { locales, translationLocales, isLocale, localeUrl, ui } from './locales.mjs';
export { translationInstructions, validateTranslation, validateTranslations, validateLandingGenerationResult, localizeGeneration, selectPageLocale } from './localization.mjs';

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
  const generated = await deps.generate({ requestKey, brief, previousCourse });
  if (!generated || typeof generated !== 'object') throw new Error('Invalid generation');
  const { translations, ...base } = generated;
  const result = validateGeneration(base);
  if (result.status === 'needs_information') {
    if (translations !== undefined) throw new Error('Clarification cannot contain translations');
    return { status: 'needs_information', requestKey, questions: result.questions,
      reply: 'Landing Pages · I need a little more detail before publishing:\n' + result.questions.map(q => `• ${q}`).join('\n') };
  }
  const url = `${origin.origin}/courses/${slug}/`;
  const availableLocales = translations === undefined ? ['en'] : locales.map(item => item.code);
  if (translations !== undefined) validateTranslations(translations, result.course);
  const localizedHtml = Object.fromEntries(availableLocales.map(locale => [locale,
    renderCourse(locale === 'en' ? result.course : translations[locale], { locale, url, availableLocales })]));
  return { status: 'ready', requestKey, slug, url, course: result.course, html: localizedHtml.en, localizedHtml };
}
