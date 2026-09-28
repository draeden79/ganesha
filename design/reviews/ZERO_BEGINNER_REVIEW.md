# Revisão para iniciante absoluto

28/09/2026. Rodada solicitada por Lucas por meio do Diretor, iniciada às 22:44:46 UTC, com alvo de prévia às 22:54:46. Base: currículo 0.3.0 `fc2efa3`. Este recorte avalia compreensão e capacidade de executar as instruções sem conhecimento anterior de IA/programação.

## Cinco barreiras prioritárias

1. **Entrada sem primeira experiência guiada.** `workspace.access` exige escolher entre duas ferramentas, consultar documentação, baixar aplicativo e avaliar conta/custos antes de explicar uma conversa com IA. A pessoa precisa de um caminho inicial definido e de um exemplo completo de pedido e resposta.
2. **Configuração de arquivos cedo demais.** `workspace.folder` reúne pasta, editor, modo de texto, nome/extensão e conferência de formato. A primeira resposta da IA aparece somente em `workspace.read-only-request`, etapa 6. Cada operação precisa de instrução própria; o primeiro exercício pode usar texto visível e copiável antes de depender de um arquivo.
3. **Resposta livre antes do modelo.** `requests.desired-result` e `relevant-context` cobram entrega, dados pertinentes e limites. Mostrar primeiro uma resposta pronta e pedir uma alteração concreta reduz a necessidade de inventar uma estratégia.
4. **Várias tarefas dentro de uma etapa.** Executar na ferramenta, comparar, escrever registro, marcar critérios e distinguir simulação formam uma sequência longa. O campo deve pedir uma evidência pequena e compreensível, como o texto que apareceu ou a mensagem de impedimento.
5. **Abstração de teste antes de experiência suficiente.** `verification` troca a escola por uma agenda e exige classificar evidência, estabelecer critérios e relatar reprodução/reteste. O princípio “a IA pode errar” pode ser aprendido com uma omissão visível, uma correção pronta e uma comparação curta no mesmo exemplo.

## Barreiras nas outras nove aulas

- Sites: “autossuficiente”, “biblioteca”, “botão nativo” e “foco” aparecem no pedido; o aluno precisa reconhecer o resultado visual sem dominar essas palavras. Publicação acumula cópia, contexto, versão, teste, upload e acesso de visitante.
- Apps: servidor, Python, porta, origem, localStorage, JSON, IDs, booleanos e chaves isoladas demandam apoio progressivo. Não basta acrescentar um glossário longo ao começo. O pedido para a IA pode conter o detalhe; a ação do aluno precisa ser concreta.
- Automação: escolher Python/HTML, entender UTF-8, contrato CSV e argumentos antes da primeira saída aumenta a carga. Definir um percurso inicial, fornecer o exemplo completo e indicar como reconhecer os dois registros e o total ajuda mais que reduzir palavras isoladamente.

## Direção editorial com o contrato atual

- `body`: explicação curta e exemplo completo, com termo explicado no ponto de uso.
- `action`: uma ação concreta, que começa por um verbo e identifica onde agir.
- `expected`: o que ficará visível depois, sem depender de conhecimento técnico.
- `prompt`: texto inteiro para copiar; nenhum trecho indispensável fica subentendido em outra aula.
- `hint` e `criteriaKeys`: aprofundamento e critérios de aprendizagem na Ajuda.

A rubrica de conclusão permanece visível e obrigatória na implementação atual. Recolhê-la exige trabalho de UI; não prometer essa mudança como efeito de editar apenas o catálogo. Um critério curto de registro honesto e um aviso breve visível podem reduzir ruído mantendo a distinção entre execução real e exemplo.

## Critérios de revisão do candidato

Para cada uma das primeiras etapas: uma pessoa sabe onde começar, o que copiar/clicar, o que deve aparecer e o que fazer se não aparecer? Termos indispensáveis foram explicados antes da ação? Existe um exemplo de resposta do aluno antes de pedir resposta livre? O caminho sem acesso à ferramenta tem instrução própria e resultado honesto?

## Aceite da primeira aula candidata

Revisão concluída às 22:53 UTC sobre o snapshot do Educador de 22:53:01: `content/curriculum/beginner-review/authoring/foundations.pt-BR.json`, `PREVIEW.md` e critérios/avisos em `build.py`, no worktree `30b2`.

**Aceite didático para instalar a prévia local.** As dez etapas agora podem ser acompanhadas integralmente por exemplo, sem instalar ferramenta nem criar pasta. O texto explica IA, pedido e resposta antes da ação; distingue a conversa externa da anotação na Ganesha; usa Ponte Musical para mostrar uma omissão e sua correção; e pede registros curtos e explícitos. O pedido copiável está separado da resposta ilustrativa. Os dois checks usam os conceitos apresentados e reconhecem o aprendizado pelo exemplo sem alegar execução externa.

O plano visual implementável está em `design/specs/FIRST_LESSON_VISUAL_PLAN.md`: quatro diagramas HTML/SVG nas etapas 1, 2, 7 e 8, com objetivo, composição, rótulos, alt e comportamento no celular. A integração exige componentes próprios; o adaptador atual não renderiza uma imagem apenas por ela ser anexada ao conteúdo.

Este aceite é uma revisão editorial da primeira aula, não teste com alunos, aprovação das onze aulas seguintes ou verificação de imagens na interface. A rubrica continua presente na UI; seus textos foram simplificados, sem afirmar que ficou recolhida. A candidata está disponível em pt-BR/en; esta revisão detalhada se concentrou em pt-BR. Os nove idiomas restantes seguem pendentes para o conteúdo alterado.
