# Nate — correção automática de workflows e escalada humana

Fonte: [I Will Never Fix Another n8n Workflow (Claude Code)](https://www.youtube.com/watch?v=uUEa6K-FLB8), Nate Herk, publicada em 2026-01-22; estudada em 2026-09-28. É um caso avançado de recuperação em automações existentes, com falhas deliberadas. Não é uma instalação completa nem evidência de que qualquer workflow possa ser reparado sem supervisão.

## Cobertura e procedência

Leitura sequencial integral de 448 linhas/cues, em duas faixas: 1–230 e 231–448. Artefato: `transcripts/local/aq.uUEa6K-FLB8.en.d5af9e07a7bb.txt`, 31.537 bytes, SHA-256 `d5af9e07a7bbd490fd93b5bbcbecbad9f77c5dcf2eb0c43e8ac1b5e6f3cea4c8`. JSON3 original e capturas com hashes no manifesto deste lote. Legenda automática em inglês, 00:00–13:20,399; duração adquirida 13:20, player 13:19. O término extrapola a duração adquirida em 0,399 s, sem comprovar cobertura da fala. Variações como Cloud Code/Naden/Enro/Tavi são ruído de transcrição; a análise usa Claude Code, n8n, ngrok e Tavily quando o contexto/tela permite identificá-los.

Sete quadros foram inspecionados, sem acompanhamento audiovisual contínuo. Nenhuma automação, mensagem, conta, túnel ou reparo foi executado pelo estudo. `full_transcript_read=true`; `full_video_watched`, `full_speech_coverage_verified` e `full_source_analyzed=false`. Capturas são evidência interna; esta ficha é redação original.

## Sequência integral

| Faixa | Ação e raciocínio |
|---|---|
| 00:00–00:30 | Retoma vídeo anterior de geração de workflows, propõe reparação e a amplia para acionamento por erro. Usa pipeline de pedidos com dois caminhos e falha inserida pelo autor. |
| 00:30–01:21 | ClickUp informa falha em Validate Each Order: esperava itens individuais, recebeu um array dentro de um item. O reparador altera Enrich Order Data para retornar um item por pedido, em vez de inserir o Split Out sugerido pela mensagem. Alega correção aplicada; atualiza o editor. |
| 01:21–01:54 | Consulta execução falha e dispara novamente. A nova execução aparece como bem-sucedida. O caso separa o relatório do agente do reteste posterior feito pelo autor. |
| 01:54–03:05 | Explica Error Workflow configurado nas opções do fluxo principal. Error Trigger envia HTTP ao serviço local que inicia Claude Code, com ID, nó e erro. O agente consulta o fluxo, aplica mudança e notifica ClickUp. Mostra log de execução local; terminal e túnel são necessários na arquitetura dele. |
| 03:05–04:02 | Usa analogia de loja pública e apartamento para explicar que Claude Code pode consultar n8n remoto, mas n8n precisa de endereço/acesso à ponte local. Não é documentação da autenticação da ponte. |
| 04:02–05:54 | Desenha sequência: erro → error workflow → HTTP → túnel ngrok → processo local → Claude Code/MCP/skills → alteração no n8n → notificação. Corrige verbalmente um X colocado no nó errado do diagrama. Descreve documentação, templates, expressões e padrões fornecidos por MCP/skills; remete instalação a outro vídeo. |
| 05:54–07:08 | Distingue erros de lógica, tipos, nulos, arrays, expressões e código de credenciais expiradas/API indisponível. Sobre rate limit, primeiro o lista como limite e depois especula que o agente poderia construir espera/loop; isso não é demonstrado. Notificação continua útil quando não há reparo possível. |
| 07:08–08:03 | Caso de responder email: parser separa assunto/mensagem, mas schema JSON tem vírgulas ausentes. Relatório diz corrigido. O autor abre versão atual e executa: o fluxo chega a estado verde, incluindo parser e envio Gmail. Não abre mensagem recebida nem avalia conteúdo/destinatário. |
| 08:03–08:44 | Formulário de pesquisa aciona Tavily. Introduz aspas no tema banana para quebrar JSON interpolado; erro chega ao terminal. A primeira tomada é interrompida sem explicação técnica da interrupção. |
| 08:44–09:37 | Recomeça com apple, mantendo o problema de aspas. Terminal recebe erro, salva prompt e executa Claude Code. Após espera/corte, relatório atribui falha à expressão do corpo JSON e diz ter corrigido sua montagem. Notifica ClickUp com link do workflow. |
| 09:37–10:04 | Dispara novamente com aspas antes de apple. Mostra execução sem erro e o dado recebido; explica que o corpo passou a ser montado de outra forma. Não compara integralmente as expressões nem os resultados da pesquisa. |
| 10:04–11:11 | Troca deliberadamente a credencial do Tavily por chave de outro serviço. Aciona erro; reparador retorna ação humana necessária, orienta escolher/criar credencial válida e testar. Diz não ter alterado o workflow. A credencial não é corrigida/retestada na fonte. |
| 11:11–12:09 | Recapitula reparo ou escalada. Propõe manter ponte/túnel ativos durante ausência e enriquecer contexto do projeto. Reconhece não ter mostrado a construção; afirma ter feito por linguagem natural/Plan Mode. Não testa disponibilidade contínua ou reinício. |
| 12:09–fim | Apresenta guia PDF de 18 páginas, pré-requisitos e arquitetura; diz que n8n local simplificaria o túnel. Sugere tempo de configuração de meia a uma hora e refinamento por testes. Promove comunidades gratuita/paga, cursos e encontros; encerra. O PDF não foi lido nesta rodada. |

## Evidência de falha, correção e reteste

| Caso | Visto nas amostras | Limite da conclusão |
|---|---|---|
| Pedidos | 00:50: relatório identifica array encapsulado e mudança no Code node. O próprio relatório registra avisos/erros preexistentes de Slack e configuração de webhook. 01:40: execução nova Succeeded, caminho superior verde. | Correção específica e novo sucesso, não ausência de todos os problemas. O ramo inferior de modelo/Slack não aparece executado. Não foram auditadas quantidade, valores ou duplicação dos pedidos no destino. |
| Parser de email | 07:55: workflow em execução; 08:00: parser, agente e Send a message verdes, um item e aviso de sucesso. | Pedido de teste seguido de conclusão visual no n8n. Não prova entrega na caixa do destinatário, qualidade do texto ou ausência de envio duplicado. |
| Aspas na pesquisa | 09:45: nova execução Succeeded. 09:50: output do formulário contém aspas antes de apple. | Reteste inclui o caractere que quebrava a montagem. Não testa outras entradas nem relevância da pesquisa. A tomada interrompida com banana não recebe diagnóstico. |
| Autenticação | 10:45: mensagem relata Authorization failed, exige credencial válida e pede teste. | Instrução de reteste, não reteste realizado. “Nenhuma mudança” é alegação do relatório; não foi auditado diff. |

Os três casos reparáveis são falhas escolhidas pelo autor, não amostra representativa de incidentes reais. Relatório de agente não equivale a revisão da mudança. A fonte é mais forte ao mostrar novas execuções; é mais fraca em efeitos externos, cobertura de ambos os ramos, reversão e continuidade operacional.

## Pré-requisitos e compatibilidade histórica

O ambiente exige n8n existente, workflows configurados e acionáveis, error workflow associado, Claude Code local autenticado, serviço ponte/servidor HTTP em execução, túnel para n8n remoto alcançar a máquina, MCP com acesso de alteração ao ambiente, skills de n8n e conexão de notificação ClickUp. Cada demonstração adiciona suas credenciais: Gmail/modelo, Tavily ou serviços do pipeline. O vídeo não fornece neste conteúdo todos os comandos, configurações ou o código da ponte; encaminha isso ao PDF/vídeo anterior.

Para pessoas comuns, isso vem depois de entender execução, erro e reteste manual. Manter a máquina, o processo e o túnel funcionando é requisito concreto do desenho mostrado; não há prova de recuperação após suspensão/reinício. A ponte pode alterar workflows remotos e acionar efeitos externos. A adaptação precisa limitar o alvo de teste, registrar a mudança e verificar saída/duplicação antes de usar reparo em fluxos de produção. O caso de erro de credencial ensina a parar e encaminhar, sem fabricar credenciais.

O vídeo é de janeiro de 2026; interfaces, MCP/skills, auth, tunneling e permissões atuais não foram verificados. Claude Code no terminal local não é equivalente a Claude Desktop ou Codex Desktop. A afirmação de facilidade com n8n local depende de conectividade/processos e não elimina autenticação/configuração por definição.

## Uso curricular e prática original proposta

Competência: transformar “o agente diz que consertou” em evidência verificável — erro reproduzido, mudança registrada, mesma entrada retestada e efeitos conferidos. Complementa logging e avaliação: ausência de exceção não garante saída correta. Proposta abaixo não foi executada e não cria automaticamente uma aula adicional.

Prática: numa cópia local de um fluxo de pedidos fictícios, receber três itens, validar campos e escrever apenas relatório de teste. Guardar a versão inicial. Introduzir um array encapsulado e observar a falha. Pedir diagnóstico e alteração delimitada, inspecionar a mudança e retestar, sem túnel ou comunicação externa como requisito inicial.

1. **Mesma entrada, resultado completo:** repetir os três IDs antes/depois; a versão corrigida deve produzir três resultados e preservar quantidades/valores, não somente ficar verde. Executar também o outro ramo com dados conhecidos.
2. **Casos difíceis e duplicação:** testar entrada vazia e texto com aspas; definir o resultado esperado antes de rodar. Reexecutar um ID e confirmar a política escolhida para duplicatas. Registrar falha, correção e novo resultado.
3. **Limite e recuperação:** simular serviço inacessível em ambiente de teste; confirmar que o agente registra necessidade de intervenção sem afirmar sucesso. Restaurar configuração válida, executar novamente e demonstrar reversão de uma alteração ruim a partir da cópia salva.

Pendem revisão audiovisual contínua, leitura de código/configuração da ponte, teste real do ambiente e verificação de efeitos externos. O histórico permanece na fila, com prioridade de uso distinta da completude de estudo.
