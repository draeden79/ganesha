# Primeira aula — plano de imagens didáticas

Escopo: pessoa que nunca usou IA nem programou. A aula deve terminar com a pessoa reconhecendo um pedido, uma resposta, uma omissão e uma correção. Plano para a revisão iniciada em 28/09/2026, 22:44 UTC. A ordem final precisa acompanhar o texto aprovado pelo Educador.

## Direção

Usar **quatro diagramas em HTML/SVG**, com texto real e acessível. Não há necessidade de ilustração raster nesta aula: os conceitos dependem de sequência, comparação e rótulos, e precisam se adaptar ao celular. Não representar menus oficiais de Claude/Codex nem inventar posições de controles.

Manter a identidade existente: fundo claro, cartões brancos, detalhes lavanda, texto escuro e roxo nos destaques. Usar a fonte já carregada pelo app. Não acrescentar mascote ou personagem a cada etapa; a imagem deve reduzir uma dúvida concreta.

O pedido completo continua como texto selecionável fora do SVG. A imagem não deve ser a única fonte de uma instrução necessária. Colocar o visual após a explicação curta e antes da ação. Uma imagem principal por tela, sem carrossel.

## Mapa recomendado dos dez momentos

| Momento | Objetivo para a pessoa | Visual | Observação editorial |
| --- | --- | --- | --- |
| 1. O que é IA | Entender que escreve um pedido e recebe uma resposta que pode conter erro. | A — pedido → IA → resposta | Explicar “IA” antes de pedir qualquer configuração. |
| 2. Onde fazer a conversa | Distinguir a conversa no aplicativo do registro nesta aula. | B — dois lugares, duas funções | Não exigir pasta/arquivo para uma mensagem que só pede texto. |
| 3. Conhecer a escola de exemplo | Ter os dados prontos, sem inventar um projeto pessoal. | Sem imagem nova; lista textual “Ponte Musical / violão / piano / canto”. | Essa lista precisa poder ser copiada. |
| 4. Distinguir pedido e resposta | Reconhecer qual mensagem foi escrita pela pessoa. | Sem imagem nova; conversa de exemplo em texto. | O check não recebe imagem que marque a alternativa correta. |
| 5. Escolher como acompanhar | Escolher entre ler o exemplo e abrir uma ferramenta já disponível. | Sem imagem nova; B pode ser retomado apenas se necessário. | O caminho pelo exemplo permite concluir a aula sem instalação. |
| 6. Enviar e reconhecer a resposta | Relacionar escrever, enviar e ver a resposta. | A, versão aplicada à conversa | Uma legenda curta identifica “Seu pedido” e “Resposta da IA”. |
| 7. Conferir uma coisa | Ver que “canto” foi pedido e pode ter sido omitido. | C — três itens comparados | O exemplo deve estar identificado como exemplo. |
| 8. Pedir uma correção | Continuar a mesma conversa sem começar tudo novamente. | D — correção em um novo balão | O texto da correção permanece copiável fora do diagrama. |
| 9. Reconhecer o que aconteceu | Reconhecer o aprendizado de quem acompanhou somente o exemplo. | Sem imagem nova; cenário textual do check. | Não revelar a resposta do check por cor, ícone ou posição. |
| 10. Guardar um aprendizado | Registrar uma ideia da aula com as próprias palavras. | Sem imagem nova; modelo preenchido em texto. | Ex.: “Aprendi que preciso conferir se a IA incluiu tudo que pedi.” |

Mapa confirmado no authoring final: A em `workspace.access` (1); B em `workspace.folder` (2), cujo conteúdo agora ensina onde escrever, sem ensinar pastas; C em `workspace.compare-context` (7); D em `workspace.access-recovery` (8). Os demais momentos não precisam de imagens novas. Em 6, a variante aplicada de A é opcional: o pedido copiável e a resposta de exemplo já mostram a sequência. Os checks continuam nas posições 4 e 9.

## A — Pedido, IA e resposta

- **Objetivo:** mostrar a relação entre o texto enviado e o texto recebido.
- **Composição:** três cartões ligados por setas: “Você escreve” → “A IA prepara uma resposta” → “Você lê e confere”. No celular, empilhar verticalmente.
- **Exemplo da etapa 1:** pedido “Diga olá” → resposta “Olá!”. A escola só aparece a partir da etapa 3. Uma variante sobre Ponte Musical pode ser usada opcionalmente na etapa 6, acompanhando o pedido e a resposta reais daquela etapa.
- **Rótulos:** “Seu pedido”, “IA”, “Resposta”. Explicar no texto da etapa que pedido é a mensagem que a pessoa escreve.
- **Alt da etapa 1:** “Você escreve o pedido ‘Diga olá’. A IA responde ‘Olá!’. Você lê e confere a resposta.”
- **Formato:** HTML para cartões/rótulos e SVG apenas para setas; funciona como uma coluna em 390 px. Variante aplicada pode usar balões HTML.

## B — Onde conversar e onde anotar

