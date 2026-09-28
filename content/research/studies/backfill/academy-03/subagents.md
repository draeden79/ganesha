# Subagentes — delegar uma pergunta com evidência de retorno

Fonte: [Subagents, Claude Academy](https://academy.claude.com/courses/claude-code-101/subagents), aula 9 de Claude Code 101, observada em 28/09/2026; vídeo `jKErNxuxPXg`. Seis parágrafos da transcrição e todo o texto complementar lidos. Nenhuma imagem substantiva no corpo observado; vídeo contínuo permanece pendente.

## Sequência e exemplo

A transcrição explica contexto separado, instrução de especialização e descrição da tarefa delegada. Usa a investigação de um sistema de pagamentos como exemplo: localizar o serviço responsável por reembolsos exige examinar vários arquivos, mas o coordenador pode precisar somente da resposta. Reconhece a perda de visibilidade sobre o caminho de investigação. Termina distinguindo agentes prontos e personalização.

O texto complementar acrescenta criação pelo comando `/agents`, escolha de escopo/ferramentas e opções de memória e skills. Não há demonstração textual completa de criar, executar e validar um subagente personalizado. A quantidade de arquivos do exemplo é ilustrativa, não medição de ganho de tempo ou tokens.

## Divergência conferida

A narração afirma que a conversa inteira do subagente é descartada. Isso não deve ser entendido como apagamento garantido dos registros. A documentação oficial consultada descreve históricos próprios e retomada de agentes elegíveis, além de retenção/limpeza. A leitura adicional foi limitada às seções de retomada e transcrições; não certifica consumo de todo o documento. [Documentação de subagentes](https://code.claude.com/docs/en/sub-agents#resume-subagents).

Portanto, separar **o que volta ao contexto principal** de **o que continua registrado pelo produto**. O próprio texto complementar já menciona memória persistente, ampliando o quadro apresentado na narração. Contexto separado também não comprova isolamento de arquivos: a aula não demonstra dois agentes editando com segurança o mesmo projeto.

## Interpretação para o curso

Delegar é mais útil quando a tarefa tem uma pergunta concreta, um conjunto de materiais e um formato de retorno. Um resumo sem evidência pode economizar espaço e ainda transmitir uma conclusão errada. Para a pessoa comum, o valor inicial não está em criar muitos agentes; está em separar trabalhos que podem ser conferidos e reunir resultados compatíveis.

Este estudo não mediu paralelismo, limites de conta, custo, tempo ou qualidade. Nem comprova que as configurações e agentes citados existem em qualquer versão ou interface. A especialização escrita num prompt não transforma o resultado em parecer validado. Casos dependentes entre si precisam aguardar informação anterior; não ficam independentes por receberem nomes diferentes.

## Prática original: duas revisões de uma página

Proposta não executada. Usar uma cópia de página com três serviços e contato. Um trabalho verifica conteúdo: nomes, descrições e coerência do destino de contato. Outro verifica comportamentos combinados: botão, links e leitura em tela estreita. Antes de delegar, definir os arquivos, o resultado esperado e a proibição de alterar a página durante essa rodada de revisão.

O retorno de cada revisão deve conter cenário observado, localização, resultado esperado/real e dúvida pendente. O coordenador compara os dois relatórios, resolve contradições olhando a página e escolhe uma correção por vez. Só depois ocorre implementação, seguida de novo teste do cenário afetado.

1. **Resposta rastreável:** selecionar um achado de cada relatório e reproduzir a observação no arquivo ou prévia indicada. Alegações sem localização ficam como perguntas, não como defeitos confirmados.
2. **Integração sem conflito:** verificar que os relatórios usam a mesma versão e não pressupõem mudanças diferentes. Depois de corrigir, repetir o caso e conferir os requisitos que o outro revisor analisou.

Se o ambiente de ensino não oferecer delegação, realizar as duas revisões em sequência continua treinando a definição de tarefas e critérios. Não é necessário instalar configuração nova para compreender o método. A atividade pertence às etapas de revisão posteriores; em L01, pode-se apenas planejar essas verificações.

Entrega: duas tarefas delimitadas, dois relatórios com evidência, uma decisão de integração e o resultado do reteste quando a implementação for realizada. O número de agentes não é critério de conclusão; a cobertura verificável dos requisitos é.

## Proveniência e pendências

Texto em `studies/local/backfill-ac03-subagents.txt`, estado Summary em `-summary.txt`, transcrição limpa em `transcripts/local/jKErNxuxPXg.academy.txt`. Hashes/intervalos no manifesto. Data de publicação não identificada. Não houve criação de agentes no produto da fonte, configuração de memória ou experimento de desempenho. Vídeo integral e precisão de fala seguem pendentes. Originais internos ignorados pelo Git, sem licença de republicação presumida.
