# Rotinas e headless — escolher onde o trabalho roda e conferir sua saída

Fonte: [Routines and headless, Claude Academy](https://academy.claude.com/courses/claude-code-in-action/routines-and-headless), aula 6, observada em 28/09/2026. Texto público completo de 114 linhas lido, sem imagens substantivas. Vídeo `7u366zBuUTM` identificado, sem transcrição rotulada. Nenhuma rotina, script ou SDK foi executado neste estudo.

## Sequência apresentada

A aula organiza um espectro entre prompt recorrente em infraestrutura gerenciada, execução por CLI e integração numa aplicação pelo SDK. Apresenta gatilhos de rotina, criação por interface ou comando, limites de frequência e origem do repositório. Depois aborda entrada/saída de scripts, resposta JSON com schema, retomada por identificador de sessão e um modo de inicialização reduzida.

Os exemplos incluem auditoria de dependências, análise de PR e extração de nomes de funções. São instruções e trechos de código, sem logs completos de execução, falha e recuperação. A aula não demonstra uma rotina disparada, um arquivo final conferido ou a comparação de duas execuções.

## Divergência importante conferida

O texto atribui a `-p` a omissão automática de hooks, skills, plugins, MCP e CLAUDE.md. A documentação atual diz o contrário: sem `--bare`, a execução por `-p` carrega o contexto configurado; `--bare` reduz essa descoberta e tem condições próprias, inclusive de autenticação. A fonte também chama o modo reduzido de determinístico. O controle documentado é sobre inicialização/contexto; isso não demonstra respostas idênticas do modelo a cada execução. Consulta limitada às seções pertinentes. [Execução programática](https://code.claude.com/docs/en/headless#start-faster-with-bare-mode), [referência CLI](https://code.claude.com/docs/en/cli-reference).

Por isso, o curso não deve copiar a afirmação sobre `-p` ou prometer saída invariável por acrescentar uma flag. Uma receita operacional precisa conferir configuração, entrada, resultado e ambiente real. O estudo registra a divergência sem executar comandos ou alterar a instalação do usuário.

## Como interpretar os mecanismos

Um schema ajuda a definir a forma de uma resposta; não prova que os valores correspondam aos dados. Uma lista de funções pode ser JSON válido e ainda omitir uma função. Retomar uma sessão preserva uma relação de continuidade, mas não substitui verificar qual estado está sendo retomado e o que foi concluído antes.

As rotinas descritas nesta aula são de nuvem. Isso não significa que uma tarefa local em Desktop passe a rodar com a máquina desligada. A ficha `studies/scheduling/local-manual-first.md` já distingue essas superfícies com documentação própria. A escolha depende de onde estão a entrada, o projeto e o destino da saída.

O texto presume conta, repositório e conectores adequados no caminho gerenciado; no caminho por scripts, presume ambiente de terminal, autenticação, ferramenta de leitura de JSON e tratamento de falhas. A ausência de uma interface interativa não elimina essas dependências. O aluno não precisa avançar ao SDK para compreender uma transformação recorrente simples.

## Prática original: validar o relatório antes da agenda

Proposta não executada por esta ficha. Reutilizar o exercício Ganesha de `id,item,amount` para `report.md`, cujo gabarito inicial é duas linhas totalizando 30,50. Definir a localização dos arquivos, o responsável por iniciar o trabalho e a evidência da conclusão. O sprint existente possui validação própria; esta leitura não certifica uma execução agendada.

1. **Execução manual:** comparar quantidade de linhas e total com a entrada. Conferir que a saída foi realmente atualizada e que o arquivo de entrada foi preservado.
2. **Repetição e falha:** repetir a mesma entrada e verificar substituição sem duplicatas. Depois usar entrada inválida numa cópia; o último relatório válido deve permanecer. Corrigir a entrada e repetir o caso normal.
3. **Ambiente e agenda:** somente numa etapa posterior, escolher o mecanismo que alcança esses arquivos, conferir fuso/horário e observar uma execução real. Configuração salva e horário passado não são evidências suficientes de execução.

Se optar por saída estruturada, validar separadamente sua forma e seus valores. Quando uma chamada falhar, registrar erro e ausência de resultado antes de permitir que a próxima etapa consuma a saída. Um arquivo vazio criado por redirecionamento não deve ser aceito como relatório válido.

Entrega: plano do fluxo, gabarito, resultados de repetição/erro quando executados e evidência da primeira execução agendada quando essa fase ocorrer. Em L01, terminar no plano revisado. Nenhuma automação nova é criada por esta proposta.

## Proveniência e pendências

Texto `studies/local/backfill-ac10-routines.txt`; mídia observada em `video-inventory/page-discovery/academy-rendered-claude-code-in-action--routines-and-headless.json`. Hash e intervalo no manifesto. Faltam transcrição identificada, vídeo, teste da receita e verificação atual dos limites específicos das rotinas citadas. Publicação não identificada; originais internos ignorados pelo Git, sem licença de republicação presumida.
