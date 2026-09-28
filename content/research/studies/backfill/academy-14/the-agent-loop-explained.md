# The agent loop explained — encerramento de turno não é validação da tarefa

[Aula da Claude Academy](https://academy.claude.com/courses/claude-platform-101/the-agent-loop-explained), observada integralmente em 28/09/2026. Texto `studies/local/backfill-ac14-loop.txt`, três figuras inspecionadas, vídeo `tBIdyIoCQVU` pendente. Sem rótulo Transcript; nenhuma execução da API ou das ferramentas. `text_read_complete=true`, `full_transcript_read=false`, `full_source_analyzed=false`.

## Mecanismo e sequência

O texto passa de uma chamada isolada para repetição de pedido, solicitação de ferramenta, execução pelo código do aplicativo e devolução de resultado. A implementação declara uma ferramenta com nome, descrição e schema; uma função local devolve dado fixo de clima; o laço acrescenta mensagem do assistente e resultados vinculados por identificador. O caso começa com uma pergunta sobre roupa para Austin e termina com recomendação textual.

Depois a aula transpõe a estrutura para revisão de documentos: consultas a uma biblioteca, achados registrados e atualizações por eventos para a interface. Termina distinguindo implementação própria e infraestrutura gerenciada. A analogia descreve reaproveitamento do ciclo; não prova que o exemplo mínimo já atende aos requisitos de uma operação real.

No exemplo Python, a ferramenta devolve a mesma temperatura e condição para qualquer cidade. O dado é explicitamente fictício. O schema informa ao modelo como solicitar a ferramenta; o aplicativo ainda executa a operação. Não há consulta meteorológica real ou garantia de que a frase final reflita o mundo.

## As três figuras e duas divergências materiais

O terminal mostra duas rodadas: pedido de ferramenta e encerramento. Porém, é execução de um arquivo TypeScript por `tsx`, com resultado de 88°F em objeto estruturado. O exemplo textual é Python e retorna uma string de 95°F. Ambos ilustram o ciclo, mas a figura não é prova de execução exata do script publicado. A divergência não foi corrigida ou retestada na fonte observada.

A segunda figura mostra dois relatórios com botão de revisão e opção de revisão aprofundada. A terceira mostra histórico de consultas, contador de 33 seções citadas e estado de revisão pendente. No trecho visível, várias buscas retornam zero correspondências; diversas consultas por identificador retornam código desconhecido, enquanto algumas exibem título de seção. Não foi conferido o documento original nem a validade dos achados.

Esse histórico é especialmente útil pedagogicamente: ter muitas chamadas, um contador e uma saída não comprova apoio documental válido. A figura não mostra todas as entradas/saídas, persistência depois de recarregar ou julgamento final. Não trato o exemplo de normas estruturais como orientação técnica ou verificação de conformidade.

## Lacuna no laço publicado

**Inspeção do código da aula:** o `while True` trata apenas `end_turn` e `tool_use`. Se chegar outro motivo, o trecho visível não interrompe nem atualiza as mensagens, de modo que volta a solicitar uma resposta com o mesmo estado. Também não define limite de rodadas, tempo ou tratamento de exceção da ferramenta. Isso é inferência estática sobre o código apresentado, não falha reproduzida numa chamada real.

A [documentação oficial de motivos de parada](https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons) confirma que existem outros motivos, incluindo limite de tokens e de contexto; encerramento natural também pode vir sem texto útil. Foram conferidos esses trechos, não lido todo o documento. O exemplo mínimo precisa de tratamento explícito de estados antes de ser usado como automação contínua.

O fim da resposta informa o estado do protocolo, não que todos os requisitos foram satisfeitos. Da mesma forma, devolver um resultado de ferramenta não certifica que ele é correto ou suficiente. O processo precisa preservar o vínculo entre pedido, chamada, saída e critério, e saber registrar incompletude quando não puder prosseguir.

## Prática original proposta

Em ambiente de ensaio, usar uma ferramenta local que consulta um catálogo fictício de três oficinas. A ferramenta recebe um identificador e devolve horário/vagas conhecidos, ou informa ausência. A atividade mantém o ciclo sem aplicar exemplos de engenharia a decisões reais. Nenhum agente ou loop foi executado nesta pesquisa.

1. **Vínculo e conteúdo:** conferir identificador solicitado, resultado devolvido e resposta final. Para item inexistente, a resposta não pode inventar horário. Dado fictício continua identificado como tal.
2. **Parada controlada:** simular resposta truncada, ferramenta desconhecida e repetição de chamada. O processo deve parar ou seguir a regra delimitada, sem rodar indefinidamente nem declarar conclusão.
3. **Evidência final:** entregar o que foi consultado, o resultado e o que ficou pendente. Se houver gravação numa etapa posterior, testar repetição e ausência de duplicatas separadamente.

Complementa as aulas de API e ferramentas com controle do ciclo e avaliação de resultados. L01 permanece plano revisado; a proposta não adiciona aula automaticamente. Pendem audiovisual, implementação completa, estado persistido e testes. Originais locais ignorados pelo Git; nenhuma licença de republicação presumida.
