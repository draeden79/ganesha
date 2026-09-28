# Contrato editorial 0.3.0

Entrega mínima: 12 aulas, 10 etapas significativas por aula, 2 avaliações distintas por aula, 11 idiomas. Prazo: 2026-09-28 15:00 America/Los_Angeles (22:00 UTC). Coordenar externamente apenas com Diretor e Artista. Não tocar no pacote canônico0.2.0 nem no app enquanto este pacote está em elaboração.

## Estrutura de fonte por domínio

Arquivos `authoring/{domain}.pt-BR.json` e `{domain}.en.json`. JSON objeto com `lessons` contendo3objetos. Mesmo IDs e estrutura nos dois idiomas. Os textos são traduzíveis; IDs/enums/sourceRefs permanecem estáveis.

Cada lesson:
- `slug`, `title`, `summary`, `outcome`, `prerequisites` (slugs de aula), `minutes` estimativa, `sourceRefs` (IDs ou URLs já estudados; somente fundamento pertinente), `steps` exatamente10.
- Cada step: `slug`, `kind` explain/practice/check/reflect, `mode` concept/guided-simulation/external-real-task, `title`, `objective` específico da etapa, `body`, `action`, `expected`, `hint`, `criteria` lista1–3 strings específicas. Corpo preferivelmente40–75palavras; ação10–20; resultado8–20. Evitar excesso de texto e repetição genérica. Título precisa descrever o aprendizado específico. Cada etapa contém decisão/atividade distinta.
- `prompt` opcional: pedido completo copiável, em texto comum, separado do corpo; limite80palavras quando viável. `code` opcional: somente artefato literal neutro, sem instrução natural não localizada.
- Steps4e9 (índices3e8) são checks, cada um possui `check`: `question`, `options` três objetos `{id:"a"|"b"|"c", text, feedback}`, `correct`: uma letra, `success`, `retry`. IDs locais a/b/c expandidos pelo gerador. Alternativas plausíveis e feedback específico. Variar posição correta; não revelar gabarito no corpo antes da questão.
- Pelo menos4steps de prática por aula, com resultado observável. Todas práticas externas autodeclaradas, sem falsa integração. Ações simuladas devem ser explicitamente rotuladas no corpo/contexto. Não exigir inventar falha para avançar.
- Não criar extensão de schema canônico: este formato editorial será compilado para contracts/course.ts1.0.0.

## Mapa congelado

Fundamentos (root): `workspace` (acesso/pasta/contexto), `requests` (pedido/plano/limites), `verification` (observar/corrigir/retestar). Sites/apps/automação seguem caminhos independentes depois dessesfundamentos.
Sites: `site-build` → `site-quality` → `site-publish`.
Apps: `app-state` → `app-storage` → `app-delivery`.
Automação: `automation-input` → `automation-report` → `automation-schedule`.
Primeira aula de cada rota depende de `verification`; demais dependem da anterior na própria rota. Fundamentos requests depende workspace; verification depende requests.

## Princípios

Público: iniciante não técnico. Ensinar termos quando entram, contas/acesso/custos sem preço presumido, arquivo/pasta/terminal, limites locais, erro concreto, recuperação, prévia vs publicado. Ensino em Claude Desktop/Code e Codex Desktop: método compartilhado e variantes factuais específicas; não copiar atalhosCLI paraDesktop.

Exemplos originais podem ser simulados, desde que identificados. Não dizer que fonte demonstrou algo que só recomenda. App de tarefas: entrada/estado/validação/persistência local/exportação segura, sem login/backend. Sites: página Ponte Musical, título+violão/piano/canto+contato aulas@example.com sem envio; teste de teclado/tela estreita e publicaçãoNetlify com acesso visitante e atualização. Automação: vendas.csv `id,item,amount`, `1,Caderno,10.50`, `2,Curso,20.00`; total30.50, repetir semduplicar, erro preserva saída válida; agenda sóapós teste manual, condições de execução/pausa e histórico explícitos.

Cada fonte parcial conserva os limites. Referências diretas documentais atuais permitem instrução textual; nenhuma legenda ou captura vira audiovisual completo. Classificação draft/revisão delimitada enquanto faltarem provas; revisão humana de idioma pendente. Não encher120etapas com roadmap, placeholders ou repetição para bater contagem.

## Ajustes da revisão do Artista

`prompt` completo vira bloco/callout copiável; `action` curta vira exercise.promptKey. Nunca usar pedido inteiro como placeholder. `objective` deve ser próprio da etapa; `expected` é o artefato/observação esperados, não cópia do objetivo da aula. Campo opcional `variants` mapeia claude/codex para texto específico; ausência produz variante sem boilerplate. Etapas explain não podem prometer campo de registro; mudar para practice quando necessário. Prática externa deve permitir registrar impedimento/análise simulada sem declarar execução inexistente.
