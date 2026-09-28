# Aula 9 — Sua primeira automação sob controle

**Reserve 60–80 minutos.** Você vai acrescentar ao aplicativo uma regra que prepara lembretes de tarefas próximas do prazo. Não haverá envio de mensagens nem acesso a contatos.

## 1. Escrever a regra antes de automatizar

Uma automação tem um **gatilho**, uma **condição** e uma **ação**. O gatilho inicia a execução. A condição decide em quais dados agir. A ação produz o resultado.

Aqui, o gatilho será você acionar um controle no aplicativo. A condição será “tarefa não concluída e dias restantes menor ou igual a 1”. A ação será preparar um texto de lembrete. Mesmo com início manual, a seleção e a preparação são feitas automaticamente pela regra.

**Demonstração preparada:** “Separar vasos”, com 0 dias e pendente, entra. “Conferir cadeiras”, com 3 dias, não entra. “Imprimir roteiro”, com -1 dia mas concluída, não entra. O atraso sozinho não basta: a tarefa precisa estar pendente.

Na anotação, escreva gatilho, condição e ação com suas palavras. Depois preveja o que acontecerá com uma tarefa pendente de -2 dias. Se achar que só entra 0 ou 1, releia “menor ou igual”: números negativos também entram nesta regra.

## 2. Construir primeiro uma prévia

Uma **simulação** mostra o que a regra produziria sem realizar o efeito final. Neste exercício, o efeito final também será pequeno: criar um arquivo de textos no seu computador. Antes disso, vamos olhar a seleção na tela.

Duplique o aplicativo como `app-antes-aula09.html` e exporte os dados atuais. Depois peça:

```text
Em app.html, acrescente a seção Lembretes de treino, preservando as tarefas e os recursos atuais. Inclua o botão Simular lembretes. Ao acioná-lo, selecione tarefas com concluida igual a falso e diasRestantes menor ou igual a 1. Não altere tarefas nem marque nada como concluído.

Mostre uma prévia com ID, nome, prazo informado e um texto de lembrete para cada selecionada. Para prazo negativo, explique que há atraso; para zero, diga hoje; para positivo, diga em 1 dia. Use texto simples e determinístico, sem chamar IA nem serviço externo durante a execução. Informe quantas tarefas entraram e quantas ficaram de fora, com motivo por tarefa: concluída ou prazo maior que 1. Dê prioridade ao motivo concluída quando os dois se aplicarem.

Mostre Sem lembretes para estes dados quando a seleção estiver vazia. Inclua Exportar prévia, disponível somente após uma simulação e com pelo menos um item. Exporte um arquivo de texto com os lembretes e a indicação Exemplo fictício, não enviado. Se uma tarefa mudar depois da simulação, invalide a prévia e peça nova simulação antes de exportar. Deixe explícito que nada é enviado e que os dias são manuais. Não adicione agendamento, destinatários ou conexões externas.

Forneça ou edite o arquivo completo.
```

No percurso de conversa Claude, inclua o HTML atual e salve a resposta completa. No percurso Codex ou Claude com arquivos, confira a alteração em `app.html`. Abra a nova versão e confirme que a lista existente foi preservada ou recupere sua cópia válida.

Se a ferramenta sugerir um serviço de e-mail, explique que a ação do exercício é gerar texto local. Não conecte contas para suprir uma exigência que o projeto não tem.

## 3. Comparar a seleção com uma previsão sua

Deixe o conjunto padrão de quatro tarefas como na aula 6: vasos 0 pendente; mesa 1 pendente; cadeiras 3 pendente; roteiro -1 concluída. Antes de clicar, anote quais deveriam entrar e quantas seriam.

Acione Simular lembretes. Você deve conferir os resultados contra a previsão, incluindo os motivos de exclusão. O fato de aparecerem textos bem escritos não garante que a regra selecionou os registros certos.

**Exemplo preparado de erro:** incluir “Imprimir roteiro” porque está atrasada ignora que já foi concluída. Para corrigir, descreva esse registro e peça que as duas condições sejam exigidas ao mesmo tempo.

Se o resultado divergir, confirme primeiro os valores reais da lista. Talvez você tenha deixado uma tarefa desmarcada no exercício anterior. Se os dados estiverem corretos e a seleção errada, peça a correção e repita o teste. Registre o resultado real, não apenas a previsão.

## 4. Testar o limite e o resultado vazio

Altere o prazo de “Conferir cadeiras” de 3 para 2 e simule: ainda deve ficar de fora. Altere para 1 e simule: deve entrar. Altere para -2 e simule: deve continuar entrando, agora com indicação de atraso. Esses casos testam a fronteira da regra.

Depois marque todas as tarefas como concluídas e simule. Deve aparecer a mensagem de ausência de lembretes, e exportar não deve produzir um arquivo que pareça conter ações pendentes. Volte ao conjunto padrão para seguir.

Se a prévia antiga continuar disponível depois de uma alteração, tente exportar antes de simular novamente. O aplicativo deve pedir nova simulação. Se exportar dados antigos, relate “a prévia ficou desatualizada” e peça sua invalidação ao mudar qualquer tarefa. Repita essa verificação após a correção.

## 5. Produzir um resultado local real

Simule novamente com o conjunto padrão, leia os textos e acione Exportar prévia. Localize o arquivo de texto criado pelo navegador e abra-o no editor. Confira os nomes e a marca “não enviado”. A criação desse arquivo é uma ação real no seu computador. Ela não é um envio para participantes.

Se não encontrar o arquivo, confira o destino dos downloads ou a operação de salvar. Se só existir texto na tela, marque “prévia conferida; exportação pendente”. Não chame isso de exportação concluída.

Para transferir o conceito, escreva uma regra para uma lista fictícia de livros a devolver: qual informação seria necessária, qual condição selecionaria livros e qual saída local seria útil? Não use dados reais de empréstimos.

**Ponto de parada:** você consegue explicar a regra, prever seus limites, executar a seleção e distinguir prévia, arquivo criado e mensagem enviada. A terceira ação não faz parte desta aula.
