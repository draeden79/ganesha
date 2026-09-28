# Complemento indispensável ao percurso mínimo

Entrega ao Educador em 28/09/2026, sprint com publicação prevista pelo Diretor para 20:48 UTC. **Receitas originais propostas; não foram executadas nas duas ferramentas nesta pesquisa. A referência Python de CSV foi testada localmente, conforme relatório separado.** Textos oficiais estudados integralmente sustentam as operações indicadas; não sustentam uma alegação de resultado real. L01 continua terminando num plano revisado.

## 1. Site: construir, testar e corrigir

Pré-requisitos: app acessível e autenticado, pasta de treino selecionada, navegador, textos do aluno e uma imagem própria ou autorizada. Reutilizar o plano da L01. Limitar a primeira página a HTML/CSS/JavaScript simples, sem banco, login, API ou compilação.

Pedido original: “Implemente o plano aprovado em uma página estática nesta pasta. Crie index.html e os arquivos locais necessários. Mostre como abrir a página. Ela deve ter título, três serviços e um botão Contato que exiba aulas@example.com na página. Preserve os textos aprovados e explique qualquer informação que falte.”

O aluno abre o resultado, confere os textos e clica em Contato. Depois verifica em janela estreita se o botão continua visível. Se falhar, informa **passos, esperado e observado**: “Abri a página e cliquei em Contato. Esperava ver aulas@example.com, mas o texto não apareceu. Corrija e preserve o restante.” Após a alteração, repete exatamente o clique e a conferência em janela estreita. Se não ocorrer erro, faz uma pequena mudança deliberada de texto e confere que o contato continua aparecendo; não inventar uma falha observada.

Aceite: resultado aberto, contato correto e conteúdo legível após a mudança. Evidência: página e registro do reteste. Fonte metodológica: `res-codex-prompting` / `ev-codex-prompting`, [Prompting](https://learn.chatgpt.com/docs/prompting); `res-claude-plan-build-review` / `ev-claude-plan-build-review`, [workflow](https://academy.claude.com/courses/claude-code-101/the-explore-plan-code-commit-workflow). Texto e transcrição integral estudados; o workflow é CLI, sem audiovisual integral certificado. O caso Riley serve como comentário de correção, não como instalação Desktop.

## 2. App mínimo: uma lista que guarda alterações

Extensão original da página, sem novo serviço: pedir uma lista de tarefas com título e estado “pendente/concluída”, adicionar, concluir e remover; guardar os dados no navegador utilizado. O aluno deve entender esse limite: a prática não promete conta, banco remoto ou sincronização entre dispositivos. Pedir ao agente que abra a prévia e usar o mesmo endereço e perfil de navegador nos testes.

Testes obrigatórios: enviar título vazio e confirmar que não cria item; adicionar título válido e conferir contagem; mudar o estado, recarregar e confirmar retorno; remover e confirmar estado vazio. Se o retorno falhar, pedir correção com esse roteiro e repetir. Persistência só pode ser marcada como concluída após esse teste. Não aceitar campos desenhados como prova de que salvam dados.

Esta receita é proposta pedagógica. O estudo `studies/app/G9o8eoHzpxc.md` fundamenta **a lacuna** do tutorial selecionado, não uma implementação validada de armazenamento. Se o sprint não executar os testes, rotular como prática guiada a realizar, sem dizer que a demonstração foi testada.

## 3. Automação: CSV fictício → relatório verificável

Pré-requisitos: pasta local, acesso a arquivos pela ferramenta e dados de treino. O Educador fornece o CSV abaixo; nenhuma integração, email ou SMS é necessária.

```text
id,item,amount
P01,Caderno,20.00
P02,Caneta,10.50
```

Pedido original: “Leia input.csv e crie report.md com os registros e a soma de amount. Preserve a entrada. Exija as colunas id,item,amount, IDs únicos e valores não negativos com ponto e até duas casas decimais. Se houver erro, explique a linha e preserve o último relatório válido. Ao repetir, recalcule, sem acumular.”

Gabarito: **2 registros, total 30.50**. Abrir o relatório e comparar; executar outra vez e exigir os mesmos totais. Numa cópia, trocar `10.50` por `abc`: esperar diagnóstico e preservação do relatório válido. Restaurar o valor e repetir. Esses critérios foram verificados no script original de referência em `sprint-csv/`, com execução local e evidência em `validation.json`; a execução por Claude/Codex ou agenda permanece não comprovada.

Depois do êxito manual, configurar periodicidade, fuso, pasta e destino da saída. **Claude:** Code → Routines → New routine → Local; Manual/Run now para conferir, depois agenda; Active/Paused para interromper. **Codex:** pedir na conversa a tarefa, horário/fuso e se continuará ali ou será independente; revisar a configuração e as primeiras saídas em Scheduled. Máquina ligada, app aberto e pasta disponível são condições da rota local. Registrar a primeira execução efetiva e pausar ao finalizar o exercício. Configuração salva não comprova execução.

Fontes: `res-claude-local-schedule` / `ev-claude-local-schedule`, [Claude local](https://code.claude.com/docs/en/desktop-scheduled-tasks), original 90 linhas, especialmente 35–77; `res-codex-local-schedule` / `ev-codex-local-schedule`, [Codex](https://learn.chatgpt.com/docs/automations), texto Desktop 220 linhas, especialmente 74–106. Ambos integralmente lidos; multimídia Codex pendente. Detalhes e hashes: `studies/scheduling/`.

## 4. Publicar e atualizar o site estático

Pré-requisitos: página funcional, pasta com `index.html` na raiz e ativos locais, conta/equipe Netlify apropriada. Esta receita não cobre backend nem projetos que precisem compilar antes do upload.

Entrar na conta/equipe, abrir [Netlify Drop](https://app.netlify.com/drop), enviar a pasta e aguardar a URL. Conferir a visibilidade; se privada e o papel/política permitir, usar Make public após deploy de produção bem-sucedido. Abrir a URL em navegador sem a sessão do dono e testar conteúdo e botão Contato. Alterar uma frase local para “Versão B”, testar, enviar a pasta atualizada em **Production deploys do mesmo projeto** e verificar a mesma URL como visitante.

Aceite: visitante vê a página e a versão nova preserva o botão Contato. Se pedir login, conferir visibilidade/papel; se página vier vazia, conferir pasta e arquivos; se versão for antiga, conferir projeto/pasta antes de reenviar. Não resolver bloqueio de acesso mudando políticas globais da equipe.

Fontes integrais: `res-netlify-drop-static` / `ev-netlify-drop-static`, [Drop Quickstart](https://docs.netlify.com/start/quickstarts/netlify-drop-quickstart/), original 86 linhas, 18–42 e 60–70; `res-netlify-project-visibility` / `ev-netlify-project-visibility`, [Project visibility](https://docs.netlify.com/manage/security/secure-access-to-sites/project-visibility/), 112 linhas, 45–64. PNGs conferidas; GIFs parcialmente. **Upload de atualização publica diretamente em produção. URL existente não garante acesso público.** Nenhum deploy real foi feito pelo Devorador. Hashes e escopo: `studies/publishing/manifest.json`.
