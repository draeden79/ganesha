# Gestão de contexto — continuar sem perder decisões

Fonte: [Context management, Claude Academy](https://academy.claude.com/courses/claude-code-101/context-management), aula 6 de Claude Code 101; observada em 28/09/2026. Vídeo `eW3oTyfeWZ0`. Texto complementar e nove parágrafos da transcrição lidos por inteiro. Sete imagens examinadas; vídeo contínuo e execução dos comandos não verificados.

## Sequência e contribuição

A aula apresenta contexto como espaço limitado de trabalho, explica compactação com possível perda de detalhes e distingue três operações: inspecionar o uso, resumir para continuar e iniciar outra conversa. Depois aborda instruções persistentes, pedidos específicos, ferramentas e delegação. O caso de delegação é localizar uma parte do projeto e devolver o resultado, preservando o espaço da conversa principal.

O princípio transferível é registrar decisões relevantes e recuperar a evidência necessária quando continuar. Compactar não é garantia de preservação exata. Tampouco uma conversa curta prova eficiência: um pedido vago pode exigir investigação adicional. Os comandos apresentados são de Claude Code CLI; não foram testados em outras interfaces.

## Conferência das sete imagens

| Imagem | O que foi efetivamente visto | Limite |
| --- | --- | --- |
| 0 | Diagrama de espaço ocupado e disponível. | Ilustração, sem medição comparativa. |
| 1 | Mensagem de compactação em andamento. | Não demonstra o conteúdo preservado. |
| 2 | Resumo com intenção, conceitos e arquivos de uma conversa anterior. | Parte visível de um resumo; não permite comparar com a conversa original inteira. |
| 3 | Autocompletar de `/compact` e descrições de comandos. | Exibir uma opção não comprova sua execução. |
| 4 | `/clear` seguido de uma entrada vazia. | Não demonstra exclusão de arquivos do projeto ou apagamento de registros do serviço. |
| 5 | Distribuição do uso de contexto por categorias. | Números de um exemplo específico, não capacidade universal. |
| 6 | Arquivo CLAUDE.md com comandos e instruções de projeto. | Texto de instrução não comprova que testes tenham sido executados. |

Capturas locais: `studies/local/backfill-ac01-context-0.png` até `-6.png`. Foram abertas a partir das URLs das imagens presentes no artigo. Não houve download de mídia audiovisual.

## Divergência conferida na documentação atual

A aula afirma que ferramentas MCP entram previamente no contexto. Isso **não deve virar regra geral atual**: a documentação consultada nesta rodada descreve descoberta e carregamento sob demanda como padrão, com exceções por configuração e ambiente. Conferência limitada às seções de disponibilidade e busca de ferramentas, sem leitura integral desse documento adicional. [Documentação oficial de MCP](https://code.claude.com/docs/en/mcp#scale-with-mcp-tool-search).

A distinção pedagógica permanece: verificar o uso real do contexto e o funcionamento das integrações antes de mudar configurações. Não orientar o iniciante a desativar ferramentas necessárias apenas com base nessa generalização da aula. Skills e MCP também não devem ser tratados como mecanismos idênticos: a semelhança citada é uma comparação didática da fonte, não prova de equivalência funcional.

## Prática original: retomar uma página sem reconstruir a conversa

Atividade proposta, não executada. Usar uma cópia de uma página simples com contato e três seções. Antes de encerrar a conversa, criar um registro curto que contenha: objetivo, arquivo principal, requisitos aprovados, alteração concluída, evidência de teste e próximo passo. Marcar dúvidas como dúvidas e separar plano de alteração já feita.

Na retomada, fornecer esse registro e pedir ao agente que confira o arquivo antes de mudar algo. O aluno compara a resposta com duas fontes: o registro e o resultado existente. Esse exercício pode ser feito entre duas conversas curtas; não exige encher uma janela nem consumir deliberadamente muitos tokens.

1. **Continuidade de intenção:** o agente identifica o contato e as três seções corretos, distingue o que já existe do que falta e não reaplica uma alteração concluída. Uma divergência exige releitura do arquivo, não confiança automática no resumo.
2. **Continuidade da evidência:** cada afirmação de teste aponta o cenário e resultado registrados. Se o código mudou depois, o teste anterior não certifica a versão atual; repetir os cenários necessários e registrar a nova observação.

Se faltar uma decisão, formular a dúvida precisa e recuperá-la da fonte pertinente. Para instruções duradouras, manter o arquivo de projeto curto e compatível com seu conteúdo atual. Não guardar nele resultados temporários como se fossem regras permanentes, nem duplicar detalhes sem necessidade. Esses critérios são elaboração deste estudo.

## Adequação e pendências

Pré-requisitos: distinguir conversa, arquivo e projeto, abrir a pasta certa e reconhecer uma condição de conclusão. Adequado após a primeira modificação e antes de projetos com várias sessões. Em L01, usar apenas o registro de intenção e critérios do plano; comandos de contexto podem ficar para a etapa correspondente.

Não há ciclo de defeito, correção e reteste no material textual. A imagem de um resumo de revisão não demonstra a correção de segurança nele citada. Não foi medido ganho de qualidade, custo ou tempo. A leitura abrange todo o texto principal e a transcrição sem tempos; completude da fala, vídeo e comandos em execução continuam pendentes. Originais e imagens são locais, ignorados pelo Git, sem licença de republicação presumida.
