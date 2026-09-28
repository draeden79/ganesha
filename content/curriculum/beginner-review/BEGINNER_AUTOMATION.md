# Revisão iniciante — Automação

Escopo: 30 etapas, em português e inglês. Revisão editorial para pessoas sem experiência em IA ou programação; não houve teste com alunos nesta rodada.

## Três problemas P0 e correções

1. **Termos antes de explicação.** A entrada pressupunha tabela, relatório e processamento; a segunda aula pressupunha Python/HTML e a terceira agenda. As aberturas agora definem os termos com o exemplo das vendas. CSV, campo, contrato, comando, terminal, programa/script, caminho, download, fuso e histórico recebem explicações antes da prática correspondente.
2. **Muitas ações no comando principal.** Ações que acumulavam criar, abrir, comparar e registrar foram substituídas por uma ação focal curta. Os procedimentos completos ficam nas dicas; prompts executáveis, comandos, dados, critérios de proteção e pré-requisitos continuam disponíveis.
3. **Carga de leitura e abstração.** Todos os 60 corpos ficaram entre 20 e 45 palavras e trazem exemplo ou situação concreta. Títulos, resumos e resultados das aulas ficaram mais simples; a primeira resposta não exige vocabulário técnico.

## Preservação e limites

Foram preservados slugs, kind, mode, quantidade e ordem de aulas/etapas, todos os seis checks por idioma (inclusive opções, feedback e alternativa correta), prompts, blocos de código e variantes das ferramentas. Mantidos os quatro testes, proteção do relatório, caminho HTML sem instalação, diferença entre download e substituição e ativação acompanhada opcional com pausa. Nenhuma agenda foi criada. Nenhum outro domínio ou idioma foi alterado.

As dicas ainda contêm procedimentos longos para consulta: esta é uma redução da carga na leitura principal, não uma validação de usabilidade nem uma revisão humana concluída.

## Auditoria das 30 etapas

| Aula/etapa | Palavras PT antes → depois | Palavras EN antes → depois | Ação principal PT |
|---|---:|---:|---|
| automation-input/pipeline | 53 → 37 | 56 → 38 | Complete: “Nossa lista de vendas vira um resumo com ___ e ___.” |
| automation-input/create-csv | 59 → 36 | 59 → 37 | Envie à IA o pedido de criação abaixo. |
| automation-input/data-contract | 63 → 36 | 63 → 36 | Escreva uma regra para cada coluna da tabela. |
| automation-input/decimal-check | 52 → 33 | 46 → 39 | Escolha como corrigir a linha simulada. |
| automation-input/reference-total | 53 → 32 | 55 → 35 | Anote seu gabarito: quantidade de vendas e total. |
| automation-input/failure-fixtures | 51 → 34 | 51 → 34 | Envie o pedido abaixo para criar as cópias de teste. |
| automation-input/review-validation | 56 → 38 | 57 → 38 | Reescreva a proposta da IA em uma frase que proteja o relatório. |
| automation-input/prepare-recovery | 55 → 34 | 59 → 36 | Peça uma cópia do original chamada vendas-valido.csv. |
| automation-input/duplicate-check | 51 → 37 | 47 → 37 | Escolha o que fazer com o id repetido. |
| automation-input/handoff-input | 60 → 36 | 53 → 34 | Escreva uma nota com o que preparou e o que ainda falta testar. |
| automation-report/execution-paths | 61 → 37 | 61 → 40 | Escolha seu caminho: Python disponível ou página HTML. |
| automation-report/environment | 58 → 39 | 55 → 41 | Envie ao assistente o pedido de conferência abaixo. |
| automation-report/build-transform | 62 → 38 | 60 → 39 | Envie o pedido abaixo para receber um plano. |
| automation-report/path-check | 53 → 37 | 50 → 35 | Escolha o primeiro local a conferir. |
| automation-report/normal-run | 59 → 37 | 57 → 37 | Confira a quantidade e o total da primeira saída. |
| automation-report/repeat-run | 59 → 36 | 57 → 35 | Confira se a segunda saída continua com 2 vendas e 30.50. |
| automation-report/error-run | 58 → 39 | 62 → 36 | Confira se cada cópia de teste preserva o relatório correto. |
| automation-report/recover-retest | 57 → 36 | 57 → 36 | Confira o retorno do total para 30.50 após restaurar o original. |
| automation-report/download-check | 52 → 37 | 50 → 39 | Escolha como identificar o arquivo atualizado. |
| automation-report/deliver-report | 57 → 37 | 55 → 36 | Escreva uma nota curta para quem repetirá o exercício. |
| automation-schedule/schedule-boundary | 58 → 38 | 62 → 39 | Complete: “Executar agora é manual; começar no horário combinado é ___.” |
| automation-schedule/manual-gate | 58 → 38 | 60 → 39 | Marque cada um dos quatro testes como comprovado ou pendente. |
| automation-schedule/durable-instructions | 59 → 37 | 56 → 38 | Preencha apenas o endereço da pasta no rascunho abaixo. |
| automation-schedule/availability-check | 56 → 36 | 56 → 39 | Escolha o que é possível afirmar sobre as 09:00. |
| automation-schedule/schedule-fields | 58 → 37 | 63 → 37 | Marque sua escolha: ativação acompanhada ou simulação. |
| automation-schedule/tool-conditions | 68 → 37 | 65 → 33 | Faça um ensaio manual pelo caminho da sua ferramenta. |
| automation-schedule/history-triage | 80 → 38 | 83 → 38 | Registre o que aconteceu na primeira tentativa agendada. |
| automation-schedule/pause-rehearsal | 65 → 36 | 60 → 34 | Pause a tarefa de treino. |
| automation-schedule/change-check | 55 → 38 | 54 → 36 | Escolha o que fazer após a mudança de coluna. |
| automation-schedule/schedule-handoff | 60 → 37 | 53 → 35 | Escreva o estado final da sua tarefa ou simulação. |
