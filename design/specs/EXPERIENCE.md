# Experiência de aprendizagem Ganesha

Referência normativa: `../../DESIGN_SYSTEM.md`. Direção: uma oficina calma para criar; confiança vem de pequenas ações observáveis. Sem moedas, vidas, ranking, streak, percentuais arbitrários ou estimativas de tempo inventadas. A etapa é a unidade de tela; o currículo determina quantidade e ordem.

## Composição

- Desktop ≥1150px: navegação lateral 224px, creme; cabeçalho 82px; área de conteúdo até 1320px com margens internas de 42px. Jornada: hero lavanda (texto + oficina 3D), lista ordenada de etapas, resumo do projeto e evidências.
- Aula: conteúdo principal flexível + índice de etapas de 265px. Superfície branca, limite de leitura de cerca de 65 caracteres. Um título, uma instrução e uma ação principal por tela. Índice permite revisão; não concede conclusão.
- 681–1149px: lateral 185px e margens 26px; índice da aula passa acima do conteúdo. Não ocultar a etapa atual; nome completo deve continuar disponível em título acessível.
- ≤680px: marca/navegação no topo, margens 20px, uma coluna. Ilustração abaixo do texto; controles em linhas fluidas. Rodapé da etapa empilhado. Evitar barras fixas que cubram teclado virtual ou feedback.
- Progresso: numerador é quantidade de etapas realmente concluídas; denominador vem do currículo. O percurso de demonstração não representa progresso no curso real.

## Componentes e comportamentos

| Componente | Conteúdo e interação | Acessibilidade/estados |
| --- | --- | --- |
| CourseShell | Marca Ganesha, jornada, idioma, ferramenta | `lang` e `dir` no documento; link para pular conteúdo; foco visível; nomes acessíveis traduzidos |
| JourneyHero | Resultado a criar, CTA iniciar/retomar, ilustração | Alt localizado ou `alt=""` se decorativa; CTA reflete estado persistido |
| StepPath | Lista ordenada com título, tipo, status e indicador | Ícone + texto + cor; nunca apenas cor. Estado atual usa `aria-current="step"`; sem limite fixo de nós |
| LessonFrame | Tipo da etapa, título, instrução, visual, tarefa e rodapé | Novo título recebe foco programático após navegação; manter ordem DOM sem inversões CSS |
| ConceptDiagram | Objetivo → contexto → critérios, com texto HTML | Em mobile, eixo vertical; em árabe, ordem lógica RTL. Não usar canvas/raster para rótulos |
| ToolChoice | Claude / Codex | Grupo de botões com `aria-pressed`; marcas em `bdi`; troca mantém respostas compatíveis e nunca muda competência |
| GuidedPractice | Label, instrução, textarea, ajuda, exemplo opcional | Labels persistentes, não só placeholder. Exemplo sempre marcado como simulação; nenhum spinner afirma executar IA real |
| LearningCheck | Enunciado, opções, ação de verificar, feedback, nova tentativa | `fieldset`/`legend`, radios nativos, feedback em `role="status"`; erro explica o critério sem humilhar |
| ExternalPractice | Instrução específica da ferramenta, saída/retorno e evidência | Diferenciar executar fora da Ganesha, simular, autodeclarar e validar. Não atribuir evidência a integração inexistente |
| RevisionPractice | Observação → mudança pedida → novo teste | Texto e comparação visíveis; preservar primeira tentativa e revisão quando contrato permitir |
| Completion | Evidências realizadas e próximo uso | Só aparecer como concluído quando práticas e ≥2 verificações independentes cumprirem o contrato; repetição não duplica progresso |
| InlineNotice | Título, causa acionável, ação e estado dos dados | Erro não só cor; `role="alert"` apenas para falha imediata. Conteúdo localizado |

## Biblioteca das sete telas L01

Mapeamento provisório por ordem; IDs finais vêm do Educador. Não copiar o conteúdo deste protótipo para o currículo autoritativo.

| Ordem | Tela | Visual que ensina | Comportamento |
| --- | --- | --- | --- |
| 1 | Resultado / briefing | Miniatura de página + diagrama objetivo/contexto/critérios | Explica a competência; continuar abre a prática |
| 2 | Prática de contexto | Três critérios ao lado/acima do campo de pedido | Campo editável + exemplo opcional marcado; salvar rascunho, preservar ao trocar idioma |
| 3 | Avaliação do pedido | Cartões de pedido comparáveis com texto real | Uma escolha + feedback específico + nova tentativa; verificação 1 independente |
| 4 | Execução externa | Sequência abrir ferramenta → executar → voltar com evidência | Variante Claude/Codex vinda das fontes; mostrar claramente que ocorre fora da Ganesha |
| 5 | Avaliação da evidência | Cartões de evidência comparáveis ou rubrica | Exigir evidência alinhada aos critérios; verificação 2 independente |
| 6 | Correção | Antes/observação → pedido de melhoria → novo teste | Preservar tentativa original; erro pode ser corrigido sem perda do avanço legítimo |
| 7 | Transferência | Resumo das ações realizadas, sem pontuação fictícia | Convite a aplicar a uma nova ideia; conclusão só com os critérios do currículo |

