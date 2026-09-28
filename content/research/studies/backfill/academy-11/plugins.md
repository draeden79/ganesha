# Plugins — distribuir uma configuração exige conhecer seus componentes

[Aula pública da Claude Academy](https://academy.claude.com/courses/claude-code-in-action/plugins), observada em 28/09/2026. Texto inteiro lido em ordem e preservado em `studies/local/backfill-ac11-plugins.txt`. Não havia rótulo Transcript nem imagens no corpo observado. O vídeo `DJNaTOFIQPs` não foi acompanhado; `text_read_complete=true`, mas transcrição e audiovisual permanecem não certificados. Nenhum plugin foi instalado ou alterado.

## Sequência e conteúdo

A aula começa pelo problema de compartilhar uma configuração que funciona: copiar arquivos entre pessoas torna difícil acompanhar versões e diferenças. Apresenta o plugin como unidade instalável que reúne skills, agentes, hooks e servidores, entre outros componentes. O valor proposto é distribuir um conjunto identificado, sem reconstruí-lo manualmente em cada máquina.

Em seguida descreve instalação por nome, ativação/recarregamento e adição de marketplace para uma equipe. Mostra a ideia de catálogo compartilhado, descoberta e atualização. Esses comandos pertencem ao ambiente Claude Code descrito, não ao Codex Desktop. Não foram executados, nem sua disponibilidade confirmada na conta do aluno.

A seção seguinte orienta examinar o conteúdo antes de instalar. Destaca hooks e conexões que podem acompanhar a skill desejada. Diferencia revisão automatizada de garantia de confiabilidade. O exemplo de hook que contata um endpoint é hipotético: a página não apresenta um incidente real ou um plugin específico auditado. A ficha conserva essa distinção.

Depois explica convivência com componentes locais, namespacing e configuração limitada. O campo que seleciona agente pode mudar o comportamento padrão. A parte de empacotamento descreve diretórios, manifesto opcional, nome e versão. Termina defendendo distribuição de uma configuração conhecida. Não mostra duas instalações independentes, atualização com regressão ou remoção seguida de teste.

## Precisões técnicas conferidas

Trechos da [referência oficial de manifesto](https://code.claude.com/docs/en/plugins-reference) confirmam que o manifesto é opcional; quando fornecido, exige nome. Os componentes ficam em locais próprios sob a raiz do plugin, como `skills/`, `agents/` e `hooks/hooks.json`; o manifesto fica em `.claude-plugin/plugin.json`. A configuração do plugin aceita `agent` e `subagentStatusLine`, e chaves distintas são descartadas. Caminhos explícitos podem alterar a descoberta convencional. Essa conferência é parcial, sem validar um pacote ou ler toda a referência.

“Mesma estrutura” na aula não deve virar instrução de colocar todos os componentes dentro de `.claude-plugin/`. Esse diretório contém o manifesto, enquanto componentes têm seus locais descritos. Também não se deve interpretar namespacing como impossibilidade de interação indesejada: hooks podem se acumular e regras podem produzir comportamentos conflitantes mesmo com nomes diferentes. A própria fonte limita disparos por eventos correspondentes; a redação sobre cada chamada não demonstra execução de todo hook em qualquer ferramenta.

## Mecanismo e pertinência

Distribuir uma versão identificada ajuda a saber o que cada pessoa recebeu. Isso não garante resultados idênticos: dependências, credenciais, permissões e versões do cliente ainda podem variar. O registro de instalação precisa ser acompanhado por um teste do comportamento esperado. Um pacote presente no disco e uma skill efetivamente disponível são estados distintos.

Para uma pessoa comum, o primeiro passo útil é explicar qual rotina será repetida e como reconhecer seu resultado. Empacotar antes de ter um procedimento compreendido apenas distribui uma incerteza. A fonte trata compartilhamento de configuração, não fornece um curso completo de publicação, autenticação de marketplace privado ou manutenção de versões.

Complementa as fichas de skills, agentes, MCP e hooks ao reuni-los numa unidade de distribuição. A classificação como aprofundamento preserva o conteúdo no corpus integral. Não torna marketplace ou instalação requisito da primeira página/app. A configuração real do usuário permaneceu intocada.

## Prática original proposta

Proposta não executada: em ambiente separado e com um pacote próprio de ensaio, reunir uma única skill que confere quatro campos de um briefing fictício. Primeiro testar a instrução avulsa com uma entrada completa e outra sem horário. Depois preparar a versão do pacote e comparar o comportamento. Não incluir serviços externos ou hooks apenas para preencher a estrutura.

1. **Inventário e disponibilidade:** listar componentes esperados, identificador e versão. Depois da instalação de ensaio, conferir o que ficou disponível e se o nome resolve para a rotina prevista.
2. **Comportamento:** repetir as duas entradas; a versão completa deve passar pelos critérios e a incompleta deve apontar precisamente a falta. A instalação concluída não conta como esse teste.
3. **Atualização e retirada:** acrescentar um critério numa nova versão, repetir os casos e identificar a diferença. Desativar/remover o pacote de ensaio e verificar seu efeito sem apagar instruções independentes. Registrar estados antes/depois.

L01 pode planejar a rotina, com entrega restrita ao plano revisado. Implementação e distribuição ficam para etapa posterior, se aprovadas no currículo. Pendências: vídeo, configuração executável, instalação, atualização e recuperação reais. Originais ficam internos e ignorados pelo Git; nenhum direito de republicação foi presumido.
