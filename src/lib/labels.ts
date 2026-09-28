import type { Locale } from "./course-schema";
const keys = ["hints", "expected", "objective", "action"] as const;
const rows: Record<Locale, string[]> = {
  "pt-BR": ["Dicas para esta etapa", "Resultado esperado", "Seu objetivo", "Agora é sua vez"],
  en: ["Hints for this step", "Expected result", "Your objective", "Your turn"],
  es: ["Pistas para esta etapa", "Resultado esperado", "Tu objetivo", "Tu turno"],
  fr: ["Conseils pour cette étape", "Résultat attendu", "Votre objectif", "À vous de jouer"],
  de: ["Tipps für diesen Schritt", "Erwartetes Ergebnis", "Dein Ziel", "Du bist dran"],
  ja: ["このステップのヒント", "期待する結果", "学習の目標", "やってみましょう"],
  hi: ["इस चरण के लिए संकेत", "अपेक्षित परिणाम", "आपका उद्देश्य", "अब आपकी बारी"],
  id: ["Petunjuk untuk langkah ini", "Hasil yang diharapkan", "Tujuan Anda", "Giliran Anda"],
  ar: ["تلميحات لهذه الخطوة", "النتيجة المتوقعة", "هدفك", "حان دورك"],
  ko: ["이 단계의 힌트", "기대 결과", "학습 목표", "직접 해 보세요"],
  "zh-CN": ["本步骤提示", "预期结果", "学习目标", "轮到你了"],
};
export const labels = Object.fromEntries(Object.entries(rows).map(([locale, row]) => {
  if (row.length !== keys.length) throw new Error(`Missing labels for ${locale}`);
  return [locale, Object.fromEntries(keys.map((key, i) => [key, row[i]]))];
})) as Record<Locale, Record<typeof keys[number], string>>;
