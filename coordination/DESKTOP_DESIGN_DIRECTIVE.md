# Nova referência visual: Ganesha Desktop

Pedido explícito do usuário em 2026-09-28: inspecionar o Ganesha Desktop aberto no Mac, reproduzir no web o mesmo design mais clean e, depois da entrega do Artista, pedir ao Construtor que refaça a interface.

## Sequência acordada

1. **Artista:** localizar a janela real do Ganesha Desktop usando Computer Use; registrar capturas e observações verificadas de hierarquia, densidade, tipografia, cores, espaçamento, navegação e controles. Não inferir o desktop a partir do web anterior.
2. **Artista:** entregar especificação e referência web concreta em `design/`, começando pela tela principal e uma etapa de aula. Mapear componentes atuais, tokens e comportamento responsivo/RTL. O desktop passa a ser a referência visual principal; registrar divergências com o design system existente.
3. **Construtor:** refazer a interface após receber a entrega de design, preservando o conteúdo, os 11 idiomas, as avaliações, o acesso fechado e a persistência de progresso.
4. **Diretor:** integrar os commits e revisar fidelidade à referência, clareza, mobile/RTL e regressões do percurso.

A inspeção do app e a implementação da revisão estão autorizadas. A leitura do aplicativo não autoriza alterar dados pessoais nem executar ações externas. Se a janela não puder ser acessada, o Artista deve informar o bloqueio concreto.

## Base preservada

Aplicativo de origem `f5319e9` + `96a9edb`, integrado como `31b2dd4` + `d63c674`. No checkout do Diretor passaram 14 testes, checagem de tipos, auditoria dos 11 catálogos e build Next. A primeira tentativa de build com dependências via symlink externo falhou por limite do Turbopack; com cópia local das dependências, o build passou. Não foi defeito atribuído ao aplicativo.

O percurso final de QA foi interrompido antes das práticas para atender à nova direção visual. Evidências anteriores permanecem registradas como baseline; não aprovam o novo design. A prévia do usuário continua em `127.0.0.1:3100`; revisão técnica usa origem/porta separadas.

## Critérios da revisão

- Design comparável ao desktop realmente observado, com menos ruído e repetição na interface.
- Título, instrução e ação principal claros; detalhes auxiliares acessíveis quando necessários.
- Uma tela por etapa; prática e duas verificações distintas preservadas por aula.
- Os 11 idiomas e RTL continuam funcionando; nenhum texto educacional é incorporado a imagens.
- A mudança de apresentação não apaga respostas, tentativas nem progresso existente da mesma versão de curso.

Propriedade permanece: Artista em `design/`, Construtor no aplicativo, Diretor em `coordination/` e contratos.

## Referência real confirmada

Artista identificou via Computer Use a janela `Ganesha`, aplicativo `Ganesha`, 1228×768. O Diretor inspecionou a captura em `/Users/lucasmarques/.codex/worktrees/e20b/Ganesha/design/reference/ganesha-native-journey.jpg`.

Elementos observados e aceitos como direção: fundo lavanda muito claro, lateral branca de cerca de 250px, marca com elefante, painel principal branco, trilha horizontal de cartões estreitos/altos, cartão selecionado ligado visualmente ao painel lavanda inferior, ilustração à direita e uma ação principal no canto inferior direito. A referência apresenta muito menos avisos e superfícies concorrentes que o primeiro web.

Adaptação acordada: controles discretos de idioma/ferramenta e um aviso de demonstração; retirar hero e anel de progresso redundantes da composição anterior. A quantidade de aulas e o nome do perfil da captura não são dados de produto a copiar. O web mantém o currículo canônico disponível e os IDs existentes. Artista ainda inspeciona a etapa nativa antes de fechar formulários e avaliações; Construtor aguarda essa entrega concreta.

## Entrega do link ao usuário

O usuário pediu receber o link nesta tarefa assim que a nova versão estiver disponível para teste. Artista e Construtor foram avisados; Construtor enviará URL exata, commit e status da prévia ao Diretor e manterá o servidor ativo. O Diretor verificará que o link abre a interface refeita e o enviará aqui, sem aguardar uma liberação de produção.

Um acompanhamento desta tarefa foi configurado a cada dez minutos, silencioso enquanto não houver resultado acionável, para garantir o envio mesmo após encerrar este turno. Depois que o link novo for enviado, o acompanhamento será desativado sem arquivar a tarefa nem repetir o aviso. Não confundir a prévia antiga com a nova interface.
