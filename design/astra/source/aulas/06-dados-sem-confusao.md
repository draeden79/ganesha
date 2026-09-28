# Aula 6 — Dados que não deixam tudo virar confusão

**Reserve 55–75 minutos.** Use o aplicativo em memória da aula 5. Hoje vamos preparar dados claros para depois salvar e automatizar.

## 1. Dar um lugar a cada informação

Um **registro** reúne informações sobre uma coisa. Uma tarefa é um registro. Cada informação tem um lugar, chamado **campo**. Nesta aula, cada tarefa terá identificador, nome, dias restantes e situação de conclusão.

**Exemplo preparado:** `id: A01; nome: Separar vasos; diasRestantes: 2; concluida: não`. O identificador distingue o registro; o nome permite reconhecê-lo; o número representa o prazo relativo; o estado informa se ainda falta fazer.

“Dias restantes” será um número informado manualmente: 0 significa hoje, 2 significa daqui a dois dias e -1 significa um dia de atraso. Ele **não diminuirá sozinho com a passagem do tempo**. Essa simplificação evita misturar datas e fusos horários antes de entendermos as regras. A interface deve informar esse limite.

Na anotação, descreva “Preparar mesa” com esses campos, usando um dia restante. Se colocar “amanhã” no campo numérico, traduza para 1. A frase pode ser compreensível para uma pessoa, mas queremos uma regra que compare números de modo consistente.

## 2. Distinguir tarefas com nomes iguais

Duas tarefas podem ter o mesmo nome. Se uma pessoa precisa “Revisar materiais” para duas turmas, excluir pela frase pode apagar a tarefa errada. O identificador existe para apontar exatamente qual registro mudar.

**Demonstração preparada:** `A01 / Revisar materiais / 1` e `A02 / Revisar materiais / 3` têm nomes iguais, mas são registros diferentes. Marcar A01 não deveria marcar A02.

Faça uma cópia de `app.html` como `app-antes-aula06.html`, pelo procedimento da aula 3. Depois peça:

```text
Atualize app.html mantendo o funcionamento local e em memória. Cada tarefa deve ter id único, nome, diasRestantes e concluida. Gere o id automaticamente ao criar a tarefa e use esse id nas ações, sem usar o nome como identidade. Mostre o id de forma discreta, mas legível, nesta versão didática.

Acrescente um campo Dias restantes, com ajuda: 0 é hoje; negativo indica atraso; valor informado manualmente e não atualizado pelo relógio. Aceite somente inteiros de -30 a 365. Não aceite campo vazio, palavras, decimais nem valores fora desse intervalo. Não transforme vazio em zero silenciosamente. Mantenha nome obrigatório de até 80 caracteres, após remover espaços das pontas. Permita nomes repetidos. Ao falhar a validação, preserve o que foi digitado e explique o campo a corrigir. Inclua edição dos dias restantes por tarefa, com as mesmas regras, sem trocar seu id.

Preserve adicionar, concluir, excluir e contagem de pendentes. Não acrescente salvamento, envio ou serviços. Forneça ou edite o arquivo completo.
```

No percurso Claude de conversa, forneça o HTML atual junto do pedido. No percurso Codex ou Claude com arquivos, confira qual arquivo será alterado. Salve e recarregue; as tarefas antigas em memória podem sumir, então usaremos um novo conjunto de ensaio.

## 3. Conferir identidade e significado

Cadastre duas tarefas “Revisar materiais”: uma com 1 dia e outra com 3. Observe os identificadores diferentes. Conclua a de 1 dia e confira que a outra continua pendente. Depois altere os dias da segunda de 3 para 2: o identificador dela deve permanecer o mesmo.

Se as duas mudarem juntas, diga à IA quais identificadores viu e qual ação realizou. Peça para localizar ações pelo ID único. Se o ID mudar ao editar o prazo, peça para preservá-lo durante a vida do registro. Repita o teste depois de salvar a correção.

O resultado esperado é entender por que o nome não basta para apontar uma tarefa. Não é necessário memorizar como o código gera os identificadores.

## 4. Conferir os limites antes de aceitar dados

**Validação** é verificar se uma entrada atende às regras antes de usá-la. A regra aqui é pequena e explícita; não diz que todo aplicativo de tarefas precisa do mesmo intervalo.

**Exemplo preparado:** -1 é válido e significa atraso. 1,5 não é válido porque este exercício trabalha com dias inteiros. Vazio é ausência de informação, não sinônimo de hoje.

Tente cadastrar uma tarefa com o campo de dias vazio, depois com `1.5`, depois com `366`. Nenhuma tentativa deve criar um registro. Se o próprio controle impedir digitar algum valor, registre que ele bloqueou a entrada e teste a próxima. Em seguida, use `0`: deve aceitar. Experimente também `-30` e `365`, os limites válidos.

Se o aplicativo aceitar um valor inválido, descreva o valor exato. Peça uma correção tanto na criação quanto na edição, pois são dois caminhos de entrada. Tente outra vez com um caso inválido e um válido. Se uma mensagem disser apenas “inválido”, peça que informe o intervalo e a exigência de inteiro.

## 5. Preparar a base das próximas aulas

Recarregue para começar vazio e cadastre estas quatro tarefas fictícias:

| Nome | Dias restantes | Situação |
|---|---:|---|
| Separar vasos | 0 | Pendente |
| Preparar mesa | 1 | Pendente |
| Conferir cadeiras | 3 | Pendente |
| Imprimir roteiro | -1 | Concluída |

Os IDs serão os gerados pelo seu aplicativo; não precisam ser A01, A02 etc. Você deve ver três pendências e uma conclusão. Tire uma anotação desses valores, porque a memória ainda é temporária.

Para aplicar o conceito em outro caso, imagine duas despesas com a descrição “Transporte”. Explique por que cada uma precisaria de um identificador e quais campos, além do nome, fariam sentido. Não crie um aplicativo financeiro nem forneça dados reais.

**Ponto de parada:** tarefas com o mesmo nome não se confundem, entradas inválidas recebem ajuda e você sabe o que significa cada campo do conjunto de teste.
