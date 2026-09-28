/** Explicit public preview scope. This is not an entitlement or a publication gate. */
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
