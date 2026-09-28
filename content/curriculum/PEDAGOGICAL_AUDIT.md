# Auditoria da sustentação pedagógica — L01

Data: 2026-09-28. Responsável: Educador. Curso `course.first-site`, versão não publicada `0.1.0`, aula `lesson.first-request`. Solicitação do usuário transmitida pelo Diretor: reavaliar a qualidade de uma aula construída a partir de resumos e exigir estudo integral das fontes pertinentes antes do aceite pedagógico.

Esta auditoria registra o ponto de reclassificação. Novos aceites posteriores são registrados em `maturity.json` e `reviews/`, sem reescrever os limites do pacote original. O primeiro avanço oficial está em `reviews/OFFICIAL_SUBSET_01.md`; a contagem inicial de zero aceites abaixo não deve ser usada como contagem atual da pesquisa.

## Conclusão e correção de estado

**A L01 atual é um protótipo provisório. Não está pedagogicamente pronta.** A atribuição anterior de `ready` confundiu completude estrutural e localização com maturidade editorial. Esse rótulo foi inadequado e foi retirado. `course.status` continua `preview`, `lesson.status` passa a `draft` e `releasedLessonIds` fica vazio. IDs, versão, textos dos 11 idiomas, respostas corretas e registros de progresso não mudam.

O protótipo contém atividades originais plausíveis e fatos operacionais apoiados por consultas pontuais à documentação. Isso não prova que o percurso completo ensina um iniciante a realizar a tarefa, nem substitui estudo integral das fontes relevantes. Nenhuma aula está aceita como pronta nesta auditoria. Não há alteração de versão publicada.

## O que foi efetivamente consultado

