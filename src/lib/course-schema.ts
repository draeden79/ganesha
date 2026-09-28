export const locales = ["pt-BR", "en", "es", "fr", "de", "ja", "hi", "id", "ar", "ko", "zh-CN"] as const;
export type Locale = typeof locales[number];
export const tools = ["claude", "codex"] as const;
export type LearningTool = typeof tools[number];
export type Localized<T> = Record<Locale, T>;

export interface Choice { id: string; text: string; feedback: string }
export interface Step {
  id: string;
  type: "instruction" | "practice" | "check" | "reflection";
  title: string;
  body: string[];
  objective?: string;
  action?: string;
  expectedResult?: string;
  hints?: string[];
  criteria?: string[];
  evidenceIds?: string[];
  executionMode?: "concept" | "guided-simulation" | "external-real-task";
  hasCanonicalExecutionNotice?: boolean;
  isAssessment?: boolean;
  callouts?: string[];
  contentBlocks?: { kind: "paragraph" | "callout" | "code"; text: string }[];
  visualDescription?: string;
  toolNotes?: Record<LearningTool, string>;
  example?: string;
  practice?: { placeholder: string; criteria: string[]; feedback: string; rubricId?: string; criterionIds?: string[] };
  check?: { prompt: string; choices: Choice[]; correctChoiceId: string };
}
export interface Lesson {
  id: string;
  title: string;
  summary: string;
  durationMinutes: number;
  steps: Step[];
}
export interface Course {
  id: string;
  version: string;
  locale: Locale;
  translationStatus: "draft" | "complete";
  translationCoverage?: { translated: number; reviewed: number; total: number };
  title: string;
  description: string;
  progressScope?: "classroom";
  lessons: Lesson[];
}

export function isLocale(value: string): value is Locale { return locales.includes(value as Locale); }
export const localeNames: Record<Locale, string> = {
  "pt-BR": "Português (Brasil)", en: "English", es: "Español", fr: "Français", de: "Deutsch",
  ja: "日本語", hi: "हिन्दी", id: "Bahasa Indonesia", ar: "العربية", ko: "한국어", "zh-CN": "简体中文",
};
