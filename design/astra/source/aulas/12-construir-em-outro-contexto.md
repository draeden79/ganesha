# Aula 12 — Construir em outro contexto

**Reserve 90–130 minutos**, podendo dividir em dois encontros. Você vai construir um projeto pequeno em uma pasta nova. O objetivo é aplicar o método sem apenas trocar o nome Oficina Aurora.

## 1. Escolher um problema que caiba na prática

Escolha um contexto fictício: um clube de leitura, um encontro de jogos ou uma organização doméstica de objetos emprestados. Você também pode propor outro, desde que não precise de dados pessoais, pagamentos, login, envio ou publicação.

Seu projeto terá três partes: uma página que explica o contexto; uma interação que ajuda a organizar algo; uma regra que seleciona registros e prepara uma saída local. Limite-se a uma regra e poucos campos.

**Exemplo preparado, já resolvido no papel:** um encontro de jogos tem uma página com tema e horário ainda a confirmar; o aplicativo registra jogos, quantidade de peças faltantes e situação “já conferido”; a regra seleciona jogos não conferidos com peças faltantes maior que zero e prepara uma lista de revisão. O resultado é um arquivo local, não uma compra de peças.

Se você escolher esse mesmo tema, altere uma necessidade de verdade, como selecionar jogos ainda sem mesa definida. Não basta trocar as cores. Se seu projeto exigir um sistema de reservas com contas, reduza-o a uma lista fictícia de itens e uma conferência local.

Na anotação, escreva quem usará, qual decisão ficará mais fácil e qual efeito externo não faz parte do escopo. O resultado desta etapa é um problema pequeno e verificável.

## 2. Planejar dados e exemplos antes do pedido

Escolha os campos necessários. Defina um identificador estável, o significado de cada campo e quais entradas devem ser recusadas. Escreva a regra com gatilho, condição e ação. Defina o que acontece na segunda execução.

**Demonstração preparada para o encontro de jogos:** dois jogos podem ter o mesmo nome, então cada registro tem ID. “Peças faltantes” aceita inteiros entre 0 e 100; vazio não vira zero. “Já conferido” é sim ou não. Um registro não conferido com 2 peças faltantes entra; um com 0 fica de fora; um já conferido com 2 também fica de fora. Depois de preparar a revisão para um ID, repetir não cria outra entrada na mesma regra.

Monte quatro registros fictícios para seu projeto: um que entra, um que não entra por condição, um no limite e um que permite testar a prioridade entre condições. Acrescente uma entrada inválida separada. Preveja os resultados antes de construir.

Se não conseguir decidir se um registro entra, a regra ainda está ambígua. Reescreva-a em português simples e tente novamente. Você pode pedir à IA para apontar ambiguidades, mas a decisão do comportamento desejado é sua.

## 3. Preparar uma pasta nova e construir em partes

Crie uma pasta com um nome simples, como `meu-projeto-treino`. Não trabalhe por cima da entrega da oficina. Escolha o percurso Codex com arquivos, Claude com arquivos ou Claude em conversa. Nos dois primeiros, limite o trabalho à nova pasta; no último, salve manualmente os arquivos completos.

Use este pedido como base, preenchendo os trechos com suas decisões:

```text
Quero construir um projeto fictício local de aprendizagem. Público: [quem]. Problema: [o que precisa organizar ou decidir]. Conteúdo confirmado da página: [fatos]. Informações ainda pendentes: [lista].

Crie primeiro site.html, informativo, sem inventar fatos, formulários ou serviços. Depois de eu conferir, construiremos app.html. Use arquivos HTML completos com CSS e JavaScript internos quando necessário, sem bibliotecas, instalações ou rede. Não publique, envie mensagens nem conecte contas.

O aplicativo terá estes campos e validações: [sua definição]. As ações manuais serão: [ações]. A regra será: gatilho [gatilho]; condição [condição]; ação local [ação]. Ao repetir: [comportamento]. Preciso de prévia, confirmação antes de registrar, histórico e exportação/importação validada do conjunto. Use uma chave de armazenamento exclusiva deste projeto; explique qualquer limitação local.

Estes são meus casos de teste e resultados previstos: [casos]. Antes de escrever, aponte até três ambiguidades que impedem a implementação. Se não houver, comece somente pelo site. Não declare que meus testes já foram executados.
```

