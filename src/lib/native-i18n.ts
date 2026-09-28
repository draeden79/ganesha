import type { Locale } from "./course-schema";
const keys = ["lessonSteps", "startStep", "help", "close", "previewReview"] as const;
const rows: Record<Locale, string[]> = {
  "pt-BR": ["Etapas da aula", "Começar etapa", "Ajuda", "Fechar", "Demonstração · conteúdo em revisão"],
  en: ["Lesson steps", "Start step", "Help", "Close", "Demo · content under review"],
  es: ["Etapas de la lección", "Empezar etapa", "Ayuda", "Cerrar", "Demostración · contenido en revisión"],
  fr: ["Étapes de la leçon", "Commencer l’étape", "Aide", "Fermer", "Démonstration · contenu en révision"],
  de: ["Lektionsschritte", "Schritt beginnen", "Hilfe", "Schließen", "Demo · Inhalt wird geprüft"],
  ja: ["レッスンのステップ", "ステップを始める", "ヘルプ", "閉じる", "デモ · 内容は確認中"],
  hi: ["पाठ के चरण", "चरण शुरू करें", "सहायता", "बंद करें", "डेमो · सामग्री की समीक्षा जारी है"],
  id: ["Langkah pelajaran", "Mulai langkah", "Bantuan", "Tutup", "Demo · konten sedang ditinjau"],
  ar: ["خطوات الدرس", "ابدأ الخطوة", "مساعدة", "إغلاق", "عرض تجريبي · المحتوى قيد المراجعة"],
  ko: ["수업 단계", "단계 시작", "도움말", "닫기", "데모 · 콘텐츠 검토 중"],
  "zh-CN": ["课程步骤", "开始步骤", "帮助", "关闭", "演示 · 内容审核中"],
};
export const nativeUi = Object.fromEntries(Object.entries(rows).map(([locale,row]) => {
  if (row.length !== keys.length) throw new Error(`Missing native UI labels: ${locale}`);
  return [locale,Object.fromEntries(keys.map((key,index)=>[key,row[index]]))];
})) as Record<Locale,Record<typeof keys[number],string>>;
