# Site gerado durante a navegação — estudo integral do texto e imagens

[Artigo de Steve Sewell, Builder, 11/09/2024](https://www.builder.io/blog/ai-generated-website). Título observado no corpo: *I Built A Website That Is AI-Generated As You Browse It*; inventário usa *Building an AI Generated Website*. São a mesma URL, não dois estudos. `source_id=builder-blog`; leitura em 28/09/2026 de `studies/local/backfill-a05-builder-ai-website.txt`, linhas 1–125, integralmente. Sete imagens materiais inspecionadas. Um vídeo no corpo permanece não acompanhado: `text_read_complete=true`, `full_source_analyzed=false`.

## Sequência completa da fonte

| Linhas | Conteúdo e função |
| --- | --- |
| 8–26 | Apresenta Best of Web, comparações de projetos e geração sob demanda com cache; admite inexatidão. |
| 28–46 | Justifica navegação visual, ações sugeridas e descoberta de relações. |
| 48–60 | Defende respostas como combinação de opiniões da internet, com convite a análise crítica. |
| 62–72 | Discute qualidade e descoberta de conteúdo; propõe feedback para melhorar o sistema. |
| 74–84 | Relata construção com Claude via Cursor, incluindo horas de depuração e pequenas correções manuais. |
| 86–96 | Aponta custo elevado e limitações de resposta; convida a experimentar. |
| 98–125 | Pede opiniões e encerra com promoção e indicações. |

O mecanismo central é gerar quando não há conteúdo armazenado e reutilizar o resultado nas visitas seguintes. O autor relata bom desempenho factual em projetos conhecidos e pior em pouco conhecidos, mas não fornece amostra de avaliação. A participação de IA em 95% do código é autodeclaração, sem medição reproduzível.

## Evidência visual conferida

Capturas locais `backfill-a05-website-0.png`, `-2.png` a `-7.png`, com hashes no manifesto:

| Captura | Observação e limite |
| --- | --- |
| `0` | Capa compara conversa e interface navegável; ilustração. |
| `2` | Fluxo consulta cache, gera se necessário, armazena e exibe. |
| `3` | Comparação conceitual favorece hierarquia visual e descoberta por cliques. |
| `4` | Desenho liga seleção de conteúdo, feedback e melhoria; não comprova filtro operacional. |
| `5` | Ciclo de orientação humana, geração de código e depuração. |
| `6` | Meme sobre IA produzir uma aplicação que também usa IA. |
| `7` | Gráfico diário mostra US$ 3.601,38 em 11 de setembro e informa incluir API e Console. |

A última imagem não identifica a parcela de cada projeto, número de visitantes ou custo por página. Não prova que o site sozinho consumiu todo o valor. Trata-se de registro ilustrado de 2024, sem autenticação de fatura ou valor atual de uso. O vídeo identificado no corpo não foi assistido; os diagramas não o substituem.

## Análise do mecanismo e de suas falhas

**Inferência editorial:** guardar uma resposta pode reduzir chamadas repetidas, mas guarda também um eventual erro. Corrigir o prompt não informa, por si só, se páginas previamente armazenadas serão refeitas. Para um produto verificável, o plano precisa definir validade do conteúdo, modo de corrigir uma entrada e critério para distinguir resposta antiga de nova. O artigo não documenta essa política.

Também são duas decisões diferentes usar IA para construir o código e usar IA para responder a cada visita. A segunda introduz dependência de serviço, espera, custo por uso e conteúdo variável durante a operação. Um iniciante que quer uma página de apresentação pode não precisar dessa arquitetura. O caso é útil para aprender a fazer essa distinção antes de executar.

A caracterização de modelos como uma média da internet não oferece procedimento para demonstrar neutralidade ou atualização. A própria fonte reconhece respostas inventadas. Não ensinar que uma comparação gerada é confiável porque mistura perspectivas; pedir evidência apropriada para o fato e registrar o que não foi verificado. Da mesma forma, o diagrama de descoberta por qualidade é a visão do autor, não prova de que conteúdo incorreto ficará invisível nos mecanismos de busca.

**Falhas relatadas versus correções demonstradas:** o texto admite problemas factuais e horas de debugging, mas não mostra um defeito concreto do código, sua alteração e reteste. A menção a JSON como linguagem aparece como advertência ilustrativa, sem entrada/saída reproduzível. Feedback e melhoria são possibilidades descritas; não houve acompanhamento de uma correção efetiva nesta ficha.

## Pré-requisitos, atualidade e adequação

A implementação real pressupõe backend, cache, chamadas de API, controle de configuração e capacidade de depurar. O artigo cita Cursor Compose e Claude 3.5 Sonnet de 2024; não é tutorial atual de instalação, modelo ou hospedagem. Não apresenta arquivo de projeto, sequência de deploy ou configuração de limites de uso.

É apropriado como estudo posterior de arquitetura e consequências de design. Não é o primeiro tutorial autossuficiente de site para pessoa comum. O caso permanece no corpus pelo contraste entre aparência pronta, conteúdo ainda incerto e operação custosa. Complementa a fonte de confiabilidade em articles-04, acrescentando o problema de conservar respostas e avaliar informação entregue ao usuário.

Em L01, a contribuição é uma pergunta de plano: o projeto realmente precisa gerar algo enquanto o visitante navega, ou conteúdo revisado previamente atende? A entrega segue sendo plano revisado. Referências externas e uso atual do site não foram verificados; não apresentá-lo como serviço recomendado hoje.

## Prática original: catálogo com respostas controladas

Proposta não executada. Preparar três fichas fictícias de oficinas, cada uma com nome, duração e materiais, fornecidas pelo instrutor. Planejar uma interface de comparação que use essas fichas como fonte, sem inventar fatos. Na primeira etapa, a geração pode ser simulada com respostas locais para aprender navegação e cache sem depender de uma API paga.

Definir uma pergunta que a ficha permite responder e uma que não permite. Registrar também como uma correção na ficha deve aparecer em conteúdo já armazenado. O objetivo é aprender a verificar função e informação separadamente; não reproduzir o catálogo técnico do artigo.

**Check 1 — fidelidade e desconhecimento:** comparar duas oficinas e conferir duração e materiais contra as fichas originais. Perguntar sobre um dado ausente, como certificação; o resultado deve reconhecer a ausência, sem criar uma promessa. Se aparecer informação inventada, registrar entrada, saída, esperado e repetir o caso após corrigir.

**Check 2 — reutilização e atualização:** abrir a mesma comparação duas vezes e conferir, por um contador de ensaio ou registro preparado, se a segunda reutiliza o conteúdo. Alterar uma duração na fonte de teste e executar o procedimento de atualização definido; conferir que a versão antiga deixa de ser exibida. Repetir o primeiro check após atualizar para observar regressão.

Se a aula posterior usar uma API real, separar o teste de integração desse ensaio local, registrar quantidade de chamadas e tratar falha de serviço com um estado compreensível. Não extrapolar custos de uma única execução nem prometer resposta instantânea. Entrega: plano, dados de referência, comportamento observado, erro/correção quando houver e evidência dos dois checks.

## Escopo não revisado

Não foram assistidos o vídeo, inspecionados código/cache reais, visitado o aplicativo externo ou reproduzidos gastos e desempenho. Não se verificaram afirmações sobre busca, neutralidade ou precisão dos modelos. O estado integral é textual; a fonte multimídia permanece pendente. Originais e capturas ficam locais e ignorados pelo Git, sem licença de republicação presumida.
