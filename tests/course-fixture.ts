import { readFileSync } from 'node:fs';
import path from 'node:path';
import type { Course, LocaleCatalog } from '../contracts/course';
import type { Locale } from '../src/lib/course-schema';
import { adaptPublicCourse } from '../src/lib/public-course';
// Content/progress unit tests read fixtures directly. Production loaders always authorize the request.
function loadCourse(locale: Locale, classroom = false) {
  const root = path.resolve(process.cwd(), process.env.GANESHA_CONTENT_DIR || 'content');
  const source = JSON.parse(readFileSync(path.join(root, 'curriculum/course.json'), 'utf8')) as Course;
  const catalog = JSON.parse(readFileSync(path.join(root, `locales/${locale}.json`), 'utf8')) as LocaleCatalog;
  return adaptPublicCourse(source, catalog, classroom ? 'classroom' : 'demo');
}
export const loadDemoCourse = (locale: Locale) => loadCourse(locale);
export const loadClassroomCourse = (locale: Locale) => loadCourse(locale, true);
