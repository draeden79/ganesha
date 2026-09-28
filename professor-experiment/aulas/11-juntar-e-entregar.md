# Aula 11 — Juntar as partes e passar para outra pessoa

**Reserve 55–80 minutos.** Você vai organizar uma cópia de entrega local. O objetivo é permitir que outra pessoa entenda como abrir e conferir o projeto, sem depender de sua memória.

## 1. Reconhecer o papel de cada parte

Temos um site que informa, um aplicativo que guarda tarefas e uma automação que prepara lembretes. Eles podem participar do mesmo percurso, mas não precisam ter todos os controles na mesma tela.

**Exemplo preparado de percurso:** uma pessoa abre a apresentação da oficina, escolhe “Abrir organizador de treino”, cadastra uma tarefa e simula os lembretes. Ao terminar, volta às informações do encontro.

Na anotação, escreva esse percurso em três ou quatro ações. Se você incluir “os participantes recebem uma mensagem”, retire: não construímos essa função. O resultado esperado é uma descrição fiel ao que existe.

## 2. Montar uma pasta de entrega sem carregar confusão

No gerenciador de arquivos, crie uma nova pasta chamada `entrega-aurora`. Copie para ela apenas as versões atuais de `site.html` e `app.html`. As cópias de laboratório e versões antigas ficam na pasta de trabalho. Exporte uma cópia atual dos dados versão 2 e coloque-a na entrega como `dados-exemplo.json`.

Copiar o aplicativo para outra localização pode mudar seu acesso ao armazenamento local. Antes de abrir a cópia de entrega, peça à IA para usar nela uma chave de armazenamento própria, diferente da usada na pasta de trabalho. No percurso de conversa, forneça a cópia e salve só na entrega. No percurso com arquivos, indique o caminho da nova pasta e limite as alterações a ela.

**Demonstração preparada:** a pasta de entrega contém instruções do programa e uma cópia explícita de dados; ela não depende de tarefas escondidas no navegador de quem criou o projeto.

Abra a cópia de entrega e importe `dados-exemplo.json`. Se a importação reclamar de versão, confira se exportou da versão da aula 10. Não renomeie o número dentro do JSON para forçar aceitação: formatos diferentes podem ter conteúdo diferente.

## 3. Criar os caminhos entre páginas

Um **link relativo** aponta para um arquivo em relação à localização da página atual. Se `site.html` e `app.html` estão na mesma pasta, o link pode usar simplesmente `app.html`. Um caminho que começa pela pasta pessoal do criador pode falhar em outro computador.

Peça:

```text
Trabalhe apenas nas cópias de entrega-aurora. Em site.html, acrescente um link com o texto Abrir organizador de treino, apontando para app.html na mesma pasta. Em app.html, inclua Voltar às informações da oficina, apontando para site.html. Use links relativos, preserve o conteúdo e a chave de armazenamento exclusiva da entrega. Não publique nem faça conexões externas. Mantenha o aviso de exemplo fictício e de lembretes não enviados.
```

Salve as versões completas se estiver no percurso de conversa. Abra `site.html` da entrega, use o link para ir ao aplicativo e volte. Depois percorra os links com Tab e ative com Enter. Você deve enxergar onde está o foco.

Se o navegador abrir um arquivo da pasta antiga ou mostrar que não encontrou a página, confira os nomes e os destinos. Peça que remova caminhos absolutos do seu computador e use os nomes locais. Repita o percurso começando pela pasta de entrega.

## 4. Escrever instruções para quem não estava aqui

Crie, no editor de texto simples, `LEIA-ME.txt` dentro da entrega. Você pode pedir um rascunho à IA, mas precisa conferir cada frase. Use este exemplo preparado como estrutura e substitua o que depende de seus testes:

```text
Oficina Aurora — projeto fictício de aprendizagem

Para começar, abra site.html em um navegador. O link Abrir organizador de treino leva ao aplicativo.

O aplicativo organiza tarefas e prepara lembretes locais. Não envia mensagens. Os dias restantes são preenchidos manualmente e não mudam com o relógio.

Para carregar o exemplo, use Importar dados no aplicativo e escolha dados-exemplo.json, de versão 2. Leia a confirmação antes de substituir a lista.

Os dados salvos no navegador não acompanham automaticamente os arquivos. Exporte uma cópia para poder recuperá-los. O histórico indica preparado localmente, não enviado.

Conferido em: [descreva seu navegador e modo de abertura].
Verificações realizadas: [registre apenas o que executou].
Limites e pendências: [registre o que não foi conferido ou não funciona].
```

Se a IA escrever “funciona em qualquer dispositivo”, retire: seus testes não demonstram isso. Se você não souber o nome do navegador, descreva o ambiente com ajuda local antes de declarar compatibilidade.

## 5. Fazer um ensaio de entrega

Feche as abas do projeto. Parta da pasta de entrega, leia somente `LEIA-ME.txt` e tente abrir o site, chegar ao aplicativo, importar o exemplo e simular a regra. Confira o histórico antes de esperar novos candidatos: uma cópia com lembretes já preparados deve preservar essa informação.

Para produzir um candidato novo sem apagar o histórico, cadastre “Organizar bancada”, com 0 dias e pendente. Simule, confirme e confira que entrou uma vez. Simule de novo: não deve entrar novamente. Depois exporte uma cópia atualizada com outro nome se quiser preservar o exemplo original.

Se houver uma pessoa disponível e disposta, peça que tente seguir as instruções sem orientação sua, usando só dados fictícios. Registre onde ela hesitou, sem chamá-la de errada. Se você fizer sozinho, registre “ensaio individual”; não apresente isso como teste com usuários.

Quando alguma instrução falhar, corrija o texto ou o aplicativo e repita aquele trecho. A entrega está pronta para revisão quando a pasta basta para entender o início, as ações e os limites. Ela não está publicada: compartilhar arquivos e hospedar um site são operações diferentes.

**Ponto de parada:** tenho uma pasta de entrega que abre pelo site, leva ao aplicativo, recupera seus dados de exemplo e explica o que a automação realmente faz.
