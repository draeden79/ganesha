# Proposta de aula de referência L01 — protótipo provisório

**Reclassificação em 28/09/2026:** a sustentação inicial é parcial. Este documento registra a proposta produzida, não uma aula pedagogicamente pronta. A classificação vigente é `draft`, sem aula liberada; ver `PEDAGOGICAL_AUDIT.md`. Nenhuma ficha integral de fonte foi aceita como base desta versão.

ID: `lesson.first-request`. Versão de protótipo: `0.1.0`. Estimativa editorial não validada: 25 minutos, além de eventual instalação/acesso. Idiomas: 11. Escopo proposto: preparar, executar um primeiro pedido de planejamento e revisar com critérios. Não afirmar que o percurso foi validado com iniciantes nem que esta aula sozinha entrega um site publicado.

## Por que esta primeira aula

A hipótese pedagógica é que distinguir intenção, resposta e resultado ajuda o iniciante antes de delegar mudanças em arquivos. O pedido de planejamento foi escolhido para propor uma tarefa pequena e comparável a critérios; esse benefício ainda não foi validado. O aluno pode ensaiar sem conta; para registrar a prática real como feita, precisa executar na ferramenta escolhida. O curso não certifica essa execução.

O projeto de serviço fictício foi escolhido pelo Educador para evitar coleta de dados reais e reduzir decisões de domínio. Sete telas separam tarefas que exigem atenção diferente. As duas verificações medem habilidades distintas; não são duas versões da mesma pergunta. Essas escolhas são decisões de design instrucional, ainda sem teste de eficácia com alunos.

## Sequência e evidência de aprendizagem

| Tela / sufixo do ID | Modalidade | Ação central | Evidência ou critério |
| --- | --- | --- | --- |
| `scope` | conceito | escolher público e ação principal | conseguir nomear ambos; orientação, sem nota |
| `brief` | simulação guiada | escrever pedido com quatro elementos | rubrica: entrega, contexto, limite e teste; autoavaliação |
| `request-check` | verificação determinística | escolher um critério de contato | alternativa B: ação e resultado observáveis |
| `run` | execução externa pelo aluno | enviar pedido de plano na ferramenta | registro de contexto, resposta e limites; autodeclarado |
| `evidence-check` | verificação determinística | julgar o que uma mensagem prova | alternativa C: é preciso abrir resultado e testar |
| `repair` | simulação guiada | escrever pedido de correção | observado, esperado, reprodução e reteste; autoavaliação |
| `transfer` | reflexão com prática simulada | adaptar orientação para outra ferramenta | preservar critérios e mudar contexto; não requer segunda conta |

Prefixo de IDs de tela: `step.first-request.`. O aluno vê textos localizados, nunca letras/IDs como critério de correção. Alternativas têm feedback próprio e as verificações têm mensagem de êxito e nova tentativa. As duas dicas de cada tela aumentam gradualmente a orientação.

## Fontes e escopo de suporte

Pacote de descoberta do Devorador lido em 28/09/2026: `EARLY_BATCH.md` e `registry.json`, commit `c531c9e`. O registro foi conferido novamente no pacote `5226254` para a auditoria de referências. Os IDs abaixo preservam o vocabulário dele. As linhas apontam para seções consultadas e sínteses; não certificam leitura completa nem estudo das demonstrações. A documentação de produto confirma fatos pontuais, não a eficácia da sequência proposta.

| Evidência | Fonte e seção | Uso na aula e limite |
| --- | --- | --- |
| `ev-codex-prompting` | [Prompting](https://learn.chatgpt.com/docs/prompting), Prompting overview | resultado, contexto e limites explícitos; a rubrica de quatro itens é adaptação pedagógica |
| `ev-claude-plan-build-review` | [Explore → plan → code → commit](https://academy.claude.com/courses/claude-code-101/the-explore-plan-code-commit-workflow), Code | critérios e revisão; atalhos CLI não foram convertidos em instruções Desktop |
| `ev-claude-agent-basics` | [What is Claude Code?](https://academy.claude.com/courses/claude-code-101/what-is-claude-code), Using Claude Code Effectively | contexto, arquivos e execução; o curso não simula acesso real ao projeto |
| `ev-claude-verify-unattended` | [Trust it: Verifying unsupervised runs](https://academy.claude.com/courses/claude-code-in-action/trust-it-verifying-unsupervised-runs), Keep unattended runs in auto mode | inspecionar alterações e evidências; mensagem de conclusão não é prova de teste |
| `ev-claude-desktop-start` | [Get started with the desktop app](https://code.claude.com/docs/en/desktop-quickstart), Install / Start your first session | Code, Local, pasta; app inclui Claude Code, acesso depende de plano compatível |
| `ev-claude-desktop-reference` | [Desktop application](https://code.claude.com/docs/en/desktop), introdução e comparação com CLI | contextos e revisão visual; não prometer paridade de comandos e controles |
| `ev-codex-desktop-start` | [ChatGPT desktop app](https://learn.chatgpt.com/docs/app), Send your first message | escolher Codex e contexto de trabalho; rota antiga redirecionou, rótulos podem variar |
| `ev-builder-behavior-tests` | [How to De-Slop an AI-Generated Codebase](https://www.builder.io/blog/de-slop-ai-generated-codebase), exemplo de comportamento reproduzível | pedir esperado/observado e reteste; relato do autor, sem generalizar frequência de falhas |

Trechos/sínteses, localizadores e ressalvas originais estão no registro. A relação exata etapa↔evidência está em `evidence-bindings.json`. Os textos do aluno são próprios, localizados e não reproduzem longos trechos das fontes. O Educador também abriu diretamente o quickstart e a página do app OpenAI para conferir o redirecionamento; não afirma ter assistido aos vídeos catalogados.

Artifacts não são ensinados como exclusivos do Chat, nem como prova de alteração em pasta ou publicação pública. O complemento do Devorador informa diferenças recentes e legados; esse tópico fica fora da L01 para evitar uma comparação superficial.

## Conclusão e recuperação

O app deve exigir as duas verificações aprovadas e os critérios das práticas para a conclusão da aula, preservando respostas e tentativas. A prática externa precisa ficar marcada como autodeclarada. Se o aluno não tem acesso à ferramenta, pode conservar seu pedido e retomar a tela `run`; não converter falta de execução em execução concluída.

O êxito dos quizzes mostra reconhecimento desses dois critérios, não domínio completo de desenvolvimento. A aula não verifica remotamente arquivos, contas ou publicação. Uma futura verificação real exigirá integração e um novo contrato de evidência.

## Próximas dependências

L02 exige fluxo de criação e execução local documentado; L05 exige uma rota de hospedagem comprovada. Publicação, autenticação, persistência e acessibilidade não estão cobertas integralmente por este primeiro lote. As demais aulas seguem no mapa interno, sem telas vazias na navegação.
