import { readFileSync } from "node:fs";
import path from "node:path";
import type { Course, LocaleCatalog } from "../../contracts/course";
import type { Locale } from "./course-schema";
import { adaptPublicCourse } from "./public-course";

/** Public demonstration only. Protected content must use its own authorized loader. */
export function loadDemoCourse(locale: Locale) {
  return loadPublicCourse(locale, "demo");
}

export function loadClassroomCourse(locale: Locale) {
  return loadPublicCourse(locale, "classroom");
}

function loadPublicCourse(locale: Locale, scope: "demo" | "classroom") {
  // Optional local QA source keeps the running 0.1.0 preview's content untouched.
  const contentRoot = path.resolve(/* turbopackIgnore: true */ process.cwd(), process.env.GANESHA_CONTENT_DIR || "content");
  const source = JSON.parse(readFileSync(path.join(contentRoot, "curriculum/course.json"), "utf8")) as Course;
  const catalog = JSON.parse(readFileSync(path.join(contentRoot, `locales/${locale}.json`), "utf8")) as LocaleCatalog;
  return adaptPublicCourse(source, catalog, scope);
}
