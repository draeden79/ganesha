# Parecer do Educador — complemento P0

Data: 2026-09-28. Lote do Devorador `3beec63`, sobre `8af94e4`. Revisor: Educador, agente de IA. Os originais abaixo foram lidos integralmente, em retornos sem truncamento, e as duas imagens foram abertas e inspecionadas. Nenhum aplicativo foi operado e nenhum vídeo foi assistido nesta revisão.

## Cobertura e integridade

Caminhos relativos a `content/research/studies/local/`. Todos os hashes foram recalculados e conferidos.

| Artefato | Cobertura | SHA-256 |
| --- | --- | --- |
| `official-codex-quickstart.md` | 204 linhas, 7.562 bytes; Desktop, Web e seis exemplos propostos | `5c052386e1de596504ce11df740000577d8acc5b6c5693a524b3f711cceabcef` |
| `official-codex-quickstart-rendered.txt` | 98 linhas, 2.914 bytes; complemento da aba Desktop renderizada | `874ed2f9b79609da7f3a6c33fec6d5baa67891b82cadd83931d1e71242f6c0a0` |
| `official-codex-quickstart-selector.png` | imagem inteira inspecionada; 97.948 bytes | `75d58a03b02fce0f1456a50575c0daca73b5c6d161e2cdc72623af993f4b78db` |
| `official-claude-explore-plan-code-commit.txt` | 145 linhas, 4.572 bytes; texto auxiliar integral | `c841cfed33d8ad0bdce440b2d6c4e12a299d7b666dbf5a4f72c7aab417bb4085` |
| `official-claude-workflow-transcript.txt` | 79 linhas, 6.334 bytes; transcrição oficial e repetição do texto auxiliar | `03284d5e7dbc15df695ed5c6961a66184f8003f57145038b06b54bdf8f9243b9` |
| `official-claude-workflow-plan.png` | imagem inteira inspecionada; 40.615 bytes | `683e7f9b7d31affc2160174c5b0c1ad6224760aacb112e8914cb790df5028206` |

Também foram lidos `official/P0_MAP.md`, as fichas dos dois estudos e o manifesto. As outras fichas desse lote, a publicação Netlify e os vídeos avançados não estão implicitamente aceitos por este parecer.

## Quickstart: texto integral e uma ilustração aceitos com limites

O [Quickstart oficial](https://learn.chatgpt.com/docs/quickstart) descreve instalação/acesso, escolha de contexto, escolha de produto e primeiro pedido (original, linhas 42–120). A opção de desenvolvimento é Codex; ChatGPT Work e Chat são escolhas diferentes. Selecionar uma pasta permite trabalho sobre seus arquivos. Isso fundamenta conferir o contexto antes de enviar o pedido. A alternativa de chave de API tem limitações e não é necessária ao exercício inicial.

Os seis exemplos são pedidos sugeridos, não resultados observados. O exemplo de melhoria de aplicativo já pede implementação e testes; copiá-lo mudaria o objetivo da L01, que termina no plano. Os percursos Web e os links seguintes foram identificados, sem exigir que o aluno os complete.

A PNG mostra texto da documentação e uma ilustração da barra lateral, no estado ChatGPT. O complemento renderizado identifica expressamente o seletor como ilustração interativa. O Educador não observou sua transição nem um seletor numa conta real. Portanto, aceita o conteúdo textual integral e a interpretação desta captura; não aceita demonstração operacional nem revisão de todos os estados interativos da página. A classificação do pesquisador não amplia esse aceite.

No lote `3beec63`, `official-codex-quickstart` não tem `resource_id`; `res-codex-desktop-start` identifica outra URL, `/app`. Após solicitação do Educador, o Devorador criou `res-codex-desktop-quickstart` / `ev-codex-desktop-quickstart`. O Educador conferiu ambos em `registry.json` e o recurso no manifesto do worktree de pesquisa; o commit de integração ainda está pendente nesta revisão. O estudo permanece rastreável por URL, study ID e hash. Não fundir as fontes. A documentação textual já permite preparar o roteiro interno.

## Academy: método textual aceito; audiovisual continua pendente

A [aula selecionada](https://academy.claude.com/courses/claude-code-101/the-explore-plan-code-commit-workflow), `res-claude-plan-build-review`, sustenta explorar contexto, revisar o plano por critérios, corrigir pontos específicos, conferir o resultado e só então finalizar. A fala exportada está nas linhas 6–16; as linhas seguintes repetem o texto auxiliar. O áudio não foi confrontado e não há timestamps.

A imagem exibe terminal com `plan mode on` e `shift+tab to cycle`. Ela comprova apenas a superfície desse trecho. Não ensinar esse atalho como instrução Desktop. A variante Desktop deve usar o quickstart próprio já revisado, que descreve Plan no seletor de modos.

WebP, dependências, extensão de navegador, suíte de testes, subagentes e commit pertencem ao contexto técnico do autor. Não são pré-requisitos da L01. Testes confiáveis e revisão humana são recomendações metodológicas; o texto não fornece resposta WebP completa, defeito reproduzido, diff e log de reteste. A proposta da ficha de editar uma página de feira é elaboração do pesquisador e pressupõe uma página existente. Não a adotar como se fosse um exemplo executado pela fonte ou como substituição do objetivo de planejamento.

## Aplicação e suficiência

O exemplo original Ponte Musical pode usar a sequência pedido → plano → comparação → revisão → nova comparação, explicitamente simulada. `L01_DESKTOP_PRACTICE.md` prepara a aplicação externa com variantes documentadas, recuperação e registro autodeclarado. As duas verificações do exemplo passam a ter alternativas e feedback concretos para revisão editorial.

As lacunas textuais de entrada e método ficaram mais estreitas. Permanecem: inspeção operacional pertinente das duas superfícies; revisão audiovisual da fonte selecionada ou substituição fundamentada que cubra sua necessidade; avaliação editorial da sequência e das questões; localização e decisão de versão/progresso. Mais guias genéricos não resolvem essas lacunas. Duas capturas inspecionadas não equivalem a duas demonstrações completas. L01 continua `draft`, sem elegibilidade para release.

## Verificação desta entrega

Os 24 arquivos de geração/runtime — gerador, curso, 11 fontes de mensagens e 11 catálogos — permanecem byte a byte iguais ao commit curricular anterior `9f6a634`. Os hashes de todos os artefatos aceitos em `maturity.json` foram conferidos, inclusive os complementos; o JSON é válido e não duplica IDs de estudo dentro de cada classe de aceite. `preview`, `draft`, lista de releases vazia e gates não atendidos foram preservados. A verificação é de integridade editorial; não é teste de aprendizagem ou execução externa.
