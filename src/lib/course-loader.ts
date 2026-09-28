import { readFileSync } from "node:fs";
import path from "node:path";
import type { Course, LocaleCatalog } from "../../contracts/course";
import type { Locale } from "./course-schema";
import { adaptCourse } from "./course-adapter";

export function loadCourse(locale: Locale) {
  const source = JSON.parse(readFileSync(path.join(process.cwd(), "content/curriculum/course.json"), "utf8")) as Course;
  const catalog = JSON.parse(readFileSync(path.join(process.cwd(), `content/locales/${locale}.json`), "utf8")) as LocaleCatalog;
  return adaptCourse(source, catalog);
}
