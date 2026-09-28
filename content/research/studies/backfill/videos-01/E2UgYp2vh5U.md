# Dois agentes construindo CollabMD — comparação, bugs e limites da evidência

Fonte: [I Built the Same App With Claude Code and Codex](https://www.youtube.com/watch?v=E2UgYp2vh5U), Tech With Tim, publicada em 2026-05-22 segundo a aquisição existente. Estudo em 2026-09-28. Antes desta rodada, o manifesto canônico registrava `not_started` e nenhuma ficha correspondente foi localizada.

**Parecer:** fonte valiosa para estudar decomposição de tarefas, inspeção do resultado, bugs e limitações de comparações entre agentes. Não é uma receita de primeiro app nem demonstra superioridade geral ou economia previsível de um produto. O autor anuncia e repete que o experimento não é científico. Um editor colaborativo com WebSockets e persistência exige pré-requisitos muito maiores do que uma página simples.

## Cobertura e proveniência

Lida integralmente a faixa `transcripts/local/aq.E2UgYp2vh5U.en-CA.be8096d60e4c.txt`: **854 linhas lógicas, contendo 546 cues**, em sequência 1–190, 191–470, 471–730 e 731–854. Não confundir cues com linhas: várias falas ocupam mais de uma linha. Artefato de 48.800 bytes, SHA-256 `be8096d60e4ccc3605679fd6618a1c522f62fbb445cdc7d541966f5927a7d022`.

Origem `authored-or-unspecified`, idioma en-CA: classificação da faixa publicada, **não prova de transcrição manual revisada**. O JSON3 está identificado no manifesto e não foi lido como segunda faixa independente. Nomes, números de modelo, portas e termos como CRUD, auth e Yjs precisam ser tratados com cautela quando derivados só da legenda.

Primeiro cue 00:00,116; último fim 26:51,033; duração adquirida 27:00, deixando 8,967 segundos após o fim da legenda. O player observado exibe 26:59. Não se afirma que o trecho restante seja silêncio nem se resolve a diferença de duração por inferência. Leitura textual integral concluída; vídeo/fala integral não acompanhados. Estudo e prática não executaram código, fizeram conta, ligaram servidores ou enviaram tarefa a outro produto.

## Sequência integral do raciocínio e demonstração

| Tempo | Desenvolvimento e resultado |
| --- | --- |
| 00:00–00:57 | Propõe comparar velocidade, uso/custo, aderência ao pedido e qualidade de código; fará revisão humana e cruzada por modelos. Declara ausência de rigor científico. |
| 00:58–01:56 | Define CollabMD: editor Markdown dividido com colaboração em tempo real, presença/cursor, documentos, autosave e persistência; histórico/exportação são extensões. Usa mesma especificação de stack/arquitetura/layout, ainda relativamente aberta. |
| 01:57–02:37 | Planeja oito fases: estrutura, editor/preview, sincronização, presença, lista/CRUD, conexão/erros/reconexão, histórico e exportação/tema. Não pede todo o app de uma vez inicialmente. |
| 02:38–04:10 | Mostra instalações/contas próprias e escolhe acesso amplo para reduzir confirmações. Declara Opus 4.7 Max e GPT-5.5 extra high, sem fast mode; isso caracteriza o caso de maio, não recomendação atual. Registra cotas iniciais diferentes e apresenta sua experiência como programador. |
| 04:11–05:23 | Bloco patrocinado de Boot.dev: currículo prático, gamificação, tutor e desconto. Alegações e preço/promessa promocionais não foram verificados; não são evidência sobre a comparação. |
| 05:24–06:50 | Envia spec e primeiro prompt aproximadamente ao mesmo tempo. Estima Claude em seis minutos e Codex em quatorze; informa que Codex encerrou processo da outra implementação para usar a porta em conflito. Observa estrutura mais completa em Codex. Essa interferência limita a independência das execuções. |
| 06:51–07:34 | Codex apresenta preview e o autor relata teste automático no navegador. Claude exige novo pedido para executar e depois mostra interface com botão ainda inoperante. Relato sobre uso de ferramentas não equivale a igualdade comprovada do ambiente. |
| 07:35–09:11 | Pede editor dividido. Volta a pedir servidor de Claude em porta específica. Codex tem comportamento descrito como loop ao abrir/editar documento; Claude tem botão New document sem ação. Autor entra diretamente numa rota de documento para testar o editor — contorno, não correção do botão. Comunica problemas junto do próximo pedido. |
| 09:12–11:14 | Adiciona sincronização. Codex termina primeiro nessa fase; autor cria documento, digita texto/código e abre duas janelas para observar atualizações e cursores. Nota rótulo inesperado de usuário. Claude depois também sincroniza e o botão novo funciona, mas documentos parecem não ser salvos. Persistência permanece dúvida, não resultado aprovado. |
| 11:15–13:33 | Pede presença mais específica e declara que não testa escala. Enquanto roda, inspeciona arquivos dos dois: tamanho, organização, estilos, API, logs e banco. Relata mais tempo de verificação no navegador em Codex e menos em Claude; revisão humana é superficial assumida. |
| 13:34–14:17 | Compara presença nas janelas: cursores/contagem, ícones e aparente salvamento. Usa linguagem de impressão, sem protocolo de reinício do servidor ou durabilidade. |
| 14:18–15:17 | Abandona a sequência de oito pedidos separados e combina as fases finais. Estima Codex em 26 minutos e Claude em 7–8; envia pedido extra a Codex para corrigir estilo desconectado. A correção não é descrita em detalhe. |
| 15:18–16:56 | Apresenta versões finais visualmente semelhantes. Mostra tema, exportação, link de compartilhamento, edição em tempo real e contagem de participantes. Na versão Claude, contagem que deveria subir demora/não sobe; na Codex, refresh exibe dois e uma terceira janela chega a três. Exportar é citado/mostrado como opção, sem abrir e validar o arquivo resultante na leitura textual. |
| 16:57–18:40 | Inspeciona código de Claude: componentes separados, porém aninhamento, chamadas de API e responsabilidades juntas; server pequeno concentrado. Opina sobre comentários e manutenibilidade. Não lê cada linha. |
| 18:41–21:17 | Inspeciona Codex: prefere separação de API, presença, tema e tipos, funções e logs. Considera ambos razoáveis, com possível vantagem subjetiva de Codex. Reconhece revisão rápida e possíveis problemas de produção não identificados. |
| 21:18–23:09 | Pede revisão cruzada aberta. Codex demora mais e relata testar; Claude responde antes por leitura. Listam possíveis problemas de ciclo de vida de documentos, restauração, persistência, indicador de salvar, gravações por tecla, migração e organização. O autor relativiza itens; os achados não são reproduzidos/corrigidos neste estudo. |
| 23:10–24:12 | Conclui que Claude foi mais direto/rápido e Codex mais proativo em testar, e estima diferença de tempo. Essas são conclusões sobre a amostra e preferências do autor, não propriedade permanente dos produtos. |
| 24:13–25:24 | Compara percentuais de cotas, comenta compactação e infere custo. Admite não ter número exato de tokens nem fatura de API. Mistura razões estimadas de uso e de preço; elas não constituem medição financeira comparável. |
| 25:25–26:20 | Sugere usar ambos conforme tarefa, recomenda Claude para começar rápido e Codex para revisar/depurar sistemas maiores. Discute reduzir esforço e ligar modo rápido de forma hipotética, sem rodar novo experimento. |
| 26:21–26:51 | Reitera caráter não científico, admite limites, oferece comparação futura mais controlada e encerra com like/inscrição. Os segundos finais fora da legenda permanecem sem revisão integral. |

## Contrato funcional, bugs e o que realmente foi concluído

O exemplo pretendido inclui documento com texto editável, preview, vários clientes, cursores, listagem, salvamento, conexão/reconexão, versões e exportação. Os testes mais concretos relatados são criar/abrir, editar em duas janelas e ver mudanças/participantes. Isso demonstra um alcance maior que layout; ainda não fecha o contrato de um editor confiável.

| Problema/critério | Ação do autor | Evidência e limite |
| --- | --- | --- |
| Porta compartilhada | Outro agente derruba processo conflitante; mais tarde há pedidos para iniciar servidor correto. | Interferência entre candidatos em 05:50–05:58, não comparação isolada. Não ensinar encerrar processo alheio como passo padrão. |
| Loop no editor Codex | Relata problema e segue ao próximo incremento. | Edição/sincronização posterior funciona no teste do autor; não apresenta causa raiz, diff ou teste de regressão específico do loop. |
| Botão New document Claude | Abre rota diretamente para continuar, depois envia relato de falha. | Botão funciona numa etapa posterior; o contorno inicial não era solução. |
| Documentos parecem não salvar | Aponta suspeita em 11:04–11:10. | Depois diz que parece salvar; não há ciclo demonstrado de fechar todos os clientes/reiniciar/recuperar conteúdo novo. |
| Contagem/presença | Abre mais janelas; faz refresh na versão Codex. | Demonstração local com poucas janelas; não escala, usuários remotos reais ou sessões independentes. |
| Estilo quebrado | Pedido adicional de correção em 15:01–15:06. | Resultado final volta a ser apresentado; a causalidade e regressão não são detalhadas. |
| Revisões cruzadas | Lê achados dos dois agentes e pondera relevância. | Suspeitas como indicador de salvar enganoso ou documento excluído ressurgir exigem reprodução; não são bugs confirmados só porque um modelo os listou. |
| Histórico/exportação/reconexão | Incluídos no pedido final; interface/opções descritas. | Não há bateria completa demonstrada para restaurar versão correta, validar arquivo exportado e recuperar após desconexão. |

## Por que não usar o caso como ranking ou preço

Mesmo pedido inicial não controla tudo: um candidato interfere no processo do outro; correções e execução recebem pedidos extras; o escopo das fases finais muda; tempo inclui estratégias diferentes de teste; a revisão humana é assumidamente parcial. As críticas por modelos não equivalem a avaliador neutro nem substituem critérios definidos antes do teste.

A comparação de cotas não fornece preço por tarefa. No relato, Claude parte de cerca de 5% usados na janela curta e termina em 23%, enquanto Codex termina com cerca de 5% consumidos. Isso seria aproximadamente 18 versus 5 pontos percentuais **se** as leituras forem comparáveis, algo que o estudo não estabelece. Planos, denominadores, janelas, carga prévia e tokens não são normalizados. O autor passa de uma estimativa de uso de 2–2,5 vezes para uma estimativa de custo de 3–4 vezes; registrar como extrapolação, não preço medido. Não realizar escolha de assinatura a partir desses números.

## Pré-requisitos, atualidade e uso para pessoas comuns

Exige manipular pastas de projeto, especificação, servidores/portas, navegador e código cliente/servidor; entender documentos, sincronização, persistência e revisão. O autor é programador e intervém quando o fluxo falha. Seu acesso amplo/bypass é uma escolha de ambiente da demonstração, não pré-requisito pedagógico universal. O curso pode decompor resultados sem reproduzir permissões irrestritas.

As superfícies de produto, modelos, esforço, cotas e contexto pertencem ao ambiente de maio de 2026. Não foram validados como opções atuais nem como garantias da instalação do aluno. Quando a fonte usa preview/navegador no app, registrar essa observação localizada; não concluir que qualquer CLI, Desktop ou conta oferece as mesmas ferramentas. “Pedir para testar” é transferível; disponibilizar o ambiente de teste é uma dependência concreta.

Manter a fonte no histórico completo, ordenada depois de um app simples com estado e persistência. Acrescenta investigação de regressão e leitura crítica de benchmark; sobrepõe-se a prompts/iterações, mas tem erros e comparação mais ricos. Não serve de base única para um iniciante reproduzir oito fases com backend colaborativo.

## Prática original e critérios

Proposta não executada: partir de um pequeno bloco de notas com título/texto e armazenamento definido. Acrescentar uma função por vez: preview, salvar/abrir, depois exportar. Para comparar agentes, usar cópias isoladas, mesmos critérios e orçamento declarado; permitir correções, registrando-as. Não exigir duas assinaturas para aprender: também é possível comparar duas iterações do mesmo agente.

1. **Estado e persistência:** escrever texto inédito, salvar, fechar/reabrir e recuperar título/conteúdo; repetir após edição. “Saved” na tela só aprova se o dado for recuperado. Declarar se é armazenamento local ou backend.
2. **Regressão:** relatar defeito com passos curtos, corrigir e repetir tanto o caso que falhava quanto criar/abrir/editar anteriores. Acessar rota alternativa não conta como corrigir o botão quebrado.
3. **Resultado exportado:** exportar e abrir o arquivo; comparar conteúdo, inclusive caracteres especiais e formatação escolhida. Presença de botão não é evidência de exportação correta.

Se colaboração for incorporada depois, acrescentar dois clientes independentes, edição simultânea, desconexão/retorno e exclusão/restauração. Registrar conflito ou perda, sem esconder falhas para favorecer um modelo. Transferência: notas → listas, registros de estudo ou rascunhos; os testes de armazenamento e regressão continuam necessários.

## Visuais e pendências

| Player | Quadro efetivamente visto | Limite |
| --- | --- | --- |
| 03:15 | Aplicação gráfica Codex com projeto local e seletor exibindo 5.5 Extra High. | Confirma configuração histórica desse lado; não controla equivalência de ferramentas, assinatura ou ambiente do outro agente. |
| 10:21 | Duas janelas locais do mesmo documento, editor Markdown e preview correspondentes, com texto/código e indicação Connected. | Estado compatível com sincronização relatada; imagem isolada não mede latência nem verifica sequência de teclas. |
| 16:36 | Documento local com três avatares e controles Share, History, Export e tema. | Três indicadores não comprovam escala, identidades independentes, exportação válida ou histórico correto. |
| 22:46 | Relatório de Claude sobre projeto Codex aponta que Ctrl/Cmd+S apenas mostra confirmação, sem confirmação de persistência; cita possível resposta falsa durante desconexão. | Alegação específica do revisor, não bug reproduzido. Dá origem a um teste concreto de salvar e recuperar, não a uma condenação automática do código. |
| 24:46 | Menu da aplicação Codex apresenta 95% restantes na janela de cinco horas e 98% na semanal, sobre relatório de revisão. | Confirma percentuais mostrados, sem revelar denominador, preço por tarefa ou tokens. Superfície gráfica local observada; não equivalência com CLI/cloud ou versões atuais. |

O manifesto registra somente os quadros efetivamente vistos, com horário, arquivo e hash. Amostras visuais não certificam o vídeo completo nem todas as interações. Permanecem pendentes audiovisual contínuo, cauda após 26:51, precisão de termos, código/spec completos e reprodução dos achados da revisão cruzada. Nenhum benchmark, custo, persistência ou implantação foi validado por execução própria.
