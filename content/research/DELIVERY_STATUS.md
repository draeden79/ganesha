# Entrega ao Educador — 28/09/2026

**Atualização de 21:44 UTC: pesquisa integral ativa por instrução direta do usuário.** O Educador pode produzir as aulas com os lotes disponíveis enquanto o Devorador continua consumindo e organizando todo o conteúdo acessível das fontes prioritárias. O resultado da L01 continua sendo um plano revisado; propostas de editar páginas nestas fichas pertencem a etapas posteriores.

Nesta atualização: 121 vídeos com faixa textual adquirida, 27 transcrições integralmente lidas, 60 registros de estudo (59 fichas distintas) e nenhuma certificação audiovisual integral. O índice integrado conhece 5.928 URLs, incluindo vídeos, candidatos a artigo, aulas, índices e utilidades; o denominador histórico ainda não está fechado. Ver `content-inventory/coverage.json` e `studies/manifest.json` para estados atualizados.

Novas entregas em `studies/backfill/`: estudos de implementação/publicação, watchlist, design, revisão, testes e confiabilidade; artigos sobre descoberta de necessidades e edição humana; aulas Academy sobre instalação, funcionamento, contexto, CLAUDE.md, subagentes, skills, MCP, hooks e revisão de código. O estudo de revisão percorreu também exercícios interativos e seus feedbacks. Divergências de MCP, retenção de subagentes e garantias de hooks foram conferidas em trechos da documentação atual, sem declarar leitura integral desses documentos complementares. Cinco artigos pagos e duas páginas que exigem login têm bloqueios próprios; nenhuma leitura parcial foi promovida a integral. Todos os estudos mantêm exemplos, dependências, critérios e pendências explícitos.

| Etapa | Material entregue | O que está pronto | O que falta para validar a prática |
| --- | --- | --- | --- |
| Primeiro pedido e plano | `studies/official/P0_MAP.md` | Textos integrais de prompting e quickstarts; fluxo curto Academy com transcrição oficial e limite CLI explícito. Educador já aceitou afirmações textuais delimitadas do primeiro lote. | Percurso inicial nas interfaces reais; audiovisual Academy permanece não certificado. |
| Construir, observar e corrigir site | `studies/site/SKBDC3QugZw.md` | Faixa inteira analisada; comparação visual entre falha e resposta; análise de complexidade e instruções antigas. | Exercício simples em Desktop, teste funcional, tela pequena e reteste. O projeto do vídeo não é roteiro autossuficiente para iniciante. |
| Publicar e atualizar | `studies/publishing/netlify-manual-static.md` | Dois documentos oficiais integrais, figuras e limites das animações. Distingue URL, acesso público e atualização em produção. | Publicação real do exercício, visitante sem sessão e atualização na mesma URL. |
| App com dados | `studies/app/G9o8eoHzpxc.md` | Faixa inteira e estados visuais estudados; bom apoio de design. Parecer explícito de insuficiência como tutorial funcional. | Entrada inválida, mudança de estado, gravação, retorno e exclusão precisam de percurso reproduzível e teste. |
| Automação local | `studies/scheduling/local-manual-first.md` | Documentação atual de cada superfície e proposta original CSV → relatório, com gabarito, erro, repetição, recuperação e pausa. | Executar e comparar resultados nas duas ferramentas; agendar somente após êxito manual. |

`studies/automation/68BnH29qvAA.md` é um caso posterior de dependência externa e troca do resultado pretendido. Não substitui a prática local nem introduz email/SMS como requisito. O exercício de CSV em `studies/scheduling/` é a proposta principal de pesquisa para essa lacuna; alternativas nas fichas não criam novas aulas automaticamente.

O mapa `studies/CLAUDE_CODE_101_MAP.md` reúne as 12 aulas com texto público estudado, dez transcrições oficiais lidas e os limites de vídeo, quiz e badge. O lote novo inclui também permissões, skills de verificação, sessões longas, hooks, execução por scripts e diferenças entre projetos no Desktop, web, CLI e IDE. A ficha `studies/backfill/academy-10/routines-and-headless.md` registra uma divergência operacional: a documentação atual atribui a omissão de descoberta de configuração a `--bare`, enquanto `-p` sozinho ainda carrega contexto configurado. A formulação da aula não deve ser copiada sem essa correção.

## Leitura integral e limites

Manifestos separam arquivo adquirido, texto lido, quadros inspecionados, audiovisual acompanhado e procedimento executado. Nenhum vídeo foi certificado como integralmente assistido. Legendas automáticas preservadas integralmente podem conter erros; um timestamp próximo ao fim não prova cobertura de toda a fala. As práticas das fichas são propostas; a implementação original CSV do sprint possui validação própria em `sprint-csv/validation.json`, sem equivaler a execução nos produtos de IA ou a agendamento.

Originais completos usados na pesquisa ficam nas pastas locais ignoradas pelo Git, com hashes. Estão acessíveis aos agentes locais no worktree `81be`; commits levam fichas e índices, não cópias integrais para republicação. O inventário amplo está ativo, ordenado pela pertinência ao curso. A execução histórica exige a opção explícita `--historical`; cada lote mantém checkpoint, fila e evidências próprias.

## Prazo e passagem de trabalho

A primeira base utilizável já foi entregue e parcialmente aceita pelo Educador. O lote de estudos selecionados chega por etapa, permitindo trabalho simultâneo. Ainda não há estimativa confiável para uma cobertura integral de todo o histórico nem para certificar todas as práticas: alguns candidatos omitem justamente implementação e verificação. Não converter duração do vídeo ou quantidade de agentes em promessa de conclusão do curso.

O Educador/Diretor pode usar os materiais aprovados para L01 e validar os exercícios das etapas posteriores. O Devorador mantém o objetivo integral ativo e entrega novos lotes sem alterar automaticamente o currículo. Não é necessário aguardar o restante do acervo para começar as aulas.
