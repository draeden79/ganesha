import assert from "node:assert/strict";
import test from "node:test";
import { expandedFixture } from "./fixtures/expanded-course";
import { adaptPublicCourse } from "../src/lib/public-course";
import { getStepState, newProgress, storageKey, updateStep } from "../src/lib/progress";
import { saveLocalProgress, type ProgressStorage } from "../src/lib/progress-storage";

test("quota failure preserves old bytes and the unsaved in-memory answer", () => {
  const { source, catalog } = expandedFixture();
  const course = adaptPublicCourse(source, catalog, "classroom");
  const key = storageKey(course), original = JSON.stringify(newProgress(course));
  const values = new Map([[key, original], [key.replace("0.3.0", "0.2.0"), "old version untouched"]]);
  const storage: ProgressStorage = { getItem: key => values.get(key) ?? null, setItem: () => { throw new DOMException("Quota exceeded", "QuotaExceededError"); } };
  const step = course.lessons[0].steps.find(step => step.practice)!;
  const draft = updateStep(newProgress(course), step.id, { draft: "Unsaved learner answer" });
  const result = saveLocalProgress(storage, course, draft);
  assert.equal(result.saved, false);
  assert.equal(getStepState(result.progress, step.id).draft, "Unsaved learner answer");
  assert.equal(values.get(key), original);
  assert.equal(values.get(key.replace("0.3.0", "0.2.0")), "old version untouched");
  const retry = saveLocalProgress({ ...storage, setItem: (key, value) => { values.set(key, value); } }, course, result.progress);
  assert.equal(retry.saved, true);
  assert.match(values.get(key)!, /Unsaved learner answer/);
});

test("a failed recovery backup never overwrites the damaged source", () => {
  const { source, catalog } = expandedFixture();
  const course = adaptPublicCourse(source, catalog, "classroom");
  const key = storageKey(course), writes: string[] = [];
  const storage: ProgressStorage = { getItem: () => "{damaged", setItem: target => { writes.push(target); throw new DOMException("Quota exceeded", "QuotaExceededError"); } };
  const result = saveLocalProgress(storage, course, newProgress(course));
  assert.equal(result.saved, false);
  assert.equal(writes.length, 1);
  assert.ok(writes[0].startsWith(`${key}:recovery:`));
});
