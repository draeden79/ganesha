# Status das entregas

Atualizado em 2026-09-28. Estado: contrato v1 harmonizado; especialistas implementando primeira entrega; aplicativo ainda não integrado neste checkout.

## Registro de frentes

| Frente | Task ID | Worktree | Branch | Commit integrado | Próxima ação |
| --- | --- | --- | --- | --- | --- |
| Diretor | `01a0e952-1611-7c60-9b42-115d061cd07a` | `/Users/lucasmarques/.codex/worktrees/2ae2/Ganesha` | `codex/diretor-integracao` | Pendente | Commitar contrato v1 e integrar entregas |
| Devorador | `01a0e952-8940-75d0-b32e-52078719adc0` | `/Users/lucasmarques/.codex/worktrees/81be/Ganesha` | A confirmar | — | Evidenciar deriva de Codex e fontes da L01 |
| Educador | `01a0e952-e209-7551-a613-65cca61cee14` | `/Users/lucasmarques/.codex/worktrees/30b2/Ganesha` | `codex/educador-curriculo` | `0183dee` aguardando integração | Gerar L01 com 7 telas e 11 locales |
| Artista | `01a0e953-3680-72c0-ba23-20b892fc7a76` | `/Users/lucasmarques/.codex/worktrees/e20b/Ganesha` | A confirmar | — | Tokens e estados de aula/RTL |
| Construtor | `01a0e953-a4c9-7e91-a92a-bf6d3f379944` | `/Users/lucasmarques/.codex/worktrees/dbf4/Ganesha` | `codex/construtor-app` | — | Next.js e adaptador para contrato canônico |

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

## Dependências externas

| Dependência | Responsável | Situação | Ação concreta |
| --- | --- | --- | --- |
| Cadastro das quatro tasks | Sessão de origem | Recebido e encaminhado | Acompanhar entregas diretamente |
| Stack e contrato de acesso | Colega + sessão de origem | Não encontrados no repo | Validar `contracts/INTEGRATION.md` |
| Automação de sexta-feira | Sessão de origem | Confirmada em arquivo e tool view | `devorador-atualiza-o-semanal-das-fontes`, sexta 09h America/Los_Angeles; propostas ao Diretor antes de atualização |

## Cobertura de idiomas

Todos os 11 locales estão pendentes de entrega de conteúdo e aplicativo. Nenhuma tradução ou revisão é declarada concluída neste momento.

## Evidências de validação

- Inspeção do commit inicial `dd724a6`: somente `DESIGN_SYSTEM.md`; sem aplicativo, dependências ou testes.
- Nenhum build, teste funcional ou revisão visual executado ainda.
