import type { Lesson } from "./course-schema";
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
