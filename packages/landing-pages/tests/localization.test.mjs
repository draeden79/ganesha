import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { locales, translationLocales, ui, translationInstructions, validateTranslation,
  localizeGeneration, prepareLandingPage, GenerationPendingError, selectPageLocale, validateLandingGenerationResult } from '../src/index.mjs';

const source = JSON.parse(readFileSync(new URL('../examples/course.json', import.meta.url), 'utf8'));
const ready = () => ({ status: 'ready', questions: [], course: structuredClone(source) });
const request = { requestKey: 'translation-test', threadKey: 'T:C:1.1', brief: 'A complete supplied course brief.', publicOrigin: 'https://courses.example' };
const scripts = { ja: '学習', hi: 'सीखें', ar: 'تعلّم', ko: '학습', 'zh-CN': '学习' };
function translation(locale) {
  const result = ready();
  result.course.introduction = `${scripts[locale] || locale} — translated introduction`;
  result.course.overview = `${scripts[locale] || locale} — translated overview`;
  result.course.title = `${locale} — course`;
  return result;
}

test('All eleven locales have complete shell copy, native names and trusted translation instructions', () => {
  assert.deepEqual(locales.map(value => value.code), ['en','pt-BR','es','fr','de','ja','hi','id','ar','ko','zh-CN']);
  for (const locale of locales) {
    assert.deepEqual(Object.keys(ui[locale.code]), Object.keys(ui.en));
    assert.ok(Object.values(ui[locale.code]).every(value => typeof value === 'string' && value.length));
    if (locale.code !== 'en') assert.notEqual(ui[locale.code].prototype, ui.en.prototype);
  }
  assert.match(translationInstructions('pt-BR'), /Brazilian Portuguese/);
  assert.match(translationInstructions('zh-CN'), /Simplified Chinese/);
  assert.throws(() => translationInstructions('not-a-language'));
});

test('Clarification is returned immediately and never schedules translations', async () => {
  const clarification = { status: 'needs_information', questions: ['Who is the course for?'], course: null };
  assert.deepEqual(await localizeGeneration(clarification, () => { throw new Error('Must not translate'); }), clarification);
});

test('Pending locale jobs are all polled without exposing a partial publication; restart can complete them', async () => {
  const called = [];
  await assert.rejects(prepareLandingPage(request, { generate: () => localizeGeneration(ready(), async ({ locale }) => {
    called.push(locale); return locale === 'ar' ? null : translation(locale);
  }) }), GenerationPendingError);
  assert.equal(called.length, 10);
  const complete = await localizeGeneration(ready(), async ({ locale }) => translation(locale));
  const prepared = await prepareLandingPage(request, { generate: async () => complete });
  assert.equal(Object.keys(prepared.localizedHtml).length, 11);
  for (const { code } of locales) {
    const html = selectPageLocale(prepared, code);
    assert.ok(html.includes(`<html lang="${code}"`));
    assert.ok(html.includes(ui[code].prototype));
    assert.ok(html.includes(ui[code].skip));
    assert.match(html, /Figtree/);
    assert.match(html, /ai-studio\.png/);
    assert.equal((html.match(/hreflang=/g) || []).length, 12);
    assert.equal((html.match(/aria-current="page"/g) || []).length, 1);
  }
  assert.match(prepared.localizedHtml.ar, /<html lang="ar" dir="rtl">/);
  assert.match(prepared.localizedHtml['pt-BR'], /data-close-label="Fechar menu"/);
  assert.match(prepared.localizedHtml['zh-CN'], /\?lang=zh-CN/);
  assert.equal(prepared.localizedHtml.en, prepared.html);
  assert.equal(selectPageLocale(prepared, 'xx'), null);
  const next = await prepareLandingPage({ ...request, requestKey: 'revision-2' }, { generate: async () => complete });
  assert.equal(next.url, prepared.url);
});

