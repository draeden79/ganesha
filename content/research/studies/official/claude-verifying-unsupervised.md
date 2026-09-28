# Estudo — Trust it: Verifying unsupervised runs

Recurso `res-claude-verify-unattended`, fonte `claude-academy`, inglês. [Original](https://academy.claude.com/courses/claude-code-in-action/trust-it-verifying-unsupervised-runs), observado em 28/09/2026. Aula 8, estimativa 5 min; publicação não informada. [Player sXonYL7kAoc](https://www.youtube.com/watch?v=sXonYL7kAoc). Texto auxiliar integral `studies/local/official-claude-verifying-unsupervised.txt`, SHA-256 `c22cc400a6f9c42a7d0e546fdfc4c496b5a1ea3d19da65de8902e7735047339d`, linhas 1–134 lidas, corpo substantivo 34–90. O DOM não expôs seletor Transcript. Estado `partial`, texto analisado integralmente, `full_source_analyzed=false`: o texto não substitui o vídeo. Original local ignorado pelo Git.

## Raciocínio completo do artigo auxiliar

O texto começa pelo problema de confiar num trabalho não observado (34–38), mantém verificação de segurança em Auto (42–47), passa ao diff para descobrir mudanças fora do plano (49–59), propõe tests/hooks como barreira automática (61–71), acrescenta revisor sem o histórico de construção (73–78) e encerra reunindo diff, testes, resultado JSON/exit code e segunda opinião (80–90).

Os mecanismos concretos citados são `/code-review`, `git diff`, Stop e PostToolUse, saída `exit 2` e inspeção de resultado headless. Não há nesse texto configuração completa de hook, comando headless completo, log de falha reparada ou código de produto. “The classifier never judges whether the code is actually correct” (47) delimita segurança operacional e correção funcional.

## Distinção entre fonte, confirmação e inferência

**Fonte:** recomenda intensidade de verificação proporcional à execução não acompanhada; teste real em vez de alegação; novo contexto para revisão. **Confirmação complementar:** [Desktop](https://code.claude.com/docs/en/desktop), linhas 619–678 do artefato `official-claude-desktop-rendered.txt`, diferencia interface interativa de `--print`/`--output-format` e confirma configuração compartilhada de hooks. Isso não ensina como instalar o hook corretamente.

**Inferência editorial:** o curso não deve converter a frase sobre `exit 2` em receita universal sem ler a especificação do evento e testar bloqueio/recuperação. Código de saída sem execução conhecida pode ser dado irrelevante. Uma revisão de agente e um resumo de agente são avaliações, não observação do estado do produto. A afirmação de que uma sessão curta observada precisa só de uma olhada é uma heurística didática; impacto da mudança também deve orientar a profundidade, mesmo quando acompanhada.

O artigo não demonstra que Auto evita todas as ações perigosas ou todos os defeitos; não confundir uma recomendação de modo com prova de cobertura. O uso de `/code-review` deve ser conferido na instalação/superfície; não substituir pelo `/review` do Codex nem prometer um comando universal.

## Pertinência e recorte

P1 para autonomia e revisão, sem bloquear L01. Para pessoas comuns, o trecho útil é confrontar o relato com a mudança e com o comportamento. Configuração de hooks, CI e execução headless ficam para uma aula posterior, com ambiente preparado. Pré-requisitos: compreender arquivo alterado, resultado esperado e diferença entre conferência humana e execução automatizada. Duplica o fechamento do workflow; usar como aprofundamento de uma mesma competência. Atualidade: corpo vivo de setembro/2026, sem versão demonstrada. Lacuna de formação: entregar ao aluno um modo simples de observar o efeito sem depender de leitura avançada de diff.

## Prática original: conferir trabalho executado sem acompanhar

Projeto de treino: página de agenda local em que o assistente recebeu tarefa de adicionar filtro por dia. O instrutor fornece estado anterior, pedido, diff e relatório final; um dos artefatos contém alteração fora do escopo e o filtro falha para dia sem eventos. Não usar uma execução em produção para fabricar a falha.

Primeiro o aluno escreve o que deveria ter mudado usando o pedido, antes de ler o relatório final. Em seguida inspeciona arquivos/diff e registra algo inesperado. Abre o preview, compara dia com eventos e dia vazio, e confere se o vazio mostra estado adequado. Só então confronta os resultados com o relato “concluído”.

O aluno pede correção específica, com os passos da falha. Depois repete os dois cenários e confere que o arquivo fora do escopo voltou ao estado esperado. Se a ferramenta afirma ter rodado testes, localiza comando, saída e resultado; caso não existam, registra a lacuna em vez de presumir sucesso. Segunda revisão pode ser humana no primeiro exercício, evitando introduzir subagentes antes de necessidade real.

Check 1: identificar alteração fora do escopo a partir dos artefatos. Check 2: reproduzir comportamento em duas classes de entrada, incluindo borda. Check 3: distinguir teste executado, teste sugerido e verificação impedida no relatório. Transferência: revisar uma automação que move arquivos de treino conferindo destino/quantidade e regra aplicada, sem confiar apenas no anúncio de conclusão.

Entrega: uma tabela requisito–evidência–estado, com pelo menos uma limitação explicitada quando houver. Critério de reprovação: aprovar todo o trabalho porque o agente disse que terminou ou porque Auto estava ativo.

## Não revisado

Vídeo/áudio/legendas, demonstrações visuais e configuração real de hooks não foram consumidos. Nenhum teste de falha `exit 2`, CI, headless, permissões ou revisor foi executado. A narrativa do vídeo pode ter passos adicionais ausentes do texto; não afirmar sua sequência audiovisual completa.
