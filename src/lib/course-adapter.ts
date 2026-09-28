import type { Course as CanonicalCourse, LocaleCatalog } from "../../contracts/course";
import type { Course, Locale, Step } from "./course-schema";

export function adaptCourse(source: CanonicalCourse, catalog: LocaleCatalog, options: { previewLessonIds?: readonly string[] } = {}): Course {
  if (catalog.courseId !== source.id || catalog.courseVersion !== source.version) throw new Error("Catalog/course version mismatch");
  const t = (key: string) => {
    const message = catalog.messages[key];
    if (!message?.value || message.status === "missing" || message.status === "pending" || message.sourceRevision !== source.version) throw new Error(`Incomplete translation: ${catalog.locale}/${key}`);
    return message.value;
  };
  const messages = Object.values(catalog.messages);
  return {
    id: source.id, version: source.version, locale: catalog.locale as Locale,
    translationStatus: messages.every(m => m.status === "reviewed") ? "complete" : "draft",
    translationCoverage: { total: messages.length, translated: messages.filter(m => ["translated", "reviewed"].includes(m.status)).length, reviewed: messages.filter(m => m.status === "reviewed").length },
    title: t(source.titleKey), description: t(source.summaryKey),
    lessons: source.lessons.filter(l => (options.previewLessonIds ?? source.releasedLessonIds).includes(l.id) && l.status !== "planned").sort((a, b) => a.order - b.order).map(lesson => ({
      id: lesson.id, title: t(lesson.titleKey), summary: t(lesson.summaryKey), durationMinutes: lesson.estimatedMinutes,
      steps: lesson.steps.map(step => {
        const mapped: Step = {
          id: step.id, type: step.kind === "explain" ? "instruction" : step.kind === "reflect" ? "reflection" : step.kind,
          title: t(step.titleKey), body: step.blocks.filter(b => b.kind === "paragraph" && b.textKey).map(b => t(b.textKey!)),
          callouts: step.blocks.filter(b => b.kind === "callout" && b.textKey).map(b => t(b.textKey!)),
          objective: step.objectiveKey ? t(step.objectiveKey) : undefined,
          action: step.actionKey ? t(step.actionKey) : undefined,
          expectedResult: step.expectedResultKey ? t(step.expectedResultKey) : undefined,
          hints: step.hintKeys?.map(t), criteria: step.criteriaKeys?.map(t),
          isAssessment: step.isAssessment, executionMode: step.executionMode,
          evidenceIds: [...new Set([...step.evidenceIds, ...step.toolVariants.claude.evidenceIds, ...step.toolVariants.codex.evidenceIds])],
          visualDescription: step.visual?.altKey ? t(step.visual.altKey) : undefined,
          toolNotes: {
            claude: step.toolVariants.claude.blocks.filter(b => b.textKey).map(b => t(b.textKey!)).join("\n\n"),
            codex: step.toolVariants.codex.blocks.filter(b => b.textKey).map(b => t(b.textKey!)).join("\n\n"),
          },
        };
        if (step.exercise) {
          const rubric = source.rubrics.find(r => r.id === step.exercise!.rubricId);
          if (!rubric) throw new Error(`Missing rubric ${step.exercise.rubricId}`);
          mapped.practice = { placeholder: t(step.exercise.promptKey), criteria: rubric.criteria.map(c => t(c.labelKey)), criterionIds: rubric.criteria.map(c => c.id), rubricId: rubric.id, feedback: t(step.exercise.deliverableKey) };
        }
        if (step.check) {
          if (step.check.kind !== "single-choice" || step.check.correctOptionIds.length !== 1) throw new Error(`Unsupported check kind: ${step.id}`);
          const check = step.check;
          mapped.check = { prompt: t(check.questionKey), correctChoiceId: check.correctOptionIds[0], choices: check.options.map(option => ({ id: option.id, text: t(option.labelKey), feedback: `${t(option.feedbackKey)} ${t(check.correctOptionIds.includes(option.id) ? check.successFeedbackKey : check.retryFeedbackKey)}` })) };
        }
        return mapped;
      }),
    })),
  };
}
