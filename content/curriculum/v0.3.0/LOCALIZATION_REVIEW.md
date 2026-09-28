# Localização da versão 0.3.0

A fonte inglesa final contém 1.192 mensagens. SHA256: `b6d7fb2a57d75927cd887986a9a7a3ae81f90b469eb199fc1f7717f376e1966e`.

O português e o inglês foram preparados junto com o conteúdo. Os nove outros idiomas são traduzidos diretamente pelos agentes de IA, sem resumir as etapas ou preencher lacunas com inglês. Nenhum catálogo curricular foi enviado a um serviço externo de tradução. Revisão humana de todos os idiomas permanece pendente; os metadados não classificam essas traduções como revisão humana.

O trabalho foi dividido por arquivos: Educador coordena espanhol, alemão, japonês, indonésio, hindi e chinês; Diretor coordena francês, coreano e árabe. O chinês é composto de três fragmentos com chaves disjuntas: 562 mensagens comuns/fundamentos/sites, 324 mensagens de apps e 306 mensagens de automação. O pacote só inclui o catálogo completo após a união e validação.

## Verificações

- Igualdade exata das chaves com a fonte final, valores não vazios e revisão de origem 0.3.0.
- IDs, gabaritos, ordem, código literal e pré-requisitos pertencem ao curso compartilhado; não são reescritos pela tradução.
- Comandos entre crases, URLs, nomes de arquivos, chaves de armazenamento, cabeçalho CSV, endereço fictício, horários e valores do exemplo permanecem literais.
- Revisão das seis mensagens alteradas no fechamento editorial, com atenção à cópia de teste atualizada, isolamento de dados, ensaio manual sem criar agenda e diferença entre disparo e execução manual.
- Verificação de direção RTL no catálogo árabe. A inspeção visual de componentes e navegação é coordenada pelo Artista e pelo Diretor.
- Contagem de mensagens ou igualdade de literais não certifica naturalidade linguística. Resultados e hashes efetivos estão em `VALIDATION.json`; catálogos em andamento não são entregues como completos.

## Revisão por amostra do Educador

O indonésio foi lido em pontos críticos: aviso e critérios de execução externa; corpo e pedido de recuperação da cópia; corpo e pedido do ensaio da agenda; cenário de histórico; verificação de ambiente; visibilidade pública; conclusões que distinguem tentativa e execução. As distinções entre real/simulado/pendente, os negativos, a preservação do relatório e o isolamento da chave principal foram mantidos na amostra. Isto não equivale a revisão humana ou leitura integral de cada tradução.

A parte chinesa do Educador foi traduzida integralmente a partir das 562 mensagens de origem e conferida durante a escrita. Nomes de pastas/arquivos, URLs, Contact, controles de interface e identificadores Version A/Version B foram preservados. A auditoria desse fragmento encontrou zero literais ausentes e zero mensagens copiadas do inglês.

O alemão também usa fragmentos disjuntos: 88 mensagens comuns/workspace, 162 de requests/verification, 312 de sites, 324 de apps e 306 de automação. O tratamento du/dein foi alinhado entre os tradutores.

O Educador também leu cinco mensagens críticas em espanhol, hindi e japonês: aviso externo, recuperação da cópia, pedido de ensaio manual, cenário de histórico e visibilidade. A negação de instalação de dependências no pedido hindi foi explicitada, preservando o sentido da fonte. Esta revisão por amostra não constitui revisão humana integral.

A amostra crítica também foi lida em francês e árabe. O Artista identificou um problema visual real de direção em exemplos técnicos do árabe: o conteúdo literal permanecia correto, mas aparecia reordenado em parágrafos RTL. O ajuste usa InlineCode apenas no catálogo árabe, com cada linha CSV delimitada separadamente; inglês/português permanecem congelados. `INLINE_LITERAL_FIXES.json` registra as nove mensagens e a prova de que, retirando os delimitadores, todos os textos continuam iguais à tradução original. Os recibos dos tradutores registram hashes anteriores a essa correção de apresentação e à clareza de negação no hindi; os hashes de entrega atualizados constam em `VALIDATION.json`.

Fechamento: os 11 catálogos integrais passaram pela compilação e auditoria conjunta, com 13.112 mensagens. Fragmentos foram arquivados em `authoring/fragments/`; os relatórios dos agentes preservam os caminhos e hashes de sua entrega original. Os manifestos de união registram a divisão exata sem sobreposição de chaves.
