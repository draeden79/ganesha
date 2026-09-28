# 11 Prompting Tips for Building UIs That Don’t Suck — texto integral

[Artigo de Steve Sewell, Builder, 02/07/2025](https://www.builder.io/blog/prompting-tips). `source_id=builder-blog`; estudo em 28/09/2026. Leitura sequencial completa de `studies/local/backfill-a05-builder-prompting.txt`, linhas 1–186. Uma capa material inspecionada; seis vídeos nativos e um YouTube incorporado não acompanhados. `text_read_complete=true`; `full_source_analyzed=false`.

## Sequência das onze dicas e encerramento

| Linhas | Argumento ou procedimento |
| --- | --- |
| 8–16 | Atribui resultados ruins à insuficiência de contexto e apresenta dicas práticas. |
| 18–26 | 1. Mostrar a interface produzida, comparando-a à referência desejada. |
| 28–42 | 2. Definir convenções com exemplos de arquivos, componentes e padrões. |
| 44–54 | 3. Fornecer documentação, histórias de componentes e repositórios relevantes, com organização. |
| 56–62 | 4. Levar erros do navegador/terminal ao agente. |
| 64–74 | 5. Integrar design e código por Figma/MCP/plugin. |
| 76–82 | 6. Selecionar visualmente a região a alterar quando a ferramenta permite. |
| 84–90 | 7. Usar contexto de tickets e prévia antes da entrega. |
| 92–110 | 8. Prototipar na stack real ou sandbox que siga seus padrões. |
| 112–122 | 9. Dar feedback específico e iterar. |
| 124–134 | 10. Comparar variações por controles temporários ou branches. |
| 136–151 | 11. Distribuir trabalho entre design e engenharia, por mudanças revisáveis. |
| 153–164 | Defende experimentação, limites da delegação e participação técnica. |
| 165–186 | Promoção e leituras adicionais. |

Exemplos incluem localizar um grupo de abas e descrever um botão que deveria abrir um modal. São exemplos de comunicação; o texto não apresenta sua correção executada e reteste. A afirmação de que cerca de 70% dos protótipos do autor seguem para merge é relato local, sem amostra ou critérios publicados.

## Imagens e demonstrações pendentes

`studies/local/backfill-a05-prompting-cover.png` mostra um meme de ciclista que provoca a própria queda e reclama da IA. É recurso retórico, não evidência de que falhas sempre decorrem do usuário. Erros também podem persistir com contexto suficiente; a fonte não mede causas.

Foram identificados seis elementos de vídeo sem fonte no estado DOM observado e um iframe `https://www.youtube.com/embed/RFpc_JsMIDU?rel=0`. Nenhum foi acompanhado. Não atribuir ao estudo uma comparação visual antes/depois que depende dessas demonstrações. A leitura integral inclui todas as dicas textuais, não o audiovisual.

## Mecanismo: tornar a mudança localizável e verificável

**Análise editorial:** uma captura do resultado e uma referência respondem a duas perguntas diferentes: o que apareceu e o que era desejado. Para corrigir função, acrescentar a ação que dispara o problema e o estado esperado; a imagem de um botão sozinha não informa o que ele faz. Essa combinação permite um pedido que alguém possa verificar após a alteração.

Apontar um arquivo exemplar também restringe escolhas de implementação. Entretanto, copiar um padrão existente não comprova que ele é adequado ao caso novo. Se a referência contém um componente apenas visual e o pedido precisa de persistência, há uma lacuna que contexto adicional de estilo não resolve. O plano deve distinguir dados, comportamento e aparência.

A fonte recomenda conectar muito contexto e depois alerta para organizá-lo. A adaptação ao curso é disponibilizar o que é necessário com indicação de finalidade, em vez de impor quantidade como objetivo. Um erro de console, o caminho da tela e um exemplo de componente podem ser mais úteis que despejar todo o projeto sem orientação. Isso é interpretação pedagógica, não teste comparativo de prompts realizado aqui.

Dar ao agente um erro pode iniciar investigação, mas uma saída sem erro de compilação não conclui o pedido. O aluno precisa repetir a interação que falhou. Se uma correção elimina a exceção e remove o botão, o sintoma técnico desapareceu enquanto o objetivo continua perdido. Esse é o motivo dos checks de função e de preservação na prática abaixo.

## Pré-requisitos e superfícies

Parte das dicas exige projeto existente, acesso a arquivos, documentação de componentes e conhecimento de onde ver erros. Seleção visual depende de ferramenta que exponha essa função; ticket depende de contexto acessível; branches e PRs dependem de versionamento. Não tratar esses pré-requisitos como inerentes a toda janela de conversa.

O texto diferencia modos de trabalho: designer pode implementar UI e enviar para revisão; desenvolvedor pode preparar a função e designer refinar a apresentação; PM pode revisar instrumentação. Essas são formas de colaboração propostas, não prova de que aparência concluída implica comportamento, analytics e entrega corretos.

A recomendação do autor de envolver um engenheiro pode ser útil quando o trabalho ultrapassa o conhecimento de quem o executa. Não se converte em exigência de contratar alguém para cada exercício introdutório. O curso pode limitar a tarefa e preparar um ambiente verificável; quando não houver como testar um aspecto, registrar esse limite e buscar revisão pertinente.

## Atualidade, limites e pertinência

É material de julho de 2025. Declarações sobre quais produtos têm seleção visual, integração bidirecional ou múltiplas versões refletem a fonte na época; não foram conferidas como catálogo atual. O atalho de captura citado não foi testado e não será importado como instrução validada. As figuras, rótulos e plugins não são tutorial de Codex Desktop nem Claude Desktop.

O texto também faz comparações favoráveis ao produto do próprio autor e comentários depreciativos sobre alternativas. A ficha preserva o conteúdo argumentativo sem adotar o tom ou convertê-lo em classificação independente. Usar a stack real pode facilitar integração, mas não garante merge direto ou identidade visual perfeita.

Complementa prompting oficial e revisão de código já estudados ao especificar evidências para UI e distinguir seleção visual, erros, referências e variantes. Sobrepõe-se a contexto e iteração; a contribuição mais útil é transformar crítica vaga em mudança localizada, com condição de aceitação. Não introduzir todas as onze dicas como checklist obrigatório do iniciante.

Em L01, o aluno pode preparar um pedido com referência, escopo e dois checks; a entrega continua plano revisado. Implementar a tela, abrir variações e enviar PR ficam para etapas posteriores. Os detalhes mais técnicos permanecem no corpus, ordenados por pré-requisito, não descartados.

## Prática original: corrigir um botão de detalhes com evidência

Exercício proposto, não executado. Em uma página de oficinas fictícias já preparada, o botão Detalhes deve abrir as informações do cartão escolhido. O aluno recebe uma referência visual própria do curso e um comportamento definido. Antes da execução, registrar qual cartão será usado, qual informação deve aparecer e o que não deve mudar.

Na etapa posterior, reproduzir uma falha se ela existir e anotar ação, observado e esperado. Anexar uma captura do resultado, uma referência e somente o erro pertinente disponível. Pedir investigação e alteração delimitada. Caso a página já funcione, propor uma mudança pequena de apresentação; não inventar um defeito para simular correção.

**Check 1 — comportamento e retorno:** clicar em dois cartões distintos e conferir que cada um abre seus próprios detalhes. Fechar a apresentação e voltar à lista sem perder o contexto. Se o fluxo prevê teclado, testar abertura, fechamento e retorno de foco conforme o comportamento definido. Registrar resultado observado, não apenas a resposta do agente.

**Check 2 — preservação visual e de conteúdo:** comparar título, horário, botão e ordem do cartão com a referência em duas larguras. Conferir que a alteração não removeu informação nem prejudicou a navegação do outro cartão. Se o ajuste visual quebrar a abertura, repetir o pedido com a evidência e executar ambos os checks novamente.

Opcionalmente pedir duas variações de aparência com a mesma função e aplicar os mesmos checks a ambas. Escolher a variante pelo critério declarado, sem concluir que gerar alternativas equivale a pesquisa com usuários. Remover controles temporários de comparação antes de tratar a versão como pronta para entrega.

Entrega posterior: plano, evidência localizada, mudança, checks e reteste. Separar “código gerado”, “prévia conferida” e “entrega revisada”. Nenhuma dessas etapas foi executada nesta pesquisa; o exercício é criação pedagógica original.

## O que não foi revisado

Não foram acompanhados os sete vídeos, testadas interfaces atuais, examinados repositórios de exemplo ou realizados os fluxos de PR e colaboração. Não se reproduziu a taxa de merge alegada. Brutos e captura ficam locais e ignorados pelo Git, sem licença de republicação presumida.
