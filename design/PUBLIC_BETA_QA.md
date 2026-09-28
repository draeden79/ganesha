# QA da beta pública — 28/09/2026

## Escopo e versões

- Fluxo completo: app `600f5a8`, origem isolada `http://localhost:3102/classroom/pt-BR`.
- Reteste de ajustes, arquivos e idiomas: app `2ea8f98`, `http://localhost:3103/classroom/pt-BR`.
- Conteúdo: currículo `course.first-site` 0.2.0, quatro aulas, 24 etapas, oito checks e 12 práticas. Catálogos finais nos 11 idiomas.
- Desktop 1280×720 e mobile 390×844. A versão anterior e o progresso do usuário não foram alterados.

## Resultado funcional observado pela interface

O percurso foi percorrido em português, preenchendo as 12 práticas com registros explícitos de **QA simulado**, sem executar Claude, Codex ou projetos externos. Todos os oito checks foram testados com uma resposta incorreta e uma correta: erro bloqueia avanço, acerto libera. As 24 telas foram abertas e os estados registrados em `qa/beta-flow-ui.json`.

- Fundamentos → próxima aula abre Site e reinicia o índice em 1 de 6.
- O seletor mobile mostra as quatro aulas e seus progressos reais.
- Após Fundamentos, Automação pode ser acessada diretamente sem concluir Site/App.
- Concluir Fundamentos e Automação retorna à jornada com 2/4 aulas e 12/24 etapas; não apresenta conclusão geral.
- Rascunho e etapa de Site foram preservados após reload na URL com hash.
- Depois de todas as etapas concluídas, a tela final diz “Seu percurso está registrado” e explicita que as práticas externas são autodeclaradas. Revisão continua acessível.

## Visual e idiomas

A composição desktop aprovada permanece: aulas na lateral, etapas no trilho da aula selecionada e atividade em foco sem lateral. O seletor substitui a lista de aulas no celular; o trilho fica contido no painel.

As telas extensas `app.execute` e `automation.execute` foram renderizadas nos 11 idiomas em 390×844: documento com 390 px, título em y=90 px, dois critérios presentes, sem overflow horizontal. A troca de idioma preserva aula/etapa na rota `/classroom`. Árabe usa RTL e Noto Sans Arabic; Hindi usa Noto Sans Devanagari; CJK usa as fontes previstas. Ver `qa/beta-locales-mobile.json` e `qa/beta-app-locales-mobile.json`.

Dois ajustes foram solicitados e retestados em `2ea8f98`: objetivo/resultado esperado idênticos aparecem uma única vez no painel; feedback de opção e feedback geral idênticos não repetem o mesmo parágrafo. Gates de erro/acerto continuam funcionando.

A última pendência visual foi corrigida em `bc9ecda`: quatro comandos da prática de Automação são renderizados como `code dir=ltr`, com `unicode-bidi:isolate` e quebra dentro de largura máxima de 330 px. Reteste mobile árabe após reload: viewport 390×844, documento 390 px e título em y=90 px. A captura foi inspecionada: comandos preservam a ordem LTR mesmo ao quebrar linha. Evidência em `qa/beta-ar-mobile-execute-fixed.jpg` e `qa/beta-rtl-final.json`.

## Arquivos de exemplo

A prática de Automação mostra links de CSV, Python e HTML sob `/classroom/exercises/`. O HTML é identificado como Português (Brasil), sem fingir tradução.

O link HTML foi aberto e testado no navegador:

1. CSV inicial gera dois registros e total `30.50`.
2. Gerar novamente mantém dois registros e total `30.50`, sem duplicação.
3. Remover a coluna `amount` apresenta erro e conserva o último relatório válido.

O link de download do relatório aparece após sucesso e continua apontando ao último relatório válido após erro. CSV/Python foram verificados como links expostos na interface; não foi executado o script Python nem feito download desses arquivos neste QA.

## Evidências

- `qa/beta-desktop-journey.jpg`: quatro aulas no desktop.
- `qa/beta-mobile-journey.jpg`: seletor de aulas, progresso e trilho no celular.
- `qa/beta-mobile-complete.jpg`: conclusão real do percurso de QA.
- `qa/beta-ar-mobile-execute.jpg`: tela árabe anterior ao ajuste de comandos.
- `qa/beta-html-error-preserves-report.jpg` e `.txt`: erro no CSV preserva resultado válido.
- `qa/beta-flow-ui.json`: snapshots e resultados de interações do fluxo completo.
- `qa/beta-locales-mobile.json`, `qa/beta-app-locales-mobile.json`: verificações das telas longas nos 11 idiomas.

## Limites

Este QA valida interface, navegação, gates observáveis, conclusão e o exemplo HTML local. Persistência em cenários concorrentes e testes internos do motor permanecem com Construtor/Devorador. Revisão linguística humana continua pendente. A publicação em `https://iganesha.online/classroom` depende do operador/Diretor e ainda não foi verificada aqui; links locais não comprovam publicação pública.

## Parecer final

**Aprovado no escopo testado, build final `bc9ecda`.** Não restaram achados visuais ou funcionais no percurso verificado. Resultado comunicado ao Diretor antes de 20:42 UTC. A validação pública no domínio e a liberação editorial não estão incluídas nesta aprovação local.
