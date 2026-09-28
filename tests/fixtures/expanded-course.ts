import sourceJson from "../../content/curriculum/course.json";
import catalogJson from "../../content/locales/pt-BR.json";
import type { Course, LocaleCatalog, Step } from "../../contracts/course";
import { publicCourseConfig } from "../../src/lib/demo-config";

/** Synthetic mechanics fixture, never a curriculum or public preview. */
export function expandedFixture() {
  const source = structuredClone(sourceJson) as Course;
  const catalog = structuredClone(catalogJson) as LocaleCatalog;
  source.version = catalog.courseVersion = "0.3.0";
  for (const message of Object.values(catalog.messages)) message.sourceRevision = "0.3.0";
  const original = source.lessons[0];
  const explanation = original.steps.find(step => !step.check && !step.exercise)!;
  const practice = original.steps.find(step => step.exercise)!;
  const check = original.steps.find(step => step.check?.kind === "single-choice")!;
  const routes = publicCourseConfig("0.3.0").routes!;
  let order = 0;
  source.lessons = routes.flatMap(route => route.lessonIds.map((id, index) => ({
    ...structuredClone(original), id, order: ++order, status: "draft" as const,
    prerequisiteLessonIds: index ? [route.lessonIds[index - 1]] : route.id === "foundations" ? [] : ["lesson.verification"],
    steps: Array.from({ length: 10 }, (_, position) => {
      const template = [3, 8].includes(position) ? check : [1, 2, 4, 6, 9].includes(position) ? practice : explanation;
      const step = structuredClone(template) as Step;
      step.id = `step.${id.slice(7)}.fixture-${position + 1}.v3`;
      step.isAssessment = [3, 8].includes(position);
      if (step.check && (step.check.kind === "single-choice" || step.check.kind === "multiple-choice")) {
        step.check.id = `${step.id}.check`;
        step.check.options.forEach((option, i) => { option.id = `${step.id}.option-${i}`; });
        step.check.correctOptionIds = [step.check.options[position === 3 ? 1 : 0].id];
      }
      return step;
    }),
  })));
  source.releasedLessonIds = [];
  return { source, catalog };
}
