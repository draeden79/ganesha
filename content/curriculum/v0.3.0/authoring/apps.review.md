# Revisão de autoria — apps 0.3.0

2026-09-28. Autoria/revisão por agente de IA; revisão humana e piloto com iniciantes pendentes. Arquivos: `apps.pt-BR.json` e `apps.en.json`. Três aulas de dez etapas, seis práticas externas distintas e duas avaliações por aula (índices 3 e 8). Os IDs, tipos, modos, pré-requisitos, código literal, fontes e gabaritos coincidem nos dois idiomas. Cada etapa tem objetivo específico. Estimativas de 30/30/35 minutos são editoriais, não medidas em piloto.

## Fontes efetivamente lidas nesta rodada

Leitura textual integral dos corpos dos artigos abaixo, incluindo os exemplos e exceções do corpo; menus de navegação/rodapés não são conteúdo didático selecionado. A leitura foi realizada pela ferramenta web em 2026-09-28. Links externos e especificações referenciadas não foram percorridos. Não houve demonstração audiovisual, execução de snippets MDN nem interação com um aplicativo externo.

| Fonte primária | Cobertura e uso delimitado |
| --- | --- |
| [MDN — DOM, glossário](https://developer.mozilla.org/en-US/docs/Glossary/DOM) | Corpo integral, linhas 172–184 do retorno: página como estrutura manipulável e interação. A definição de estado, a sequência A/B e os critérios são elaboração didática original. A rota `/Web/API/Document_Object_Model/Introduction` foi aberta mas redirecionou a um índice extenso; esse índice não foi aceito como estudo integral nem usado como base. |
| [MDN — servidor local](https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Tools_and_setup/set_up_a_local_testing_server) | Corpo integral, linhas 172–283: arquivos locais, restrições, alternativas de servidor, verificação de Python, pasta, comando, porta e alternativas de linguagem. Apenas a alternativa de servidor estático Python/HTTP é ensinada; nenhuma instalação foi executada. |
| [MDN — localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) | Corpo integral, linhas 172–256: origem, sessões, modo privado, exceções, texto armazenado, distinção de protocolo, incerteza de `file:`, exemplos de ler/escrever/remover. Os ensaios de erro isolados são originais e propostos, não executados. |
| [MDN — Origin](https://developer.mozilla.org/en-US/docs/Glossary/Origin) | Corpo integral, linhas 172–223: protocolo, host e porta; origens opacas e exemplos. Usado somente para comparar condições de armazenamento e explicar mudança de URL; não ensina CORS. |
| [MDN — JSON.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) | Corpo integral, linhas 172–402, em leituras sobrepostas sem lacunas: sintaxe, retorno, erro, reviver, precisão, exemplos e JSON ilegal. Uso restrito à distinção entre sintaxe válida e contrato do app; reviver e números grandes não são pré-requisitos. Regras version/tasks/id/text/done e limites 100/120/1 MB são escolhas originais. |
| [MDN — Blob.text](https://developer.mozilla.org/en-US/docs/Web/API/Blob/text) | Corpo integral, linhas 172–226: leitura como texto, UTF-8, retorno assíncrono e comparação com FileReader. Sustenta a possibilidade de ler o arquivo selecionado; não certifica um importador pronto nem sua execução. |

Também foram lidos integralmente os dois originais oficiais já adquiridos pela pesquisa: `content/research/studies/local/publishing-netlify-drop.md` (86 linhas) e `publishing-netlify-visibility.md` (112 linhas), além da ficha `studies/publishing/netlify-manual-static.md`, no worktree81be. Textos usados para publicação estática opcional, acesso de visitante e atualização no mesmo projeto. [Netlify Drop](https://docs.netlify.com/start/quickstarts/netlify-drop-quickstart/) e [Project visibility](https://docs.netlify.com/manage/security/secure-access-to-sites/project-visibility/). Imagens e GIFs não foram inspecionados nesta rodada; não há aceite audiovisual novo, conta operada, upload ou publicação executada. O estudo não autoriza prometer gratuidade ou acesso público por padrão.

As variantes Claude/Codex reutilizam os aceites textuais delimitados do Educador em `reviews/OFFICIAL_SUBSET_01.md` e `reviews/OFFICIAL_SUBSET_02.md`, lidos nesta rodada: `res-claude-desktop-start` e `res-codex-desktop-quickstart`. Não representam nova inspeção operacional. Plan é atribuído à variante Claude; Codex recebe pedido explícito para revisar o plano, sem copiar controles ou atalhos CLI.

## Revisão pedagógica

- Estado: modelo original explícito; plano copiável; abertura HTTP com alternativa se Python faltar; testes separados de adicionar, alternar conclusão, remover o alvo e validar/teclado. Falha simulada de remoção tem reprodução e pedido de reparo completo. Nenhum aluno precisa inventar falha para avançar.
- Persistência: comprovação de conteúdo/conclusão/remover após recarga; controle de mesma origem; fechar/reabrir; dois ensaios isolados para leitura e escrita, sem `localStorage.clear()` nem dano aos dados principais; correção seguida de regressão. Não confunde navegador, origem, backup e sincronização.
- Entrega: contrato JSON explícito; exportar e localizar a cópia; validar antes de substituir; prévia e cancelamento; confirmação com cópia já guardada; sintaxe/tipo/id duplicado inválidos; recuperação e gravação recusada; pacote/README, publicação opcional com condições, visita e atualização. Exportações de usuário não são publicadas com o código. Não depende de concluir a rota de sites.
- Avaliações: cada opção tem feedback próprio. Gabaritos por aula: b/c, a/c, c/a. Medem preservação, regressão, origem, força da evidência, tipo de campo e transferência manual. Não repetem uma mesma pergunta.

## Limites de aprovação

A revisão aceita a coerência da progressão e os fundamentos textuais para uma beta, não demonstra eficácia de aprendizagem, execução nas duas ferramentas ou funcionamento de um artefato gerado. Todos os exemplos de incidentes são identificados como simulações originais; todos os resultados externos dependem do relato do aluno. Os prompts de ensaio são atividades para a ferramenta do aluno, não provas de que o curso as realizou.

Validação estrutural local: JSONs válidos; 3×10 etapas por idioma; 6 práticas por aula; checks exatamente em 3/8; opções a/b/c e feedbacks distintos; critérios de 1–3 itens; campos obrigatórios preenchidos; paridade de IDs/enums/código/fontes/gabaritos. Não foram criados testes da aplicação nem alterados o pacote canônico0.2.0, o app ou outros domínios. Sem commit.
