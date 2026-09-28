# GitHub Actions and Code Review — revisão e execução têm entregas diferentes

[Aula pública da Claude Academy](https://academy.claude.com/courses/claude-code-in-action/github-actions-and-code-review), observada integralmente em 28/09/2026. O texto renderizado foi lido do início ao fim e preservado internamente em `studies/local/backfill-ac11-github.txt`. Não havia controle rotulado Transcript nem imagens no artigo; o vídeo incorporado `nVGcWczH8fk` permanece pendente. `text_read_complete=true`; `full_transcript_read=false`; nenhuma execução ou certificação audiovisual.

## Percurso da aula

A aula compara dois meios de colocar um agente no fluxo de pull requests. O serviço gerenciado produz achados de revisão; uma Action configurada no repositório pode executar trabalho definido por eventos. O ponto de partida é onde a equipe já avalia mudanças. A escolha decorre do resultado necessário, não de uma equivalência entre todas as integrações chamadas Claude Code.

Na primeira rota, uma pessoa com poderes administrativos habilita o serviço, instala o aplicativo GitHub, escolhe repositórios e gatilhos. A revisão gera comentários localizados e classificação de gravidade. A fonte distingue esses achados de aprovação ou bloqueio do PR e diz que não há correção automática gerenciada. Em seguida apresenta revisão/correção local por comando. Não mostra uma falha concreta, o diff corrigido e o reteste nessa página textual.

Na segunda rota, introduz instalação, autenticação e um arquivo de workflow. Descreve entradas para credencial, token GitHub opcional, frase de acionamento, provedores externos, instrução automática e argumentos do CLI. O exemplo contém somente o passo da Action: não é um arquivo completo com eventos, jobs e checkout. Citar o fragmento como instalação integral omitiria pré-requisitos essenciais.

O exemplo por comentário propõe implementar uma especificação referenciada; o exemplo agendado descreve relatório diário e acionamento manual. Depois discute limite de turnos, permissões e ferramentas necessárias. A recomendação final privilegia serviço gerenciado para revisão e Action para execução personalizada. São orientações e exemplos; o texto não comprova credencial configurada, consulta ao ticket, commit correto ou relatório entregue.

## Conferência pontual de atualidade

A [documentação de GitHub Actions](https://code.claude.com/docs/en/github-actions) esclarece que a instalação rápida prepara uma branch e um PR de workflow; a ativação exige concluir essa configuração. A autenticação pode usar chave de API ou token de assinatura, com entradas correspondentes. Limitar turnos não substitui timeout e controle de concorrência. Foram conferidos esses trechos e parâmetros; não foi lido integralmente todo o documento ou executado o setup.

A [documentação de Code Review](https://code.claude.com/docs/en/code-review) distingue configuração por Owner/Primary Owner da organização e permissão para instalar GitHub Apps. Confirma achados sem aprovação/bloqueio e a opção local de aplicar correções. Há um limite adicional relevante: edições de revisão em segundo plano podem ficar fora de checkpoints da sessão; o documento orienta reversão por Git. Esta é conferência parcial, sem testar reversão ou equivalência entre execução em primeiro e segundo plano.

## Interpretação para o curso

Uma revisão responde “há indício de problema nesta mudança?”. Implementação responde “a mudança foi aplicada?”. Teste responde “o comportamento observado atende ao critério?”. A página ajuda a separar esses produtos, mas não elimina a necessidade de reunir as três evidências. Um comentário útil pode estar errado; uma correção aplicada pode introduzir outra falha; um check verde pode ter escopo menor que o requisito.

O contexto exige compreender repositório, branch, PR, evento e credencial. Integração com um ticket pressupõe acesso real a ele; mencionar um link não estabelece esse acesso. A combinação de agenda e permissão de escrita exige definir alvo, saída e forma de recuperação antes da repetição. Para o iniciante, o aprendizado transferível é verificar uma alteração pequena, deixando a infraestrutura de CI para aprofundamento posterior.

O número máximo de turnos é limite de execução, não prova de conclusão nem prazo de relógio. Se o agente atingir o limite, a entrega precisa conservar o estado incompleto. A escolha de um modelo no exemplo é parte da fonte observada; não certifica disponibilidade na conta do aluno. Não houve instalação, publicação de comentário ou alteração de repositório por esta pesquisa.

## Prática original proposta

Em etapa posterior à L01, usar um repositório de ensaio com uma página fictícia e requisito conhecido: o contato exibido deve corresponder ao arquivo de dados. Preparar uma mudança com valor divergente, pedir revisão e comparar o achado ao requisito. L01 continua entregando somente o plano revisado; esta proposta não cria uma aula adicional.

1. **Achado verificável:** registrar arquivo, linha, entrada e resultado esperado. Conferir se o problema realmente existe e recusar um achado que cite conteúdo inexistente.
2. **Correção e reteste:** aplicar somente a mudança justificada; verificar o contato e uma segunda parte que deveria permanecer igual. Comparar diff antes/depois, além do relatório do agente.
3. **Automação posterior:** somente com o exercício manual validado, definir evento, saída e limite; acionar uma vez e comparar o resultado. Testar falha em ambiente de ensaio e confirmar que o relatório declara incompletude. Agenda e instalação não foram executadas.

Pendem vídeo contínuo, inspeção visual da demonstração, workflow completo e execução. Brutos são internos e ignorados pelo Git; a ficha é análise original, sem presumir licença de republicação.
