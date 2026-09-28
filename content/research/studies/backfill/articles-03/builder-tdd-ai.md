# Test-Driven Development with AI — estudo integral do texto

[Artigo de Alice Moore, Builder, 29/07/2025](https://www.builder.io/blog/test-driven-development-ai). `source_id=builder-blog`; estudo em 28/09/2026. Leitura integral de `studies/local/backfill-a03-builder-tdd-ai.txt`: linhas 1–133, 11.045 bytes, incluindo exemplos, conclusão e promoção. Diagrama e meme foram inspecionados; quatro vídeos com posters foram inventariados, mas não assistidos.

`text_read_complete=true`; `full_source_analyzed=false`. O manifesto identifica texto lido como `kind=text` e HTML apenas adquirido como `kind=raw_html`; registra hashes, bytes e cobertura. Capturas e originais são locais, ignorados pelo Git, sem licença de republicação presumida. Não foram executados código, testes ou ferramentas do artigo.

## Argumento completo e demonstrações descritas

| Linhas | Reconstrução concisa |
| --- | --- |
| 8–22 | Apresenta TDD como falhar, implementar o mínimo e refatorar preservando testes. |
| 24–32 | Reconhece custo inicial, manutenção e diferença entre cobertura e ausência de defeitos. |
| 34–45 | Defende agentes como executores de objetivos verificáveis e apresenta um carrinho como caso. |
| 47–57 | Pede cálculo de total e testes de carrinho vazio, um item e vários itens. |
| 59–71 | Conecta cartão e resumo usando teste de integração; descreve obtenção de documentação e configuração. |
| 73–85 | Compara estados vazio/preenchido para corrigir espaçamento e propõe conferir capturas após mudança. |
| 87–104 | Descreve jornada automatizada de produto, adição, abertura do carrinho e conferência de item/preço. |
| 106–133 | Transfere o foco humano para critérios de conclusão e encerra com promoção do produto. |

A autora relata geração de testes e afirma sucesso. O texto unitário, porém, pede código e testes juntos: não apresenta evidência da falha inicial prometida no ciclo. O defeito visual tem pedido de antes/depois; sua execução animada não foi assistida. Não há nesta pesquisa log de teste ou reteste funcional independente.

## Visuais efetivamente conferidos

- `studies/local/backfill-a03-tdd-cycle.png`: diagrama das três fases, com retorno circular.
- `studies/local/backfill-a03-tdd-meme.png`: ilustração humorística de resistência ao método; não é distribuição estatística de opiniões.

As duas imagens foram abertas pelas URLs presentes no DOM e examinadas visualmente. Quatro elementos `video` tinham posters, mas não `src`/`source` de mídia naquele estado. Sua existência foi registrada sem marcar as sequências como assistidas. Posters, mesmo quando disponíveis, não substituem a observação de execução e resultado. Os cards promocionais finais não foram usados como evidência de testes.

## Distinções e avaliação crítica

O principal ganho curricular é separar **critério**, **implementação** e **evidência de verificação**. A classificação em teste isolado, integração, aparência e jornada ajuda a perguntar o que ainda não foi conferido. Essa é a aplicação editorial da fonte; não é uma medição de produtividade do produto anunciado.

Há uma diferença material entre explicar TDD e demonstrar a sequência. No exemplo unitário, produzir função e teste ao mesmo tempo pode resultar em uma suíte útil, mas não comprova que o teste detectava a ausência ou erro de comportamento antes da implementação. A ficha não renomeia essa sequência como uma execução rigorosamente demonstrada de TDD.

Para uma prática, a primeira falha deve ocorrer pela condição que se quer implementar; uma ferramenta mal instalada também pode falhar, mas isso não valida o critério funcional. Depois, é necessário preservar a expectativa ao corrigir o código. Trocar a expectativa apenas para combinar com a saída defeituosa não demonstra reparo. Esses cuidados são inferências pedagógicas deste estudo.

A promessa de agentes atualizarem testes automaticamente requer interpretação: mudanças intencionais de requisito podem justificar atualizar testes, mas uma alteração de interface pode também ser uma regressão. O aluno deve saber qual hipótese está sendo verificada antes de aceitar uma nova referência visual. Uma galeria de screenshots não decide sozinha se o comportamento desejado mudou.

O artigo reconhece limites de cobertura e, ao mesmo tempo, usa linguagem promocional forte sobre manutenção, precisão e ganho de tempo. Não foram medidos esses resultados. O estudo não certifica que IA elimina esforço de teste, que testes nunca envelhecem ou que o caso está pronto para produção.

## Pré-requisitos e lugar no curso

Para reproduzir os exemplos técnicos: projeto com componentes e lógica de carrinho, ambiente de testes, dependências adequadas e capacidade de rodar comandos. O texto menciona TypeScript/React, bibliotecas de teste, integração de documentação e navegador automatizado; não é um primeiro contato com computador ou programação. A instalação real, as versões e permissões não foram verificadas.

Para uma pessoa comum, a entrada é mais simples: escrever entradas e resultados esperados antes de pedir a construção. Em L01 isso vira parte do plano revisado. A escrita/execução de testes e a refatoração pertencem a etapa posterior. O conteúdo técnico permanece no corpus, classificado como intermediário, sem ser eliminado por não caber na primeira aula.

Há relação com as fichas de revisão e comportamento já estudadas. A contribuição específica é distinguir quatro alcances de verificação e explicitar o ciclo entre falha esperada, implementação e manutenção. Não ensina hospedagem, segurança de pagamentos ou publicação. Os nomes de ferramentas são os da fonte de 2025; não constituem recomendação atual de instalação ou versão.

## Prática original: limite de vagas numa atividade

Proposta deste estudo; não executada. Preparar um protótipo local fictício que controla duas vagas numa atividade. Não recebe nomes reais, dinheiro ou mensagens externas. Requisito: aceitar reservas até o limite, mostrar ocupação e recusar uma reserva adicional sem ultrapassar duas. L01 termina no plano e na tabela de resultados esperados.

Antes de implementar, listar cenários: zero reservas; uma; duas; tentativa de terceira; cancelamento de uma; nova tentativa. Pedir ao agente que transforme o critério em teste na ferramenta já usada pelo projeto e explique qual condição cada cenário verifica. Na etapa posterior de implementação, executar primeiro o teste relevante e identificar a razão da falha. Implementar a regra, executar novamente e só então considerar limpeza de código.

**Check 1 — regra e capacidade de detectar erro:** confirmar que a tentativa de terceira reserva mantém a ocupação em duas e sinaliza indisponibilidade. Conferir também que um cancelamento permite nova reserva. O relato deve indicar entrada, resultado esperado, resultado observado e fase em que falhou/passou. Se o teste inicial falhar por instalação ou seletor inexistente, resolver isso sem declarar validada a regra de capacidade.

**Check 2 — jornada visível e regressão:** na prévia, reservar até o limite, tentar excedê-lo, cancelar e tentar novamente. Observar contador, mensagem e estado do botão; repetir em largura pequena. Depois de uma alteração de espaçamento ou refatoração, repetir essa sequência e comparar com os critérios originais. Um teste isolado de número correto não basta se a interface continua permitindo a ação errada ou escondendo a mensagem.

Pedido original para investigação: “A terceira tentativa mostra sucesso mesmo quando o contador fica em duas. Esperava indisponibilidade, com contador preservado. Reproduza esta sequência, identifique onde a mensagem diverge da regra e corrija sem relaxar a condição do teste. Informe o que foi realmente executado.”

Entrega: tabela de cenários, resultado de uma falha relevante, implementação corrigida e reteste da jornada. Quando não houver execução, escrever “teste proposto” ou “não executado”; código de teste gerado e declaração do agente não são registros equivalentes a uma execução observada.

## Pendências reais

Texto completo e duas ilustrações: concluídos. Quatro vídeos/animações e respectivos logs/estados: pendentes. Não houve uso de Fusion, instalação de bibliotecas, execução de suíte, auditoria de repositório ou validação de promessas de produtividade. A certificação integral da página multimídia permanece falsa.
