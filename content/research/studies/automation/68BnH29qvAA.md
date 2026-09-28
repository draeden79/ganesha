# Primeira rotina Claude — estudo da faixa integral e de visuais selecionados

**Decisão editorial:** esta fonte não sustenta a primeira prática “CSV fictício → relatório manual → agendamento”. O exemplo envolve email real, OAuth, duas APIs, variáveis de ambiente e aprovação externa de SMS. Pode servir de apoio posterior para mostrar que configurar uma agenda, executar uma tarefa e comprovar seu resultado são verificações distintas. Não transforma inbox, n8n, APIs ou credenciais em pré-requisitos do percurso inicial.

Fonte: [DesignCourse — NEW Claude Feature - Setting up your First Routine](https://www.youtube.com/watch?v=68BnH29qvAA), publicada em 2026-04-16. Estudo em 2026-09-28. Duração exibida pelo player: 5:17.

## Escopo efetivamente estudado

Foram lidas sequencialmente **todas as 143 linhas**, do primeiro ao último cue, de `transcripts/local/aq.68BnH29qvAA.en.57896b75ac92.txt`: 10.054 bytes, SHA-256 `57896b75ac92b811eca21df92adda06c5bfcdcc6640d8cee9d79c76d3b541330`. A faixa inglesa é automática. O TXT preserva todos os eventos textuais do JSON3, inclusive sobreposições; não é uma revisão humana da fala.

Oito quadros do próprio vídeo foram inspecionados e preservados. São pontos selecionados, entre 2:28 e 4:02, sem observação contínua do audiovisual. A faixa tem início em 0,00 s, último início em 315,88 s e último fim em 318,76 s; o fim nominal excede em 1,76 s a duração do player. Isso é uma diferença de temporização, não prova de fala faltante nem de cobertura perfeita.

`full_transcript_read=true`; `full_video_watched=false`; `full_source_analyzed=false`; `full_speech_coverage_verified=false`. A qualificação permanece `transcript_analyzed_visual_pending`: os quadros confirmam alguns estados de interface, mas não todo o percurso visual, a integridade da classificação nem a implementação das APIs. A aquisição não foi alterada.

## Sequência completa da narrativa

| Tempo / linhas | Conteúdo e função |
| --- | --- |
| 0:00–0:58 / 1–27 | Apresenta a primeira tentativa de usar rotinas em seu negócio. Cita web, CLI e Desktop, relata sugestões do agente e rejeita as que considera melhor atendidas por agendamento determinístico. A separação entre decidir com IA e apenas repetir uma operação é a tese do autor. |
| 0:58–1:06 / 28–31 | Faz uma afirmação sobre cobrança pela assinatura e comparação com API. Não foi verificada como regra atual de acesso, preço ou limite e não deve virar promessa curricular. |
| 1:06–2:01 / 32–56 | Define um objetivo pessoal: examinar emails recentes, selecionar oportunidades relevantes e avisar por SMS. O período pretendido é de quatro horas. Dizer que vai ignorar mensagens não comprova exclusão ou movimentação delas. |
| 2:01–2:28 / 57–68 | Explica conectores e decide recorrer diretamente às APIs de Zoho e Twilio, via comandos, por não ter encontrado conectores apropriados. O preparo das contas e das credenciais não é ensinado integralmente. |
| 2:29–2:56 / 69–80 | Cria uma rotina nomeada e usa um pedido que o CLI preparou. Não lê o pedido inteiro na fala. Nos quadros aparecem critérios de relevância, formato do resumo, limite de tamanho e casos sem itens relevantes. |
| 2:55–3:17 / 81–89 | Escolhe agendamento personalizado. Não conhece a expressão necessária e pede ajuda ao agente a partir de uma captura. A tela confirma uma expressão para quatro horas em UTC; ainda não comprova um disparo futuro. |
| 3:16–3:39 / 90–100 | Edita o ambiente e orienta colocar variáveis ali. Depois relata nova execução manual. A resposta visível confirma que encontrou variáveis e começou a preparar/executar o fluxo; isso não basta para validar os resultados. |
| 3:38–4:22 / 101–120 | Admite que SMS não funcionará enquanto aguarda aprovação da Twilio. Adapta a saída para email, mostra um resumo recebido e o considera bem-sucedido. Não volta a demonstrar SMS funcionando. |
| 4:22–5:04 / 121–137 | Prefere conectores às chamadas diretas e justifica a exceção do seu caso. Retoma a ideia de só usar IA quando a tarefa recorrente exige decisão. |
| 5:04–fim / 138–143 | Divulga seu curso e encerra. O convite não acrescenta evidência de recorrência, manutenção ou confiabilidade. |

## Conferência visual

Os tempos abaixo são do player observado. Todos os arquivos e hashes estão no manifesto desta pasta.

| Evidência | Quadro | Observado e limite |
| --- | --- | --- |
| V1 | 148,560 s — criação | Formulário de rotina nomeada, campo de instruções e escolhas de gatilho. Não comprova que uma tarefa já funcionou. |
| V2 | 168,560 s — pedido | Critérios de triagem e instruções de resumo/envio por Twilio. O critério foi escrito; sua precisão ainda não foi testada contra exemplos rotulados. |
| V3 | 190,272 s — agenda | Opção personalizada com `0 */4 * * *`, indicação de UTC e aviso de que execuções podem ser deslocadas alguns minutos. A frequência nominal está confirmada na tela, não a ocorrência de uma execução. |
| V4 | 195,272 s — gatilho adicionado | A regra de quatro horas aparece associada ao formulário. É um estado posterior à configuração de V3, sem passagem de quatro horas observada. |
| V5 | 200,272 s — edição/pedido | O pedido prevê resumo curto, limite de itens e mensagem quando nada é relevante; ao fundo aparece uma execução identificada como manual. Não há teste de pausa. |
| V6 | 205,272 s — ambiente | Formulário de ambiente, acesso de rede e seção de variáveis. Há conflito material entre seu aviso e a orientação verbal do autor, detalhado abaixo. |
| V7 | 215,272 s — execução | Sessão informa que as variáveis estão presentes e inicia preparação do fluxo, incluindo disponibilidade de Python. O pedido visível envolve OAuth de Zoho. Não aparece uma confirmação de SMS entregue. |
| V8 | 241,984 s — saída | Mensagem de email com resumo de oportunidade e indicação de ausência de novos contatos no período. Confirma que existe uma saída apresentada pelo autor, sem confrontá-la com todos os emails de origem. |

**Conflito material em V6:** o formulário informa que as variáveis são visíveis a quem usa o ambiente e contém o aviso **“don't add secrets or credentials”**. Ao mesmo tempo, o autor orienta usar essa seção para as variáveis do fluxo, e o pedido depende de credenciais de APIs. Não foram inspecionados nem copiados valores secretos. A fala não deve ser convertida em instrução aprovada de armazenamento de segredos; a forma correta exige documentação atual da superfície e do mecanismo de credenciais. Este não é um problema resolvido pela demonstração.

## Ciclo gatilho → ação → resultado → verificação

| Etapa | Evidência disponível | Lacuna |
| --- | --- | --- |
| Gatilho | Agenda configurada para quatro horas em UTC; execução manual relatada e identificável. | Não foi confirmado um disparo recorrente, nem seu horário real, atraso ou comportamento com fuso/horário de verão. |
| Ação | Pedido de ler mensagens do período, classificar relevância e sintetizar. | Não há conjunto de teste com resultado esperado, nem inspeção de todas as mensagens incluídas/excluídas. Não tratar descarte verbal como exclusão efetiva de emails. |
| Resultado | Um resumo por email é mostrado. | O resultado original por SMS falhou por dependência externa. Não há comprovação de SMS posterior, nem de resultado vazio produzido em execução real. |
| Verificação | Autor abre a mensagem de resumo. | Aparência de sucesso não demonstra fidelidade, ausência de omissões, cobertura temporal ou precisão de classificação. |
| Pausa/cancelamento | Nenhuma execução de pausa foi confirmada na fala ou nos quadros inspecionados. | Falta parar a rotina e verificar que não volta a executar. |
| Erro/recuperação | Bloqueio de SMS explicado; saída alterada para email. | É uma mudança manual de destino. Não há teste de recuperação automática, alerta de falha, credencial expirada ou erro de API. |
| Repetição | A frequência é configurada e o autor menciona executar novamente manualmente. | Não há duas execuções agendadas comparadas, deduplicação, retomada após atraso ou prova de que mensagens não serão perdidas/repetidas. |
| Manutenção | Nenhuma rotina operacional de acompanhamento é demonstrada. | Faltam responsável, revisão das regras, testes após alteração, custos/limites atuais e procedimento de suspensão. |

A combinação “últimas quatro horas” com o aviso de pequenos deslocamentos de horário deixa a cobertura entre execuções **não verificada**. É uma pergunta de teste derivada da evidência, não uma afirmação de que o produto necessariamente perde mensagens.

## Adequação ao iniciante

Os pré-requisitos observados vão além de abrir um arquivo e conferir um relatório: conta com acesso a rotinas, projeto/contexto, CLI usado para formular instruções, conexão OAuth, APIs de email/SMS, variáveis, política de rede e aprovação externa. O vídeo não ensina integralmente a obtenção ou manutenção dessas dependências. Sua duração curta não indica baixo custo de entrada.

Para o Educador, a contribuição principal é uma distinção: **um agendamento configurado não comprova o resultado da tarefa**. O material também mostra uma dependência externa que obriga mudar o plano. Ele é insuficiente como fonte operacional única da primeira automação e não justifica introduzir inbox ou n8n no percurso com CSV.

## Proposta editorial original — não executada

Esta prática não aparece no vídeo. É uma proposta para o Educador, sem rotina criada, arquivo enviado, relatório produzido por agente ou execução agendada nesta tarefa.

Usar um CSV fictício de quatro solicitações, com campos `id`, `categoria`, `minutos` e `status`: cadastro/15/concluído; relatório/25/pendente; cadastro/10/concluído; relatório/20/concluído, cada linha com ID diferente. Pedir manualmente um relatório que informe quantidade, tempo total, divisão por categoria, pendências e linhas inválidas. Definir antecipadamente o resultado de referência: quatro registros, 70 minutos, três concluídos e um pendente; cadastro com dois registros/25 minutos e relatório com dois/45 minutos.

Verificações distintas, ainda propostas:

1. **Correção:** confrontar contagem, soma e grupos com a referência; localizar a linha pendente. O relatório deve apontar de onde vêm os números, sem inventar campos.
2. **Mudança controlada:** trocar somente 25 por 30 minutos. Esperar total de 75 e categoria relatório com 50, sem mudar a quantidade ou o status dos registros.
3. **Erro explícito:** colocar texto onde se espera minutos. O fluxo deve identificar a linha inválida e não convertê-la silenciosamente em zero. Resolver o erro e repetir a verificação manual.
4. **Repetição:** rodar o mesmo arquivo duas vezes e conferir que o segundo relatório não soma novamente os registros. Definir se o resultado substitui a versão anterior ou cria uma versão claramente identificada.

Somente depois dessas verificações, uma atividade posterior poderia definir horário e fuso, fonte do arquivo, local da saída, comportamento sem novos dados, registro de falhas e como pausar. Essa etapa continua dependente de fonte primária atual e demonstração própria; este vídeo não a valida para CSV. Transferir entre Claude e Codex significa manter o mesmo arquivo fictício, pedido e critérios de aceitação, ajustando apenas a superfície disponível — sem presumir que as duas plataformas compartilhem este mecanismo de rotinas.

## Pendências e uso permitido da ficha

Conservar como análise da faixa completa com evidências visuais pontuais e parecer de **insuficiência para a primeira automação**. Não certificar estudo audiovisual integral, execução recorrente, cobertura de fala ou uma solução de segredos. As afirmações de disponibilidade em três superfícies, cobrança, conectores e tempo de aprovação externa são falas do autor em abril de 2026, não fatos operacionais atuais verificados aqui. Nenhuma aula, aquisição ou manifesto global foi alterado.
