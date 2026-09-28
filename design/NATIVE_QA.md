# QA do redesign baseado no desktop

Data: 28/09/2026. Direção nova substitui a aprovação visual da baseline `96a9edb`. O web funcional refeito será validado separadamente depois da implementação do Construtor.

## Referência real

App `ai.omganesha.app`, janela Ganesha, versão instalada no Mac. Jornada e primeira etapa observadas; capturas em `reference/`. Nenhuma atividade respondida/concluída ou IA acionada. Feedback/checks nativos posteriores estavam bloqueados e não foram inventados como observação.

## Protótipo v2

URL `http://127.0.0.1:4176/native.html`. Currículo canônico lido do Educador, sem cópia em `design/`. O protótipo preserva 7 telas, 4 práticas e 2 checks; seu estado usa chave separada do app real.

- Desktop 1280×720: jornada com lateral de 252 px, cartões horizontais e painel de etapa; captura `qa/native-web-journey.jpg`.
- Etapa desktop: lateral removida, superfície ampla, h1/body maiores, ilustração contextual transparente; `qa/native-web-stage.jpg`.
- Prática desktop: conteúdo e rubrica do Educador renderizados em layout focado; `qa/native-web-practice.jpg`.
- Prática mobile 390×844: clientWidth=scrollWidth=390; `qa/native-web-mobile-practice.jpg`.
- Prática árabe 390×844: dir=rtl, clientWidth=scrollWidth=390, título em y=90 px; `qa/native-web-ar-mobile.jpg`.
- Ajuda árabe abre diálogo com as duas dicas e o critério reais da etapa; botão de fechar recebe foco. Não é chat/IA. Escape e retorno de foco são fornecidos pelo dialog nativo.
- JavaScript passou `node --check design/native.js`.

O protótipo não substitui testes de storage/versionamento do app. Os 11 catálogos curriculares são resolvidos diretamente; revisão nativa das traduções continua pendente. A especificação mantém fontes e RTL da implementação. A validação final dos 11 idiomas no novo app ainda depende da integração.

## Limites e decisões

Somente um curso/aula disponível é mostrado; não copiar as 6 aulas do desktop nem o perfil Lucas. O curso nativo sobre viagem não substitui nosso currículo. O logo/mascote foram reutilizados dos recursos locais legítimos; fonte Figtree com licença. A ilustração de oficina foi derivada com image_gen para fundo transparente, mantendo assunto coerente com criação de sites.

Em mobile, a rolagem vertical é natural. O fade/rodapé sobreposto do desktop não foi copiado porque poderia encobrir campo e feedback. A trilha pode rolar horizontalmente dentro do próprio contêiner; o documento não deve rolar horizontalmente.

Reteste adicional do protótipo: prática canônica renderizada nos 11 locales em 390 px, sem overflow horizontal (`qa/native-web-locales-mobile.json`). Jornada mobile: largura do documento 390 px; trilho 984 px contido em viewport de 330 px, com rolagem própria (`qa/native-web-mobile-journey.jpg`). Isso é inspeção do protótipo; o app refeito continua aguardando QA independente.

## Correção da evidência mobile em português

A captura anterior `qa/native-web-mobile-practice.jpg`, com 390×219 px, era inválida e foi substituída após confirmar a viewport e o DOM em chamadas separadas. A nova imagem JPEG tem 390×844 px, documento e viewport com 390 px de largura, título de 28 px em y=90 px e layout mobile íntegro. A área lavanda excessiva da imagem anterior não foi reproduzida. Esta evidência vale somente para o protótipo.

O currículo do Educador agora declara `releasedLessonIds=[]` e aula `draft`. O demonstrador seleciona explicitamente `lesson.first-request` como prévia quando não há aula liberada; não modifica o currículo nem afirma liberação. O app funcional deve continuar distinguindo conteúdo em revisão de aula liberada.
