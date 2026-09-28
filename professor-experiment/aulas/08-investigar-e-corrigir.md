# Aula 8 — Quando não funciona: investigar e corrigir

**Reserve 45–70 minutos.** Vamos praticar uma investigação curta. Use o aplicativo da aula 7 e sua cópia de dados válida. Você não precisa ler todo o código para relatar um erro bem.

## 1. Distinguir sintoma, hipótese e evidência

**Sintoma** é o que você observa: “a contagem mostra duas pendências, mas há só uma”. **Hipótese** é uma explicação possível: “talvez a contagem inclua concluídas”. **Evidência** é um fato observado ao testar: “ao concluir a tarefa, o número não mudou”.

**Demonstração preparada:** “O JavaScript está quebrado” parece técnico, mas não informa como chegar ao problema. “Adicionei duas tarefas, concluí uma e a contagem continuou em dois” permite reproduzir o caso.

Na anotação, transforme “não funciona” em uma frase com ação e observação. Use um problema real que você encontrou ou o exemplo desta etapa. Se estiver adivinhando a causa, marque a frase como hipótese.

## 2. Preparar um laboratório que não misture dados

Antes de investigar, exporte os dados atuais e confira que a cópia existe. Duplique `app.html` para `app-laboratorio.html`. Copiar o arquivo pode manter a mesma chave de armazenamento; portanto, **não abra ainda a cópia no navegador**.

No Codex ou Claude, peça:

```text
Prepare somente app-laboratorio.html para um exercício de diagnóstico. Troque a chave de armazenamento local por uma chave exclusiva do laboratório, diferente da usada por app.html. Não leia, modifique nem apague a chave original. Mostre um aviso Laboratório de treino. Mantenha o restante do comportamento. Diga qual arquivo foi alterado e quais chaves ficaram separadas. Não execute o aplicativo por mim.
```

No percurso de conversa, forneça a cópia do HTML, peça o arquivo completo atualizado e salve somente no laboratório. Agora abra o laboratório e importe sua cópia válida. Confira os quatro registros.

Se não conseguir confirmar a separação de armazenamento, peça uma versão do laboratório **sem persistência**, inicializada por importação e funcionando só em memória. Você pode fazer a investigação assim. Não arrisque a lista original para tornar o exercício mais realista.

## 3. Escolher um defeito limitado

Se já há um erro reproduzível no laboratório, use-o. Se tudo funciona, vamos criar uma falha didática conhecida. Isso é uma **demonstração preparada no seu arquivo de laboratório**, não a descoberta de um defeito espontâneo.

Peça à IA:

```text
Somente em app-laboratorio.html, introduza este defeito de treino: a contagem rotulada Tarefas pendentes deve mostrar o total de tarefas, incluindo concluídas. Não mude nenhum outro comportamento nem o armazenamento de app.html. Mantenha o aviso de laboratório. Forneça ou edite apenas o arquivo de laboratório.
```

Salve e recarregue o laboratório. Com as quatro tarefas do conjunto padrão, incluindo uma concluída, a contagem defeituosa deve mostrar quatro em vez de três. Se não aparecer, confirme qual arquivo está aberto e se há uma tarefa concluída. Se a modificação não foi aplicada, não invente um resultado; peça para ajustar apenas o defeito didático.

## 4. Pedir uma correção apoiada no que aconteceu

Antes de pedir a correção, escreva seu relato. Um bom relato contém o arquivo, os passos mínimos, o esperado e o observado.

**Exemplo preparado:** “Em app-laboratorio.html, importei quatro tarefas, uma concluída. Esperava três pendências; vejo quatro. Ao desmarcar a concluída, vejo quatro, que nesse caso está correto. Minha hipótese é que a contagem usa todas as tarefas.”

Envie seu relato real e acrescente:

```text
Investigue essa divergência e faça a menor correção que restabeleça a contagem de pendentes. Explique a causa em linguagem simples e quais comportamentos devo conferir depois. Preserve as tarefas, a importação, a exportação e a separação do laboratório. Não reescreva o aplicativo inteiro por preferência estética.
```

No percurso com edição, confira qual arquivo mudou. No percurso de conversa, salve a versão completa no laboratório. A explicação esperada é algo como “a contagem incluía tarefas concluídas; agora considera apenas as não concluídas”. Se vier uma explicação longa que você não entende, peça uma frase ligada ao seu caso de quatro tarefas.

## 5. Conferir a correção e o que já funcionava

Volte ao conjunto de quatro tarefas. Deve haver três pendências. Desmarque “Imprimir roteiro”: quatro. Marque-a novamente: três. Exclua uma tarefa pendente: duas. Importe a cópia original: três outra vez. Esses testes verificam a contagem em caminhos diferentes.

Conferir se algo que já funcionava continua funcionando é um **teste de regressão**. Neste caso, tente também adicionar um nome vazio e cancelar uma importação: o primeiro deve ser recusado; o segundo não pode alterar a lista.

Se a correção resolver o número mas quebrar a importação, relate os dois fatos. Peça para preservar o cálculo corrigido e reparar a importação. Repita os testes afetados, em vez de aceitar a primeira melhora como conclusão total.

Por fim, reabra `app.html` e confira que seus dados continuam lá conforme o modo de persistência comprovado na aula 7. A falha criada só no laboratório não precisa ser “corrigida” no original. Se o defeito era real e também existe no original, exporte os dados e peça a mesma correção pontual nele, repetindo as verificações.

**Ponto de parada:** você tem um relato reproduzível, distingue hipótese de observação e consegue mostrar uma correção verificada. A anotação deve dizer se o erro era real ou introduzido para treino.
