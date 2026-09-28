import type { Course as CanonicalCourse, LocaleCatalog } from "../../contracts/course";
import { adaptCourse } from "./course-adapter";
import { publicCourseConfig } from "./demo-config";

export function adaptPublicCourse(source: CanonicalCourse, catalog: LocaleCatalog, scope: "demo" | "classroom") {
  const config = publicCourseConfig(source.version);
  if (source.id !== config.courseId) throw new Error("Course is outside the explicit public scope");
  const ids = scope === "classroom" ? config.classroomLessonIds : config.demoLessonIds;
  if (!ids.length) throw new Error("This version has no public classroom scope");
  const course = adaptCourse(source, catalog, { previewLessonIds: ids });
  if (course.lessons.length !== ids.length || !course.lessons.every(lesson => lesson.steps.length)) throw new Error("Public curriculum is incomplete");
  if (new Set(course.lessons.map(lesson => lesson.id)).size !== ids.length || ids.some(id => !course.lessons.some(lesson => lesson.id === id))) throw new Error("Public lesson IDs are incomplete or duplicated");
  const steps = course.lessons.flatMap(lesson => lesson.steps);
  if (new Set(steps.map(step => step.id)).size !== steps.length) throw new Error("Duplicate global step IDs");
  for (const lesson of course.lessons) {
    if (config.stepsPerLesson && lesson.steps.length !== config.stepsPerLesson) throw new Error(`Unexpected step count: ${lesson.id}`);
    if (scope === "classroom" || config.stepsPerLesson) {
      if (lesson.steps.filter(step => step.practice).length < (config.minimumPractices ?? 1) || lesson.steps.filter(step => step.check && step.isAssessment).length < 2) throw new Error(`Incomplete classroom activities: ${lesson.id}`);
      if (config.assessmentPositions && (lesson.steps.filter(step => step.check && step.isAssessment).length !== config.assessmentPositions.length || config.assessmentPositions.some(index => !lesson.steps[index]?.check || !lesson.steps[index].isAssessment))) throw new Error(`Unexpected assessment positions: ${lesson.id}`);
    }
  }
  for (const step of steps) {
    if (step.check && (new Set(step.check.choices.map(choice => choice.id)).size !== step.check.choices.length || !step.check.choices.some(choice => choice.id === step.check!.correctChoiceId))) throw new Error(`Invalid check options: ${step.id}`);
    // The expanded course renders ordered blocks. Avoid serializing their legacy duplicates.
    if (config.routes && step.contentBlocks) { step.body = []; delete step.callouts; }
  }
  if (scope === "classroom") {
    course.progressScope = "classroom";
    if (config.routes) {
      course.routes = config.routes;
      const known = new Set(course.lessons.map(lesson => lesson.id));
      for (const lesson of course.lessons) {
        if (lesson.prerequisiteLessonIds?.some(id => !known.has(id) || id === lesson.id)) throw new Error(`Invalid prerequisite: ${lesson.id}`);
        const route = config.routes.find(item => item.lessonIds.includes(lesson.id))!;
        const position = route.lessonIds.indexOf(lesson.id);
        const expected = position > 0 ? [route.lessonIds[position - 1]] : route.id === "foundations" ? [] : [config.routes.find(item => item.id === "foundations")!.lessonIds.at(-1)!];
        if (JSON.stringify([...(lesson.prerequisiteLessonIds ?? [])].sort()) !== JSON.stringify(expected.sort())) throw new Error(`Unexpected route prerequisite: ${lesson.id}`);
      }
    }
  }
  return course;
}
