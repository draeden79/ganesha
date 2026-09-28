# Create a full-stack app with AI — estudo integral do texto

[Artigo de Alice Moore, Builder, 09/10/2025](https://www.builder.io/blog/create-full-stack-app-ai). `source_id=builder-blog`; estudo em 28/09/2026. Leitura completa de `studies/local/backfill-a04-builder-full-stack.txt`, linhas 1–174. Duas imagens materiais conferidas; três vídeos com posters identificados, mas não acompanhados. `text_read_complete=true`; `full_source_analyzed=false`. O manifesto registra hashes e os intervalos efetivamente lidos.

## Sequência operacional descrita

| Linhas | Etapa e resultado pretendido |
| --- | --- |
| 8–20 | Propõe Wishboard: ideias, votos e estados, com Fusion, Supabase e Netlify. |
| 22–38 | Cria projeto com UI, estado temporário e filtros previstos como placeholders. |
| 40–54 | Recomenda experimentar, listar problemas e iterar; relata filtros visualmente presentes, inertes. |
| 56–68 | Conecta GitHub, cria repositório ou vincula um existente. |
| 70–107 | Autoriza Supabase via MCP; solicita dados e integração sem login inicial; recomenda conferir tabelas e refletir edições na UI. |
| 109–125 | Autoriza Netlify e pede criação do site, deploy e URL. |
| 127–151 | Sugere login e outras extensões; repete sequência e promove produto. |
| 153–174 | Promoção e indicações de outras leituras. |

Os prompts de UI, backend e deploy estão presentes no texto. A proposta de verificar dados no serviço é concreta; não há registro textual dos dados finais, resultado dos checks ou reteste de defeitos. A promessa de corrigir em poucas rodadas não é garantia demonstrada.

## O caso dos filtros: especificação antes de chamar de erro

O prompt inicial, linha 32, pede filtros de status e tag como placeholders. A discussão posterior, linhas 44–48, trata controles visíveis que não funcionam como problema a corrigir. **Análise editorial:** com esse pedido, a ausência de filtragem pode ser exatamente o escopo solicitado. O material não prova que a IA descumpriu a especificação. Para ensinar correção, primeiro distinguir uma função prometida que falhou de uma função que ainda não foi implementada.

Essa distinção muda o próximo pedido. Para um defeito, registrar ação, observado e esperado. Para evolução do protótipo, definir comportamento novo, dados de entrada e critérios de aceitação. A aparência de um filtro não informa ao aluno em qual categoria ele está; o contrato da etapa deve informar.

O texto também chama o resultado de CRUD, mas não documenta igualmente criar, ler, atualizar e apagar. Adicionar ideia e votar estão especificados; não concluir que toda operação de administração está pronta. O título da seção de hospedagem menciona domínio personalizado, porém o procedimento textual termina na obtenção de uma URL; não ensina registro ou configuração de domínio.

## Evidência visual e superfície

`studies/local/backfill-a04-full-stack-cover.png` é um esquema dos três serviços. `backfill-a04-full-stack-mcp.png` mostra a área MCP Servers, cartões de integrações e controles de conexão. Há uma mensagem de integrações futuras na própria captura. Ela ajuda a localizar a área do produto na época, mas não comprova autorização, criação de tabelas ou disponibilidade atual.

Os três vídeos incorporados não foram assistidos. Posters não foram contados como demonstrações de funcionamento. Nenhum projeto foi criado, conectado ou publicado durante o estudo. As interfaces são do Builder/Fusion; não transferir esses cliques para Claude Desktop ou Codex.

## Pré-requisitos e consequências da integração

A reprodução pressupõe contas e acesso a Builder, GitHub, Supabase e Netlify, além de um ambiente onde os conectores indicados estejam disponíveis. O starter inicial já vem preparado, segundo a fonte. Conta, organização, projeto, repositório, prévia e URL publicada são objetos diferentes que o aluno precisa distinguir.

O banco entra depois de um protótipo que perde seu estado ao atualizar a página. Essa mudança oferece uma verificação simples e útil: o mesmo item continuar existindo após recarregar é requisito novo, não defeito da primeira etapa. Conferir também a linha no destino ajuda a evitar confundir memória temporária da UI com persistência.

**Limite da evidência:** a fonte apresenta MCP e OAuth como redução de trabalho manual, mas autorização do conector não comprova que o aplicativo final tem controle adequado de acesso. O tutorial inicial dispensa login e não apresenta as políticas finais de dados, regras de voto ou configuração do segredo. A classificação de uso público com dados reais exige uma verificação adicional que o artigo não entrega. Para o exercício, usar somente dados fictícios em projeto preparado.

Ter histórico de versões ajuda a revisar mudanças, mas não prova testes configurados, possibilidade de desfazer alterações externas no banco ou correção do deploy. O aluno deve registrar qual mudança foi feita e o que conseguiu conferir. A frase comercial de estar a um prompt de uma aplicação convive com uma sequência real de contas, conexões e iterações.

## Atualidade, relação com estudos anteriores e lacunas

É um tutorial de outubro de 2025, com produto e interface daquele momento. Compatibilidade atual, nomes dos conectores, políticas, limites e custos não foram verificados. O mecanismo geral de prototipar, persistir, publicar e revisar continua útil como organização de trabalho, sem servir de manual atual de cada serviço.

Complementa o artigo Figma→site de articles-03. Aqui o ponto de partida é um pedido textual e o comportamento muda explicitamente de temporário para persistente; lá o ponto de partida era um design. O acréscimo pedagógico desta ficha é o contrato por etapa e a distinção entre placeholder e bug.

Para pessoas comuns, é um caso posterior com ambiente orientado: conecta várias contas e introduz dados persistentes. Em L01, termina no plano revisado e nos checks planejados. Lacunas: login e regras de autorização, falhas de rede, duplicidade, deleção, recuperação, vídeos, teste público real e domínio personalizado. Elas permanecem no corpus, sem eliminar o artigo ou preencher a evidência com suposição.

## Prática original: quadro de sugestões com estados declarados

Proposta não executada. Construir posteriormente um quadro fictício de sugestões para uma biblioteca, com duas categorias e votos. Antes de executar, listar para cada etapa o que funciona e o que é apenas visual. Na versão inicial, dados temporários e filtro desativado identificado são aceitáveis se assim estiver especificado. Na versão seguinte, pedir persistência e filtragem funcional, com exemplos concretos.

**Check 1 — comportamento da filtragem:** cadastrar duas ideias fictícias, uma em cada categoria. Selecionar a primeira categoria e conferir que só o item correspondente aparece; limpar o filtro e conferir que ambos retornam. Se nada mudar, usar o contrato da versão para decidir se é pendência prevista ou defeito. Na versão funcional, relatar as ações e resultados, corrigir e repetir a mesma sequência.

**Check 2 — persistência e integridade do voto:** criar uma terceira ideia com identificador de ensaio, votar uma vez, atualizar a página e conferir que item e contagem permanecem. No destino de teste, conferir a linha correspondente e sua contagem. Registrar a regra esperada para repetir um voto; sem essa definição, não tratar múltiplos cliques como sucesso ou erro universal.

Após corrigir filtragem, repetir persistência e voto para detectar regressão. Após publicar com o procedimento oficial escolhido, abrir a URL como visitante e repetir ambos os checks. Um link retornado pelo agente, isoladamente, não conclui essa etapa. Se alguma verificação depender de login ainda inexistente, marcar a lacuna no relato.

Entrega posterior: plano, matriz do que está implementado por versão, evidência da UI e do destino dos dados, erro reproduzível se houver e resultado do reteste. Nenhum caso de teste ou resultado desta prática foi observado no projeto da autora; são propostas originais para tornar a aprendizagem verificável.

## Escopo não revisado

Não foram acompanhados os três vídeos, executadas integrações, auditados schema/regras de acesso ou verificados a URL e os serviços atuais. Guias externos vinculados não foram lidos nesta ficha. Originais e capturas ficam locais e ignorados pelo Git, sem licença de republicação presumida.
