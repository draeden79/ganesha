# Pendências e autorrevisão honesta

Versão Astra-PTBR-1.0 — 28/09/2026.

## O que foi e não foi feito

Foram escritos do zero o mapa, a orientação inicial, as 12 aulas completas, os exercícios incorporados às etapas, os gabaritos comentados, os critérios e a entrega visual. O conteúdo usa um projeto fictício cumulativo e um projeto final de transferência. Não foram lidos currículos, pesquisas, transcrições, aulas publicadas ou outros chats. Não houve pesquisa na internet nem consulta a agentes de autoria.

Foram lidas as instruções do ambiente e a habilidade obrigatória OpenAI Docs. A habilidade recomenda pesquisa atual, mas a restrição explícita deste experimento impede consumi-la. Por isso, nenhum detalhe atual de produto foi tratado como confirmado. Não houve trabalho de implementação do bot Chat SDK, nem uso dos seus materiais para conceber o curso.

Esta é uma **autorrevisão por IA**, não teste com pessoas, revisão independente ou validação pedagógica empírica. Não foram executados os projetos descritos para os alunos. Não há capturas de execução nem garantia de que uma única resposta a cada pedido produza um aplicativo correto. O curso ensina a verificar e corrigir precisamente porque a geração pode variar.

## Continuidade: revisão das dependências

| Transição | Pré-requisito necessário | Como foi atendido no texto | Risco que permanece |
|---|---|---|---|
| Entrada → aula 1 | Acesso autorizado a uma conversa | Orientação inicial distingue modalidades e bloqueio de acesso | Ainda não há onboarding de interface validado |
| 1 → 2 | Conteúdo conferido | Notas originais, aviso e recuperação por repetição do pedido | Aluno pode perder a anotação; notas permanecem no texto |
| 2 → 3 | Encontrar, salvar e abrir arquivo | Pasta, extensão, editor simples, navegador e recarga são ensinados | Sistemas variam; demonstrações específicas ainda necessárias |
| 3 → 4 | Alteração reversível | Cópia anterior e comparação de fatos | Duplicação/renomeação podem exigir apoio visual |
| 4 → 5 | Ciclo de conferência | Testes definidos antes de aplicativo com comportamento | Aprendizado de teclado não foi testado com leitores de tela |
| 5 → 6 | Estado e ações simples | Lista em memória antes de dados estruturados | Vocabulário de registro/ID pode exigir mais de um exemplo |
| 6 → 7 | Dados consistentes | Validação e conjunto padrão com quatro tarefas | Importação é uma mudança conceitual relativamente grande |
| 7 → 8 | Cópia recuperável | Restauração realizada pelo aluno antes do laboratório | Chaves de armazenamento geradas precisam ser conferidas |
| 8 → 9 | Relato e correção | Laboratório e regressão antes da regra | Aluno pode confundir erro didático com falha de sua autoria |
| 9 → 10 | Regra correta numa execução | Casos de fronteira e resultado vazio | Repetição e persistência conjunta aumentam a complexidade |
| 10 → 11 | Histórico exportável | Formato versão 2 e cópias anteriores explícitas | Recuperação de versão 1 exige apoio se a atualização falhar |
| 11 → 12 | Entrega compreensível | Pasta nova, links relativos, LEIA-ME e ensaio | Projeto livre pode crescer demais; redução de escopo prevista |

## Clareza e conhecimento prévio

O texto explica termos no ponto em que passam a ser usados: pasta, arquivo, extensão e HTML antes da primeira página; entrada, estado e JavaScript antes da primeira interação; campo, registro e ID antes dos dados; JSON antes de exportar; gatilho, condição e ação antes da automação; repetição antes de histórico.

Permanecem pressupostos básicos: usar teclado ou outro meio de entrada, selecionar/copiar/colar texto, alternar janelas e ter permissão de uso do computador. O curso não é uma alfabetização digital completa. A aplicação com o público deve identificar essas necessidades sem constrangimento e oferecer uma demonstração inicial curta ou apoio individual. Não considerar essas dificuldades evidência de incapacidade de aprender IA.

Os pedidos longos das aulas 7, 10 e 12 reduzem a necessidade de escrever especificações do zero, mas podem gerar carga de leitura. O Artista deve preservar a leitura por partes e manter a explicação anterior próxima. Em uma revisão posterior com pessoas, observar se é melhor dividir a geração da aula 10 em duas tentativas mantendo as mesmas verificações. Não alterar agora o pedido para uma promessa de execução garantida.

## Lacunas operacionais que precisam de verificação posterior

