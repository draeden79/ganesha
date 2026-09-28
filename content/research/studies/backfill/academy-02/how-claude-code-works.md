# Como o agente trabalha — contexto, ação e verificação

Fonte: [How Claude Code works, Claude Academy](https://academy.claude.com/courses/claude-code-101/how-claude-code-works), aula 2 de Claude Code 101, observada em 28/09/2026. Vídeo `6bs5b4FltCU`. Seis parágrafos da transcrição e todo o texto complementar foram lidos; duas imagens foram examinadas. Não houve execução nem revisão contínua do vídeo.

## Raciocínio da fonte

A aula organiza o trabalho num ciclo: reunir informações para o pedido, realizar uma ação e avaliar o resultado. O agente pode repetir esse ciclo e receber direcionamento durante o processo. O restante explica contexto limitado, compactação, ferramentas e modos de permissão. O texto complementar inclui o modo automático e declara que a configuração inicial varia; esses detalhes não aparecem da mesma maneira na narração.

A utilidade didática é conectar o pedido à evidência produzida por cada etapa. O diagrama descreve um funcionamento pretendido, não uma garantia de que qualquer agente reconhecerá o resultado errado ou continuará até a solução correta. A análise do resultado depende de critérios e ferramentas disponíveis. A aula não fornece um protocolo de teste universal.

## Leitura das imagens

O primeiro diagrama mostra a sequência de coleta, ação e verificação, uma seta de retorno e a possibilidade de intervenção humana. É um modelo conceitual, sem medição de desempenho.

A segunda imagem mostra um pedido para criar uma API simples e uma confirmação para inicializar o projeto com npm. Há opções de aprovação pontual, permissão mais ampla e recusa. A captura não mostra a aprovação escolhida, resultado do comando, servidor em funcionamento ou teste da API. Uma linha visual indicando execução não elimina a confirmação pendente mostrada na mesma tela.

As imagens foram abertas pelas URLs do artigo e preservadas em `studies/local/backfill-ac02-how-works-0.png` e `-1.png`. A interface mostrada é terminal. Não transferir seus atalhos ou opções para outra superfície sem conferência.

## Pré-requisitos e limites

Para compreender o ciclo, basta distinguir pedido, arquivo, ação e resultado. Reproduzir o exemplo da imagem exigiria ferramentas de desenvolvimento e um projeto; a aula não ensina essa preparação. Assim, o primeiro exercício do curso deve usar um ambiente previamente explicado e uma mudança observável, sem introduzir a API como exigência.

O texto compara agentes e chat de forma ampla. Para o curso, explicar a diferença pela capacidade realmente disponível na sessão, não pela aparência da interface. A possibilidade de chamar ferramentas não comprova que um teste foi chamado, que passou ou que cobriu a intenção.

Não há defeito seguido de diagnóstico e reteste descrito nesta aula. A repetição do ciclo no diagrama não é uma recuperação observada. Também não houve leitura integral das configurações de permissão ou execução no produto para confirmar os padrões atuais.

## Prática original: tornar visível o ciclo

Proposta não executada. Usar a página de treino com três serviços e um botão de contato. Na L01, revisar um plano que explicite: qual arquivo será lido, qual mudança está prevista, como será conferida e o que fazer se o resultado divergir. Essa é a entrega da primeira aula.

Na implementação posterior, registrar quatro eventos em linguagem comum: o que o agente observou, o que alterou, qual cenário testou e qual resultado encontrou. Se o contato errado aparecer, fornecer os passos para reproduzir e o valor esperado. Pedir correção e repetir o mesmo teste, além de conferir os conteúdos preservados.

1. **Ligação entre pedido e teste:** cada condição do pedido deve corresponder a uma observação concreta. “Concluído” sem cenário e saída continua sem verificação suficiente.
2. **Ligação entre falha e reteste:** o registro deve mostrar o caso antes e depois da correção. Trocar de exemplo ou apenas reescrever a resposta não comprova recuperação.

Se a implementação não ocorrer porque a atividade ainda está no planejamento, registrar isso explicitamente. Um bom plano descreve o teste futuro; não o apresenta como já executado. Se uma ação depender de decisão do aluno, explicar a ação concreta e o motivo antes de solicitá-la. A atividade não exige aprovar permanentemente famílias de comandos.

## Proveniência e pendências

Texto completo em `studies/local/backfill-ac02-how-works.txt`, estado Summary em `-summary.txt`, transcrição oficial limpa em `transcripts/local/6bs5b4FltCU.academy.txt`. Hashes e intervalos no manifesto. Data de publicação não identificada. Leitura textual e duas imagens concluídas; audiovisual integral, cobertura de fala e funcionamento do exemplo permanecem pendentes. Originais e capturas locais ignorados pelo Git, sem licença de republicação presumida.
