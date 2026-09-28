# Revisão editorial — automação 0.3.0

Data: 2026-09-28. Escopo: `automation.pt-BR.json` e `automation.en.json`, três aulas de dez etapas. Autoria original da Ganesha, com exemplos explicitamente simulados e práticas externas autodeclaradas. Revisão humana de idioma e piloto com iniciantes permanecem pendentes. Tempos de 25/35/30 minutos são estimativas editoriais, não medidas de uso.

## Progressão e revisão didática

- `automation-input`: primeiro identificar entrada/transformação/saída; depois criar CSV, definir contrato, calcular gabarito independente, preparar cópias inválidas, criticar um plano que omite erros e preparar recuperação. Não declara programa executado.
- `automation-report`: escolher Python ou HTML, verificar ambiente sem instalação presumida, pedir implementação, executar e abrir saída, repetir, testar dois erros, corrigir quando necessário, variar dados válidos e restaurar. Diferencia explicitamente substituição de arquivo no Python de prévia/download no HTML. O HTML precisa de interação humana e não é promovido automaticamente a rotina desassistida.
- `automation-schedule`: revisar os quatro grupos de evidência antes de discutir agenda; escrever instruções duráveis; especificar horário, fuso e pasta; mapear condições de ferramenta; interpretar histórico; ensaiar pausa e retomada. A aula começa com rascunho e oferece ativação real opcional pelo aluno quando os quatro grupos de teste passaram, Python está disponível e há acesso. Inclui ensaio manual, um disparo acompanhado, histórico/saída e pausa; sem condições, o aluno permanece em simulação e declara agenda não ativada. O autor não criou nem modificou agendas durante a autoria.

Cada aula tem sete práticas distintas, duas avaliações nas posições 4 e 9, três opções com feedback específico e uma entrega final. Os objetivos por etapa não repetem o resultado da aula. Posições corretas: `c/a`, `b/c`, `a/b`. Nenhuma prática exige inventar falha: testes controlados são preparados em cópias; um caso já aprovado pode ser registrado como tal.

Os dois idiomas preservam slugs, tipos/modos, pré-requisitos, referências, códigos literais, alternativas e respostas corretas. Nomes de arquivos, cabeçalho e dados permanecem literais. Corpos possuem entre 46 e 63 palavras nesta contagem por espaços; o limite editorial de tamanho foi respeitado.

## Fontes e limites da atribuição

A entrada e o contrato de dados são criação editorial original, por isso `automation-input.sourceRefs` é uma lista vazia. Os arquivos internos de referência não receberam IDs externos inventados. `automation-report` referencia `res-codex-prompting` apenas para método de pedido delimitado e verificação; não atribui a essa fonte o código CSV ou seus resultados.

Referência original de implementação consultada integralmente no worktree de pesquisa:

- `content/research/sprint-csv/report.py`: valida entrada inteira, identifica erros e só depois substitui a saída; padrão decimal e IDs únicos.
- `content/research/sprint-csv/report.html`: alternativa simples por colagem; preserva última prévia enquanto a aba fica aberta; download não sobrescreve automaticamente arquivos anteriores. Não é importador geral de CSV.
- `content/research/sprint-csv/README.md` e `validation.json`: documentação e verificações anteriores. Alguns exemplos desses arquivos usam outros IDs/itens; as aulas usam exclusivamente `vendas.csv` com `1,Caderno,10.50` e `2,Curso,20.00`.

Agendamento usa `res-claude-local-schedule` e `res-codex-local-schedule`:

- [Claude Desktop: tarefas locais](https://code.claude.com/docs/en/desktop-scheduled-tasks), original textual `studies/local/schedule-claude.txt`, 90 linhas: localização da rotina local, pasta, Manual/Run now, condições locais, histórico, permissões e Active/Paused. A aula não transfere a recomendação de autorização ampla da fonte ao aluno.
- [Codex no app: tarefas agendadas](https://learn.chatgpt.com/docs/automations), original `studies/local/schedule-codex-desktop.txt`, 220 linhas: teste manual antes da agenda, contexto local, disponibilidade, resultados em Scheduled e revisão inicial. Conteúdo textual consultado, sem certificação integral dos vídeos ou demonstração da instalação do aluno.

A navegação específica aparece como variante em `automation-schedule/tool-conditions`. Rótulos são fatos documentais sujeitos à versão; não alegamos ter observado essas telas em uma conta real durante esta autoria. O tratamento de tarefas perdidas no Claude não é generalizado ao Codex.

## Verificação executada nesta autoria

Em 2026-09-28, a função `run` da referência Python foi executada diretamente em diretório temporário com o CSV exato do currículo. Casos aprovados:

1. Entrada original: `Registros: 2`, `Total: 30.50`.
2. Repetição: saída textual idêntica.
3. Coluna `amount` ausente: erro e saída anterior intacta.
4. Valor `abc`: erro e saída anterior intacta.
5. Troca de `10.50` por `11.50`: `Total: 31.50`.
6. Restauração da entrada: saída original, `Total: 30.50`.

Escopo dessas provas: função Python de referência em arquivos temporários. Não houve execução das aulas dentro de Claude Desktop ou Codex Desktop, criação/execução de agenda ou teste novo de download HTML. As instruções não afirmam que um assistente implementará corretamente na primeira tentativa.

Validação estrutural: dois JSONs válidos; três aulas cada; dez etapas; checks nos índices 3/8; sete práticas por aula; critérios presentes; feedback de todas as alternativas; objetivos específicos; paridade dos identificadores e dos campos entre idiomas. Nenhum arquivo do pacote canônico 0.2.0 ou do aplicativo foi alterado.

## Correção P0 de escopo — ativação acompanhada

A restrição de não operar agendas aplica-se ao autor nesta tarefa. O currículo agora orienta ativação opcional pelo aluno com pré-requisitos completos, ensaio Manual/Run now no Claude ou conversa comum no Codex, horário próximo suportado e fuso conferido, um disparo observado sem garantia de pontualidade, comparação da saída e pausa da tarefa correta. Pausa não é confundida com interrupção de uma execução em andamento. Ausência de acesso, teste aprovado ou Python mantém a análise simulada e a declaração de não ativação. IDs e checks foram preservados; as primeiras etapas foram classificadas como prática simulada conforme instrução do editor.
