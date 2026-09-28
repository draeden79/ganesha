# Ganesha web — referência nativa validada (v2)

**Esta direção substitui a composição visual v1 de `EXPERIENCE.md`.** Não substitui currículo, contratos de progresso ou validação funcional. Pedido explícito do usuário: reproduzir a linguagem do Ganesha Desktop aberto no Mac.

## Evidência observada

Inspeção via Computer Use, aplicativo `ai.omganesha.app`, janela “Ganesha”, renderizador local `file:///Applications/Ganesha.app/Contents/Resources/app.asar/.vite/renderer/main_window/index.html`. Janela capturada em1228×768.

- `design/reference/ganesha-native-journey.jpg`: tela real de jornada. Lateral≈252px, painel principal branco, trilha horizontal, cartão ativo conectado a painel lavanda, um CTA, ilustração3D à direita.
- `design/reference/ganesha-native-stage.jpg`: etapa real acessada por “Começar etapa”. **A lateral desaparece.** Header≈78px com voltar/aula, molde compacto e etapa; uma superfície branca ampla; h1≈32px, corpo≈20px; ilustração menor ao lado; callout creme; textarea amplo; rodapé simples.
- `design/reference/ganesha-native-stage-ax.txt`: árvore de acessibilidade da etapa, confirmando campo “Do seu jeito”, sugestões e navegação.

Nenhuma resposta foi escrita/enviada, nenhuma etapa concluída, nenhuma IA acionada. Etapas futuras estavam bloqueadas; não afirmamos ter visto o estilo nativo de feedback/acerto/erro. Esses estados no web são adaptação de controles já existentes, coerente com a referência observada. Capturas incluem o nome real do perfil na referência; esse nome não aparece no produto web.

A fonte local confirma Figtree, primária#6C3BEE, tinta#17151F, cards brancos, radius-panel20px, radius-card16px. Valores estão alinhados ao DESIGN_SYSTEM.md. Observação visual precedeu qualquer leitura dos assets/CSS locais.

## Entrega executável

- `native.html`, `native.css`, `native.js`: protótipo novo, lê **diretamente** `content/curriculum/course.json` e `content/locales/*.json`.
- `serve-preview.py`: serve design + currículo canônico sem copiá-lo para design. Após integração: `python3 design/serve-preview.py --port4176` (separe opção/valor como `--port 4176`). No worktree do Artista: `--content-dir /Users/lucasmarques/.codex/worktrees/30b2/Ganesha/content`.
- URL principal: `http://127.0.0.1:4176/native.html`.
- Etapa de prática: `http://127.0.0.1:4176/native.html?screen=lesson&step=1`.
- Árabe: adicionar `&lang=ar` ou selecionar idioma. Navegação/formulários usam dados reais; estado de demonstração próprio, sem tocar storage do app.

O Construtor deve implementar a direção no renderer existente; **não substituir o motor de progresso pelos handlers do protótipo**. A página antiga `index.html` permanece apenas como arquivo histórico v1.

## Dois modos de composição

### Jornada

Canvas lavanda#F5F3FB, padding20px. Grid `252px minmax(0,1fr)` com gap14px. Duas superfícies brancas, border#ECE9F0, radius20px, sombra quase imperceptível.

Lateral: logo real do elefante + Ganesha, label Aulas, lista de aulas publicadas. Há **uma aula** disponível hoje; não copiar as seis aulas da referência nem inventar perfil. Espaço restante fica livre. Idioma/ferramenta discretos no rodapé; uma única indicação de demonstração, expansível para detalhe de progresso local/revisão editorial.

Painel principal: heading “Etapas da aula” + nome da aula em roxo. Controles anterior/próxima discretos. Trilha horizontal com sete cartões132×176px, gap34px, snap e scroll nativo. Estado ativo estende até196px e se conecta visualmente ao painel lavanda abaixo. Sombras internas sutis, anel roxo na etapa ativa. Texto inteiro com quebra; sem truncar instruções. Em idiomas longos, permitir aumento da altura comum dos cartões.

Painel selecionado: fundo#F0EAF8, radius20px, min-height380px, padding30/26/22px. Duas colunas: título/objetivo/resultado à esquerda e ilustração contextual transparente de250px à direita. Um CTA alinhado ao fim. A imagem é educativa/contextual, sem fundo retangular visível, sem texto rasterizado.

Sem hero separado, cards de estatística, anel grande de progresso, breadcrumb global, avisos em três lugares ou saudação inventada. Progresso aparece uma vez na aula da lateral e no estado dos cartões.

### Etapa em foco

**Remover a lateral inteira.** Canvas lavanda, header de78px. Voltar+aula à esquerda; estado compacto central (pontos/etapa); idioma e acesso ao índice à direita. Contagem sempre relativa às7etapas reais; os10passos da referência nativa não alteram nosso currículo.

Main branco, radius22px, margem horizontal16px, padding32px; max-width1540px. H1 de32px no topo, corpo19–20px/1.6, objetivo16px de apoio. Conteúdo principal tem coluna flexível e ilustração/diagrama lateral230px quando contribui. No restante da tela, formulário usa largura até960px, sem card dentro de card.

A variante Claude/Codex fica em disclosure simples, com seletor compacto. Na execução externa, começa aberto por ser instrução necessária. Dicas/critérios continuam acessíveis pelo botão “Ajuda”, que abre diálogo **com conteúdo local**. Não é tutor de IA. Usar mascote nativo pequeno; nunca ocupar área do campo.

