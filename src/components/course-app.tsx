"use client";

import { useEffect, useRef, useState } from "react";
import { type Course, type LearningTool, type Locale, localeNames, locales } from "@/lib/course-schema";
import { completedCount, evaluateCheck, flattenSteps, getStepState, mergeProgress, newProgress, restoreProgressWithStatus, storageKey, updateStep, type Progress } from "@/lib/progress";
import { interpolate, ui } from "@/lib/i18n";
import { labels } from "@/lib/labels";
import { recoveryText } from "@/lib/recovery-i18n";
import { TeachingVisual } from "./teaching-visual";

function Icon({ name, size = 20 }: { name: "grid" | "book" | "arrow" | "check" | "spark" | "globe"; size?: number }) {
  const paths = { grid: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z", book: "M12 5v16M12 5C8 2 4 3 2 4v15c4-2 7-1 10 2 3-3 6-4 10-2V4c-2-1-6-2-10 1Z", arrow: "M5 12h14M13 6l6 6-6 6", check: "m5 12 4 4L19 6", spark: "m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z", globe: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18Z" };
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={paths[name]} /></svg>;
}
function Arrow() { return <span className="arrow"><Icon name="arrow" size={18} /></span>; }

export function CourseApp({ course }: { course: Course }) {
  const t = ui[course.locale];
  const l = labels[course.locale];
  const number = (n: number) => new Intl.NumberFormat(course.locale).format(n);
  const flat = flattenSteps(course);
  const [progress, setProgress] = useState<Progress>(() => newProgress(course));
  const [ready, setReady] = useState(false);
  const [view, setView] = useState<"overview" | "step" | "complete">("overview");
  const [saveError, setSaveError] = useState(false);
  const [recovered, setRecovered] = useState(false);
  const savingAllowed = useRef(true);
  const heading = useRef<HTMLHeadingElement>(null);
  const activeIndex = Math.max(0, flat.findIndex(({step}) => step.id === progress.currentStepId));
  const { lesson, step } = flat[activeIndex];
  const state = getStepState(progress, step.id);
  const done = completedCount(course, progress);
  const ratio = done / flat.length;
  const lastAttempt = state.attempts.at(-1);
  const feedback = step.check && lastAttempt ? evaluateCheck(step, lastAttempt.answer) : null;
  const typeLabel = step.check ? t.knowledge : step.practice ? t.practice : t.read;

  useEffect(() => {
    let restored = newProgress(course);
    try {
      const raw = localStorage.getItem(storageKey(course));
      const result = restoreProgressWithStatus(raw, course);
      restored = result.progress;
      if (["corrupt", "incompatible", "recovered"].includes(result.status) && raw) {
        try { localStorage.setItem(`${storageKey(course)}:recovery:${Date.now()}`, raw); setRecovered(true); }
        catch { savingAllowed.current = false; setSaveError(true); }
      }
    } catch { setSaveError(true); }
    let hash = "";
    try { hash = decodeURIComponent(window.location.hash.slice(1)); } catch { /* Ignore malformed URL fragments. */ }
    if (flat.some(({step}) => step.id === hash)) { restored.currentStepId = hash; setView("step"); }
    setProgress(restored);
    setReady(true);
    // The localized course shares stable IDs; locale changes perform a full navigation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (!ready || !savingAllowed.current) return;
    try {
      const raw = localStorage.getItem(storageKey(course));
      const remote = restoreProgressWithStatus(raw, course);
      const merged = mergeProgress(progress, remote.progress, course);
      if (JSON.stringify(merged.states) !== JSON.stringify(progress.states)) setProgress(merged);
      localStorage.setItem(storageKey(course), JSON.stringify(merged));
      setSaveError(false);
    } catch { setSaveError(true); }
  }, [progress, ready, course]);
  useEffect(() => {
    const synchronize = (event: StorageEvent) => {
      if (event.key !== storageKey(course) || !event.newValue) return;
      const remote = restoreProgressWithStatus(event.newValue, course);
      if (["corrupt", "incompatible", "recovered"].includes(remote.status)) {
        try { localStorage.setItem(`${storageKey(course)}:recovery:${Date.now()}`, event.newValue); setRecovered(true); }
        catch { savingAllowed.current = false; setSaveError(true); }
      }
      setProgress(p => {
        const merged = mergeProgress(p, remote.progress, course);
        return JSON.stringify(merged.states) === JSON.stringify(p.states) ? p : merged;
      });
    };
    window.addEventListener("storage", synchronize);
    return () => window.removeEventListener("storage", synchronize);
  }, [course]);
  useEffect(() => { if (ready) heading.current?.focus(); }, [view, progress.currentStepId, ready]);

  function showStep(id: string) {
    setProgress(p => ({ ...p, currentStepId: id })); setView("step");
    history.replaceState(null, "", `#${encodeURIComponent(id)}`);
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  function overview() { setView("overview"); history.replaceState(null, "", window.location.pathname); }
  function changeLocale(locale: Locale) {
    document.cookie = `ganesha-locale=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
    window.location.assign(`/course/${locale}${view === "step" ? `#${encodeURIComponent(step.id)}` : ""}`);
  }
  function next() {
    const updated = step.check || step.practice ? progress : updateStep(progress, step.id, { complete: true });
    setProgress(updated);
    if (activeIndex < flat.length - 1) showStep(flat[activeIndex + 1].step.id);
    else if (completedCount(course, updated) === flat.length) { setView("complete"); history.replaceState(null, "", window.location.pathname); }
    else overview();
  }
  function submitCheck() {
    const result = evaluateCheck(step, state.draft);
    if (!result) return;
    setProgress(p => updateStep(p, step.id, { complete: result.passed, attempts: [...getStepState(p, step.id).attempts, { answer: state.draft, passed: result.passed, at: new Date().toISOString(), evaluator: "deterministic" as const }].slice(-50) }));
  }
  function submitPractice() {
    if (!step.practice || !state.draft.trim() || state.criteria.length !== step.practice.criteria.length) return;
    setProgress(p => updateStep(p, step.id, { complete: true, attempts: [...getStepState(p, step.id).attempts, { answer: state.draft, passed: true, at: new Date().toISOString(), criteria: state.criteria, evaluator: "self-report" as const }].slice(-50) }));
  }
  const nextEnabled = ready && ((!step.check && !step.practice) || state.complete);
  return <div className="shell">
    <a className="skip" href="#main">{t.skip}</a>
    <aside className="sidebar">
      <button className="brand" onClick={overview} aria-label="Ganesha"><span className="brandmark"><Icon name="spark" size={31} /></span>ganesha<span className="brand-dot">.</span></button>
      <div className="nav"><p className="nav-label">{t.courseLabel}</p><button onClick={overview} aria-current={view !== "step" ? "page" : undefined}><Icon name="grid" />{t.overview}</button><button onClick={() => showStep(progress.currentStepId)} aria-current={view === "step" ? "page" : undefined} disabled={!ready}><Icon name="book" />{t.lessons}</button></div>
      <div className="sidebar-course"><span className="eyebrow">{t.curriculum}</span><p>{course.title}</p><div className="meter" role="progressbar" aria-label={t.progress} aria-valuenow={Math.round(ratio * 100)} aria-valuemin={0} aria-valuemax={100}><span style={{ width: `${ratio * 100}%` }} /></div><p className="small">{new Intl.NumberFormat(course.locale, { style: "percent", maximumFractionDigits: 0 }).format(ratio)}</p></div>
      <div className="sidebar-foot"><span className="pill purple">{t.demo}</span><p>{t.demoNotice}</p><span className="version" dir="ltr">v{course.version}</span></div>
    </aside>
    <div className="workspace">
      <header className="topbar"><p className="breadcrumb">{t.courseLabel}<span aria-hidden="true">/</span><strong>{view === "step" ? t.lessons : t.overview}</strong></p><label className="language"><Icon name="globe" size={18} /><span className="sr-only">{t.language}</span><select value={course.locale} onChange={event => changeLocale(event.target.value as Locale)}>{locales.map(locale => <option key={locale} value={locale} lang={locale}>{localeNames[locale]}</option>)}</select></label></header>
      <main id="main" className="main">
        {recovered && <div className="feedback" role="status">{recoveryText[course.locale]}</div>}
        <div className="demo-strip"><span className="pill purple">{t.demo}</span><p>{t.demoNotice}</p></div>
        <div className="tool-row"><div className="tool-picker" role="group" aria-label={t.tool}><span>{t.tool}</span>{(["claude", "codex"] as LearningTool[]).map(tool => <button key={tool} aria-pressed={progress.tool === tool} disabled={!ready} onClick={() => setProgress(p => ({ ...p, tool }))}><span className={`tool-icon ${tool}`} aria-hidden="true">{tool === "claude" ? "✳" : "⌘"}</span><bdi>{tool === "claude" ? "Claude" : "Codex"}</bdi></button>)}</div><p className={saveError ? "save-error" : "save-status"} role="status">{saveError ? t.localError : ready ? t.localSaved : ""}</p></div>

        {view === "overview" && <>
          <section className="intro"><div><p className="eyebrow">{t.curriculum}</p><h1 ref={heading} tabIndex={-1}>{t.welcome}</h1><p>{t.welcomeBody}</p></div></section>
          <section className="hero"><div className="hero-copy"><span className="pill purple"><Icon name="spark" size={14} />{t.read}</span><h2>{course.title}</h2><p>{course.description}</p><button className="button primary" disabled={!ready} onClick={() => showStep(progress.currentStepId)}>{done > 0 || Object.keys(progress.states).length > 0 ? t.resume : t.start}<Arrow /></button></div><div className="hero-art"><img src="/images/creative-workshop.png" alt="" width="640" height="480" /></div></section>
          <div className="dashboard-grid"><section><div className="section-heading"><h2>{t.curriculum}</h2><span className="small">{t.lessons}: {number(course.lessons.length)}</span></div>{course.lessons.map((item, lessonIndex) => <article key={item.id} className="card journey-card"><div className="journey-head"><span className="lesson-number">{number(lessonIndex + 1).padStart(2,"0")}</span><div><h3>{item.title}</h3><p>{item.summary}</p></div><span className="duration">{interpolate(t.minutes,{ n: number(item.durationMinutes) })}</span></div><ol className="journey">{item.steps.map((itemStep, index) => { const complete = getStepState(progress, itemStep.id).complete; const current = progress.currentStepId === itemStep.id; return <li key={itemStep.id} className={complete ? "done" : current ? "current" : ""}><button onClick={() => showStep(itemStep.id)} disabled={!ready}><span className="node">{complete ? <Icon name="check" /> : number(index + 1)}</span><span className="step-label"><strong>{itemStep.title}</strong><span>{itemStep.check ? t.knowledge : itemStep.practice ? t.practice : t.read}</span></span>{complete ? <span className="pill green">{t.completed}</span> : current ? <span className="pill purple">{t.current}</span> : <Arrow />}</button></li>; })}</ol></article>)}</section><aside className="side-stack"><section className="card progress-card"><div className="progress-orbit" style={{ "--progress": `${ratio * 360}deg` } as React.CSSProperties}><span>{new Intl.NumberFormat(course.locale, { style:"percent", maximumFractionDigits:0 }).format(ratio)}</span></div><h3>{t.progress}</h3><p>{interpolate(t.stepOf, { n: number(done), total: number(flat.length) })}</p><p className="small">{t.demoNotice}</p></section><section className="editorial-note"><Icon name="book" /><p>{t.draftNotice}</p></section></aside></div>
        </>}

        {view === "step" && <>
          <div className="lesson-top"><button className="button ghost" onClick={overview}><span className="back-arrow"><Arrow /></span>{t.overview}</button><div className="lesson-progress"><p>{interpolate(t.stepOf, { n: number(activeIndex + 1), total: number(flat.length) })}</p><div className="track">{flat.map(({step:item}) => <span key={item.id} className={getStepState(progress,item.id).complete ? "filled" : item.id === step.id ? "active" : ""} />)}</div></div></div>
          <div className="lesson-grid"><article className="card stage"><span className="eyebrow">{typeLabel}</span><h1 ref={heading} tabIndex={-1}>{step.title}</h1>{step.objective && <p className="objective">{step.objective}</p>}<div className="prose">{step.body.map((p,i) => <p key={i}>{p}</p>)}</div>{step.callouts?.map((p,i) => <blockquote key={i}>{p}</blockquote>)}
            {step.toolNotes?.[progress.tool] && <details className="tool-note" key={`${step.id}:${progress.tool}`} open={step.executionMode === "external-real-task" || activeIndex === 0}><summary>{t.tool}: <bdi>{progress.tool === "claude" ? "Claude" : "Codex"}</bdi></summary><p>{step.toolNotes[progress.tool]}</p></details>}
            <TeachingVisual step={step} />
            {step.action && <section className="action-block"><h2>{l.action}</h2><p>{step.action}</p></section>}
            {step.practice && <form onSubmit={event => { event.preventDefault(); submitPractice(); }}>
              <p className="activity-notice">{step.executionMode === "external-real-task" ? t.externalNotice : t.practiceNotice}</p><label htmlFor="practice-answer">{t.answer}</label><textarea id="practice-answer" dir="auto" maxLength={12000} rows={6} value={state.draft} placeholder={step.practice.placeholder} onChange={event => setProgress(p => updateStep(p, step.id, { draft: event.target.value, complete: false }))} />
              <fieldset className="criteria"><legend>{t.selfReview}</legend>{step.practice.criteria.map((criterion,index) => <label className="criterion" key={step.practice?.criterionIds?.[index] ?? index}><input type="checkbox" checked={state.criteria.includes(index)} onChange={event => setProgress(p => updateStep(p, step.id, { criteria: event.target.checked ? [...state.criteria, index] : state.criteria.filter(n => n !== index), complete: false }))} /><span>{criterion}</span></label>)}</fieldset>
              <button className="button secondary" type="submit" disabled={!ready || !state.draft.trim() || state.criteria.length !== step.practice.criteria.length}>{t.completePractice}<Icon name="check" size={18} /></button>{state.complete && <div className="feedback good" role="status"><Icon name="check" /><div><strong>{t.completed}</strong><p>{step.practice.feedback}</p><small>{step.executionMode === "external-real-task" ? t.externalNotice : t.practiceNotice}</small></div></div>}
            </form>}
            {step.check && <form onSubmit={event => { event.preventDefault(); submitCheck(); }}><fieldset className="choices"><legend>{step.check.prompt}</legend>{step.check.choices.map(choice => <label className="answer" key={choice.id}><input type="radio" name={step.id} value={choice.id} checked={state.draft === choice.id} onChange={() => setProgress(p => updateStep(p, step.id, { draft: choice.id }))} /><span>{choice.text}</span></label>)}</fieldset><button className="button primary" disabled={!state.draft} type="submit">{t.check}<Icon name="check" size={18} /></button>{feedback && <div className={`feedback ${feedback.passed ? "good" : "error"}`} role="status"><Icon name={feedback.passed ? "check" : "spark"} /><div><strong>{feedback.passed ? t.passed : t.tryAgain}</strong><p>{feedback.feedback}</p><small>{interpolate(t.attempts,{ n: number(state.attempts.length) })}</small></div></div>}</form>}
            {step.expectedResult && !step.practice && <section className="expected"><strong>{l.expected}</strong><p>{step.expectedResult}</p></section>}
            <footer className="stage-footer"><button className="button ghost" disabled={activeIndex === 0} onClick={() => showStep(flat[activeIndex - 1].step.id)}><span className="back-arrow"><Arrow /></span>{t.back}</button><button className="button primary" disabled={!nextEnabled} onClick={next}>{activeIndex === flat.length - 1 ? t.finish : t.next}<Arrow /></button></footer>
          </article><aside className="lesson-aside"><section className="card stage-list"><h2>{lesson.title}</h2><nav aria-label={t.lessons}>{flat.map(({step:item},index) => <button key={item.id} onClick={() => showStep(item.id)} aria-label={`${item.title}${getStepState(progress,item.id).complete ? ` — ${t.completed}` : ""}`} aria-current={item.id === step.id ? "step" : undefined}><span className="dot">{getStepState(progress,item.id).complete ? <Icon name="check" size={13} /> : number(index + 1)}</span><span>{item.title}</span></button>)}</nav></section>{step.hints?.length ? <details className="hint"><summary>{l.hints}</summary>{step.hints.map((hint,index) => <p key={index}>{hint}</p>)}</details> : null}{step.criteria?.length ? <section className="criteria-note"><h3>{t.criteria}</h3>{step.criteria.map((criterion,index) => <p key={index}>{criterion}</p>)}</section> : null}</aside></div>
        </>}
        {view === "complete" && <section className="card completion"><div className="success-art"><Icon name="check" size={48} /></div><p className="eyebrow">{t.completed}</p><h1 ref={heading} tabIndex={-1}>{t.allDone}</h1><p>{t.allDoneBody}</p><button className="button primary" onClick={() => showStep(flat[0].step.id)}>{t.review}<Arrow /></button></section>}
        <p className="edition-note">{t.draftNotice} <span dir="ltr">v{course.version}</span></p>
      </main>
    </div>
  </div>;
}
