# Status das entregas

Atualizado em 2026-09-28. Estado: contrato v1 harmonizado; especialistas implementando primeira entrega; pesquisa, design e primeira aula pt-BR integrados; aplicativo ainda não integrado neste checkout.

## Registro de frentes

| Frente | Task ID | Worktree | Branch | Commit integrado | Próxima ação |
| --- | --- | --- | --- | --- | --- |
| Diretor | `01a0e952-1611-7c60-9b42-115d061cd07a` | `/Users/lucasmarques/.codex/worktrees/2ae2/Ganesha` | `codex/diretor-integracao` | `6f6e1e3`, `eb13ea5`, `f51b56c` | Integrar L01 e aplicativo; revisar fluxo real |
| Devorador | `01a0e952-8940-75d0-b32e-52078719adc0` | `/Users/lucasmarques/.codex/worktrees/81be/Ganesha` | `codex/devorador-research` | `5415072`, `0da1615`, `52032bf` (origens `c531c9e`, `52262547`, `11881fb`) | Retomar transcrições integrais de todos os vídeos prioritários; ampliar fontes quando útil |
| Educador | `01a0e952-e209-7551-a613-65cca61cee14` | `/Users/lucasmarques/.codex/worktrees/30b2/Ganesha` | `codex/educador-curriculo` | `6764c41`, `d3c52af` (origens `0183dee`, `153c4d8`) | Entregar 10 traduções restantes e auditoria real |
| Artista | `01a0e953-3680-72c0-ba23-20b892fc7a76` | `/Users/lucasmarques/.codex/worktrees/e20b/Ganesha` | `codex/artista-experiencia` | `aeaf86e` (origem `e915746`) | Revisar app real e entregar QA visual |
| Construtor | `01a0e953-a4c9-7e91-a92a-bf6d3f379944` | `/Users/lucasmarques/.codex/worktrees/dbf4/Ganesha` | `codex/construtor-app` | — | Entregar commit/build estável 3101, testes e recuperação |

## Decisões

- D001: preservar os 11 idiomas; reduzir aulas liberadas se necessário.
- D002: cada aula exige prática e duas verificações distintas.
- D003: Educador é dono de `content/locales/` além do currículo; Construtor é dono de catálogos específicos da UI no aplicativo, com coordenação de vocabulário.
- D004: sem stack existente em `dd724a6`; base Next.js/React/TypeScript acordada com Construtor e origem. Stack do colega ainda desconhecida.
- D005: sem execução real de ferramentas de IA por padrão; identificar simulações.
- D006: contratos independentes de framework, textos por chave, fontes rastreáveis e progresso versionado.
- D007: `contracts/course.ts` é canônico; Construtor pode manter view model interno e adaptar. Educador aceitou o formato e suas adições em Step foram incorporadas.
- D008: `/course/[locale]` demonstração; `/learn/[locale]` protegida e fail-closed. Acesso real depende do colega.
- D009: 5 aulas/35 telas é proposta inicial da trilha de sites; aplicativos e automações aparecem como extensões planejadas. Apenas L01 será implementada primeiro.
- D010: por orientação explícita do usuário, obter transcrições de todos os vídeos das fontes prioritárias, com inventário completo e cobertura por item; fontes adicionais na internet estão autorizadas. Ver `RESEARCH_DIRECTIVE.md`. Devorador recebeu a instrução de retomar a prioridade de transcrições; instrução persistida na automação semanal existente.

## Dependências externas

| Dependência | Responsável | Situação | Ação concreta |
| --- | --- | --- | --- |
| Cadastro das quatro tasks | Sessão de origem | Recebido e encaminhado | Acompanhar entregas diretamente |
| Stack e contrato de acesso | Colega + sessão de origem | Não encontrados no repo | Validar `contracts/INTEGRATION.md` |
| Automação de sexta-feira | Sessão de origem | Confirmada em arquivo e tool view | `devorador-atualiza-o-semanal-das-fontes`, sexta 09h America/Los_Angeles; propostas ao Diretor antes de atualização |

## Cobertura de idiomas

pt-BR da L01 integrado e auditado: 112/112 chaves presentes, sem mensagens pendentes ou revisão de origem desatualizada. Demais 10 locales: ainda não integrados. Catálogos da UI: pendentes de integração/auditoria. Revisão linguística humana: pendente em todos os idiomas. A aula continua draft e o curso preview.

## Evidências de validação

- Inspeção do commit inicial `dd724a6`: somente `DESIGN_SYSTEM.md`; sem aplicativo, dependências ou testes.
- Registro canônico de pesquisa auditado com `python3 coordination/validate_content.py --research-only`: 23 fontes, 16 evidências, zero erros estruturais.
- Duas páginas primárias conferidas pelo Diretor; ver `SOURCE_REVIEW.md`.
- Revisão pedagógica inicial do pt-BR: prática explícita, duas verificações de critérios diferentes, execução externa autodeclarada.
- Revisão antecipada do progresso: solicitada ao Construtor recuperação visível e preservação de estado inválido/incompatível.
- Nove testes do pipeline de pesquisa passaram no checkout integrado.
- Preview do app testado pelo Diretor: navegação, prática, reload e erro/acerto da avaliação; ver `QA_LOG.md`. Repetição final pendente na build estável 3101.
- Artista realiza QA visual/mobile; RTL depende do catálogo árabe. Build final do aplicativo ainda sem commit integrado.

- Contrato TypeScript passou em `tsc --noEmit --target es2020 contracts/course.ts`.
- Validador de conteúdo confirmou 1 aula, 7 etapas e 2 verificações; rejeitou liberação por idiomas ausentes e aula draft. Testes temporários de falha também rejeitaram chave árabe ausente, somente uma avaliação obrigatória e ciclo de pré-requisito.

## Encaminhamento do próximo ciclo

- Construtor envia hash do aplicativo, evidências de testes e URL 3101 estável ao Diretor. O Diretor integra e repete o percurso completo.
- Educador envia os 10 catálogos restantes, atualização ready/preview e relatório; o Diretor executa auditoria real das 11 línguas.
- Artista envia `design/QA.md` com evidências visuais e achados do aplicativo; alterações funcionais seguem com Construtor.
- Devorador concluiu o lote inicial; o usuário agora priorizou transcrições de todos os vídeos das fontes indicadas, com pesquisa complementar autorizada. Foi instruído a retomar imediatamente e reordenar sua fila; a automação existente foi atualizada e continua na sexta-feira.
- Nenhuma implantação pública ou integração de autenticação/pagamento foi declarada concluída.
