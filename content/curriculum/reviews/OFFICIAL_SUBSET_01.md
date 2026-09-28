# Parecer do Educador — primeiro lote oficial focal

Data: 2026-09-28. Lote do Devorador `8af94e4`. Revisor: Educador, agente de IA. Esta é revisão dos conteúdos originais exportados e das fichas, não apenas leitura de seus resumos. Não houve execução dos exemplos nem inspeção de um aplicativo real nesta revisão.

## Artefatos conferidos e leitura

| Recurso | Artefato original local / leitura pelo Educador | Integridade |
| --- | --- | --- |
| `res-codex-prompting` | `content/research/studies/local/codex-prompting.txt`, todas as 503 linhas, 20.088 bytes | SHA-256 `f4a155ddbf7af5bf24f4e117b61bc4b6025a637bf8dcfd51941bed5cd1e1d367` conferido |
| `res-claude-desktop-start` | `content/research/studies/local/official-claude-desktop-quickstart.md`, todas as 140 linhas, 11.008 bytes | SHA-256 `7e0fbc28948beca6fa3e042857f07ffccfffe08b9ce0039fee2c66214cf66ac8` conferido |

O Educador leu também `studies/official/manifest.json`, `codex-prompting.md` e `claude-desktop-quickstart.md`. Os retornos dos dois originais foram completos, sem truncamento. Referências externas citadas dentro das páginas não foram percorridas e não estão implicitamente aceitas. O complemento longo Desktop, lido seletivamente pelo pesquisador, não foi aceito como fonte integral por esta revisão.

## Decisões delimitadas

**Quickstart Claude: aceitar estudo integral do documento textual para afirmações de onboarding descritas nele.** O documento recebido não contém uma demonstração visual substantiva; isso torna a revisão de imagens desse documento inaplicável, não converte o texto em demonstração da UI. O procedimento abrange instalação/acesso, Code, Local/pasta, pedido e revisão condicionada ao modo de permissão. Também aponta login/upgrade/403 como situações de entrada. Trechos principais: linhas 9–54, 60–101 e 103–124 do artefato.

Não aceitar como resultado de execução: nenhuma conta foi autenticada, nenhum botão da aplicação foi inspecionado pelo Educador, nenhum arquivo foi alterado e nenhuma falha foi recuperada nesta consulta. A prática proposta na ficha é original do pesquisador, não um exemplo observado na documentação. As extensões Cloud, SSH, WSL, PR e agendamento aparecem como opções/links, não como percursos completos estudados.

**Prompting: aceitar integralidade da leitura textual e afirmações metodológicas delimitadas; não certificar a página multimídia inteira.** As 503 linhas incluem objetivo, contexto, limites, formato, refinamento e os nove fluxos Codex. A animação de ditado não foi vista, conforme ficha. Ela fica fora do escopo ensinado na L01 e sua pendência não obriga ensinar ou priorizar ditado; o estado multimídia da fonte continua parcial.

O conteúdo textual não exige fórmula fixa: usar apenas as informações que mudam o resultado. A rubrica da Ganesha deve ser apresentada como apoio **deste exercício**, não lei universal de prompting. O documento sustenta revisar uma primeira resposta e pedir uma mudança específica sem reiniciar todo o trabalho (linhas 17–128); especificar comportamento, reprodução, limites e verificação em trabalho de código (192–290). Os exemplos são instruções propostas, não respostas de uma execução registrada. Os fluxos posteriores de IDE/CLI/cloud não são passos universais de Desktop.

Essas decisões dão base para aprofundar um exemplo original de planejamento e revisão. Não fecham o conjunto de fontes da aula, a variante operacional Codex ou a demonstração de UI. Builder permanece P1, não estudado pelo Educador neste lote; sua retirada do caminho crítico não valida a etapa atual de correção.

## Aplicação ao material em elaboração

- `brief`: explicar o papel de objetivo/contexto/limite/forma de conferir, com a ressalva de que a estrutura é um apoio ao caso escolhido; manter linguagem comum.
- `repair`: propor uma correção delimitada do plano recebido, preservando o que atende ao pedido. Isso é compatível com o método textual de refinamento; não afirmar que houve alteração real de arquivos.
- `run`, variante Claude: distinguir a instrução para planejar de editar, conferir contexto e explicar que revisão de mudanças depende do modo. Uma preferência pedagógica por um modo é escolha do curso, não requisito universal da documentação.
- Recuperação inicial: separar problema de acesso de problema no resultado, recolhendo etapa, mensagem e contexto. Não copiar diagnósticos do complemento não estudado integralmente como se estivessem certificados.

`L01_WORKED_EXAMPLE.md` desenvolve um exemplo original completo e explicitamente simulado para revisão editorial. Ainda não integra `course.json` nem os 11 catálogos. Ele resolve a lacuna de não mostrar uma resposta e sua correção no planejamento; não resolve as lacunas de execução nas duas ferramentas ou de revisão visual.

## Estado após este parecer

Um documento textual integral aceito para afirmações delimitadas; uma página com leitura textual integral e mídia pendente, aceita apenas para método textual. Zero demonstrações de UI aceitas pelo Educador. L01 continua `draft`, `releaseEligible=false`. A busca permanece focal: quickstart Codex e ciclo curto selecionado, seguidos do caso original executado/observado quando necessário. Não aguardar o inventário completo nem adicionar guias redundantes de prompting.
