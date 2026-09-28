import { readFileSync } from 'node:fs';
import path from 'node:path';
import type { Course, LocaleCatalog } from '../contracts/course';
import type { Locale } from '../src/lib/course-schema';
import { adaptCourse } from '../src/lib/course-adapter';
import { demoConfig, classroomConfig } from '../src/lib/demo-config';
// Content/progress unit tests read fixtures directly. Production loaders always authorize the request.
function loadCourse(locale: Locale, classroom = false) {
  const root = path.resolve(process.cwd(), process.env.GANESHA_CONTENT_DIR || 'content');
  const source = JSON.parse(readFileSync(path.join(root, 'curriculum/course.json'), 'utf8')) as Course;
  const catalog = JSON.parse(readFileSync(path.join(root, `locales/${locale}.json`), 'utf8')) as LocaleCatalog;
  const course = adaptCourse(source, catalog, { previewLessonIds: classroom ? classroomConfig.lessonIds : demoConfig.lessonIds });
  if (classroom) course.progressScope = 'classroom';
  return course;
}
export const loadDemoCourse = (locale: Locale) => loadCourse(locale);
export const loadClassroomCourse = (locale: Locale) => loadCourse(locale, true);
