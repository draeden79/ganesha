// Locale identifiers are application policy, never supplied by generated content.
export const locales = Object.freeze([
  { code: 'en', name: 'English', language: 'English' },
  { code: 'pt-BR', name: 'Português brasileiro', language: 'Brazilian Portuguese' },
  { code: 'es', name: 'Español', language: 'Spanish' },
  { code: 'fr', name: 'Français', language: 'French' },
  { code: 'de', name: 'Deutsch', language: 'German' },
  { code: 'ja', name: '日本語', language: 'Japanese' },
  { code: 'hi', name: 'हिन्दी', language: 'Hindi' },
  { code: 'id', name: 'Bahasa Indonesia', language: 'Indonesian' },
  { code: 'ar', name: 'العربية', language: 'Arabic', dir: 'rtl' },
  { code: 'ko', name: '한국어', language: 'Korean' },
  { code: 'zh-CN', name: '简体中文', language: 'Simplified Chinese' },
]);
export const translationLocales = Object.freeze(locales.filter(locale => locale.code !== 'en'));
export const isLocale = code => locales.some(locale => locale.code === code);

const keys = ['prototype','skip','home','nav','course','learn','audience','explore','open','close','mobile','questions',
  'journey','discover','newPerspectives','realPossibilities','visualLabel','imageAlt','greatIdeas','newPerspective',
  'littleCuriosity','worldPossibility','approach','understand','exploreWord','create','knowledge','curiosityTitle',
  'nextStep','journeyTitle','stepAtTime','bringIdeas','openPossibilities','practice','differentPaths','audienceTitle',
  'beforeStep','faqTitle','room','closingTitle','exploreLearning','fresh','backHome','backTop','rights','made','language'];

