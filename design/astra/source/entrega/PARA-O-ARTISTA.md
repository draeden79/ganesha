# Entrega ao Artista — Ganesha / Astra-PTBR-1.0

## Pedido de trabalho

Faça o design e produza as imagens e os gráficos para esta nova proposta de 12 aulas, preservando a clareza e a identidade Ganesha. Não é necessário reutilizar o fluxo anterior. Prepare um resultado revisável antes de qualquer implementação ou publicação. A composição, o sistema visual e a produção das imagens são decisões do Artista; as sugestões abaixo indicam necessidades de aprendizagem, não layouts obrigatórios.

Raiz absoluta dos arquivos:

`/Users/lucasmarques/.codex/worktrees/aa29/Ganesha/professor-experiment/`

A leitura principal é `COMECE-AQUI.md`, seguida de `aulas/01-...` até `aulas/12-...`. `MAPA-12-AULAS.md` resume a sequência. `avaliacao/GABARITOS-E-CRITERIOS.md` é material separado do aluno. `MANIFESTO.md` lista todos os arquivos. A versão editorial é **Astra-PTBR-1.0**; não há commit criado para esta entrega.

## Intenção didática

O aluno é um adulto capaz que ainda não conhece o ambiente. A apresentação deve diminuir a dificuldade de localizar onde agir, o que esperar e como retomar após um erro. O curso oferece quatro espaços distintos: conversa com IA, anotação pessoal, demonstração preparada e execução real. Essa distinção precisa ser perceptível por texto e organização, sem depender apenas de cor ou ícone.

Há cinco ou seis etapas por aula, escolhidas pelo raciocínio da prática. Não transformar cada subtítulo em dez telas, não inserir campos de resposta em toda explicação e não acrescentar provas para completar uma grade. O aluno precisa poder ler um exemplo e ter o pedido copiável próximo da ação correspondente, sem perder a informação anterior.

As etapas contêm dificuldade provável e caminho de retomada em prosa. Pode haver ajuda recolhível, desde que não esconda um pré-requisito necessário para executar. Evitar figuras decorativas competindo com o arquivo, o dado ou a regra que a pessoa precisa compreender. Evitar personagens infantilizados e premiações que tratem adultos como crianças.

## Mapa visual das 12 aulas

| Aula / arquivo | Objetivo visual | Ilustração ou diagrama que pode ajudar | Trecho que precisa de demonstração visual |
|---|---|---|---|
| 1 — `aulas/01-uma-ajuda-util.md` | Tornar visível a relação entre nota de origem e frase produzida | Duas colunas: notas e aviso, com ligação de cada fato e destaque textual de informação inventada | Etapas 2–3: enviar o pedido e comparar “Inscreva-se até sexta…” com as notas; distinguir resposta preparada de execução |
| 2 — `aulas/02-do-texto-a-pagina.md` | Mostrar como texto vira arquivo e arquivo vira página | Sequência pasta → `site.html` no editor → mesmo arquivo no navegador; três cenas para site/app/automação | Etapas 2–4: criar pasta, salvar texto simples com extensão correta, abrir e recarregar; demonstrar os dois percursos de ferramenta após validação operacional |
| 3 — `aulas/03-um-site-que-ajuda.md` | Explicar hierarquia e preservação | Antes/depois da mesma informação; cópia anterior e versão de trabalho identificadas | Etapas 2–4: duplicar arquivo, pedir alteração pequena e comparar sem mudar os fatos |
| 4 — `aulas/04-conferir-antes-de-pronto.md` | Mostrar teste como comparação, não selo de sucesso | Uma ficha com condição, esperado e observado; a mesma página larga, estreita e ampliada | Etapas 3–4: estreitar janela, usar zoom, percorrer link por teclado e mostrar foco; não simular como teste executado |
| 5 — `aulas/05-uma-pagina-que-responde.md` | Tornar estado e contagem compreensíveis | Sequência vazia → duas pendentes → uma concluída → exclusão | Etapas 3–5: adicionar, concluir, excluir, corrigir vazio e recarregar para perder memória |
| 6 — `aulas/06-dados-sem-confusao.md` | Diferenciar identidade de nome e valor ausente de zero | Dois registros com o mesmo nome e IDs diferentes; linha numérica com -1, 0, 1 e rótulos | Etapas 3–4: agir em só uma das tarefas e tentar dias vazios/decimais/fora do intervalo |
| 7 — `aulas/07-guardar-e-recuperar.md` | Separar programa, dados do navegador e cópia exportada | Três recipientes nomeados e setas de exportar/importar; não usar nuvem como sinônimo de armazenamento local | Etapas 3–5: reabrir, localizar JSON, apagar uma tarefa, cancelar importação, restaurar, rejeitar arquivo inválido |
| 8 — `aulas/08-investigar-e-corrigir.md` | Separar observado e hipótese; tornar laboratório reconhecível | Relato de erro com quatro partes; original e laboratório com armazenamento distinto | Etapas 2–5: preparar cópia antes de abrir, introduzir defeito identificado como didático, corrigir e repetir testes |
| 9 — `aulas/09-primeira-automacao.md` | Explicar gatilho–condição–ação e as duas condições simultâneas | Quatro tarefas atravessando a regra, com motivos escritos de entrada/saída | Etapas 3–5: simular, mudar 2 para 1, invalidar prévia e exportar texto; mostrar que arquivo criado não é mensagem enviada |
| 10 — `aulas/10-rodar-de-novo.md` | Mostrar repetição sem aumento do histórico | Duas execuções e a mesma chave ID+regra; três estados: candidato, preparado localmente, não enviado | Etapas 3–4: cancelar, confirmar duas vezes, conferir histórico, reabrir e recuperar versão 2; falha deliberada só se identificada como simulação |
| 11 — `aulas/11-juntar-e-entregar.md` | Fazer o pacote se explicar | Árvore pequena com quatro arquivos e links relativos de ida/volta | Etapas 2–5: copiar para pasta nova, importar dados, iniciar pelo LEIA-ME e percorrer sem conversa anterior |
| 12 — `aulas/12-construir-em-outro-contexto.md` | Evidenciar transferência e autoria do aluno | Um exemplo de problema → campos → regra → testes; espaço para projeto diferente | Etapas 2–4: prever antes de pedir, construir por partes e executar casos; etapa 6: separar completar, explicar e transferir |

