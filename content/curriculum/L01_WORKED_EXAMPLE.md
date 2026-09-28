# Exemplo trabalhado para revisão da L01 — uso editorial interno

**Não é conteúdo liberado ao aluno.** Rascunho em pt-BR para revisão antes da localização nos 11 idiomas. Autoria: Educador. Todas as respostas de ferramenta abaixo são fictícias e identificadas como simulação; Claude e Codex não foram executados para produzi-las. Fontes de método: texto integral de `res-codex-prompting` e texto/transcrição oficial de `res-claude-plan-build-review`, aceitos com os limites dos pareceres `reviews/OFFICIAL_SUBSET_01.md` e `reviews/OFFICIAL_SUBSET_02.md`. As fontes não contêm este exemplo. O percurso externo proposto está em `L01_DESKTOP_PRACTICE.md`.

## Objetivo e pré-requisito ensinados

Resultado do exercício: um plano pequeno que atende ao pedido, acompanhado de uma comparação antes/depois. Plano é a descrição do que se pretende construir; não é uma página funcionando. A execução de arquivos e a publicação ficam para a trilha de sites. Basta ler e escrever para este ensaio; a prática externa exigirá acesso e contexto da ferramenta, ensinados em percurso próprio.

## 1. Pedido original do exemplo

“Quero planejar uma página para Ponte Musical, uma escola fictícia de música para iniciantes. A página terá um título, três serviços — violão, piano e canto — e uma ação de contato. Ao clicar em contato, a futura página deverá mostrar aulas@example.com, sem enviar mensagem. Use apenas esses dados fictícios. Agora entregue somente o plano em uma lista. Não altere arquivos, não crie formulário e não publique. Ao final, diga como poderemos verificar o título, os três serviços e o contato quando a página existir.”

Escolhas originais: serviço e nome fictícios; endereço reservado para exemplo; ação que revela texto em vez de enviar mensagem; três itens fáceis de conferir. O pedido explicita um resultado e limita efeitos. A lista é o formato de saída escolhido para este exercício, não uma sintaxe obrigatória do produto.

## 2. Primeira resposta — simulação deliberadamente incompleta

“Plano: (1) título ‘Ponte Musical — música para iniciantes’; (2) seção com violão e piano; (3) formulário de nome e e-mail que envia uma mensagem à escola. Depois de construir, vamos conferir o título e testar o envio.”

Essa é uma resposta inventada para análise, não uma saída atribuída a qualquer ferramenta. Ela não executa envio e não contém arquivos reais.

## 3. Comparação que o aluno consegue fazer

| Pedido | O que a resposta propõe | Julgamento |
| --- | --- | --- |
| Título para Ponte Musical e público iniciante | título com nome e público | atende ao plano solicitado |
| Três serviços: violão, piano e canto | apenas violão e piano | falta canto; contar itens permite verificar a omissão |
| Contato mostra o endereço fictício sem envio | formulário que coleta dados e envia mensagem | contraria o limite e muda o comportamento |
| Plano em lista, sem editar/publicar | resposta em lista | atende ao formato; a leitura desta resposta não comprova o estado de arquivos externos |
| Futuro teste dos três elementos | só título e envio | plano de teste incompleto e baseado na ação errada |

Pergunta de raciocínio: “O que já podemos conferir no texto, e o que só poderemos testar quando a página existir?” Esperado: a presença dos serviços e o respeito às instruções podem ser comparados agora; clique e exibição no navegador exigem a página implementada e aberta.

## 4. Pedido de correção específico — elaboração original

“Mantenha o título. O plano omitiu canto e propôs um formulário com envio, embora eu tenha pedido apenas mostrar o endereço. Revise somente esses pontos: liste violão, piano e canto; a ação de contato deverá mostrar aulas@example.com sem coletar dados nem enviar mensagem. Continue apenas planejando. Atualize a lista de verificações para os três serviços e para esse comportamento de contato.”

Aqui o aluno usa observado, esperado, limite e nova conferência. O erro é do plano; não se afirma que uma página foi depurada. É possível escrever a correção sem usar termos como código, API ou repositório.

## 5. Segunda resposta — simulação revisada

“Plano revisado: (1) título ‘Ponte Musical — música para iniciantes’; (2) três cartões de serviços: violão, piano e canto; (3) ação de contato que revela aulas@example.com na própria página, sem formulário ou envio. Verificações futuras: confirmar o título e os três cartões; clicar em contato e conferir o endereço exibido; confirmar que o fluxo não solicita dados nem envia mensagem. Este texto descreve um plano, sem evidência de página executada ou publicada.”

