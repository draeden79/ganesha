# Nate — avaliação de classificação e de respostas em n8n

Fonte: [Beginner's Guide to Workflow Evaluation in n8n (Stop Guessing!)](https://www.youtube.com/watch?v=-zFd1nPn6U0), Nate Herk, publicada em 2025-09-03. Estudo em 2026-09-28. Pertinência: validar uma automação depois de ela funcionar manualmente, antes de confiar em mudanças de prompt/modelo. Os princípios são acessíveis; a implementação pressupõe familiaridade com n8n, credenciais e fluxos já preparados.

## Cobertura e evidência

Lidas sequencialmente as linhas 1–200, 201–400 e 401–555 de `transcripts/local/aq.-zFd1nPn6U0.en.d6239811422d.txt`: 555 linhas/cues, 39.000 bytes, SHA-256 `d6239811422d56454cf2d2abe65d540c85c6e6e166b1d571e99cd10095bc682a`. Origem automática em inglês; JSON3 original de hash `00f0996e28286b80ac337538c939a2b6b5c1b1a5e555642c4ecb29bd0661fbe6`. A faixa vai de 00:00,160 a 17:27,039, ultrapassando a duração adquirida/player de 17:25 em 2,039 segundos. Nomes de produtos têm erros nas legendas; não tratar sua grafia como comando.

As capturas materiais estão descritas no manifesto. A leitura da faixa foi integral; a inspeção visual é parcial e não inclui revisão contínua de todos os nós, expressões e execuções. Nenhum workflow foi importado ou executado, nenhuma conta foi conectada e nenhum email foi enviado neste estudo. `full_transcript_read=true`; `full_video_watched`, `full_speech_coverage_verified` e `full_source_analyzed=false`.

## Sequência completa

| Faixa | Conteúdo e progressão |
|---|---|
| 00:00–00:55 | Define avaliação como confrontar uma hipótese de melhoria com evidência, substituindo julgamento apenas intuitivo. Anuncia fundamentos e duas demonstrações n8n. |
| 00:55–02:04 | Introduz agente que classifica assunto/corpo de email por categoria e prioridade. Propõe seis exemplos rotulados, comparação com respostas esperadas, tokens, tempo e análise dos erros para ajustar o prompt e repetir. |
| 02:04–03:33 | Discute variabilidade dos LLMs, parâmetros, contexto e troca de modelos. Acrescenta qualidade, consistência, custo e tempo às métricas. Promove slides/workflows na comunidade gratuita. A comparação de cem entradas iguais com cem saídas diferentes é ilustração retórica, não experimento realizado. |
| 03:33–05:10 | Recomenda mudar uma variável por vez: prompt, modelo, parâmetros, arquitetura ou preparação do contexto. Registrar o que mudou, motivo e resultado; alterar vários elementos impede atribuir a diferença a um deles. |
| 05:10–06:31 | Coloca o conjunto de referência no centro: precisão, consistência, cobertura e casos difíceis. Sugere histórico e especialista do processo para rotular exemplos. Usa conteúdo de LinkedIn como analogia. Chama isso de “treinar”, mas o fluxo demonstrado altera prompt/configuração; não há treinamento dos pesos do modelo. |
| 06:31–07:43 | Oferece faixas aproximadas de quantidade de exemplos para testes iniciais, produção e sistemas críticos; ressalva dependência do problema. Sugere coletar ao longo de meses. Não apresenta cálculo de poder, intervalo de confiança ou prova de que essas contagens garantem significância. |
| 07:43–08:45 | Abre fluxo previamente montado. Explica Evaluation Trigger, Check if Evaluating, Set Outputs e Set Metrics. O trigger lê planilha; o agente classifica; o ramo de avaliação grava respostas e calcula métricas. Um trigger normal poderia seguir outro ramo, mas envio/atendimento real não é executado. |
| 08:45–09:33 | Roda um exemplo e interrompe antes de completar a sequência de métricas. A planilha recebe categoria de cobrança com palavra extra, divergindo do rótulo esperado, e prioridade alta correta. Explica que o agente está sem system prompt, criando uma referência inicial ruim. Seleciona GPT-4.1 mini. |
| 09:33–10:33 | Roda os seis casos. Resultado narrado e visto: prioridade 0,67 e categoria 0,00. Inspeciona a planilha e atribui os erros de categoria ao vocabulário não especificado. Não mostra análise semântica individual de todos os seis erros. |
| 10:33–11:27 | Acrescenta ao system prompt as categorias permitidas e executa novamente o mesmo conjunto. As saídas da planilha são sobrescritas. Resultado: categoria 1,00; prioridade continua 0,67. Não corrige prioridade nesta fonte. |
| 11:27–12:35 | Recomenda histórico próprio de mudança/resultado, porque a lista de execuções sozinha não explica o experimento. Explica igualdade exata como métrica binária e menciona outras avaliações semânticas. Não configura cada expressão passo a passo; remete aos arquivos oferecidos. |
| 12:35–13:26 | Segundo exemplo: agente lê email, consulta FAQs/políticas numa base vetorial e redige resposta. Outro conjunto contém assunto, corpo e resposta esperada. Apresenta juiz de IA que pontua de um a cinco. |
| 13:26–14:08 | Relata erro de configuração no Set Metrics com avaliação por IA, embora acredite ter configurado corretamente. Transfere o prompt do avaliador e as respostas esperada/obtida para outro agente, passando sua nota a outro nó de métrica. Declara equivalência; implementação e resultados idênticos entre os dois caminhos não são comprovados. |
| 14:08–14:46 | Recomenda manter modelo avaliador constante e executar o primeiro teste com GPT-5 mini, como esclarecido na comparação posterior. Fixar o juiz melhora a comparação, mas não demonstra sua exatidão nem ausência de variação. |
| 14:46–15:19 | Mostra nota média de 3,5/5 e consulta resultados individuais. Reitera registrar mudanças fora da lista de runs. Levanta hipótese de usar Flash para reduzir tempo. |
| 15:19–16:11 | Troca o modelo do agente para Gemini 2.5 Flash, mantém a proposta de avaliação, roda e compara. Narra nota 4,3/5, aproximadamente metade do tempo e menor custo. Não se apresenta validação estatística, repetição independente ou planilha de preço/custo total do fluxo. |
| 16:11–fim | Recapitula classificação e notas semânticas; explica onde obter fluxos, dois datasets e slides. Promove comunidade paga, cursos e compartilhamento de projetos. Encerra com agradecimento e pedido de like. |

## Exemplos completos em seu alcance demonstrado

No primeiro exemplo, os seis temas e rótulos esperados são visíveis na planilha de 09:10. Os corpos estão truncados na largura das células; não foram recuperados nem inventados. A tabela abaixo parafraseia os assuntos e preserva os rótulos necessários para entender a avaliação:

| Situação | Categoria esperada | Prioridade |
|---|---|---|
| Cobrança duplicada | Billing | High |
| Aplicativo falha no login | Technical Support | High |
| Pedido de nova integração | Feature Request | Medium |
| Esquecimento de senha | Password Reset | Medium |
| Consulta ao andamento de pedido | Order Status | Low |
| Cancelamento da assinatura | Account Management | High |

A primeira saída vista é `Billing Issue` versus `Billing`, com prioridade `High`. Isso demonstra uma falha de contrato de saída, mesmo que a intenção semântica seja próxima. A correção oferece o vocabulário esperado, não uma lista de respostas individuais para copiar. O reteste reutiliza os mesmos seis exemplos; não há conjunto reservado para avaliar generalização.

Os quadros de 10:10 e 11:15 mostram dois runs concluídos, com categoria 0,00→1,00 e prioridade 0,67→0,67. Portanto não se deve resumir como “a automação ficou 100% correta”. Em 13:35 a lista histórica contém falhas com texto truncado de Set Metrics; a mensagem completa de configuração incorreta vem da narração, e o quadro não confirma a causa. Em 15:55 a lista mostra o run 13 com nota 3,50 e `executionTime` 30676,10, seguido do run 14 com nota 4,30 e 13604,00. A unidade não está identificada nesse quadro; a redução relativa do campo é visível, sem converter o número em segundos. O total médio de tokens exibido sobe de 3287,50 para 3708,60; não há valor monetário no quadro. Logo, o custo menor é alegação do autor, e não um cálculo auditado pelo estudo.

O segundo exemplo tem entrada de email → recuperação de contexto → resposta → juiz com resposta esperada e obtida → nota → relatório. A fonte não lê todas as perguntas/respostas nem ensina a indexação da base vetorial. Não é possível reconstruir um atendimento completo e equivalente só desta faixa e dos quadros inspecionados. A proposta é de avaliação, não prova de envio correto a clientes.

Em 13:55, o grafo confirma Support Agent ligado a Supabase Vector Store e modelo via OpenRouter. O ramo de avaliação passa por Set Output, agente avaliador separado com parser estruturado e Score; um nó de avaliação permanece desconectado. O ramo normal contém Gmail Send a message, mas o quadro estático não demonstra execução desse envio. Esse isolamento é material para adaptar o exemplo sem disparar comunicação real durante testes.

## Pré-requisitos, erros e limites

É necessário dispor do n8n e de seus recursos de avaliação da época, datasets com colunas compatíveis, acesso de leitura/escrita à planilha, credenciais dos modelos e, para o segundo caso, base vetorial populada e um juiz separado. A criação de credenciais, importação dos fluxos, schema integral, expressões e tratamento de API indisponível não são acompanhados do zero. Ter o aplicativo Codex Desktop não satisfaz esses pré-requisitos; o editor visual n8n e seus runtimes são outra superfície.

A falha de categoria é efetivamente seguida de intervenção e reteste. A prioridade fica pendente. O erro de Set Metrics recebe contorno, mas a causa-raiz e o conserto do nó original não são demonstrados. Esperar que já esteja corrigido quando o público assistir é expectativa do autor, não confirmação atual. Runs históricos com erros também aparecem na lista, sem diagnóstico individual.

Leitura editorial: comparar o mesmo conjunto e manter variáveis registradas é útil; um resultado melhor não estabelece sozinho causalidade robusta diante de variabilidade. O juiz fixo precisa ser confrontado com revisão humana/rubrica, e nota de 1–5 não é porcentagem de acerto. A própria demo é pequena; os números sugeridos para amostragem são heurísticos. Nada autoriza transformar a preferência por Flash neste caso em recomendação universal de modelo, custo ou qualidade atual.

## Aplicação ao curso e prática original

A competência aproveitável é documentar uma hipótese, medir antes/depois e localizar o erro, inclusive quando o fluxo termina sem exceção técnica. Isso complementa o vídeo de logging de erros: log de execução bem-sucedida não garante que o conteúdo da saída esteja correto. A aula inicial pode usar uma tabela manual antes de ensinar os nós especializados.

Prática proposta, não executada: classificar pedidos fictícios de uma biblioteca em três destinos — renovação, reserva e informação — sem enviar mensagens. Preparar seis casos de desenvolvimento e três casos reservados, incluindo pedido ambíguo e entrada vazia. Definir os rótulos e a política de pedir revisão antes de rodar. Guardar versão do prompt, modelo/configuração, respostas e comparação por caso, sem sobrescrever o histórico.

1. **Contrato e falhas conhecidas:** executar os seis casos, comparar rótulo exato e comportamento para vazio/ambíguo. Um resultado fora da lista é erro de contrato. Registrar pelo menos um erro real ou, se nenhum ocorrer, uma perturbação controlada para conferir que o verificador detecta saída inválida.
2. **Correção e generalização:** mudar uma única instrução com justificativa; repetir os casos de desenvolvimento e depois executar os três reservados. Registrar melhora, piora ou empate, sem mover o resultado esperado para acomodar o agente. Repetir uma entrada para observar estabilidade; não declarar confiabilidade por nove casos.
3. **Falha operacional e recuperação:** simular entrada indisponível em uma cópia de teste e confirmar registro legível sem envio externo. Restaurar e executar novamente; verificar uma saída por ID, sem duplicatas. Se adicionar juiz semântico, revisar manualmente exemplos e manter sua configuração registrada separadamente.

Interfaces n8n, acesso por plano, nomes dos nós/modelos, custos e correções atuais não foram pesquisados nesta rodada. Antes de publicar receita executável, verificar documentação primária vigente e testar o ambiente escolhido. A fila histórica continua aberta; esta fonte recebe classificação por utilidade, não exclusão.
