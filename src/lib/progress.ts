import { type Course, type LearningTool, type Step } from "./course-schema";

export interface Attempt { answer: string; passed: boolean; at: string; criteria?: number[]; evaluator?: "self-report" | "deterministic" }
export interface StepState { draft: string; criteria: number[]; attempts: Attempt[]; complete: boolean; updatedAt?: string }
export interface Progress {
  schemaVersion: 1;
  courseId: string;
  courseVersion: string;
  currentStepId: string;
  tool: LearningTool;
  states: Record<string, StepState>;
  updatedAt: string;
}
export const emptyStep = (): StepState => ({ draft: "", criteria: [], attempts: [], complete: false });
export const stateKey = (tool: LearningTool, stepId: string) => `${tool}:${stepId}`;
export const storageKey = (course: Course) => `ganesha:demo:${course.id}:${course.version}`;
export const flattenSteps = (course: Course) => course.lessons.flatMap(lesson => lesson.steps.map(step => ({ lesson, step })));
export function newProgress(course: Course): Progress {
  return { schemaVersion: 1, courseId: course.id, courseVersion: course.version, currentStepId: flattenSteps(course)[0]?.step.id ?? "", tool: "claude", states: {}, updatedAt: new Date().toISOString() };
}
export type RestoreStatus = "fresh" | "restored" | "corrupt" | "incompatible" | "recovered";
export function restoreProgressWithStatus(raw: string | null, course: Course): { progress: Progress; status: RestoreStatus } {
  const initial = newProgress(course);
  if (!raw) return { progress: initial, status: "fresh" };
  try {
    const p = JSON.parse(raw);
    if (!p || typeof p !== "object") return { progress: initial, status: "corrupt" };
    if (p.schemaVersion !== 1 || p.courseId !== course.id || p.courseVersion !== course.version) return { progress: initial, status: "incompatible" };
    if ((p.tool !== "claude" && p.tool !== "codex") || !p.states || typeof p.states !== "object" || Array.isArray(p.states)) return { progress: initial, status: "corrupt" };
    const steps = flattenSteps(course).map(({step}) => step);
    const ids = new Set(steps.map(step => step.id));
    const states: Record<string, StepState> = {};
    let recovered = !ids.has(p.currentStepId);
    for (const [key, value] of Object.entries(p.states ?? {})) {
      const v = value as StepState;
      const step = steps.find(step => key === stateKey("claude", step.id) || key === stateKey("codex", step.id));
      if (!step || !v || typeof v.draft !== "string" || !Array.isArray(v.criteria) || !Array.isArray(v.attempts)) { recovered = true; continue; }
      const validCriteria = (values: number[]) => [...new Set(values.filter(n => Number.isInteger(n) && n >= 0 && n < (step.practice?.criteria.length ?? 0)))].sort((a,b) => a-b);
      const criteria = validCriteria(v.criteria);
      const draft = step.check ? (step.check.choices.some(c => c.id === v.draft) ? v.draft : "") : v.draft.slice(0, 12000);
      const attempts = v.attempts.filter(a => a && typeof a.answer === "string" && typeof a.at === "string" && Number.isFinite(Date.parse(a.at)) && (!step.check || step.check.choices.some(c => c.id === a.answer))).slice(-50).map(a => ({ ...a, answer: a.answer.slice(0,12000), passed: step.check ? a.answer === step.check.correctChoiceId : Boolean(a.answer.trim() && a.evaluator === "self-report" && Array.isArray(a.criteria) && validCriteria(a.criteria).length === step.practice?.criteria.length), criteria: Array.isArray(a.criteria) ? validCriteria(a.criteria) : undefined }));
      const last = attempts.at(-1);
      const complete = step.check ? Boolean(last?.passed) : step.practice ? Boolean(last?.passed && last.answer === draft && criteria.length === step.practice.criteria.length) : v.complete === true;
      states[key] = { draft, complete, criteria, attempts, updatedAt: typeof v.updatedAt === "string" && Number.isFinite(Date.parse(v.updatedAt)) ? v.updatedAt : last?.at ?? initial.updatedAt };
      if (draft !== v.draft || complete !== v.complete || criteria.length !== v.criteria.length || attempts.length !== v.attempts.length || attempts.some((a,i) => a.passed !== v.attempts[i]?.passed)) recovered = true;
    }
    return { progress: { ...initial, tool: p.tool, currentStepId: ids.has(p.currentStepId) ? p.currentStepId : initial.currentStepId, states }, status: recovered ? "recovered" : "restored" };
  } catch { return { progress: initial, status: "corrupt" }; }
}
export function restoreProgress(raw: string | null, course: Course): Progress { return restoreProgressWithStatus(raw, course).progress; }
export function getStepState(progress: Progress, stepId: string) { return progress.states[stateKey(progress.tool, stepId)] ?? emptyStep(); }
export function completedCount(course: Course, progress: Progress) { return flattenSteps(course).filter(({step}) => getStepState(progress, step.id).complete).length; }
export function evaluateCheck(step: Step, choiceId: string) {
  const choice = step.check?.choices.find(choice => choice.id === choiceId);
  if (!choice) return null;
  return { passed: choice.id === step.check?.correctChoiceId, feedback: choice.feedback };
}
export function updateStep(progress: Progress, stepId: string, patch: Partial<StepState>): Progress {
  const key = stateKey(progress.tool, stepId);
  const updatedAt = new Date().toISOString();
  return { ...progress, states: { ...progress.states, [key]: { ...getStepState(progress, stepId), ...patch, updatedAt } }, updatedAt };
}

/** Keep the active tab's cursor; merge independent steps and retain attempts from both tabs. */
export function mergeProgress(local: Progress, remote: Progress, course: Course): Progress {
  if (local.courseId !== remote.courseId || local.courseVersion !== remote.courseVersion) return local;
  const states: Record<string,StepState> = { ...remote.states, ...local.states };
  for (const key of Object.keys(states)) {
    const left = local.states[key], right = remote.states[key];
    if (!left || !right) continue;
    const latest = (left.updatedAt ?? "") >= (right.updatedAt ?? "") ? left : right;
    const attempts = [...new Map([...right.attempts,...left.attempts].map(attempt => [`${attempt.at}:${attempt.answer}:${attempt.evaluator}`, attempt])).values()].sort((a,b) => a.at.localeCompare(b.at)).slice(-50);
    const step = flattenSteps(course).find(({step}) => key === stateKey("claude",step.id) || key === stateKey("codex",step.id))?.step;
    const last = attempts.at(-1);
    const complete = step?.check ? Boolean(last && last.answer === step.check.correctChoiceId) : step?.practice ? Boolean(last?.evaluator === "self-report" && last.answer === latest.draft && latest.criteria.length === step.practice.criteria.length && last.criteria?.length === step.practice.criteria.length) : latest.complete;
    states[key] = { ...latest, complete, attempts };
  }
  return { ...local, states };
}
