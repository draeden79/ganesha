# Estudo — Prompting (OpenAI)

Recurso: `res-codex-prompting`; fonte: `openai-learn-codex`; idioma: inglês. [Original](https://learn.chatgpt.com/docs/prompting), observado em 28/09/2026. Publicação/última atualização não expostas no corpo estudado. Não atribuir a data da coleta à publicação.

Artefato: `studies/local/codex-prompting.txt`, SHA-256 `f4a155ddbf7af5bf24f4e117b61bc4b6025a637bf8dcfd51941bed5cd1e1d367`. Corpo renderizado coletado pelo coordenador, relido integralmente pelo agente: linhas 1–503. A busca e abertura oficial confirmaram a URL e o conteúdo atual. Texto integral analisado; animação de ditado não assistida. `full_source_analyzed=false` para a página multimídia inteira, sem impedir uso dos fluxos textuais abaixo. Original local ignorado pelo Git; nenhuma licença de republicação presumida.

## Progressão integral e evidências localizáveis

O texto percorre objetivo, contexto, limites, formato, revisão e refinamento (17–128); ditado (130–135); exemplos de Chat (136–152); trabalho com fontes e entregáveis (153–190); então Codex (192–503). Não começa por uma fórmula obrigatória: o tamanho do pedido depende da tarefa. Fontes conectadas dependem de acesso; a revisão humana fecha o ciclo.

| Fluxo Codex, na ordem original | Contexto → operação → conferência | Linhas |
|---|---|---|
| Explicar código | Arquivos/seleção → responsabilidades e validação → fluxo e arquivos verificáveis | 211–246 |
| Corrigir bug | Reprodução de Save sem persistência → patch limitado → repetir reprodução, lint/teste relevante | 247–290 |
| Escrever teste | Seleção ou função `invert_list` → convenções e bordas | 291–316 |
| Prototipar imagem | Imagem + stack + interações invisíveis → página/componentes/README → servidor e rota | 317–360 |
| Iterar UI | Servidor aberto → escolha visual, ajustes pequenos → navegador e decisão sobre diff | 361–397 |
| Refatorar em cloud | Plano local, marcos/rollback → ambiente cloud → diff, testes/PR, próximo marco | 398–445 |
| Revisar localmente | `/review` → corrigir achados → nova revisão | 447–467 |
| Revisar PR | Habilitação no repositório → comentário GitHub com foco | 468–484 |
| Documentar | Arquivo e escopo → links → página renderizada | 485–503 |

Esse mapa registra a sequência efetivamente lida; não afirma execução dos exemplos. A evidência curta “Report the commands and results” (283) expressa o critério de prestação de contas, não prova que um comando foi executado.

## Pressupostos, limites e interpretação

**Documentação confirmada:** IDE inclui arquivos abertos; CLI requer caminhos/menções; comandos locais obedecem sandbox/aprovação (207–209). `/plan` no app e `/goal` quando disponível são mencionados em 196. A instrução `$plan` no exemplo de cloud é condicional à skill instalada, não sinônimo universal de `/plan`. Cloud requer ambiente próprio e traz uma condição de rede explicitada em 445. Steer e Queue têm funções diferentes (102–111).

**Análise editorial:** a fonte contém receitas completas de solicitação e conferência, mas não contém os resultados produzidos em um repositório real. Portanto, o Educador pode atribuir a ela um método de trabalho, não uma taxa de sucesso, uma demonstração executada ou a afirmação de que um teste determinado passou. Em particular, “contexto automático” é uma propriedade descrita por superfície, não uma autorização para presumir que qualquer arquivo local foi lido. A imagem de UI só informa aparência; requisitos como foco, teclado, persistência e erro precisam entrar no contrato textual.

**Riscos de adaptação:** o exemplo que preserva uma API depende de o aluno saber o que constitui essa API. A prática introdutória deve traduzir o limite para algo observável. Uma reversão manual precisa ser comunicada antes da próxima alteração, senão o contexto do agente pode ficar desatualizado. A etapa cloud não deve entrar no primeiro exercício Desktop como se fosse necessária. Sem ambiente configurado, ela é uma extensão posterior.

## Proposta original de prática para Ganesha

Competência: transformar uma intenção em mudança verificável, contextualizar um erro e iterar a partir de evidência. Proposta ligada a `res-codex-prompting`; não cria ID curricular formal.

Use um projeto didático com uma preferência de contraste que aparenta salvar, mas se perde ao recarregar. O aluno fornece a pasta, a rota, a sequência que reproduz o defeito, o resultado esperado e o limite de preservar os demais controles. Prompt original sugerido:

> Na página de preferências, o contraste alto desaparece ao recarregar. Primeiro confirme o comportamento. Explique qual informação falta e quais arquivos participam do salvamento. Corrija apenas esse fluxo, mantenha os outros controles e mostre como você verificou o resultado. Se um comando não puder rodar, registre isso.

Depois de receber a primeira resposta, o aluno confere se os arquivos citados existem e se a proposta alcança a gravação, não apenas a mensagem de sucesso. Ele acrescenta um segundo requisito: manter o valor ao fechar e reabrir a página. Após a mudança, lê o diff e decide se algum arquivo saiu do escopo. Havendo uma falha, retorna os passos exatos e o observado; evita o retorno genérico de que “não funciona”.

Verificação 1: sequência funcional antes/depois, com a mesma preferência e recarga; registrar estado observado, não só resposta do agente. Verificação 2: inspecionar diff e saída de teste relevante para confirmar o limite do escopo e distinguir teste executado de sugerido. Verificação 3, de transferência: repetir a formulação em outro controle com uma entrada inválida; o aluno precisa explicar qual evidência precisaria mudar.

Entregável: pedido inicial, um refinamento, diff, comandos/resultados e nota de lacunas. Critério de reprovação: concluir que o defeito foi corrigido apenas porque apareceu uma mensagem afirmativa.

## O que não foi revisado

Não executados CLI, IDE, cloud, PR ou qualquer exemplo no projeto do aluno; não testadas permissões/conta/limites de uso; animação de voz e páginas vinculadas não integralmente estudadas por esta ficha. O estudo não autoriza publicar/promover mudanças. Capturas de produto para a aula exigem conferência da versão real.