test('Missing, unchanged, malformed or structurally changed translations cannot silently publish', async () => {
  const result = await localizeGeneration(ready(), async ({ locale }) => translation(locale));
  delete result.translations.de;
  await assert.rejects(prepareLandingPage(request, { generate: async () => result }), /ten course translations/);
  assert.throws(() => validateTranslation(source, source, 'es'), /English source/);
  const changed = translation('es').course;
  changed.modules.pop();
  assert.throws(() => validateTranslation(changed, source, 'es'), /curriculum structure/);
  const fewerTopics = translation('ar').course;
  fewerTopics.modules[0].topics.pop();
  assert.throws(() => validateTranslation(fewerTopics, source, 'ar'), /curriculum structure/);
  assert.throws(() => validateTranslation(translation('es').course, source, 'ja'), /writing system/);
  await assert.rejects(localizeGeneration(ready(), async () => ({ status: 'needs_information', questions: ['Translate?'], course: null })), /ready course/);
});

test('Worker result validation preserves existing English jobs and rejects invalid translation completions', () => {
  assert.deepEqual(validateLandingGenerationResult(JSON.stringify({ brief: 'English request' }), ready()), ready());
  const context = JSON.stringify({ kind: 'course-translation-v1', locale: 'ar', course: source });
  assert.throws(() => validateLandingGenerationResult(context, ready()), /English source/);
  assert.deepEqual(validateLandingGenerationResult(context, translation('ar')), translation('ar'));
  const invalid = translation('ar'); invalid.course.modules.pop();
  assert.throws(() => validateLandingGenerationResult(context, invalid), /curriculum structure/);
});

const redisUrl = process.env.REDIS_TEST_URL || (process.env.GANESHA_RUN_REDIS_TESTS === '1' ? process.env.REDIS_URL : undefined);
test('Real Redis: all locale pages commit together and a failed revision retains the previous complete set', { skip: !redisUrl }, async t => {
  const { createClient } = await import(process.env.GANESHA_REDIS_MODULE || 'redis');
  const { randomUUID } = await import('node:crypto');
  const { createRedisLandingStore } = await import('../src/index.mjs');
  const namespace = 'ganesha:test:locales:' + randomUUID();
  const client = createClient({ url: redisUrl, socket: { connectTimeout: 15000 } });
  client.on('error', () => {});
  await client.connect();
  t.after(async () => {
    for await (const keys of client.scanIterator({ MATCH: `{${namespace}}:*`, COUNT: 100 })) if (keys.length) await client.del(keys);
    await client.quit();
  });
  const store = createRedisLandingStore(client, { namespace });
  const input = { ...request, text: request.brief, actorId: 'UOWNER', now: 1000 };
  await store.enqueue(input);
  const claim = await store.claimJob(input.requestKey, { now: 1001, leaseMs: 1000 });
  const prepared = await prepareLandingPage({ ...claim, publicOrigin: request.publicOrigin }, {
    generate: () => localizeGeneration(ready(), async ({ locale }) => translation(locale)),
  });
  assert.equal(await store.readPage(prepared.slug), null);
  await store.completeJob(claim, { prepared, notification: { threadKey: input.threadKey, body: prepared.url }, now: 1002 });
  const restarted = createRedisLandingStore(client, { namespace });
  const published = await restarted.readPage(prepared.slug);
  assert.deepEqual(published.localizedHtml, prepared.localizedHtml);
  for (const { code } of locales) assert.ok(selectPageLocale(published, code));
  await restarted.enqueue({ ...input, requestKey: 'failing-revision', text: 'Revise', now: 1003 });
  const failure = await restarted.claimJob('failing-revision', { now: 1004, leaseMs: 1000 });
  await restarted.failJob(failure, { code: 'invalid_translation', now: 1005, retryAt: null, notification: null });
  assert.deepEqual(await restarted.readPage(prepared.slug), published);
});

test('Translated data is escaped and legacy pages remain English until regenerated', async () => {
  const result = await localizeGeneration(ready(), async ({ locale }) => translation(locale));
  result.translations.ar.faq[0].answer = '<img src=x onerror=alert(1)>';
  const prepared = await prepareLandingPage(request, { generate: async () => result });
  assert.match(prepared.localizedHtml.ar, /&lt;img src=x onerror=alert\(1\)&gt;/);
  assert.doesNotMatch(prepared.localizedHtml.ar, /<img src=x/);
  assert.equal(selectPageLocale({ html: '<html lang="en">legacy</html>' }, 'en'), '<html lang="en">legacy</html>');
  assert.equal(selectPageLocale({ html: '<html lang="en">legacy</html>' }, 'pt-BR'), null);
  assert.equal(selectPageLocale({ html: 'legacy' }, '__proto__'), null);
});
