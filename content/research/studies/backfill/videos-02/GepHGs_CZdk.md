# Lista de filmes — ampliar um app existente e testar a alteração

Fonte: [Claude Code Beginner's Tutorial: Build a Movie App in 15 Minutes (2025)](https://www.youtube.com/watch?v=GepHGs_CZdk), Peter Yang, publicada em 2025-09-03 conforme aquisição existente. Estudo em 2026-09-28. Estado canônico anterior `not_started`; nenhuma ficha anterior localizada.

**Parecer:** exemplo concreto de extensão de app existente: clonar, compreender, resolver a ausência de dados e adicionar/remover itens numa watchlist. O comportamento mostrado é mais forte que uma simples maquete. A fonte ainda não fecha instalação para todos os ambientes, validação de entradas/falhas da nova função, persistência após retorno ou publicação. Não constrói o catálogo inteiro do zero: reutiliza um repositório com descoberta de filmes já implementada.

## Cobertura e origem

Faixa automática inglesa lida inteira: **408 linhas/cues**, em sequência 1–215 e 216–408, de `transcripts/local/aq.GepHGs_CZdk.en.9196058f9883.txt`. Artefato de 28.409 bytes, SHA-256 `9196058f9883e4f76021fe95e3cced3fc82186b4b691f39b58e25f9ed9aaff6c`. JSON3 de origem registrado no manifesto; não constitui segunda leitura independente. A legenda corrompe repetidamente Claude Code, CLAUDE.md, `.env`, Git e watchlist: nomes/atalhos operacionais não podem ser extraídos dela sem conferência.

Primeiro cue 00:01,120, último fim 16:43,680; duração adquirida 16:42. O excesso final de 1,680 s e a fala inicial permanecem sem verificação. Quadros amostrais estão discriminados no manifesto e abaixo. Texto integral lido; vídeo/fala/fonte audiovisual integral não certificados. Não instalamos, clonamos, usamos credenciais ou executamos o app nesta rodada.

## Sequência completa

| Tempo | Conteúdo e ação |
| --- | --- |
| 00:01–01:08 | Anuncia roteiro: instalar Claude Code, clonar catálogo, pedir explicação, rodar localmente, especificar watchlist, criar orientação de projeto e implementar/testar. Chama o agente de melhor do mercado, uma opinião promocional. |
| 01:09–02:24 | Mostra comando de instalação vindo da documentação, inicia `claude` no Terminal e depois no terminal integrado do Cursor. Prefere IDE para navegar arquivos. Confirma confiança na pasta; não ensina diferenças entre sistemas, conta/login, cobrança ou todas as dependências. |
| 02:25–03:08 | Mostra catálogo existente com filmes e trailers, clona repositório GitHub para a pasta. Repositório/licença/estado atual não foram auditados nesta rodada. |
| 03:09–04:48 | Pede explicação adaptada a PM experiente sem formação de engenharia. Agente identifica descoberta de filmes/séries, pesquisa, detalhes, TMDB, chave de API, TypeScript e Tailwind. Autor sugere perguntas adicionais em linguagem simples; não transforma explicação gerada em auditoria independente. |
| 04:49–05:47 | Pede instalação de dependências e servidor local. Autor costuma permitir ações sem novos avisos, mas recomenda ler as permissões. Agente cria `.env` com valores de exemplo para TMDB. |
| 05:48–06:19 | Abre localhost:5173: catálogo não carrega e aparece erro de busca. O agente havia indicado funcionalidade limitada até configurar chave válida. Página/servidor abrirem não basta para os dados funcionarem. |
| 06:20–07:21 | Abre conta TMDB já preparada, indica Settings/API, copia chave e pede configuração. Depois retorna ao app e vê filmes carregados. Não explica completamente cadastro, aprovação, escopo ou armazenamento apropriado da credencial. A chave da gravação não foi copiada/usada neste estudo. |
| 07:22–08:56 | Passa de clonar para modificar. Apresenta modo de planejamento por atalho e pede spec com requisitos/design/stack, simplicidade e teste por etapas. Argumenta a favor de elaborar e revisar requisitos com IA. |
| 09:01–09:37 | Após corte, percebe que o agente começou a implementar sem ele pedir. Usa Escape para interromper e insiste em revisar antes. Não mostra auditoria/reversão das mudanças já feitas; “planejamento” narrado não foi garantia suficiente naquele caso. |
| 09:38–10:44 | Revisa adicionar, remover, visualizar e persistir em localStorage; percorre fases de infraestrutura, UI e melhorias. Remove toast notifications e operações em lote para reduzir escopo. |
| 10:45–12:34 | Usa `/init` para gerar CLAUDE.md; apresenta descrição de ambiente, padrões e estrutura. Pede incluir testes, commits descritivos e respeito a padrões, citando entrevista anterior com Lee Robinson. Recomendações são contexto para o agente, não prova de testes executados. |
| 12:35–13:21 | Recapitula trabalho preparatório e pede lista de tarefas antes da implementação. |
| 13:22–14:08 | Lista menciona Redux, localStorage e botão. Autor admite não entender Redux, mas autoriza continuar. Espera é cortada; expectativa de testes vem das instruções adicionadas. Não há relatório completo de testes aprovado nesta leitura. |
| 14:09–14:32 | Demonstra consulta de andamento com `/todos`; algumas tarefas concluídas e outras em execução. Checklist não substitui teste de comportamento. |
| 14:33–15:12 | Reabre/reinicia a página antes de adicionar itens; testa corações em filmes e visita watchlist com quatro itens. Esse carregamento anterior não prova persistência dos itens adicionados depois. |
| 15:13–15:32 | Remove um filme, acrescenta a série Alien: Earth e usa detalhes de Mission: Impossible para adicionar. Testa a função por diferentes pontos de entrada, sem erro relatado nesse trecho. |
| 15:33–16:19 | Diz que o recurso saiu em uma rodada de implementação, depois esclarece que houve spec, revisão, orientação e lista de tarefas antes. Defende planejamento; isso é experiência do autor, não garantia causal de ausência de bugs. |
| 16:20–16:43 da legenda | Recapitula objetivo, expectativa de quinze minutos e anuncia conteúdo/entrevista futura; pede like/inscrição. |

## Exemplo completo, requisitos e lacunas

O catálogo original já tem filmes, séries, busca e páginas de detalhe. A entrada da nova função é a seleção de um item existente, não um formulário livre. O estado é uma coleção de itens escolhidos. A especificação prevê adicionar/remover, tela da lista e armazenamento local; o resultado narrado testa filmes, série e botão no detalhe. É uma mudança delimitada, apropriada para discutir contrato antes/depois em software real.

| Situação | Recuperação/checagem observada ou narrada | Limite |
| --- | --- | --- |
| Sem filmes após iniciar servidor | Configura chave TMDB; retorna e vê catálogo carregado em 07:06–07:15. | Não demonstra recuperação de chave revogada, quota, rede ou erro posterior. |
| Agente começa código antes da revisão | Interrompe em 09:20–09:28 e revisa/reduz spec. | Não prova que nenhuma mudança já ocorreu ou que Escape as desfez. |
| Spec adiciona complexidade dispensável | Remove notificações e ações em lote. | Redução de escopo editorial, não correção de bug em execução. |
| Watchlist com itens | Adiciona quatro filmes, remove um e acrescenta série/detalhe em 14:50–15:32. | Persistência após fechar/reabrir, duplicatas e estados inválidos não são testados explicitamente. |
| Testes pedidos em CLAUDE.md | Agente recebe orientação e checklist de desenvolvimento. | Não se publica um resultado completo verificável da suíte; pedido de teste não equivale a teste aprovado. |

localStorage na spec estabelece um limite pretendido: dados nesse navegador/origem. O vídeo não implementa login, conta, sincronização entre dispositivos ou banco remoto para a lista. Também não executa teste de durabilidade após os itens serem adicionados. Não chamar a lista de persistente apenas porque o plano ou o resumo do agente usa esse termo.

## Pré-requisitos e diferenças históricas

São necessários ambiente Claude Code funcional, terminal/IDE, Git e ferramentas de build compatíveis com o repositório, acesso a rede, navegador e conta/chave TMDB válida. O tutorial parte de conta já preparada e omite vários detalhes de instalação/autenticação. Confiar numa pasta, aprovar comandos e colocar credencial em configuração são decisões concretas, não passos automáticos a copiar sem entendimento.

A superfície é **Claude Code no terminal, inclusive dentro do Cursor**, em setembro de 2025. Não é Claude Desktop, agente nativo Cursor nem Codex Desktop. `/init`, `/todos`, atalhos e comportamento de planejamento refletem aquela versão. A documentação/instalação atual não foi pesquisada; não reproduzir comando de instalação de vídeo como orientação atual. O princípio transferível é compreender o projeto, limitar a mudança e testar o resultado; comandos, arquivo de instruções e permissões dependem da ferramenta usada.

Manter no histórico completo e posicionar antes do caso Tastemaker mais amplo: demonstra uma adição menor e comportamento observável. Para o primeiro app de pessoas comuns, ainda é útil fornecer projeto/ambiente preparado ou escolher exemplo sem API, para separar aprender estado de resolver credenciais. Não excluir a fonte pelas lacunas; registrar exatamente a contribuição e o complemento necessário.

## Prática original e checagens

Proposta não executada: partir de um catálogo local de seis livros fictícios e adicionar “Quero ler”. Definir antes: cada livro entra uma vez, pode ser removido, existe lista vazia, e a seleção permanece no mesmo navegador após retorno. Usar IDs estáveis e dados de exemplo para que a primeira prática não dependa de chave externa. Fazer uma mudança por etapa e revisar um plano curto antes de autorizar a alteração.

1. **Estado/consistência:** adicionar dois livros, visitar a lista e conferir identidade/contagem; repetir o clique para verificar a regra de duplicatas. Remover até chegar ao estado vazio e conferir também o indicador no catálogo.
2. **Persistência:** adicionar item inédito, recarregar, fechar/reabrir e conferir recuperação. Alterar a seleção e repetir. Explicar o limite de navegador/origem e não prometer sincronização remota.
3. **Regressão e falha:** repetir navegação/detalhe do catálogo; provocar uma indisponibilidade controlada do armazenamento se o ambiente permitir, observando mensagem sem confirmação falsa de salvamento. Registrar correção e reteste, sem contar checklist como execução.

Transferência: livros → compras, tarefas ou favoritos. Publicação seria outra etapa com URL externa, acesso de visitante e repetição da checagem de armazenamento nessa origem. Nada disso foi implantado neste estudo.

## Visuais e pendências

Cinco quadros foram inspecionados no player, que exibe duração de 16:42:

| Player | Estado visto | Limite |
| --- | --- | --- |
| 06:05 | Catálogo local vazio com mensagem de falha ao buscar filmes. | Não mostra resposta HTTP ou diagnóstico independente da API. |
| 07:10 | Catálogo local passa a mostrar conteúdo de filmes após a configuração narrada. | Não testa repetição, indisponibilidade futura ou todas as seções. |
| 09:20 | Spec prevê localStorage; terminal anuncia iniciar Redux e aparece interrompido pelo usuário. Rodapé mostra `accept`. | Não comprova que Plan Mode continuava ativo nem que código da função já havia sido escrito. O autor descreve o avanço como indevido; não diagnosticar falha do modo sem evidência adicional. |
| 15:10 | Watchlist tem quatro itens: Spirited Away, The Shawshank Redemption, War of the Worlds e Superman. | Texto “saved” e quatro cartões não provam durabilidade após fechar/reabrir. |
| 15:30 | Detalhe de Mission: Impossible — The Final Reckoning com coração preenchido e contador da watchlist em cinco. | Estado consistente com adição narrada; sequência inteira de cliques e recuperação após retorno não acompanhadas. |

Somente quadros discriminados no manifesto foram inspecionados; cada captura corresponde a estado, não ao intervalo inteiro. Permanecem pendentes audiovisual contínuo, primeiros/últimos segundos, código/repositório, resultado dos testes e durabilidade real da lista. A fonte completa não está certificada apenas porque toda a faixa de legenda foi lida.
