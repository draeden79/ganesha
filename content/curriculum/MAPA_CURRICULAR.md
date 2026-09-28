# Mapa curricular — proposta inicial

Data: 2026-09-28. Estado: L01 reclassificada como protótipo provisório (`draft`), com tradução produzida nos 11 idiomas e sustentação parcial por seções/sínteses. Nenhuma aula foi aceita como pedagogicamente pronta após a auditoria de profundidade. L01 aguarda estudo integral das fontes pertinentes e revisão da sequência; expansão permanece planejamento. A sequência é decisão do Educador, não uma afirmação de eficácia pedagógica medida. Ver `PEDAGOGICAL_AUDIT.md`.

Diretriz atual: avançar com poucos recursos fortes e completos por competência, sem esperar o inventário inteiro. `RESEARCH_PRIORITIES.md` registra seleção, prioridades e critério de suficiência; `L01_REVISION_PLAN.md` propõe corrigir a coerência do primeiro percurso, ainda sem alterar textos ou avaliações.

## Resultado e pré-requisitos

Ao terminar a primeira trilha, o aluno tem uma página pequena publicada, verifica a ação principal em navegador e celular, descreve uma correção feita e guarda evidências do resultado. Não precisa conhecer programação. Precisa operar arquivos e navegador, ter acesso à ferramenta escolhida e, na etapa de publicação, ao serviço de hospedagem escolhido. Limites de conta, instalação e interface dependem da versão e devem ser verificados nas fontes.

Projeto progressivo: página de um serviço fictício escolhido pelo aluno. Primeira versão: título, descrição, três serviços e ação de contato com dados fictícios. A publicação acontece apenas após revisão. O uso de dados fictícios é parte do exercício, não autorização para publicar informações reais de terceiros.

## Competências

| ID | O aluno consegue… | Evidência observável | Pré-requisito |
| --- | --- | --- | --- |
| C01 | transformar uma ideia em resultado delimitado | descrever público, entrega e ação principal | nenhum |
| C02 | fornecer contexto útil e critérios verificáveis | escrever pedido com contexto, limites e critérios | C01 |
| C03 | preparar a ferramenta e reconhecer seu modo de trabalho | localizar projeto/artefato e distinguir proposta de execução | C01 |
| C04 | revisar uma resposta com evidência | comparar resultado observado aos critérios | C02, C03 |
| C05 | pedir uma correção específica | descrever esperado, observado e reprodução | C04 |
| C06 | testar caminhos principais e limites | registrar testes com resultado e evidência | C04, C05 |
| C07 | publicar e conferir a versão pública | abrir URL externa e repetir testes essenciais | C06 |
| C08 | transferir o processo entre ferramentas | adaptar instrução e explicar onde execução/resultado mudam | C02–C07 |
| C09 | acrescentar comportamento com estado | testar app pequeno, inclusive entrada vazia e erro | C06 |
| C10 | automatizar tarefa com controle humano | testar entrada/saída, falha, repetição e interrupção | C05, C06 |

## Primeira trilha executável proposta

Trilha de **sites**: cinco aulas e 35 telas propostas. L01 existe como protótipo para revisão; nenhuma aula está liberada pedagogicamente. As demais só entram na navegação após estudo integral das fontes relevantes e cumprimento dos critérios de maturidade. Isso não equivale ao curso completo das três áreas: aplicativos e automações têm expansão própria abaixo. Os tempos são estimativas editoriais, não promessa de conclusão.

