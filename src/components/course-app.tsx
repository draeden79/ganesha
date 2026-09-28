"use client";

import { useEffect, useRef, useState } from "react";
import { type Course, type LearningTool, type Locale, localeNames, locales } from "@/lib/course-schema";
import { completedCount, evaluateCheck, flattenSteps, getStepState, mergeProgress, newProgress, restoreProgressWithStatus, storageKey, updateStep, type Progress } from "@/lib/progress";
import { interpolate, ui } from "@/lib/i18n";
import { labels } from "@/lib/labels";
import { recoveryText } from "@/lib/recovery-i18n";
import { TeachingVisual } from "./teaching-visual";
import { nativeUi } from "@/lib/native-i18n";
import { classroomUi } from "@/lib/classroom-i18n";
import { lessonCompletedCount, resumeLessonStep } from "@/lib/lesson-navigation";

function Icon({ name, size = 20 }: { name: "grid" | "book" | "arrow" | "check" | "spark" | "globe" | "info" | "pen" | "page"; size?: number }) {
  const paths = { info: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0M12 11v6M12 7v.1", pen: "m15 4 5 5-10 10-6 1 1-6zM13 6l5 5", page: "M5 3h10l4 4v14H5zM14 3v5h5M8 12h8M8 16h6", grid: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z", book: "M12 5v16M12 5C8 2 4 3 2 4v15c4-2 7-1 10 2 3-3 6-4 10-2V4c-2-1-6-2-10 1Z", arrow: "M5 12h14M13 6l6 6-6 6", check: "m5 12 4 4L19 6", spark: "m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z", globe: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18Z" };
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={paths[name]} /></svg>;
}
function Arrow() { return <span className="arrow"><Icon name="arrow" size={18} /></span>; }

export function CourseApp({ course, routeBase = "/course" }: { course: Course; routeBase?: "/course" | "/classroom" }) {
  const t = ui[course.locale];
  const l = labels[course.locale];
  const n = nativeUi[course.locale];
  const c = classroomUi[course.locale];
  const beta = routeBase === "/classroom";
  const number = (n: number) => new Intl.NumberFormat(course.locale).format(n);
  const flat = flattenSteps(course);
  const [progress, setProgress] = useState<Progress>(() => newProgress(course));
  const [ready, setReady] = useState(false);
  const [view, setView] = useState<"overview" | "step" | "complete">("overview");
  const [saveError, setSaveError] = useState(false);
  const [recovered, setRecovered] = useState(false);
  const savingAllowed = useRef(true);
  const heading = useRef<HTMLHeadingElement>(null);
  const railCards = useRef(new Map<string, HTMLButtonElement>());
  const dialog = useRef<HTMLDialogElement>(null);
  const dialogTrigger = useRef<HTMLElement | null>(null);
  const [dialogKind, setDialogKind] = useState<"help" | "steps" | null>(null);
  const activeIndex = Math.max(0, flat.findIndex(({step}) => step.id === progress.currentStepId));
  const { lesson, step } = flat[activeIndex];
  const state = getStepState(progress, step.id);
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
  useEffect(() => { if (ready && view !== "overview") heading.current?.focus(); }, [view, progress.currentStepId, ready]);
  useEffect(() => { if (view === "overview") railCards.current.get(progress.currentStepId)?.scrollIntoView({ block: "nearest", inline: "nearest" }); }, [view, progress.currentStepId]);
  useEffect(() => { if (dialogKind && !dialog.current?.open) dialog.current?.showModal(); }, [dialogKind]);

  function showStep(id: string) {
    setProgress(p => ({ ...p, currentStepId: id })); setView("step");
    history.replaceState(null, "", `#${encodeURIComponent(id)}`);
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  function overview() { setView("overview"); history.replaceState(null, "", window.location.pathname); }
  function changeLocale(locale: Locale) {
    document.cookie = `ganesha-locale=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
    window.location.assign(`${routeBase}/${locale}${view === "step" ? `#${encodeURIComponent(step.id)}` : ""}`);
  }
  function next() {
    const updated = step.check || step.practice ? progress : updateStep(progress, step.id, { complete: true });
    setProgress(updated);
    if (lastLessonStep && nextLesson) showStep(resumeLessonStep(nextLesson, updated).id);
    else if (activeIndex < flat.length - 1) showStep(flat[activeIndex + 1].step.id);
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
  const stepPosition = lesson.steps.findIndex(item => item.id === step.id);
  const nextLesson = course.lessons[course.lessons.findIndex(item => item.id === lesson.id) + 1];
  const lastLessonStep = stepPosition === lesson.steps.length - 1;
  const totalCompleted = completedCount(course, progress);
  const completedLessons = course.lessons.filter(item => lessonCompletedCount(item, progress) === item.steps.length).length;
  const progressLabel = interpolate(t.stepOf, { n: number(stepPosition + 1), total: number(lesson.steps.length) });
  const hasDiagram = Boolean(step.visualDescription && step.id !== "step.first-request.request-check" && (!step.practice || step.executionMode === "external-real-task" || step.id === "step.first-request.transfer"));
  const showArt = step.id === "step.first-request.scope";
  const practiceNotice = step.executionMode === "external-real-task"
    ? (step.hasCanonicalExecutionNotice ? null : t.externalNotice)
    : t.practiceNotice;
  const languageSelect = (
    <select aria-label={t.language} value={course.locale} onChange={event => changeLocale(event.target.value as Locale)}>
      {locales.map(locale => <option key={locale} value={locale} lang={locale}>{localeNames[locale]}</option>)}
    </select>
  );
  const toolSelect = (
    <select aria-label={t.tool} value={progress.tool} disabled={!ready} onChange={event => setProgress(p => ({ ...p, tool: event.target.value as LearningTool }))}>
      <option value="claude">Claude</option><option value="codex">Codex</option>
    </select>
  );
  const demoInfo = (
    <div className="demo-info">
      <details className="context-note">
        <summary><Icon name="info" size={14} />{beta ? c.betaReview : n.previewReview}</summary>
        <p>{t.demoNotice}</p><p>{t.draftNotice}</p>
        <p>{ready && !saveError ? t.localSaved : ""} <span dir="ltr">v{course.version}</span></p>
      </details>
      {saveError && <p className="save-error" role="alert">{t.localError}</p>}
    </div>
  );
  const recoveryNotice = recovered && <p className="recovery-notice" role="status">{recoveryText[course.locale]}</p>;

  function selectPreview(id: string, focus = false) {
    setProgress(p => ({ ...p, currentStepId: id }));
    if (focus) requestAnimationFrame(() => railCards.current.get(id)?.focus());
  }
  function movePreview(direction: number) {
    const index = Math.max(0, Math.min(lesson.steps.length - 1, stepPosition + direction));
    selectPreview(lesson.steps[index].id);
  }
  function openDialog(kind: "help" | "steps") {
    dialogTrigger.current = document.activeElement as HTMLElement;
    setDialogKind(kind);
  }
  function closeDialog() { dialog.current?.close(); }

  return <>
    <a className="skip" href="#main">{t.skip}</a>
    {view === "overview" ? (
      <div className="native-home">
        <aside className="native-sidebar">
          <button className="native-brand" onClick={overview} aria-label="Ganesha">
            <img src="/classroom/images/native/ganesha-symbol.png" alt="" width="33" height="38" /><span>Ganesha</span>
          </button>
          <p className="side-caption">{t.lessons}</p>
          <nav className="lesson-navigation" aria-label={t.lessons}>
            {course.lessons.map(item => {
              const count = lessonCompletedCount(item, progress);
              return <button key={item.id} className="lesson-nav" aria-current={item.id === lesson.id ? "page" : undefined} disabled={!ready} onClick={() => selectPreview(resumeLessonStep(item, progress).id)}>
                <span className="lesson-symbol"><Icon name="book" size={16} /></span>
                <span><strong>{item.title}</strong><small>{t.progress}: <bdi dir="ltr">{number(count)} / {number(item.steps.length)}</bdi></small></span>
              </button>;
            })}
          </nav>
          <label className="mobile-lesson-select">{c.chooseLesson}
            <select value={lesson.id} disabled={!ready} onChange={event => {
              const selected = course.lessons.find(item => item.id === event.target.value);
              if (selected) selectPreview(resumeLessonStep(selected, progress).id);
            }}>{course.lessons.map(item => <option value={item.id} key={item.id}>{item.title} · {number(lessonCompletedCount(item, progress))}/{number(item.steps.length)}</option>)}</select>
          </label>
          <div className="side-bottom">
            <div className="course-progress" aria-live="polite"><p>{t.lessons}: <bdi dir="ltr">{number(completedLessons)} / {number(course.lessons.length)}</bdi></p><p>{t.progress}: <bdi dir="ltr">{number(totalCompleted)} / {number(flat.length)}</bdi></p><progress value={totalCompleted} max={flat.length} aria-label={t.progress} /></div>
            <div className="side-controls">
              <div className="select-row"><Icon name="globe" size={15} />{languageSelect}</div>
              <div className="select-row"><Icon name="spark" size={15} />{toolSelect}</div>
            </div>
            {demoInfo}
          </div>
        </aside>
        <main id="main" className="native-board">
          {recoveryNotice}
          <header className="board-header">
            <h1 ref={heading} tabIndex={-1}>{n.lessonSteps} <span>{lesson.title}</span></h1>
            <div className="rail-controls">
              <button className="icon-button" onClick={() => movePreview(-1)} disabled={!ready || stepPosition === 0} aria-label={t.back}><span className="back-arrow"><Arrow /></span></button>
              <button className="icon-button" onClick={() => movePreview(1)} disabled={!ready || stepPosition === lesson.steps.length - 1} aria-label={t.next}><Arrow /></button>
            </div>
          </header>
          <div className="rail-viewport">
            <ol className="step-rail" aria-label={n.lessonSteps}>
              {lesson.steps.map((item, index) => {
                const complete = getStepState(progress, item.id).complete;
                const active = item.id === step.id;
                return <li key={item.id}>
                  <button
                    ref={element => { if (element) railCards.current.set(item.id, element); else railCards.current.delete(item.id); }}
                    className={`step-card${active ? " active" : ""}${complete ? " complete" : ""}`}
                    aria-label={`${item.title}${complete ? ` — ${t.completed}` : ""}`}
                    aria-current={active ? "step" : undefined}
                    disabled={!ready}
                    onClick={() => selectPreview(item.id)}
                    onKeyDown={event => {
                      const forward = course.locale === "ar" ? "ArrowLeft" : "ArrowRight";
                      const backward = course.locale === "ar" ? "ArrowRight" : "ArrowLeft";
                      const destination = event.key === "Home" ? 0 : event.key === "End" ? lesson.steps.length - 1 : event.key === forward ? index + 1 : event.key === backward ? index - 1 : null;
                      if (destination !== null) { event.preventDefault(); selectPreview(lesson.steps[Math.max(0, Math.min(lesson.steps.length - 1, destination))].id, true); }
                    }}
                  >
                    <span className="step-symbol" aria-hidden="true">{complete ? <Icon name="check" size={17} /> : active ? "" : <Icon name={item.check ? "check" : item.practice ? "pen" : "page"} size={16} />}</span>
                    <strong>{item.title}</strong>
                    <small>{item.check ? t.knowledge : item.practice ? t.practice : t.read}</small>
                    {(active || complete) && <span className="state-dot">{complete ? t.completed : t.current}</span>}
                  </button>
                </li>;
              })}
            </ol>
          </div>
          <section className={`stage-preview${stepPosition === 0 ? " merge-start" : ""}`} aria-labelledby="preview-heading">
            <div className="preview-main">
              <div className="preview-copy"><h2 id="preview-heading">{step.title}</h2><p>{step.objective}</p>{step.expectedResult !== step.objective && <p className="preview-result">{step.expectedResult}</p>}</div>
              <img className="preview-figure" src="/classroom/images/creative-workshop-transparent.png" alt="" width="300" height="300" />
            </div>
            <div className="preview-bottom"><button className="button primary" disabled={!ready} onClick={() => showStep(step.id)}>{state.complete ? t.review : n.startStep}<Arrow /></button></div>
          </section>
        </main>
      </div>
    ) : (
      <div className="focus-root">
        <header className="focusbar">
          <div className="focus-left"><button className="button ghost" onClick={overview}><span className="back-arrow"><Arrow /></span>{t.back}</button><span>{lesson.title}</span></div>
          <div className="focus-progress"><span>{typeLabel}</span><div className="progress-dots" aria-hidden="true">{lesson.steps.map(item => <i key={item.id} className={item.id === step.id ? "current" : getStepState(progress, item.id).complete ? "complete" : ""} />)}</div></div>
          <div className="focus-actions">{languageSelect}<button className="button ghost" onClick={() => openDialog("steps")} aria-label={`${n.lessonSteps}: ${progressLabel}`}><Icon name="book" size={16} /><bdi dir="ltr">{number(stepPosition + 1)} / {number(lesson.steps.length)}</bdi></button></div>
        </header>
        <main id="main" className="lesson-sheet">
          {recoveryNotice}
          {view === "complete" ? (
            <section className="sheet-summary">
              <img src="/classroom/images/native/ganesha-help.png" alt="" width="130" height="150" />
              <h1 ref={heading} tabIndex={-1}>{beta ? c.allDone : t.allDone}</h1><p>{beta ? c.allDoneBody : t.allDoneBody}</p>
              <button className="button primary" onClick={overview}>{t.review}<Arrow /></button>
            </section>
          ) : <>
            <h1 ref={heading} tabIndex={-1}>{step.title}</h1>
            <div className={`lesson-grid${!showArt && !hasDiagram ? " text-only" : ""}`}>
              <div className="lesson-copy">
                {step.objective && <p className="objective">{step.objective}</p>}
                {step.contentBlocks ? step.contentBlocks.map((block, index) => block.kind === "code"
                  ? <pre className="lesson-code" key={index} dir="ltr"><code>{block.text}</code></pre>
                  : block.kind === "callout" ? <blockquote className="lesson-callout" key={index}>{block.text}</blockquote>
                  : <p key={index}>{block.text}</p>) : <>{step.body.map((paragraph, index) => <p key={index}>{paragraph}</p>)}{step.callouts?.map((paragraph, index) => <blockquote className="lesson-callout" key={index}>{paragraph}</blockquote>)}</>}
              </div>
              {showArt ? <aside className="art-aside"><img className="lesson-art" src="/classroom/images/creative-workshop-transparent.png" alt="" width="230" height="230" /></aside> : hasDiagram ? <aside className="visual-aside"><TeachingVisual step={step} /></aside> : null}
            </div>
            <div className="tool-context">
              <details className="tool-instruction" key={`${step.id}:${progress.tool}`} open={step.executionMode === "external-real-task"}>
                <summary><Icon name="spark" size={16} />{t.tool}</summary>
                <p>{step.toolNotes?.[progress.tool]}</p>
              </details>
              <div className="inline-tool-select">{toolSelect}</div>
            </div>
            {lesson.id === "lesson.automation" && step.practice && <p className="example-files"><span>{c.exampleFiles}: </span><a href="/classroom/exercises/vendas.csv" download>CSV</a><span> · </span><a href="/classroom/exercises/report.py" download>Python</a><span> · </span><a href="/classroom/exercises/csv-report.html" target="_blank" rel="noopener noreferrer">HTML · {localeNames["pt-BR"]}</a></p>}
            <section className="activity">
              {step.practice ? (
                <form onSubmit={event => { event.preventDefault(); submitPractice(); }}>
                  {practiceNotice && <p className="mode-notice">{practiceNotice}</p>}
                  <label className="activity-label" htmlFor="practice-answer">{step.action ?? t.answer}</label>
                  <textarea id="practice-answer" className="draft" aria-label={t.answer} dir="auto" maxLength={12000} rows={5} value={state.draft} placeholder={step.practice.placeholder} onChange={event => setProgress(p => updateStep(p, step.id, { draft: event.target.value, complete: false }))} />
                  <fieldset className="review-list"><legend>{t.selfReview}</legend>
                    {step.practice.criteria.map((criterion, index) => <label className="criterion" key={step.practice?.criterionIds?.[index] ?? index}>
                      <input type="checkbox" checked={state.criteria.includes(index)} onChange={event => setProgress(p => updateStep(p, step.id, { criteria: event.target.checked ? [...state.criteria, index] : state.criteria.filter(value => value !== index), complete: false }))} />
                      <span>{criterion}</span>
                    </label>)}
                  </fieldset>
                  <button className="button secondary" type="submit" disabled={!ready || !state.draft.trim() || state.criteria.length !== step.practice.criteria.length}>{t.completePractice}<Icon name="check" size={18} /></button>
                  {state.complete && <div className="feedback good" role="status"><Icon name="check" /><div><strong>{t.completed}</strong><p>{step.practice.feedback}</p>{practiceNotice && <small>{practiceNotice}</small>}</div></div>}
                </form>
              ) : <>
                {step.action && <p className="activity-instruction">{step.action}</p>}
                {step.check && <form onSubmit={event => { event.preventDefault(); submitCheck(); }}>
                  <fieldset className="check-group"><legend>{step.check.prompt}</legend>
                    {step.check.choices.map(choice => <label className="answer" key={choice.id}>
                      <input type="radio" name={step.id} value={choice.id} checked={state.draft === choice.id} onChange={() => setProgress(p => updateStep(p, step.id, { draft: choice.id }))} /><span>{choice.text}</span>
                    </label>)}
                  </fieldset>
                  <button className="button secondary" disabled={!state.draft} type="submit">{t.check}<Icon name="check" size={18} /></button>
                  {feedback && <div className={`feedback ${feedback.passed ? "good" : "error"}`} role="status"><Icon name={feedback.passed ? "check" : "info"} /><div><strong>{feedback.passed ? t.passed : t.tryAgain}</strong><p>{feedback.feedback}</p><small>{interpolate(t.attempts, { n: number(state.attempts.length) })}</small></div></div>}
                </form>}
              </>}
            </section>
            {step.expectedResult && <p className="expected"><strong>{l.expected}: </strong>{step.expectedResult}</p>}
            <footer className="lesson-footer">
              <button className="button ghost" disabled={activeIndex === 0} onClick={() => showStep(flat[activeIndex - 1].step.id)}><span className="back-arrow"><Arrow /></span>{t.back}</button>
              <button className="button primary" disabled={!nextEnabled} onClick={next}>{lastLessonStep && nextLesson ? c.nextLesson : activeIndex === flat.length - 1 ? t.finish : t.next}<Arrow /></button>
            </footer>
          </>}
          <div className="sheet-bottom">{demoInfo}{view === "step" && <button className="help-button" onClick={() => openDialog("help")}><img src="/classroom/images/native/ganesha-help.png" alt="" width="32" height="42" />{n.help}</button>}</div>
        </main>
      </div>
    )}
    <dialog ref={dialog} aria-labelledby="course-dialog-title" onClose={() => { setDialogKind(null); dialogTrigger.current?.focus(); }}>
      <button className="close" onClick={closeDialog} aria-label={n.close}>×</button>
      <h2 id="course-dialog-title">{dialogKind === "steps" ? n.lessonSteps : l.hints}</h2>
      {dialogKind === "steps" ? <ol className="modal-steps">{lesson.steps.map((item, index) => <li key={item.id}>
        <button className={item.id === step.id ? "current" : ""} aria-current={item.id === step.id ? "step" : undefined} onClick={() => { closeDialog(); showStep(item.id); }}>
          <span>{number(index + 1)}. {item.title}</span>{getStepState(progress, item.id).complete && <span className="modal-state"><Icon name="check" size={16} />{t.completed}</span>}
        </button>
      </li>)}</ol> : <>
        {step.hints?.map((hint, index) => <p key={index}>{hint}</p>)}
        <h3>{t.criteria}</h3>{step.criteria?.map((criterion, index) => <p key={index}>{criterion}</p>)}
      </>}
    </dialog>
  </>;
}
