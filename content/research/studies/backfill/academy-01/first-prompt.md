# Primeiro pedido — intenção, permissão e plano

Fonte: [Your first prompt, Claude Academy](https://academy.claude.com/courses/claude-code-101/your-first-prompt), aula 4 de Claude Code 101, consultada em 28/09/2026. Vídeo associado: `gbetp6D7J_Q`. Não há data de publicação identificada na página. Texto complementar e seis parágrafos da transcrição oficial foram lidos integralmente; três imagens foram examinadas. Vídeo contínuo e execução prática permanecem pendentes.

## Argumento e caso da fonte

A aula começa pela escolha de supervisão, passa ao planejamento e aplica a ideia a uma mudança visual num aplicativo existente. O pedido deve indicar o objetivo, a localização do controle e a relação com o visual atual. O exemplo solicita alternância de tema no cabeçalho, mantendo coerência com as cores existentes. A narração aprova o plano e elogia o resultado, mas não apresenta no texto os critérios de aprovação, testes, erro ou recuperação.

A transcrição distingue aprovação manual e aceitação de edições. O texto complementar também descreve **Auto mode** com verificação de ações em segundo plano. Essa diferença foi preservada: a narração não documenta esse terceiro modo. Planejamento é apresentado como análise com ferramentas de leitura antes da implementação. O fluxo e o atalho exibidos pertencem ao terminal; não foram conferidos no Desktop nesta rodada.

## Evidência visual

As três imagens oficiais foram abertas e capturadas no navegador. A primeira mostra uma investigação de problemas, um pedido para corrigi-los e o indicador de aceitação de edições; não comprova correções concluídas. A segunda mostra o indicador de planejamento ativo. A terceira mostra o pedido de tema digitado com esse indicador ainda ativo. Nenhuma das três apresenta o aplicativo final ou um teste de contraste.

São imagens de interface de uma versão específica. Identificadores de conta e sessão visíveis não são requisitos e não devem ser transpostos para o curso. O original e as capturas ficam em arquivos locais ignorados pelo Git; o manifesto registra hashes e caminhos. Não se presume licença de republicação.

## Uso pedagógico e limites

O exemplo pressupõe projeto existente, acesso à pasta raiz e Claude Code já instalado. Não ensina criar o projeto, instalá-lo, configurar dependências ou publicar. A afirmação de que o resultado parece bom é uma avaliação do apresentador; não substitui medição de legibilidade, navegação por teclado, funcionamento em outras páginas ou persistência da preferência.

Para L01, aproveitar a separação entre intenção e execução: o aluno encerra com um plano revisado. Nas etapas seguintes, a proposta abaixo acrescenta critérios que a fonte não demonstra. Essa extensão é nossa, não um resultado do tutorial. Escolhas de permissão devem corresponder às ações e ao ambiente utilizados; a frase da aula sobre conforto pessoal não resolve, sozinha, o alcance dessas ações.

## Prática original: decidir antes de alterar

Usar uma cópia de página com três cartões e um botão de contato. Pedir um plano para oferecer aparência clara e escura, explicando quais elementos mudariam e como manter o contato funcionando. O aluno revisa três condições antes de autorizar implementação:

1. Alternar o tema deve mudar o fundo e os textos necessários à leitura, preservando conteúdo e destino do contato.
2. O controle precisa ter nome compreensível e ser acionável por teclado, com estado identificável.
3. Definir explicitamente se a escolha sobrevive ao recarregamento; o curso não deve pressupor armazenamento sem pedi-lo.

Na etapa de implementação, registrar o estado inicial e testar os dois temas, o contato, a navegação por teclado e o comportamento após recarregar. Conferir legibilidade com critérios apropriados em todas as áreas alteradas; uma impressão positiva não constitui teste. Repetir o mesmo conjunto após qualquer correção. Esses testes foram propostos, não executados nesta pesquisa.

Entrega para o Educador: exemplo de plano com critérios observáveis, distinção entre permissão e planejamento, e lista do que requer validação posterior. O aluno pode revisar um plano sem precisar interpretar o código inteiro. Alterações sem relação clara com o pedido devem ser explicadas antes de serem aprovadas.

## Cobertura

`studies/local/backfill-ac01-first-prompt.txt`: 60 linhas, lidas de 1 a 60, contém transcrição integral e texto complementar. O estado inicial Summary foi preservado separadamente após leitura no DOM. A transcrição limpa possui seis parágrafos, sem tempos; completude de fala não foi verificada. Imagens: `backfill-ac01-first-prompt-{auto,plan,input}.png`. Fonte textual integralmente lida; análise audiovisual integral não concluída. Instalação, aprovação real de comandos e execução de testes não realizadas.
