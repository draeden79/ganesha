# QA do redesign baseado no desktop

Data: 28/09/2026. Direção nova substitui a aprovação visual da baseline `96a9edb`. O app funcional refeito foi revisado separadamente; veja o registro da build abaixo.

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

O protótipo não substitui testes de storage/versionamento do app. Os 11 catálogos curriculares são resolvidos diretamente; revisão nativa das traduções continua pendente. A especificação mantém fontes e RTL da implementação. A validação visual dos 11 idiomas no app integrado está registrada abaixo.

## Limites e decisões

Somente um curso/aula disponível é mostrado; não copiar as 6 aulas do desktop nem o perfil Lucas. O curso nativo sobre viagem não substitui nosso currículo. O logo/mascote foram reutilizados dos recursos locais legítimos; fonte Figtree com licença. A ilustração de oficina foi derivada com image_gen para fundo transparente, mantendo assunto coerente com criação de sites.

Em mobile, a rolagem vertical é natural. O fade/rodapé sobreposto do desktop não foi copiado porque poderia encobrir campo e feedback. A trilha pode rolar horizontalmente dentro do próprio contêiner; o documento não deve rolar horizontalmente.

Reteste adicional do protótipo: prática canônica renderizada nos 11 locales em 390 px, sem overflow horizontal (`qa/native-web-locales-mobile.json`). Jornada mobile: largura do documento 390 px; trilho 984 px contido em viewport de 330 px, com rolagem própria (`qa/native-web-mobile-journey.jpg`). Isso é inspeção do protótipo; esse registro antecede a revisão independente do app descrita abaixo.

## Correção da evidência mobile em português

A captura anterior `qa/native-web-mobile-practice.jpg`, com 390×219 px, era inválida e foi substituída após confirmar a viewport e o DOM em chamadas separadas. A nova imagem JPEG tem 390×844 px, documento e viewport com 390 px de largura, título de 28 px em y=90 px e layout mobile íntegro. A área lavanda excessiva da imagem anterior não foi reproduzida. Esta evidência vale somente para o protótipo.

O currículo do Educador agora declara `releasedLessonIds=[]` e aula `draft`. O demonstrador seleciona explicitamente `lesson.first-request` como prévia quando não há aula liberada; não modifica o currículo nem afirma liberação. O app funcional deve continuar distinguindo conteúdo em revisão de aula liberada.

## App funcional — build `ba992e7`

Origem de QA: `http://localhost:3101/course/pt-BR`, separada de `127.0.0.1:3101` usada pelo usuário/Diretor. O Construtor congelou a build durante a inspeção. Somente estado de QA foi alterado; nenhum serviço externo foi executado.

### Resultado visual

- Desktop 1280×720: jornada fiel à composição observada no desktop nativo. Lateral de aulas, trilho horizontal, painel lavanda conectado, arte transparente e CTA único. A etapa remove a lateral e prioriza título, texto e atividade.
- Prática mobile 390×844 nos 11 idiomas: documento com 390 px, sem overflow horizontal, título de 28 px em y=90 px, quatro critérios presentes, um aviso editorial e nenhum sidebar. Registro: `qa/app-native-locales-mobile.json`.
- Jornada mobile nos 11 idiomas: documento com 390 px; trilho de 984 px contido em 330 px; nenhum cartão com texto cortado. Marca permanece LTR no árabe. Registro: `qa/app-native-journey-locales-mobile.json`.
- Árabe: leitura RTL, controles espelhados, fonte Noto Sans Arabic. Hindi: Noto Sans Devanagari. CJK: fontes específicas sem tracking latino.
- Sete telas visitadas: conteúdo, exemplos, instruções, opções, rubricas e resultados esperados permanecem no fluxo. Quatro práticas preservam respectivamente 4/2/4/2 critérios. A prática externa abre as instruções da ferramenta; troca Claude/Codex mostra os textos correspondentes.
- Ajuda local mostra as duas dicas e o critério da prática em árabe. Diálogo de 358 px na viewport de 390 px, foco inicial em fechar; Escape fecha e devolve foco à Ajuda. O índice tem sete itens e fica em diálogo, com um único botão no cabeçalho.
- Formulários, rubricas e feedback rolam naturalmente; nenhum rodapé ou máscara cobre controles. Textarea conserva `dir=auto`.

### Verificação pontual de interação

As duas verificações foram exercitadas individualmente pela interface. Resposta incorreta mantém Continuar desabilitado e apresenta feedback específico completo; resposta correta apresenta feedback de sucesso e libera a etapa. A segunda verificação continuou bloqueada antes de receber sua própria resposta. Não foi executado um ciclo integral de conclusão das quatro práticas: validação de persistência, versão de progresso e regressão do motor continua sendo responsabilidade da suíte do Construtor/Devorador.

### Ajuste resolvido — build `ea16987`

Em `run`, um aviso extra da interface repetia a informação de execução externa e autoavaliação já presente no callout curricular. Solicitação ao Construtor: preservar o callout canônico integralmente e retirar somente a duplicação da interface. Reteste independente após reload da build `ea16987`: português e árabe mantêm os dois callouts canônicos completos, duas linhas de rubrica e instrução de ferramenta aberta. O aviso duplicado não aparece (`mode-notice=0`); há um único `demo-info`. Documento continua com 390 px. Captura: `qa/app-native-mobile-run-corrected.jpg`. Nenhum outro achado visual pendente.

### Evidência visual

As capturas do app são JPEG reais; extensão e dimensões foram conferidas. Capturas foram feitas após estabilização em chamada separada da mudança de viewport/tela.

- `qa/app-native-desktop-journey.jpg` — jornada 1280×720.
- `qa/app-native-desktop-stage.jpg` — etapa de introdução 1280×720, arte íntegra.
- `qa/app-native-desktop-practice.jpg` — prática 1280×720; texto árabe no campo é um rascunho de QA preservado ao trocar de idioma.
- `qa/app-native-mobile-practice.jpg` — prática pt-BR 390×844.
- `qa/app-native-ar-mobile.jpg` — prática árabe 390×844.
- `qa/app-native-ar-help.jpg` — ajuda local árabe 390×844.
- `qa/app-native-mobile-check-error.jpg` — feedback incorreto completo 390×844.
- `qa/app-native-mobile-form.jpg` — campo, rubrica e rodapé 390×844.
- `qa/app-native-mobile-journey.jpg` e `qa/app-native-ar-mobile-journey.jpg` — jornada mobile pt-BR/árabe.

A revisão linguística por falantes nativos continua pendente. Aprovação visual não transforma a aula em conteúdo liberado: `releasedLessonIds=[]`, aula em rascunho.

**Parecer final:** direção visual nativa implementada e aprovada na build `ea16987`, com a cobertura e os limites acima. O protótipo permanece disponível em `http://127.0.0.1:4176/native.html`; as evidências do app funcional estão separadas das evidências do protótipo.
