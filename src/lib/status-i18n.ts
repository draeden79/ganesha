import type { Locale } from "./course-schema";
const keys = ["unavailable", "translationPending", "retry", "notFound"] as const;
const rows: Record<Locale,string[]> = {
  "pt-BR": ["O conteúdo não está disponível agora.","A tradução deste curso ainda precisa ser concluída ou corrigida neste idioma. Seu progresso permanece neste navegador.","Tentar novamente","Esta página não foi encontrada."],
  en: ["The content is unavailable right now.","This course's translation still needs completion or correction in this language. Your progress remains in this browser.","Try again","This page could not be found."],
  es: ["El contenido no está disponible ahora.","La traducción de este curso aún necesita completarse o corregirse en este idioma. Tu progreso permanece en este navegador.","Reintentar","No se encontró esta página."],
  fr: ["Le contenu n’est pas disponible pour le moment.","La traduction du cours doit encore être complétée ou corrigée dans cette langue. Votre progression reste dans ce navigateur.","Réessayer","Cette page est introuvable."],
  de: ["Der Inhalt ist gerade nicht verfügbar.","Die Übersetzung dieses Kurses muss in dieser Sprache noch vervollständigt oder korrigiert werden. Dein Fortschritt bleibt in diesem Browser.","Erneut versuchen","Diese Seite wurde nicht gefunden."],
  ja: ["現在コンテンツを利用できません。","この言語のコース翻訳は、完成または修正が必要です。進捗はこのブラウザーに保存されています。","再試行","ページが見つかりませんでした。"],
  hi: ["सामग्री अभी उपलब्ध नहीं है।","इस भाषा में पाठ्यक्रम का अनुवाद अभी पूरा या ठीक करना बाकी है। आपकी प्रगति इस ब्राउज़र में बनी हुई है।","फिर कोशिश करें","यह पेज नहीं मिला।"],
  id: ["Konten belum tersedia saat ini.","Terjemahan kursus dalam bahasa ini masih perlu dilengkapi atau diperbaiki. Kemajuan Anda tetap ada di browser ini.","Coba lagi","Halaman ini tidak ditemukan."],
  ar: ["المحتوى غير متاح الآن.","تحتاج ترجمة هذه الدورة إلى الإكمال أو التصحيح بهذه اللغة. يبقى تقدمك محفوظًا في هذا المتصفح.","حاول مجددًا","لم يتم العثور على هذه الصفحة."],
  ko: ["지금은 콘텐츠를 이용할 수 없습니다.","이 언어의 강의 번역을 완료하거나 수정해야 합니다. 진행 상황은 이 브라우저에 남아 있습니다.","다시 시도","페이지를 찾을 수 없습니다."],
  "zh-CN": ["内容暂时不可用。","本课程的该语言翻译仍需完成或修正。你的进度仍保留在此浏览器中。","重试","找不到此页面。"],
};
export const statusUi = Object.fromEntries(Object.entries(rows).map(([locale,row]) => {
  if(row.length !== keys.length) throw new Error(`Missing status translations: ${locale}`);
  return [locale,Object.fromEntries(keys.map((key,i)=>[key,row[i]]))];
})) as Record<Locale, Record<typeof keys[number],string>>;
