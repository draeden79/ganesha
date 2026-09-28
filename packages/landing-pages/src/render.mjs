import { validateCourse } from './course.mjs';

export const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
const brand = `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M10 6a12 12 0 1 1-5 12M10 6v10h10"/></svg><span>ganesha<span class="brand-period">.</span></span>`;
const plus = '<span class="plus" aria-hidden="true"></span>';
const icons = [
  '<path d="m14 3 2.8 8.2L25 14l-8.2 2.8L14 25l-2.8-8.2L3 14l8.2-2.8Z"/>',
  '<rect x="5" y="5" width="18" height="18" rx="5"/><path d="m10 14 3 3 6-6"/>',
  '<circle cx="14" cy="14" r="10"/><path d="m18 10-2.5 5.5L10 18l2.5-5.5Z"/>'
];

export function renderCourse(course) {
  validateCourse(course);
  const h=escapeHtml;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#FDFDFC"><title>${h(course.title)} | Ganesha</title>
<meta name="description" content="${h(course.introduction.slice(0,180))}">
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='18' fill='%236C3BEE'/%3E%3Cpath d='M20 22a17 17 0 1 1-4 17M20 22v13h13' fill='none' stroke='%23FDFDFC' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;450;500;550;600;650;700;750;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/styles.css"><link rel="stylesheet" href="/assets/agent.css"><script src="/assets/app.js" defer></script>
</head><body>
<a class="skip-link" href="#content">Skip to content</a>
<header class="site-header"><div class="container header-inner">
<a class="brand" href="#home" aria-label="Ganesha, home">${brand}</a>
<nav class="desktop-nav" aria-label="Main navigation"><a href="#course">The course</a><a href="#journey">What you’ll learn</a><a href="#audience">Who it’s for</a></nav>
<a class="button button-small header-cta" href="#journey">Explore the course <span aria-hidden="true">↗</span></a>
<button class="menu-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav"><span></span><span></span></button></div>
<nav id="mobile-nav" class="mobile-nav" aria-label="Mobile navigation" hidden><a href="#course">The course</a><a href="#journey">What you’ll learn</a><a href="#audience">Who it’s for</a><a href="#questions">Common questions</a></nav></header>
<main id="content">
<section class="hero container" id="home" aria-labelledby="hero-title"><div class="hero-copy">
<span class="eyebrow hero-eyebrow"><span class="tiny-spark" aria-hidden="true">✳</span>${h(course.eyebrow)}</span>
<h1 id="hero-title">${course.headline.map((line,i)=>i===course.headline.length-1?`<span>${h(line)}</span>`:h(line)).join('<br>')}</h1>
<p class="hero-description">${h(course.introduction)}</p>
<div class="hero-actions"><a class="button" href="#journey">Explore the journey <span aria-hidden="true">↗</span></a><a class="text-link" href="#course"><span class="play-icon" aria-hidden="true">↓</span>Discover the course</a></div>
<div class="hero-notes"><span>New perspectives.</span><span>Real possibilities.</span></div></div>
<div class="hero-visual" aria-label="A space for new possibilities"><div class="hero-art"><img src="/assets/ai-studio.png" alt="An isometric miniature learning studio with ivory architecture, a laptop and lavender creative panels." width="1254" height="1254" fetchpriority="high"></div>
<div class="visual-caption"><span class="caption-icon" aria-hidden="true">✧</span><div>Great ideas begin<br><strong>with a new perspective.</strong></div><span class="caption-number">01 / ∞</span></div></div></section>
<div class="tools-strip"><div class="container tools-inner"><p>A little curiosity.<br><strong>A world of possibility.</strong></p><div class="tool-names" aria-label="Our approach to learning"><span>Understand.</span><span>Explore.</span><span>Create.</span></div></div></div>
<section class="section container" id="course" aria-labelledby="course-title"><div class="section-heading"><div><span class="eyebrow section-eyebrow">KNOWLEDGE THAT OPENS DOORS</span><h2 id="course-title">Your curiosity.<br>New possibilities.</h2></div><p>${h(course.overview)}</p></div>
<div class="benefits-grid">${course.benefits.map((item,i)=>`<article class="benefit"><div class="line-icon" aria-hidden="true"><svg viewBox="0 0 28 28">${icons[i]}</svg></div><span class="card-index">0${i+1}</span><h3>${h(item.title)}</h3><p>${h(item.description)}</p><span class="benefit-tag">${h(item.label)}</span></article>`).join('')}</div></section>
<section class="journey-section" id="journey" aria-labelledby="journey-title"><div class="container journey-layout"><div class="journey-intro"><span class="eyebrow section-eyebrow">YOUR NEXT STEP STARTS HERE</span><h2 id="journey-title">From curiosity<br>to practice.<br><span>One step at a time.</span></h2><p>${h(course.journey)}</p><div class="journey-note"><span class="note-spark" aria-hidden="true">✳</span><span>You bring the ideas.<br><strong>We open the possibilities.</strong></span></div></div>
<div class="curriculum">${course.modules.map((m,i)=>`<details class="module" name="modules" ${i===0?'open':''}><summary><span class="module-number">${String(i+1).padStart(2,'0')}</span><span class="module-label"><span>${h(m.label)}</span><strong>${h(m.title)}</strong></span>${plus}</summary><div class="module-content"><p>${h(m.description)}</p><ul>${m.topics.map(topic=>`<li>${h(topic)}</li>`).join('')}</ul><div class="practice"><span>PUT IT INTO PRACTICE</span>${h(m.practice)}</div></div></details>`).join('')}</div></div></section>
<section class="section container audience-section" id="audience" aria-labelledby="audience-title"><span class="eyebrow section-eyebrow">DIFFERENT PATHS. A NEW BEGINNING.</span><div class="section-heading"><h2 id="audience-title">Make room for<br>what comes next.</h2></div><div class="audience-grid">${course.audience.map((a,i)=>`<article><span class="audience-number">/ 0${i+1}</span><h3>${h(a.title)}</h3><p>${h(a.description)}</p></article>`).join('')}</div></section>
<section class="faq-section container" id="questions" aria-labelledby="faq-title"><div><span class="eyebrow section-eyebrow">BEFORE YOUR FIRST STEP</span><h2 id="faq-title">Every good journey<br>starts with<br> a question.</h2></div><div class="faq-list">${course.faq.map(f=>`<details><summary>${h(f.question)}${plus}</summary><p>${h(f.answer)}</p></details>`).join('')}</div></section>
<section class="closing container" aria-labelledby="closing-title"><span class="eyebrow">THERE’S ROOM FOR YOU IN WHAT’S NEXT</span><h2 id="closing-title">Your next possibility<br> starts with curiosity.</h2><p>${h(course.closing)}</p><a class="button" href="#journey">Explore what you’ll learn <span aria-hidden="true">↗</span></a><span class="closing-note">A fresh perspective. New possibilities.</span></section>
</main><footer class="site-footer container"><div class="footer-top"><a class="brand" href="#home" aria-label="Ganesha, back to the top">${brand}</a><p>Knowledge that opens doors.</p><a href="#home" class="back-top">Back to top <span aria-hidden="true">↑</span></a></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} Ganesha. All rights reserved.</span><a href="#questions">Common questions</a><span>Made for your next step.</span></div></footer>
</body></html>`;
}