Conferência do texto: canto agora está presente, o contato respeita o limite e os testes planejados correspondem ao pedido. Para um resultado real, essas verificações ainda precisariam ser executadas no projeto construído. Não usar a melhora da resposta simulada para marcar `external-real-task` como concluída.

## 6. Prática de aplicação e duas verificações distintas

Prática proposta: o aluno escolhe outro serviço fictício, escreve um pedido curto, identifica uma informação relevante ausente em um plano de exemplo e faz um pedido de revisão específico. O professor/conteúdo deve fornecer resultado comparável, não validar apenas por tamanho do texto ou palavra-chave.

### Verificação A — aplicação dos critérios à correção

Enunciado proposto: “O novo plano mantém o título correto, lista violão e piano e propõe pedir o telefone do visitante antes de mostrar o contato. Qual pedido corrige os dois desvios e mantém o que já atende ao objetivo?”

| Alternativa | Resposta proposta | Feedback específico |
| --- | --- | --- |
| A | “Retire a coleta do telefone e mantenha todo o restante do plano.” | Corrige a coleta, mas canto continua ausente. Compare os três serviços pedidos. |
| B — correta | “Mantenha o título, inclua canto junto de violão e piano e mostre aulas@example.com sem coletar dados nem enviar mensagem. Atualize as verificações do plano.” | Corrige a omissão e o comportamento de contato, preservando o título. A próxima ação é conferir se a resposta revisada respeita esses critérios. |
| C | “Inclua canto e teste se o telefone é enviado corretamente.” | Recupera o serviço, mas transforma a coleta/envio em objetivo, contrariando o pedido original. |
| D | “Aprove esse plano e decida depois se o telefone será necessário.” | Aceita os desvios antes de resolvê-los. O pedido já definiu o limite; compare e corrija agora. |

Mede a aplicação de critérios em uma correção delimitada. Não mede operação de interface ou teste de uma página. Antes da tentativa, o pedido original precisa estar consultável na própria tela; não depender da memória de texto que desapareceu.

### Verificação B — força da evidência

Enunciado proposto: “Você leu a segunda resposta simulada deste exemplo. Nenhuma página foi aberta. Qual conclusão é sustentada pelo que foi mostrado?”

| Alternativa | Resposta proposta | Feedback específico |
| --- | --- | --- |
| A | “O contato funciona, porque o plano explica o clique.” | Explicar um comportamento futuro não demonstra que ele foi implementado ou testado. |
| B | “A escola já pode receber visitantes pela página publicada.” | Não foi mostrado endereço publicado nem visita à página. |
| C — correta | “O texto revisado inclui os itens comparados e respeita o limite; o funcionamento da futura página continua sem teste.” | Essa conclusão corresponde à evidência disponível: comparação de texto. Clique e publicação exigiriam outras observações. |
| D | “Não podemos concluir nada sobre o plano sem construir a página.” | Já podemos comparar os serviços e o limite no texto; somente a execução depende da página construída. |

Mede distinguir plano, teste proposto e comportamento observado. Após erro, mostrar o feedback e permitir consultar o exemplo antes de nova tentativa. As questões propostas ainda precisam de revisão editorial, equivalência nos 11 idiomas e validação de uso; não foram aplicadas a alunos.

Preservar os IDs atuais só será adequado se o contrato de progresso registrar que a mudança de critério pode exigir nova tentativa. Não conceder aprovação automática a partir da resposta de uma questão antiga.

## Recuperação e transferência

- Se a resposta não permitir comparar os itens, pedir que os organize em lista e sinalize o que falta.
- Se a ferramenta pedir uma informação que afeta o resultado, responder ou reduzir o escopo; não exigir que invente dados. A leitura da faixa de Tim fornece inspiração textual para perguntas de esclarecimento, sem certificar sua UI.
- Se o acesso falhar, registrar a etapa e a mensagem; não confundir esse impedimento com uma falha na redação do pedido.
- Para trocar de ferramenta, preservar pedido e critérios, adaptando apenas o contexto de trabalho conforme as instruções verificadas de cada superfície. A comparação operacional completa ainda está pendente.

## Pendências antes de integração

Os textos selecionados de quickstart Codex e ciclo curto já foram revisados com aceite delimitado. Permanecem revisão editorial deste exemplo e das questões, cobertura audiovisual pertinente, percurso visual/operacional das ferramentas, transformação em telas sem excesso de texto, 11 idiomas e decisão de versão/progresso. O rascunho aprofunda a proposta pedagógica sem promover L01 nem fingir uma execução.