// Every line corresponds to the same UI key. Keeping shell copy out of model output
// makes navigation, accessibility and the prototype notice consistent across courses.
const copy = {
  en: `Ganesha prototype · Demonstration course page for workflow testing.
Skip to content
Ganesha, home
Main navigation
The course
What you’ll learn
Who it’s for
Explore the course
Open menu
Close menu
Mobile navigation
Common questions
Explore the journey
Discover the course
New perspectives.
Real possibilities.
A space for new possibilities
An isometric miniature learning studio with ivory architecture, a laptop and lavender creative panels.
Great ideas begin
with a new perspective.
A little curiosity.
A world of possibility.
Our approach to learning
Understand.
Explore.
Create.
KNOWLEDGE THAT OPENS DOORS
Your curiosity. New possibilities.
YOUR NEXT STEP STARTS HERE
From curiosity to practice.
One step at a time.
You bring the ideas.
We open the possibilities.
PUT IT INTO PRACTICE
DIFFERENT PATHS. A NEW BEGINNING.
Make room for what comes next.
BEFORE YOUR FIRST STEP
Every good journey starts with a question.
THERE’S ROOM FOR YOU IN WHAT’S NEXT
Your next possibility starts with curiosity.
Explore what you’ll learn
A fresh perspective. New possibilities.
Ganesha, back to the top
Back to top
All rights reserved.
Made for your next step.
Language`,
  'pt-BR': `Protótipo Ganesha · Página demonstrativa de curso para testar o fluxo de trabalho.
Pular para o conteúdo
Ganesha, início
Navegação principal
O curso
O que você vai aprender
Para quem é
Explore o curso
Abrir menu
Fechar menu
Navegação móvel
Perguntas frequentes
Explore a jornada
Conheça o curso
Novas perspectivas.
Possibilidades reais.
Um espaço para novas possibilidades
Um estúdio de aprendizagem em miniatura isométrica, com arquitetura marfim, um notebook e painéis criativos em lavanda.
Grandes ideias começam
com uma nova perspectiva.
Um pouco de curiosidade.
Um mundo de possibilidades.
Nossa forma de aprender
Entenda.
Explore.
Crie.
CONHECIMENTO QUE ABRE PORTAS
Sua curiosidade. Novas possibilidades.
SEU PRÓXIMO PASSO COMEÇA AQUI
Da curiosidade à prática.
Um passo de cada vez.
Você traz as ideias.
Nós abrimos possibilidades.
COLOQUE EM PRÁTICA
DIFERENTES CAMINHOS. UM NOVO COMEÇO.
Abra espaço para o que vem a seguir.
ANTES DO PRIMEIRO PASSO
Toda boa jornada começa com uma pergunta.
HÁ ESPAÇO PARA VOCÊ NO QUE VEM A SEGUIR
Sua próxima possibilidade começa com curiosidade.
Explore o que você vai aprender
Uma nova perspectiva. Novas possibilidades.
Ganesha, voltar ao topo
Voltar ao topo
Todos os direitos reservados.
Feito para seu próximo passo.
Idioma`,
  es: `Prototipo Ganesha · Página de demostración de un curso para probar el flujo de trabajo.
Saltar al contenido
Ganesha, inicio
Navegación principal
El curso
Qué aprenderás
A quién va dirigido
Explora el curso
Abrir menú
Cerrar menú
Navegación móvil
Preguntas frecuentes
Explora el recorrido
Descubre el curso
Nuevas perspectivas.
Posibilidades reales.
Un espacio para nuevas posibilidades
Un estudio de aprendizaje isométrico en miniatura, con arquitectura marfil, un portátil y paneles creativos de color lavanda.
Las grandes ideas comienzan
con una nueva perspectiva.
Un poco de curiosidad.
Un mundo de posibilidades.
Nuestra forma de aprender
Comprende.
Explora.
Crea.
CONOCIMIENTO QUE ABRE PUERTAS
Tu curiosidad. Nuevas posibilidades.
TU PRÓXIMO PASO EMPIEZA AQUÍ
De la curiosidad a la práctica.
Un paso a la vez.
Tú aportas las ideas.
Nosotros abrimos posibilidades.
PONLO EN PRÁCTICA
CAMINOS DIFERENTES. UN NUEVO COMIENZO.
Haz espacio para lo que viene.
ANTES DE TU PRIMER PASO
Todo buen recorrido empieza con una pregunta.
HAY UN LUGAR PARA TI EN LO QUE VIENE
Tu próxima posibilidad empieza con curiosidad.
Explora lo que aprenderás
Una nueva perspectiva. Nuevas posibilidades.
Ganesha, volver arriba
Volver arriba
Todos los derechos reservados.
Hecho para tu próximo paso.
Idioma`,
  fr: `Prototype Ganesha · Page de démonstration d’un cours pour tester le processus.
Aller au contenu
Ganesha, accueil
Navigation principale
Le cours
Ce que vous apprendrez
À qui s’adresse ce cours
Explorer le cours
Ouvrir le menu
Fermer le menu
Navigation mobile
Questions fréquentes
Explorer le parcours
Découvrir le cours
De nouvelles perspectives.
De vraies possibilités.
Un espace pour de nouvelles possibilités
Un studio d’apprentissage miniature en vue isométrique, avec une architecture ivoire, un ordinateur portable et des panneaux créatifs lavande.
Les grandes idées naissent
d’une nouvelle perspective.
Un peu de curiosité.
Un monde de possibilités.
Notre approche de l’apprentissage
Comprendre.
Explorer.
Créer.
LE SAVOIR QUI OUVRE DES PORTES
Votre curiosité. De nouvelles possibilités.
VOTRE PROCHAINE ÉTAPE COMMENCE ICI
De la curiosité à la pratique.
Un pas à la fois.
Vous apportez les idées.
Nous ouvrons les possibilités.
PASSEZ À LA PRATIQUE
DIFFÉRENTS CHEMINS. UN NOUVEAU DÉPART.
Faites place à la suite.
AVANT VOTRE PREMIER PAS
Tout beau parcours commence par une question.
IL Y A UNE PLACE POUR VOUS DANS LA SUITE
Votre prochaine possibilité commence par la curiosité.
Découvrez ce que vous apprendrez
Un regard neuf. De nouvelles possibilités.
Ganesha, retour en haut
Retour en haut
Tous droits réservés.
Pour votre prochaine étape.
Langue`,
  de: `Ganesha-Prototyp · Beispielseite eines Kurses zum Testen des Arbeitsablaufs.
Zum Inhalt springen
Ganesha, Startseite
Hauptnavigation
Der Kurs
Was du lernst
Für wen ist der Kurs
Kurs entdecken
Menü öffnen
Menü schließen
Mobile Navigation
Häufige Fragen
Lernweg entdecken
Kurs kennenlernen
Neue Perspektiven.
Echte Möglichkeiten.
Raum für neue Möglichkeiten
Ein isometrisches Miniatur-Lernstudio mit elfenbeinfarbener Architektur, einem Laptop und lavendelfarbenen Kreativtafeln.
Große Ideen beginnen
mit einer neuen Perspektive.
Ein wenig Neugier.
Eine Welt voller Möglichkeiten.
Unser Lernansatz
Verstehen.
Entdecken.
Gestalten.
WISSEN, DAS TÜREN ÖFFNET
Deine Neugier. Neue Möglichkeiten.
DEIN NÄCHSTER SCHRITT BEGINNT HIER
Von der Neugier zur Praxis.
Schritt für Schritt.
Du bringst die Ideen mit.
Wir eröffnen Möglichkeiten.
IN DIE PRAXIS UMSETZEN
VERSCHIEDENE WEGE. EIN NEUER ANFANG.
Schaffe Raum für das, was kommt.
VOR DEINEM ERSTEN SCHRITT
Jeder gute Lernweg beginnt mit einer Frage.
DEIN PLATZ IN DEM, WAS KOMMT
Deine nächste Möglichkeit beginnt mit Neugier.
Entdecke, was du lernst
Ein frischer Blick. Neue Möglichkeiten.
Ganesha, zurück nach oben
Nach oben
Alle Rechte vorbehalten.
Für deinen nächsten Schritt.
Sprache`,
  ja: `Ganeshaの試作版 · ワークフローのテスト用コース紹介ページです。
本文へスキップ
Ganesha、ホーム
メインナビゲーション
コースについて
学べること
こんな方に
コースを見る
メニューを開く
メニューを閉じる
モバイルナビゲーション
よくある質問
学習の流れを見る
コースを知る
新しい視点。
広がる可能性。
新たな可能性が生まれる場所
アイボリー色の建築、ノートパソコン、ラベンダー色の創作パネルを配した、アイソメトリックなミニチュア学習スタジオ。
素晴らしいアイデアは
新しい視点から。
小さな好奇心から。
可能性に満ちた世界へ。
私たちの学び方
理解する。
探求する。
創造する。
新しい扉を開く知識
あなたの好奇心が、新たな可能性へ。
次の一歩はここから
好奇心から実践へ。
一歩ずつ進もう。
アイデアはあなたから。
私たちが可能性を広げます。
実践してみよう
それぞれの道。新たな始まり。
これからの可能性を迎えよう。
最初の一歩の前に
よい学びは、問いから始まる。
これからの世界に、あなたの場所がある
次の可能性は、好奇心から始まる。
学べることを見る
新しい視点。新たな可能性。
Ganesha、ページの先頭へ
先頭へ戻る
無断転載を禁じます。
あなたの次の一歩のために。
言語`,
  hi: `Ganesha प्रोटोटाइप · कार्यप्रवाह की जाँच के लिए पाठ्यक्रम का प्रदर्शन पृष्ठ।
मुख्य सामग्री पर जाएँ
Ganesha, मुख्य पृष्ठ
मुख्य नेविगेशन
पाठ्यक्रम
आप क्या सीखेंगे
यह किसके लिए है
पाठ्यक्रम देखें
मेन्यू खोलें
मेन्यू बंद करें
मोबाइल नेविगेशन
अक्सर पूछे जाने वाले प्रश्न
सीखने का सफ़र देखें
पाठ्यक्रम जानें
नए नज़रिए।
वास्तविक संभावनाएँ।
नई संभावनाओं के लिए एक जगह
हाथीदाँत जैसे रंग की इमारत, लैपटॉप और हल्के बैंगनी रचनात्मक पैनलों वाला आइसोमेट्रिक लघु शिक्षण स्टूडियो।
बेहतरीन विचार शुरू होते हैं
एक नए नज़रिए से।
थोड़ी सी जिज्ञासा।
संभावनाओं की एक दुनिया।
सीखने का हमारा तरीका
समझें।
खोजें।
रचें।
नई राहें खोलने वाला ज्ञान
आपकी जिज्ञासा। नई संभावनाएँ।
आपका अगला कदम यहीं से शुरू होता है
जिज्ञासा से अभ्यास तक।
एक बार में एक कदम।
विचार आप लाते हैं।
हम संभावनाएँ खोलते हैं।
अभ्यास करें
अलग रास्ते। एक नई शुरुआत।
आगे आने वाले अवसरों के लिए जगह बनाएँ।
अपने पहले कदम से पहले
हर अच्छा सफ़र एक प्रश्न से शुरू होता है।
आने वाले कल में आपके लिए भी जगह है
आपकी अगली संभावना जिज्ञासा से शुरू होती है।
जानें कि आप क्या सीखेंगे
एक नया नज़रिया। नई संभावनाएँ।
Ganesha, शीर्ष पर लौटें
शीर्ष पर लौटें
सर्वाधिकार सुरक्षित।
आपके अगले कदम के लिए।
भाषा`,
  id: `Prototipe Ganesha · Halaman demonstrasi kursus untuk menguji alur kerja.
Lewati ke konten
Ganesha, beranda
Navigasi utama
Tentang kursus
Yang akan dipelajari
Untuk siapa
Jelajahi kursus
Buka menu
Tutup menu
Navigasi seluler
Pertanyaan umum
Jelajahi perjalanan belajar
Kenali kursus
Sudut pandang baru.
Peluang nyata.
Ruang untuk peluang baru
Studio belajar miniatur isometrik dengan arsitektur berwarna gading, laptop, dan panel kreatif berwarna lavender.
Ide hebat dimulai
dari sudut pandang baru.
Sedikit rasa ingin tahu.
Dunia penuh peluang.
Pendekatan belajar kami
Pahami.
Jelajahi.
Ciptakan.
PENGETAHUAN YANG MEMBUKA PINTU
Rasa ingin tahumu. Peluang baru.
LANGKAH BERIKUTNYA DIMULAI DI SINI
Dari rasa ingin tahu ke praktik.
Selangkah demi selangkah.
Kamu membawa ide.
Kami membuka peluang.
PRAKTIKKAN
JALAN BERBEDA. AWAL YANG BARU.
Beri ruang untuk langkah selanjutnya.
SEBELUM LANGKAH PERTAMAMU
Setiap perjalanan baik dimulai dengan pertanyaan.
ADA TEMPAT UNTUKMU DI MASA DEPAN
Peluang berikutnya dimulai dari rasa ingin tahu.
Jelajahi yang akan dipelajari
Sudut pandang segar. Peluang baru.
Ganesha, kembali ke atas
Kembali ke atas
Hak cipta dilindungi.
Untuk langkahmu berikutnya.
Bahasa`,
  ar: `نموذج Ganesha الأولي · صفحة دورة تجريبية لاختبار سير العمل.
انتقل إلى المحتوى
Ganesha، الصفحة الرئيسية
التنقل الرئيسي
عن الدورة
ما ستتعلمه
لمن هذه الدورة
استكشف الدورة
افتح القائمة
أغلق القائمة
التنقل على الهاتف
الأسئلة الشائعة
استكشف رحلة التعلم
تعرّف على الدورة
آفاق جديدة.
إمكانات حقيقية.
مساحة لإمكانات جديدة
استوديو تعلم مصغر بمنظور متساوي القياس، مع مبانٍ بلون عاجي وحاسوب محمول ولوحات إبداعية بلون الخزامى.
الأفكار العظيمة تبدأ
بنظرة جديدة.
قليل من الفضول.
عالم من الإمكانات.
منهجنا في التعلم
افهم.
استكشف.
ابتكر.
معرفة تفتح الأبواب
فضولك. إمكانات جديدة.
خطوتك التالية تبدأ هنا
من الفضول إلى الممارسة.
خطوة بخطوة.
أنت تأتي بالأفكار.
ونحن نفتح الإمكانات.
طبّق ما تعلمته
مسارات مختلفة. بداية جديدة.
افسح المجال لما هو قادم.
قبل خطوتك الأولى
كل رحلة جيدة تبدأ بسؤال.
لك مكان في المستقبل
إمكاناتك القادمة تبدأ بالفضول.
استكشف ما ستتعلمه
نظرة جديدة. إمكانات جديدة.
Ganesha، العودة إلى الأعلى
العودة إلى الأعلى
جميع الحقوق محفوظة.
من أجل خطوتك التالية.
اللغة`,
  ko: `Ganesha 프로토타입 · 작업 흐름 테스트를 위한 강좌 데모 페이지입니다.
본문으로 건너뛰기
Ganesha, 홈
주 메뉴
강좌 소개
배울 내용
추천 대상
강좌 살펴보기
메뉴 열기
메뉴 닫기
모바일 메뉴
자주 묻는 질문
학습 과정 살펴보기
강좌 알아보기
새로운 관점.
실질적인 가능성.
새로운 가능성을 위한 공간
아이보리색 건축물, 노트북, 라벤더색 창작 패널이 있는 아이소메트릭 미니어처 학습 스튜디오.
멋진 아이디어는
새로운 관점에서 시작됩니다.
작은 호기심.
가능성으로 가득한 세상.
우리의 학습 방식
이해하기.
탐색하기.
창조하기.
새로운 문을 여는 지식
당신의 호기심. 새로운 가능성.
다음 단계는 여기서 시작됩니다
호기심에서 실천으로.
한 걸음씩.
당신이 아이디어를 가져오면,
우리는 가능성을 엽니다.
직접 실천해 보세요
서로 다른 길. 새로운 시작.
다음 가능성을 위한 자리를 마련하세요.
첫걸음을 내딛기 전에
좋은 여정은 질문에서 시작됩니다.
다가올 미래에 당신의 자리가 있습니다
다음 가능성은 호기심에서 시작됩니다.
배울 내용 살펴보기
새로운 시선. 새로운 가능성.
Ganesha, 맨 위로 돌아가기
맨 위로
모든 권리 보유.
당신의 다음 단계를 위해.
언어`,
  'zh-CN': `Ganesha 原型 · 用于测试工作流程的课程演示页面。
跳转到正文
Ganesha，首页
主导航
课程介绍
学习内容
适合人群
探索课程
打开菜单
关闭菜单
移动端导航
常见问题
探索学习之旅
了解课程
全新视角。
切实的可能。
开启全新可能的空间
等距视角的微型学习工作室，配有象牙色建筑、笔记本电脑和淡紫色创意面板。
好创意始于
全新的视角。
一点好奇心。
无限的可能。
我们的学习方式
理解。
探索。
创造。
打开新大门的知识
你的好奇心。全新的可能。
你的下一步从这里开始
从好奇到实践。
一步一个脚印。
你带来创意。
我们打开可能。
动手实践
不同的道路。全新的开始。
为接下来的可能留出空间。
迈出第一步之前
每段美好的旅程都始于一个问题。
未来有属于你的位置
你的下一种可能始于好奇心。
探索你将学到的内容
全新视角。全新可能。
Ganesha，返回顶部
返回顶部
保留所有权利。
为你的下一步而设计。
语言`,
};

export const ui = Object.freeze(Object.fromEntries(locales.map(({ code }) => {
  const values = copy[code].split('\n');
  if (values.length !== keys.length || values.some(value => !value.trim())) throw new Error(`Incomplete UI locale: ${code}`);
  return [code, Object.freeze(Object.fromEntries(keys.map((key, i) => [key, values[i]])))];
})));

export function localeUrl(url, locale) {
  if (!isLocale(locale)) throw new Error('Unsupported locale');
  const target = new URL(url);
  target.search = locale === 'en' ? '' : `?lang=${locale}`;
  target.hash = '';
  return target.href;
}
