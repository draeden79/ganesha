import { readFileSync } from "node:fs";
import path from "node:path";
import type { Course, LocaleCatalog } from "../../contracts/course";
import type { Locale } from "./course-schema";
import { adaptCourse } from "./course-adapter";
import { classroomConfig, demoConfig } from "./demo-config";
import { authorizeCourse } from './access';

/** Every loader checks payment access before reading or serializing lesson data. */
export async function loadDemoCourse(locale: Locale) {
  if ((await authorizeCourse()).status !== 'authorized') throw new Error('Classroom access required');
  return loadPublicCourse(locale, "demo");
}

export async function loadClassroomCourse(locale: Locale) {
  if ((await authorizeCourse()).status !== 'authorized') throw new Error('Classroom access required');
  return loadPublicCourse(locale, "classroom");
}

function loadPublicCourse(locale: Locale, scope: "demo" | "classroom") {
  // Optional local QA source keeps the running 0.1.0 preview's content untouched.
  const contentRoot = path.resolve(/* turbopackIgnore: true */ process.cwd(), process.env.GANESHA_CONTENT_DIR || "content");
  const source = JSON.parse(readFileSync(path.join(contentRoot, "curriculum/course.json"), "utf8")) as Course;
  const catalog = JSON.parse(readFileSync(path.join(contentRoot, `locales/${locale}.json`), "utf8")) as LocaleCatalog;
  const config = scope === "classroom" ? classroomConfig : demoConfig;
  if (source.id !== config.courseId) throw new Error("Course is outside the explicit public scope");
  const course = adaptCourse(source, catalog, { previewLessonIds: config.lessonIds });
  if (!course.lessons.length || !course.lessons.every(lesson => lesson.steps.length)) throw new Error("No preview lessons are available");
  if (scope === "classroom") {
    if (course.lessons.length !== classroomConfig.lessonIds.length) throw new Error("Classroom curriculum is incomplete");
    for (const lesson of course.lessons) {
      if (!lesson.steps.some(step => step.practice) || lesson.steps.filter(step => step.check && step.isAssessment).length < 2) throw new Error(`Incomplete classroom activities: ${lesson.id}`);
    }
    course.progressScope = "classroom";
  }
  return course;
}
