# Estudo integral, separado de aquisição

Inventariar um vídeo ou exportar uma transcrição não equivale a estudar a fonte. O mesmo vale para coletar HTML. Metadados, capítulos, descrição, texto auxiliar da aula e resumo de terceiro não são substitutos do conteúdo original.

Estados de estudo: `not_started`, `partial`, `transcript_analyzed_visual_pending`, `full_source_analyzed`. Estados de aquisição e verificação temporal permanecem independentes no manifesto de transcrições.

Para cada fonte estudada, uma ficha em `studies/` deve registrar:

1. Identidade, URL, idioma, data, artefato e hash exato estudado; páginas/linhas ou intervalos efetivamente lidos. Registrar o que faltou e por quê.
2. Sequência completa do raciocínio ou da demonstração, inclusive desvios, publicidade, falhas e encerramento. Uma lista de capítulos copiada não satisfaz esta etapa.
3. Pré-requisitos explícitos e implícitos, ferramentas/superfícies, exemplos e resultados observados pelo autor.
4. Erros, limitações, alegações ainda não verificadas, contradições e possíveis mudanças de produto. Separar fala do autor de inferência editorial e de fato primário confirmado.
5. Evidências breves temporizadas/localizadas para afirmações relevantes. Não republicar texto integral protegido por meio da ficha.
6. Impactos curriculares concretos: competência, prática, ao menos duas verificações distintas, transferência e limites de uso da fonte. Referenciar IDs reais quando houver proposta formal.
7. Para vídeo operacional, conferir os trechos visuais necessários: registrar ponto efetivamente visto, captura local quando útil e resultado. Ler legenda não permite afirmar que assistiu ao vídeo. Uma captura isolada também não prova toda a demonstração.
8. Manter `full_source_analyzed=false` enquanto existirem partes materiais sem estudo, problemas de transcrição ou verificação visual necessária pendente. Leitura integral de uma faixa é reportada como tal, não como consumo integral do audiovisual.

As 23 fichas do ciclo inicial declaram leitura por seções/metadados. Elas não recebem certificação retroativa de estudo integral. Evidências já registradas continuam válidas apenas para seu escopo explícito. Aulas não devem atribuir uma sequência operacional completa a uma fonte ainda não estudada por inteiro.
