# Estudo — entrada pelo app e primeira revisão em Codex

Recurso `res-codex-desktop-start`, fonte `openai-learn-codex`, inglês. [Página oficial](https://learn.chatgpt.com/docs/app), observada em 28/09/2026. Título atual: **ChatGPT desktop app**. Não datar a publicação pela coleta nem assumir que a antiga marca do app ainda descreve os seletores atuais.

Artefato `studies/local/official-codex-app.txt`, SHA-256 `703c1cb41e6938d304ff81c0ca2a6e8990ba31d49bfd9864343f79a2e86846b8`: 1–143 integralmente lidas. O `lookup_page` oficial devolveu apenas um componente de página, insuficiente para estudar o corpo; por isso foi capturado `main.innerText`, acompanhado de DOM e imagem. `official-codex-app.dom.txt` registra a ilustração que o texto simples omite. Texto e ilustração principal analisados; cinco clipes de casos de uso não assistidos. `full_source_analyzed=false` para a landing page multimídia inteira; quickstart textual integralmente coberto.

Complementos oficiais lidos integralmente para preencher revisão/erros, que a página de entrada não desenvolve: [Code review](https://learn.chatgpt.com/docs/code-review), `official-codex-review.md`, SHA-256 `e2175b02db0e2599d09f07fb9060fcfe55d5e304d8d25476fe160504e360e38c`, 1–247; [Troubleshooting](https://learn.chatgpt.com/docs/reference/troubleshooting), `official-codex-troubleshooting.md`, SHA-256 `b3437047face39fb2edeed82ffc7966479453f3c7c08fd9532bff819aa5e1b06`, 1–145. Capturas e originais locais ignorados pelo Git; sem licença de republicação presumida.

## Sequência integral da página de entrada

Apresentação de workspace (1–22); quatro passos de início — instalar, autenticar, escolher local/contexto, selecionar produto/enviar pedido (24–50); links de continuidade (54–59); cinco casos de uso com players (60–118); situações de uso (119–127); comparação de superfícies (128–143).

Acesso descrito: download macOS/Windows/Linux, conta ChatGPT, conversa/projeto/pasta. O passo de escolha diferencia Chat/Work e Codex. “In Codex, start with New chat” (50) situa a entrada. A página não detalha preços, versões mínimas de SO ou acesso de uma conta específica; não inferir tais requisitos. Exemplos de brief, dados, PRD, limpeza e feedback são chamadas para demonstrações, não resultados verificados nesta ficha.

## Revisão e erros: evidência complementar

A referência de revisão abre com escopo e resultado; passa por seleção de diff, achados, navegação/comentários, PR e stage/revert. Para o app, revisão exige repositório Git (review 21–33); o painel inclui alterações humanas e de outros trabalhos (66–85). `/review` relata achados; aplicar correções é ação posterior. Comentário de linha requer mensagem seguinte explicitando o pedido (184–202).

Troubleshooting cobre confusão de diff, projetos/chats, worktrees, ambiente, permissões do sistema, alvo errado, diferença de versões, logs, sessão e terminal parados. Para L01, os ramos úteis são: confirmar pasta/branch, observar aprovação pendente, recuperar pedido após alvo errado e distinguir dependência ausente no worktree de falha de geração. Não executar toda a lista de recuperação como receita universal.

## O que a imagem sustenta

Foram vistos `official-codex-app.png` e `official-codex-app-ui.png`: a segunda mostra ilustração de sidebar Codex, conversa central, alterações de `hero.tsx` e painel Code changes com linhas removidas/adicionadas. É material explicativo da documentação, não captura de um teste conduzido pelo pesquisador. O DOM complementa controles parcialmente fora da viewport, mas não prova sua operação. Os totais ilustrativos de linhas não devem virar evidência de mudança real.

## Prática original para fechar pedido → resposta → revisão

Competência: entrar no produto adequado, estabelecer o local de trabalho e confrontar resposta com artefato. Pertinência P0 para L01; recurso `res-codex-desktop-start`. Pré-requisito didático: pasta de treino e página simples conhecida; se a aula usar painel Git, o repositório deve ser preparado e explicado pelo curso.

Etapa 1: o aluno instala/abre o app e autentica sua conta. Confirma o produto Codex, seleciona a pasta de treino e anota onde o trabalho ocorrerá. Não usar quick chat como substituto implícito de uma tarefa de projeto.

Etapa 2: envia pedido original: “Encontre o título da página desta pasta. Mostre onde ele está e altere somente esse texto para ‘Oficina de ideias’. Preserve links e botões. Ao terminar, diga qual arquivo mudou e como abrir a página para conferir.”

Etapa 3: lê a resposta e verifica o arquivo citado. Abre a página renderizada; compara o título e testa um link/botão que deveria continuar funcionando. A resposta é um relato a confrontar, não a evidência final.

Etapa 4: abre o diff no escopo apropriado, identifica o que foi adicionado/removido e pede uma única correção. Se usar comentário de linha, envia uma mensagem pedindo que o agente o resolva. Repete inspeção do diff e da página. Em Git, distingue o último turno das demais alterações existentes.

Verificação 1: resultado visual e interação preservada no preview correto. Verificação 2: diff corresponde ao arquivo/texto autorizado; nenhuma alteração fora do escopo é aceita sem explicação. Transferência: executar a mesma intenção em outra pasta ou ferramenta e identificar novamente controles/contexto em vez de copiar coordenadas da primeira UI.

## Pertinência, duplicação e lacunas

A landing page é boa porta de entrada, mas fraca como aula completa de revisão. O complemento resolve essa lacuna documental; a prática original resolve a ausência de exemplo executado. Prompting já cobre como formular/verificar, portanto a aula deve reutilizar o mesmo exercício em vez de criar uma segunda introdução. Cloud, automação, plugins e os cinco casos de uso são extensões posteriores.

Não testados: instalação, conta, permissões, execução, edição, erro ou revisão no app real. Não assistidos os cinco clipes; não inspeccionada a ilustração interna do complemento Code review. Não garantir publicação de site a partir de um preview local, nem custo/acesso não estabelecido pelas páginas.
