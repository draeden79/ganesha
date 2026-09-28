import assert from "node:assert/strict";
import test from "node:test";
import { expandedFixture } from "./fixtures/expanded-course";
import { adaptPublicCourse } from "../src/lib/public-course";
import { publicCourseConfig } from "../src/lib/demo-config";
import { nextLessonFor, resumeRouteLesson, routeLessons } from "../src/lib/lesson-navigation";
import { completedCount, flattenSteps, newProgress, storageKey, updateStep } from "../src/lib/progress";

test("version policies preserve0.2 and expose only the first matching demo lesson", () => {
  assert.deepEqual(publicCourseConfig("0.2.0").classroomLessonIds, ["lesson.foundations", "lesson.site", "lesson.app", "lesson.automation"]);
  assert.equal(publicCourseConfig("0.2.0").routes, undefined);
  const { source, catalog } = expandedFixture();
  const course = adaptPublicCourse(source, catalog, "classroom");
  assert.equal(course.lessons.length, 12);
  assert.equal(flattenSteps(course).length, 120);
  assert.deepEqual(adaptPublicCourse(source, catalog, "demo").lessons.map(lesson => lesson.id), ["lesson.workspace"]);
  assert.equal(source.releasedLessonIds.length, 0);
  assert.notEqual(storageKey(course), storageKey({ ...course, version: "0.2.0" }));
  assert.throws(() => publicCourseConfig("unapproved"), /Unsupported/);
});

test("expanded course rejects incomplete content, misplaced checks and cross-route prerequisites", () => {
  for (const mutate of [
    (source: ReturnType<typeof expandedFixture>["source"]) => { source.lessons[0].steps.pop(); },
    (source: ReturnType<typeof expandedFixture>["source"]) => { [source.lessons[0].steps[3], source.lessons[0].steps[4]] = [source.lessons[0].steps[4], source.lessons[0].steps[3]]; },
    (source: ReturnType<typeof expandedFixture>["source"]) => { source.lessons.find(lesson => lesson.id === "lesson.app-state")!.prerequisiteLessonIds = ["lesson.site-publish"]; },
  ]) {
    const { source, catalog } = expandedFixture(); mutate(source);
    assert.throws(() => adaptPublicCourse(source, catalog, "classroom"));
  }
});

test("independent routes never advance from sites into apps or automations", () => {
  const { source, catalog } = expandedFixture();
  const course = adaptPublicCourse(source, catalog, "classroom");
  assert.equal(nextLessonFor(course, "lesson.workspace")?.id, "lesson.requests");
  assert.equal(nextLessonFor(course, "lesson.verification"), undefined);
  assert.equal(nextLessonFor(course, "lesson.site-build")?.id, "lesson.site-quality");
  for (const id of ["lesson.site-publish", "lesson.app-delivery", "lesson.automation-schedule"]) assert.equal(nextLessonFor(course, id), undefined);
  let progress = newProgress(course);
  const route = course.routes!.find(route => route.id === "sites")!;
  const first = resumeRouteLesson(course, route, progress);
  for (const step of first.steps) progress = updateStep(progress, step.id, { complete: true });
  assert.equal(resumeRouteLesson(course, route, progress).id, "lesson.site-quality");
  assert.equal(completedCount(course, progress), 10);
  assert.equal(routeLessons(course, course.routes!.find(route => route.id === "apps")!).every(lesson => lesson.steps.every(step => !progress.states[`claude:${step.id}`]?.complete)), true);
});
