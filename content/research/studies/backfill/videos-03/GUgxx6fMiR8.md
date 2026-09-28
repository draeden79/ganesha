# Tim — portfólio, publicação e atualização por conector

Fonte: [How to Build an App With Claude Code - Full Tutorial for Beginners](https://www.youtube.com/watch?v=GUgxx6fMiR8), Tech With Tim, publicada em 2026-05-06. Estudo em 2026-09-28. A fonte serve como caso de construção e publicação de site informativo com uma falha de integração e recuperação. Apesar do título, não demonstra um aplicativo com entrada, validação e persistência de dados do usuário.

## Cobertura

Leitura sequencial das linhas 1–220, 221–450, 451–700 e 701–817 de `transcripts/local/aq.GUgxx6fMiR8.en-CA.5b10d430f086.txt`: 817 linhas lógicas, 510 cues, 46.941 bytes, SHA-256 `5b10d430f086dfc45c4254e1058390cd1f41edf3f8686d764fd2b915316c5974`. A faixa en-CA está classificada como `authored-or-unspecified`; isso não comprova autoria manual ou revisão humana. Deriva do JSON3 de hash `d552c674d7cc6fdecf40edde083718a8df62fad39d4163b77d9df20243902f9c`.

A legenda cobre 00:00–23:55,466; a duração adquirida é 24:04, o player mostra 24:03. Há 8,534 segundos entre o fim da faixa e a duração adquirida. A cobertura da fala e a precisão dos nomes/comandos não foram verificadas integralmente. Inspeção visual amostral e seus tempos estão no manifesto; não assisti à fonte inteira nem executei o projeto ou a prática. `full_transcript_read=true`, demais flags integrais `false`.

## Sequência integral do conteúdo textual

| Faixa | Ação, justificativa e resultado |
|---|---|
| 00:00–01:44 | Promete construir e publicar uma aplicação em domínio próprio. Apresenta assinatura, download e instalação de Claude Code, distingue aplicativo desktop de terminal e diz preferir terminal para publicar. Mostra entrada pelo comando e menciona autenticação. Não acompanha instalações limpas nos três sistemas citados. |
| 01:44–02:30 | Indica editor compatível com extensões de VS Code, usando Cursor. Anuncia Hostinger como parceiro de longa duração e destino da publicação. |
| 02:30–03:56 | Abre uma pasta nova para o site, explica o explorador de arquivos e fecha a área do agente próprio do Cursor. A pasta delimita o projeto. |
| 03:56–05:57 | Instala extensões Claude Code e Hostinger Connector; abre uma sessão local de Claude Code na interface gráfica da extensão. Explica a opção de preferir terminal, mas recomenda a visualização padrão para iniciantes. Portanto o fluxo efetivamente seguido combina extensão gráfica, editor e ferramentas; não é exclusivamente terminal. |
| 06:01–06:52 | Apresenta modos de edição e planejamento, esforço e modelos. Escolhe edição automática, esforço médio e Opus 4.7. Comentários sobre economia de Sonnet/Haiku e planos são alegações da data, sem verificação atual. |
| 06:52–08:44 | Reduz o objetivo a uma landing page/portfólio: trabalhos, experiência, habilidades e projetos. Recomenda definir propósito, aparência, logotipo e cores. Dita um pedido de perguntas antes de construir e de salvar decisões num arquivo Markdown. |
| 08:45–09:27 | Promove Wispr Flow, declarando parceria. Envia o pedido e aprova comandos. A sugestão de aprovar mesmo quando o comando não faz sentido para o iniciante não é adotada como regra do curso. |
| 09:27–11:01 | Escolhe marca pessoal, página única longa, aparência escura/moderna e Next.js/Tailwind. Recomenda essa stack amplamente, mas distingue sites informativos de aplicações com contas, dados e backend. O próprio exemplo não precisa armazenar dados. |
| 11:01–12:43 | Em vez de fornecer cada dado biográfico, pede ao agente que pesquise o autor. Revê `spec.md`, explica continuidade por arquivo e autoriza um MVP pequeno, depois sua execução local. Não ocorre verificação externa de cada fato pesquisado. |
| 12:43–13:33 | Aprova comandos; orienta pedir ajuda ao agente para dependências ausentes, sem mostrar um erro concreto de instalação. Após um corte, relata cinco ou seis minutos de construção e abre o resultado em localhost:3001, no editor e no Chrome. |
| 13:33–14:29 | Percorre habilidades, experiências, projetos, vídeos e contato. Declara não reconhecer a experiência em SAP, enquanto confirma Microsoft. Apesar dessa dúvida, passa à publicação sem correção documentada do dado. O quadro de 13:45 mostra a entrada SAP no portfólio. |
| 14:29–15:47 | Pede repositório Git local, commit de todo o trabalho e novos checkpoints a cada mudança. Explica possível reversão. Menciona GitHub, mas explicitamente não o conecta. Não executa reversão para demonstrar recuperação. |
| 15:47–17:30 | Bloco comercial e operacional de Hostinger: plano pago, duração, cupom, domínio, cadastro e preparação de hospedagem. Escolhe upload de arquivos, evitando exigir GitHub. Preços, quantidade de sites e benefício do domínio são históricos. |
| 17:30–18:55 | O assistente de hospedagem exige primeiro upload. Compacta a pasta do projeto, envia ZIP e inicia o deploy Next.js. Diz não precisar alterar opções apresentadas. Um corte antecede o sucesso; não há análise do conteúdo do ZIP, build ou logs. |
| 18:55–19:42 | Abre a página no domínio e percorre o painel de sites, arquivos, deployments e domínio. Em 19:00 a barra mostra `timruscica.com` com o portfólio renderizado. Não se testa acesso sem sessão nem de outra pessoa. |
| 19:42–20:42 | Gera token de API, escolhendo não expirar, e o configura no conector. Avisa para não compartilhar. Pergunta ao Claude Code quais sites e domínios estão disponíveis. Nenhum token foi extraído ou reutilizado neste estudo. |
| 20:42–21:58 | O Claude Code não encontra o servidor MCP. Nas configurações do Cursor, o servidor Hostinger aparece. Testa o agente do Cursor e precisa mudar para modo agente para chamar ferramentas; então recebe a listagem. A origem precisa da incompatibilidade é hipótese do autor, não diagnóstico comprovado. |
| 21:58–23:14 | Volta ao painel do provedor para obter a configuração de Claude Code. Pede adição ao ambiente, substitui o token, diz que o regenerará depois e abre nova sessão. A consulta MCP indica conexão e ferramentas disponíveis. Revogação/rotação efetiva não é comprovada. |
| 23:14–23:41 | Pede mudar a marca para Tim Tech e publicar. Após corte, relata redeploy e abre o resultado com o novo nome. Esse é um teste concreto da alteração visível, não uma bateria de regressão. |
| 23:41–fim | Qualifica o procedimento como válido naquele momento, sujeito a mudanças de software, pede like/inscrição e encerra. O fim sem cues permanece não certificado. |

## Pré-requisitos e fronteiras

O fluxo depende de acesso ao Claude Code, instalação/autenticação, editor com extensões, ambiente capaz de executar o projeto Next.js, navegador, conta e plano de hospedagem compatível com o deploy apresentado, domínio e credencial de API para o conector. Git é introduzido para salvar versões; conta GitHub não é requisito efetivamente usado. Os passos de Node/runtime e instalações ausentes ficam delegados a pedidos ao agente, sem um caminho de instalação reproduzido integralmente.

A promessa de quase nenhuma configuração convive com criação de conta, contratação, domínio, ZIP inicial, token, extensão, configuração MCP por cliente e nova sessão. Esses são pré-requisitos reais, não detalhes dispensáveis para um iniciante. O fluxo também pressupõe saber distinguir pasta de projeto, URL local, domínio público e a sessão de agente que possui a ferramenta.

## Erros, recuperação e reteste

Quadros materiais inspecionados: 13:45 mostra a experiência SAP; 19:00 mostra `timruscica.com`; a busca para 20:50 mostra a resposta de ausência de MCP, embora o indicador de tempo estivesse momentaneamente em 00:00 (tempo inferido da busca e da legenda correspondente, sem precisão independente); 23:05 mostra `hostinger-mcp` conectado; 23:35 mostra o mesmo domínio e o título principal com Tim Tech. Nesse último quadro, a marca pequena no cabeçalho ainda diz Tim Ruscica: a mudança visível não prova substituição completa do nome em todo o site. O quadro de 23:05 também contém outros conectores com falha/necessidade de autenticação; o sucesso observado é específico de Hostinger.

1. **Conteúdo biográfico duvidoso (13:45–13:52):** entrada SAP vista e questionada. Não se observa correção, revisão factual completa ou reteste antes do deploy. A aparência satisfatória não valida a informação.
2. **Ferramenta ausente na sessão (20:42–23:14):** servidor instalado no Cursor não está automaticamente disponível ao Claude Code. O autor verifica outra superfície, ativa modo agente, configura o cliente pretendido e abre nova sessão. Listar ferramentas/sites comprova acesso específico; não comprova que todos os comandos de publicação são autorizados ou funcionam.
3. **Atualização publicada (23:14–23:41):** troca de marca seguida de novo resultado é recuperação/validação mais concreta que apenas ouvir “deploy concluído”. Falta conferir visitante sem sessão, cache, navegação, dispositivos e eventual regressão. Git foi configurado, mas rollback não foi ensaiado.

As passagens com aprovação sem compreensão e token sem expiração não devem virar instruções automáticas. Na adaptação, o aluno precisa identificar o efeito solicitado e o projeto/conta atingidos; a credencial deve ser configurada pelo fluxo atual autorizado sem ser publicada ou incluída no material de aula. Isso responde a ações efetivamente mostradas, não a risco hipotético.

## Suficiência e atualização histórica

É um bom estudo de caso de pasta → especificação → página local → URL externa → alteração → republicação, com uma falha de integração real. Complementa a publicação de Riley porque inclui uma mudança visível posterior. Não duplica um app de lista/CRUD: não há formulário com validação, conta de usuário, banco, armazenamento durável ou ciclo de dados. O título não deve ampliar o alcance da evidência.

Não foram verificadas interfaces, comandos, modelos, planos ou suporte atual de Hostinger/Cursor/Claude. A fonte já demonstra falta de paridade entre clientes. Não transportar sua extensão, MCP, permissões ou menus para Codex Desktop. A regra editorial é verificar o acesso na sessão concreta escolhida para a aula e usar documentação atual antes de convertê-la em receita operacional.

## Prática original proposta — portfólio de serviço local

Não executada: construir uma página para um serviço fictício, a partir de cinco fatos fornecidos e aprovados pelo aluno: nome, descrição, três serviços, contato e região. Guardar decisões em um arquivo curto. Usar uma stack proporcional à página e uma rota de publicação previamente validada; o vídeo não torna Next.js, assinatura específica ou conector obrigatório.

1. **Conteúdo e funcionamento local:** comparar cada afirmação com o material fornecido; remover informação inventada. Testar todos os links e a ação de contato. Reduzir a janela e verificar que o texto essencial permanece legível. Alterações exigem repetir os checks afetados.
2. **Publicação e visitante:** abrir a URL externa fora da sessão de edição e confirmar título, serviços e contato. Registrar URL e resultado, não apenas o status do painel. Se o agente não tem a ferramenta de publicação, verificar qual cliente e sessão a possuem antes de mudar configurações.
3. **Atualização e recuperação:** salvar um checkpoint, mudar uma frase identificável, publicar novamente e conferir a mesma URL como visitante. Restaurar a frase a partir da versão salva e verificar o retorno. Esse ensaio de reversão é complemento curricular, não execução atribuída ao vídeo.

O manifesto registra as evidências visuais efetivamente inspecionadas e as pendências. Reprodução integral do audiovisual, validação atual dos clientes e execução real da prática permanecem abertas.
