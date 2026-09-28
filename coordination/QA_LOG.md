# Evidências de QA do Diretor

Data: 2026-09-28. Dados usados são fictícios. Nenhuma execução real de Claude/Codex foi feita pelo Ganesha ou por este teste.

## Preview de desenvolvimento — rodada inicial

Origem: `http://127.0.0.1:3100/course/pt-BR`, aplicativo ainda sem commit final, baseado em currículo `153c4d8` e design `e915746`. Resultados abaixo são preliminares; alterações durante HMR exigem repetir o percurso na build estável.

| Cenário | Observação | Resultado |
| --- | --- | --- |
| Abrir aula | 7 telas; uma tela por etapa; foco no título após avanço | Passou na amostra |
| Prática vazia | Botão de registro e continuar desabilitados | Passou |
| Rubrica completa + texto fictício | Registro liberou continuar e mostrou aviso de prática guiada | Passou |
| Reload após prática | Texto, critérios e estado de conclusão restaurados | Passou |
| Primeira avaliação errada | Feedback específico, contador 1, continuar desabilitado | Passou |
| Primeira avaliação correta após erro | Feedback específico, contador 2, continuar liberado | Passou |
| Execução externa | Aviso explícito de execução fora do Ganesha e autoavaliação | Passou; dados sintéticos de QA |
| Segunda avaliação errada | Feedback específico e avanço bloqueado | Passou |
| Atualização do app durante teste | Formato de tentativa mudou; progresso de desenvolvimento foi invalidado | Repetir na build estável; nenhuma versão publicada afetada |
| Console | Nenhum erro/warning capturado nas consultas feitas | Amostra preliminar |

## Achados encaminhados

- QA-01: recuperação de JSON inválido/versão incompatível deve ser visível e preservar cópia. Construtor implementando status/backup e testes.
- QA-02: progresso restaurado deve derivar conclusão das tentativas/critérios validados. Construtor adicionou evaluator e critérios ao autorrelato; requer novo teste no formato estável.
- QA-03: evitar sobrescrita silenciosa por uma aba com snapshot antigo. Construtor informado; revisores passam a usar origens distintas.
- QA-04: “1 aulas” na visão geral. Construtor corrigirá para rótulo localizado seguido da quantidade.

## Próxima rodada

Construtor entrega hash e build estável na porta 3101. Diretor repete percurso inteiro, troca de ferramenta/locale e bloqueio de conclusão sem duas verificações. Artista verifica visual, mobile e RTL; Construtor testa persistência, recuperação, acesso e build. A auditoria dos 11 catálogos depende do lote final do Educador.

## Atualização antes da build estável

- Construtor informou 13/13 testes unitários e checagem de tipos aprovados; ainda sem commit de aplicativo integrado no Diretor.
- Diretor leu os testes de acesso, conteúdo e progresso. Incluem acesso fechado, ausência de fallback, duas avaliações, recuperação de dados inválidos, validação de rubrica e separação por versão/ferramenta.
- Solicitado teste adicional da união/ordem/deduplicação de tentativas da mesma etapa em duas abas e concordância com a conclusão restaurada. O teste inicial de aba antiga cobria somente rascunho.
- Artista detectou dicas/critérios ocultos e nomes de etapas ausentes em mobile; Construtor está corrigindo.
- `127.0.0.1:3100` fica reservado à prévia do usuário. Diretor interrompeu interações nessa origem; repetição funcional será na porta 3101.

## Auditoria canônica dos 11 idiomas

Lote de origem `4525851`, integrado como `708c7c9`, conferido com `python3 coordination/validate_content.py` sobre o registro de 23 fontes/16 evidências: **passou**. Uma aula, sete etapas e duas verificações; 112/112 mensagens em cada um dos 11 locales, nenhuma chave pendente/ausente/desatualizada. Relatório reproduzível em `CONTENT_AUDIT.json`.

Todas as traduções declaram revisão humana pendente; presença e versão das chaves não comprovam qualidade linguística. Aula `ready`, curso `preview` 0.1.0. Renderização/RTL e catálogos da UI serão validados na build do aplicativo.

## Baseline integrado e nova direção visual

Aplicativo `f5319e9` integrado como `31b2dd4`, CSS `96a9edb` como `d63c674`. Diretor executou com sucesso os 14 testes, check:content dos 11 idiomas, TypeScript e build Next sobre a base integrada. O build precisou de dependências locais porque Turbopack rejeita node_modules apontando por symlink para outro worktree.

O QA final de navegador começou pela primeira tela, mas foi interrompido pelo novo pedido do usuário: usar o Ganesha Desktop aberto no Mac como referência de design. Não houve nova conclusão ponta a ponta nessa rodada. O Artista inspeciona o desktop e o Construtor refaz a interface depois; ver `DESKTOP_DESIGN_DIRECTIVE.md`.

## Demonstração separada da liberação pedagógica

Commits do Construtor `92c4345` e `b9c19c7` integrados como `d333203` e `ac53253`. A demonstração usa escopo explícito para `lesson.first-request`; o adaptador normal exige simultaneamente ID liberado e estado `ready`. Revisão do Diretor identificou e fez corrigir a aceitação indevida de um rascunho que permanecesse por inconsistência na lista de liberação.

Diretor executou 16 testes, TypeScript, check:content nos 11 idiomas e build Next, todos aprovados. Os testes distinguem rascunho sem liberação, rascunho indevidamente listado, aula pronta e aula planejada; somente o caminho explícito de demonstração admite rascunho. Rotas de acesso protegido continuam fechadas. Aviso de conteúdo e traduções em revisão foi atualizado nos 11 idiomas. IDs, versão e chaves de progresso não mudaram.

Esta verificação é técnica e não certifica estudo das fontes. Auditoria pedagógica do Educador e alteração canônica para rascunho estão sendo coordenadas; a auditoria estrutural histórica acima não comprova maturidade pedagógica atual. Novo QA visual depende da entrega baseada no Ganesha Desktop.

Atualização após integração de `f51ae82` como `d881c25`: L01 agora está em `draft` e a lista de liberação está vazia. Os 16 testes e a cobertura dos 11 idiomas passaram novamente com esses dados. O relatório atual `CONTENT_AUDIT.json` falha somente por `course: no released lesson IDs to audit`, conforme esperado; nenhuma pendência de chave/versão foi encontrada. O preview explícito permanece navegável no modelo, sem promover o conteúdo a liberado.
