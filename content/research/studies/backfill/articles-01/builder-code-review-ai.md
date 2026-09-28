# Code Review in the AI Age — estudo integral do texto

[Artigo de Alice Moore, Builder, 21/07/2025](https://www.builder.io/blog/code-review-ai). `source_id=builder-blog`; estudo em 28/09/2026. Leitura integral: `studies/local/backfill-a01-builder-code-review-ai.txt`, linhas 1–157, 12.655 bytes. O texto veio de `main.innerText` no navegador e inclui conclusão, promoção e cards finais. HTML original e inventário de mídia foram preservados separadamente. Hashes estão no manifesto.

`text_read_complete=true`; `full_source_analyzed=false`. Um diagrama e dois memes foram examinados; dois vídeos embutidos não foram assistidos. Não houve execução do produto, revisão de repositório real ou validação dos estudos citados. Brutos e capturas são locais e ignorados pelo Git, sem licença de republicação presumida.

## Argumento completo, em ordem

| Linhas | Reconstrução concisa |
| --- | --- |
| 8–28 | Revisão deve avaliar clareza, defeitos, compatibilidade, segurança e manutenção futura. |
| 30–40 | Contrasta verificação imediata com responsabilidade arquitetural de longo prazo. |
| 42–49 | Propõe começar pelo efeito final, mapear dependências, questionar escolhas e procurar entradas adversas. |
| 50–56 | Recomenda prática de leitura, observação de revisões e mudanças pequenas. |
| 57–74 | Argumenta que geração abundante aumenta trabalho de revisão e incentiva aprovação irrefletida; cita pesquisas. |
| 76–90 | Reconhece utilidade de revisores automáticos para padrões, mas contesta sua suficiência para contexto e intenção. |
| 92–100 | Prefere mudanças restritas e explicadas à supervisão contínua de grandes alterações. |
| 102–128 | Promove contexto visual, reutilização e diffs pequenos no Fusion. |
| 130–157 | Reafirma julgamento humano e termina com oferta comercial e outras leituras. |

Exemplos hipotéticos: investigar sobreposição de CSS no modo escuro e alterar um botão existente. A seção também aponta uma demonstração de busca com componentes Angular Material; sua animação não foi assistida. O diagrama compara esforço de escrita/revisão sem escala quantitativa. Memes ilustram dívida técnica e autorrevisão, sem fornecer evidência empírica.

## Visuais efetivamente vistos

- `studies/local/backfill-a01-review-workflow.png`: diagrama comparativo.
- `studies/local/backfill-a01-review-debt.png`: meme sobre dívida técnica.
- `studies/local/backfill-a01-review-self-review.png`: meme de geração e revisão pelo mesmo sistema.
- `studies/local/backfill-a01-review-section.png`: cabeçalho e capa, úteis somente para identidade/data; o nome do arquivo não implica captura da seção técnica.

As três ilustrações argumentativas foram abertas pelas URLs presentes no DOM e inspecionadas visualmente. As tags de vídeo tinham posters, sem `src`/`source` de mídia naquele estado renderizado. Não se inferiu inexistência ou falha permanente do vídeo. As animações permanecem pendentes; nenhum filme foi baixado.

## O que a fonte sustenta e o que exige cautela

**Posição da autora:** revisão precisa de contexto e escolhas compreensíveis. **Interpretação editorial:** essa posição pode virar um hábito inicial acessível: descobrir o que mudou, por que mudou e qual teste permite julgar a intenção. Não é necessário exigir experiência de arquiteto para que o aluno perceba uma alteração fora do pedido.

O caso de modo escuro é introduzido como situação imaginada, não como incidente investigado nesta pesquisa. O exemplo de botão não comprova que qualquer mudança de uma linha seja segura. Em nossa prática, uma alteração mínima recebe teste de comportamento e de alcance; número de linhas é informação sobre esforço de revisão, não critério suficiente de correção.

A estatística de problemas de implantação citada no artigo não foi rastreada até desenho amostral, questionário e contexto. Ela permanece alegação citada pela autora. Não serve para estimar a chance de o projeto de um aluno falhar. A figura de produtividade também não é benchmark: não tem eixo, população ou medição. Para ensinar, usar situações concretas verificáveis, sem transformar essas ilustrações em números.

A fonte tem interesse comercial e promove a ferramenta do próprio fornecedor. Não foi testada a promessa de alterações sempre precisas, reutilização automática ou revisão mais rápida. Sua comparação generaliza ferramentas de 2025; não deve ser transferida literalmente para versões atuais. O texto é público, sem barreira de assinatura observada. Não é documentação oficial das outras ferramentas citadas.

## Pré-requisitos e pertinência curricular

Para leitura integral, ajuda reconhecer arquivo, mudança, teste, repositório e revisão. Para um iniciante, definir “diff” como a diferença entre versões e “pull request” como uma proposta de mudança a revisar. A parte sobre arquitetura e dependências é intermediária e deve vir depois da primeira prévia editada. Essa classificação ordena o conteúdo no corpus; não o exclui.

Em L01, o uso adequado é uma pergunta no plano: “Que alteração vou pedir e como saberei se funcionou?”. A edição pertence a etapa posterior. Há duplicação parcial com o estudo oficial de comportamento e testes; a contribuição específica aqui é controlar abrangência, esforço e contexto da revisão. A fonte não entrega passo a passo de publicação, credenciais, configuração de testes ou recuperação de versão.

## Prática original: revisão de uma mudança de busca

Proposta deste estudo; não executada. Preparar uma cópia de um catálogo simples com quatro itens conhecidos. Resultado desejado: procurar pelo nome e apresentar uma mensagem clara quando não houver correspondência. L01 termina com plano revisado: definir dados, comportamento esperado e exemplos que servirão de teste.

Na etapa de implementação, pedir uma alteração por vez e um relato verificável: “Adicione busca por nome aos quatro itens existentes. Explique onde a busca será aplicada, quais arquivos pretende mudar e como vai preservar os links de cada item. Ao concluir, liste a mudança e o que foi realmente testado.” Não aceitar uma afirmação de que testes passaram sem indicação do cenário.

**Check 1 — regra funcional:** pesquisar o nome exato de um item, depois parte de outro e por fim um termo inexistente. Registrar entradas e saídas esperadas antes de executar. Esvaziar a pesquisa e conferir que os quatro itens reaparecem. Se a implementação não respeitar alguma condição, fornecer passos e resultado observado ao agente, solicitar correção e repetir as mesmas entradas.

**Check 2 — preservação e alcance:** abrir o contato/link de um item após pesquisar e depois de limpar a busca. Conferir que texto, destino e dados originais não foram alterados. Pedir ao agente a lista de arquivos modificados e relacionar cada arquivo a uma necessidade da busca. Uma alteração sem relação compreendida fica marcada para revisão, não aprovada automaticamente.

Se o agente propuser reescrever toda a página, pedir uma explicação concreta da necessidade e avaliar se a tarefa pode ser dividida. Isso é uma escolha de revisão deste exercício, não uma proibição universal de mudanças grandes. Antes de integrar ou publicar, registrar o resultado dos dois checks e guardar uma versão que possa ser identificada.

Entrega: breve pedido, critérios, comparação de versões, resultados dos cenários e uma frase sobre o alcance. Um relatório honesto pode dizer que o teste funcional passou e a revisão de dependências permanece pendente. Não confundir o agente explicar seu trabalho com outra pessoa ter conferido essa explicação.

## Pendências reais

Concluídos: texto completo e três ilustrações centrais. Pendentes: duas animações/vídeos, estudos externos citados, prova das promessas do produto e reprodução do exemplo Angular. A ficha não certifica revisão de segurança, desempenho ou arquitetura de qualquer projeto real.
