# Sessões longas — manter objetivo, estado e critério de conclusão

Fonte: [Steering long sessions, Claude Academy](https://academy.claude.com/courses/claude-code-in-action/steering-long-sessions), aula 1 de Claude Code in action, observada em 28/09/2026. Corpo textual integralmente lido; sem imagens substantivas. Vídeo `RWH3Z0ROCVc` identificado, sem transcrição rotulada. O estudo é do texto público; acompanhamento audiovisual permanece pendente.

## Sequência e mecanismos

A aula começa pelo escopo e revisão do plano. Depois aborda compactação orientada, retorno a checkpoints, condições de conclusão e repetição por intervalo. Apresenta um exemplo de resumo focado numa mudança específica e outro de objetivo verificável pelos resultados dos testes. Finalmente, relaciona worktrees ao trabalho paralelo e menciona cópia de arquivos ignorados para preparar cada ambiente.

O texto lista opções de recuperar código, conversa ou ambos, além de resumir partes da sessão. Não demonstra um erro seguido de restauração e reteste. Também não executa um objetivo, loop ou integração de trabalhos paralelos. A autonomia defendida é uma proposta de processo, sem medição de tempo ou taxa de sucesso.

## Limites materiais da recuperação

Foi conferida a referência atual de checkpoints. Ela delimita alterações rastreadas pelas ferramentas de edição: mudanças por Bash não são recuperadas por esse mecanismo, e alterações de subagentes ou externas têm limites próprios. Nem toda mensagem enviada durante um turno cria um novo checkpoint. As opções de resumir preservam mensagens no registro da sessão; reduzir contexto não comprova apagamento do histórico armazenado. Leitura complementar das seções pertinentes, sem certificar todo o documento. [Checkpointing](https://code.claude.com/docs/en/checkpointing).

Essa distinção evita ensinar “voltar” como desfazer universal. Um envio a serviço externo, por exemplo, não pode ser considerado revertido porque uma conversa ou arquivo mudou. A prática de recuperação precisa escolher um estado observável e conferir o resultado da operação no seu escopo.

Worktrees separam cópias de arquivos, mas a integração posterior ainda pode conter conflitos ou requisitos incompatíveis. A aula não demonstra isolamento de serviços, bancos ou portas de execução. A análise pedagógica é delimitar os artefatos de cada tarefa e combinar resultados que atendam ao mesmo objetivo. Copiar configurações locais não é prova de ambientes independentes.

## Aplicação ao curso

Uma sessão longa precisa preservar mais que a descrição inicial. O aluno deve conseguir identificar o que já foi concluído, qual versão contém o resultado, quais verificações foram feitas e o que ainda falta. Um resumo útil mantém decisões e evidências; uma lista de intenções pode perder exatamente a razão de uma correção.

Objetivo e loop têm funções diferentes na narrativa: condição de conclusão versus repetição de uma consulta. Repetir uma ação não assegura que ela se aproxime do objetivo. Se um avaliador observa apenas a conversa, o resultado precisa incluir a evidência correspondente, sem tratar a declaração do próprio agente como um teste independente.

## Prática original: retomar uma alteração em três etapas

Proposta não executada. Usar uma página local com horário, endereço e botão de contato. Planejar uma alteração do horário, uma verificação do contato e uma conferência em tela estreita. A L01 termina nesse plano revisado; os passos seguintes pertencem à execução posterior.

Depois da primeira etapa, registrar um ponto de passagem com cinco campos: objetivo, arquivo/versão, mudança concluída, resultado da verificação e pendência. Pedir um resumo que preserve esses campos. Comparar o resumo com os artefatos antes de usá-lo para continuar.

1. **Continuidade:** o resumo mantém o horário correto, o destino esperado e a pendência móvel. Se a verificação ainda não aconteceu, ela continua pendente; não pode ser promovida a concluída por abreviação.
2. **Recuperação delimitada:** numa cópia de ensaio, introduzir uma mudança reversível de texto. Escolher o mecanismo de retorno compatível com o ambiente e conferir o conteúdo recuperado. Registrar quais mudanças o mecanismo de fato cobre, sem supor reversão de ações externas.
3. **Conclusão verificável:** ao fim, comparar horário, clique e apresentação móvel com os critérios do plano. Uma lista de tarefas marcada como concluída precisa corresponder a resultados observados. Se uma etapa falhar, retomar somente o necessário e repetir o cenário afetado.

Entrega: plano, ponto de passagem, resumo conferido e resultados finais quando executados. A atividade pode ocorrer em sequência com um único agente; múltiplos agentes e worktrees são extensões, não pré-requisitos para aprender continuidade.

## Proveniência e pendências

Texto `studies/local/backfill-ac09-steering.txt`, observação renderizada em `video-inventory/page-discovery/academy-rendered-claude-code-in-action--steering-long-sessions.json`. Hashes e linhas no manifesto. Nenhuma compactação, restauração, criação de goal/loop ou worktree foi feita no produto da fonte durante este estudo. Faltam vídeo, transcrição identificada e prática. Publicação não identificada; originais internos ignorados pelo Git.
