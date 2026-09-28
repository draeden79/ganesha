# Aula 10 — Rodar de novo sem bagunçar

**Reserve 60–85 minutos.** Vamos melhorar a automação para que duas execuções não criem dois registros do mesmo lembrete. Continuamos sem enviar mensagens e sem agendamento.

## 1. Descobrir o problema da repetição

Na aula anterior, você pode exportar a mesma prévia duas vezes. Isso cria dois arquivos, mas não mantém um histórico do que já foi preparado. Em um sistema de envio real, repetir sem cuidado poderia incomodar uma pessoa com mensagens duplicadas.

Vamos acrescentar uma **fila local de lembretes preparados**. Fila, aqui, é uma lista registrada no aplicativo, não uma caixa de saída conectada a alguém. Cada tarefa poderá entrar uma vez na regra chamada `prazo-v1`. A chave de repetição será a combinação de ID da tarefa e nome da regra.

**Demonstração preparada:** tarefa A01 + regra prazo-v1 já registrada não entra de novo. Outra tarefa A02 com o mesmo nome pode entrar, pois tem identidade diferente. Se A01 mudar de prazo, continuará sendo a mesma tarefa e não gerará um segundo lembrete nesta versão.

Na anotação, decida o que deveria acontecer ao clicar duas vezes seguidas. Se você espera dois lembretes, releia o propósito: nossa regra é uma preparação por tarefa. Lembretes recorrentes exigiriam outra regra, fora deste exercício.

## 2. Guardar também o histórico

Exporte uma cópia válida da versão atual e duplique o HTML como `app-antes-aula10.html`. Agora haverá mais dados: tarefas e histórico. O formato da exportação passará de versão 1 para versão 2. **Versão de formato** informa como interpretar os dados; não é uma nota de qualidade.

Peça à ferramenta:

```text
Atualize app.html para uma fila local de lembretes preparados. Preserve todas as tarefas existentes ao acrescentar um histórico inicialmente vazio. A regra continua: tarefa pendente com diasRestantes <= 1, chamada prazo-v1. Cada combinação id da tarefa + prazo-v1 só pode ser registrada uma vez. Nomes repetidos com IDs diferentes continuam distintos.

Simular deve mostrar candidatos novos, itens já preparados e excluídos por condição. Só o botão Confirmar preparação registra os novos candidatos no histórico. Mostre antes a quantidade e permita cancelar. Antes de confirmar, recalcule a seleção com os dados atuais; se mudou desde a prévia, exija nova simulação. Bloqueie cliques repetidos durante a confirmação e confira a chave de repetição ao inserir.

Cada entrada do histórico deve guardar a chave, id da tarefa, regra, nome e prazo no momento da preparação, texto e instante do registro. Esse instante é registro de execução, não recalcula o prazo. Não remova o histórico ao concluir, editar ou excluir a tarefa original. Mostre sempre Preparado localmente, não enviado. A exportação de lembretes pode produzir novamente o mesmo arquivo sem acrescentar registros ao histórico.

Salve tarefas e histórico como um conjunto consistente no armazenamento local. Se falhar o salvamento, não mostre sucesso nem confirme a preparação: mantenha o estado anterior e mostre uma mensagem para tentar novamente ou exportar os dados acessíveis. Não envie nem conecte serviços.

Atualize exportação e importação para JSON versao: 2 com tarefas e historico. Valide todo o arquivo antes de substituir: as regras de tarefas anteriores; histórico com campos tipados, regra prazo-v1 e chaves únicas coerentes com id+regra. O histórico pode conter uma tarefa que já foi excluída. A importação exige confirmação e permite cancelar, sem misturar dados. Recuse outras versões com explicação, preservando o estado atual. Explique que a cópia versão 1 deve ser aberta na versão anterior do app para recuperação, não importada silenciosamente como versão 2.

Mantenha arquivo único local. Forneça ou edite o arquivo completo e explique como testar repetição.
```

No percurso de conversa, envie o HTML atual e salve a versão completa. No percurso com edição, confira a alteração e a preservação dos dados. Se as tarefas desaparecerem, volte à cópia anterior do programa e dos dados antes de tentar a mudança outra vez. Não sobrescreva seu único backup com uma lista vazia.

## 3. Executar duas vezes e comparar

Comece com o conjunto padrão e histórico vazio. Simule; devem existir dois candidatos novos. Na primeira confirmação, cancele e confira que o histórico permanece vazio. Simule outra vez e confirme: devem aparecer dois registros preparados localmente.

Simule e confirme novamente. O histórico deve continuar com dois registros, e os dois candidatos originais devem estar identificados como já preparados. Exporte a lista de textos duas vezes; isso também não deve aumentar o histórico.

**Exemplo preparado de erro:** mostrar “já preparado” na tela, mas inserir outra linha no histórico, não resolve a repetição. É a quantidade e a identidade dos registros que você confere.

Se houver duplicatas, informe os IDs, a regra e a sequência de cliques. Peça que a verificação da chave aconteça na inserção, não só na apresentação. Recupere um estado de ensaio conhecido e repita depois da correção.

## 4. Testar mudança, reabertura e recuperação

Altere “Conferir cadeiras” para 1 dia. Simule e confirme: deve entrar exatamente um novo registro, totalizando três. Mude o nome ou o prazo de uma tarefa já preparada, se a interface permitir, e simule novamente: ela não deve gerar outro registro. O histórico conserva o retrato do momento da preparação.

Exporte agora a cópia **versão 2**. Reabra o mesmo aplicativo e confira os três registros se a persistência local estiver funcionando. Importe a cópia versão 2 e simule: não devem surgir os mesmos três como novos. Teste também uma tentativa de importar `dados-invalidos.json`; o estado deve permanecer igual.

Se o navegador impedir salvamento, registre esse caminho como bloqueado. Peça que a ferramenta explique como representar essa falha em uma cópia de laboratório, sem apagar armazenamento real: a tentativa deve mostrar erro e não acrescentar histórico. Uma falha simulada verifica a reação prevista; não prova que todas as falhas reais foram cobertas. Se não fizer esse ensaio, deixe-o pendente.

Não abra a versão antiga e a nova alternadamente para escrever no mesmo armazenamento. As cópias antigas são material de recuperação; se precisar usá-las, faça isso em um ambiente de treino separado, com apoio para separar a chave como na aula 8.

## 5. Entender a fronteira antes de conectar o mundo

Nesta solução, nada funciona com o navegador fechado. O gatilho é seu clique. Acrescentar um horário programado exigiria um ambiente que execute naquele horário; acrescentar envio exigiria destinatário, serviço conectado, autorização e tratamento de falhas de entrega. O histórico local não prova que uma mensagem chegou.

**Demonstração preparada:** se um envio externo acontecesse e o registro local falhasse depois, repetir poderia enviar de novo. Nosso teste de fila local não resolve esse problema distribuído. Por isso, não basta trocar “exportar texto” por “enviar” e declarar pronto.

Na anotação, descreva o que muda quando a ação passa a afetar outra pessoa. Inclua um exemplo de teste com destinatário fictício ou ambiente de teste antes de qualquer envio real, e quem autorizaria o envio. Você não precisa configurar esse sistema agora.

**Ponto de parada:** a regra pode ser repetida sem duplicar o histórico local nas condições testadas; você sabe recuperar tarefas e histórico e reconhece por que isso não garante envio externo seguro ou execução agendada.
