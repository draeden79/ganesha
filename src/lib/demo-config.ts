import type { CourseRoute } from "./course-schema";

/** Legacy constants retained for callers; runtime selection is version-specific below. */
export const demoConfig = {
  courseId: "course.first-site",
  lessonIds: ["lesson.first-request", "lesson.foundations"],
  editorialStatus: "content-and-translation-review-pending",
} as const;

/** Public hackathon beta, independent from releasedLessonIds and protected access. */
export const classroomConfig = {
  courseId: "course.first-site",
  lessonIds: ["lesson.foundations", "lesson.site", "lesson.app", "lesson.automation"],
} as const;

export interface PublicCourseConfig {
  courseId: string;
  demoLessonIds: readonly string[];
  classroomLessonIds: readonly string[];
  routes?: readonly CourseRoute[];
  stepsPerLesson?: number;
  minimumPractices?: number;
  assessmentPositions?: readonly number[];
}

const expandedRoutes: readonly CourseRoute[] = [
  { id: "foundations", lessonIds: ["lesson.workspace", "lesson.requests", "lesson.verification"] },
  { id: "sites", lessonIds: ["lesson.site-build", "lesson.site-quality", "lesson.site-publish"] },
  { id: "apps", lessonIds: ["lesson.app-state", "lesson.app-storage", "lesson.app-delivery"] },
  { id: "automations", lessonIds: ["lesson.automation-input", "lesson.automation-report", "lesson.automation-schedule"] },
];

const versions: Record<string, PublicCourseConfig> = {
  "0.1.0": { courseId: demoConfig.courseId, demoLessonIds: ["lesson.first-request"], classroomLessonIds: [] },
  "0.2.0": { courseId: demoConfig.courseId, demoLessonIds: ["lesson.foundations"], classroomLessonIds: classroomConfig.lessonIds },
  "0.3.0": {
    courseId: demoConfig.courseId, demoLessonIds: ["lesson.workspace"],
    classroomLessonIds: expandedRoutes.flatMap(route => route.lessonIds), routes: expandedRoutes,
    stepsPerLesson: 10, minimumPractices: 4, assessmentPositions: [3, 8],
  },
};

/** Knowing a version does not activate it: the canonical content source is unchanged. */
export function publicCourseConfig(version: string): PublicCourseConfig {
  const config = versions[version];
  if (!config) throw new Error(`Unsupported public course version: ${version}`);
  return config;
}
