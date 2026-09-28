# Revisão pedagógica da beta 0.2.0

Data: 28/09/2026. Responsável: Educador, agente de IA. Escopo novo autorizado pelo usuário via Diretor: percurso mínimo completo para beta pública do hackathon. O Diretor leu integralmente a primeira versão pt-BR e aceitou a sequência, solicitando comandos e pré-requisitos concretos; esses ajustes foram incorporados. Esta decisão de beta não altera retrospectivamente os aceites restritos da0.1.0.

## Decisão

Aceitar quatro aulas práticas para a beta explicitamente identificada, mantendo `draft`, `preview` e `releasedLessonIds=[]`. O aplicativo deve usar allowlist beta de `lesson.foundations`, `lesson.site`, `lesson.app`, `lesson.automation`. Não promover artificialmente a `ready`. Há conteúdo ensinável e completo dentro dos quatro recortes: contexto/pedido/plano; site estático; app de tarefas com persistência local; transformação CSV com entrega manual. Não há promessa de domínio geral, eficácia medida ou demonstração observada em Claude/Codex.

Cada aula tem seis etapas: aprender, preparar uma solicitação com exemplo simulado, primeira avaliação, executar/corrigir, segunda avaliação e entregar. Sites, apps e automações dependem somente dos fundamentos. Cada uma tem duas questões distintas com três alternativas e feedback que explica o acerto e os desvios. O mesmo feedback por questão é deliberado: compara todas as alternativas. Práticas externas são autodeclaradas; avaliação de múltipla escolha não certifica que um aplicativo foi executado.

## Alinhamento revisado

| Aula | Entrada e resultado concretos | Verificações e recuperação | Entrega |
| --- | --- | --- | --- |
| Fundamentos | Pasta identificada; pedido Ponte Musical; plano que respeita três serviços e contato sem envio | Omissão/escopo e força da evidência; correção específica do plano, sem inventar falha | Pedido, resposta e comparação |
| Site | Pasta ponte-site; index.html autossuficiente; título/serviços/contato | Clique, teclado e janela estreita; reproduzir/corrigir/retestar; acesso público distinto de painel autenticado | URL testada ou pasta testada com impedimento explicitado; atualização de produção ensinada |
| App | Lista com adicionar/concluir/remover, entrada validada, localStorage | Vazio/espaços, recarga, remoção; mesma origem; falhas de salvar/restaurar | Pasta, endereço/execução e limites de persistência; compartilhamento estático opcional |
| Automação | CSV com 10.50+20.00; script report.py; report.md com2registros/30.50 | Execução normal, repetição, coluna ausente e recuperação; erro preserva saída válida | CSV, script, relatório e instruções; agenda explicitamente posterior |

Computador, navegador, conta, acesso/custos e pasta são explícitos. Python3 não é presumido: primeiro verificar disponibilidade; comandos concretos têm variante Windows. Terminal é explicado como área de comandos que a ferramenta pode operar. App usa endereço HTTP estável para persistência; alternativa de prévia local depende de disponibilidade. Automação oferece alternativa original de HTML local com entrada CSV/download se o ambiente não existir; essa alternativa é tarefa a construir, não artefato que fingimos executar. No caminho de download, um erro não deve gerar substituição da saída válida.

## Base e limites das fontes

Prompting e quickstarts foram lidos conforme pareceres anteriores, preservados em `reviews/`. O workflow Academy sustenta método textual; seu vídeo não foi certificado. Os quatro exemplos são produção didática original, não reprodução de resultados dessas fontes.

Neste sprint, o Educador leu integralmente os dois originais Netlify: `studies/local/publishing-netlify-drop.md` e `publishing-netlify-visibility.md`, além da ficha `studies/publishing/netlify-manual-static.md`. As páginas sustentam upload, URL, visibilidade e atualização direta em Production deploys. Não houve upload real pelo Educador. As animações permanecem fora de aceite integral. Fontes: [Drop](https://docs.netlify.com/start/quickstarts/netlify-drop-quickstart/) e [visibilidade](https://docs.netlify.com/manage/security/secure-access-to-sites/project-visibility/).

A propriedade [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) foi consultada como complemento focal de persistência: conteúdo principal lido (valor, exceções, descrição e exemplos); confirma origem, persistência entre sessões e comportamento não garantido em file URLs. Não se declara curso completo de armazenamento estudado. Isso fundamenta usar HTTP local e repetir na origem final. Dados privados/incógnitos podem ser descartados; o protótipo não é armazenamento de informações importantes.

Foi lida a referência original do Devorador `sprint-csv/report.py`, README e `validation.json`. Seus testes locais às20:24 comprovaram contagem/total, repetição e preservação em erros para esse script. Não comprovam execução do script que cada aluno obtiver, nem interface Claude/Codex ou agendamento. A versão inicial da referência usava outro nome de entrada e dois itens diferentes com o mesmo total; o curso fixa vendas.csv e seus próprios itens. O gabarito é cálculo explícito, não afirmação de execução do exemplo textual.

## Tradução, progresso e próximos critérios

Os 11 idiomas são autoria/tradução por IA, revisão humana pendente. Termos de máquina (arquivo, comando, CSV, endereço) são preservados; nenhum idioma usa fallback de português. A versão0.2.0 possui IDs novos para perguntas/etapas. Histórico0.1.0 não dá aprovação automática a critérios novos.

Tempos estimados são planejamento, não tempos medidos com iniciantes. Os gates de aula estável continuam exigindo observação operacional relevante, revisão linguística humana e melhoria após uso real. A publicação da beta é decisão explícita de escopo, não resultado de contagem de fontes ou sucesso estrutural.
