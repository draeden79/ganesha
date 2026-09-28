# Turn a Figma Landing Page into a Live Website — estudo integral do texto

[Artigo de Alice Moore, Builder, 24/03/2026](https://www.builder.io/blog/turn-a-figma-landing-page-into-a-live-website). `source_id=builder-blog`; estudo em 28/09/2026. Texto renderizado lido integralmente: `studies/local/backfill-a03-builder-figma-live.txt`, linhas 1–137, 7.945 bytes, incluindo fechamento e promoção. A capa foi inspecionada. Cinco vídeos/animações da demonstração não foram assistidos.

`text_read_complete=true` para todo o texto disponível no corpo renderizado; `full_source_analyzed=false` para a fonte multimídia. A página anuncia um exemplo de prompt de importação, mas esse conteúdo não aparece no texto extraído; a ficha não o reconstrói por suposição. O prompt de integração do formulário, por sua vez, está no texto. Hashes e cobertura constam no manifesto, com `kind=text` para leitura e `kind=raw_html` para HTML apenas coletado.

## Sequência completa descrita no artigo

| Linhas | Reconstrução concisa |
| --- | --- |
| 8–24 | Parte do template Positivus, com versões desktop/móvel e seção de contato. |
| 26–36 | Seleciona frames, exporta pelo plugin Builder e copia o resultado. |
| 38–44 | Relaciona estrutura e Auto Layout à qualidade da importação. |
| 46–52 | Cria projeto e cola frames; avisa que duas versões não garantem perfeição. |
| 54–69 | Corrige pontos específicos por reexportação ou seleção localizada; relata melhora dos logos. |
| 71–77 | Usa Design mode para ajustes próximos do resultado desejado, considerando responsividade. |
| 79–91 | Conecta Supabase e solicita tabela, envio dos campos e estado de sucesso. |
| 93–99 | Encaminha preparação/publicação a tutorial Netlify e relata obtenção de URL. |
| 101–137 | Propõe repetir por páginas/seções, deixando animações para depois; encerra com promoção. |

O erro relatado é de fidelidade visual, com melhoria qualitativa após novo contexto. Não há no texto medidas antes/depois, prova de inserção da linha no banco ou teste independente do endereço público. A narrativa completa é estudada; a demonstração operacional integral permanece pendente.

## Evidência visual e lacunas do suporte

`studies/local/backfill-a03-figma-live-cover.png` mostra a representação de copiar design para uma página. É capa conceitual, não evidência de exportação realmente executada nesta pesquisa.

No DOM, foram vistos cinco elementos de vídeo com dimensões e posições no corpo, mas sem `src`, `source` ou poster naquele estado. Não se deduziu que os vídeos não existem nem que foram assistidos. As sequências de exportação, edição, integração e resultado não receberam certificação visual. A ficha tem evidência do texto e da existência das lacunas, sem substituir animação por metadados.

Não houve tentativa de reconstruir o prompt ausente, usar imagens de outras fontes como se fossem do tutorial ou apresentar a capa como screenshot do aplicativo em operação. Brutos e capturas são locais e ignorados pelo Git, sem licença de republicação presumida.

## Pré-requisitos e dependências reais

O fluxo pressupõe design utilizável no Figma, plugin Builder, conta/projeto Builder, acesso a backend Supabase e integração com hospedagem. A conexão dos serviços depende de páginas externas indicadas, que não foram estudadas nesta ficha. O artigo não oferece sozinho configuração completa de credenciais, permissões, banco e publicação.

Para acompanhar sem adivinhar, o aluno precisa reconhecer frame, seção, breakpoint, prévia e origem dos dados. Uma pessoa iniciante pode aprender a comparação visual e o envio de formulário sem conhecer toda a tecnologia, mas precisa de um ambiente de aula preparado. Configurar vários serviços enquanto aprende o primeiro pedido aumenta a quantidade de decisões simultâneas.

A correção por seção é transferível a outras ferramentas: fornecer contexto suficiente para o ponto errado e avaliar seu resultado. Os rótulos de interface e as integrações são específicos do produto e da data. Não são instruções de Claude Desktop ou Codex. Não se verificaram versões atuais, preços ou limites dos serviços.

## Análise editorial e distinção entre aparência e função

**Inferência para o curso:** este caso amplia o protótipo ao ligar uma interface a um destino de dados. Por isso exige duas formas de verificação: a pessoa conseguir usar a interface e a ação produzir o registro correto. Ver uma mensagem de sucesso não comprova, sozinha, que houve gravação. Essa conclusão é uma regra de avaliação proposta aqui, não um erro observado no projeto da autora.

A fonte também separa importação ampla e correção localizada. Isso oferece um procedimento útil: comparar com o design, identificar o menor trecho divergente, decidir se falta estrutura ou apenas ajuste de tamanho e verificar novamente. Não transformar esse procedimento numa promessa de poucas rodadas para qualquer arquivo; a autora não apresenta distribuição de resultados.

O texto diz que a integração pode criar a tabela necessária, mas não documenta seu esquema final, regras de acesso, validação ou tratamento de envio duplicado. Não se pode atribuir essas qualidades ao protótipo apenas porque existe formulário. Na prática original, usamos dados fictícios e definimos explicitamente campos, destino e critérios antes da execução.

A publicação remete a outro tutorial. Esta fonte não demonstra nesta ficha o caminho completo de uma conta nova até uma URL funcionando para visitante. Seu valor é mostrar as dependências e a sequência de trabalho; não substitui o quickstart oficial de hospedagem já separado no corpus.

## Pertinência e organização no curso

Tema: implementação de site a partir de design existente, integração de dados e revisão responsiva. Nível: posterior à primeira aula, com ambiente preparado. Em L01, usar somente como exemplo de plano com entradas, etapas e verificações; a entrega continua sendo plano revisado.

Complementa o protótipo de padaria estudado em articles-02: lá o fluxo de pedido usava dados fictícios; aqui a intenção é persistir um formulário em backend. Não equiparar esses dois resultados. Também complementa a ficha TDD deste lote, que distingue regras, integração, visual e jornada.

Permanecem no corpus os detalhes técnicos e integrações mesmo que não façam parte do caminho inicial. Lacunas: animações, preparação dos serviços, testes negativos, código final, regras de dados, acessibilidade e comprovação de publicação. Não eliminar o artigo por essas lacunas nem preenchê-las com demonstrações inventadas.

## Prática original: página de interesse com dados de teste

Proposta deste estudo; não executada. Usar um design próprio ou autorizado de página para uma oficina fictícia. Deve conter título, descrição, horário de exemplo e formulário com dois campos de teste. O plano declara onde os dados de ensaio serão gravados e o que o visitante verá ao enviar. L01 termina no plano revisado, sem conectar serviços.

Na etapa posterior, importar desktop/móvel se ambos existirem. Comparar título, seções e formulário com o design antes de pedir nova funcionalidade. Se um logo ou imagem estiver errado, fornecer só a seção correspondente e pedir a correção delimitada. Guardar o estado anterior para verificar o efeito da alteração.

**Check 1 — equivalência visual e uso:** em duas larguras, conferir se conteúdo essencial e botão continuam visíveis, se rótulos se relacionam aos campos e se a ordem de leitura faz sentido. Registrar uma divergência concreta, corrigi-la e repetir as duas larguras. Não exigir identidade de cada pixel quando o comportamento responsivo pretendido pede reorganização.

**Check 2 — ação e persistência:** enviar um registro fictício identificável, conferir a mensagem na interface e verificar no destino de teste que os dois campos chegaram corretamente uma única vez. Tentar enviar faltando um campo definido como obrigatório; conferir que a interface explica o problema e que nenhum registro inválido foi criado. Se a mensagem disser sucesso sem linha correspondente, registrar a diferença e pedir investigação antes de aceitar a integração.

Depois de uma correção visual, repetir o envio de teste para observar regressão. Para publicação, seguir a fonte oficial de hospedagem escolhida e repetir a jornada na URL publicada em sessão de visitante. Essa última etapa é uma extensão do exercício, não prova de publicação feita durante o estudo.

Entrega: design de referência, plano de integração, capturas em duas larguras e registro dos envios válidos/inválidos. Diferenciar no relato “aparência conferida”, “dados persistidos” e “URL pública verificada”; nenhum desses estados implica automaticamente os outros.

## O que não foi revisado

Não foram assistidos os cinco vídeos, lidos os guias externos completos, executados Figma/Builder/Supabase/Netlify ou publicado projeto. Não houve auditoria do banco, do código ou de segurança. Texto integral disponível foi analisado; a fonte multimídia e o procedimento operacional completo permanecem pendentes.
