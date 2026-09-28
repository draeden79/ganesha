/** Ganesha content contract 1.0.0. Stable IDs and message keys contain no locale. */
export const LOCALES = ['pt-BR', 'en', 'es', 'fr', 'de', 'ja', 'hi', 'id', 'ar', 'ko', 'zh-CN'] as const;
export type Locale = (typeof LOCALES)[number];
export type Tool = 'claude' | 'codex';
export type Id = string;
export type MessageKey = string;
export type ISODate = string;
export type Version = string;

export interface Source {
  id: Id;
  url: string;
  title: string; // bibliographic metadata; localize display labels separately
  publisher: string;
  kind: 'official-docs' | 'official-release' | 'tutorial' | 'other';
  language: string;
  retrievedAt: ISODate;
  updatedAt?: ISODate;
  trust: 'primary' | 'secondary';
  availability: 'verified' | 'unavailable';
}
export interface Evidence {
  id: Id;
  sourceId: Id;
  locator: string; // heading, anchor, timestamp or page
  text: string;
  textKind: 'short-quote' | 'paraphrase';
  claim: string;
  retrievedAt: ISODate;
  appliesTo: Tool[];
  caveat?: string;
}
export interface ResearchRegistry {
  schemaVersion: '1.0.0';
  sources: Source[];
  evidence: Evidence[];
}
export interface Competency {
  id: Id;
  titleKey: MessageKey;
  outcomeKey: MessageKey;
  prerequisiteIds: Id[];
  evidenceIds: Id[];
}
export interface ContentBlock {
  id: Id;
  kind: 'paragraph' | 'callout' | 'code' | 'image';
  textKey?: MessageKey;
  code?: string;
  assetPath?: string;
  altKey?: MessageKey;
  captionKey?: MessageKey;
}
export interface ToolVariant {
  blocks: ContentBlock[];
  evidenceIds: Id[];
  promptKey?: MessageKey;
}
export interface Rubric {
  id: Id;
  criteria: Array<{ id: Id; labelKey: MessageKey; feedbackKey: MessageKey; required: boolean }>;
}
export interface Exercise {
  id: Id;
  mode: 'simulated' | 'local-user';
  promptKey: MessageKey;
  deliverableKey: MessageKey;
  rubricId: Id;
}
export interface CheckBase {
  id: Id;
  questionKey: MessageKey;
  competencyIds: Id[];
  successFeedbackKey: MessageKey;
  retryFeedbackKey: MessageKey;
  required: boolean;
}
export type Check = CheckBase & (
  | { kind: 'single-choice' | 'multiple-choice'; options: Array<{ id: Id; labelKey: MessageKey; feedbackKey: MessageKey }>; correctOptionIds: Id[] }
  | { kind: 'artifact-review'; rubricId: Id; evaluator: 'self-report' | 'deterministic' }
);
export interface Step {
  id: Id;
  kind: 'explain' | 'practice' | 'check' | 'reflect';
  titleKey: MessageKey;
  objectiveKey: MessageKey;
  actionKey: MessageKey;
  expectedResultKey: MessageKey;
  hintKeys: MessageKey[];
  criteriaKeys: MessageKey[];
  isAssessment: boolean;
  executionMode: 'concept' | 'guided-simulation' | 'external-real-task';
  visual?: { kind: string; altKey?: MessageKey; captionKey?: MessageKey };
  blocks: ContentBlock[];
  competencyIds: Id[];
  evidenceIds: Id[];
  toolVariants: Record<Tool, ToolVariant>;
  exercise?: Exercise;
  check?: Check;
}
export interface Lesson {
  id: Id;
  order: number;
  status: 'planned' | 'draft' | 'ready';
  titleKey: MessageKey;
  summaryKey: MessageKey;
  objectiveKeys: MessageKey[];
  competencyIds: Id[];
  prerequisiteLessonIds: Id[];
  estimatedMinutes: number;
  steps: Step[];
}
export interface Course {
  schemaVersion: '1.0.0';
  id: Id;
  version: Version;
  status: 'draft' | 'preview' | 'published' | 'archived';
  defaultLocale: 'pt-BR';
  requiredLocales: Locale[];
  titleKey: MessageKey;
  summaryKey: MessageKey;
  releasedLessonIds: Id[];
  competencies: Competency[];
  lessons: Lesson[];
  rubrics: Rubric[];
}
export interface Translation {
  value: string;
  status: 'missing' | 'pending' | 'translated' | 'reviewed';
  sourceRevision: Version;
  reviewedBy?: string;
}
export interface LocaleCatalog {
  schemaVersion: '1.0.0';
  courseId: Id;
  courseVersion: Version;
  locale: Locale;
  humanReviewStatus?: 'pending' | 'reviewed';
  messages: Record<MessageKey, Translation>;
}
export interface Attempt {
  id: Id;
  checkId: Id;
  tool: Tool;
  selectedOptionIds?: Id[];
  metCriterionIds?: Id[];
  passed: boolean;
  evaluator: 'deterministic' | 'self-report';
  createdAt: ISODate;
}
export interface StepProgress {
  stepId: Id;
  visitedAt?: ISODate;
  practiceCompletedAt?: ISODate;
  attempts: Attempt[];
  completedAt?: ISODate;
}
export interface LearnerProgress {
  schemaVersion: '1.0.0';
  learnerId: string; // opaque; no email needed in course data
  courseId: Id;
  courseVersion: Version;
  locale: Locale;
  tool: Tool;
  currentLessonId: Id;
  currentStepId: Id;
  steps: Record<Id, StepProgress>;
  completedLessonIds: Id[];
  updatedAt: ISODate;
}
export interface ProgressMigration {
  fromVersion: Version;
  toVersion: Version;
  equivalentStepIds: Record<Id, Id>;
  requiresRecheckStepIds: Id[];
  explanationKey: MessageKey;
}
export interface UpdateProposal {
  id: Id;
  createdAt: ISODate;
  baseCourseVersion: Version;
  status: 'proposed' | 'reviewing' | 'accepted' | 'rejected';
  sourceIds: Id[];
  changedEvidenceIds: Id[];
  impacts: Array<{ lessonId: Id; stepIds: Id[]; severity: 'correction' | 'behavior-change' | 'new-capability'; rationale: string }>;
  requiredLocales: Locale[];
  recommendedVersion: Version;
  preserveProgress: boolean;
}
