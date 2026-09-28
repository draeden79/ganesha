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
