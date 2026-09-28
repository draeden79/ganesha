# Aula 7 — Guardar, reabrir e recuperar

**Reserve 60–85 minutos.** Você vai acrescentar salvamento local e experimentar uma restauração. Use só as tarefas fictícias do curso.

## 1. Separar três coisas que parecem iguais

O arquivo `app.html` guarda as instruções do aplicativo. As tarefas são **dados** usados por essas instruções. Uma cópia do HTML não necessariamente inclui as tarefas que você cadastrou.

O **armazenamento local do navegador** pode conservar dados entre aberturas. Ele pertence àquele ambiente de navegador, pode ser apagado e não equivale a uma conta sincronizada. Em arquivos abertos diretamente do computador, o comportamento pode variar conforme o navegador e a localização do arquivo. Vamos testar no seu ambiente, sem prometer portabilidade.

**Exemplo preparado:** copiar `app.html` para outro computador pode levar o aplicativo, mas não a lista. Por isso, acrescentaremos **exportação**, que grava uma cópia explícita dos dados em um arquivo, e **importação**, que lê essa cópia.

Na anotação, escreva o que você espera que viaje em cada caso: copiar o HTML ou exportar tarefas. Se parecer a mesma coisa, volte à distinção entre instruções e dados antes de seguir.

## 2. Pedir salvamento e uma cópia verificável

Duplique o aplicativo como `app-antes-aula07.html`. **JSON** é um formato de texto para guardar dados estruturados. Um exemplo pequeno, preparado, seria `{"nome":"Separar vasos","diasRestantes":0}`. Nosso arquivo completo terá também versão, identificadores e situação.

Peça ao Codex ou Claude:

```text
Atualize app.html sem dependências nem rede. Salve as tarefas no armazenamento local do navegador após adicionar, editar dias, concluir ou excluir, usando uma chave própria deste exercício. Ao abrir, tente recuperar os dados. Se não conseguir ler ou salvar, mostre um aviso claro, preserve os dados acessíveis e não diga que salvou. Não apague silenciosamente dados inválidos já armazenados.

Acrescente Exportar dados, que gera um arquivo JSON com versao: 1 e tarefas, contendo id, nome, diasRestantes e concluida. Acrescente Importar dados por escolha explícita de arquivo. Valide o conjunto inteiro: versão 1; lista de tarefas; IDs não vazios, únicos e em texto; nome não vazio de até 80 caracteres; diasRestantes inteiro de -30 a 365; concluida como verdadeiro ou falso. Rejeite arquivos incompatíveis sem alterar a lista atual. Nunca interprete conteúdo importado como HTML ou código.

Antes de substituir a lista por uma importação válida, mostre quantas tarefas serão importadas e peça confirmação dentro do aplicativo. Permita cancelar. Não faça mistura automática de listas. Inclua aviso de que salvar no navegador não é backup e o prazo continua manual. Preserve os recursos atuais. Entregue o arquivo completo ou edite somente app.html.
```

No percurso de conversa, inclua o arquivo atual e salve o resultado completo. No percurso com arquivos, confira a alteração e recarregue. Se surgir uma pergunta sobre acesso a uma conta externa, não é necessária: peça que mantenha o exercício no navegador local.

## 3. Verificar se ficou guardado neste ambiente

Cadastre o conjunto de quatro tarefas da aula 6, se ainda não estiver presente. Marque “Imprimir roteiro” como concluída. Anote os quatro nomes, os IDs e a contagem de três pendências.

Recarregue. Depois feche a aba e reabra o mesmo `app.html` no mesmo navegador. Observe se os quatro registros, seus IDs e estados permanecem.

**Demonstração preparada de falha:** se a lista estiver vazia ao reabrir, “mas a IA disse que salvou” não resolve. Precisamos registrar navegador, modo de abertura e eventual aviso de armazenamento.

Se a persistência falhar, peça que a ferramenta revele erros de armazenamento em mensagem compreensível e não descarte dados. Não tente resolver apagando todos os dados do navegador. É possível continuar com exportação e importação manual, desde que você registre “persistência automática não confirmada neste ambiente”. Essa alternativa não vale como teste aprovado de salvamento automático.

## 4. Fazer uma restauração pequena e controlada

Com as quatro tarefas visíveis, acione Exportar dados. Localize o arquivo salvo pelo navegador; dependendo da configuração, ele pode perguntar onde gravar ou usar uma pasta de downloads. Renomeie a cópia para `tarefas-aurora-copia.json` e coloque-a na pasta de treino. Confira que o arquivo existe. Não altere seu conteúdo nesta etapa.

**Exemplo preparado:** se exportamos quatro tarefas, apagamos uma no aplicativo e importamos a cópia, devemos voltar a quatro. Isso demonstra restauração, não apenas presença de um botão.

Apague somente “Conferir cadeiras” da lista do exercício. Acione Importar dados e escolha a cópia. Primeiro cancele na confirmação: a lista deve continuar com três registros. Repita a importação e confirme: devem voltar os quatro registros originais, com os mesmos IDs e três pendências.

Se a importação duplicar tarefas, ela misturou em vez de substituir. Peça correção e repita a partir de uma lista conhecida. Se a exportação não produzir arquivo, registre o problema e solicite uma alternativa de mostrar JSON para salvar manualmente em texto simples; confirme depois que essa cópia é importável. Não use dados importantes até provar recuperação.

## 5. Recusar uma cópia inválida e continuar

No editor de texto simples, crie um arquivo `dados-invalidos.json` contendo apenas `{"versao":99,"tarefas":[]}`. Esse exemplo é propositalmente incompatível. Importe-o. O aplicativo deve explicar a incompatibilidade e manter as quatro tarefas.

Se ele esvaziar a lista, use a cópia válida para recuperar e peça para validar tudo antes de substituir qualquer dado. Repita o teste inválido e depois uma importação válida. A recuperação precisa funcionar depois do erro, não apenas antes dele.

Na anotação, registre onde está sua cópia, quantos registros ela recuperou e o que ainda depende do ambiente. Em outro contexto, como um catálogo pessoal de livros, que dados você precisaria exportar além do programa? Escreva dois campos e uma condição para reconhecer uma cópia válida.

**Ponto de parada:** sei distinguir programa e dados, tenho uma cópia cuja restauração foi testada e relato honestamente se a persistência local foi confirmada ou ficou pendente.
