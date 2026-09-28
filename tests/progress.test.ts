import assert from "node:assert/strict";
import test from "node:test";
import { loadCourse } from "../src/lib/course-loader";
import { completedCount, evaluateCheck, flattenSteps, getStepState, mergeProgress, newProgress, restoreProgressWithStatus, stateKey, storageKey, updateStep } from "../src/lib/progress";

const course = loadCourse("pt-BR");
const flat = flattenSteps(course);
const check = flat.find(({step}) => step.check)!.step;
const practice = flat.find(({step}) => step.practice)!.step;
const at = "2026-09-28T12:00:00.000Z";

test("wrong answers give feedback and never pass; valid IDs determine grading", () => {
  const wrong = check.check!.choices.find(c => c.id !== check.check!.correctChoiceId)!;
  assert.equal(evaluateCheck(check,wrong.id)?.passed,false);
  assert.ok(evaluateCheck(check,wrong.id)?.feedback);
  assert.equal(evaluateCheck(check,check.check!.correctChoiceId)?.passed,true);
  assert.equal(evaluateCheck(check,"fabricated-option"),null);
});
test("restore preserves draft, cursor, successful checks, and tool separation", () => {
  let p = newProgress(course);
  p = updateStep(p,check.id,{ draft:check.check!.correctChoiceId, complete:true, attempts:[{ answer:check.check!.correctChoiceId, passed:true, at, evaluator:"deterministic" }] });
  p.currentStepId = check.id;
  const result = restoreProgressWithStatus(JSON.stringify(p),course);
  assert.equal(result.status,"restored");
  assert.equal(result.progress.currentStepId,check.id);
  assert.equal(completedCount(course,result.progress),1);
  assert.equal(completedCount(course,{...result.progress,tool:"codex"}),0);
});
test("stored completion flags cannot make a wrong check pass", () => {
  const wrong = check.check!.choices.find(c => c.id !== check.check!.correctChoiceId)!;
  const p = updateStep(newProgress(course),check.id,{ complete:true, draft:wrong.id, attempts:[{ answer:wrong.id, passed:true, at }] });
  const result = restoreProgressWithStatus(JSON.stringify(p),course);
  assert.equal(result.status,"recovered");
  assert.equal(getStepState(result.progress,check.id).complete,false);
  assert.equal(getStepState(result.progress,check.id).attempts[0].passed,false);
});
test("practice needs an explicit self-report with every rubric criterion", () => {
  const criteria = practice.practice!.criteria.map((_,index) => index);
  const p = updateStep(newProgress(course),practice.id,{ complete:true, draft:"Meu plano e os critérios observáveis.", criteria, attempts:[{ answer:"Meu plano e os critérios observáveis.", passed:true, at, criteria, evaluator:"self-report" }] });
  assert.equal(getStepState(restoreProgressWithStatus(JSON.stringify(p),course).progress,practice.id).complete,true);
  p.states[stateKey("claude",practice.id)].criteria = [0,0,999];
  const result = restoreProgressWithStatus(JSON.stringify(p),course);
  assert.equal(result.status,"recovered");
  assert.deepEqual(getStepState(result.progress,practice.id).criteria,[0]);
  assert.equal(getStepState(result.progress,practice.id).complete,false);
});
test("malformed, incompatible and unknown data recover without throwing", () => {
  assert.equal(restoreProgressWithStatus("{broken",course).status,"corrupt");
  assert.equal(restoreProgressWithStatus("null",course).status,"corrupt");
  assert.equal(restoreProgressWithStatus(JSON.stringify({...newProgress(course),courseVersion:"old"}),course).status,"incompatible");
  const p = { ...newProgress(course), currentStepId:"removed-step", states:{ bogus:{ complete:true } } };
  const result = restoreProgressWithStatus(JSON.stringify(p),course);
  assert.equal(result.status,"recovered");
  assert.equal(result.progress.currentStepId,flat[0].step.id);
  assert.equal(completedCount(course,result.progress),0);
});
test("separate version storage keys preserve old course state", () => {
  assert.notEqual(storageKey(course),storageKey({...course,version:"next"}));
});
test("two tabs merge independent steps and preserve their own cursor", () => {
  const local = updateStep(newProgress(course),practice.id,{ draft:"Texto novo",updatedAt:"2026-09-28T12:02:00Z" });
  const remote = updateStep(newProgress(course),check.id,{ draft:check.check!.correctChoiceId, complete:true, attempts:[{ answer:check.check!.correctChoiceId, passed:true, at }] });
  remote.currentStepId = check.id;
  const merged = mergeProgress(local,remote,course);
  assert.equal(getStepState(merged,practice.id).draft,"Texto novo");
  assert.equal(getStepState(merged,check.id).complete,true);
  assert.equal(merged.currentStepId,local.currentStepId);
});
test("a stale tab cannot replace a newer draft", () => {
  const older = updateStep(newProgress(course),practice.id,{ draft:"Antigo" });
  const newer = updateStep(newProgress(course),practice.id,{ draft:"Novo" });
  older.states[stateKey("claude",practice.id)].updatedAt = "2026-09-28T12:00:00Z";
  newer.states[stateKey("claude",practice.id)].updatedAt = "2026-09-28T12:05:00Z";
  assert.equal(getStepState(mergeProgress(older,newer,course),practice.id).draft,"Novo");
});
test("two tabs retain, order and deduplicate attempts with consistent completion", () => {
  const wrong = check.check!.choices.find(c => c.id !== check.check!.correctChoiceId)!.id;
  const first = { answer:wrong,passed:false,at:"2026-09-28T12:00:00Z",evaluator:"deterministic" as const };
  const second = { answer:check.check!.correctChoiceId,passed:true,at:"2026-09-28T12:01:00Z",evaluator:"deterministic" as const };
  const older = updateStep(newProgress(course),check.id,{ draft:wrong,complete:false,attempts:[first] });
  const newer = updateStep(newProgress(course),check.id,{ draft:second.answer,complete:true,attempts:[first,second] });
  // A tab can have a later draft edit but an earlier submitted attempt.
  older.states[stateKey("claude",check.id)].updatedAt = "2026-09-28T12:02:00Z";
  newer.states[stateKey("claude",check.id)].updatedAt = "2026-09-28T12:01:00Z";
  const merged = mergeProgress(older,newer,course);
  const state = getStepState(merged,check.id);
  assert.deepEqual(state.attempts,[first,second]);
  assert.equal(state.complete,true);
  assert.equal(evaluateCheck(check,state.attempts.at(-1)!.answer)?.passed,true);
  assert.deepEqual(getStepState(mergeProgress(merged,newer,course),check.id).attempts,[first,second]);
  const restored = restoreProgressWithStatus(JSON.stringify(merged),course);
  assert.equal(getStepState(restored.progress,check.id).complete,state.complete);
});
