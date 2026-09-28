# What is thinking? — esforço configurado e qualidade observada

[Aula da Claude Academy](https://academy.claude.com/courses/claude-platform-101/what-is-thinking), texto inteiro lido em 28/09/2026. Artefato `studies/local/backfill-ac15-thinking.txt`; três figuras inspecionadas. Vídeo `4SunBsMGRwA` pendente, sem rótulo Transcript observado. Leitura textual completa não certifica a fala ou a execução; nenhuma chamada de API foi realizada.

## Sequência e configuração descrita

A aula introduz respostas rápidas que podem errar em problemas com várias etapas. Apresenta processamento adicional antes da resposta, diferencia configuração de esforço e exposição de um resumo e descreve parâmetros para um modelo específico. Depois sugere classes de tarefa, mostra uma solicitação de viagem com ferramenta de clima e termina numa interface de revisão de documentos.

O exemplo configura pensamento adaptativo, pede resumo e coloca esforço dentro de `output_config`. O ponto transferível é separar essas escolhas: recurso habilitado, intensidade solicitada e informação devolvida não são o mesmo controle. Um resumo de raciocínio não é uma transcrição integral de todos os processos internos nem uma auditoria de correção.

O texto recomenda maior esforço para problemas complexos e menor para tarefas simples, mas não publica uma comparação de acurácia, latência e consumo sobre conjunto de casos. As afirmações de benefício e desperdício são orientação geral do autor, não medição feita nesta página.

## O que aparece nas imagens

1. O diagrama mostra um aplicativo, um modelo e a resposta “6.5 apples”. O texto da aula a chama de erro, mas a figura observada não contém o enunciado completo; não permite recalcular a resposta por si só.
2. O quadro enumera matemática, lógica em etapas, depuração, análise regulatória e comparações. São categorias de uso, sem resultados experimentais.
3. A interface tem revisão aprofundada selecionada e mensagem de processamento. Não mostra a chamada real, parâmetros, resposta, achados finais ou comparação com a opção desligada.

Essas imagens ilustram intenção e estado de interface. A seleção de um checkbox não prova que o backend recebeu a configuração pretendida, nem que a qualidade melhorou. O exemplo de revisão técnica não foi validado como orientação de conformidade.

## Limites e conferência de atualidade

O código publicado executa uma única chamada com uma ferramenta declarada. Não inclui execução de `get_weather`, devolução do resultado, repetição do laço ou impressão dos blocos finais. Assim, o texto que descreve recomendações após consultar cidades pressupõe etapas ausentes desse fragmento. Também não há ferramenta explícita para tempos de deslocamento, embora esse seja um critério da viagem. A completude do planejamento não pode ser presumida.

Trechos da [documentação atual de controle de raciocínio](https://platform.claude.com/docs/en/build-with-claude/thinking-steering-and-cost) confirmam esforço como orientação flexível, em `output_config.effort`, com disponibilidade e padrões dependentes do modelo. O padrão indicado para Opus 5.5 é diferente do descrito para o modelo da aula. Foi uma conferência pontual: não deve haver transplante dos parâmetros/defaults para qualquer modelo ou superfície sem consulta pertinente.

Usar maior esforço não substitui dados externos necessários. Se o pedido depende de clima atual ou tempo real de trajeto, a prática precisa fornecer ou obter essas informações e registrar sua origem. Raciocinar mais sobre entrada incompleta pode continuar produzindo uma resposta inadequada. Essa é interpretação editorial do fluxo, não incidente reproduzido.

## Prática original proposta

Em ambiente de ensaio, comparar duas opções de agenda para oficinas fictícias, com durações, capacidade e restrições fornecidas. Preparar um caso simples e outro com conflito entre critérios; definir antecipadamente o que torna a proposta válida. A atividade pode comparar níveis suportados por uma ferramenta disponível, sem prometer equivalência com os controles desta API.

1. **Correção:** conferir soma de tempos, capacidade e todas as restrições. Uma explicação longa não compensa violar um limite explícito.
2. **Informação ausente:** retirar um dado necessário e verificar se a resposta registra a falta ou pede esclarecimento. Não aceitar valor inventado como solução.
3. **Comparação:** repetir os casos, registrar resultado e tempo pelo mesmo método e decidir se a diferença atende ao critério. Um único exemplo não estabelece melhora geral.

A prática não foi executada. L01 pode planejar os critérios, mantendo entrega restrita ao plano revisado; nenhum módulo novo foi criado. Pendem vídeo, integração completa de ferramentas e avaliação real. Originais locais ignorados pelo Git, sem licença de republicação presumida.
