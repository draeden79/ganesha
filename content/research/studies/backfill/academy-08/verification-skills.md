# Verification skills — exigir resultados observados e revisar os próprios testes

Fonte: [Verification skills, Claude Academy](https://academy.claude.com/courses/claude-code-in-action/verification-skills), aula 3 de Claude Code in action, observada em 28/09/2026. Todo o texto público lido; sem imagens substantivas no corpo. Vídeo `rJOmCMeYTuo` identificado, sem transcrição rotulada. A leitura do texto complementar não certifica toda a fala do vídeo.

## Sequência e exemplo

A aula propõe reutilizar a verificação do trabalho como uma skill. Seu exemplo reúne execução da suíte, leitura do diff, inspeção de testes enfraquecidos e relatório com evidência. Explica que a pasta pode conter referências e scripts, mantendo instruções principais curtas. Por fim, distingue convenções gerais, procedimentos específicos e código acionado por eventos.

A fonte afirma ativação automática pela descrição e compartilha a ideia de herança pelo repositório. Não mostra uma skill completa, script de verificação, chamada observada, relatório real, falha ou reteste. A sequência é uma proposta de organização. Não há prova de que todo trabalho da equipe tenha sido verificado após disponibilizar o arquivo.

## Contribuição e limites

O ponto mais útil é conferir o que mudou nos testes junto com a implementação. Um teste pode ficar verde porque o defeito foi corrigido ou porque sua expectativa deixou de detectar o defeito. A evidência precisa permitir distinguir esses caminhos. O exercício interativo de revisão de Claude Code 101 já estudado fornece exemplos complementares, sem transformar esta aula numa execução daquele exercício.

Instruções reutilizáveis também precisam ser avaliadas. Se a descrição não identificar a tarefa ou se a rotina não for executada, a existência de `SKILL.md` não conclui a revisão. Se o script executar só uma parte da suíte, o relatório deve dizer qual parte. Arquivos auxiliares melhoram organização, mas continuam exigindo referências corretas e comandos disponíveis no ambiente.

A própria aula distingue seguir instruções de executar código por evento. Essa distinção deve ser preservada quando o texto usa linguagem ampla sobre verificar tudo automaticamente. O estudo de hooks em `academy-06/hooks.md` registra limites de acionamento e execução conferidos na documentação. Não atribuir infalibilidade a qualquer das três formas de configuração.

## Prática original: uma revisão que detecta teste enfraquecido

Proposta não executada. Usar o exercício do app local de tarefas do curso. Requisitos conhecidos: adicionar, concluir e remover; rejeitar texto vazio; recuperar dados após recarregar no mesmo navegador. Escrever primeiro uma checklist de revisão e uma tabela com os comportamentos esperados.

O Educador prepara duas alterações fictícias numa cópia de ensaio: uma corrige a rejeição de tarefa vazia; outra apenas remove do teste a expectativa de rejeição. Pedir à IA um relatório que relacione requisito, mudança e evidência. Não instalar uma skill nem rodar um comando fornecido pela fonte para fazer essa comparação inicial.

1. **Capacidade de distinguir correção de acomodação:** a revisão deve identificar qual alteração preserva o requisito e qual enfraquece a verificação. Um relatório que aceita ambas porque não há falha reportada não atende ao objetivo.
2. **Execução declarada com precisão:** na etapa posterior, executar os cenários de tarefa válida, vazia e recuperação após recarga. O relatório informa o que rodou, resultado e limitações; não usa “testado” para código que apenas foi lido.
3. **Reteste após ajuste:** diante de correção, repetir o caso que falhou e um caso de funcionamento anterior. Se a solução para rejeitar vazio também impedir adicionar tarefa válida, registrar a regressão.

Só depois de a checklist se mostrar útil, considerar empacotá-la no formato aceito pelo ambiente do curso. Reutilização é uma melhoria do processo já conhecido, não substituto da capacidade do aluno de reconhecer resultado correto.

Entrega: requisitos, comparação das duas alterações e registro dos testes quando executados. Em L01, a atividade termina na definição dos critérios dentro do plano revisado. A ficha não cria uma aula extra de instalação ou configuração.

## Proveniência e pendências

Texto em `studies/local/backfill-ac08-verification.txt`; mídia observada em `video-inventory/page-discovery/academy-rendered-claude-code-in-action--verification-skills.json`; hashes e linhas no manifesto. Não houve instalação, execução de skill, revisão de projeto real ou medição de eficácia. Transcrição identificada e audiovisual permanecem pendentes. Publicação não identificada; originais internos ignorados pelo Git, sem licença de republicação presumida.
