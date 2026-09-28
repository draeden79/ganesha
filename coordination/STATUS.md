# Status das entregas

Atualizado em 2026-09-28. Estado: design baseado no Ganesha Desktop integrado e Construtor implementando o novo visual. L01 reclassificada como rascunho após auditoria pedagógica; demonstração explicitamente habilitada nos 11 idiomas. Pesquisa avançando da aquisição para estudo integral, com estados separados.

## Registro de frentes

| Frente | Task ID | Worktree | Branch | Commit integrado | Próxima ação |
| --- | --- | --- | --- | --- | --- |
| Diretor | `01a0e952-1611-7c60-9b42-115d061cd07a` | `/Users/lucasmarques/.codex/worktrees/2ae2/Ganesha` | `codex/diretor-integracao` | `6f6e1e3`, `eb13ea5`, `f51b56c` | Integrar L01 e aplicativo; revisar fluxo real |
| Devorador | `01a0e952-8940-75d0-b32e-52078719adc0` | `/Users/lucasmarques/.codex/worktrees/81be/Ganesha` | `codex/devorador-research` | Último `2469bf8` (origem `f42b1b5`) | Continuar aquisição de todo o histórico e estudo integral; entregar pedidos L01-S01..04 |
| Educador | `01a0e952-e209-7551-a613-65cca61cee14` | `/Users/lucasmarques/.codex/worktrees/30b2/Ganesha` | `codex/educador-curriculo` | Último `d881c25` (origem `f51ae82`) | Avaliar fichas integrais e aprofundar sequência, exemplos, recuperação e avaliações |
| Artista | `01a0e953-3680-72c0-ba23-20b892fc7a76` | `/Users/lucasmarques/.codex/worktrees/e20b/Ganesha` | `codex/artista-experiencia` | Último `afb56af` (origem `eaa70e6`) | Corrigir captura mobile do protótipo; revisar novo aplicativo quando disponível |
| Construtor | `01a0e953-a4c9-7e91-a92a-bf6d3f379944` | `/Users/lucasmarques/.codex/worktrees/dbf4/Ganesha` | `codex/construtor-app` | Últimos `d333203`, `ac53253` (origens `92c4345`, `b9c19c7`) | Implementar design entregue e enviar URL/hash da nova versão testável |

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

- D011: Ganesha Desktop aberto no Mac é a nova referência visual principal, por pedido explícito do usuário. Artista inspeciona e especifica; Construtor implementa depois.
- D012: aquisição não equivale a estudo. Auditoria confirmada pelo Devorador: três faixas exportadas, nenhuma transcrição integralmente estudada, nenhum vídeo com demonstração visual revisada e nenhum artigo certificado por ficha integral. Educador deve auditar a sustentação das etapas e manter a maturidade pedagógica de L01 como provisória. Ver `RESEARCH_DIRECTIVE.md`; o preview visual continua em paralelo.

## Dependências externas

| Dependência | Responsável | Situação | Ação concreta |
| --- | --- | --- | --- |
| Cadastro das quatro tasks | Sessão de origem | Recebido e encaminhado | Acompanhar entregas diretamente |
| Stack e contrato de acesso | Colega + sessão de origem | Não encontrados no repo | Validar `contracts/INTEGRATION.md` |
| Automação de sexta-feira | Sessão de origem | Confirmada em arquivo e tool view | `devorador-atualiza-o-semanal-das-fontes`, sexta 09h America/Los_Angeles; propostas ao Diretor antes de atualização |

## Cobertura de idiomas

L01 integrada e auditada estruturalmente nos 11 locales: 112/112 chaves presentes em cada um, sem mensagens pendentes/ausentes ou revisão de origem desatualizada. Revisão linguística humana: pendente em todos os idiomas; traduções produzidas por IA. Aula `draft`, curso `preview` 0.1.0, lista de liberação vazia. `CONTENT_AUDIT.json` registra a única falha esperada: nenhuma aula liberada. Testes do app e cobertura de preview continuam passando; renderização será reavaliada após o novo design.

## Checkpoint de estudo integral

Pacote `f42b1b5`: 4.851 IDs YouTube deduplicados, dos quais 4.743 são uploads públicos dos cinco canais; inventário completo por fonte ainda não certificado. Três faixas exportadas (seis artefatos), uma faixa integralmente lida/analisada, nenhum audiovisual integralmente estudado e nenhuma cobertura de toda a fala verificada. Os 11 testes da pesquisa e os seis hashes locais passaram na integração. Ver `content/research/TRANSCRIPT_BATCH-2026-09-28.md`. O Educador ainda não aceitou fichas integrais como sustentação de L01.

## Evidências de validação

- Inspeção do commit inicial `dd724a6`: somente `DESIGN_SYSTEM.md`; sem aplicativo, dependências ou testes.
- Registro canônico de pesquisa auditado com `python3 coordination/validate_content.py --research-only`: 23 fontes, 16 evidências, zero erros estruturais.
- Duas páginas primárias conferidas pelo Diretor; ver `SOURCE_REVIEW.md`.
- Revisão pedagógica inicial do pt-BR: prática explícita, duas verificações de critérios diferentes, execução externa autodeclarada.
- Revisão antecipada do progresso: solicitada ao Construtor recuperação visível e preservação de estado inválido/incompatível.
- Nove testes do pipeline de pesquisa passaram no checkout integrado.
- Preview do app testado pelo Diretor: navegação, prática, reload e erro/acerto da avaliação; ver `QA_LOG.md`. Rodada final de navegador interrompida para a revisão visual solicitada pelo usuário. Diretor executou 14 testes, tipos, cobertura e build com sucesso no app integrado.
- Artista validou visual/mobile da base anterior e agora inspeciona o desktop como nova referência. App e CSS finais da primeira versão já integrados.

- Contrato TypeScript passou em `tsc --noEmit --target es2020 contracts/course.ts`.
- Validador de conteúdo confirmou 1 aula, 7 etapas e 2 verificações; rejeitou liberação por idiomas ausentes e aula draft. Testes temporários de falha também rejeitaram chave árabe ausente, somente uma avaliação obrigatória e ciclo de pré-requisito.

## Encaminhamento do próximo ciclo

- Construtor recebeu `eaa70e6` e começou a refazer a interface; enviará commit/preview/testes ao Diretor.
- Educador audita a sustentação de cada etapa e solicita ao Devorador estudo integral das fontes relevantes; seus 11 catálogos já foram integrados e auditados estruturalmente pelo Diretor.
- Artista entregou especificação/protótipo baseados na janela real do Ganesha Desktop; revisará a implementação do Construtor. Ver `DESKTOP_DESIGN_DIRECTIVE.md`.
- Devorador concluiu o lote inicial; o usuário agora priorizou transcrições de todos os vídeos das fontes indicadas, com pesquisa complementar autorizada. Foi instruído a retomar imediatamente e reordenar sua fila; a automação existente foi atualizada e continua na sexta-feira.
- Nenhuma implantação pública ou integração de autenticação/pagamento foi declarada concluída.
