import assert from "node:assert/strict";
import test from "node:test";
import { loadDemoCourse } from "../src/lib/course-loader";
import { locales } from "../src/lib/course-schema";
import { ui, uiKeys } from "../src/lib/i18n";
import { labels } from "../src/lib/labels";
import { statusUi } from "../src/lib/status-i18n";
import { recoveryText } from "../src/lib/recovery-i18n";
import { adaptCourse } from "../src/lib/course-adapter";
import source from "../content/curriculum/course.json";
import catalog from "../content/locales/pt-BR.json";
import type { Course, LocaleCatalog } from "../contracts/course";
import { demoConfig } from "../src/lib/demo-config";

test("every preview lesson has practice and two separate assessments", () => {
  const course = loadDemoCourse("pt-BR");
  assert.equal(course.lessons.length,1);
  for (const lesson of course.lessons) {
    assert.ok(lesson.steps.filter(s => s.check && s.isAssessment).length >= 2);
    assert.ok(lesson.steps.some(s => s.practice));
    assert.equal(new Set(lesson.steps.map(s => s.id)).size,lesson.steps.length);
    for (const step of lesson.steps) { assert.ok(step.objective); assert.ok(step.action); assert.ok(step.expectedResult); assert.ok(step.hints?.length); assert.ok(step.toolNotes?.claude); assert.ok(step.toolNotes?.codex); }
  }
  assert.equal(course.lessons[0].steps.at(-1)?.practice?.rubricId,"rubric.transfer");
});
test("11 UI locales have every visible string including failures and recovery", () => {
  for (const locale of locales) {
    assert.deepEqual(Object.keys(ui[locale]),[...uiKeys]);
    for (const value of [...Object.values(ui[locale]),...Object.values(labels[locale]),...Object.values(statusUi[locale]),recoveryText[locale]]) assert.ok(value.trim());
  }
});
test("missing or stale pedagogical translations fail explicitly without fallback", () => {
  const copy = structuredClone(catalog) as LocaleCatalog;
  delete copy.messages[source.titleKey];
  assert.throws(() => adaptCourse(source as Course,copy),/Incomplete translation/);
  const stale = structuredClone(catalog) as LocaleCatalog;
  stale.messages[source.titleKey].sourceRevision = "old";
  assert.throws(() => adaptCourse(source as Course,stale),/Incomplete translation/);
});
test("a draft remains out of released content but is allowed by explicit demo scope", () => {
  const draft = structuredClone(source) as Course;
  draft.releasedLessonIds = [];
  draft.lessons.forEach(lesson => { lesson.status = "draft"; });
  assert.equal(adaptCourse(draft,catalog as LocaleCatalog).lessons.length,0);
  const preview = adaptCourse(draft,catalog as LocaleCatalog,{previewLessonIds:demoConfig.lessonIds});
  assert.deepEqual(preview.lessons.map(lesson=>lesson.id),["lesson.first-request"]);
  assert.equal(preview.lessons[0].steps.length,7);
  assert.equal(preview.id,source.id);
  assert.equal(preview.version,source.version);
  draft.lessons[0].status = "planned";
  assert.equal(adaptCourse(draft,catalog as LocaleCatalog,{previewLessonIds:demoConfig.lessonIds}).lessons.length,0);
});
test("a listed draft is still excluded unless the explicit demo scope is used", () => {
  const draft = structuredClone(source) as Course;
  draft.lessons[0].status = "draft";
  draft.releasedLessonIds = [draft.lessons[0].id];
  assert.equal(adaptCourse(draft,catalog as LocaleCatalog).lessons.length,0);
  assert.equal(adaptCourse(draft,catalog as LocaleCatalog,{previewLessonIds:demoConfig.lessonIds}).lessons.length,1);
  draft.lessons[0].status = "ready";
  assert.equal(adaptCourse(draft,catalog as LocaleCatalog).lessons.length,1);
});