CTA primário no rodapé; voltar discreto. Se a tela exigir rolagem, o web usa fluxo natural, evitando a máscara/fade da referência que pode esconder campos. Não eliminar texto para caber numa altura fixa. Uma única indicação de demo/revisão fica no rodapé de cada tela.

## Mapeamento dos componentes atuais

| Atual | Novo | Ação do Construtor |
| --- | --- | --- |
| Sidebar+topbar globais sempre visíveis | JourneyShell / FocusShell | Renderizar lateral só na jornada; etapa com topbar mínima |
| Hero + ilustração | SelectedStagePanel | Integrar preview da etapa ativa ao trilho; retirar hero de curso repetido |
| Lista vertical de etapas | HorizontalStepRail | Cartões com IDs reais e estado derivado do progresso; setas/scroll acessíveis |
| Progress ring / progress side card | Status da aula e marcadores do trilho | Remover repetição; manter mesma fórmula real de progresso |
| Article em card + aside de índice | LessonSheet em largura ampla | Índice abre por botão1/7; conteúdo em primeiro plano |
| Dicas/critérios no aside | LocalHelpDialog | Texto completo, foco contido, Escape fecha, devolve foco ao botão |
| Cartões de rubrica | Lista de autoavaliação no formulário | Manter todos os critérios; visual mais leve, checkbox e texto clicáveis |
| Tool picker e longas instruções repetidas | ToolContextDisclosure | Seleção discreta; instrução aberta no external-real-task; texto fonte preservado |
| Avisos repetidos | DemoInfo | Um indicador por tela + detalhes acessíveis; aviso de simulação junto ao campo quando necessário |
| Símbolo genérico da marca | Logo nativo legítimo | Copiar PNGoriginal; wordmark isoladoLTR; não recolorir o asset |

## Sete telas e estados

IDs permanecem: scope → brief → request-check → run → evidence-check → repair → transfer. As quatro práticas (brief/run/repair/transfer) continuam obrigatórias e autodeclaradas onde o contrato define. As duas verificações independentes continuam com opções, feedback, tentativa e gate.

- Scope: texto amplo e ilustração lateral. Ação e resultado esperado visíveis.
- Brief: exemplo em callout creme, instrução, textarea, rubrica leve, registrar prática. Nada enviado àIA.
- Request-check: opções grandes e comparáveis em coluna; nenhuma sequência decorativa insinuando relação causal. Feedback abaixo da ação.
- Run: instrução da ferramenta aberta, registro da execução externa, rubrica. Sem terminal/stream falso.
- Evidence-check: cenário + figura de afirmação/evidência quando útil; opções completas.
- Repair: cenário em callout, observado/esperado/reprodução/reteste na rubrica; campo amplo.
- Transfer: bifurcação Claude/Codex com rótulosHTML, campo e dois critérios. Celebração somente depois da prática.

Estados: atual usa anel+texto; concluído usa check+texto. Futuro neutro não deve receber cadeado se o motor permite revisão/visita. Progresso real governa conclusão, não a ordem visual. Erro conserva resposta e fica próximo ao controle. Loading descreve só trabalho real. Falha de salvamento deve substituir a indicação de salvo, sem esconder conteúdo. Conteúdo/locale indisponível usa recuperação existente; não fallback silencioso.

## Responsividade e11idiomas

≤1100px: lateral218px, painel padding20px, ilustração190–230px. ≤760px: lateral vira cabeçalho compacto com marca e seletores; aula atual é mostrada no painel. Trilha horizontal preserva cada card inteiro e pode rolar; não causar overflow da página. Preview empilha texto/imagem/CTA.

Na etapa mobile, header≈66px, main padding20px, h1 de28px, corpo17px/1.65, textarea17px. Título fica perto do topo (sem bloco de avisos/índice/dicas antes). Formulários e opções autoexpandem. Diagrama semântico permanece no fluxo; só a ilustração redundante pode sair. Ações principais≥46px e alvos interativos≥44px quando possível.

Texto curricular vem dos11catálogos autoritativos. `native.js` mantém apenas rótulos de UI e usa `locales.js` para chrome demonstrativo; não duplicar conteúdo no app. Árabe espelha a ordem lógica, setas e controles; marca/código/nomesClaude/Codex ficam isoladosLTR. Textarea dir=auto. CJK/árabe sem tracking latino. Fontes adequadas herdadas da implementação existente; Figtree nativa foi copiada com licençaOFL para o protótipo.

## Relação com DESIGN_SYSTEM.md

Preservados: Figtree, roxo#6C3BEE, tinta#17151F, superfícies claras/creme/lavanda,3Disométrico e dourado pontual no asset/mascote. A direção nativa, por instrução explícita do usuário, altera a composição: trilho horizontal conectado, etapa sem lateral, texto maior e ausência dos cards/resumos extras. Logo original tem roxo próprio; manter o bitmap legítimo é mais fiel que recolori-lo. Não copiar animações longas da referência: transições120–180ms, respeitando movimento reduzido.

## Referência x implementação

Não foi copiado código funcional do desktop. Foram observados UI/AX, lidos tokensCSS para precisão e reutilizados assets estáticos locais legítimos. O protótipo mostra uma adaptação ao currículo web atual, não uma migração do curso nativo de viagem. O pacote mantém evidência e entrega separadas.
