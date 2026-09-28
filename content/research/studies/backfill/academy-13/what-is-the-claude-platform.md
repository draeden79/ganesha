# What is the Claude Platform? — integração não comprova a ação descrita

[Aula da Claude Academy](https://academy.claude.com/courses/claude-platform-101/what-is-the-claude-platform), texto integral observado em 28/09/2026. Artefato `studies/local/backfill-ac13-platform.txt`, três figuras inspecionadas; vídeo `RfeC02NmLqs` pendente. A página não apresentou rótulo Transcript. `text_read_complete=true`, com `full_transcript_read=false` e `full_source_analyzed=false`. Não houve chamada de API ou execução do app.

## Sequência e mecanismo

A introdução apresenta acesso programático ao modelo por API, SDK, CLI e console. Organiza o assunto em componentes básicos, infraestrutura e controles de operação. O diagrama relaciona esses grupos a chamadas, ferramentas, filas, observabilidade, avaliações e limites. Ele descreve uma organização conceitual; não apresenta métricas de capacidade ou uma implantação validada.

O exemplo central é acrescentar geração de rascunho a um atendimento existente. O código cria um cliente, envia o conteúdo do ticket e orientações, recebe blocos de resposta e os destina à interface. Explica seleção de modelo, limite de saída, instrução de sistema e mensagem do usuário. A aula termina ampliando o caso para recursos de agentes gerenciados, sem configurá-los nesta página.

Esse percurso ensina que um recurso de IA pode ser uma pequena parte de um produto. O aplicativo ainda precisa selecionar o ticket correto, preparar a entrada e apresentar a saída. A chamada mostrada não contém rota completa, autenticação do visitante, armazenamento, tratamento de falhas ou envio da resposta. O modelo usado e a adequação sugerida são escolhas do exemplo, sem comparação experimental de opções.

## O que as três figuras sustentam

1. **Camadas:** o diagrama destaca componentes básicos e inclui infraestrutura/controles. É uma explicação visual, não um painel de um sistema executando.
2. **Antes:** um ticket de cobrança duplicada aparece aberto, com área de resposta vazia e botão para gerar rascunho. A figura sustenta o estado da interface; não verifica cobrança em sistema financeiro.
3. **Depois:** a área contém texto, botões de descartar/enviar e orientação para revisão humana. O trecho visível prevê prazo de processamento e afirma que o reembolso está sendo emitido. Nenhuma operação de reembolso é demonstrada pelo código ou pela figura.

As duas imagens de atendimento mostram estados diferentes, mas não uma execução contínua que permita auditar a requisição. A captura final mostra somente parte do conteúdo da área rolável. Não certifico o rascunho inteiro como visualmente revisado nem afirmo que o botão Enviar foi usado.

## Análise original e limite importante

Produzir uma frase sobre uma ação e executar essa ação são eventos diferentes. Um rascunho que afirma emissão de reembolso pode parecer convincente mesmo quando a única operação realizada foi geração de texto. Para o curso, a saída deve ser comparada aos fatos disponíveis e aos poderes reais do recurso. Não basta avaliar tom e clareza.

O exemplo permite ensinar quatro estados: pedido recebido, rascunho gerado, texto revisado e resposta enviada. Se o sistema também realiza uma operação externa, acrescentar sua confirmação como estado próprio. O aluno deve saber qual desses estados foi efetivamente alcançado. Essa decomposição é proposta pedagógica, não funcionalidade comprovada no exemplo.

Limitar a saída por tokens não estabelece precisão factual, valor financeiro ou conclusão de uma operação. Passar diretrizes ao modelo também não demonstra que o rascunho as respeitou. O teste precisa usar entradas conhecidas, verificar a resposta e recusar afirmações de ações ausentes. A API faz parte do app; não substitui o restante do comportamento.

## Pré-requisitos e prática proposta

Pressupõe aplicativo existente, ambiente servidor, SDK, autenticação da API e acesso ao conteúdo do ticket. A página não ensina cada preparação desde o início. Para pessoas comuns, é aprofundamento posterior a uma entrada, mudança de estado e verificação local. Não altera L01 nem torna API requisito dos exercícios iniciais.

Proposta original não executada: um painel de pedidos de informação sobre oficinas fictícias, com horários e regras fornecidos. O recurso gera somente um rascunho de resposta; não confirma reserva, pagamento ou envio. A primeira versão pode usar respostas de ensaio antes da integração externa.

1. **Correspondência:** gerar para dois pedidos distintos e conferir nome, horário e regra contra o material fornecido. O rascunho não deve inventar confirmação de vaga ou cobrança.
2. **Estado e revisão:** editar e descartar o texto; verificar que gerar/editar não envia a resposta. Se envio vier a ser implementado, conferir sua confirmação separadamente.
3. **Falha e retorno:** simular resposta vazia/erro, encerrar o carregamento e permitir nova tentativa sem apresentar o rascunho anterior como resultado novo.

Pendem vídeo, resposta completa, código funcional e testes. As figuras são evidências internas da fonte; esta ficha não transforma texto gerado em prova de operação. Brutos locais ignorados pelo Git, sem licença de republicação presumida.
