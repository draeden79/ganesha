# Estudo — Explore → Plan → Code → Commit

Recurso `res-claude-plan-build-review`, fonte `claude-academy`, inglês. [Aula oficial](https://academy.claude.com/courses/claude-code-101/the-explore-plan-code-commit-workflow), observada em 28/09/2026. Identificação exposta: aula 5, estimativa 8 min; data de publicação não confirmada. Player vinculado a [xJQuF02NAK8](https://www.youtube.com/watch?v=xJQuF02NAK8).

Texto auxiliar `studies/local/official-claude-explore-plan-code-commit.txt`, SHA-256 `c841cfed33d8ad0bdce440b2d6c4e12a299d7b666dbf5a4f72c7aab417bb4085`, 1–145 integralmente lidas. Transcrição oficial selecionada no radio **Transcript**, `official-claude-workflow-transcript.txt`, SHA-256 `03284d5e7dbc15df695ed5c6961a66184f8003f57145038b06b54bdf8f9243b9`, 1–79 integralmente lidas: fala em 6–16, depois texto auxiliar repetido. Não há timestamps; cobertura da faixa de áudio não foi comparada. Estado `transcript_analyzed_visual_pending`; `full_source_analyzed=false`. Nenhum vídeo assistido por este agente. Originais ignorados pelo Git.

## Progressão da fala e relação com o texto auxiliar

1. Abertura: escrever imediatamente gera retrabalho; adotar quatro fases (transcrição 6).
2. Explorar/planejar: modo sem edição, localizar conversão WebP no pipeline, examinar dependências, revisar abordagem antes de aprovar (8).
3. Executar: seguir itens, decidir permissões, corrigir direção quando necessário; plano preserva contexto para a iteração (10).
4. Verificar: sucesso explícito, ferramentas de navegador, suíte confiável, registrar aprendizados recorrentes em CLAUDE.md (12).
5. Finalizar: teste humano, revisão por outro agente, mensagem de commit, novo ciclo (14–16).

O texto auxiliar acrescenta formulação atualizada de Auto e do explore subagent; não atribuir automaticamente essas diferenças à fala. Exemplo original é WebP, não a criação integral de um site. Não foram apresentados nesta transcrição logs de teste nem um defeito específico resolvido. A fala menciona troubleshoot, mas não narra uma falha concreta. Não há patrocínio no texto; há orientação à extensão Claude in Chrome e navegação de curso no entorno.

## Superfície, pressupostos e limites

Imagem `official-claude-workflow-plan.png` vista: terminal com indicador de plan mode e Shift+Tab. Sustenta que esse trecho visual é de CLI. A [referência Desktop](https://code.claude.com/docs/en/desktop), artefato `official-claude-desktop-rendered.txt` lido seletivamente, é explícita em 235: atalhos de terminal não se aplicam ao Desktop. Para adaptação, escolher Plan no seletor de modos; não ensinar Shift+Tab como passo universal.

**Autor:** recomenda planejar, definir sucesso, conferir testes, testar por conta própria e revisar antes do commit. **Análise editorial:** esse princípio transfere para pessoas comuns, mas pipeline de imagens, dependências, Git e subagentes não são pré-requisitos aceitáveis para o primeiro resultado. A primeira prática pode terminar em artefato local revisado; commit deve entrar após explicação de histórico e diferença para publicação. Um revisor novo também pode errar; sua independência de contexto não é garantia de correção.

Aula e quickstart compartilham planejamento/revisão. Pertinência P0 como sequência curta; evitar repetir toda a instalação. Atualidade: texto vivo coletado em setembro/2026; imagem não expõe versão e contém controles de terminal. Lacuna: não fornece resposta real inteira, diff final e resultados do exemplo WebP. Por isso a atividade a seguir é criação pedagógica, não reprodução certificada da demonstração.

## Prática original: planejamento em L01, implementação em etapa posterior

Competência: formular e revisar um plano pequeno; nas etapas posteriores, executar e conferir evidência. **A entrega da L01 termina no plano revisado, sem editar arquivos.** As fases Executar e Verificar abaixo são propostas para a sequência posterior do curso, sem criar novas aulas automaticamente. Referência `res-claude-plan-build-review`; sem novo ID curricular formal.

Projeto: página simples de uma feira de bairro, já fornecida pelo curso. Resultado desejado: acrescentar seção com horário, endereço e um botão que desça até o formulário. O aluno possui os dados e consegue reconhecer sucesso sem interpretar toda a implementação.

Explorar: em Plan, pedir ao assistente que indique os arquivos relevantes e o que precisa saber antes de editar. O aluno deve conferir se a pasta e os dados utilizados são os corretos. Plano: pedir proposta de três passos com critério observável para o botão e preservação do conteúdo existente; rejeitar uma dependência extra ou página adicional sem necessidade.

Executar: após revisar o plano, selecionar o modo apropriado e pedir implementação apenas da seção. Ler as solicitações/alterações e responder com uma correção específica se o texto estiver errado. Não apresentar a aprovação do plano como aprovação de qualquer ação externa.

Verificar: abrir a página, conferir os três dados, clicar o botão e observar o destino. Abrir o diff, comparar arquivos e conteúdo com o plano. Se o botão não levar ao formulário, relatar destino observado e esperado, pedir reparo e repetir o mesmo clique. Finalizar com evidência do que foi conferido e do que permanece pendente. Salvar uma versão só depois de compreender a ação; publicação pública fica fora do exercício.

Check 1: plano contém resultado e limite de escopo verificáveis antes da edição. Check 2: comportamento no preview corresponde ao critério; não basta botão existir. Check 3: diff preserva texto/arquivos fora do combinado. Transferência: em uma automação simples, substituir botão por entrada de teste e destino observável, preservando planejar–executar–verificar.

## O que falta

Audiovisual completo, alinhamento temporal da transcrição e demais imagens da aula ainda não revisados neste registro. Uma captura do indicador não certifica o vídeo. Sem instalação de extensão, teste WebP, execução de suíte, subagente ou commit. O coordenador pode acrescentar estudo audiovisual independente; esta ficha não o antecipa.
