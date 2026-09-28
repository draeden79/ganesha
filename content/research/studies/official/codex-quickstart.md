# Estudo — Quickstart oficial para Codex no Desktop

Fonte complementar selecionada como principal de entrada P0: [Quickstart](https://learn.chatgpt.com/docs/quickstart), OpenAI, inglês, observado em 28/09/2026. Não possui ID próprio no registro existente; relacionado a `res-codex-desktop-start`. A inclusão/alteração de ID cabe ao coordenador, não foi feita nesta ficha.

Artefato original `studies/local/official-codex-quickstart.md`, SHA-256 `5c052386e1de596504ce11df740000577d8acc5b6c5693a524b3f711cceabcef`, linhas 1–204 integralmente lidas via `lookup_page` oficial. Inclui ambas as variantes Desktop/Web e o texto completo dos seis exemplos configurados no componente. Não há truncamento. Corpo Desktop também conferido renderizado, e ilustração vista em `official-codex-quickstart-selector.png`, SHA-256 `75d58a03b02fce0f1456a50575c0daca73b5c6d161e2cdc72623af993f4b78db`.

`full_source_analyzed=true` para o documento textual e a ilustração necessária à orientação Desktop. Isso não equivale a execução de instalação, tarefa ou teste do produto. A interação de um seletor de exemplo na página não se confirmou; o texto do exemplo foi lido no Markdown oficial e no DOM, sem presumir que a ação o ativou. A reprodução integral de todas as animações decorativas não é base de nenhuma afirmação curricular. Originais e captura locais ignorados pelo Git; licença de republicação não presumida.

## Sequência integral e exemplos

Comparação Desktop/Web (14–27); setup Desktop de cinco passos (42–120): instalar, entrar na conta, escolher pasta/projeto, selecionar produto, enviar pedido. API key é alternativa com limites de disponibilidade (59). O exemplo de app propõe investigar uma melhoria de usabilidade, implementá-la, atualizar testes e conferir mobile/desktop (107–110). Outros exemplos Desktop são decisão e planilhas. A variante Web (122–186) contém acesso, Chat/Work, projeto e mensagem, com exemplos de decisão, briefing e evento. Fechamento aponta app e importação (187–204).

Evidência curta: “read and modify files in the folder you choose” (63–64) justifica conferir a pasta. A sequência escrita termina no pedido; **não mostra a resposta produzida nem uma revisão realmente executada**. Não há narrativa de erro, log de teste ou garantia de que o exemplo funcionou. `/docs/app` passa a complemento para identidade/superfície, sem exigir seus vídeos promocionais.

## Pressupostos, limites e relevância

**Confirmado na fonte:** instalação conforme sistema, conta ou API key, contexto selecionado e distinção entre Chat/Work/Codex. **Não estabelecido aqui:** plano/cota da conta, preço, compatibilidade exata de cada sistema, permissões específicas de workspace. O instrutor deve conferir acesso real antes da atividade; não inventar requisito a partir de um exemplo.

**Análise editorial:** para o público de pessoas comuns, há uma decisão anterior ao primeiro prompt: em qual produto e pasta o trabalho acontecerá. O aluno não precisa dominar CLI ou IDE para aprender essa decisão. O exemplo genérico de melhoria pode ser amplo demais para a primeira prática; uma tarefa com resultado reconhecível permite revisar sem conhecer toda a base de código. A API key é uma alternativa documental, não recomendação de acrescentar configuração de API a L01.

Pertinência: alta para primeira entrada Desktop. Pré-requisitos didáticos: pasta e projeto simples preparados, dados de exemplo e forma de abrir o resultado. Atualidade: fonte viva observada nessa data; captura é ilustração oficial, não UI da conta do aluno. Duplicação: cobre a entrada que `/docs/app` resumia; manter só este quickstart como trilha principal. Lacuna de pedido–resposta–revisão é preenchida por Prompting e pela referência de revisão já estudadas em `codex-app.md`, sem abrir novas frentes documentais.

## Prática original: primeiro resultado revisável

Competência: escolher local/produto, formular pedido limitado, confrontar resposta com mudança e refinar. Exercício vinculado a `res-codex-desktop-start`; proposta editorial, sem simular resultado já obtido.

1. Abrir o app, entrar na conta, selecionar Codex e pasta de treino. Anotar o arquivo que a atividade pretende alterar e o resultado inicial exibido. Se o acesso impedir a etapa, registrar mensagem e parar a execução dependente.
2. Pedir: “Na página desta pasta, mude o título para ‘Oficina de ideias’ e mantenha o restante. Diga qual arquivo mudou e como conferir. Se faltar algo para abrir a página, explique antes de afirmar que verificou.”
3. Ler a resposta. Localizar o arquivo citado, abrir o resultado e observar se o título apareceu na página correta. Pedir uma correção específica se houver diferença.
4. Conferir alterações e repetir a observação após a correção. Se houver Git, usar o painel de revisão no escopo explicado pelo curso; se não houver, comparar conteúdo antes/depois, sem prometer um painel que exige repositório.

Check 1: pasta e produto corretos, arquivo compatível com o pedido. Check 2: página renderizada mostra o texto e preserva uma interação existente. Check 3: resposta diferencia algo realmente conferido de algo sugerido ou impedido. Transferência: repetir em um segundo projeto e explicar quais informações de contexto tiveram de ser fornecidas novamente.

Entregável mínimo: pedido, resposta, evidência da página e um registro da revisão. Não introduzir publicação, automação recorrente, plugins ou credenciais de API como obstáculos artificiais para essa primeira experiência.

## Limites de estudo

Não instalados aplicativo/dependências; nenhuma conta, pasta do aluno, geração, revisão, teste ou publicação foi operada. O seletor ilustrativo não altera configurações reais. Links de pricing/Linux/importação e casos de uso não foram integralmente estudados; preços, sistemas específicos e esses fluxos permanecem fora da ficha.
