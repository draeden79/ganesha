# Choosing the right model — comparar qualidade exige mais que três tempos

[Aula da Claude Academy](https://academy.claude.com/courses/claude-platform-101/choosing-the-right-model), texto inteiro lido em 28/09/2026, artefato `studies/local/backfill-ac14-models.txt`. Duas figuras inspecionadas; vídeo `UAeTSBsK71A` pendente. Não houve rótulo Transcript observado, chamadas de API ou avaliação executada. `text_read_complete=true`, transcrição/audiovisual não certificados.

## Percurso e atualização da fonte

O texto apresenta escolha de modelo como compromisso entre qualidade e custo, descreve famílias, propõe avaliação com exemplos representativos, compara respostas e termina distribuindo tipos de tarefa entre modelos. A tese útil é medir o resultado do caso real antes de escolher. O número de 20 ou 30 exemplos é um ponto inicial sugerido, não prova estatística de cobertura suficiente.

A página contém uma nota explícita: vídeo e figura de três cartões antecedem uma quarta família citada no texto atualizado; o terminal usa modelos anteriores aos IDs do código atual. Assim, a própria fonte separa versões do material. Esta ficha registra a composição observada e não oferece um catálogo independente de modelos, preços ou elegibilidade atuais.

O código alterna três modelos com o mesmo prompt e limite de saída e imprime `response.usage`. O trecho publicado não implementa medição de relógio, embora a imagem do terminal mostre tempos. Reproduzir a tabela exigiria conhecer a instrumentação e o ambiente usados. A alegação de que a resposta mais elaborada vale ou não a diferença de custo é julgamento do autor sobre seu exemplo, sem uma rubrica publicada.

## Figuras conferidas

Os cartões mostram Haiku, Sonnet e Opus, com descrições de capacidade, velocidade e usos. Não são um benchmark. A imagem do terminal apresenta:

| Rótulo na figura | Tempo mostrado | Tokens de entrada/saída |
|---|---:|---:|
| Opus 4.7 | 2.511 ms | 25 / 105 |
| Sonnet 4.6 | 1.764 ms | 16 / 55 |
| Haiku 4.5 | 1.070 ms | 16 / 53 |

Esses são valores da captura, não medições desta pesquisa nem previsão de desempenho atual. O texto menciona respostas frequentemente abaixo de um segundo; o valor de Haiku nesta figura é superior a um segundo. Isso não refuta uma frequência não medida, mas impede usar a imagem como prova dessa afirmação. As saídas tratam do mesmo tema, prompt caching; a captura não mostra todo o pedido, repetição de amostras ou avaliação cega.

Os números de tokens diferem entre as linhas. Não infiro disso que a entrada foi alterada, nem assumo que contagem igual seria prova de igualdade sem examinar as requisições. Também não calculo preço só com esses números: a figura não fornece tabela de cobrança ou custo total comparável.

## Análise e aproveitamento

Escolher uma saída que alguém publicaria exige critérios anteriores à comparação. Num resumo de reunião, por exemplo, o aluno pode avaliar se preserva decisão, responsável e prazo, se distingue dúvida e se inventa tarefa. Uma resposta elegante que perde um responsável falha mesmo quando chega rápido. Essa rubrica é proposta editorial, não avaliação feita na fonte.

Separar entradas de desenvolvimento e verificação reduz o risco de ajustar tudo aos poucos exemplos conhecidos. Para iniciantes, poucos casos claros ensinam o procedimento; decisões de produção precisam ampliar casos e observar falhas reais. Não transformar o tamanho inicial sugerido pela aula em garantia universal de qualidade ou segurança.

O roteamento por tipo de tarefa adiciona outro componente a verificar: a decisão de encaminhamento. Escolher um modelo adequado para cada classe não resolve uma classificação errada que envia um caso complexo ao caminho simples. A fonte descreve uma fila com tarefas diversas, mas não apresenta código de roteamento, erros de classificação ou recuperação.

## Prática original proposta

Usar dez mensagens fictícias sobre horários de oficinas, com gabarito para pedido, data e informação ausente. Definir critérios antes de comparar dois candidatos disponíveis no ambiente preparado. Esta é proposta não executada, sem contratação, escolha de conta ou chamada paga.

1. **Qualidade:** conferir cada campo e registrar invenção/omissão; repetir com mensagens que não entraram no ajuste inicial. Não atribuir nota apenas ao estilo.
2. **Tempo e consumo:** medir de forma consistente, com mais de uma execução, e guardar os dados de uso. Comparar a tarefa completa, incluindo correções necessárias; não estimar economia com uma única amostra.
3. **Limite do roteamento:** acrescentar um caso ambíguo e conferir se o processo pede informação suficiente ou registra incerteza, em vez de produzir uma resposta indevidamente conclusiva.

L01 permanece plano revisado. Pendem vídeo, ambiente, versões, avaliação repetida e custo verificado. Brutos internos ignorados pelo Git; texto desta ficha é análise original.
