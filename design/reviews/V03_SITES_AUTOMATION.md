# Revisão de Sites e Automações 0.3.0

Lidos integralmente os lotes `sites.pt-BR.json` e `automation.pt-BR.json` em `content/curriculum/v0.3.0/authoring/`: seis aulas, 60 etapas. Escopo editorial: sequência, densidade, suficiência do pedido e coerência da interação. Não é QA do app renderizado nem certificação factual das instruções de ferramentas/serviços.

## Resultado da primeira leitura

As rotas têm progressão concreta. Sites passa de pasta/plano/arquivo a testes de uso, publicação, visitante e atualização. Automações passa de contrato/gabarito/cópias de erro a execução/repetição/recuperação e operação agendada. Práticas frequentes e checks nas posições 4 e 9 apoiam a sequência.

Corpos medidos no snapshot: Sites 45–68 palavras; Automações 51–65. A densidade é compatível com o formato editorial proposto, sem necessidade de cortes ou expansão artificial. A revisão visual de traduções longas permanece para a prévia integrada.

## Correções encaminhadas antes da localização

| Prioridade | Local | Risco concreto | Ajuste solicitado |
| --- | --- | --- | --- |
| P1 | `site-publish`: conta, upload, visitante e atualização | Resultado final admite impedimento, mas alguns critérios exigem upload, visita ou Versão B executados mesmo com acesso bloqueado. | Harmonizar critérios com execução real ou impedimento e análise explicitamente identificados, sem premiar execução inventada. Verificar a mesma coerência nas outras práticas externas. |
| P1 | `site-publish.publish-package` | Nova pasta `ponte-site-publicar` é criada, mas não há instrução explícita para mudar o contexto da IA. Caminho relativo pode atingir pasta errada ou criar uma pasta aninhada. | Selecionar a cópia como contexto e editar `index.html` diretamente nela; preservar a original. |
| P1 | `automation-input.create-csv` | O pedido copiável diz “conteúdo abaixo”, mas os dados CSV estão em `code` separado. Copiar apenas o pedido omite a entrada. | Incluir os dados no pedido ou copiar pedido e código juntos como unidade completa. |
| P1 | `automation-report.build-transform` | “Use o contrato da aula anterior” pressupõe que a IA externa recebeu conteúdo do Ganesha. | Tornar o pedido autossuficiente ou instruir explicitamente a fornecer o contrato completo junto. |
| P1 visual | Comandos nas práticas de Automação | Comandos sem delimitadores não recebem o isolamento LTR implementado, podendo regressar a leitura árabe. | Delimitar comandos completos com backticks ou bloco de código literal. |
| P0 de escopo, já identificado pelo Educador | `automation-schedule` | A primeira versão ensina somente rascunho apesar da expansão pedir o ciclo de agendamento. | Autor está revisando para ativação acompanhada após pré-requisitos, execução observada, histórico/saída e pausa, com alternativa simulada quando necessário. |

Não foram encontrados outros riscos P0 nesta leitura. Ajustes cosméticos foram deliberadamente deixados fora desta rodada.

## Varredura estrutural das 120 etapas

Também foram verificados os quatro domínios pt-BR/en sem revisão textual integral de Apps: 12 aulas × 10 etapas; checks nas posições 4 e 9; IDs, tipos, modos e pré-requisitos paritários; campos de objetivo/ação/resultado/dica/critérios presentes; código literal igual nos dois idiomas. Zero divergência estrutural no snapshot. Registro: `../qa/v03-authoring-structure.json`.

A leitura dos validadores dos arquivos de exemplo existentes confirmou alinhamento com IDs únicos e valores não negativos com até duas casas decimais. Isso é inspeção de código, não nova execução dos exemplos 0.3.

## Reteste das correções — 28/09, 21:18 UTC

Correções editoriais verificadas em pt-BR e inglês:

- Publicação e atualização selecionam `ponte-site-publicar` como contexto e editam `index.html` diretamente na cópia.
- O pedido copiável de CSV contém cabeçalho e as duas linhas; o pedido de transformação contém o contrato completo. Os comandos estão delimitados para o tratamento LTR da interface.
- Agendamento agora cobre prontidão, ensaio manual, ativação acompanhada, histórico/saída e pausa, com simulação identificada quando faltam condições. O ensaio tem pedido próprio de execução única, sem criar agenda. O cenário de 09:00 sem disparo e 09:20 com execução manual está no corpo visível, sem depender de abrir Ajuda.
- O bundle pt-BR/en contém 67 práticas externas com dois critérios de registro: distinguir observação/simulação/pendências e comparar o registro aos alvos da etapa. Os critérios específicos de aprendizagem permanecem em `criteriaKeys`; as práticas contêm aviso explícito sobre execução externa. Nenhuma divergência nessa inspeção do compilado.

O corpo do cenário de agendamento ultrapassa o alvo indicativo de 75 palavras para deixar o caso essencial visível. A suficiência da instrução tem prioridade sobre esse alvo; o layout será verificado na prévia.

## Estado

Sites e Automações aprovados editorialmente após reteste, sem P0/P1 aberto nesta revisão. Somados a Fundamentos, são 90 etapas lidas integralmente em pt-BR; Apps recebeu somente a varredura estrutural nesta tarefa. A inspeção das traduções inglesas concentrou-se nos ajustes, sem alegar revisão linguística dos 11 idiomas.

O registro estrutural foi atualizado com hashes das fontes e do bundle. A aprovação do app renderizado e a conferência de mobile/RTL dependem da prévia isolada do Construtor. A beta 0.2.0 foi preservada; o Artista não alterou autoria nem implementação.