1. **Acesso a Codex e Claude:** variantes disponíveis, autenticação, instalação quando necessária, capacidades por ambiente e permissões. Não foram verificados nomes atuais de controles, elegibilidade, preços ou limites. Não inserir detalhes de memória como fatos.
2. **Percurso com arquivos:** confirmar como selecionar uma pasta isolada e receber os arquivos no ambiente escolhido. Se o ambiente não trabalhar com pasta local, documentar o caminho de código em texto ou transferência de arquivos em vez de fingir equivalência.
3. **Editor de texto simples e extensões:** gravar demonstrações verificadas nos sistemas operacionais contemplados, inclusive UTF-8 e extensão oculta. O texto é funcional, mas não é um guia de cliques por sistema.
4. **HTML por arquivo local:** executar os pedidos em pelo menos um ambiente definido e verificar abertura, download de arquivos, importação e comportamento de armazenamento. Se algum recurso exigir outra abordagem, revisar o percurso inteiro correspondente antes de aplicá-lo, sem acrescentar comandos inesperados no meio da aula.
5. **Persistência e isolamento:** confirmar preservação dos dados nas atualizações, chaves diferentes no laboratório/entrega e limites do navegador. A alternativa de cópia manual está explicitada, mas não satisfaz automaticamente o objetivo de persistência.
6. **Robustez dos aplicativos gerados:** testar validação de toda importação, cancelamento, prevenção de conteúdo interpretado como HTML, histórico consistente, duplicatas, falha de salvamento e restauração. Texto de prompt não é implementação auditada.
7. **Acessibilidade:** as checagens de largura, zoom, rótulos e teclado são introdutórias. Fazer avaliação posterior com tecnologias assistivas e participantes diversos; não usar selo de conformidade sem avaliação pertinente.
8. **Localização:** confirmar a lista dos 11 idiomas do produto, localizar os outros dez a partir desta versão e revisar terminologia e exemplos por idioma. Nenhuma tradução antiga foi promovida a atualizada.
9. **Identidade visual Ganesha:** o Professor não consultou ativos existentes para preservar independência. O Artista deve decidir como aplicar a identidade usando seu próprio contexto autorizado, sem tratar essa ausência como liberdade para inventar uma identidade oficial.
10. **Duração e aprendizagem:** estimativas não medidas com pessoas. Observar tempo, abandono, erros e qualidade de transferência em aplicação futura; ajustar a partir dessas evidências.

## Decisões de escopo e seus custos

O projeto usa arquivos únicos para evitar instalar ferramentas de desenvolvimento e aprender terminal antes de obter um resultado. Isso limita o tipo de aplicativo e introduz diferenças de comportamento de arquivos locais entre navegadores. Não é uma recomendação universal de arquitetura.

Prazos são números relativos manuais. Essa escolha permite compreender comparação e limites sem datas, mas não serve como controle de prazo real por passagem do tempo. O aviso é reiterado e a automação não finge acompanhar o calendário.

O histórico evita repetição por ID+regra localmente nas condições conferidas. Não há agendamento, envio real, servidor ou garantia entre múltiplos dispositivos. O aprendizado é uma base para discutir esses problemas, não uma implementação deles.

Os critérios são humanos e permitem demonstrar com apoio. Não foi criado avaliador automático; nenhum texto da entrega deve sugerir pontuação por IA ou prova validada automaticamente.

## Revisão de integridade editorial

As aulas têm cinco ou seis etapas conforme a necessidade, sem dez etapas obrigatórias e sem duas provas por aula. As atividades aparecem após exemplos preparados e incluem observação e nova tentativa. As verificações de cada etapa se articulam ao objetivo maior; não há pergunta de copiar uma palavra como evidência principal de compreensão.

A comparação entre Codex e Claude é por capacidade: conversa que devolve código versus ambiente autorizado que edita arquivos. Não presume que desktop signifique acesso a pasta nem que ambos ofereçam a mesma interface. Quem só tem acesso a uma família consegue fazer o percurso; a comparação opcional da aula 12 é registrada como tal.

A fronteira de efeitos externos aparece desde a orientação e é retomada nas automações. Salvar um arquivo é execução local real; mostrar uma prévia é simulação; enviar mensagem seria outra ação, ausente do curso. As demonstrações preparadas nunca são apresentadas como saídas desta sessão.

## Próxima avaliação recomendada

Depois da revisão do Diretor e da proposta visual, aplicar pequenos trechos com adultos iniciantes e consentimento para observação, sem dados reais. Começar pelo salto conversa → arquivo → navegador; depois avaliar restauração e regra de automação. Pedir que a pessoa explique o que espera antes de agir e observar onde a interface exige conhecimento não ensinado. Essa recomendação não significa que a avaliação já tenha sido feita ou autorizada nesta entrega.
