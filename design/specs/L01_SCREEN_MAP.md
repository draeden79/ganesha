# L01 — mapa de telas ligado ao currículo

Fonte: Educador, `content/curriculum/course.json`, commit `153c4d8`, curso `course.first-site@0.1.0`, aula `lesson.first-request`. Os sete IDs abaixo são autoritativos. O protótipo em `design/index.html` é estudo de interação; os textos reais são resolvidos de `content/locales/*.json`.

## Direção por tela

| ID | Componente e arranjo | Representação didática | Fonte dos textos |
| --- | --- | --- | --- |
| `step.first-request.scope` | LessonFrame + 3 cartões + orientação da ferramenta expansível | Público → resultado → ação. Ícones de pessoa, página e cursor, sempre acompanhados de texto | `sscope.*`; se faltarem rótulos curtos, usar objetivo/esperado/critério completos; não recortar frases automaticamente |
| `step.first-request.brief` | LessonFrame + mapa de 4 requisitos + campo editável + autoavaliação | Quatro cartões iguais, numerados: entrega, contexto, limite, teste. Mesmo agrupamento na rubrica reduz carga de memória | `rubric.request.*`, `example.request`; caption `sbrief.visual` |
| `step.first-request.request-check` | LearningCheck, 3 cartões de escolha em coluna | Alternativas comparáveis, com tipografia/alinhamento iguais; nenhum ícone/cor indica resposta antes da tentativa | `check.request.*`; feedback individual da alternativa e feedback de nova tentativa/sucesso |
| `step.first-request.run` | ExternalPractice, instrução específica visível, fluxo e registro | Abrir contexto → enviar pedido → registrar resposta. A execução acontece no aplicativo externo, sem terminal falso ou animação de resposta conectada | `tool.claude`/`tool.codex`, `srun.*`, `rubric.execution.*`, `notice.self-report` |
| `step.first-request.evidence-check` | LearningCheck + cenário visual acima das opções | Balão de fala com o cenário fornecido; ao lado, moldura de documento/preview vazia, com tracejado. Contrasta afirmação e evidência, sem insinuar que algo foi realmente gerado | `sevidence-check.body` e caption `sevidence-check.visual`; opções/feedback em `check.evidence.*` |
| `step.first-request.repair` | RevisionPractice + 4 cartões + campo/rubrica | Observado → esperado → reprodução → reteste. Os cartões acompanham a rubrica; cenário em superfície creme, pedido em campo branco | `example.failure`, `rubric.repair.*`; caption `srepair.visual` |
| `step.first-request.transfer` | TransferPractice + bifurcação + campo/rubrica | Um pedido central chega a dois contextos Claude/Codex. Objetivo/critério permanecem; muda onde trabalhar e inspecionar. **Esta tela é prática obrigatória**, não apenas celebração | `stransfer.*`, `rubric.transfer.*`, nomes Claude/Codex isolados com `bdi` |

A celebração é estado posterior à transferência, nunca substituto da tela 7. A prática externa mantém registro autodeclarado; a UI não afirma publicação real. A aula é considerada concluída somente pelas regras de progresso do contrato.

## Contrato de visual reutilizável

`TeachingVisual` deve receber `layout: cards | sequence | comparison | fork`, `caption: string`, `items: { id, label, description?, icon? }[]`. Todo `label/description/caption` chega resolvido do locale. Ícones são SVG geométrico com `aria-hidden`; não carregar textos por imagem, não extrair rótulos de frases traduzidas e não usar `innerHTML`.

- `cards`: grid 2×2 quando quatro itens; 3 colunas para três itens; 1 coluna no celular se a expansão exigir. Ícones com traço 1.65px, 24px; quadrados 48px em branco sobre superfície lavanda.
- `sequence`: lista ordenada com conectores decorativos; desktop horizontal, mobile vertical. Ordem DOM natural; setas obedecem RTL.
- `comparison`: duas colunas com títulos/legendas em HTML, empilhadas no celular. Regiões equivalentes em tamanho/peso para não sugerir resposta por decoração.
- `fork`: item central + dois destinos; os nomes dos produtos não mudam ao espelhar. Sem animação de tráfego ou afirmação de integração real.
- Toda figura tem `figcaption` legível; imagem meramente decorativa usa alt vazio. Quando a legenda já descreve o visual inteiro, ícones são escondidos do leitor de tela para evitar duplicação.
- Para não repetir rubricas longas duas vezes, transformar a própria rubrica em cartões com checkbox acessível; o layout visual reforça a autoavaliação sem acrescentar parágrafos.

## Estados preservados

1. Draft vazio, draft salvo, revisão ainda pendente e prática autodeclarada concluída são distintos.
2. Resposta selecionada, submetida incorreta, nova tentativa e aprovação têm feedback próprio por etapa.
3. Alteração em rascunho aprovado invalida a conclusão correspondente e exige nova autoavaliação; não destrói histórico.
4. Troca de ferramenta não muda os objetivos nem traduz texto escrito pelo aluno. Exibe nova instrução de contexto, mantendo campos compatíveis.
5. Acesso externo indisponível: salvar pedido e voltar depois; não oferecer atalho que conte execução fictícia.
6. Foco vai para título na navegação; feedback fica próximo do controle e é anunciado. Depois de erro, preservar seleção/texto.

## Dimensões e móvel

Desktop: conteúdo 600–700px, índice 250–265px. Cartões visuais com 16–20px de padding e gap 12px; altura baseada em conteúdo. Mobile: controles ≥44px, legendas 13–14px, corpo ≥15px quando possível, títulos 28–30px. Dicas e critérios permanecem acessíveis via disclosure; não usar `display:none` para eliminar orientação pedagógica.

## Cobertura

O app de produção consome exclusivamente os catálogos do Educador. `design/locales.js` contém 84 chaves por idioma para o protótipo e não é fonte de currículo. Status: traduções presentes, revisão nativa pendente. As variantes Claude/Codex finais pertencem aos textos/fonte do Educador; este documento não especifica interfaces atuais das ferramentas.