| Aula | Telas | Prática e resultado | Verificação 1 | Verificação 2 | Dependência |
| --- | ---: | --- | --- | --- | --- |
| L01 — Da ideia ao pedido verificável | 7 | criar briefing, executar primeiro pedido, revisar e adaptar | distinguir pedido verificável de pedido vago | reconhecer diferença entre proposta, simulação e evidência real | acesso opcional para ensaio; obrigatório para evidência real |
| L02 — Construir a primeira versão | 7 | criar página com conteúdo e ação principal no projeto | escolher contexto mínimo útil | inspecionar página contra três critérios | L01, setup documentado |
| L03 — Corrigir com evidências | 7 | reproduzir e corrigir um problema pequeno | identificar relato de erro reproduzível | avaliar correção e possível regressão | L02, página executável |
| L04 — Testar como um visitante | 7 | verificar celular, teclado, conteúdo e ação principal | selecionar teste que verifica comportamento | interpretar falha e decidir novo teste | L03 |
| L05 — Publicar e compartilhar | 7 | revisar exposição, publicar e conferir URL pública | distinguir preview local de publicação | julgar evidências mínimas de entrega | L04, hospedagem escolhida e documentada |

O número de telas não é um molde obrigatório: sete é a estimativa inicial de unidades curtas (orientação, exemplo, prática, duas verificações e aplicação). Alterar se fontes, leitura do protótipo ou necessidade de recuperação mostrarem outra divisão. Uma tela tem um objetivo, uma ação central e um resultado observável. Não criar telas para preencher quota.

## Encadeamento das telas planejadas

- L01: delimitar resultado → montar contexto → verificação do pedido → executar fora do curso → verificação da evidência → corrigir pedido → transferir e registrar.
- L02: localizar projeto → ler exemplo mínimo → fornecer conteúdo → verificação de contexto → criar/abrir preview → verificação por critérios → guardar versão.
- L03: observar problema → reproduzir → verificação do diagnóstico → escrever correção → testar ajuste → verificação da regressão → registrar antes/depois.
- L04: planejar testes → testar celular → verificação de cobertura → testar teclado/ação → reproduzir falha → verificação de evidências → executar reteste.
- L05: revisar conteúdo público → distinguir ambientes → verificação de prontidão → publicar → abrir URL externa → verificação de entrega → transferir processo e guardar evidências.

## Avaliação

Cada aula tem pelo menos duas telas distintas marcadas `isAssessment: true`. Verificação de reconhecimento e verificação de aplicação medem coisas diferentes. Feedback explica por que a escolha atende ou não ao critério e aponta uma próxima ação. Permitir novas tentativas e dicas graduais sem punir exploração.

A conclusão de leitura não prova domínio. Separar progresso de telas, resultado das verificações e evidência de execução. Uma resposta preenchida ou um clique em “concluído” não prova publicação. Critérios de prática aberta são uma rubrica de autoavaliação no MVP, explicitamente rotulada; não atribuir correção sem avaliação implementada.

Rubrica comum de pedido: (1) resultado concreto; (2) contexto suficiente; (3) limites explícitos; (4) pelo menos um critério verificável. Rubrica de correção: (1) observado; (2) esperado; (3) como reproduzir; (4) reteste. Rubrica de entrega: (1) evidência acessível; (2) ação principal funciona; (3) limitação conhecida declarada; (4) teste na versão entregue.

## Próximas trilhas e núcleo compartilhado

As trilhas compartilham competências, mas não obrigam todo aluno a concluir sites antes de trabalhar com aplicativos ou automações. O núcleo mínimo é delimitar pedido/contexto (C01–C03), observar resultado (C04) e testar/corrigir (C05–C06). Essas competências podem ser demonstradas no próprio projeto escolhido. A publicação de um site não é pré-requisito para uma automação local.

| Rota planejada | Projeto contínuo proposto | Progressão e evidência | Dependências de pesquisa |
| --- | --- | --- | --- |
| Sites, L02–L05 após fundamentos | Página de serviço fictício com ação de contato | Primeiro preview e interação → defeito reproduzido/corrigido → teclado/tela pequena e reteste → URL pública testada e atualização | Um caso completo de construção; um caso de correção se o primeiro não cobrir; uma rota primária de hospedagem estática. Nenhum provedor escolhido ainda |
| Aplicativos, duas unidades propostas | Lista de tarefas local, sem conta e sem servidor na primeira versão | A01: entrada, criar/editar/concluir, estado e validação. A02: persistência, recarga, dados ausentes e recuperação. Distinguir armazenamento local de sincronização | Um caso completo de app pequeno e complemento primário de persistência somente se necessário. Compartilhar/publicar reutiliza a competência C07 quando fizer parte do objetivo |
| Automações, três unidades propostas | CSV fictício transformado em relatório salvo | AU01: entrada/ação/saída e comparação manual. AU02: fluxo repetível, arquivo inválido, falha, repetição sem duplicidade. AU03: gatilho, execução observada, registro, manutenção e interrupção | Um caso completo de transformação e documentação atual de gatilho/execução por ferramenta. Instalações/conectores só quando necessários ao caso |

