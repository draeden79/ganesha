# What is tool use? — descrever uma função e validar seu efeito

[Aula da Claude Academy](https://academy.claude.com/courses/claude-platform-101/what-is-tool-use), lida integralmente em 28/09/2026. Texto `studies/local/backfill-ac15-tools.txt`, três figuras conferidas; vídeo `Ao759wXbRc0` pendente. Não havia seletor Transcript observado. `text_read_complete=true`; não houve API, instalação ou ferramenta executada por esta pesquisa.

## Sequência e mecanismo

O texto começa distinguindo escolha da ferramenta pelo modelo e execução pelo aplicativo. Define nome, descrição e schema de entrada, ilustra chamada e retorno ligados por identificador, amplia para duas ferramentas, apresenta despacho manual e depois um runner do SDK. Termina aplicando o padrão a funções existentes de consulta documental.

O primeiro caso descreve busca de seção por identificador. O segundo separa clima atual e previsão, com descrições diferentes para o modelo escolher. A implementação manual usa o nome para chamar a função correspondente e devolve resultados na conversa. O runner reduz código de repetição; o exemplo TypeScript usa schema Zod e função de execução. A alegação de que descrições vagas são a principal causa de falhas não vem acompanhada de amostra ou comparação causal.

O código mostra configuração e encadeamento, mas não define `getWeather`/`getForecast`, cliente e mensagens em um único programa autossuficiente. Não há teste apresentado de argumento inválido, ferramenta inexistente, timeout ou retorno vazio. Adicionar uma entrada ao array e um caso ao despacho é parte do trabalho; não comprova qualidade da nova função.

## Figuras e correspondência

A primeira figura mostra um bloco `tool_use` e motivo de parada correspondente. O nome aparece como `lookupBuildingCode`, enquanto o schema textual usa `lookup_building_code`; são exemplos ilustrativos distintos, não evidência de que esses nomes diferentes resolveriam para a mesma função automaticamente. A segunda figura preserva o identificador da chamada no `tool_result`, com conteúdo documental abreviado. Ela explica o vínculo, sem fornecer o texto integral da referência.

A terceira figura mostra relatório e achados com trechos/citações numa página local. Isso sustenta apresentação de achados com referências; não comprova a validade da norma, interpretação técnica, resultado de busca, persistência ou correção do relatório. O texto envolve análise estrutural, mas esta ficha estuda o mecanismo de software, sem validar decisões de engenharia.

## Limites do exemplo manual

**Inspeção estática:** o laço interrompe em qualquer motivo diferente de `tool_use` e chama esse estado de resposta final. A [documentação de motivos de parada](https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons) distingue encerramento natural de truncamento e outros estados. Portanto, sair do laço não deve automaticamente virar sucesso na interface. A conferência documental foi parcial; o código não foi executado.

O `switch` publicado não inclui tratamento de nome desconhecido. A montagem manual também usa chamadas síncronas no `map`; se as funções reais passarem a ser assíncronas, o adaptador precisa esperar resultados válidos antes de devolvê-los. Isso é condição de adaptação inferida do código, não erro constatado na demonstração. O exemplo de runner usa funções `async`, mas não mostra o tratamento completo de falhas das consultas.

Schema e descrição resolvem problemas diferentes: formato de entrada e indicação de finalidade. Mesmo uma entrada válida pode apontar para item ausente ou resultar numa operação sem efeito. A ligação de IDs ajuda a rastrear qual chamada recebeu qual resultado; a verificação da tarefa ainda precisa confrontar saída e requisito.

## Prática original proposta

Proposta não executada: duas ferramentas locais de ensaio, uma para horário de oficina e outra para disponibilidade fictícia. Descrever quando cada uma se aplica e fornecer um catálogo conhecido. Manter consulta separada de confirmação de reserva.

1. **Escolha e vínculo:** pedir horário, depois horário e vagas. Conferir ferramenta, entrada, identificador do retorno e resposta. Uma resposta correta por acaso sem consulta não comprova o fluxo que a atividade pretende testar.
2. **Ausência e erro:** testar oficina inexistente, campo vazio e falha simulada. O processo deve apresentar a lacuna e encerrar o carregamento, sem inventar dado ou declarar reserva.
3. **Adaptação:** comparar execução manual e runner com os mesmos casos. Conferir resultados e tratamento de erro; menos linhas de código não é o critério de conclusão.

Pré-requisitos: ambiente servidor, API e funções de consulta preparadas, além de compreensão de entrada/saída. Bibliotecas, helpers e versões são os descritos na aula, sem instalação ou compatibilidade testada aqui. L01 continua apenas plano revisado. Pendem vídeo e validação operacional; originais internos ignorados pelo Git.
