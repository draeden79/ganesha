# Aula 4 — Conferir antes de chamar de pronto

**Reserve 45–65 minutos.** Você vai testar o site da oficina e registrar evidências simples. Uma página abrir uma vez é um começo; ainda precisamos verificar se ela continua útil em outras condições.

## 1. Transformar “parece bom” em verificações

Um teste compara o que deveria acontecer com o que aconteceu. Ele precisa dizer a condição e a observação. “Testar o site” é amplo demais. “Abrir em janela estreita e ler o horário sem rolar para os lados” é verificável.

**Exemplo preparado de registro:** “Condição: janela estreita. Esperado: título inteiro visível. Observado: a última palavra sai da tela. Resultado: precisa de correção.” Este é um exemplo didático, não um teste realizado no seu arquivo.

Na sua anotação, prepare quatro linhas: conteúdo correto; janela estreita; texto ampliado; uso de teclado quando houver links. Deixe espaço para o observado. Abra `site.html` no navegador. Se o arquivo não abrir, volte ao procedimento da aula 2 antes de testar a aparência.

## 2. Conferir fatos e ausência de promessas

Compare a página com as notas originais. Confira os números com atenção: 15h–17h não é 15h–19h. Verifique que “gratuito” e “materiais fornecidos” aparecem e que data completa e endereço permanecem pendentes.

**Demonstração preparada:** uma página pode ter todos os fatos certos e um botão “Reserve sua vaga”. Esse botão também faz uma promessa: parece oferecer uma inscrição. Como nosso exercício não oferece inscrição, ele seria um problema mesmo que não funcionasse.

Faça sua conferência. Se encontrar um botão ou link, descubra para onde ele leva antes de usá-lo. Não envie dados nem complete cadastros. O resultado esperado nesta aula é um site informativo, sem inscrição e sem contatos reais.

Se um fato estiver errado, peça uma alteração localizada: “Em site.html, corrija apenas o horário para 15h às 17h; preserve o restante.” No percurso Claude em conversa, forneça o arquivo atual e salve a versão completa devolvida. No percurso com edição, confira o arquivo alterado. Recarregue e repita a comparação.

## 3. Testar duas condições de leitura

Reduza a largura da janela do navegador para aproximadamente a largura de um telefone. Não precisa medir pixels. Observe se o texto cabe sem rolagem horizontal e se os blocos mantêm uma ordem compreensível. Isso é uma aproximação de tela estreita, não um teste em todos os celulares.

Depois amplie o conteúdo com o recurso de zoom do navegador, buscando cerca de 200% se a interface mostrar esse valor. A finalidade é verificar se alguém que precisa de letras maiores continua lendo. Volte ao zoom original ao terminar.

**Exemplo preparado de pedido de correção:** “Com a janela estreita, o bloco do horário fica cortado à direita. Ajuste a largura e a quebra de texto sem diminuir a letra para caber.” Descrever a condição é mais útil que dizer “está estranho”.

Execute as duas verificações e registre uma observação para cada uma. Se algo falhar, envie a descrição à IA, salve a correção e repita aquela condição. Depois confira o conteúdo novamente. Se tudo passar, não invente um defeito: registre o que observou e o limite do teste.

## 4. Verificar teclado e significado

Algumas pessoas navegam usando teclado. A tecla Tab costuma percorrer elementos interativos, como links; Enter costuma ativar o elemento selecionado. O destaque que mostra onde você está se chama **foco**.

Nosso site pode não ter nenhum elemento interativo. Nesse caso, não é esperado que cada parágrafo receba foco. Anote “sem links ou controles nesta versão”. Se houver um link legítimo dentro da própria página, percorra com Tab, observe se o foco é visível e use Enter para verificar o destino.

**Exemplo preparado:** um link chamado “Informações do encontro” comunica mais que “clique aqui”. Uma informação indicada só por vermelho pode se perder para quem não distingue aquela cor; escreva também “A confirmar”.

No seu site, procure um significado transmitido só por cor ou um link com nome vago. Se encontrar, peça que o texto explicite o significado. Se não houver, registre essa observação. Essa checagem é parcial: não certifica acessibilidade completa e não substitui o uso de tecnologias assistivas por pessoas com necessidades diferentes.

## 5. Encerrar com evidência e um limite

Escolha um problema encontrado e escreva o caminho para outra pessoa reproduzi-lo: arquivo aberto, condição, esperado e observado. Se nenhum problema apareceu, faça um relato de um teste que passou usando a mesma estrutura.

Agora acrescente um teste que não foi feito, como uso em um celular real ou com leitor de tela. Uma lista de limites não diminui seu resultado; informa exatamente o que ele demonstra.

Se você confundir pedido de teste com teste realizado, confira suas anotações: “a IA disse que funciona” não é uma observação sua. Abra o arquivo e tente. Se não conseguir, registre como pendente.

**Ponto de parada:** o site local foi conferido nas condições registradas, as falhas encontradas foram corrigidas ou explicitamente deixadas como pendência, e você consegue explicar a diferença entre aparência boa e funcionamento verificado. Guarde `site.html`; vamos começar outro arquivo na próxima aula.
