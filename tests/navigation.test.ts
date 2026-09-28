import assert from "node:assert/strict";
import test from "node:test";
import { loadDemoCourse } from './course-fixture';
import { lessonCompletedCount, resumeLessonStep } from "../src/lib/lesson-navigation";
import { newProgress, storageKey, updateStep } from "../src/lib/progress";

const course = loadDemoCourse("pt-BR");
const first = course.lessons[0];
const other = { ...first, id: "test.other", steps: first.steps.map(step => ({ ...step, id: `test.other.${step.id}` })) };

test("lesson resume respects pending work and does not copy another lesson's progress", () => {
  let progress = updateStep(newProgress(course), first.steps[0].id, { complete: true });
  assert.equal(resumeLessonStep(first, progress).id, first.steps[1].id);
  assert.equal(lessonCompletedCount(first, progress), 1);
  assert.equal(lessonCompletedCount(other, progress), 0);
  assert.equal(resumeLessonStep(other, progress).id, other.steps[0].id);
  progress = { ...progress, currentStepId: first.steps[3].id };
  assert.equal(resumeLessonStep(first, progress).id, first.steps[3].id);
  for (const step of first.steps) progress = updateStep(progress, step.id, { complete: true });
  assert.equal(resumeLessonStep(first, progress).id, first.steps[0].id);
});

test("classroom progress is isolated from the narrower course demo and older versions", () => {
  const classroom = { ...course, progressScope: "classroom" as const };
  assert.notEqual(storageKey(classroom), storageKey(course));
  assert.notEqual(storageKey(classroom), storageKey({ ...classroom, version: "0.1.0-old" }));
});
