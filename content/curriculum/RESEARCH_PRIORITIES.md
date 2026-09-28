# Seleção de fontes por competência e lacuna

Diretriz vigente em 28/09/2026, transmitida pelo Diretor: priorizar o que ensina pessoas comuns a construir sites, aplicativos e automações. O inventário das fontes continua útil, mas sua conclusão não é pré-requisito para avançar uma aula. Este documento substitui a abrangência dos pedidos originais L01-S01 a L01-S04; não altera a exigência de estudo integral do recurso selecionado.

## Critério de seleção

Selecionar primeiro um recurso principal completo para cada necessidade. Acrescentar um complemento apenas se faltar uma informação necessária, um caso de erro ou a variante da outra ferramenta. Reutilizar uma fonte em várias competências quando ela realmente as sustentar. Isso é uma orientação de foco, não uma quota que dispense evidência.

Um recurso forte para esta audiência apresenta uma tarefa concreta e alcançável, começa nos pré-requisitos do iniciante, acompanha o resultado e permite localizar exemplos, decisões, falhas e limites. Para fatos atuais de produto, preferir documentação primária. Tutoriais ajudam a observar a sequência e os erros, mas precisam ser compatíveis com a superfície ensinada. Caso completo original executado e documentado pode preencher a aplicação didática que a documentação não demonstra; deve ser identificado como produção da Ganesha, sem atribuição fictícia à fonte.

Triagem pode usar título, descrição ou resumo para decidir **o que estudar**. Nenhum desses materiais certifica estudo. O recurso selecionado é estudado integralmente dentro de seu objeto real — artigo, aula, vídeo ou página —, sem renomear um trecho escolhido como “fonte completa”. Para vídeos operacionais, ler a faixa não substitui a inspeção dos trechos visuais necessários e a verificação de lacunas materiais.

## Ordem de trabalho e pedidos reavaliados

| Pedido / prioridade | Seleção pequena e direcionada | Entrega que fecha a necessidade | Decisão sobre o pedido anterior |
| --- | --- | --- | --- |
| `L01-S01` / P0 | `res-codex-prompting`, documento principal de pedido/contexto | Estudo integral; resultado/contexto/limites; exemplo trabalhado ou dados suficientes para uma aplicação original documentada; como revisar uma resposta | Manter. Não pesquisar outros guias genéricos de prompt se apenas repetirem os mesmos princípios |
| `L01-S03` / P0 | `res-claude-desktop-start` e `res-codex-desktop-start`, uma entrada principal por superfície | Acesso e contexto até primeiro pedido/resposta; pré-requisitos, diferenças e erros relevantes; imagens/trechos visuais pertinentes revisados | Reduzir. `res-claude-desktop-reference` sai da exigência inicial; consultar somente se um ponto necessário não estiver coberto nos quickstarts |
| `L01-S02` / P0 | Preferência candidata: `res-claude-plan-build-review`, uma sequência curta e completa de planejar, executar e verificar | Sequência e limites completos, com separação entre CLI e Desktop; evidência de comparação do resultado com o pedido | Deixar de exigir três recursos sobrepostos. `res-claude-agent-basics` é complemento apenas se faltar o modelo mental mínimo. `res-claude-verify-unattended` fica adiado por tratar execução sem supervisão, fora da primeira tarefa acompanhada |
| `L01-S04` / P1 | Um caso completo de correção, `res-builder-behavior-tests` se adequado ao iniciante, ou substituto mais direto | Problema reproduzível, esperado/observado, correção, resultado antes/depois e reteste; limites explícitos | Mover para a necessidade de correção das aulas de sites. Não bloquear a aula de pedido por um artigo que não seja necessário ao seu objetivo |

As fichas integrais já em produção podem ser reaproveitadas; não apagar trabalho nem recomeçar apenas para atender à nova organização. A referência longa e o vídeo Tim ficam disponíveis para contexto, sem impor sua conclusão como bloqueio de uma aula Desktop que tenha evidência adequada em outro recurso.

**Prioridade não equivale a aceite:** os candidatos acima ainda aguardam avaliação das fichas e conteúdos integrais. A presença de uma URL, ficha parcial ou marca de coleta não fecha o pedido. Nesta revisão, `official/manifest.json` ainda não estava disponível no worktree consultado.

## Próximas necessidades, em ordem de aprendizagem