## Tratamento das demonstrações

O texto contém exemplos preparados, não capturas reais. Até que uma demonstração seja gravada em ambiente verificado, rotule qualquer tela desenhada como **ilustração** ou **demonstração preparada**. Não invente nomes de botões de Codex ou Claude, planos, acesso, preços ou fluxos atuais. Os rótulos “Adicionar”, “Simular lembretes” e semelhantes são requisitos dos aplicativos de treino que o aluno constrói; não são afirmações sobre interfaces comerciais.

Para produzir uma gravação real posterior, primeiro confirme a variante usada: conversa no navegador, aplicativo de desktop ou ferramenta de programação com acesso a pasta. Um tutorial gravado para uma delas não deve parecer válido automaticamente para as demais. Cada gravação deve identificar ambiente e data de verificação e mostrar resultado observável, incluindo erros e recuperação onde pedagogicamente necessário.

Os diagramas de dados podem usar IDs A01/A02 como exemplos preparados. Na execução real, os IDs gerados podem ser diferentes. Não exigir que o aluno obtenha a aparência exata da ilustração para reconhecer o comportamento correto.

## Navegação e leitura

Permitir localizar a etapa atual e voltar às orientações de salvar, abrir, importar e recuperar. Os pedidos devem ter uma cópia clara, preservando quebras de linha e trechos a preencher. O recurso de copiar não deve enviar nada à ferramenta automaticamente. Não fazer o aluno digitar “entendi” para passar por uma explicação.

Mostrar o tempo como estimativa ajustável. O trabalho pode ser dividido em encontros. A prova de progresso é o resultado observado e a explicação, não o tempo de tela ou a quantidade de cliques. Acesso ao gabarito deve ser distinguido da tentativa, sem alegar correção automática.

## Onze idiomas, uma versão nova

O produto continua exigindo 11 idiomas. Esta entrega só atualiza português brasileiro; os outros dez estão pendentes de identificação e localização. Não reutilizar traduções antigas sob a versão Astra-PTBR-1.0. Preparar texto editável fora das imagens sempre que possível, espaço para expansão e legendas alternativas. Não presumir que todos os idiomas tenham a mesma direção de leitura; confirmar a lista canônica antes do design final multilíngue.

Manter identificadores de arquivos, campos de código, IDs e formatos JSON estáveis quando fizer sentido técnico, distinguindo-os dos rótulos traduzíveis. Regras e dados de exemplo devem continuar equivalentes após localização. Horários, números e explicações de dias negativos precisam de revisão por idioma, sem alterar a lógica.

## O que seria uma entrega revisável do Artista

Um sistema visual proposto, a apresentação das 12 aulas com exemplos representativos das interações de aprendizagem, imagens/gráficos produzidos ou claramente marcados como pendentes, decisões sobre acessibilidade de leitura e uma lista de demonstrações reais ainda necessárias. Mostrar como o mesmo conteúdo pode ser adaptado aos 11 idiomas sem alegar que já foi traduzido. Preservar os arquivos desta autoria como referência; trabalhar em uma nova área própria.

Não implementar nem publicar por este encaminhamento. A próxima decisão deve se apoiar no material visual revisável. As pendências e o limite da autorrevisão estão no documento ao lado.