## Estados do produto

- **Inicial:** 0 etapas concluídas, CTA “Começar”; sem medalhas ou nome inventado de aluno.
- **Em progresso:** retomar o último ponto seguro; mostrar etapa atual e critério ainda pendente.
- **Concluído:** check + texto, possibilidade de revisar; progresso deduplicado pelo ID.
- **Resposta incorreta:** borda/ícone/explicação em vermelho escuro + CTA nova tentativa. Não zerar práticas nem dar avaliação global da pessoa.
- **Carregando:** label descreve o trabalho real: carregar aula, salvar ou preparar exemplo. `aria-busy` no contêiner; reservar altura; manter cancelamento se espera puder ser longa.
- **Retorno:** última etapa, resposta e ferramenta reaparecem; após execução externa, destacar captura/checagem da evidência.
- **Falha de persistência:** banner localizado explica que o progresso desta sessão continua, mas não está salvo; tentar salvar novamente/exportar se implementação suportar. Não exibir “salvo”.
- **Dados recuperados:** informar que uma cópia recuperada foi aberta e apontar o último ponto restaurado; não declarar recuperação sem cópia real. Histórico incompatível deve ser preservado e acessível.
- **Curso/idioma indisponível:** nome do idioma e motivo; opção explícita de escolher outro idioma e voltar à jornada. Não renderizar fallback silencioso como tradução concluída.
- **Acesso ausente/negado:** tela curta indicando necessidade de acesso + link de retorno definido no contrato da landing. A demonstração deve estar identificada. Não incluir pagamento fictício.

Chaves sugeridas para o Construtor, a traduzir em todos os catálogos: `status.saving`, `status.saved`, `status.saveFailed.title`, `status.saveFailed.body`, `action.retrySave`, `status.recovered.title`, `status.recovered.body`, `status.incompatible.title`, `status.incompatible.body`, `course.unavailable.title`, `course.unavailable.body`, `locale.unavailable.title`, `locale.unavailable.body`, `access.required.title`, `access.required.body`, `action.returnToEntry`, `demo.label`, `simulation.label`, `simulation.notice`.

## Tipografia e localização

Figtree para latim; Noto Sans Arabic / Devanagari / JP / KR / SC ou fallback validado para os demais alfabetos. `tokens.css` define stacks por `:lang()`. Preferir fontes locais licenciadas no app real. Fontes remotas no protótipo exigem rede; usar fallbacks do sistema offline e registrar isso no QA.

Todos os 11 locales têm textos de demonstração em `locales.js`: pt-BR, en, es, fr, de, ja, hi, id, ar, ko, zh-CN. Isso é presença de tradução, não revisão nativa ou aprovação pedagógica. O Educador mantém conteúdo autoritativo em `content/locales/*.json`. Não gerar novo catálogo paralelo no app real.

- Reservar expansão de 35–50% nos labels latinos; usar alturas automáticas e quebra natural. Não cortar instruções com ellipsis.
- CJK sem uppercase nem tracking; árabe sem letter-spacing, line-height ≥1.75; hindi line-height ≥1.75. Não impor limites de caracteres que favoreçam latim.
- `dir="rtl"` no árabe; propriedades CSS lógicas. Espelhar setas de navegação, nunca marcas/ilustrações/código. Trechos de código/URLs em `dir="ltr"` e `unicode-bidi:isolate`. Nomes de ferramentas em `bdi`.
- Números por `Intl.NumberFormat(locale)`; texto pluralizado por mensagens completas no app final; não concatenar frases de idiomas distintos.
- Texto de resposta do aluno mantém idioma original ao trocar locale; rótulos/feedback seguem o locale selecionado. Indicar que é texto próprio quando necessário.

## Movimento, contraste e teclado

Microinterações de 120–180ms; progresso até 240ms. Hover de botão sobe 1px; sem parallax, som automático, animação contínua de troféus ou confete obrigatório. `prefers-reduced-motion: reduce` remove animações/transições. Indicadores de carregamento mantêm texto mesmo sem movimento.

Texto principal #17151F; apoio #686473; roxo #6C3BEE sobre superfícies claras. Bordas decorativas #E7E3ED; limites de campos interativos #918B9D, distintos para garantir identificação. Feedback usa #246548/#EEF7F1 e #A23837/#FCEFEF. Foco de 3px #442194, offset 4px, sem ser encoberto.

Botões principais ≥46px; controles de seleção e idioma ≥42px. Radios/checkboxes com label clicável ≥44px. Ordem de Tab segue leitura. Setas direcionais não são único nome de botão. Gráficos precisam de descrição textual equivalente.

## Fronteiras de responsabilidade

Artista: `design/`. Construtor: implementação e catálogos UI; pode importar tokens e copiar o asset para `public/`. Educador: estrutura e conteúdo pedagógico. Diretor: integração e aceite. Não sobrescrever `DESIGN_SYSTEM.md` nem arquivos do app. O protótipo demonstra layout/estados e não integra autenticação, pagamento ou ferramentas de IA.
