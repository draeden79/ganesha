# Revisão de código — conferir mudanças e questionar o revisor

Fonte: [Code review, Claude Academy](https://academy.claude.com/courses/claude-code-101/code-review), aula 7 de Claude Code 101, consultada em 28/09/2026. Esta aula é textual e interativa: nenhum vídeo, iframe ou imagem substantiva foi encontrado no corpo carregado. Foram lidos todo o texto, três expansões, oito amostras de diferenças e os feedbacks dos dois exercícios, incluindo alternativas. Os exercícios foram percorridos no navegador sem login; comandos de Claude Code não foram executados.

## Sequência e alcance

A aula começa pela diferença entre resumo e alteração real, propõe examinar mudanças inesperadas, testes enfraquecidos e dependências/configurações novas. Depois apresenta uma segunda revisão, explica classificação dos achados e pede evidência das correções. O exemplo é didático: um formulário de cadastro recebe validação, mas as oito alterações incluem efeitos omitidos pelo resumo.

O primeiro exercício chegou a três alertas identificados. O segundo foi percorrido nas doze combinações entre quatro achados e três decisões. Os feedbacks foram lidos após cada escolha; respostas alternativas não foram inferidas apenas do gabarito. Uma captura do percurso correto foi examinada e preservada.

## Oito alterações do primeiro exercício

| Arquivo do exemplo | Conteúdo efetivamente exibido e interpretação |
| --- | --- |
| SignupForm.tsx | Acrescenta uso de validadores, estado de erro e mensagem. O feedback o relaciona ao pedido. |
| validate.ts | Inclui biblioteca externa, normalização de espaços e regra de tamanho. A biblioteca leva à pergunta sobre dependência. |
| validate.test.ts | Acrescenta casos de email incompleto e senha curta. São amostras apresentadas, não execução real de testes. |
| SignupForm.test.tsx | Desativa um teste e substitui uma verificação precisa por uma chamada genérica. É um dos três alertas. |
| form.css | Estiliza erros; está ligado ao pedido, embora outro exercício discuta convenção de cor. |
| package.json | Acrescenta uma biblioteca para uma verificação. O feedback pede justificativa, não declara toda dependência um defeito. |
| package-lock.json | Mostra apenas um resumo de quatorze linhas alteradas, sem o conteúdo dessas linhas. O feedback atribui a mudança à instalação. |
| config.ts | Acrescenta constante pertinente e troca a origem configurável por localhost. A segunda alteração excede a tarefa. |

O resumo afirmar que testes passaram é compatível com a existência de testes desativados ou enfraquecidos no exemplo. Essa é a lição, não prova de que um conjunto real foi executado nesta pesquisa. Os oito arquivos são amostras do exercício; não constituem um repositório completo auditado.

## Quatro achados e decisões

| Achado | O que o exercício ensina |
| --- | --- |
| Teste enfraquecido | Corrigir e pedir a restauração da condição original, com evidência de execução. Apenas questionar ou ignorar não resolve a lacuna apresentada. |
| Suposta falta de remoção de espaços | O código já chama `trim()`. Questionar o revisor é adequado; o feedback também aceita deixar sem mudança se a pessoa constatou esse fato. |
| Endereço local na configuração | Restaurar a configuração apropriada e examinar a diferença. A justificativa de teste local não sustenta enviar esse valor ao ambiente final. |
| Cor escrita diretamente | Pode ser agrupada com ajustes de estilo. Corrigir não é errado, mas os problemas funcionais vêm primeiro neste cenário. |

Essa nuance evita um gabarito rígido: nem todo achado exige mudança, e o revisor também pode falhar. O contexto do exercício determina a prioridade; um problema visual que comprometa legibilidade ou contraste precisaria de avaliação própria, não ser automaticamente descartado como estilo.

## Expansões e pré-requisitos lidos

A expansão sobre diferenças exige repositório Git para os comandos apresentados e oferece revisão em linguagem comum quando esse registro não existe. A aula não ensina Git. A expansão de esforço distingue revisão mais restrita ou mais ampla e informa que a escolha persiste. A terceira separa o comando local do produto de revisão para equipes em repositórios GitHub.

A reversão descrita tem limite explícito: alterações feitas por comandos de shell não são todas desfeitas pelo mecanismo de retorno da conversa. Nenhuma reversão foi testada. Uma versão de trabalho identificável e a compreensão do que mudou continuam necessárias para ensinar recuperação.

## Aplicação e prática original

Adequado após a primeira modificação, quando o aluno conhece arquivo, comportamento esperado e comparação entre versões. A L01 termina no plano revisado; inspeção de código e execução pertencem à etapa posterior. Não exigir que um iniciante interprete oito arquivos de uma aplicação React para aprender o princípio.

Proposta original, não executada: numa cópia da página de três serviços, pedir uma mensagem de confirmação ao acionar o contato. Preparar uma versão de exercício em que o texto parece correto, mas o destino do botão foi alterado sem necessidade. Usar conteúdo fictício e nenhum envio externo.

1. **Conferir o alcance:** comparar texto, destino e arquivos antes/depois. Relacionar cada alteração ao pedido. Se a justificativa não fizer sentido, pedir explicação antes de aprovar a mudança.
2. **Conferir o próprio diagnóstico:** fornecer ao revisor um achado correto e uma suspeita que a versão atual já resolve. Exigir localização e reprodução. Corrigir o defeito confirmado e repetir o cenário; rejeitar a mudança desnecessária com evidência.

A entrega deve distinguir teste realmente feito, conclusão do revisor e dúvida ainda aberta. Uma correção aprovada pela interface do exercício não equivale a teste de um projeto real. O percurso desta pesquisa valida a leitura dos feedbacks, não a API, o formulário ou os comandos mostrados.

## Proveniência

Seis artefatos textuais `studies/local/backfill-ac04-code-review-*.txt` preservam corpo expandido, diffs individuais, percurso correto, alternativas da classificação e feedbacks de marcação. O manifesto traz hashes e intervalos completos. Screenshot `backfill-ac04-code-review-feedback.png` mostra a decisão de estilo e a conclusão do percurso. Data de publicação não identificada. Fonte integral analisada no escopo desta aula pública e de seus exercícios; documentos ligados e execução de produto não incluídos. Originais internos ignorados pelo Git, sem licença de republicação presumida.
