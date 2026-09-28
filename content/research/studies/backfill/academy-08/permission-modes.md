# Modos de permissão — autorização da ação e qualidade da entrega

Fonte: [Permission modes, Claude Academy](https://academy.claude.com/courses/claude-code-in-action/permission-modes), aula 4 de Claude Code in action, observada em 28/09/2026. Texto completo da página lido; nenhuma imagem substantiva no corpo. Vídeo `IS6larFJBK8` identificado, sem transcrição rotulada na página. Não se certifica leitura de toda a fala nem acompanhamento audiovisual.

## Conteúdo e encadeamento

A aula apresenta seis modos, seus limites e a troca pela interface de terminal. Contrasta supervisão de ações individuais, edição com menos interrupções, planejamento, avaliação automática, ferramentas previamente permitidas e bypass. Desenvolve o papel do classificador em Auto e distingue avaliação da intenção de avaliação do funcionamento. Propõe combinar esse controle com testes ao encerrar a tarefa. Termina discutindo execuções sem pessoa disponível para responder e a escolha conforme o trabalho.

Não há uma chamada concreta com antes/depois, recusa observada ou sequência de configuração e reteste. As categorias de ações citadas são descrições da fonte. A página também reconhece evolução das regras e remete à documentação, sem ligar um resultado real a cada caso.

## Correções de interpretação e conferência atual

“Aceitar tudo” não deve ser convertido em promessa operacional. A referência atual descreve controles por interface, regras adicionais e ações que continuam pedindo interação; em Auto, recusas e indisponibilidade da avaliação podem impedir uma ação. `dontAsk` nega chamadas que pediriam autorização, mas também permite leituras e outras ações que já não precisavam dela. Foram consultadas somente as seções relevantes, sem certificar todo o documento. [Modos de permissão](https://code.claude.com/docs/en/permission-modes).

O exemplo de autenticação quebrada ilustra uma lacuna de validação funcional. Não significa que defeitos de autenticação sejam inofensivos. A conclusão pedagógica é que uma ação autorizada pode produzir código incorreto; o conteúdo precisa de verificação própria. Do mesmo modo, um hook que chama testes só sustenta os casos que realmente foram executados e observados. Não garante correção integral.

O atalho descrito pertence ao terminal. A posição e o nome dos controles precisam ser conferidos na interface do curso. Esta pesquisa não mudou modos, regras ou permissões. A menção a bypass é parte do inventário da fonte; não é requisito da prática proposta.

## Aplicação ao curso

Antes de uma tarefa, o aluno deve reconhecer o que está pedindo ao agente e qual resultado pode observar. Uma escolha de modo pode alterar quando surgem perguntas, mas não transforma um pedido vago em uma tarefa definida. Separar plano, alteração e publicação continua útil mesmo quando parte das autorizações é resolvida automaticamente pelo produto.

Para tarefas sem supervisão, o plano também precisa definir como distinguir ação concluída, negada e não tentada. Uma rotina que termina com uma recusa pode ter preservado o limite configurado e ainda não ter entregue o objetivo. O relatório deve indicar ambos, sem chamar ausência de pergunta de sucesso.

## Prática original: classificar as etapas de uma alteração

Proposta não executada. Partir de uma página local de oficina. O pedido é trocar o horário e conferir o botão de contato, com publicação tratada como etapa separada. Escrever uma tabela com ação, informação necessária, resultado esperado e evidência de conclusão. Não é necessário alterar permissões para fazer esse planejamento.

1. **Coerência do escopo:** conferir se ler arquivos, editar o horário, testar o botão e publicar foram identificados como ações diferentes. Um plano que publica só porque terminou a edição precisa ser revisto conforme o objetivo dado.
2. **Qualidade após autorização:** na etapa posterior de implementação, comparar o horário com a entrada e testar o destino do botão. Aprovação da ferramenta ou ausência de prompt não aprovam esses resultados.
3. **Registro de impedimento:** usar um cenário fictício de ação negada e pedir um relatório que identifique o que ficou pendente. O relatório não pode declarar publicação com base em uma prévia local.

Entrega: plano com etapas e critérios, seguido de resultados observados quando executados. Na L01, encerrar no plano revisado. Não adicionar bypass, serviços externos ou configuração de regras como pré-requisito do primeiro resultado.

## Proveniência e pendências

Texto interno `studies/local/backfill-ac08-permission.txt`; observação renderizada em `video-inventory/page-discovery/academy-rendered-claude-code-in-action--permission-modes.json`. Hash e cobertura no manifesto. Faltam transcrição identificada, vídeo contínuo, observação dos controles atuais e prática. Publicação não identificada; originais internos ignorados pelo Git, sem licença de republicação presumida.
