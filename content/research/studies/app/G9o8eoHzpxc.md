# Tastemaker — suficiência para ensinar um app simples

**Parecer: útil como apoio de design e planejamento; insuficiente como tutorial principal de app funcional para pessoas comuns.** A fonte mostra decisões visuais, especificação e uma breve apresentação do resultado. Não oferece um percurso reproduzível de entrada → validação → gravação → recuperação dos dados. Banco, autenticação e publicação aparecem como trabalho realizado fora da sequência detalhada. “Full Tutorial” descreve a apresentação do processo do autor, não uma demonstração integral de implementação e testes.

Fonte: [Full Tutorial: From Idea to App with Claude Design and Claude Code in 25 Minutes](https://www.youtube.com/watch?v=G9o8eoHzpxc), Peter Yang, publicada em 2026-07-29, segundo `acquisition/manifest.jsonl`. Estudo em 2026-09-28. Ficha editorial original, sem republicação da transcrição.

## Cobertura efetiva

Lidas sequencialmente **todas as 754 linhas/entradas** de `transcripts/local/aq.G9o8eoHzpxc.en.ab703bbf7113.txt`, em dois blocos: 1–380 e 381–754. Artefato: 49.333 bytes, SHA-256 `ab703bbf7113d5fe9b6c3f1beaf3733623475cad57b3f4cb9d8613a9f8d8a6e2`. Texto derivado de legenda automática inglesa, com intervalos sobrepostos; não é transcrição humana revisada.

JSON3 de origem: `transcripts/local/aq.G9o8eoHzpxc.en.e782deb704d9.json3`, 412.639 bytes, SHA-256 `e782deb704d9f32f93a60d9bc2e129500e6e12bb984f413c3e17448f4597883d`. Seus limites e contagem de 754 eventos com texto não vazio foram conferidos por script; o JSON3 não foi lido integralmente como segunda faixa independente. Primeiro início: 00:00,960; último fim: 25:28,240. A aquisição registra 25:27; o player observado exibe 25:26. A discrepância não foi resolvida e não comprova fala além do vídeo. Há termos corrompidos como nomes de produtos e “skill”; não copiar comandos/nomes operacionais da legenda.

Estado: `transcript_analyzed_visual_pending`. Leitura textual integral: **sim**. Vídeo integral acompanhado: **não**. Fala integral/precisão de legenda verificadas: **não**. `full_source_analyzed=false`. Os quadros descritos adiante não certificam intervalos entre eles. Não foi aberto, testado ou modificado o aplicativo do autor.

## Sequência integral analisada

| Intervalo aproximado | Argumento, ação ou desvio |
| --- | --- |
| 00:00–00:53 | Apresenta Tastemaker como página para reunir filmes, séries e jogos; antecipa landing page/perfil e seis passos até construir o app. |
| 00:54–02:27 | Parte da própria insatisfação com a lista do IMDb. Pede descrição breve do problema, público e evidências online usando uma skill de especificação. O resultado aponta fragmentação entre serviços. Diferencia projeto pessoal de negócio, que exigiria pesquisa adicional; não valida mercado nem usuários. |
| 02:28–03:18 | Procura direção visual para evitar aparência genérica. Cita catálogos de inspiração e escolhe Monogram pela interface discreta e uso de cor concentrado no conteúdo. São preferências do autor. |
| 03:19–04:20 | Fornece screenshots de referência e pede `design.md` com princípios, cores, tipografia e espaçamento para Tastemaker. O documento passa a orientar a geração. |
| 04:21–05:07 | Mostra outro catálogo de arquivos de design para marcas conhecidas; distingue inspiração de cópia segundo seu julgamento. Não ensina análise de licença dos exemplos. |
| 05:08–06:06 | Cita ferramentas alternativas e escolhe Claude Design por já possuir assinatura. Anexa o arquivo de orientação; explica localizar/exportar um arquivo no ambiente de trabalho. Nenhuma comparação atual de planos foi verificada neste estudo. |
| 06:07–07:02 | Pede duas telas centrais: perfil público e landing page sem login, com variações em uma página comparável. Especifica web primeiro. Comenta preferência/custo de modelo, sem benchmark. |
| 07:03–08:10 | Responde perguntas sobre perfil de exemplo, variação de layout, favoritos/resenhas/listas, duas telas, temas claro/escuro e texto realista. A espera pela geração é cortada. |
| 08:11–10:12 | Compara variantes em linhas e grade. Edita texto e remove elementos diretamente; elimina Follow porque a função ainda não foi construída. Prefere resenhas largas, listas abertas e demonstração abaixo do hero. Reconhece desalinhamento em uma variante. Salva as alterações de design. |
| 10:13–11:31 | Envia feedback no chat: favoritos em seis colunas com setas, resenhas com capa/nota/texto e navegação lateral. Ao voltar, admite que ocorreram mais iterações fora do trecho mostrado. Apresenta perfil revisado, inclusive spoiler tags. |
| 11:32–12:32 | Refina landing page, hierarquia, chamada à ação e texto. Salva. Defende atenção aos detalhes e iteração; a geração inicial não é perfeita. |
| 12:33–13:18 | Exporta as telas como ZIP/HTML para levar a um agente de código. O ato de exportar desenho não implementa comportamento, banco ou autenticação. |
| 13:19–14:26 | Justifica explorar telas antes de redigir especificação completa. Prefere produto/design/técnica em um HTML com abas. Envia desenhos ao agente e pede a especificação. |
| 14:27–15:33 | Percorre PRD com problema, metas e requisitos por superfície; design com estilo e biblioteca de componentes. Explica que componentes reutilizáveis evitam divergência visual e devem permanecer atualizados. |
| 15:34–16:10 | Mostra stack e esquema de dados; fala do custo de mudanças após produção. Contrasta estimativa gerada de três semanas com sua expectativa de cerca de trinta minutos. A tela mostrada já traz marcadores de implementação; não é prova da ordem cronológica em que o código foi escrito. |
| 16:11–16:50 | Promove sua skill paga e benefícios da comunidade/newsletter. Também sugere pedir ao agente uma alternativa própria. O conteúdo integral da skill e sua instalação não são ensinados. |
| 16:51–17:44 | Usa `spec.html` como referência para gerar todas as telas. Reforça ler/corrigir requisitos antes de consumir recursos gerando desenhos. Nova espera é cortada. |
| 17:45–18:38 | Apresenta mockups de landing, perfil, versão do dono com edição, estado vazio, lista completa e detalhes do item. “Salvar” e “avaliar” são ações desenhadas, sem operação de banco demonstrada nesse ponto. |
| 18:39–19:27 | Mostra onboarding para escolher identificador, selecionar seis itens e compartilhar página. Recomenda revisar com comentários/chat/edição, mas assume temporariamente que está bom e exporta o ZIP. Não testa identificador indisponível, envio vazio ou falha. |
| 19:28–20:41 | Recapitula dois artefatos que deveriam estar sincronizados e diz explicitamente que a construção ainda não começou. Recomenda reservar ao menos metade do tempo ao planejamento. Isso é regra pessoal, não proporção validada para qualquer projeto. |
| 20:42–21:07 | Pede ao agente revisar spec/desenho e formular perguntas antes de programar, para resolver ambiguidades. Não mostra todas as perguntas e decisões implementadas. |
| 21:08–22:17 | Percorre conversa de construção, execução local e várias rodadas de correção: ícones apenas no hover, seção de resenhas ausente, setas esquecidas e diferença entre implementação e desenho. Orienta sincronizar código, spec e design. A conversa é exibida resumidamente, sem reproduzir toda implementação/testes. |
| 22:18–23:06 | Apresenta landing e perfil que diz estarem publicados; afirma poder entrar, adicionar filmes e ordenar. Admite algumas horas de trabalho, possíveis bugs, configuração de Supabase e adição de autenticação. O vídeo não detalha implantação, migrações, políticas de dados ou teste de persistência. |
| 23:07–24:46 | Recapitula os seis passos, pesquisa adicional para negócio, variações visuais e iteração após código. Não há novo exemplo operacional. |
| 24:47–25:28,24 da legenda | Reforça planejamento, pede like/inscrição e comentários sobre vídeos de processo; agradece e encerra. A cauda textual excede as durações disponíveis e permanece sem verificação de fala. |

## O que o exemplo demonstra e o que apenas promete

O objeto pretendido vai além de uma landing page: perfil com identidade, catálogo de mídia, favoritos, avaliações, resenhas, itens salvos e listas. Entretanto, a parte extensamente ensinada é **desenhar e especificar** essas superfícies. Um mockup pode apresentar todos os controles sem que nenhum persista dados.

| Dimensão de app | Evidência disponível | Suficiência para ensino operacional |
| --- | --- | --- |
| Dados e relações | Em 15:43, esquema visível com `auth.users`, `profiles`, `items`, `user_items`; campos e acesso aparecem na especificação. | Ensina necessidade de planejar dados, mas não criação/migração/consulta do banco. |
| Entrada | Desenhos de nome, identificador, busca e seleção de favoritos; botões Add/Edit no perfil final. | Não foi observado um envio completo com valor novo e confirmação na interface final. |
| Estado vazio | Em 18:13, mockup explicitamente rotulado como página nova/vazia com convites a adicionar itens. | Estado desenhado; não teste de uma conta realmente sem dados. |
| Validação | Em 18:48, mockup mostra identificador disponível. | Indicador visual não demonstra checagem real de unicidade nem rejeição de entrada inválida. |
| Mudança de estado | Perfil final contém favoritos, resenhas e área de salvos; a apresentação passa entre seções. | Navegação/rolagem observada; ciclo adicionar→salvar→rever não comprovado. |
| Persistência | Especificação em 15:43 afirma interações persistentes implementadas; narração em 22:52 cita Supabase. | Não mostra gravar um valor novo, recarregar/sair/retornar e recuperar esse valor. Nem esquema nem declaração substituem o teste. |
| Autenticação e acesso | Spec cita autenticação e regras de acesso; em 21:33, feedback pede impedir salvar sem login. | Não ensina configuração nem mostra reteste desse controle ou conta A sem editar dados da conta B. |
| Erro e recuperação | Defeitos visuais/funcionais incompletos são reportados ao agente durante construção. | Não há falha operacional reproduzida e resolvida com reteste claro: rede, gravação, sessão expirada ou entrada inválida. |
| Publicação | O autor diz que o resultado está live. | A implantação e visita externa não estão verificadas nesta ficha; link prometido não é prova de um percurso de deploy. |

**Achado visual material:** em 15:43, a especificação já diz que esquema, autenticação, onboarding e interações persistentes estão implementados, e informa catálogo pré-carregado como alternativa de desenvolvimento sem credenciais. Isso limita a leitura cronológica: o documento mostrado parece conter estado posterior ao planejamento narrado. É **inferência editorial**, não acusação de falsidade. Também impede usar a aparência preenchida do perfil para deduzir acesso real a APIs/banco.

## Pré-requisitos e uso no corpus

Para repetir o percurso, seriam necessários ambiente Claude Code funcional, acesso ao Claude Design, manipulação de arquivos ZIP/HTML/Markdown, entendimento de contas, um banco e autenticação, além de hospedagem. A skill paga é um facilitador particular do autor, não requisito universal; a alternativa sugerida não é construída/testada no vídeo. Os produtos, modelos e rótulos refletem julho de 2026 e não foram conferidos como interfaces atuais. A possibilidade de transportar HTML para outro agente não prova paridade de recursos entre CLI, Desktop e outras ferramentas.

**Seleção:** manter como apoio opcional de planejamento de estados e consistência visual, após uma primeira experiência funcional. Acrescenta estados de perfil e esquema à discussão de design; sobrepõe-se a outras fontes em prompts, variações e iteração. Para o corpus obrigatório de app, ainda falta uma fonte/execução menor que conclua o ciclo funcional. Não ampliar o catálogo por este parecer; a lacuna é concreta, não uma recomendação de assistir indefinidamente.

## Prática original reduzida e verificações

**Competência proposta:** construir uma lista pessoal em que uma entrada válida altera o estado e permanece disponível no retorno. Proposta editorial ao Educador/Diretor, ainda não aprovada nem executada.

Em vez de reproduzir toda a rede social de mídia, usar “Minha lista de leituras”: título, estado “quero ler/lido” e nota opcional. Definir três estados antes de gerar: lista vazia, item válido salvo e erro de título vazio. Pedir uma tela pequena, com adicionar/editar/remover e mensagem clara após ação. Explicitar se os dados devem ficar apenas naquele navegador ou numa conta compartilhável; a primeira prática pode usar armazenamento local com esse limite visível. Não chamar isso de sincronização entre dispositivos.

1. **Entrada/validação:** enviar um título vazio e confirmar que nenhum item foi criado; depois enviar um título válido e conferir texto, estado e contagem. O critério é comportamento observável, não existência de campos.
2. **Persistência:** salvar um título inédito, recarregar e fechar/reabrir a página; confirmar que texto e estado permanecem. Alterar o estado e repetir. Registrar o limite de ambiente definido na prática.
3. **Regressão/recuperação:** editar e remover um item, conferir a lista e retornar ao estado vazio. Introduzir uma falha controlada compatível com o armazenamento escolhido e confirmar que o app não informa sucesso falso nem perde silenciosamente a entrada.

**Transferência:** lista de leituras → lista de compras/tarefas, mantendo contrato de entrada, estado, armazenamento e erro. Se posteriormente houver conta/banco, acrescentar testes de sessão, separação de usuários e falha de gravação; não inferi-los da prática local.

## Conferência visual e pendências

Capturas internas em `studies/local/app-*`; hashes e pontos exatos no manifesto. Foram inspecionados quadros do esquema, estado vazio, onboarding e apresentação final. O estado observado é descrito como tal; não se declara toda a demonstração acompanhada.

| Player | Quadro efetivamente inspecionado | Limite da evidência |
| --- | --- | --- |
| 15:43 | Spec técnica, entidades/permissões, marcador de implementação e catálogo pré-carregado como alternativa sem credenciais. | Documento descritivo; nenhum teste de banco. |
| 18:13 | Canvas de Claude Design rotulado como página nova/vazia, espaços de favoritos e convite a adicionar. | Mockup; nenhuma conta vazia real. |
| 18:48 | Canvas de onboarding com nome, identificador marcado disponível, seleção parcial e sugestões de busca. | Não comprova consulta de unicidade nem busca em serviço real. |
| 21:18 | Resposta do agente com dois endereços `localhost:3000` e sugestões de testar tema, visão de dono/visitante, edição, salvar e filtros. | Checklist sugerido pelo agente; não resultado desses testes. |
| 21:33 | Feedback do autor pede resenhas ausentes, consistência de texto, ajustes de hover, remoção de elementos e bloqueio de salvar sem login. | Problemas identificados; o quadro não demonstra correção ou reteste. |
| 22:33 | Perfil final com identidade, Add/Share/Edit, filtros de mídia, favoritos e resenha. | Estado preenchido; nenhum novo envio observado. O arquivo tem sufixo `result-initial`, não o horário. |
| 22:38 | Rolagem mostra resenhas, lápis de edição e região Saved vazia. | Nenhuma abertura/envio de formulário nesse quadro. |
| 22:43 | Perfil e navegação lateral em resenhas, com favoritos e botão Add. | Afirmação narrada de poder ordenar não comprova alteração de ordem na imagem. |

Pendências de estudo: cobertura audiovisual integral, fala no começo/fim, termos incertos e transições entre os quadros selecionados. Lacunas do próprio tutorial: passos de configuração de banco/autenticação/publicação, escrita/recuperação dos dados, validação negativa e reteste após erros. Essas lacunas não devem ser “preenchidas” por inferência sobre o que o app provavelmente faz.
