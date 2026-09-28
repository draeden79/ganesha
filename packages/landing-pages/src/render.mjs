import { validateCourse } from './course.mjs';
import { locales, ui, isLocale, localeUrl } from './locales.mjs';

export const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
const brand = `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M10 6a12 12 0 1 1-5 12M10 6v10h10"/></svg><span>ganesha<span class="brand-period">.</span></span>`;
const plus = '<span class="plus" aria-hidden="true"></span>';
const icons = [
  '<path d="m14 3 2.8 8.2L25 14l-8.2 2.8L14 25l-2.8-8.2L3 14l8.2-2.8Z"/>',
  '<rect x="5" y="5" width="18" height="18" rx="5"/><path d="m10 14 3 3 6-6"/>',
  '<circle cx="14" cy="14" r="10"/><path d="m18 10-2.5 5.5L10 18l2.5-5.5Z"/>'
];

export function renderCourse(course, { locale = 'en', url = null, availableLocales = ['en'] } = {}) {
  if (!isLocale(locale) || availableLocales.some(code => !isLocale(code))) throw new Error('Unsupported locale');
  const t = ui[locale];
  validateCourse(course);
  const h=escapeHtml;
  const links = availableLocales.map(code => locales.find(item => item.code === code));
  const metadata = url ? '<link rel="canonical" href="' + h(localeUrl(url, locale)) + '">' + links.map(item => '<link rel="alternate" hreflang="' + item.code + '" href="' + h(localeUrl(url, item.code)) + '">').join('') + '<link rel="alternate" hreflang="x-default" href="' + h(localeUrl(url, 'en')) + '">' : '';
  const languageMenu = links.length > 1 ? '<details class="language-switcher"><summary aria-label="' + h(t.language) + '"><span aria-hidden="true">◎</span><span>' + h(locales.find(item => item.code === locale).name) + '</span></summary><nav aria-label="' + h(t.language) + '">' + links.map(item => '<a lang="' + item.code + '" dir="' + (item.dir || 'ltr') + '" href="' + (url ? h(localeUrl(url, item.code)) : '?lang=' + item.code) + '"' + (item.code === locale ? ' aria-current="page"' : '') + '>' + h(item.name) + '</a>').join('') + '</nav></details>' : '';
  return `<!doctype html>
<html lang="${locale}"${locale === 'ar' ? ' dir="rtl"' : ''}>
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#FDFDFC"><title>${h(course.title)} | Ganesha</title>
<meta name="description" content="${h(course.introduction.slice(0,180))}">
${metadata}
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='18' fill='%236C3BEE'/%3E%3Cpath d='M20 22a17 17 0 1 1-4 17M20 22v13h13' fill='none' stroke='%23FDFDFC' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;450;500;550;600;650;700;750;800&family=Noto+Sans+Arabic:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/styles.css"><link rel="stylesheet" href="/assets/agent.css"><script src="/assets/app.js" defer></script>
</head><body>
<aside class="prototype-notice">${h(t.prototype)}</aside>
<a class="skip-link" href="#content">${h(t.skip)}</a>
<header class="site-header"><div class="container header-inner">
<a class="brand" href="#home" aria-label="${h(t.home)}">${brand}</a>
<nav class="desktop-nav" aria-label="${h(t.nav)}"><a href="#course">${h(t.course)}</a><a href="#journey">${h(t.learn)}</a><a href="#audience">${h(t.audience)}</a></nav>
<a class="button button-small header-cta" href="#journey">${h(t.explore)} <span aria-hidden="true">↗</span></a>
${languageMenu}
<button class="menu-toggle" data-open-label="${h(t.open)}" data-close-label="${h(t.close)}" aria-label="${h(t.open)}" aria-expanded="false" aria-controls="mobile-nav"><span></span><span></span></button></div>
<nav id="mobile-nav" class="mobile-nav" aria-label="${h(t.mobile)}" hidden><a href="#course">${h(t.course)}</a><a href="#journey">${h(t.learn)}</a><a href="#audience">${h(t.audience)}</a><a href="#questions">${h(t.questions)}</a></nav></header>
<main id="content">
<section class="hero container" id="home" aria-labelledby="hero-title"><div class="hero-copy">
<span class="eyebrow hero-eyebrow"><span class="tiny-spark" aria-hidden="true">✳</span>${h(course.eyebrow)}</span>
<h1 id="hero-title">${course.headline.map((line,i)=>i===course.headline.length-1?`<span>${h(line)}</span>`:h(line)).join('<br>')}</h1>
<p class="hero-description">${h(course.introduction)}</p>
<div class="hero-actions"><a class="button" href="#journey">${h(t.journey)} <span aria-hidden="true">↗</span></a><a class="text-link" href="#course"><span class="play-icon" aria-hidden="true">↓</span>${h(t.discover)}</a></div>
<div class="hero-notes"><span>${h(t.newPerspectives)}</span><span>${h(t.realPossibilities)}</span></div></div>
<div class="hero-visual" aria-label="${h(t.visualLabel)}"><div class="hero-art"><img src="/assets/ai-studio.png" alt="${h(t.imageAlt)}" width="1254" height="1254" fetchpriority="high"></div>
<div class="visual-caption"><span class="caption-icon" aria-hidden="true">✧</span><div>${h(t.greatIdeas)}<br><strong>${h(t.newPerspective)}</strong></div><span class="caption-number">01 / ∞</span></div></div></section>
<div class="tools-strip"><div class="container tools-inner"><p>${h(t.littleCuriosity)}<br><strong>${h(t.worldPossibility)}</strong></p><div class="tool-names" aria-label="${h(t.approach)}"><span>${h(t.understand)}</span><span>${h(t.exploreWord)}</span><span>${h(t.create)}</span></div></div></div>
<section class="section container" id="course" aria-labelledby="course-title"><div class="section-heading"><div><span class="eyebrow section-eyebrow">${h(t.knowledge)}</span><h2 id="course-title">${h(t.curiosityTitle)}</h2></div><p>${h(course.overview)}</p></div>
<div class="benefits-grid">${course.benefits.map((item,i)=>`<article class="benefit"><div class="line-icon" aria-hidden="true"><svg viewBox="0 0 28 28">${icons[i]}</svg></div><span class="card-index">0${i+1}</span><h3>${h(item.title)}</h3><p>${h(item.description)}</p><span class="benefit-tag">${h(item.label)}</span></article>`).join('')}</div></section>
<section class="journey-section" id="journey" aria-labelledby="journey-title"><div class="container journey-layout"><div class="journey-intro"><span class="eyebrow section-eyebrow">${h(t.nextStep)}</span><h2 id="journey-title">${h(t.journeyTitle)}<br><span>${h(t.stepAtTime)}</span></h2><p>${h(course.journey)}</p><div class="journey-note"><span class="note-spark" aria-hidden="true">✳</span><span>${h(t.bringIdeas)}<br><strong>${h(t.openPossibilities)}</strong></span></div></div>
<div class="curriculum">${course.modules.map((m,i)=>`<details class="module" name="modules" ${i===0?'open':''}><summary><span class="module-number">${String(i+1).padStart(2,'0')}</span><span class="module-label"><span>${h(m.label)}</span><strong>${h(m.title)}</strong></span>${plus}</summary><div class="module-content"><p>${h(m.description)}</p><ul>${m.topics.map(topic=>`<li>${h(topic)}</li>`).join('')}</ul><div class="practice"><span>${h(t.practice)}</span>${h(m.practice)}</div></div></details>`).join('')}</div></div></section>
<section class="section container audience-section" id="audience" aria-labelledby="audience-title"><span class="eyebrow section-eyebrow">${h(t.differentPaths)}</span><div class="section-heading"><h2 id="audience-title">${h(t.audienceTitle)}</h2></div><div class="audience-grid">${course.audience.map((a,i)=>`<article><span class="audience-number">/ 0${i+1}</span><h3>${h(a.title)}</h3><p>${h(a.description)}</p></article>`).join('')}</div></section>
<section class="faq-section container" id="questions" aria-labelledby="faq-title"><div><span class="eyebrow section-eyebrow">${h(t.beforeStep)}</span><h2 id="faq-title">${h(t.faqTitle)}</h2></div><div class="faq-list">${course.faq.map(f=>`<details><summary>${h(f.question)}${plus}</summary><p>${h(f.answer)}</p></details>`).join('')}</div></section>
<section class="closing container" aria-labelledby="closing-title"><span class="eyebrow">${h(t.room)}</span><h2 id="closing-title">${h(t.closingTitle)}</h2><p>${h(course.closing)}</p><a class="button" href="#journey">${h(t.exploreLearning)} <span aria-hidden="true">↗</span></a><span class="closing-note">${h(t.fresh)}</span></section>
</main><footer class="site-footer container"><div class="footer-top"><a class="brand" href="#home" aria-label="${h(t.backHome)}">${brand}</a><p>${h(t.knowledge)}</p><a href="#home" class="back-top">${h(t.backTop)} <span aria-hidden="true">↑</span></a></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} Ganesha. ${h(t.rights)}</span><a href="#questions">${h(t.questions)}</a><span>${h(t.made)}</span></div></footer>
</body></html>`;
}
