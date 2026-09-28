# CSV → report.md: complemento original para o Educador

Contrato alinhado ao Educador: `id,item,amount`; duas linhas; total `30.50`. O script é criação original da Ganesha, sem transcrição de código de uma fonte. Serve como referência reproduzível do instrutor e como alternativa preparada pelo curso. O aluno pode pedir ao assistente que execute; não precisa aprender Python para conferir o resultado.

Pré-requisitos do script: Python 3, arquivo UTF-8 e pasta gravável. Não instala pacote, não usa rede e não agenda nada. Se Python não estiver disponível, o assistente deve informar esse impedimento; não declarar execução. A aula pode ensinar o pedido e a conferência sem transformar a instalação de Python em condição para compreender a transformação.

Criar `input.csv` na pasta de treino com este conteúdo fictício (ponto decimal):

```text
id,item,amount
P01,Caderno,20.00
P02,Caneta,10.50
```

Pedido para o agente: “Use estes dados para gerar report.md com os registros e a soma de amount. Preserve input.csv. Valide as três colunas, IDs únicos e valores não negativos com até duas casas decimais. Se a entrada for inválida, explique o erro e preserve o último relatório válido. Execute novamente sem duplicar dados.”

Execução da referência pelo instrutor ou assistente, a partir da pasta com o script:

```sh
python3 report.py input.csv report.md
```

Abrir `report.md`: esperar dois registros e total `30.50`. Executar outra vez: o conteúdo deve continuar igual. Remover a coluna `amount` ou substituir `10.50` por `abc`: esperar mensagem de erro, código de saída 2 e relatório anterior intacto. Restaurar a entrada e executar novamente. Como variação, mudar somente `10.50` para `11.50`: esperar `31.50`, mantendo dois registros.

O script valida toda a entrada antes de substituir o relatório. Escreve um arquivo temporário na mesma pasta e o move sobre a saída; não acrescenta linhas ao relatório existente. Erro é um resultado de execução que o aluno deve ver, não um relatório de sucesso com soma parcial. Não é um sistema contábil; usa dados fictícios e contrato estreito para ensinar validação e repetição.

Verificação local executada pelo Devorador está em `validation.json`: script Python, casos normais, repetição, erros e recuperação. **Isso não certifica execução pelo Claude Desktop, Codex Desktop ou agenda.** A primeira execução agendada e a pausa continuam práticas a verificar.

Fontes de agendamento já estudadas, não autoria do script: [Claude local](https://code.claude.com/docs/en/desktop-scheduled-tasks) e [Codex](https://learn.chatgpt.com/docs/automations). Originais internos: `studies/local/schedule-claude.txt` (90 linhas) e `schedule-codex-desktop.txt` (220 linhas). A documentação Codex recomenda primeiro o teste manual; Claude oferece Manual/Run now. Máquina/app ativos e pasta disponível condicionam a rota local. Identidades: `res/ev-claude-local-schedule` e `res/ev-codex-local-schedule` (expandir o prefixo `res-` ou `ev-` ao usar no registro).

## Alternativa sem Python

O curso pode disponibilizar `report.html`: abrir no navegador, colar o CSV e clicar Gerar relatório. Conferir o total antes de usar Baixar report.md. A página é autocontida e não faz chamadas de rede; não exige terminal, pacote ou conta. Ela aceita o CSV simples deste exercício, sem aspas nem vírgulas dentro dos itens. Não é um importador geral de CSV.

O Devorador executou cinco verificações na interface real do navegador, servida localmente: total30.50, repetição idêntica, valor inválido preservando o último relatório, coluna ausente preservando o último relatório e recuperação para31.50. Abertura por arquivo direto e clique de download não foram testados; link de download foi observado. A página mantém o último relatório enquanto permanece aberta; não sobrescreve automaticamente um arquivo já baixado. O script Python é a referência para substituir report.md no disco.
