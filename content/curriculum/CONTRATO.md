# Contrato editorial proposto v0.1

Estado: proposta do Educador para acordo com Diretor e Construtor. Dados de estrutura não contêm texto de interface. A implementação pode adaptar o formato mantendo estas invariantes.

## Estrutura

`lesson` tem `id`, `version`, `status`, `competencyIds`, `prerequisiteIds`, `estimatedMinutes`, `titleKey`, `summaryKey` e `steps` ordenadas. Aula planejada sem conteúdo não é aula disponível.

Cada `step` representa exatamente uma tela: `id`, `type`, `isAssessment`, `objectiveKey`, `titleKey`, `bodyKey`, `actionKey`, `expectedResultKey`, `hintKeys` em ordem gradual, `criteriaKeys`, `visual`, `executionMode`, `sourceRefs` e `toolVariantKeys`. Tipos iniciais: `brief`, `prompt-builder`, `single-choice`, `external-task`, `reflection`. O estado da resposta usa IDs neutros, nunca textos traduzidos.

`executionMode`: `guided-simulation`, `external-real-task` ou `concept`. `external-real-task` significa instrução para o aluno executar na própria ferramenta; Ganesha não disparou execução. Resultados dessa modalidade são `self-reported` no MVP. Mostrar o rótulo da modalidade antes da interação.

Questão objetiva inclui alternativas com `id`/`labelKey` e feedback por alternativa (`feedbackKey`), resposta correta por ID e dicas. Não validar por palavras-chave em português ou comprimento da frase. Prática aberta usa rubrica localizada, campo editável e registro de autoavaliação; nenhuma alegação de avaliação por IA.

## Localização

Locales obrigatórios: `pt-BR`, `en`, `es`, `fr`, `de`, `ja`, `hi`, `id`, `ar`, `ko`, `zh-CN`. `ar` usa `dir=rtl`; os demais `ltr`. Manter código, URLs e nomes de produto em isolamento bidirecional quando necessário. Figtree para alfabetos cobertos; fontes de fallback adequadas para árabe, devanágari e CJK. Conteúdo expandível, sem altura fixa baseada no português.

Arquivos de locale carregam `locale`, `direction`, `translationStatus`, `humanReviewStatus` e `messages` com chaves idênticas. Não converter textos ausentes em português. Não renderizar IDs como texto. Falta de tradução bloqueia a publicação da aula naquele idioma e deve constar em relatório de cobertura.

Toda frase exposta ao aluno é uma chave: objetivo, instrução, exercício, alternativa, feedback, dica, rótulo de campo, exemplo, legenda, texto alternativo, créditos explicativos e variante da ferramenta. Nomes próprios de fontes podem permanecer no idioma original; síntese e explicação são localizadas. IDs de competências e instruções internas para design não são conteúdo do aluno.

## Recursos visuais

Usar diagramas e cartões com texto HTML traduzível; nenhuma captura simulada deve parecer uma sessão real conectada. Se houver imagem decorativa sem informação adicional, usar `alt=""`. Se houver informação essencial, fornecer chave de texto alternativo e equivalente textual. A decisão visual segue `DESIGN_SYSTEM.md`; ilustração 3D é opcional, não pré-requisito para aprender.

## Evidências e fontes

`sourceRefs` aponta para ID, seção e síntese curta do fundamento. Diferenciar `product-fact` (documentação de produto) de `instructional-design` (decisão do Educador). Não apresentar uma escolha de sequência como se estivesse comprovada pela documentação técnica. Registrar revisão e data. Nenhuma fonte fica “revisada” apenas porque foi recebida.

## Conclusão e análise

Separar: tela visitada, resposta enviada, verificação aprovada, prática autodeclarada, entrega externa verificada. O curso pode finalizar o ensaio sem afirmar que o aluno criou/publicou algo de verdade. Progresso e seleção de ferramenta devem sobreviver à troca de idioma. Duas verificações são telas distintas, não dois campos na mesma tela.
