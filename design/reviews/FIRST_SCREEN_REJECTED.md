# Primeira atividade — revisão após rejeição da tela

28/09/2026, 22:59 UTC. Fonte visual: captura enviada pelo usuário, `Captura de Tela 2026-09-28 às 15.56.35.png`. A aprovação editorial anterior não constitui aprovação da experiência renderizada e foi superada pelo feedback “não consigo entender nada”. Nenhuma implementação nesta rodada.

## Diagnóstico da captura

- A ação vem antes da explicação. O subtítulo pede copiar uma palavra de um exemplo que a pessoa ainda não viu.
- Copiar “Olá!” não mostra um benefício nem uma decisão útil. É possível cumprir a tarefa sem entender como pedir ajuda à IA.
- A mesma instrução ocupa subtítulo, rótulo e placeholder. A repetição compete com o conteúdo que deveria orientar.
- Pedido e resposta estão dentro de um parágrafo longo. A tela não mostra visualmente quem falou e o que aconteceu depois.
- O seletor de ferramenta aparece sem função compreensível nesse exemplo. A escolha acrescenta dúvida antes de oferecer valor.
- Um campo enorme domina a área inferior visível para uma resposta de uma palavra. A composição comunica formulário obrigatório, não uma experiência com começo e resultado.

A captura termina antes do restante da tela; não concluo a posição ou o comportamento dos controles que não aparecem nela.

## Alinhamento posterior com o Educador

Às 23:01 UTC, li a proposta `content/curriculum/beginner-review/ACTIVITY_MODEL.md`, no worktree `30b2`. O exemplo de título de site da Ponte Musical pode ser a proposta única de conteúdo para o próximo protótipo: ele mostra uma aplicação concreta do texto produzido. A reunião abaixo permanece como estudo de composição, sem proposta de acrescentar um segundo percurso.

Para a proposta do Educador: propósito curto → pedido/resposta em balões → título aplicado a uma pequena prévia de página → tentativa da Oficina Giro com rótulo único → feedback real e edição no mesmo campo. Não mostrar todos os casos, critérios e mensagens de feedback na primeira vista. A costura é um caso posterior de teste, sem modelo à vista. O botão “Conferir meu pedido” depende da capacidade real de oferecer o feedback descrito; no teste facilitado, a leitura é humana e deve ser identificada assim. Apoiar essa ordem para prototipagem não equivale a aprovar uma interface ainda não renderizada.

## Proposta concreta: uma primeira atividade

Objetivo: reconhecer que um pedido escrito pode produzir um rascunho útil e que um segundo pedido pode ajustá-lo. A escolha de uma situação cotidiana é proposta para alinhamento editorial; não foi instalada no curso.

**1. Orientação antes de agir**

Título: **Peça ajuda para escrever uma mensagem**.

Texto: “Uma IA pode ajudar a transformar uma instrução em um rascunho. Você explica o que precisa, lê a sugestão e decide se ela serve.”

Situação: “Você precisa avisar que a reunião de hoje mudou das 15h para as 16h. Veja uma conversa de exemplo.”

**2. Diálogo ilustrado, com texto real**

Um cartão “Exemplo de conversa”, contendo dois balões em ordem vertical:

- **Pedido da pessoa:** “Escreva uma mensagem curta avisando que a reunião de hoje mudou das 15h para as 16h.”
- **Resposta da IA:** “Olá! A reunião de hoje será às 16h, em vez das 15h. Até lá!”

Usar rótulos e alinhamento, sem falsa captura de aplicativo oficial. A informação sobre o horário permanece idêntica nas duas falas. Os balões devem aparecer na primeira vista de desktop junto da orientação; no celular seguem imediatamente abaixo dela, sem grandes espaços vazios.

**3. Uma tentativa que produz uma mudança visível**

Instrução única: “Você quer um recado ainda mais direto. Veja como pedir esse ajuste.”

Botão: **Pedir uma versão mais curta**.

Ao acionar, mostrar na mesma conversa:

- **Novo pedido:** “Deixe a mensagem mais curta.”
- **Resposta ajustada:** “A reunião de hoje passou das 15h para as 16h.”

Legenda junto ao cartão: “Este exemplo usa respostas preparadas para a aula.” Assim a interação não promete uma conversa real com IA. A pessoa pode observar a alteração sem conta, instalação ou escolha de ferramenta.

**4. Fechamento curto e próximo passo**

Após a tentativa: “O segundo pedido mudou o tamanho da mensagem e manteve os horários. Você pode pedir um ajuste e conferir o que mudou.”

Botão **Continuar**. A próxima atividade pode oferecer uma decisão sobre um pedido. Esta primeira tela não exige textarea, declaração de execução nem caixas de rubrica para liberar a sequência.

## Composição

Uma coluna de leitura com largura confortável; orientação, diálogo, tentativa e resultado nessa ordem. Tipografia existente, fundo claro e um destaque roxo para a ação principal. Usar o diálogo como o visual didático efetivamente renderizado. Cada fala tem autor explícito; cor não é a única distinção. Não repetir o comando em título, subtítulo e placeholder. O seletor Claude/Codex só aparece quando uma atividade realmente orientar a abrir uma ferramenta.

## Critério da tela renderizada e teste de compreensão

Antes de aceitar, abrir a implementação real em desktop e celular. Verificar a sequência com o conteúdo completo e a resposta após a interação; um briefing ou um JSON correto não satisfaz esse critério.

Teste com uma pessoa que nunca usou IA, sem explicação oral adicional do autor:

1. Após a leitura inicial, pedir que explique para que a atividade serve e aponte pedido e resposta.
2. Observar se encontra e realiza a tentativa por conta própria.
3. Depois da mudança, perguntar o que mudou e o que permaneceu; a resposta deve reconhecer o tamanho e os horários.
4. Perguntar se a tela usou uma IA ao vivo ou apresentou um exemplo preparado.

Registrar as palavras da pessoa e onde ela hesitou. Qualquer necessidade de o autor explicar onde começar, ou crença de que respondeu a uma IA real, exige revisão antes do aceite. Este teste ainda não aconteceu; inspeção interna não será apresentada como validação com alunos.
