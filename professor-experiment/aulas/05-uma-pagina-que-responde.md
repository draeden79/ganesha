# Aula 5 — Uma página que responde

**Reserve 60–80 minutos.** Você vai criar um aplicativo local para organizar tarefas da oficina. O site anterior continua em `site.html`; o aplicativo será outro arquivo, `app.html`, na mesma pasta.

## 1. Perceber o que muda quando você age

Uma página informativa apresenta conteúdo. Nosso aplicativo também recebe uma entrada e muda o que mostra. **Entrada** é o que você fornece, como o nome de uma tarefa. **Estado** é a situação atual, como quais tarefas existem e quais estão concluídas. **Saída** é o resultado visível, como uma lista e sua contagem.

**Demonstração preparada:** a lista está vazia; você digita “Separar vasos” e aciona Adicionar; a lista passa a ter uma tarefa pendente. Ao marcá-la como concluída, a contagem de pendentes volta a zero. Nada disso envia mensagem para alguém.

Na anotação, descreva o que deveria acontecer ao adicionar “Preparar mesa”. Inclua o que muda na lista e na contagem. Se você escrever apenas “ficar pronto”, transforme em algo que possa enxergar: “uma linha nova e uma pendência a mais”.

## 2. Pedir a primeira versão pequena

Vamos usar HTML para a estrutura, CSS para a aparência e **JavaScript** para as instruções que respondem às ações. O navegador executa essas instruções. Você não precisa aprender toda a linguagem para começar a especificar e conferir o comportamento.

Envie este pedido ao Codex ou Claude:

```text
Crie app.html na pasta de treino, separado de site.html. Quero um aplicativo local de tarefas da Oficina Aurora, em um único HTML com CSS e JavaScript internos, sem dependências, serviços, rede ou instalação.

Comece com lista vazia. Mostre um campo com rótulo Nome da tarefa, um botão Adicionar, a lista e a contagem de tarefas pendentes. Cada tarefa pode ser marcada como concluída e excluída. O texto deve continuar legível depois de concluída. Mostre Lista vazia quando não houver tarefas. Nome vazio ou só com espaços deve produzir uma orientação junto ao campo e não criar tarefa. Aceite até 80 caracteres e explique o limite.

Nesta primeira versão, guarde tudo somente na memória da página: recarregar perde a lista. Avise isso de forma visível. Não adicione salvamento ainda. Use controles compreensíveis por teclado e rótulos visíveis. Renderize o nome como texto, sem interpretar HTML digitado pelo usuário.

Se pode editar arquivos, crie apenas app.html. Se não, devolva o conteúdo completo para eu salvar. Explique em linguagem simples como abrir e conferir, sem afirmar que eu já executei.
```

No percurso com arquivos, confirme que `site.html` não foi substituído. No percurso de conversa, salve o bloco completo como `app.html` seguindo a aula 2. Abra esse arquivo no navegador.

Se a ferramenta propuser servidor ou instalação, peça uma versão de arquivo único que abra diretamente no navegador. Se entregar só parte do código, peça o arquivo completo; juntar trechos sem entender onde entram não é requisito desta aula.

## 3. Experimentar um ciclo completo

Primeiro, observe a lista vazia. Digite “Separar vasos” e adicione. Depois acrescente “Preparar mesa”. Você deve ver duas tarefas pendentes. Marque a primeira como concluída: a contagem deve passar a uma. Exclua a segunda: deve restar uma tarefa concluída e nenhuma pendente.

**Exemplo preparado de comparação:** duas linhas não significam duas pendências se uma já foi concluída. A contagem deve representar o que promete, e não simplesmente o tamanho da lista.

Anote o resultado real de cada ação. Se uma ação apagar a linha errada ou a contagem não acompanhar a lista, descreva a sequência exata à IA. Peça para corrigir apenas o comportamento divergente e repita o ciclo a partir de uma lista vazia. Para esvaziar nesta versão, basta recarregar, pois ainda não há persistência.

No percurso de conversa, substitua o conteúdo inteiro do arquivo pela versão corrigida, salve e recarregue. No percurso de edição, confira se a mudança foi aplicada e então recarregue. Uma resposta “corrigido” sem nova tentativa não fecha o teste.

## 4. Tentar uma entrada que não serve

Erros de preenchimento acontecem. O aplicativo deve ajudar a pessoa a se recuperar sem criar dados ruins.

**Demonstração preparada:** ao tentar adicionar um nome vazio, uma mensagem como “Escreva o nome da tarefa” ajuda. “Erro 42” não explica o próximo passo.

Tente adicionar o campo vazio e depois apenas espaços. A lista deve permanecer igual e uma orientação deve aparecer. Em seguida, digite um nome válido e tente de novo. O aplicativo deve permitir a correção; não basta bloquear.

Digite também o texto literal `<teste>`. Ele deve aparecer como texto na tarefa, se aceito pelo limite, sem desaparecer como marcação. Se algo se comportar de modo diferente, peça para inserir nomes na página como texto simples. Depois exclua essa tarefa de ensaio.

Se a mensagem de erro continuar visível mesmo após uma adição bem-sucedida, peça para removê-la quando a entrada for corrigida. A ajuda precisa acompanhar a situação atual.

## 5. Ver a diferença entre tela e armazenamento

Adicione novamente uma tarefa e recarregue a página. Nesta versão, ela deve desaparecer. **Memória da página** é temporária; fechar ou recarregar encerra aquele estado. Você não fez nada errado: esse é o limite declarado da primeira versão.

Se os dados persistirem, a implementação não seguiu o pedido. Peça para explicar onde os guardou e remover esse salvamento desta versão de estudo. Vamos acrescentar persistência deliberadamente na aula 7.

Para transferir a ideia, descreva em sua anotação uma lista de compras com os mesmos três movimentos: entrada, mudança de estado e saída. Explique o que “concluído” significaria nesse contexto. Se você só trocar o título, pense no significado da ação: em compras, pode ser “comprado”.

**Ponto de parada:** consigo demonstrar adicionar, concluir, excluir, corrigir uma entrada inválida e explicar por que recarregar apaga esta lista.