| Necessidade | Competências | Recurso principal desejado | Complemento somente se necessário | Evidência de suficiência |
| --- | --- | --- | --- | --- |
| P0 — Fundamentos mínimos e primeiro pedido | C01–C04 | Os recursos selecionados para L01 acima | Uma explicação curta de arquivo/pasta/contexto que o material principal pressuponha | Aluno identifica onde trabalha, pede um resultado delimitado e compara resposta com critérios |
| P1 — Primeiro site local | C03, C04, C06 | Um tutorial completo de página pequena com uma interação, em uma das superfícies escolhidas | Documentação atual para adaptar a outra superfície, sem duplicar dois cursos inteiros | Pedido → arquivos → preview → teste da interação, com erro de abertura/contexto tratado |
| P1 — Testar e corrigir | C05, C06 | Um caso completo de comportamento que falha e é corrigido | Regras primárias pontuais de teclado/tela pequena ou teste relevante que falte ao caso | Reproduzir falha, pedir ajuste, observar resultado e retestar comportamento anterior |
| P1 — Publicar e manter site simples | C07 | Um guia primário completo para um único serviço de hospedagem de site estático, ainda a selecionar | Um tutorial completo apenas se o guia não mostrar o fluxo operacional para iniciante | URL pública aberta como visitante, ação principal verificada, atualização e recuperação documentadas; preview e GitHub não confundidos com publicação |
| P2 — App simples com dados e interação | C09, C05, C06 | Um caso completo de lista de tarefas local com entrada, estado e validação | Documentação primária de persistência local se o caso omitir recarga, dados ausentes ou falha | Criar/editar/concluir item; testar entrada vazia; recarregar; explicar onde os dados ficam e o que não é sincronizado |
| P2 — Automação útil e repetível | C10, C04–C06 | Um fluxo completo de CSV fictício → relatório salvo, primeiro executado manualmente | Uma referência do formato ou validação de dados apenas se faltar | Comparar saída com exemplo calculável; tratar arquivo/coluna ausente e repetição sem duplicar resultados |
| P2 — Gatilho, erros e manutenção | C10, C08 | Uma documentação atual de agendamento na ferramenta escolhida aplicada ao fluxo anterior | Uma referência da ferramenta alternativa para equivalência de condições; não outro catálogo de automações | Definir gatilho e ação; observar execução/falha; entender disponibilidade do ambiente; corrigir, executar novamente e interromper a rotina |

Os casos de app e automação são propostas originais para pesquisa, não exemplos já verificados. Ainda não foi escolhido serviço de hospedagem nem confirmado um fluxo de agendamento. Quando uma fonte forte revelar que o caso é inadequado, ajustar o caso preservando a competência, em vez de forçar a fonte a sustentá-lo.

## Critério de suficiência por aula

Uma aula pode avançar para reavaliação quando **todas as lacunas materiais do seu objetivo** estiverem cobertas, mesmo que milhares de recursos permaneçam no inventário. Para cada objetivo, registrar:

1. O que o aluno fará e qual resultado será observado.
2. Fato de produto ou pré-requisito necessário, fonte integral estudada que o sustenta e localizador preciso.
3. Exemplo completo desde a entrada até a conferência do resultado, próprio ou da fonte, com autoria e modo de execução honestos.
4. Falhas previsíveis no percurso escolhido e forma de recuperação; não uma enciclopédia de todos os erros possíveis.
5. Variantes efetivamente ensinadas e inspeção visual pertinente, sem supor paridade Claude/Codex.
6. Prática e duas verificações distintas alinhadas ao objetivo, com explicação para erro e próximo passo.
7. Revisão do Educador, atualização coerente nos 11 idiomas e decisão de aceite do Diretor. Teste com iniciante é necessário antes de afirmar eficácia ou validar a duração estimada.

Parar a busca para aquela lacuna quando esse conjunto estiver atendido. Abrir uma fonte adicional apenas para resolver contradição, ausência material, mudança de produto ou diferença de superfície. Contagens de fontes/transcrições, métricas de popularidade, número de exemplos parecidos e acabamento visual não elevam a maturidade.

## O que fica fora da prioridade

Histórico completo antes da primeira aula, guias genéricos redundantes, benchmarks e trocas de modelos sem efeito na tarefa, infraestrutura de agentes paralelos, MCP/hooks/skills avançados, execução autônoma extensa, avaliações especializadas de modelos, autenticação multiusuário, pagamentos, backends complexos e jogos maiores. Esses tópicos podem voltar quando um objetivo do aluno justificar seus pré-requisitos e custo de aprendizagem.

L01 permanece `draft`. Nenhum pedido é marcado como concluído apenas por ter sido retirado do caminho crítico.
