# AGENTS.md — descobrir, combinar e conferir instruções

[Documentação oficial OpenAI](https://learn.chatgpt.com/docs/agent-configuration/agents-md), fonte `openai-learn-codex`, consultada em 28/09/2026 com a skill OpenAI Docs. O corpo não informa data de publicação ou atualização. A leitura abrange as 153 linhas de `studies/local/backfill-a06-agents-md.txt` e as duas árvores de arquivos renderizadas. Hashes, bytes e intervalos constam do manifesto.

`text_read_complete=true` e `full_source_analyzed=true` valem para esta página, incluindo exemplos, diagnóstico e figuras. Nenhum comando ilustrado foi executado; arquivos de configuração e instruções do usuário não foram alterados. O HTML preserva a aquisição, mas não conta como texto integralmente lido.

## Argumento e percurso completos

A página propõe guardar acordos recorrentes em arquivos que o Codex descobre no início da execução. Seu mecanismo combina orientação geral com regras do caminho do projeto, em uma ordem determinada. O problema tratado não é escrever um pedido isolado, mas fazer a orientação certa acompanhar o contexto certo.

| Etapa da fonte | Evidência e função |
| --- | --- |
| Descoberta, linhas 16–24 | A cadeia é montada uma vez por execução, normalmente no início da sessão TUI. Primeiro há o escopo global; depois, da raiz do projeto ao diretório atual. Cada diretório contribui com no máximo um arquivo não vazio, respeitando prioridade de nomes e limite de tamanho. |
| Orientação global, 26–50 | O exemplo reúne preferência de gerenciador de pacotes, teste após mudança JavaScript e confirmação para nova dependência de produção. Mostra uma verificação por CLI e o uso de um arquivo de substituição temporário. |
| Camadas do projeto, 52–93 | A raiz acrescenta convenções de lint e documentação. Um serviço de pagamentos troca o comando de testes e acrescenta uma regra específica. O resultado esperado lista as origens em ordem, terminando no serviço. |
| Revisão, 94–105 | Para revisão de código no GitHub, a fonte recomenda regras próximas do código a que se aplicam, com comportamento problemático e alternativa aceitável. O exemplo trata de seleção de coortes; formatação e lint ficam para CI. |
| Nomes alternativos, 107–136 | Uma lista configurada permite arquivos com outros nomes. A demonstração também aumenta o limite de bytes e mostra um perfil com outro diretório de configuração. É preciso iniciar nova execução para carregar alterações. |
| Verificação e recuperação, 138–148 | Comparar fontes ativas na raiz e em subdiretório; conferir logs quando habilitados; reiniciar quando a orientação parecer antiga. O diagnóstico cobre diretório errado, arquivos vazios, substituições, nomes alternativos, tamanho e perfil. |
| Continuidade, 149–153 | Links para o projeto AGENTS.md, prompting e próxima página. Esses destinos não foram consumidos como parte deste estudo. |

No escopo global, `AGENTS.override.md` precede `AGENTS.md`. No caminho do projeto, a ordem acrescenta os nomes alternativos configurados depois desses dois. A página diz que instruções de diretórios mais próximos do trabalho entram depois e substituem orientações anteriores conflitantes. Isso não significa juntar todos os arquivos possíveis de um diretório nem buscar recursivamente em toda pasta do repositório. Sem raiz de projeto identificada, a busca descrita fica no diretório atual. O limite combinado documentado é de 32 KiB por padrão; valores e comportamento são os da página observada, não uma medição da instalação do aluno.

## Exemplos, figuras e limites de superfície

A primeira árvore mostra `AGENTS.md` na raiz e, no serviço de pagamentos, um arquivo regular desconsiderado porque existe `AGENTS.override.md`. A segunda mostra `TEAM_GUIDE.md` reconhecido por fallback e uma substituição em `support/`; o outro nome alternativo na raiz não vira automaticamente uma segunda camada. As capturas `backfill-a06-agents-tree-1.png` e `backfill-a06-agents-tree-2-expanded.png` foram conferidas com os ramos materiais abertos. São diagramas da documentação, não arquivos deste repositório. Não há vídeo incorporado no corpo observado.

Os procedimentos concretos usam CLI/TUI e arquivos locais; a seção de revisão nomeia GitHub. Não há um roteiro de cliques no Desktop nem demonstração equivalente em cloud. A ficha Projects do mesmo lote ajuda a entender qual pasta orienta descoberta no app, mas não autoriza transplantar comandos ou afirmar paridade entre superfícies. Os exemplos incluem opções de aprovação na CLI; sua presença na documentação não é uma solicitação para alterar permissões do usuário.

A fonte fornece saídas **esperadas** para os pedidos de listar instruções. Não apresenta transcript de uma execução, falha reproduzida, patch e reteste. Seus itens de diagnóstico são caminhos propostos pelo autor. Não há prova, nesta página, de que um projeto concreto tenha passado nos testes citados.

## Análise original: conferir descoberta e comportamento separadamente

Uma regra pode estar escrita corretamente no arquivo errado. Também pode ser descoberta e, mesmo assim, não aparecer de forma correta na entrega. Por isso, proponho dois registros distintos: quais fontes foram carregadas e o que a resposta fez com elas. Pedir apenas “você entendeu as regras?” mistura essas verificações e produz evidência fraca.

Uma boa instrução persistente deve ser estável o suficiente para valer na próxima tarefa e específica o suficiente para ser verificável. “Caprichar no site” não permite um check claro. “Ao propor mudança no formulário, declarar o comportamento para campo vazio” produz um item que se pode localizar no plano. Essa formulação é proposta deste estudo, não exemplo oficial nem garantia de cumprimento.

O limite em bytes traz uma consequência pedagógica: colocar toda conversa anterior no arquivo de instruções pode aumentar ruído e esconder o acordo importante. É melhor explicar o propósito de uma regra, seu escopo e como verificar o resultado. Separar convenções de equipe de requisitos de uma única tarefa também facilita manutenção. A página oferece a mecânica de camadas; essas escolhas editoriais são inferências para o curso.

O exemplo sobre coortes mostra uma regra de revisão com significado de domínio, não somente estilo de código. Para um site pequeno, a tradução pedagógica pode ser “não apresentar envio bem-sucedido antes de receber confirmação do serviço”. Essa regra precisaria de implementação e teste em aula posterior; escrevê-la em AGENTS.md não implementa o comportamento.

## Pré-requisitos, pertinência, atualidade e lacunas

Pré-requisitos: distinguir arquivo de pasta, reconhecer raiz e subdiretório e compreender que uma tarefa pode iniciar em locais diferentes. Os comandos documentados exigem familiaridade com terminal e instalação funcional da CLI; não são requisitos universais para começar um plano no Desktop. Alterar fallback, limite e perfil é conteúdo posterior para quem realmente precisa dessa configuração.

A contribuição ao corpus é tornar orientação recorrente auditável, complementando prompting e Projects. Não duplica quickstart, revisão visual ou publicação. Para pessoa comum, a primeira competência é reconhecer de onde veio uma regra e escrever um check; administrar vários perfis tem pertinência menor no início, mas permanece no corpus. A documentação é mutável e foi observada em 28/09/2026, sem data editorial identificada.

Lacunas: não há demonstração completa pedido → código → teste falho → correção → reteste, nem instalação guiada no Desktop. Também não se estuda aqui a documentação completa de configuração, logs, GitHub review ou as referências externas. O plano revisado permanece a entrega de L01; esta ficha não muda o currículo.

## Prática original: orientar um plano de formulário

Proposta não executada. O instrutor fornece um projeto de ensaio já preparado, com uma regra na raiz para identificar campos obrigatórios e uma regra específica no diretório do formulário para incluir três casos de entrada no plano. A atividade pede apenas um plano revisado para um formulário de orçamento fictício. Não exige editar configurações globais nem usar credenciais.

**Check 1 — origem e escopo:** pedir a lista das instruções carregadas e a localização do trabalho. Comparar com a árvore entregue pelo instrutor. Na variante com arquivo de substituição, verificar que o arquivo regular do mesmo diretório não foi apresentado como camada adicional. Se houver divergência, corrigir o diretório ou a montagem da fixture e iniciar uma nova execução de ensaio.

**Check 2 — efeito verificável:** conferir se o plano identifica os campos obrigatórios e descreve três casos distintos, incluindo campo vazio. O plano deve declarar o resultado esperado em cada caso e separar trabalho previsto de execução realizada. Se a regra foi carregada mas o plano a omitiu, mostrar a omissão e solicitar revisão; repetir ambos os checks.

Registrar o pedido inicial, as fontes declaradas, a diferença encontrada e o plano revisado. A aprovação destes checks comprova somente o exercício de contexto e planejamento; não comprova que um formulário funciona ou que testes de código passaram.

## Escopo não revisado e direitos

Não foram executados comandos, alterados AGENTS.md/config.toml/CODEX_HOME, habilitados logs ou enviadas notificações. Não foram testados Desktop, CLI, cloud ou GitHub review. Originais e capturas permanecem locais e ignorados pelo Git, sem presumir licença para republicar o corpo da documentação.
