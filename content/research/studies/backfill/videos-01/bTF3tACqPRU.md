# n8n — registrar falhas e distinguir execução de resultado

Fonte: [One n8n Workflow for Unlimited Error Handling (Step-by-Step)](https://www.youtube.com/watch?v=bTF3tACqPRU), Nate Herk, publicada em 2025-04-20. Data/metadados provenientes da aquisição existente. Estudo em 2026-09-28; estado canônico anterior `not_started`, sem ficha de estudo anterior localizada.

**Parecer:** caso concreto de Error Trigger → registro em Sheets + mensagem Slack, com falhas provocadas e repetição de teste. É útil depois de uma primeira automação, mas pressupõe workflow, bot e credenciais existentes. “Unlimited Error Handling” não significa capturar qualquer resultado incorreto, corrigir falhas automaticamente ou garantir disponibilidade do logger.

## Cobertura e artefatos

Lidas todas as **336 linhas/cues** da faixa automática inglesa, sequencialmente em 1–180 e 181–336: `transcripts/local/aq.bTF3tACqPRU.en.7699c8668864.txt`, 23.615 bytes, SHA-256 `7699c866886415289a86d31419d26db7a2ebf7d0c6ec21fb325407865c23edc6`. JSON3 de origem identificado no manifesto, sem segunda leitura independente. Grafias automáticas de n8n, Tavily e expressões não devem ser copiadas como instrução técnica.

Primeiro cue 00:00,160; último fim 09:37,040. Aquisição e player apontam 09:36: excesso de 1,040 s permanece sem verificação de fala. Cinco quadros úteis inspecionados em 07:30, 07:50, 08:35, 08:40 e 08:45; anúncio intersticial foi pulado pela interface e sua captura preliminar substituída por um quadro do tutorial. Não houve download audiovisual, operação de n8n ou envio de mensagem por este estudo. A leitura textual é integral; vídeo, fala e fonte audiovisual integral permanecem não certificados.

## Sequência completa

| Tempo | Conteúdo, ação e resultado |
| --- | --- |
| 00:00–00:33 | Propõe um fluxo compartilhado para receber falhas de vários workflows, gravar numa planilha e avisar por Slack ou email. Usa um assistente já construído; divulga vídeo anterior sobre Think. Email é alternativa citada, não implementada. |
| 00:34–01:12 | Ativa o workflow de exemplo e cria Error Logger iniciado por Error Trigger. Prefere provocar uma falha real ao evento de teste simplificado. A exigência de atividade é a instrução do autor para esse fluxo em 2025, sem verificação atual de todas as modalidades de disparo. |
| 01:13–01:48 | No workflow monitorado, seleciona Error Logger em Settings → Error workflow e salva. Esse vínculo por workflow é necessário; criar o logger sozinho não monitora automaticamente todo o ambiente. |
| 01:49–02:58 | Envia “Hey” ao bot Telegram e recebe resposta. Remove o modelo de chat, salva e repete: não há resposta, a execução falha. Abre execução do logger e examina identificadores, URL, nome do fluxo/nó e mensagem de modelo desconectado. |
| 02:59–03:32 | Copia execução para o editor como dados de exemplo. Apresenta colunas de planilha e promove template na comunidade gratuita. O template é conveniência; não foi adquirido neste estudo. |
| 03:33–04:48 | Acrescenta Google Sheets para inserir linha, escolhe credencial/planilha e mapeia horário, workflow, URL de execução, nó e mensagem. Usa `$now` e mostra formatação, mas a legenda não contém código completo confiável da expressão. |
| 04:49–05:11 | Testa o passo da planilha com dados copiados, vê linha inserida e segue a URL até a execução que falhou. É teste do destino com amostra histórica, não ainda uma nova falha em produção. |
| 05:12–06:50 | Acrescenta Slack com mensagem em canal: workflow, nó, horário, erro e link da execução. Ajusta opção de rodapé e testa o passo; mostra mensagem recebida. Credenciais e permissões já existem. Sugere canal dedicado. |
| 06:51–08:03 | Salva o logger e diferencia falha que interrompe execução de resultado incorreto. Busca Tavily sem autenticação falha; agente responde que não pode buscar. A execução termina verde e não surge novo alerta/linha. Não conserta a autenticação nem implementa regra para detectar esse tipo de falha. |
| 08:04–08:34 | Provoca outra falha alterando a referência da chave de sessão de memória. Primeira tentativa não produz o erro esperado; identifica que esqueceu de salvar. Salva e repete a mensagem. Esse é erro do procedimento de teste e recuperação explícita. |
| 08:35–09:00 | Mostra nova linha, novo alerta e execução do logger referentes ao nó Simple Memory. O reteste confirma o caminho do logger para uma nova falha; não repara a memória nem demonstra retorno do assistente ao sucesso. |
| 09:01–09:22 | Pergunta o que ocorre se o próprio logger falhar. Minimiza a probabilidade quando o fluxo é simples e menciona autenticação. Não apresenta proteção, teste de indisponibilidade ou recuperação desse cenário; a minimização é opinião, não garantia. |
| 09:23–09:37 da legenda | Recapitula utilidade, pede like e encerra. A cauda textual excede a duração conhecida. |

## O exemplo completo e suas dependências

Entrada do caso: uma mensagem em bot Telegram aciona o assistente ativo; um erro fatal gera evento para outro workflow. Transformação: extrair metadados da execução. Saídas: linha em planilha e mensagem no canal Slack com link para investigação. Dados copiados para o editor permitem testar os destinos; o último teste usa uma falha nova e oferece evidência mais forte de ligação entre fluxo monitorado e logger.

São pré-requisitos implícitos: acesso a n8n, workflow/bot existente, capacidade de ativar e salvar, conta/credencial Google Sheets com acesso à planilha e cabeçalhos, integração Slack com acesso ao canal e leitura de execuções. O assistente também usa modelo, memória e ferramentas já configurados; o tutorial não ensina montá-lo. Instalação/OAuth dos destinos não são cobertos. Para iniciante, esse conjunto precisa ser preparado ou explicado antes da prática.

Os nomes e caminhos de campos dependem do payload recebido. Não universalizar o objeto de um erro de subnó como se todos os erros tivessem o mesmo formato. A fonte não testa evento com campo ausente, erro de gatilho, falha do Sheets/Slack, duplicação, volume elevado nem indisponibilidade simultânea. O horário calculado pelo logger é horário de processamento; não deve ser apresentado como hora exata original da falha sem verificar esse contrato.

## Evidência visual e erro versus recuperação

| Quadro | Evidência diretamente vista | O que não prova |
| --- | --- | --- |
| 07:30 | Telegram apresenta resposta de busca indisponível por problema de conexão. Canvas do assistente está ao fundo. | Busca bem-sucedida, causa técnica completa ou correção. |
| 07:50 | Nó Think tem saída verde cujo texto menciona erro de autenticação 401 da busca. | Sucesso do objetivo do usuário. A cor do nó e o conteúdo apontam critérios diferentes. |
| 08:35 | Planilha ainda apresenta apenas o erro anterior do modelo desconectado. | A nova linha ainda não está presente nesse quadro. |
| 08:40 | Nova linha Simple Memory aparece após a linha anterior, com mensagem diferente. | O agente original voltou a funcionar; logger registra a falha. |
| 08:45 | Slack contém dois alertas distintos: modelo desconectado e Simple Memory, com horários e links de execuções diferentes. | Correção, entrega a qualquer destinatário ou alerta sobre a falha silenciosa de busca. |

Três situações devem permanecer separadas: (1) remover modelo provoca erro fatal e gera amostra; (2) erro de busca é absorvido pelo agente e não dispara logger; (3) memória inválida, após salvar, produz nova falha e percorre os dois destinos. O único conserto explicitamente retestado no procedimento é salvar a alteração que faltava. Não há demonstração de corrigir credenciais/expressão de memória e confirmar sucesso posterior do assistente.

## Compatibilidade, adequação e prática original

Fonte histórica de interface n8n de abril de 2025; estado atual de rótulos, regras de execução e integrações não foi pesquisado nesta rodada. Não apresenta Codex Desktop. Ajudar a escrever um workflow em um agente não cria as contas, autoriza integrações nem comprova execução na plataforma.

Conservar no corpus completo e ordenar após a primeira automação. Contribuição específica: ligar uma falha real a evidência investigável e mostrar por que “verde” não equivale a resultado correto. Sobrepõe-se a fundamentos de execução, mas acrescenta tratamento de falha; não substitui o ensino do gatilho/ação inicial.

Prática original proposta, ainda não executada: usar uma **cópia de exercício** de um fluxo pequeno, um destino de registro próprio e dados fictícios. Definir primeiro o resultado esperado e identificar uma falha controlada compatível com esse fluxo. Conectar logger, salvar/publicar conforme a interface disponível e provocar a falha pelo gatilho real do exercício. Adicionar aviso a canal próprio somente quando essa integração fizer parte da prática autorizada.

1. **Rastreabilidade:** a falha nova precisa gerar registro com nome do fluxo, nó, mensagem e ligação para a execução correta; verificar que não é apenas replay de amostra antiga.
2. **Recuperação:** restaurar a configuração válida, salvar e executar novamente; exigir resultado útil e ausência de novo alerta indevido. Um alerta enviado não aprova recuperação.
3. **Limite da detecção:** produzir uma saída que termine sem erro técnico, mas não satisfaça o contrato do exercício; verificar se o logger a ignora e especificar uma checagem de resultado própria. Não prometer que o Error Trigger detecta toda falha de negócio.

Transferência: importação de arquivos, agenda ou consolidação de dados. Para uso real, o que acontece se o próprio registro falhar deve ser resolvido com evidência adicional, sem repetir a garantia informal do autor. Pendências de estudo: audiovisual contínuo, mapeamentos/expressão completos, transições dos testes e precisão de fala. As cinco capturas e hashes estão no manifesto; nenhum envio externo foi realizado neste estudo.
