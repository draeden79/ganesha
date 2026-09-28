import type { Course, CourseRoute, Lesson } from "./course-schema";
import { getStepState, type Progress } from "./progress";

export function lessonCompletedCount(lesson: Lesson, progress: Progress) {
  return lesson.steps.filter(step => getStepState(progress, step.id).complete).length;
}

/** Resume the current incomplete step, then the first pending step, or review from the start. */
export function resumeLessonStep(lesson: Lesson, progress: Progress) {
  return lesson.steps.find(step => step.id === progress.currentStepId && !getStepState(progress, step.id).complete)
    ?? lesson.steps.find(step => !getStepState(progress, step.id).complete)
    ?? lesson.steps[0];
}

export function routeForLesson(course: Course, lessonId: string) {
  return course.routes?.find(route => route.lessonIds.includes(lessonId));
}

/** Expanded curricula advance only within their route; older versions retain their order. */
export function nextLessonFor(course: Course, lessonId: string) {
  const route = routeForLesson(course, lessonId);
  if (!route) return course.lessons[course.lessons.findIndex(lesson => lesson.id === lessonId) + 1];
  const id = route.lessonIds[route.lessonIds.indexOf(lessonId) + 1];
  return course.lessons.find(lesson => lesson.id === id);
}

export function routeLessons(course: Course, route: CourseRoute) {
  return route.lessonIds.map(id => course.lessons.find(lesson => lesson.id === id)).filter((lesson): lesson is Lesson => Boolean(lesson));
}

export function resumeRouteLesson(course: Course, route: CourseRoute, progress: Progress) {
  const lessons = routeLessons(course, route);
  return lessons.find(lesson => lessonCompletedCount(lesson, progress) < lesson.steps.length) ?? lessons[0];
}
