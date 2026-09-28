# QA de interface — curso 0.3.0

Data: 28/09/2026. Responsável: Artista. O trabalho preservou a beta 0.2 e usou `localhost` para manter os registros de QA separados dos testes da equipe em `127.0.0.1`.

## Versões verificadas

- Percurso completo: app `71d9c1d`, conteúdo `b8e4a62`, prévia isolada `http://localhost:3104/classroom/pt-BR`.
- Retestes e mobile: app `446d5cf`, conteúdo atualizado para `63ade13`, prévia isolada `http://localhost:3105/classroom/pt-BR` e `/en`.
- Indonésio: mesmo app e conteúdo base, catálogo integral `0f73151`, em `http://localhost:3105/classroom/id`.
- Os registros de prática inseridos declaram explicitamente QA da interface, sem execução externa dos projetos ou das ferramentas de IA.

## Resultado funcional

As 120 etapas foram percorridas por controles visíveis no navegador: 24 checks com uma resposta errada bloqueante e uma correta que libera o avanço; 94 registros de prática/reflexão; duas etapas de explicação. Campos vazios ou critérios incompletos bloquearam o registro. Evidência: `qa/v03-flow-ui.json`.

O percurso testado foi Fundamentos → Automações → Sites → Apps. A navegação avançou entre as três aulas de cada rota e abriu “Escolher percurso” ao final. Aos 30, 60 e 90 registros, as rotas restantes continuaram pendentes. A conclusão geral apareceu somente em 120/120, inclusive terminando por Apps, que não é a última rota na ordem do catálogo. A tela final informa que as práticas externas são autodeclaradas.

Também foi possível abrir uma aula com pré-requisito pendente: a recomendação permaneceu visível sem bloquear a navegação. O seletor móvel contém 12 aulas em quatro grupos de três.

Editar uma prática registrada revogou seu avanço até novo registro. A resposta editada, os critérios e a etapa atual sobreviveram à recarga. A troca de pt-BR para inglês preservou o texto do aluno e o estado concluído, sem traduzir sua resposta.

## Retestes editoriais na interface

- O pedido CSV contém o cabeçalho e as duas linhas, com quebras preservadas (`white-space: pre-line`). O bloco literal permanece LTR.
- O ajuste de Apps em `63ade13` aparece em pt-BR/en: atualizar a cópia isolada com a versão que importa arquivos, usar somente `ganesha.tasks.test` e preservar a chave principal.
- O ensaio de agendamento tem pedido próprio de execução única, comandos completos e instruções específicas da ferramenta selecionada.
- A correção `446d5cf` conserva o aviso canônico sobre execução externa e remove o aviso automático repetido. Os critérios específicos de aprendizagem continuam no diálogo Ajuda.

## Mobile e leitura

Viewport 390 × 844. As primeiras etapas das 12 aulas, o CSV, o ajuste de Apps e o ensaio de agendamento não apresentaram estouro horizontal: `scrollWidth = innerWidth = 390`. O contexto da rota/aula ocupa uma linha acima do título; o título começa aproximadamente em y=119. As amostras longas de Apps e Automação também foram conferidas em inglês, com comandos LTR e aviso único.

Evidência DOM/medidas: `qa/v03-mobile-ui.json`. Capturas: `qa/v03-routes-desktop.jpg`, `qa/v03-complete-desktop.jpg`, `qa/v03-overview-mobile.jpg`, `qa/v03-csv-mobile.jpg` e `qa/v03-schedule-mobile.jpg`.

## Estado de aprovação

Sem P0/P1 aberto no escopo funcional e visual pt-BR/en verificado. A revisão editorial integral das 120 etapas pt-BR está nos três relatórios de `design/reviews/`.

### Rodada de indonésio — 21:34 UTC

Catálogo integral integrado e verificado na interface móvel (390 × 844): primeiras etapas das 12 aulas, CSV, ensaio e cenário de agendamento e cópia isolada atualizada de Apps. Todas as amostras mantiveram largura 390, sem estouro horizontal. CSV preserva dados e quebras, comandos permanecem LTR e os deltas editoriais finais aparecem traduzidos.

Um registro de prática localizado e um check com resposta errada/correta também passaram pelos controles visíveis. Aviso externo único e bloqueios preservados. Evidências em `qa/v03-id-ui.json` e `qa/v03-id-schedule-mobile.jpg`. Sem P0/P1 encontrado nesta rodada visual/funcional; não equivale a revisão linguística humana integral.

Pendente para fechar a versão multilíngue: integrar os oito catálogos restantes e conferir a interface com amostras longas, especialmente árabe/RTL. Este relatório não certifica tradução humana, execução dos projetos externos ou publicação da 0.3 no domínio público.
