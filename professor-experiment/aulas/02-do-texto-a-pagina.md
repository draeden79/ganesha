# Aula 2 — Do texto para uma página que abre

**Reserve 60–85 minutos**, além de eventual configuração da ferramenta. Você vai transformar o aviso em uma página que abre no seu computador. Tenha o aviso da aula 1 e um computador com gerenciador de arquivos e navegador.

## 1. Entender o resultado antes de construir

Um **site** reúne páginas para apresentar conteúdo e permitir navegação. Uma página sobre uma oficina já pode ser um site pequeno. Um **aplicativo** ajuda a realizar uma tarefa e responde a entradas: uma lista em que você adiciona e conclui atividades, por exemplo. Uma **automação** executa uma regra a partir de um gatilho: ao pedir uma conferência, preparar lembretes para tarefas próximas do prazo.

Essas categorias se sobrepõem. Um aplicativo pode funcionar dentro de um site; uma automação pode fazer parte do aplicativo. O que importa agora é reconhecer a função, não decorar uma fronteira rígida.

**Exemplo preparado:** ler “sábado, 15h” é consultar informação; marcar “separar vasos” como concluído altera o estado de uma tarefa; gerar uma lista de lembretes a partir dos prazos aplica uma regra.

Na sua anotação, escolha qual dessas ações você quer realizar hoje. Para esta aula, a escolha é consultar informação. Se sua ideia envolver cadastro ou envio de mensagens, anote-a para depois. O alvo observável de hoje é uma página local legível, sem cadastro.

## 2. Preparar um lugar para os arquivos

Uma pasta agrupa arquivos. Um arquivo guarda conteúdo com um nome. A parte final do nome, como `.html`, é uma **extensão**: ajuda a identificar como abrir esse conteúdo. HTML é um formato de texto que o navegador interpreta como uma página.

No gerenciador de arquivos do computador, crie uma pasta chamada `oficina-aurora` em um lugar que você encontre, como sua pasta de documentos. Use a operação de criar pasta disponível no seu sistema. Abra-a e confira que está vazia. Anote o caminho ou a localização. Não use uma pasta de trabalho com documentos reais.

No percurso Codex ou Claude com edição de arquivos, selecione essa pasta como área de trabalho pelo mecanismo disponível. Antes de autorizar uma escrita, confira que a localização indicada é a pasta de treino. Se a ferramenta só trabalhar em outro ambiente, não presuma que a pasta existe no seu computador: use a alternativa de receber código em texto e salvá-lo.

No percurso de conversa Claude, você vai precisar de um **editor de texto simples**: um programa que salve texto sem formatação de documento. Não use um processador de texto em formato `.docx`. Se o editor só oferecer texto formatado, procure seu modo de texto simples ou peça apoio para escolher um editor adequado. Não é necessário instalar uma ferramenta de programação complexa para este exercício.

Se não conseguir criar a pasta ou identificar onde os arquivos são gravados, resolva isso antes da próxima etapa. Uma resposta da IA dizendo “criei” não substitui enxergar o arquivo no local correto.

## 3. Pedir a página com limites claros

Vamos usar um único arquivo, sem bibliotecas ou serviços externos. Uma biblioteca é código pronto que um projeto pode usar; aqui não precisamos adicionar essa dependência.

**Demonstração preparada:** o trecho `<h1>Oficina Aurora</h1>` instrui o navegador a mostrar um título principal. Você não precisa escrever a página à mão, mas pode reconhecer que código é texto com instruções.

Cole este pedido na ferramenta e acrescente seu aviso ao final:

```text
Crie uma página local para a Oficina Aurora em um único arquivo chamado site.html. Use HTML e CSS dentro do arquivo, sem bibliotecas, imagens remotas, fontes externas, conexões de rede, formulários ou publicação. CSS são as instruções de aparência da página.

Mostre: título, tema, sábado das 15h às 17h, Sala Girassol, gratuito, materiais fornecidos e um aviso visível de que este é um exemplo fictício, com data completa e endereço ainda a confirmar. Não crie inscrição nem contatos. Use linguagem simples, bom contraste e leitura confortável em tela estreita.

Se você pode editar a pasta de treino, crie somente site.html nela e diga onde foi salvo. Se não pode, devolva o conteúdo completo do arquivo em um único bloco de código. Não execute comandos nem instale nada.

Meu aviso conferido é: [cole o aviso aqui].
```

No percurso com arquivos, confira o arquivo criado. No percurso de conversa, copie apenas o conteúdo do bloco, sem as linhas de cercadura com três crases. Cole no editor de texto simples e salve na pasta como `site.html`, usando codificação UTF-8 se houver essa escolha. Ela preserva os acentos.

Se o nome virar `site.html.txt`, ajuste a extensão pelo gerenciador de arquivos; a visualização de extensões pode precisar ser habilitada com apoio local. Se não souber verificar, não apague o arquivo: peça ajuda mostrando apenas seu nome, sem documentos pessoais.

## 4. Abrir e observar

Para executar essa página, use o navegador para abrir o arquivo local. Você pode abri-lo pelo gerenciador de arquivos, escolhendo um navegador se necessário, ou usar a operação de abrir arquivo do navegador. Os nomes exatos dessas operações variam.

O resultado esperado é ver o título e as informações da oficina. O endereço do navegador deve indicar um arquivo local, e não uma publicação pública. Não estamos usando um servidor. Se a ferramenta mostrar uma prévia própria, compare com o arquivo aberto: são ambientes diferentes.

**Demonstração preparada de diagnóstico:** se aparecem sinais como `<h1>` na tela em vez de um título, pode ter sido aberto o arquivo no editor, ou o conteúdo foi salvo como texto para exibição. Confira o programa usado, a extensão e se você copiou HTML completo. Se a página estiver vazia, confirme que o arquivo tem conteúdo. Se os acentos estiverem quebrados, peça à IA para incluir a declaração de UTF-8 e salve novamente nessa codificação.

Depois de corrigir, salve o arquivo e recarregue a página no navegador. Não avalie uma tela antiga sem recarregar. Anote uma informação que você leu na página e confira-a contra as notas da aula 1.

## 5. Fazer uma pequena alteração sua

Escolha uma frase curta de apresentação, sem acrescentar fatos. Exemplo preparado: “Um encontro para começar a cuidar das suas plantas.” Peça à IA para incluí-la logo abaixo do título, preservando o restante.

Quem usa edição de arquivos confere a alteração no mesmo arquivo. Quem usa conversa pede o **arquivo completo atualizado**, substitui o conteúdo no editor e salva. Abra ou recarregue novamente. Se a frase não aparecer, confira se editou a mesma cópia que está aberta no navegador.

Você terminou quando encontra `site.html`, consegue abri-lo e consegue mostrar a mudança. Descrever uma página imaginada ou ver apenas o código na conversa ainda não é o resultado desta aula.