Confira e abra o site. Só depois peça a primeira versão do aplicativo com criação, edição necessária e validação. Teste essas ações antes de pedir persistência e recuperação; por último, acrescente a regra com histórico. Use o ritmo que praticou nas aulas anteriores: uma mudança, uma conferência e uma cópia recuperável.

Se o pedido ficar grande demais e a IA entregar partes incoerentes, retome a última cópia que funcionava e reduza a próxima mudança. Não precisa reconstruir tudo por causa de uma falha localizada.

## 4. Executar uma demonstração que possa falhar

Abra os arquivos locais e use seus registros de teste. Compare o previsto com o observado. Tente a entrada inválida e corrija-a; cancele uma confirmação; execute a regra duas vezes; exporte uma cópia e recupere-a depois de uma alteração pequena.

**Exemplo preparado de evidência:** “O jogo com 0 peças faltantes ficou de fora. O com 2 entrou uma vez. Na segunda execução, o histórico continuou com um registro.” Esse relato é mais útil que “a automação funciona”. Use seus próprios dados e observações.

Se algo falhar, escreva um relato como na aula 8. Peça correção localizada e repita o teste que falhou, além de um comportamento que já funcionava. Se a persistência do navegador não puder ser confirmada, mantenha exportação/importação como alternativa e registre a limitação, sem declarar equivalência.

Você deve obter um resultado real em cada frente: página aberta, interação executada e regra aplicada a dados. Se tiver apenas uma descrição em conversa, registre a construção como incompleta e volte à etapa correspondente.

## 5. Explicar suas decisões e usar a outra ferramenta, se disponível

Escreva três justificativas: por que escolheu esses campos; por que sua regra inclui um exemplo e exclui outro; por que a segunda execução não deve duplicar o resultado. Não precisa explicar a sintaxe do código para demonstrar que entende o comportamento.

Se tiver acesso às duas famílias de ferramentas, leve apenas a descrição fictícia e um caso de teste à outra. Peça que identifique uma ambiguidade ou proponha um caso limite. Não autorize mudanças simultâneas nos mesmos arquivos. Compare a sugestão e aceite apenas o que fizer sentido ao seu objetivo.

Se não tiver outro acesso, faça a mesma revisão na sua ferramenta e registre que não houve comparação entre ferramentas. A conclusão do projeto não depende de contratar outra conta. Um acordo entre duas respostas de IA também não substitui executar o teste.

## 6. Preparar uma entrega honesta

Crie uma pequena pasta de entrega com os arquivos atuais, uma cópia fictícia dos dados e um `LEIA-ME.txt`, seguindo a aula 11. Inclua como abrir, quais verificações você fez e quais ficaram pendentes. Preserve uma cópia anterior para recuperação.

Na anotação final, separe três afirmações: “Consegui completar…”; “Consigo explicar…”; “Consegui aplicar em outro caso…”. Elas não precisam estar no mesmo nível. Você pode ter concluído um fluxo com ajuda e ainda precisar de prática para escolher uma regra sozinho.

Se decidir publicar ou conectar serviços no futuro, isso será uma nova etapa com requisitos próprios. Antes dela, será preciso verificar dados, permissões, ambiente, destinatários e consequências reais. Este curso termina com uma solução local revisável, não com uma publicação automática.

**Ponto de parada:** consigo mostrar meu projeto funcionando, explicar uma decisão, corrigir uma divergência e dizer com precisão o que ainda não foi demonstrado. Essa é uma base concreta para continuar aprendendo.