Os códigos A01/A02/AU01–AU03 são planejamento editorial, não IDs de aulas liberadas. O número de telas será definido após estudo e teste do percurso, sem quota automática.

| Unidade planejada | Prática principal | Verificação distinta 1 | Verificação distinta 2 |
| --- | --- | --- | --- |
| A01 — interação e estado | criar uma tarefa, editar e concluir | prever resultado de uma entrada válida/vazia | testar mudança de estado e explicar um resultado inesperado |
| A02 — dados que persistem | recarregar, verificar dados e recuperar estado inicial | distinguir estado temporário, armazenamento local e conta remota | interpretar falha de leitura/ausência de dados e verificar recuperação |
| AU01 — mapear e executar | gerar um relatório de dados fictícios pequenos | especificar entrada, transformação e saída esperada | comparar resultado com contagem verificável manualmente |
| AU02 — repetir e tratar falhas | executar duas vezes e provocar entrada inválida | prever o efeito da repetição e evitar resultado duplicado | diagnosticar falha a partir do registro e executar recuperação |
| AU03 — acionar e manter | configurar um gatilho suportado e observar uma execução | verificar condições de execução e distinguir tarefa agendada de tarefa executada | corrigir/retomar ou interromper rotina com base em evidência de falha |

Essas verificações são objetivos de avaliação a desenvolver, não questões já escritas nem execução comprovada. Cada aula futura continua exigindo prática e pelo menos duas telas de verificação com feedback explicativo.

## Limites das extensões

- Aplicativos: duas aulas planejadas para C09 — entrada/estado/validação e persistência/recuperação. O site anterior pode servir de base, mas o aluno pode entrar após demonstrar o núcleo comum. Nenhuma tela ou título de catálogo anunciado como disponível neste lote.
- Automações: três aulas adicionais planejadas para C10 — mapear tarefa e entrada/saída; executar manualmente com dados de teste; programar e observar falhas/repetição. Agendamento é específico da ferramenta e pode exigir conectores/serviços. Sem prometer envio ou acesso a sistemas reais sem integração.
- Transferência entre Claude e Codex: preservar objetivo, dados e critérios; adaptar abertura do projeto, leitura de arquivos, execução e inspeção. Não ensinar que chat, Artifact e agente de código são a mesma coisa.

## Decisões pendentes

1. Aprofundar a própria L01: estudo integral das fontes de contexto, critérios, revisão e execução; exemplos completos e erros/limites; inspeção visual dos trechos de UI pertinentes. O lote inicial fornece sustentação pontual, não certifica a aula. As próximas aulas também dependem de fontes específicas sobre publicação, persistência, autenticação e acessibilidade.
2. Validar no aplicativo integrado a interação de prática aberta por autoavaliação, duas verificações determinísticas e restauração de progresso. Contrato canônico acordado em `contracts/course.ts`; o Construtor mantém o adaptador para o renderer.
3. Serviço de publicação da primeira trilha: escolher uma rota comprovada antes de redigir instruções exatas.
4. Validação humana de linguagem nos 11 idiomas e teste de renderização RTL.
5. Validação com ao menos um iniciante: tempo real, clareza das instruções e bloqueios de instalação.

Autenticação, contas multiusuário e pagamentos ficam fora dos projetos iniciais. Pesquisar esses tópicos somente quando uma extensão os exigir, sem bloquear o app local ou a automação com dados fictícios.
