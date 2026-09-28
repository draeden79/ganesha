# Skills — transformar uma orientação repetida em uma rotina verificável

Fonte: [Skills, Claude Academy](https://academy.claude.com/courses/claude-code-101/skills), aula 10 de Claude Code 101, observada em 28/09/2026. Todo o texto público do corpo foi lido: seis parágrafos, ligação para outro curso e vídeo incorporado `bjdBVZa66oU`. Não havia seletor ou rótulo de transcrição no estado observado. Portanto, esta ficha certifica leitura do texto da página, sem atribuir cobertura integral à fala do vídeo.

## Conteúdo e sequência

A página parte de orientações repetidas, como padrões de revisão e mensagens de commit. Apresenta uma skill como um conjunto de instruções e recursos, cujo nome e descrição ajudam o agente a reconhecer a tarefa relevante. Distingue diretório pessoal e diretório do projeto; compara instruções gerais em CLAUDE.md com carregamento de instruções específicas quando necessárias. Os exemplos incluem identidade visual, documentação e revisão de código. Ao final, oferece um curso específico sobre skills.

A descrição usa ativação automática como benefício. O texto não apresenta uma execução completa, logs de seleção ou um teste no qual a skill deixa de ser ativada. Também não demonstra criação do arquivo, estrutura validada, instalação, compartilhamento ou recuperação de erro. A comparação com comandos manuais pertence à apresentação dessa aula; não é uma auditoria das possibilidades atuais de todas as interfaces.

## O que a evidência permite ensinar

O conceito útil é capturar uma decisão que se repete e criar critérios para reconhecer quando ela se aplica. Reutilizar instruções pode reduzir repetição, mas não garante que a descrição seja reconhecida, que o conteúdo seja apropriado ao projeto nem que o resultado cumpra os requisitos. Uma regra mal definida pode propagar o mesmo erro a várias tarefas.

Para o curso, separar três questões: a rotina foi disponibilizada; ela foi selecionada na tarefa; o resultado passou nas verificações. Nenhuma delas substitui a seguinte. Um arquivo presente numa pasta comprova somente presença. Uma resposta que declara ter seguido a rotina ainda precisa ser comparada com os critérios e artefatos.

## Prática original: especificação de uma revisão de relatório

Proposta não executada e sem instalação. Partir do exercício já definido no curso: CSV com `id,item,amount` gera `report.md`. Escrever uma rotina curta para revisão, contendo a situação de uso, os arquivos relevantes, os resultados esperados e o que entregar ao final. A descrição deve permitir distinguir revisar um relatório de redigir uma página de apresentação.

Usar três critérios conhecidos: duas linhas válidas totalizam 30,50; repetir a geração substitui o relatório sem duplicar conteúdo; uma entrada inválida preserva a última saída válida. Incluir a exigência de apontar o arquivo e o resultado observado. Esses são critérios próprios do exercício Ganesha, não exemplos executados pela Academy.

1. **Relevância:** apresentar uma tarefa de revisão do relatório e uma tarefa de texto sem relação com CSV. Conferir se a instrução escrita explica por que se aplica à primeira. Quando houver ambiente compatível, observar a seleção real em vez de presumir ativação.
2. **Qualidade da decisão:** entregar um relatório correto e outro com soma errada. A revisão precisa localizar a diferença e mostrar os valores usados. Repetir o texto da checklist sem examinar a saída não conclui a tarefa.
3. **Limite de escopo:** pedir apenas revisão e verificar que a entrega é um diagnóstico com evidência; qualquer alteração posterior deve corresponder à tarefa autorizada e ser retestada.

Entrega pedagógica: uma especificação reutilizável, exemplos de quando se aplica, critérios observáveis e resultados de teste quando a implementação for realizada. Para iniciantes, a mesma rotina pode começar como checklist no plano; a instalação em um agente é uma etapa posterior, dependente do ambiente.

## Proveniência e pendências

Texto interno: `studies/local/backfill-ac05-skills.txt`; observação renderizada em `video-inventory/page-discovery/academy-rendered-claude-code-101--skills.json`. Nenhuma imagem substantiva foi encontrada no corpo. O vídeo contínuo, a transcrição confirmada, o curso vinculado e qualquer prática de configuração continuam pendentes. Publicação não identificada. Texto original mantido internamente, ignorado pelo Git; não se presume licença para republicação.
