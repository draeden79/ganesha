import assert from "node:assert/strict";
import { loadClassroomCourse, loadDemoCourse } from '../tests/course-fixture';
import { locales } from "../src/lib/course-schema";
import { ui } from "../src/lib/i18n";
import { flattenSteps } from "../src/lib/progress";
const loadCourse = process.argv.includes("--classroom") ? loadClassroomCourse : loadDemoCourse;
const base = loadCourse("pt-BR");
const ids = flattenSteps(base).map(({step}) => ({ id:step.id, choices:step.check?.choices.map(c=>c.id), criteria:step.practice?.criterionIds }));
let failures = 0;
for (const locale of locales) {
  try {
    const course = loadCourse(locale);
    assert.deepEqual(Object.keys(ui[locale]),Object.keys(ui["pt-BR"]));
    assert.deepEqual(flattenSteps(course).map(({step})=>({ id:step.id, choices:step.check?.choices.map(c=>c.id), criteria:step.practice?.criterionIds })),ids);
    assert.ok(course.lessons.every(l => l.steps.filter(s=>s.check).length >= 2 && l.steps.some(s=>s.practice)));
    console.log(`${locale}: UI ${Object.keys(ui[locale]).length} keys; curriculum ${course.translationCoverage?.translated}/${course.translationCoverage?.total}; reviewed ${course.translationCoverage?.reviewed}; stable IDs OK`);
  } catch(error) { failures++; console.error(`${locale}: PENDING — ${error instanceof Error ? error.message : error}`); }
}
if(failures) process.exitCode = 1;
