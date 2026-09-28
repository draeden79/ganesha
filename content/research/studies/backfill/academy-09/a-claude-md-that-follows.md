# CLAUDE.md que ajuda — regras específicas, contexto e revisão

Fonte: [A CLAUDE.md that follows, Claude Academy](https://academy.claude.com/courses/claude-code-in-action/a-claude-md-that-follows), aula 2 de Claude Code in action, observada em 28/09/2026. Texto completo de 92 linhas lido; sem imagens substantivas. Vídeo `o9-NIQF9tNw` identificado, sem transcrição rotulada. A ficha certifica leitura do corpo público, sem certificar a fala ou o vídeo inteiro.

## Encadeamento da fonte

A aula problematiza o crescimento de instruções e distingue orientação de controle executável. Descreve quatro escopos de arquivo, organização por imports e redação de regras verificáveis. Compara uma recomendação vaga com localização concreta de arquivos, e uma proibição isolada com a alternativa desejada. Termina defendendo revisão contínua e uso seletivo de ênfase.

Os exemplos são formulações de regras; não há projeto modificado, log de carregamento, experimento de obediência ou reteste. Menor tamanho e maior especificidade são recomendações da fonte, não taxas de sucesso medidas. Acrescentar uma regra após cada falha também pode voltar a produzir o arquivo excessivo criticado na abertura.

## Conferência de detalhes de carregamento

A referência atual distingue instruções da hierarquia acima da pasta de trabalho, carregadas no início, de arquivos em subpastas, carregados quando pertinentes à leitura. Ela orienta adicionar `CLAUDE.local.md` ao `.gitignore`; o nome sozinho não deve ser tratado como prova de exclusão do Git. Imports externos podem depender de aprovação. Leitura adicional limitada a localização, carregamento e imports. [Memória e instruções do projeto](https://code.claude.com/docs/en/memory).

Portanto, “todos carregam juntos” precisa de escopo. A existência de vários arquivos não prova quais chegaram ao contexto da sessão. A orientação sobre imports ajuda a organizar, mas dividir texto sem mudar o modo de carregamento não reduz automaticamente o conteúdo lido pelo agente.

## Interpretação para pessoas comuns

Uma boa regra deve ser reconhecível no resultado. “Deixe profissional” exige interpretação; “preserve horário, endereço e contato fornecidos” permite comparar fatos. Especificidade não exige jargão: pode descrever dados e comportamentos que a pessoa sabe conferir.

Quando ocorre uma falha, investigar primeiro se faltava informação, se havia contradição, se a instrução foi carregada ou se o resultado não foi verificado. Atribuir todo erro ao arquivo de regras pode gerar instruções redundantes e deixar o defeito real sem tratamento. Uma mudança na regra deve ter motivo e um caso que permita avaliar se ajudou.

O texto remete controles rígidos a hooks. O estudo desses hooks em `academy-06/hooks.md` registra limites de configuração e execução: escrever o caminho de um script não prova que ele bloqueie a ação pretendida. Esta aula não demonstra esse bloqueio. A prática proposta trabalha apenas qualidade e escopo de instruções, sem alterar controles de segurança.

## Prática original: reduzir uma orientação confusa

Proposta não executada. Preparar uma lista fictícia de instruções para uma página de oficina: manter informações fornecidas, usar português, apresentar contato e revisar a página. Acrescentar deliberadamente repetição, uma regra vaga e duas orientações contraditórias sobre o horário. O aluno identifica o conflito antes de pedir implementação.

Reescrever em poucas regras, cada uma com situação de aplicação e critério observável. Exemplo original: “Use o horário da ficha aprovada. Se houver dois horários diferentes nas entradas, apresente a divergência no plano antes de editar.” A regra determina o que fazer quando a informação está inconsistente, sem inventar o valor correto.

1. **Clareza:** para cada regra, indicar como verificar cumprimento. Se a única resposta for “parece melhor”, reformular o critério ou reconhecer que se trata de preferência subjetiva.
2. **Consistência:** usar a entrada com dois horários e conferir que o plano registra a dúvida. Escolher um horário sem justificativa falha, mesmo que o texto final pareça bem escrito.
3. **Escopo e revisão:** depois de resolver a entrada, verificar que a orientação continua útil para outro exemplo e não impõe detalhes exclusivos da primeira oficina. Remover repetição sem apagar o requisito que preveniu o erro.

A instalação no formato aceito pela ferramenta fica para uma etapa posterior, caso necessária. Em L01, a entrega é o plano revisado com entradas e regras claras. Para avaliar ganho real depois, guardar a versão anterior, a orientação modificada e os resultados comparáveis.

## Proveniência e pendências

Texto `studies/local/backfill-ac09-follows.txt`; descoberta renderizada `video-inventory/page-discovery/academy-rendered-claude-code-in-action--a-claude-md-that-follows.json`. Hash e intervalo no manifesto. Nenhum arquivo de instrução do usuário foi criado ou alterado nesta pesquisa. Faltam transcrição identificada, vídeo contínuo e prática operacional. Publicação não identificada; originais internos ignorados pelo Git, sem licença de republicação presumida.
