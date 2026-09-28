# Why Is AI Design Bad? — estudo integral do texto

[Artigo de Alice Moore, Builder, 25/09/2025](https://www.builder.io/blog/ai-design). `source_id=builder-blog`; estudo em 28/09/2026. O texto completo foi lido, inclusive fechamento comercial e recomendações de outras leituras. Três diagramas foram conferidos visualmente. Dois elementos de vídeo da página não foram assistidos: `text_read_complete=true`, `full_source_analyzed=false`.

Original textual: `studies/local/backfill-a01-builder-ai-design.txt`, 115 linhas, 8.133 bytes. Leitura: 1–115, sequencial e sem truncamento. HTML original também foi preservado, mas não é o objeto da leitura textual. O manifesto guarda hashes, bytes e método. Os brutos e screenshots são locais, ignorados pelo Git, sem licença de republicação presumida. A captura do texto usa `main.innerText` da página renderizada; uma extração HTML inicial incompleta foi substituída, não certificada.

## Argumento completo, em ordem

Reconstrução concisa, sem transcrever o original:

| Linhas | Movimento do argumento |
| --- | --- |
| 8–18 | Distingue tarefas repetitivas, guiadas por regras, de decisões criativas difíceis de especificar. |
| 20–30 | Contrasta verificação de código com escolhas visuais intuitivas; reserva direção criativa à pessoa. |
| 32–40 | Compara edição textual e visual; argumenta que descrever cada ajuste em palavras dificulta o retorno. |
| 42–50 | Critica saídas genéricas, duplicação e perda de organização; propõe reutilização e hierarquia. |
| 52–62 | Imagina alterações visuais refletidas diretamente no produto e apresenta isso como objetivo do Fusion. |
| 64–72 | Vincula consistência a componentes e tokens compartilhados. |
| 74–86 | Descreve edição visual convertida em mudanças de código, em rascunho, sujeitas a revisão. |
| 88–115 | Conclui com direção humana e promoção do produto; encerra com chamadas comerciais e outras leituras. |

Exemplos: padronizar fontes, ampliar um título e trocar um botão. Os diagramas contrapõem verificação com retorno, sequência visual sem restrições explícitas e mudança humana seguida de adaptação/verificação. São modelos argumentativos da autora, não resultados experimentais.

## Leitura dos visuais

Foram abertas as URLs de imagem presentes no DOM e registradas capturas do navegador, sem baixar vídeos. Evidências:

- `studies/local/backfill-a01-design-code-loop.png`: ciclo de código, diagrama 1.
- `studies/local/backfill-a01-design-design-loop.png`: ciclo de design, diagrama 2.
- `studies/local/backfill-a01-design-better-loop.png`: alternativa proposta, diagrama 3.

As imagens foram examinadas de fato; a análise não se limita aos textos alternativos. Duas tags `video` foram inventariadas no corpo. Não tinham URL de mídia em `src`/`source` naquele estado do DOM, mas tinham posters. Isso não comprova ausência de vídeo nem autoriza marcar suas animações como vistas. Ilustrações de capa, pixels de rastreamento e cards do rodapé não foram tratados como evidência operacional.

## Avaliação e distinção entre fonte e inferência

**Tese editorial útil:** uma pessoa deve conseguir apontar o resultado desejado e avaliar a mudança no mesmo objeto que será entregue. Essa é a interpretação curricular deste estudo. Não exige comprar a ferramenta promovida nem abandonar descrições textuais.

**Limite do enquadramento:** os diagramas são simplificações. Na prática proposta abaixo, a intenção estética fica com o aluno, mas parte do resultado visual ganha condições verificáveis: texto visível, posição, coerência entre páginas e funcionamento de controles. Não interpretar “design” como ausência absoluta de critérios ou “código” como automaticamente correto por passar verificações existentes.

**Limite comercial:** a autora escreve no blog do fornecedor. A ficha não executou Fusion, não mediu esforço economizado e não verificou a promessa de correspondência entre visual e produção. Os resultados devem ser descritos como alegações do produto, não como capacidades comprovadas pela pesquisa. Uma mudança pequena também pode afetar vários usos de um componente; tamanho do ajuste visual e alcance funcional não são equivalentes.

**Atualidade:** a data é 2025; nomes, interface e oferta do produto podem ter mudado. É uma fonte para comparar formas de revisão e reutilização, não manual atual de instalação. O texto é público. Nenhum paywall foi observado no corpo completo.

## Pré-requisitos, pertinência e lugar no curso

Para entender o argumento basta reconhecer página, botão, título e repetição de elementos. Para experimentar a técnica é preciso uma página de teste, acesso ao arquivo/projeto e modo de prévia. É útil apresentar “componente” como uma peça reutilizada e “token” como um valor de estilo compartilhado antes de entrar em ferramentas específicas. Essas são escolhas de preparação propostas pelo estudo, não requisitos de acesso demonstrados pela autora.

Uso inicial: em L01, escolher a intenção e revisar um plano que permita observar o resultado. Nas etapas seguintes, comparar pedido textual, anotação visual e verificação da implementação. Há sobreposição com prompting oficial sobre contexto; a contribuição distinta é pensar na representação visual da intenção. O artigo permanece no corpus mesmo quando não é leitura obrigatória da primeira aula.

Não ensina publicação, testes móveis completos, acessibilidade, restauração de versão, preparação de repositório ou prova de integridade do código. Essas lacunas delimitam seu uso, sem excluir o conteúdo de estudo posterior.

## Prática original: ajustar uma família de cartões

Proposta deste estudo; não executada e não atribuída à autora. Usar uma cópia de página com três cartões de serviços. Objetivo: destacar o serviço principal mantendo os outros legíveis e o contato disponível. L01 termina no plano aprovado: o aluno marca qual cartão deve receber ênfase, explica por quê e lista o que deve continuar igual.

Na etapa de implementação, pedir uma única alteração por rodada. Exemplo original: “No cartão de jardinagem, destaque o título e aumente o espaço antes do botão. Use os estilos existentes. Antes de alterar, indique se esse ajuste afetará todos os cartões ou só este. Depois mostre a prévia e os arquivos modificados.” A anotação pode ser feita numa captura; não depende do Fusion.

**Check 1 — resultado percebido e comportamento:** na prévia, identificar qual cartão parece prioritário; confirmar que os três títulos continuam legíveis e que os três botões abrem seus destinos esperados. Repetir com largura menor. Registrar uma captura antes/depois e qualquer diferença entre intenção e resultado.

**Check 2 — alcance da mudança:** comparar os três cartões e outra página que use a mesma peça, se existir. Conferir se o ajuste se espalhou apenas onde estava previsto. Solicitar ao agente os arquivos alterados e a justificativa de cada um; explicar, em linguagem comum, se houve alteração compartilhada ou local. Se o alcance estiver errado, formular correção e repetir os dois checks.

Entrega: plano de intenção, evidência visual e registro do alcance real. Um resultado bonito sem confirmação de botões e abrangência ainda não encerra a atividade. Não exigir que o iniciante audite arquitetura para avaliar sua primeira modificação; dúvidas sobre o efeito compartilhado devem ser explicitadas.

## Pendências reais

Texto integral: concluído. Diagramas centrais: concluídos. Animações/vídeos: pendentes. Produto e código: não executados/auditados. Referências ligadas pelo artigo: não estudadas nesta rodada. A leitura integral do texto não recebe certificação de consumo integral de toda a página multimídia.
