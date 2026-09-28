import assert from "node:assert/strict";
import test from "node:test";
import { loadDemoCourse } from './course-fixture';
import { locales } from "../src/lib/course-schema";
import { ui, uiKeys } from "../src/lib/i18n";
import { labels } from "../src/lib/labels";
import { statusUi } from "../src/lib/status-i18n";
import { recoveryText } from "../src/lib/recovery-i18n";
import { adaptCourse } from "../src/lib/course-adapter";
import { readFileSync } from "node:fs";
import path from "node:path";
import type { Course, LocaleCatalog } from "../contracts/course";
import { demoConfig } from "../src/lib/demo-config";
import { nativeUi } from "../src/lib/native-i18n";
import { classroomUi } from "../src/lib/classroom-i18n";
const contentRoot = path.resolve(process.cwd(), process.env.GANESHA_CONTENT_DIR || "content");
const source = JSON.parse(readFileSync(path.join(contentRoot, "curriculum/course.json"), "utf8")) as Course;
const catalog = JSON.parse(readFileSync(path.join(contentRoot, "locales/pt-BR.json"), "utf8")) as LocaleCatalog;

test("every preview lesson has practice and two separate assessments", () => {
  const course = loadDemoCourse("pt-BR");
  assert.equal(course.lessons.length,1);
  for (const lesson of course.lessons) {
    assert.ok(lesson.steps.filter(s => s.check && s.isAssessment).length >= 2);
    assert.ok(lesson.steps.some(s => s.practice));
    assert.equal(new Set(lesson.steps.map(s => s.id)).size,lesson.steps.length);
    for (const step of lesson.steps) { assert.ok(step.objective); assert.ok(step.action); assert.ok(step.expectedResult); assert.ok(step.hints?.length); assert.ok(step.toolNotes?.claude); assert.ok(step.toolNotes?.codex); }
  }
  assert.ok(course.lessons[0].steps.at(-1)?.practice?.rubricId);
});
test("11 UI locales have every visible string including failures and recovery", () => {
  for (const locale of locales) {
    assert.deepEqual(Object.keys(ui[locale]),[...uiKeys]);
    for (const value of [...Object.values(ui[locale]),...Object.values(labels[locale]),...Object.values(statusUi[locale]),...Object.values(nativeUi[locale]),...Object.values(classroomUi[locale]),recoveryText[locale]]) assert.ok(value.trim());
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
  assert.deepEqual(preview.lessons.map(lesson=>lesson.id),[source.lessons[0].id]);
  assert.equal(preview.lessons[0].steps.length,source.lessons[0].steps.length);
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

test("adapter preserves content block order and avoids repeating identical feedback", () => {
  const copy = structuredClone(source);
  const step = copy.lessons[0].steps[0];
  step.blocks = [
    { id: "test.intro", kind: "paragraph", textKey: step.titleKey },
    { id: "test.code", kind: "code", code: "item,value\na,1" },
    { id: "test.notice", kind: "callout", textKey: step.objectiveKey },
  ];
  const checked = copy.lessons[0].steps.find(item => item.check?.kind === "single-choice")!;
  if (!checked.check || checked.check.kind !== "single-choice") throw new Error("Expected single-choice fixture");
  checked.check.successFeedbackKey = checked.check.options[0].feedbackKey;
  checked.check.retryFeedbackKey = checked.check.options[0].feedbackKey;
  checked.check.options.forEach(option => { option.feedbackKey = checked.check!.successFeedbackKey; });
  const adapted = adaptCourse(copy, catalog, { previewLessonIds: demoConfig.lessonIds });
  assert.deepEqual(adapted.lessons[0].steps[0].contentBlocks?.map(block => block.kind), ["paragraph", "code", "callout"]);
  assert.equal(adapted.lessons[0].steps.find(item => item.id === checked.id)?.check?.choices[0].feedback, catalog.messages[checked.check.successFeedbackKey].value);
});