| Camada | Registro disponível | O que permite afirmar | O que não permite afirmar |
| --- | --- | --- | --- |
| Leitura primária direta pelo Educador | Páginas oficiais [app](https://learn.chatgpt.com/docs/app) e [quickstart](https://learn.chatgpt.com/docs/quickstart), trechos de instalação, escolha de contexto e envio da primeira mensagem; chamadas registradas nesta tarefa | Nessa consulta, a documentação orientava escolher Codex e um contexto de trabalho; foi observado o redirecionamento das URLs antigas | Estudo integral certificado das páginas, experiência real de instalação ou domínio da UI |
| Conferência primária pontual pelo Diretor | `coordination/SOURCE_REVIEW.md`: app OpenAI, “Send your first message”; Claude quickstart, “Install” e “Start your first session” | Esses trechos foram abertos e conferidos pelo Diretor; sustentam orientações pontuais de entrada | Revisão integral do material ou execução nas ferramentas pelo Educador |
| Pesquisa do Devorador usada na elaboração | `EARLY_BATCH.md`, `registry.json` e sínteses das seções, commits `c531c9e` e `5226254`; 23 fichas/16 evidências no pacote expandido | Descoberta, triagem e vínculos para afirmações específicas, com ressalvas | Aula, artigo ou demonstração integralmente estudados; nenhuma certificação retroativa das 23 fichas |
| Elaboração do Educador | `build_course.py`, mensagens e `L01_REFERENCE.md` | Autoria do exemplo, sete telas, perguntas, alternativas, rubricas, dicas e proposta de transferência | Que as fontes ensinam exatamente esse exemplo, essa sequência ou essa rubrica; eficácia validada |
| Tradução e software | 112 mensagens por idioma, duas verificações em telas distintas, auditoria estrutural histórica | Integridade dos dados e presença de textos | Correção pedagógica, fluência revisada por humanos ou aprendizagem demonstrada |

As três transcrições exportadas posteriormente não faziam parte de um estudo integral aceito para elaborar a L01. Na abertura desta auditoria, o manifesto em trabalho já marcava a faixa en-CA de Tim como lida (706 cues), com `transcript_analyzed_visual_pending` e `full_source_analyzed=false`; o Devorador confirmou esse avanço. Peter e Nate continuavam apenas exportados. Essa mudança é registrada como trabalho em andamento, sem incorporá-la automaticamente à sustentação da aula. A contagem vigente de fichas integrais **aceitas pelo Educador para L01 é zero**.

## Sustentação por etapa

Todos os IDs abaixo usam o prefixo `step.first-request.`. As variantes `tool.claude` e `tool.codex` são anexadas às sete etapas no gerador, portanto a lacuna de inspeção do percurso visual atravessa todas elas. Cartões/diagramas HTML do protótipo são ilustrações didáticas, não demonstrações observadas dos aplicativos.

| Etapa | Sustentação disponível | Elaboração original | Lacuna e decisão |
| --- | --- | --- | --- |
| `scope` | `ev-codex-prompting`, síntese de “Prompting overview”: declarar resultado e contexto. O Educador não estudou integralmente essa fonte | Serviço fictício de música, público iniciante, contato como ação principal e recomendação de começar pequeno | A ação é mental, sem evidência observável registrada; a promessa de ajudar a delimitar escopo ainda não foi testada. Estudar exemplos completos de escopo e definir um produto do aluno que permita verificar o objetivo. **Provisória** |
| `brief` | `ev-codex-prompting` e `ev-claude-plan-build-review`, seções sobre contexto, limites e critérios; somente sínteses foram consumidas pelo Educador | Pedido de plano, quatro elementos da rubrica, dados fictícios, exemplo e dicas | Falta um ciclo completo pedido → resposta → comparação com critérios → revisão. Não há exemplos contrastantes completos nem critério calibrado para texto aberto; marcar caixas é autoavaliação. **Provisória** |
| `request-check` | `ev-claude-plan-build-review`, seção “Code”, sustenta explicitar sucesso, sem validar esta avaliação | Cenário de contato, três opções, resposta B e feedback | Mede reconhecimento de um critério observável, não a capacidade de escrever um pedido completo. Os distratores são óbvios e as dicas entregam a regra; não há evidência de discriminação com iniciantes. Rever após estudo integral e testar aplicação em outro contexto. **Provisória** |
| `run` | `ev-claude-agent-basics`, `ev-claude-desktop-start` e `ev-codex-desktop-start`; fatos de entrada corroborados pelas leituras pontuais acima | Plano sem alterar arquivos, instrução externa, registro autodeclarado e rota de retorno para quem não tem acesso | A sustentação é mais forte para fatos pontuais de produto, mas o percurso operacional está incompleto: falta setup completo, glossário mínimo, exemplo real de resposta, escolha/checagem de pasta e recuperação de falhas. Nenhuma demonstração visual pertinente foi inspecionada para esta aula. **Provisória; bloqueia aceite operacional** |
| `evidence-check` | `ev-claude-verify-unattended`, síntese sobre examinar alterações e resultados reais de testes | “A página está pronta”, três conclusões, resposta C e feedback | Mede reconhecimento da ausência de prova. O cenário muda do plano para uma suposta página pronta sem mostrar a transição; não ensina a reunir prova real ou avaliar prova incompleta. Falta exemplo trabalhado e uma tarefa de interpretação de evidências reais. **Provisória** |
| `repair` | `ev-builder-behavior-tests`, relato parcial de comportamento reproduzível; `ev-codex-prompting`, revisão/refinamento | Contato sem efeito, rubrica observado/esperado/reprodução/reteste, texto de exercício | Não houve estudo do caso completo do autor. O cenário é inventado e não reproduz um defeito observado. Falta mostrar pedido de correção, resposta, teste antes/depois e regressão; “preview” surge sem ensino do conceito. A rubrica repete o próprio critério como feedback, sem recuperação explicativa. **Provisória** |
| `transfer` | Quickstarts parciais de Claude/Codex sustentam contextos diferentes, sem demonstrar equivalência operacional | Preservar objetivo e adaptar instruções sem segunda conta | Não existe exemplo lado a lado da mesma tarefa e resultado nas duas ferramentas, nem critério para equivalência da adaptação. Transferência escrita pode ser ensaiada, mas não comprova execução ou domínio na ferramenta alternativa. **Provisória** |

## Lacunas da sequência como um todo

1. **Pré-requisitos incompletos:** operar arquivos/navegador é pressuposto; pasta, projeto, plano, arquivo, preview e publicação não têm explicações encadeadas. Acesso, instalação, versão e permissões precisam de uma rota conferida por ferramenta.
2. **Exemplo incompleto:** há pedido modelo, mas não uma resposta modelo analisada, nem retorno ao mesmo projeto com revisão e reteste. A mudança para a página de contato é um cenário simulado separado, não evolução observada do projeto.
3. **Avaliação limitada:** as duas verificações são distintas, mas ambas de reconhecimento com três alternativas. Não demonstram produção de um pedido, diagnóstico, execução ou transferência. Autoavaliação não pode ser promovida a domínio verificado.
4. **Recuperação pouco desenvolvida:** dicas estão presentes, mas não há fluxo completo para ferramenta indisponível, pasta errada, resposta que ignora limites, pedido ambíguo ou ausência de evidência. As rubricas de prática usam a mesma chave em `labelKey` e `feedbackKey`, sem explicar como corrigir cada falha.
5. **Estimativas e eficácia não medidas:** sete telas e 25 minutos foram escolhas editoriais. Não há observação de iniciante concluindo o percurso nem dados para afirmar que a progressão é suficiente.
6. **Fatos e inferências precisam continuar separados:** documentação de produto sustenta comportamentos pontuais; não valida a sequência didática. O exemplo original pode ser mantido após revisão, sem atribuir às fontes uma autoria que elas não têm.

Nenhum desses pontos foi corrigido por invenção de novos exemplos “reais” nesta rodada. Os textos ficam preservados para revisão coordenada após o aprofundamento.

## Pedidos ao Devorador e pendências

**Repriorização posterior na mesma data:** o usuário determinou foco no propósito do curso, sem aguardar consumo de todo o acervo. O quadro abaixo preserva a demanda inicial da auditoria; a seleção vigente e o estado de cada pedido estão em `RESEARCH_PRIORITIES.md` e `maturity.json`. S02 foi reduzido a uma sequência principal, S03 a um quickstart por superfície e S04 passou para correção na trilha de sites. Isso não resolve retroativamente a sustentação da etapa `repair` atual: `L01_REVISION_PLAN.md` propõe substituí-la por revisão do plano, ainda não implementada nem aprovada.

Mensagem enviada diretamente à tarefa Devorador em 28/09/2026; ele confirmou o escopo e publicou `content/research/STUDY_PROTOCOL.md`, lido pelo Educador. Os requisitos abaixo se alinham a esse protocolo, sem certificar antecipadamente as fichas.

| Pedido | Fontes / telas | Pacote necessário | Estado |
| --- | --- | --- | --- |
| `L01-S01` | Prompting oficial Codex; `scope`, `brief`, `request-check`, `repair`, `transfer` | Estudo do conteúdo substantivo integral da página identificada: raciocínio, exemplos completos, pressupostos, contexto/limites, falhas e iteração; cada alegação ligada ao trecho e artefato exato | solicitado; ficha integral não recebida |
| `L01-S02` | Claude agent basics, explore-plan-code-commit, verificação; `brief`, `run`, `request-check`, `evidence-check` | Estudo integral de cada recurso pertinente, distinguindo texto auxiliar de vídeo; sequência, exemplo, critérios, erros/limites, pré-requisitos e diferenças CLI/Desktop. Trechos visuais de execução inspecionados quando usados | solicitado; ficha integral não recebida |
| `L01-S03` | Quickstarts e referência de Desktop Claude/Codex; `run`, `transfer` e variantes globais | Fluxo completo atual de acesso/contexto/envio/revisão, erros e limites; seção/artefato/versão; evidência visual dos passos demonstrados, com ponto observado e resultado. Texto oficial só certifica texto, não observação visual | solicitado; ficha integral não recebida |
| `L01-S04` | Builder behavior-tests; `repair` | Artigo integral estudado, caso completo antes/depois/reteste, pressupostos, contraexemplos e limites; separar relato do autor de fato de produto e inferência pedagógica | solicitado; ficha integral não recebida |

Cada pacote deve conter identidade/URL, idioma, data, artefato e hash, cobertura realmente estudada, sequência completa, exemplos/resultados, pré-requisitos explícitos e implícitos, limitações/erros, evidências breves localizáveis e lacunas. Localizadores só por número de linha em extração mutável precisam do artefato correspondente. Ausência de acesso integral permanece pendência; não contornar barreiras nem certificar trechos como obra completa. Fontes complementares autorizadas podem suprir lacunas, com procedência explícita.

## Critério para aceitar qualquer aula como pronta

O aceite exige todos os pontos a seguir, registrados por aula; não depende de contar fontes, downloads ou minutos de vídeo.

1. **Escopo e fonte íntegros:** fontes relevantes estudadas integralmente, com objeto delimitado pelo recurso real (artigo/aula/página), rastreabilidade e cobertura documentada. Uma seção selecionada não pode ser renomeada como fonte integral para cumprir o requisito.
2. **Avaliação pelo Educador:** receber e estudar as fichas integrais junto dos conteúdos necessários, verificar localizadores e exemplos, classificar afirmações de produto, relatos e elaboração original; registrar aceites e pendências. Nenhuma aprovação automática a partir do status do coletor.
3. **Demonstração visual pertinente:** inspecionar os trechos visuais necessários para ensinar UI/execução; registrar superfície/versão, intervalo ou capturas e o que foi observado. Legendas e uma captura isolada não certificam toda demonstração. A fonte deve permanecer com suas limitações declaradas.
4. **Sequência executável completa:** objetivo observável, pré-requisitos ensinados ou verificados, exemplo trabalhado do início ao resultado, prática do aluno, erros/limitações e recuperação. Separar simulação de execução externa e de execução integrada.
5. **Avaliação alinhada:** ao menos duas verificações em telas distintas, feedback explicativo e evidência compatível com o objetivo. Reconhecimento, produção, autoavaliação e execução verificada têm estados separados; testar também recuperação após erro.
6. **Revisão de aplicação e localização:** conferir equivalência Claude/Codex sem assumir paridade, manter evidências por variante, revisar mudanças nos 11 idiomas e registrar revisão linguística pendente. Testar com iniciante e registrar dificuldades antes de alegar eficácia ou tempo de conclusão.
7. **Decisão explícita e versão:** Educador recomenda com evidências; Diretor registra aceite e escopo. Só então discutir `ready`/liberação. Publicação usa versão nova quando cabível e preserva ou migra progresso; nunca reescreve uma versão publicada.

## Integração e validação desta correção

O Construtor confirmou que implementará uma lista explícita de preview para `lesson.first-request`, restrita a `/course/[locale]`; o adaptador padrão respeita `releasedLessonIds`. O Diretor deve integrar esse suporte antes ou junto da retirada de liberação, preservando a demonstração solicitada pelo usuário.

Deve continuar passando: geração reprodutível, 112 chaves nos 11 idiomas, referências de fonte/competência/rubrica, IDs e respostas corretas, sete telas, quatro exercícios e duas verificações distintas. Deve falhar intencionalmente: gate de release sem aula liberada. O resultado dessa conferência está em `PROTOTYPE_VALIDATION.json`. O relatório `AUDIT.json` anterior permanece histórico e não pode ser usado como aceite pedagógico atual.
