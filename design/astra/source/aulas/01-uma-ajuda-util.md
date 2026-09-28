# Aula 1 — Uma ajuda útil, uma conferência sua

**Reserve 35–50 minutos.** Ao terminar, você terá um aviso compreensível e saberá conferir se a IA respeitou as informações recebidas. Leia `COMECE-AQUI.md` antes de iniciar. Por enquanto, não precisamos criar arquivos de código.

## 1. Escolher o que vale a pena pedir

Uma IA de conversa produz respostas a partir do que recebe e do contexto disponível. Ela pode organizar informação, propor frases e escrever código. Uma resposta convincente não garante que os fatos estejam certos nem que uma ação tenha sido executada.

Imagine que você ajuda a organizar uma oficina. Precisa transformar anotações em um aviso. Isso é uma tarefa útil e pequena: sabemos de onde vêm os fatos e podemos verificar cada um.

Estas são as notas fictícias do exercício:

> Oficina Aurora: encontro para aprender a cuidar de plantas em vasos. Sábado, das 15h às 17h. Sala Girassol. Gratuito. Materiais fornecidos. Não haverá inscrição neste exercício. Ainda não temos a data do calendário nem o endereço completo. Não usar contatos reais.

**Exemplo preparado:** de “materiais fornecidos”, podemos escrever “Os materiais serão fornecidos”. Não podemos concluir “Cada pessoa receberá um vaso para levar para casa”. A segunda frase acrescenta uma promessa que as notas não fazem.

Na sua anotação pessoal, escreva para quem será o aviso e o que essa pessoa precisa descobrir. Uma resposta possível seria “alguém que quer saber o tema, o horário e se precisa levar materiais”. Não procure uma palavra certa; escolha informações que mudariam a decisão de participar.

Se você começar a inventar detalhes para tornar o texto mais bonito, volte às notas. O primeiro resultado observável desta etapa é uma finalidade clara, não um texto longo.

## 2. Fazer um pedido que possa ser conferido

Um pedido fica mais útil quando informa o objetivo, os fatos disponíveis e os limites. “Faça algo legal” deixa a IA decidir quase tudo. “Escreva um aviso curto usando somente estas notas” permite conferir a resposta.

Abra sua conversa com Claude ou uma tarefa de texto no Codex. Se estiver em um ambiente que pode editar arquivos, deixe claro que esta etapa é apenas uma conversa. Cole:

```text
Quero um aviso curto, em português brasileiro, para uma pessoa decidir se tem interesse na Oficina Aurora. Use apenas as notas abaixo. Não crie data de calendário, endereço, contato, inscrição ou promessa de brindes. Se faltar uma informação importante, indique que ainda falta confirmar. Não crie arquivos nem execute ações; responda em texto.

Notas: encontro para aprender a cuidar de plantas em vasos; sábado, das 15h às 17h; Sala Girassol; gratuito; materiais fornecidos; não haverá inscrição neste exercício; data do calendário e endereço completo ainda não definidos. É um exemplo fictício.

Entregue um título e até dois parágrafos. Depois, liste separadamente as informações que faltam.
```

Você deve receber texto. Isso não publica um aviso, não reserva uma sala e não convida ninguém. No percurso Claude, a resposta aparece na conversa; no percurso Codex, confira também se não foram propostas alterações de arquivos. Se houver proposta de ação, diga: “Mantenha esta atividade apenas em texto.”

Se a resposta vier muito extensa, peça até 90 palavras para o aviso, mantendo os fatos. Se a ferramenta não responder por uma limitação de acesso, registre o bloqueio e faça um rascunho manual; marque a execução com IA como pendente.

## 3. Conferir sem precisar ser especialista

Leia a resposta com as notas ao lado. Faça três perguntas: algo correto desapareceu? Algo mudou? Algo novo foi apresentado como fato?

**Demonstração preparada de um erro:** “Inscreva-se até sexta e traga seu vaso.” Parece um convite plausível, mas contraria duas restrições: inventa inscrição e transfere materiais para o participante.

Agora confira seu aviso. Sublinhe fatos corretos e circule informações sem apoio. Se encontrar um erro, envie uma correção específica:

```text
Na resposta anterior, você escreveu [cole somente o trecho problemático]. Isso não consta nas notas ou as contradiz. Reescreva o aviso mantendo os fatos confirmados e indicando o que ainda falta. Não acrescente novas informações.
```

Substitua o trecho entre colchetes; ele é um espaço para a sua observação. Se não houver erro factual, peça uma alteração de clareza, como explicar melhor que ainda falta a data completa. Depois compare novamente, porque uma revisão também pode introduzir um erro.

O resultado esperado é um aviso sem promessas inventadas. Se você não souber decidir sobre uma frase, pergunte de qual nota ela foi extraída e confira por conta própria. A explicação da IA é uma pista, não uma segunda fonte independente.

## 4. Usar o método em outro caso

Agora tente uma pequena transferência. Na mesma ferramenta ou em uma nova conversa, produza um aviso com estas notas:

> Troca de livros fictícia. Domingo, 10h–12h. Cada pessoa pode levar até três livros em bom estado. Não haverá venda. Local ainda não escolhido.

Antes de enviar, escreva seu próprio pedido com finalidade e limites. Você pode consultar o pedido anterior, mas adapte as restrições: materiais fornecidos não fazem parte deste caso. Observe se “até três” virou “três obrigatoriamente” ou se a IA inventou um endereço.

Se acontecer, corrija o trecho e tente novamente. Você concluiu a transferência quando o texto respeita o novo caso e consegue explicar uma escolha feita no pedido. Conseguir copiar o primeiro pedido e conseguir adaptá-lo são conquistas diferentes.

## 5. Guardar uma decisão, não só uma resposta

Na sua anotação, copie o aviso final da Oficina Aurora e escreva uma frase sobre a conferência: “Comparei horário, materiais e informações ausentes; corrigi…” ou “Não encontrei diferença nesses pontos”. Na próxima aula esse aviso será o conteúdo de uma página.

Se você perdeu a conversa, use as notas desta aula para repetir o pedido. Se o aviso não contiver todos os detalhes, acrescente-os antes de avançar. Você não precisa memorizar uma fórmula de prompt. Precisa conseguir dar um objetivo e perceber quando a resposta se afasta dele.

**Ponto de parada:** tenho um aviso conferido, sei o que falta confirmar e entendo que conversar não publicou nada. A avaliação comentada desta aula fica no documento separado de avaliação.
