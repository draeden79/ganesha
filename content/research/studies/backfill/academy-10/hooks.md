# Hooks em ação — observar entrada, decisão e efeito

Fonte: [Hooks, Claude Code in action](https://academy.claude.com/courses/claude-code-in-action/hooks), aula 5, observada em 28/09/2026. Corpo textual integralmente lido, sem imagens substantivas. Vídeo `1m0huCacWPs` identificado, sem transcrição rotulada. Vídeo contínuo e fala integral permanecem pendentes.

## Sequência técnica da fonte

A aula organiza eventos ao longo da sessão, depois apresenta decisões estruturadas antes da chamada de ferramenta, códigos de saída e atualização da entrada. Distingue executar antes de uma ação e reagir quando ela já aconteceu. Usa como exemplo a substituição de um padrão que parece credencial por um marcador e termina com reinjeção de um resumo após compactação.

O texto fornece uma estrutura JSON ilustrativa, mas não o script completo que detecta e transforma a entrada. A demonstração narrada de remoção do padrão não vem acompanhada, no corpo textual, de entrada e saída integrais, log ou reteste. O bloco ilustrativo contém decisão de negar; ele não deve ser copiado como se liberasse automaticamente uma chamada transformada.

## O que foi conferido e o que depende de execução

A referência atual confirma que `updatedInput` substitui o objeto inteiro, exigindo preservar campos necessários. Decisões estruturadas, códigos de saída e evento participam do resultado; uma resposta de permitir não elimina todas as regras adicionais. A consulta foi pontual. [Referência de hooks](https://code.claude.com/docs/en/hooks#pretooluse-decision-control).

As limitações de inicialização e timeout já documentadas em `academy-06/hooks.md` continuam relevantes. A descrição de comportamento garantido deve ser lida como intenção de configuração, não como teste de uma implementação específica. Nenhum hook deste estudo foi instalado ou executado.

O exemplo de substituir um padrão permite explicar transformação de entrada, mas não certifica cobertura de todos os formatos de credencial nem remoção de cópias já registradas em outro lugar. Trocar um valor também pode mudar o significado da tarefa. O resultado exige verificar tanto a transformação pretendida quanto os campos e comportamentos que deveriam permanecer iguais.

## Aplicação ao curso

O conteúdo pode apoiar uma etapa posterior de automação e diagnóstico. A distinção principal é entre evento, entrada, decisão e efeito. Um indicador de execução não comprova que o campo correto foi alterado; uma mensagem de bloqueio depois da ação não prova que ela foi impedida antes.

Para pessoas iniciantes, a primeira experiência pode ser uma transformação de dados fictícios fora de qualquer mecanismo de permissão. Isso permite aprender a conservar campos e comparar resultados antes de configurar um agente real. Configurações e nomes de eventos da fonte não são formatos universais para outras ferramentas.

## Prática original: transformar um campo sem perder os demais

Proposta não executada. Preparar três registros fictícios com identificador, descrição e categoria. O objetivo é substituir somente a categoria de demonstração `ensaio` por `treino`, preservando todos os outros valores e a quantidade de registros. Acrescentar um caso sem categoria para explicitar a política de erro.

No plano, definir quando a transformação ocorre, a entrada esperada, o resultado de cada caso e como registrar falha. Numa etapa posterior, executar a transformação em uma cópia e comparar com a tabela conhecida. Associar um evento ao procedimento só depois de validá-lo manualmente.

1. **Preservação:** conferir identificadores e descrições antes/depois. O campo modificado deve ter o valor esperado, sem perda dos campos que não eram alvo.
2. **Casos fora da regra:** um registro já em `treino` permanece igual; um registro sem categoria recebe o tratamento previsto, sem confirmação falsa de sucesso.
3. **Acionamento e repetição:** quando houver integração por evento, observar uma chamada aplicável e outra fora do filtro. Repetir a entrada transformada e conferir que a segunda execução não acrescenta mudanças indevidas.

Entrega: tabela de casos, regra de transformação, registro de execução quando realizada e campos preservados. A L01 termina no plano revisado. A atividade não altera permissões do ambiente nem usa dados ou credenciais reais.

## Proveniência e pendências

Texto `studies/local/backfill-ac10-hooks.txt`, descoberta renderizada `video-inventory/page-discovery/academy-rendered-claude-code-in-action--hooks.json`; hashes e linhas no manifesto. Faltam transcrição identificada, audiovisual, script integral e teste operacional. Publicação não identificada. Originais internos ignorados pelo Git, sem licença de republicação presumida.