- **Objetivo:** impedir que a pessoa escreva o pedido no campo da Ganesha esperando uma resposta de IA.
- **Composição:** dois cartões explicitamente identificados. Primeiro: “Claude ou Codex”, com balões de pedido/resposta e a frase “Aqui você conversa com a IA”. Segundo: “Ganesha”, com uma anotação curta e a frase “Aqui você registra o que aconteceu”. Um pequeno texto “Depois, volte à aula” liga a sequência.
- **Rótulos:** “Conversa com a IA”, “Sua anotação na aula”. Não desenhar um botão funcional nem uma falsa tela de aplicativo.
- **Alt:** “No Claude ou no Codex, você envia o pedido e recebe a resposta. Na Ganesha, registra o que aconteceu ou o que não conseguiu fazer.”
- **Formato:** HTML/SVG. No celular, cartões em coluna. Nenhuma captura inventada, logotipo de ferramenta ou nome de menu não verificado.
- **Limite:** a figura não resolve instalação/acesso. O texto deve oferecer um caminho explícito para quem ainda não tem o aplicativo, sem prometer controles que não existem na aula.

## C — Conferir uma omissão

- **Objetivo:** transformar “a IA pode errar” numa comparação que a pessoa consegue fazer.
- **Composição:** duas listas de três linhas. “Você pediu”: violão, piano, canto. “A resposta citou”: violão, piano, “canto não apareceu”. Alinhar cada item por linha. Destacar a terceira com borda e a palavra “Faltou”, não só cor.
- **Rótulos:** “Você pediu”, “A resposta citou”, “Faltou canto”. Legenda “Exemplo de resposta incompleta”.
- **Alt:** “O pedido inclui violão, piano e canto. A resposta menciona violão e piano. Canto ficou de fora.”
- **Formato:** tabela/listas HTML semânticas, com conectores SVG opcionais. A 390 px, preservar a correspondência por item; evitar duas colunas muito estreitas.
- **Variante corrigida:** mudar somente a terceira linha para “canto — agora apareceu”. Reutilizar apenas se a etapa realmente pedir comparar a resposta corrigida.

## D — Corrigir na mesma conversa

- **Objetivo:** mostrar que a pessoa pode enviar uma segunda mensagem curta.
- **Composição:** três balões em sequência: resposta incompleta; pedido “Inclua também canto. Mantenha violão, piano e o nome Ponte Musical.”; resposta revisada contendo violão, piano e canto. Um marcador “Na mesma conversa” acima da sequência.
- **Rótulos:** “Resposta anterior”, “Seu pedido de correção”, “Resposta revisada”.
- **Alt:** “Depois de uma resposta sem canto, você escreve ‘Inclua também canto. Mantenha violão, piano e o nome Ponte Musical.’ na mesma conversa. A nova resposta inclui os três tipos de aula.”
- **Formato:** HTML/SVG; sem animação obrigatória. Ordem de leitura deve ser a mesma da ordem visual.

## Implementação e acessibilidade

**Limitação atual, identificada pelo Diretor:** `adaptCourse` descarta blocos `kind=image`; `TeachingVisual` desenha um esquema genérico e não apresenta esse esquema nas práticas em simulação guiada. Portanto, adicionar imagem/alt ao JSON não implementa este plano. O Construtor precisa ligar componentes próprios às quatro etapas e garantir sua renderização no modo da aula. Isso é trabalho futuro: nesta rodada a entrega é o briefing, e não imagens integradas.

1. Componentes sugeridos: `RequestResponseDiagram`, `ConversationVsNotesDiagram`, `MissingItemComparison` e `FollowupConversation`. Nomes internos não aparecem na aula.
2. Mapa obrigatório confirmado com o Educador: `workspace.access` → A; `workspace.folder` → B; `workspace.compare-context` → C; `workspace.access-recovery` → D. O ID `folder` foi preservado, mas agora ensina onde escrever; não desenhar pastas. A variante de A em `workspace.read-only-request` é opcional; `select-context` não exige diagrama novo.
3. Usar rótulos localizáveis; não embutir português em uma imagem raster. O primeiro candidato pode ser pt-BR, com outras traduções explicitamente pendentes.
4. Não inserir a mesma informação longa no corpo, na imagem, no pedido e na rubrica. A figura mostra a relação; o corpo orienta; o pedido fica copiável; a ação pede um passo.
5. Diagramas estáticos não recebem foco de teclado. Fornecer resumo acessível; se o conteúdo já estiver numa lista/tabela semântica adjacente, deixar as setas decorativas fora da árvore acessível.
6. Fonte mínima de 16 px no celular, sem texto rasterizado; máximo de três cartões/balões por figura. Não reduzir a fonte para caber: empilhar.
7. Além de cor, usar palavras e estrutura para indicar falta/correção. Respeitar redução de movimento se houver transição opcional.
8. Em RTL, espelhar setas de sequência e preservar a ordem semântica. Literais técnicos, quando realmente necessários, continuam LTR.

## Critério de aceite

Após olhar a figura, a pessoa deve conseguir apontar onde escreve, onde verá a resposta e o que precisa conferir. Se a figura só repetir o título, decorar a tela ou exigir explicação adicional de símbolos, removê-la. Este plano não equivale a imagens implementadas nem a telas oficiais verificadas.
