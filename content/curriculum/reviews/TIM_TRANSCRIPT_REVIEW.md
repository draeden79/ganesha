# Revisão do Educador — faixa textual Tech With Tim

Data: 2026-09-28. Lote do Devorador: `f42b1b5`. Fonte: [Claude Code — Full Tutorial for Beginners](https://www.youtube.com/watch?v=ntDIxaeo3Wg). Revisor: Educador, agente de IA; não é revisão humana. Aula candidata: `lesson.first-request`.

## Material realmente lido

- Ficha `content/research/studies/ntDIxaeo3Wg.md` e `studies/manifest.json` do Devorador.
- Artefato original exportado `content/research/transcripts/local/ntDIxaeo3Wg.en-CA.txt`, 48.267 bytes, SHA-256 `3f852a6f777ad4c0397c8b9036d3c1e18019f024f37c2a3d06d1761d7b63dffb` conferido contra o manifesto.
- Todas as linhas 1–711, incluindo cabeçalho e 706 entradas de legenda, lidas nesta tarefa em blocos consecutivos 1–360 e 361–711, sem truncamento do retorno.

A leitura integral é **da faixa textual exportada**. O Educador não assistiu ao vídeo, não conferiu a exatidão de toda a fala, não inspecionou os trechos de UI e não executou os exemplos. O intervalo sem cobertura confirmado no fim da faixa continua pendente. A origem da legenda é `authored-or-unspecified`, não “transcrição humana confirmada”. O artefato bruto permanece no worktree do Devorador e não foi duplicado no currículo.

## Decisão de uso

**Aceitar como insumo textual limitado, sem aceitar como estudo audiovisual integral nem elevar a maturidade de L01.** A ficha descreve a sequência e os limites de maneira coerente com a faixa lida. Há insumos úteis para reformular o protótipo, mas o recurso é predominantemente CLI/editor e não serve sozinho como percurso Desktop para iniciantes.

O estudo tem utilidade antes de encerrar o inventário completo: permite selecionar exemplos, apontar lacunas e evitar transportar pressupostos para o curso. Nenhum novo fato operacional ou trecho deste vídeo entra automaticamente no conteúdo do aluno. `acceptedFullStudyRecords` permanece vazio.

## Análise dos trechos pertinentes

| Trecho da faixa | Observação após leitura | Uso possível e limite |
| --- | --- | --- |
| 01:09–04:41 | Instalação, conta, pasta confiável e breve comentário sobre Desktop precedem a prática. A distinção verbal entre Claude Code e Desktop não é suficiente para a nomenclatura atual | Mapear pré-requisitos de `run`; conferir no material oficial. Não copiar comandos, preços, atalhos ou preferências CLI como condições de uso Desktop |
| 06:13–09:58 | A narrativa encontra permissão insuficiente e ferramenta de autenticação ausente. As aprovações amplas e a elevação de privilégio são decisões do autor | Identificar pontos que exigem recuperação didática. Não ensinar essas decisões como resposta padrão nem afirmar que GitHub passa a salvar toda alteração automaticamente |
| 10:00–16:46 | O autor situa pasta, editor e arquivos antes de pedir um jogo pequeno. Depois narra criação e abertura do HTML | Inspirar uma relação clara entre contexto, pedido e artefato. O texto registra a narração; não certifica aparência, funcionamento ou teste completo do jogo |
| 20:27–24:56 | O pedido descreve comportamento e recebe perguntas sobre som e tamanho antes da execução | Candidato mais útil para `brief`: uma atividade original pode pedir ao aluno que identifique uma decisão ausente e responda. A tela das perguntas e a transição de plano para execução ainda precisam de inspeção visual |
| 26:03–26:48 | Há uma falha ao abrir o arquivo, seguida de nova tentativa bem-sucedida segundo a fala. A causa e a correção exatas não ficam explicadas | Bom contraexemplo de limite da fonte. Não transformar essa passagem em um procedimento reproduzível de diagnóstico ou correção |
| 26:54–28:21 | Uma melhoria no jogo é sugerida, mas o autor muda para Git/GitHub antes de mostrar sua implementação | **Não há ciclo demonstrado de implementação dessa melhoria e reteste na faixa.** A futura atividade de `repair` precisa de outra fonte/caso completo ou de exemplo original executado e documentado |
| 28:22–31:38 | O autor compara uma sessão nova com outra que lê instruções de projeto | Pode orientar uma futura avaliação de contexto. Não comprova memória perfeita, cumprimento permanente de regras nem transferência equivalente para Codex |
| 31:40–33:25 | O autor narra tarefa em segundo plano, encerramento e possível reinício; a causa do reinício é apresentada com incerteza | Identificar a necessidade de ensinar interrupção e estado. Não inferir diagnóstico ou garantia operacional a partir desse trecho |
| 33:41–35:40 | Recursos avançados são citados sem tutorial completo, seguidos de uma afirmação ampla de domínio | Não usar como evidência de que o aluno aprendeu agentes, integrações, automações ou desenvolvimento completo |

## Implicações para a revisão de L01

1. **`scope` / `brief`:** considerar uma entrega pequena com critério observável e incluir perguntas de esclarecimento antes de executar. Essa adaptação é elaboração do Educador; o vídeo não valida nossa rubrica de quatro itens.
2. **`run`:** ensinar primeiro o significado e a localização da pasta/contexto. Usar um fluxo Desktop verificado nas fontes oficiais em estudo; não importar a instalação de CLI/editor/Git como pré-requisito universal.
3. **`evidence-check`:** separar explicitamente fala de conclusão, arquivo gerado, resultado aberto e comportamento testado. O texto desta fonte reforça a necessidade de inspeção; não substitui a inspeção.
4. **`repair`:** exigir um caso completo com problema, reprodução, pedido de correção, alteração observada e reteste. O vídeo não fornece esse ciclo para a melhoria sugerida.
5. **`transfer`:** manter pendente um exemplo equivalente Claude/Codex. Uma fonte de Claude não comprova o funcionamento da outra ferramenta.

As sugestões ficam registradas para a próxima edição. Não houve mudança de telas, textos, versão ou progresso nesta revisão.

## Próximas verificações

O Devorador já lista os trechos visuais pendentes na ficha. Para o uso candidato em L01, priorizar Desktop 04:09–04:33, criação/abertura 15:18–16:29, perguntas e execução 23:41–24:56, falha/resultado 26:03–26:48. A inspeção deve registrar o que realmente aparece, inclusive cortes e lacunas; não basta validar uma captura isolada. Conferir também o final da faixa e os erros de legenda que afetem afirmações usadas.

Essas verificações não tornam o vídeo a fonte principal das instruções atuais de Desktop. Os pedidos `L01-S01` a `L01-S04` seguem pendentes até avaliação das fichas e conteúdos integrais correspondentes. Prontidão pedagógica permanece recusada.
