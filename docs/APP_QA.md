# Verificação do aplicativo — 28/09/2026

## Evidência automatizada

- `node --import tsx --test tests/*.test.ts`: 15 testes passaram, incluindo a separação explícita entre prévia navegável e liberação pedagógica.
- `tsc --noEmit`: passou.
- `next build`: compilação, TypeScript e geração de rotas passaram.
- `node --import tsx scripts/check-content.ts`: 11 idiomas com 112/112 mensagens pedagógicas, 45/45 chaves principais de UI e paridade de IDs de etapas, alternativas e rubricas. As 9 mensagens adicionais de objetivos/estados/recuperação são cobertas por teste. Revisadas por humano: 0/112 por idioma.
- Testes de acesso: GET/POST de progresso falham com 503 sem integração; resposta de sessão declara demonstração e persistência no navegador.
- Smoke HTTP real em produção: `/api/session` retornou 200 com modo demo; `/api/progress?entitlement=ganesha-course&userId=demo` retornou 503 `unconfigured`, sem aceitar autorização inventada na URL.
- Testes de retomada: JSON inválido, versão incompatível, IDs removidos, opções inválidas, rubric indices inválidos e flags de conclusão inconsistentes são tratados. Checks são recalculados por opção. Práticas exigem autorrelato explícito e critérios completos.
- Testes de duas abas: união de etapas independentes, rascunho recente preservado, cursor ativo mantido, tentativas unidas em ordem e sem duplicatas, conclusão/feedback consistentes com restauração.
- Teste de escopo editorial: L01 draft e sem `releasedLessonIds` fica fora do adaptador de liberação e continua navegável apenas quando a lista explícita de demonstração é passada; aula planejada permanece excluída. IDs/versão não mudam. Build e auditoria de preview não certificam liberação pedagógica.

## Verificação em navegador

O Construtor abriu a visão geral real com a skill Browser e inspecionou composição, asset, tipografia e ausência de fallback na interface inicial. Corrigiu caminho de CSS e reset tipográfico encontrados na primeira captura.

O Diretor verificou antes do congelamento: texto da prática preservado após reload; quiz 1 e quiz 2 mostram feedback e bloqueiam avanço após erro; quiz 1 libera após acerto. Essa primeira rodada usou servidor de desenvolvimento enquanto os dados de recuperação evoluíam; não é evidência final do percurso inteiro.

O Artista retestou a interface real a 390×844 após correções: dicas/critérios presentes, nomes acessíveis nos sete controles, altura 44px no índice, sem overflow horizontal. Figuras didáticas são HTML com legendas localizadas. No build de produção 3101, verificou árabe a 390px: RTL/Noto Arabic, sem overflow em jornada/prática/check, textarea com `dir=auto`, rubricas com 56–76px, feedback incorreto traduzido com resposta/foco preservados e avanço bloqueado. A marca passou a ter direção LTR e foi removido um diagrama que não correspondia à legenda da verificação 1. A validação final do percurso completo é registrada pela coordenação ao concluir o QA de produção.

## Limites explícitos

Na rodada do Artista, as 11 versões da verificação e de seu feedback foram renderizadas a 390px sem overflow; fontes de hindi/japonês/coreano/chinês também foram inspecionadas. O suplemento de dicas/critérios foi movido para depois do artigo no mobile, mantendo o índice acima e trazendo o título para o início da tela.

- Falha de quota do navegador e preservação do backup local foram inspecionadas no código; não foram forçadas pela interface nesta rodada.
- O merge de múltiplas abas foi testado em funções puras; não oferece colaboração em tempo real nem garantia transacional entre processos.
- Não há avaliação automática da qualidade de texto livre; as rubricas são autorrelato e os quizzes são correção determinística.
- O conteúdo usa tradução produzida por IA, com revisão humana pendente. Cobertura de chaves não comprova qualidade linguística.
- Persistência remota, autenticação, autorização paga, execução de IA e deploy público ainda dependem de integrações não existentes.
