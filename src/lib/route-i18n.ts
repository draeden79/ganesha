import type { Locale, LearningRoute } from "./course-schema";
const keys = ["foundations", "sites", "apps", "automations", "chooseRoute", "recommendedBefore", "routeHint"] as const;
const rows: Record<Locale, string[]> = {
  "pt-BR": ["Fundamentos", "Sites", "Apps", "Automações", "Escolher percurso", "Antes desta aula, recomendamos", "Escolha o que quer construir. Sites, apps e automações são percursos independentes após os fundamentos."],
  en: ["Foundations", "Websites", "Apps", "Automations", "Choose a path", "Before this lesson, we recommend", "Choose what you want to build. Websites, apps and automations are independent paths after the foundations."],
  es: ["Fundamentos", "Sitios web", "Apps", "Automatizaciones", "Elegir recorrido", "Antes de esta lección, recomendamos", "Elige qué quieres construir. Los sitios, las apps y las automatizaciones son recorridos independientes después de los fundamentos."],
  fr: ["Bases", "Sites web", "Applications", "Automatisations", "Choisir un parcours", "Avant cette leçon, nous recommandons", "Choisissez ce que vous voulez créer. Sites, applications et automatisations sont des parcours indépendants après les bases."],
  de: ["Grundlagen", "Websites", "Apps", "Automatisierungen", "Lernweg wählen", "Vor dieser Lektion empfehlen wir", "Wähle, was du erstellen möchtest. Websites, Apps und Automatisierungen sind nach den Grundlagen unabhängige Lernwege."],
  ja: ["基礎", "ウェブサイト", "アプリ", "自動化", "学習コースを選ぶ", "このレッスンの前におすすめ", "作りたいものを選びましょう。基礎の後は、ウェブサイト、アプリ、自動化をそれぞれ独立して学べます。"],
  hi: ["बुनियाद", "वेबसाइट", "ऐप", "ऑटोमेशन", "सीखने का रास्ता चुनें", "इस पाठ से पहले हम सुझाते हैं", "चुनें कि आप क्या बनाना चाहते हैं। बुनियाद के बाद वेबसाइट, ऐप और ऑटोमेशन स्वतंत्र रास्ते हैं।"],
  id: ["Dasar", "Situs web", "Aplikasi", "Otomatisasi", "Pilih jalur", "Sebelum pelajaran ini, kami menyarankan", "Pilih yang ingin Anda buat. Situs web, aplikasi, dan otomatisasi adalah jalur terpisah setelah dasar-dasarnya."],
  ar: ["الأساسيات", "المواقع", "التطبيقات", "الأتمتة", "اختر مسارك", "قبل هذا الدرس، نوصي بـ", "اختر ما تريد بناءه. المواقع والتطبيقات والأتمتة مسارات مستقلة بعد الأساسيات."],
  ko: ["기초", "웹사이트", "앱", "자동화", "학습 경로 선택", "이 수업 전에 권장하는 수업", "만들고 싶은 것을 선택하세요. 기초 이후 웹사이트, 앱, 자동화는 각각 독립적으로 배울 수 있습니다."],
  "zh-CN": ["基础", "网站", "应用", "自动化", "选择学习路径", "学习本课前，建议先学习", "选择你想构建的内容。学完基础后，网站、应用和自动化是相互独立的学习路径。"],
};
export const routeUi = Object.fromEntries(Object.entries(rows).map(([locale, row]) => {
  if (row.length !== keys.length) throw new Error(`Missing route UI labels: ${locale}`);
  return [locale, Object.fromEntries(keys.map((key, index) => [key, row[index]]))];
})) as Record<Locale, Record<LearningRoute | "chooseRoute" | "recommendedBefore" | "routeHint", string>>;
