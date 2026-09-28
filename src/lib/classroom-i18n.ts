import type { Locale } from "./course-schema";
const keys = ["chooseLesson", "nextLesson", "betaReview", "allDone", "allDoneBody"] as const;
const rows: Record<Locale, string[]> = {
  "pt-BR": ["Selecionar aula", "Próxima aula", "Beta do hackathon · conteúdo em revisão", "Seu percurso está registrado.", "Você concluiu as verificações e registrou as práticas nesta ferramenta. As práticas externas são autodeclaradas. Revise as aulas ou experimente a outra ferramenta."],
  en: ["Choose lesson", "Next lesson", "Hackathon beta · content under review", "Your learning path is recorded.", "You completed the checks and recorded your practice with this tool. External practice is self-reported. Review the lessons or try the other tool."],
  es: ["Elegir lección", "Siguiente lección", "Beta del hackathon · contenido en revisión", "Tu recorrido está registrado.", "Completaste las verificaciones y registraste las prácticas con esta herramienta. Las prácticas externas son autodeclaradas. Repasa las lecciones o prueba la otra herramienta."],
  fr: ["Choisir une leçon", "Leçon suivante", "Bêta du hackathon · contenu en révision", "Votre parcours est enregistré.", "Vous avez terminé les vérifications et consigné vos exercices avec cet outil. Les exercices externes sont autodéclarés. Révisez les leçons ou essayez l’autre outil."],
  de: ["Lektion auswählen", "Nächste Lektion", "Hackathon-Beta · Inhalt wird geprüft", "Dein Lernweg ist gespeichert.", "Du hast die Wissensprüfungen abgeschlossen und deine Übungen mit diesem Werkzeug erfasst. Externe Übungen sind selbst bestätigt. Wiederhole die Lektionen oder probiere das andere Werkzeug."],
  ja: ["レッスンを選ぶ", "次のレッスン", "ハッカソンのベータ版 · 内容は確認中", "学習の記録を保存しました。", "このツールで確認問題を完了し、練習を記録しました。外部での実習は自己申告です。レッスンを復習するか、別のツールを試してください。"],
  hi: ["पाठ चुनें", "अगला पाठ", "हैकाथॉन बीटा · सामग्री की समीक्षा जारी है", "आपकी सीखने की यात्रा दर्ज है।", "आपने इस टूल के साथ जाँच पूरी की और अभ्यास दर्ज किए। बाहरी अभ्यास स्व-रिपोर्ट किए गए हैं। पाठ दोहराएँ या दूसरा टूल आज़माएँ।"],
  id: ["Pilih pelajaran", "Pelajaran berikutnya", "Beta hackathon · konten sedang ditinjau", "Perjalanan belajar Anda tercatat.", "Anda menyelesaikan pemeriksaan dan mencatat latihan dengan alat ini. Latihan eksternal dilaporkan sendiri. Tinjau pelajaran atau coba alat lainnya."],
  ar: ["اختر الدرس", "الدرس التالي", "نسخة هاكاثون تجريبية · المحتوى قيد المراجعة", "تم تسجيل مسارك التعليمي.", "أكملت الاختبارات وسجلت تدريباتك باستخدام هذه الأداة. التدريبات الخارجية مُبلّغ عنها ذاتيًا. راجع الدروس أو جرّب الأداة الأخرى."],
  ko: ["수업 선택", "다음 수업", "해커톤 베타 · 콘텐츠 검토 중", "학습 과정이 기록되었습니다.", "이 도구로 확인 문제를 완료하고 실습을 기록했습니다. 외부 실습은 자기 보고 방식입니다. 수업을 복습하거나 다른 도구를 사용해 보세요."],
  "zh-CN": ["选择课程", "下一课", "黑客松测试版 · 内容审核中", "学习过程已记录。", "你已使用此工具完成检查并记录练习。外部练习由你自行确认。请复习课程或尝试另一种工具。"],
};
export const classroomUi = Object.fromEntries(Object.entries(rows).map(([locale, row]) => {
  if (row.length !== keys.length) throw new Error(`Missing classroom UI labels: ${locale}`);
  return [locale, Object.fromEntries(keys.map((key, index) => [key, row[index]]))];
})) as Record<Locale, Record<typeof keys[number], string>>;
