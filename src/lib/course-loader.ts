import { readFileSync } from "node:fs";
import path from "node:path";
import type { Course, LocaleCatalog } from "../../contracts/course";
import type { Locale } from "./course-schema";
import { adaptCourse } from "./course-adapter";
import { demoConfig } from "./demo-config";

/** Public demonstration only. Protected content must use its own authorized loader. */
export function loadDemoCourse(locale: Locale) {
  const source = JSON.parse(readFileSync(path.join(process.cwd(), "content/curriculum/course.json"), "utf8")) as Course;
  const catalog = JSON.parse(readFileSync(path.join(process.cwd(), `content/locales/${locale}.json`), "utf8")) as LocaleCatalog;
  if (source.id !== demoConfig.courseId) throw new Error("Course is outside the explicit demo scope");
  const course = adaptCourse(source, catalog, { previewLessonIds: demoConfig.lessonIds });
  if (!course.lessons.length || !course.lessons.every(lesson => lesson.steps.length)) throw new Error("No preview lessons are available");
  return course;
}
