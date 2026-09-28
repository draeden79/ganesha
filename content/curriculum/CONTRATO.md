# Contrato editorial — notas de aplicação

O contrato canônico aprovado pelo Diretor é `contracts/course.ts` (schemaVersion 1.0.0). Este arquivo registra decisões editoriais e não define um schema concorrente. As adições de objetivo, ação, resultado, dicas, critérios, modalidade e visual foram incorporadas ao contrato do Diretor no commit `6f6e1e3`. O Construtor mantém a adaptação para a interface.

## Maturidade pedagógica

`ready` não significa apenas JSON completo, tradução produzida ou protótipo renderizado. Por determinação do usuário transmitida pelo Diretor em 28/09/2026, toda aula aceita como pronta exige fontes relevantes integralmente estudadas, evidências localizáveis, sequência completa, exemplos, pré-requisitos, limitações e erros; demonstrações de UI exigem inspeção visual dos trechos pertinentes. O Educador precisa avaliar o pacote integral antes de recomendar prontidão e o Diretor registra a decisão. Resumos, metadados, downloads e leitura automática de legendas não satisfazem esse requisito.

O estado vigente de L01 é `draft`, o curso é `preview` e não há `releasedLessonIds`. Visualização provisória deve ser tratada pelo app como demonstração. As traduções permanecem produzidas; sua presença não eleva maturidade. O gate completo, pendências e evidências aceitas estão em `maturity.json` e `PEDAGOGICAL_AUDIT.md`. Uma versão publicada é imutável; qualquer revisão futura usa nova versão e plano de preservação de progresso.

## Estrutura

`Course` tem versão, status, competências, rubricas e `releasedLessonIds`. `Lesson` tem `id`, `order`, `status`, `competencyIds`, `prerequisiteLessonIds`, `estimatedMinutes`, `titleKey`, `summaryKey`, `objectiveKeys` e `steps` ordenadas. Aula planejada sem conteúdo não é aula disponível.

Cada `Step` representa exatamente uma tela: `id`, `kind`, `isAssessment`, `objectiveKey`, `titleKey`, `blocks`, `actionKey`, `expectedResultKey`, `hintKeys` em ordem gradual, `criteriaKeys`, `visual`, `executionMode`, `evidenceIds` e `toolVariants`. Tipos canônicos: `explain`, `practice`, `check`, `reflect`. `exercise` define prática; `check` define avaliação. O estado da resposta usa IDs neutros, nunca textos traduzidos.

`executionMode`: `guided-simulation`, `external-real-task` ou `concept`. `external-real-task` significa instrução para o aluno executar na própria ferramenta; Ganesha não disparou execução. Resultados dessa modalidade são `self-reported` no MVP. Mostrar o rótulo da modalidade antes da interação.

Questão objetiva inclui alternativas com `id`/`labelKey` e feedback por alternativa (`feedbackKey`), resposta correta por ID e dicas. Não validar por palavras-chave em português ou comprimento da frase. Prática aberta usa rubrica localizada, campo editável e registro de autoavaliação; nenhuma alegação de avaliação por IA.

## Localização

Locales obrigatórios: `pt-BR`, `en`, `es`, `fr`, `de`, `ja`, `hi`, `id`, `ar`, `ko`, `zh-CN`. `ar` usa `dir=rtl`; os demais `ltr`. Manter código, URLs e nomes de produto em isolamento bidirecional quando necessário. Figtree para alfabetos cobertos; fontes de fallback adequadas para árabe, devanágari e CJK. Conteúdo expandível, sem altura fixa baseada no português.

`content/locales/{locale}.json` carrega `schemaVersion`, `courseId`, `courseVersion`, `locale` e `messages`. Cada tradução tem `value`, `status` e `sourceRevision`. Metadados adicionais `direction`, `humanReviewStatus` e `translationMethod` registram a cobertura sem alegar revisão humana. Não converter textos ausentes em português. Não renderizar IDs como texto. Falta de tradução bloqueia a publicação da aula naquele idioma e deve constar em relatório de cobertura.

Toda frase exposta ao aluno é uma chave: objetivo, instrução, exercício, alternativa, feedback, dica, rótulo de campo, exemplo, legenda, texto alternativo, créditos explicativos e variante da ferramenta. Nomes próprios de fontes podem permanecer no idioma original; síntese e explicação são localizadas. IDs de competências e instruções internas para design não são conteúdo do aluno.

## Recursos visuais

Usar diagramas e cartões com texto HTML traduzível; nenhuma captura simulada deve parecer uma sessão real conectada. Se houver imagem decorativa sem informação adicional, usar `alt=""`. Se houver informação essencial, fornecer chave de texto alternativo e equivalente textual. A decisão visual segue `DESIGN_SYSTEM.md`; ilustração 3D é opcional, não pré-requisito para aprender.

## Evidências e fontes

`evidenceIds` aponta para registros com fonte, seção e síntese curta em `content/research/registry.json`. `evidence-bindings.json` explicita os vínculos gerados. `L01_REFERENCE.md` distingue fatos de produto e decisões pedagógicas. Não apresentar uma escolha de sequência como se estivesse comprovada pela documentação técnica. Registrar revisão e data. Nenhuma fonte fica “revisada” apenas porque foi recebida.

## Conclusão e análise

Separar: tela visitada, resposta enviada, verificação aprovada, prática autodeclarada, entrega externa verificada. O curso pode finalizar o ensaio sem afirmar que o aluno criou/publicou algo de verdade. Progresso e seleção de ferramenta devem sobreviver à troca de idioma. Duas verificações são telas distintas, não dois campos na mesma tela.
