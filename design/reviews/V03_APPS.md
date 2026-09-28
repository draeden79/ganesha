# Revisão editorial de Apps 0.3.0

Leitura integral das três aulas e 30 etapas de `authoring/apps.pt-BR.json`: `app-state`, `app-storage` e `app-delivery`. Revisão realizada em 28/09/2026, aproximadamente 21:18 UTC, sobre o pacote editorial iniciado em `b8e4a62`. Escopo: sequência para iniciante, instruções suficientes, preservação de dados e coerência entre resultado esperado e registro de impedimentos. Não constitui execução externa dos exercícios.

## Resultado

A sequência constrói um app pequeno antes de adicionar persistência e transferência manual. Os casos A/B/C permitem comparar quantidades e conclusão sem depender da declaração da IA. Os ensaios de leitura/escrita ficam numa chave de teste, a troca de origem é explicada, e exportação não é apresentada como sincronização.

Os pedidos definem plano antes de edição, controles por teclado, validação sem destruir a lista, restauração dos campos completos e importação somente após prévia/confirmação. O fluxo de entrega separa programa de dados e mantém publicação opcional. A rubrica compilada de práticas externas permite registrar impedimentos sem afirmar sucesso não observado.

## P1 encaminhado

`app-delivery.restore-backup` manda ensaiar uma falha na gravação da importação usando a cópia isolada da aula anterior. Essa cópia foi criada antes de existir importação; sem uma atualização explícita, o iniciante retorna a um app sem o controle necessário. Solicitado atualizar primeiro a cópia isolada com a versão atual que possui exportar/importar, mantendo `ganesha.tasks.test` e sem tocar `ganesha.tasks.v1`, depois injetar a falha.

## Reteste e estado

Correção conferida nas fontes pt-BR/en: corpo e pedido agora instruem atualizar a cópia isolada com o app atual que já importa arquivos; mantêm exclusivamente `ganesha.tasks.test` e proíbem ler, gravar ou apagar `ganesha.tasks.v1` durante o ensaio. P1 encerrado editorialmente.

Apps aprovado editorialmente, sem P0/P1 aberto nesta revisão. Com esta leitura, o Artista cobriu todas as 120 etapas pt-BR. A checagem estrutural pt-BR/en está em `../qa/v03-authoring-structure.json`; o hash nela antecede este último ajuste textual. O QA da prévia integrada começou no snapshot `b8e4a62`; a mudança ainda precisa entrar no próximo pacote de conteúdo.
