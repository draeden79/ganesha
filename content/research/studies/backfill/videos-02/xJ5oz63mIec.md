# Implantar automações — sessão local, rotinas e scripts remotos

Fonte: [How to Deploy Your Claude Automations (3 Methods)](https://www.youtube.com/watch?v=xJ5oz63mIec), Nate Herk, publicada em 2026-05-15 conforme aquisição existente. Estudo em 2026-09-28. Estado canônico anterior `not_started`; nenhuma ficha anterior localizada.

**Parecer:** panorama útil para escolher onde uma automação deve rodar e distinguir prompt recorrente de script remoto. Mostra configurações, histórico e diferenças entre ambientes, mas **não entrega três implantações completas com entrada, saída validada, erro e recuperação**. O autor explicitamente remete a outros vídeos para rotinas remotas e Modal/Trigger. É apoio de arquitetura após uma primeira automação, não receita única para iniciante deixar tudo rodando sem supervisão.

## Cobertura e proveniência

Faixa automática inglesa integral: **740 linhas/cues**, lidas sequencialmente 1–250, 251–500 e 501–740 de `transcripts/local/aq.xJ5oz63mIec.en.f089995063c4.txt`. São 51.756 bytes, SHA-256 `f089995063c468495a2608c65baa5bd90ffa54b5a6051a25518c9efe84c6b78b`. JSON3 de origem registrado no manifesto; não constitui segunda leitura independente. A legenda troca Claude por “Cloud” frequentemente e contém nomes/expressões incertos.

Limites dos cues: 00:00,000–21:49,680. Metadados indicam 21:48, portanto o fim excede a duração em 1,680 s; player observado mostra 21:47. Precisão de fala, diferença de duração e extremidades não verificadas. Texto lido na íntegra; capturas amostrais não certificam audiovisual completo. Nenhuma rotina, conta, webhook, API, implantação ou mensagem externa foi criada/executada por este estudo.

## Sequência completa da fonte

| Tempo | Raciocínio, exemplo e limite |
| --- | --- |
| 00:00–01:24 | Apresenta dois eixos: máquina local/nuvem e script previsível/agente autônomo. Usa seu esquema WAT — workflow, agent, tools — para classificar o que é transportado. É vocabulário pedagógico do autor, não norma técnica. |
| 01:25–02:42 | Método 1: loops que disparam prompt/skill periodicamente na sessão. Cita ferramentas CronCreate/List/Delete, processo interno e escopo por sessão; reconhece interferência quando sessões mexem no mesmo arquivo. Declara disponibilidade e diferenças entre terminal e Desktop de Claude. |
| 02:43–04:16 | No Desktop, pede lembrete de tirar lixo a cada dez minutos. Mostra criação e próximo disparo, explica que intervalo não significa primeiro disparo exatamente dez minutos após o pedido. Tela informa expiração em três dias. Descreve cancelar por linguagem natural/fim de sessão. |
| 04:17–05:39 | Compara limpar chat: diz que no Desktop elimina cron e no terminal não. Exibe histórico de lembrete por minuto, `/clear` e listagem ainda presente. Testa outra recorrência que injeta `/clear`; afirma que funcionou apesar da previsão negativa do agente. Não estabelecer esse comportamento como contrato suportado atual. |
| 05:40–06:15 | Diz que loops deveriam durar sete dias e especula que atualizar/reabrir Desktop mudaria os três dias exibidos. Fala em jitter de até trinta minutos. Essas afirmações não são resolvidas/verificadas nesta rodada; não copiar números como regra vigente. |
| 06:16–07:35 | Cita uso anterior para responder comentários de YouTube com contexto do vídeo, inclusive desligamento após 24 h. É relato, não novo fluxo montado/testado aqui. Resume vantagens e dependência de máquina ligada e sessão aberta, além de expiração. |
| 07:36–08:12 | Explica skills como instrução e, às vezes, ferramentas no modelo WAT. Dá exemplo de postagem LinkedIn com infográfico. Exemplos conceituais não autorizam execução nem provam integrações disponíveis. |
| 08:13–08:34 | Promove guia gratuito via comunidade Skool e explica onde encontrá-lo. Guia não foi adquirido nesta rodada. |
| 08:35–10:25 | Método 2 agrupa tarefas locais Desktop e rotinas remotas. Mostra lista de rotinas e exemplos pausados; percorre histórico de engajamento em comunidade. Declara cotas por plano e compara execução em máquina versus infraestrutura Anthropic. São limites históricos citados, sem pesquisa atual. |
| 10:26–11:08 | Explica que remoto recebe clone de repositório e precisa de variáveis de ambiente próprias; remete a outro vídeo em vez de configurar tudo. Afirma que remoto independe da máquina pessoal. Isso remove uma dependência, não garante sucesso incondicional. |
| 11:09–12:02 | Descreve recuperação de tarefas locais perdidas após reabrir app e sugere pausar se não quiser execução atrasada. Mostra opções Schedule/GitHub event/API para rotina remota. Não reproduz desligamento de cinco dias nem chamada externa completa. |
| 12:03–13:00 | Cita intervalo mínimo e cotas, necessidade de deixar local ligado e testar escopo antes de delegar ações autônomas. Diferencia rotina local que abre nova sessão de loop que precisa preservar sessão. Reforça comparação WAT. |
| 13:01–14:48 | Método 3: scripts Python em Modal ou TypeScript em Trigger.dev, acionados por horário/webhook, com painel de execuções. Prefere Trigger, mas declara não programar nessas linguagens. Diz que o agente pode implantar e configurar ambiente; novamente remete a vídeos específicos, sem deploy completo aqui. |
| 14:49–15:51 | Usa analogia de cron remoto versus motor de workflows; distingue script implantado de sessão Claude Code autônoma. Processos determinísticos podem dispensar modelo; se houver chamadas de IA, sua configuração/cobrança é outra dependência. |
| 15:52–18:23 | Bônus Agent SDK: descreve laço de raciocínio/ferramentas e continuidade por identificador de sessão, contrastando com chamada isolada ao modelo. Faz afirmações amplas sobre memória, hooks, skills e cobrança; não mostra implementação ou teste de SDK. Analogia não é documentação de API. |
| 18:24–19:16 | Inserção posterior corrige a fala sobre assinatura: cita anúncio de 13 de maio permitindo usar crédito mensal num orçamento separado, distingue de cota semanal e remete a análise de terceiro. Não define elegibilidade/valores/regras. Retorna à ideia de agente executado em infraestrutura remota. |
| 19:17–20:06 | Menciona Managed Agents como produto novo, explica preferência pessoal por infraestrutura que já usa e sugere público iniciante. Não testa comparativamente nem demonstra instalação. |
| 20:07–21:20 | Introduz hooks como ações após eventos: som de notificação, antes/depois de ferramenta, início/fim de sessão. Propõe usos, oferece futuro vídeo e não configura hook completo nesta fonte. |
| 21:21–21:49 da legenda | Repete divulgação do guia/comunidade, pede like, agradece e encerra. |

## O que se aprende com cada método

| Percurso do vídeo | Unidade de trabalho descrita | Dependência e evidência |
| --- | --- | --- |
| Loop na sessão | Prompt/skill volta à sessão em intervalos. | Máquina/processo/sessão precisam continuar, segundo o autor. Criação e histórico mostrados; não há monitoramento prolongado certificado por este estudo. |
| Tarefa local do Desktop | Agendamento abre sessão com prompt/contexto de projeto. | Máquina/app ligado; o autor descreve recuperação posterior de atraso, sem reproduzir esse cenário. |
| Rotina remota | Prompt em ambiente de repositório na infraestrutura do fornecedor. | Configuração remota de credenciais/contexto, disponibilidade da conta e disparador. Exemplos/painéis existentes; setup completo e teste sem máquina pessoal não mostrados. |
| Script em Modal/Trigger | Código chamado por horário ou endpoint. | Runtime, deploy, variáveis e dados externos. Descrição e links a outras aulas; nenhum caminho completo novo é executado neste vídeo. |
| Script com Agent SDK | Código incorpora laço com ferramentas e continuidade de sessão. | Implementação e configuração adicionais. Bônus conceitual, não exercício operacional concluído. |

Deploy de script não transfere automaticamente a sessão, arquivos locais, MCPs ou credenciais do computador. Essa é a principal distinção útil para o curso. O título sobre automações durante o sono deve ser lido junto da condição do próprio autor: as alternativas locais ainda dependem do ambiente ligado. “Nuvem” não elimina credenciais inválidas, falha do serviço ou resultado errado.

## Erros, contradições e retestes

**Três versus sete dias:** no mesmo quadro de 03:45, a resposta do agente diz sete dias e o painel Active loops diz terminar em três dias. O autor posteriormente especula sobre atualização. Não vemos instalação de nova versão seguida de reteste. Manter a divergência entre texto do agente e UI explícita, sem escolher um número universal ou presumir que a fala solucionou o conflito.

**Limpar contexto e sobrevivência do agendamento:** autor relata/lista crons após `/clear` no terminal e descreve resultado diferente no Desktop. Exibir uma lista é evidência de registro ainda presente; não verifica por si só todos os futuros disparos. O loop que injeta `/clear` é experimento particular, não procedimento recomendado sem validar suporte e efeitos no ambiente atual.

**Jitter e pontualidade:** a fala diz “até trinta minutos” e também discute frequência curta. A exatidão desse número/termo não foi confirmada em documentação primária nem por medição. Ensinar apenas que horário desejado e execução observada precisam ser comparados; não prometer instante exato com base no vídeo.

**Cobrança do SDK:** a afirmação inicial de que assinatura não poderia ser usada recebe adendo de crédito dedicado. Nem a frase inicial nem o adendo bastam para orientar compra, gratuidade ou custo atual. Não somar cotas de rotina, cota semanal e crédito de API como se fossem iguais.

**Sem falha operacional fechada:** não há execução completa Modal/Trigger que falha, é corrigida e passa novamente. Também não há teste de credencial ausente, duplicação após atraso, perda de sessão remota ou falha do logger. A recomendação de observar prompts antes de confiar é relevante, mas não constitui reteste desses cenários.

## Pré-requisitos, interface e adequação

Pressupõe que a pessoa já tenha skills/fluxos úteis funcionando manualmente. Para local: produto/versão compatível, app/terminal, projeto, arquivos e ferramentas disponíveis. Para remoto: conta com acesso ao recurso, repositório/configuração apropriada, variáveis/credenciais e serviços acessíveis no ambiente remoto. Para scripts: projeto/runtime, implantação e autorização para integrações. O vídeo não prepara esses requisitos do zero.

Todos os limites, nomes de ferramentas, menus, formas de limpar sessão e planos são observações/afirmações de **maio de 2026**. Não houve pesquisa atual nesta rodada. A fonte diferencia **Claude Desktop e terminal**; não trata de Codex Desktop. Não transferir `/loop`, CronCreate, Routines, APIs ou cotas entre produtos porque os nomes parecem semelhantes. Também não inferir que SDK é endpoint pronto apenas pela analogia usada pelo autor.

Manter no corpus completo, depois de uma execução manual e antes da escolha de hospedagem/agendamento. Contribuição: máquina versus nuvem, sessão versus tarefa nova, script versus agente e dependências do ambiente. Sobrepõe-se a outras explicações de agendamento, mas reúne limites úteis. Para iniciante, escolher um único caminho pequeno e completar teste real antes de acrescentar SDK, infraestrutura ou canais externos.

## Prática original proposta

Prática não executada: um relatório curto de uma lista fictícia de tarefas, gerado manualmente a partir de arquivo do exercício e salvo com horário/identificador. Depois escolher **um** agendador disponível e verificado, declarando onde roda, fuso horário, qual ambiente precisa permanecer ligado, entrada, saída e como parar. Usar saída local controlada; comentários públicos, email ou mensagens não são necessários para aprender recorrência.

1. **Gatilho e resultado:** observar dois disparos reais, conferir horário de execução, arquivo de origem, conteúdo e registro. Criação do agendamento ou aviso “ativo” não aprova a prática.
2. **Falha e recuperação:** tornar a entrada fictícia indisponível, exigir erro visível sem relatório falso, restaurar e repetir. Verificar que uma repetição não duplica uma ação que deveria ocorrer uma vez.
3. **Ciclo de vida:** cancelar/pausar e confirmar ausência do próximo efeito. Se local, testar interrupção/reabertura no exercício e registrar se houve recuperação, descarte ou execução atrasada, conforme contrato verificado.

Transferência: relatório de tarefas → consolidação de arquivos ou checklist recorrente. Quando houver saída externa, acrescentar autorização, destinatário certo e prevenção de duplicação como critérios da prática concreta; nenhum envio ocorreu aqui. Pendências de estudo: audiovisual contínuo, histórico completo de execuções, valores/limites atuais, SDK/infraestrutura e implementação operacional dos caminhos apenas descritos.

## Visuais

| Player | Estado efetivamente visto | Limite |
| --- | --- | --- |
| 03:45 | Desktop mostra criação de loop e resposta com sete dias; painel Active loops registra intervalo de dez minutos e término em três dias. | Configuração contraditória; não há medição de qual expiração efetivamente ocorreu. |
| 04:45 | Terminal apresenta CronList com recorrência por minuto, seguido de registro de tarefa agendada e lembrete no histórico. | Evidência do histórico mostrado após limpeza narrada, não observação prolongada por este estudo. |
| 10:20 | Rotina remota de diagnóstico de ambiente está Paused, vinculada a repositório e com horário semanal/CDT; instrução testa existência de variáveis. | Não há execução nova nem resultado do diagnóstico neste quadro. Nomes de variáveis não comprovam credenciais válidas. |
| 11:55 | Nova rotina oferece Schedule, GitHub event e API; lista conectores e avisa que suas ferramentas, inclusive escrita, podem ser usadas sem nova pergunta de permissão. | Configurar conexões/escopo é parte da operação; a presença das opções não comprova chamada externa bem-sucedida. |
| 15:05 | Quadro de comparação do autor organiza métodos, WAT e dependência de máquina/sessão. | É material explicativo, não execução de scripts em Modal/Trigger. |

Capturas internas ficam no manifesto com horário/hash e observação restrita ao quadro. A inspeção de configurações e históricos não certifica a criação, execução e recuperação integral de cada método.
