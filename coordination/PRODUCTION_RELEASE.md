# Publicação da beta 0.3.0 — 28/09/2026

Versão ampliada publicada e verificada em https://ganesha-classroom.vercel.app/classroom . Commit de produção: `7c7be20a8bb5563f9a94823a18ee91ab782f4ed7`, enviado previamente ao GitHub. Deployment: `dpl_HMyVPUxGwnyM1J6f2iEdRy5yRBbp`, Ready, URL imutável https://ganesha-classroom-7gnpha2ws.vercel.app . A CLI associou o domínio do projeto ao deployment após build e TypeScript aprovados. Metadados: classroomVersion=0.3.0 e sourceCommit acima.

Conteúdo: 12 aulas, 120 etapas, 94 práticas/reflexões, 24 verificações obrigatórias e 11 idiomas com 1.192 mensagens cada. Pacote original do Educador `fc2efa3`, runtime final `d101d2f`/`d46956c`. Validação estrutural e de literais sem divergências antes da cópia canônica; 27 testes aprovados; currículo e 11 catálogos confirmados no tracing de produção. QA visual/funcional dos 11 idiomas aceito às22:01 UTC, sem P0/P1. Permanece um P2 decorativo: conectores da trilha não espelhados em RTL.

Verificação em produção às22:14–22:15 UTC: navegação das12 aulas/120 etapas, abertura da primeira prática com controles ativos, bloqueio correto de registro vazio e troca para árabe com lang=ar/dir=rtl. O proxy https://ganesha-devops.vercel.app/classroom também abriu a atividade do novo curso. O acesso direto a https://iganesha.online/classroom continua limitado neste ambiente por ERR_CERT_AUTHORITY_INVALID; não houve bypass de TLS nem alteração de DNS/rotas. O projeto ganesha-devops e os serviços da landing foram preservados.

A meta22:00 UTC não foi cumprida: o aceite visual terminou22:01 e a conexão local com GitHub/Vercel ficou indisponível durante o envio. A tentativa de usar o conector GitHub parou no primeiro blob por timeout da revisão automática de permissão, sem branch/ref alterada. Quando a rede voltou, o push original e o deploy CLI foram concluídos. O pacote foi publicado aproximadamente22:13 UTC.

Limites da beta: progresso neste navegador; prática externa autodeclarada; traduções por IA com revisão humana pendente; sem login/pagamento/progresso em conta integrados. Não há declaração de aprendizagem comprovada ou execução dos projetos externos. Versões antigas de progresso permanecem armazenadas separadamente. Ponto anterior observado de produção: `dpl_AvgdR17fpJvGF1dpWBmPd2xbhaBo`.

## Histórico da beta 0.2.0

Commit validado e enviado ao GitHub: `2ac2fe859db98687fc4e3acacfbf0c56526452d9`, branch `codex/diretor-integracao`, repositório `draeden79/ganesha`.

## Estado observado

- Time Vercel: `manuel-guimaraes-pinto-filhos-projects`, conta `draeden79`.
- Serviço: `ganesha-classroom`, produção `https://ganesha-classroom.vercel.app`.
- Deployment existente: `dpl_9hWCwktMbyqtRUWbhLicQJFUQVVc`, Ready, criado por CLI às 20:54 UTC, construção em 51 segundos.
- Projeto do domínio: `ganesha-devops`, ID `prj_DbGGndK0VJ7S8CKPTP2DLk8JWVu4`.
- A Vercel informa configuração válida para `iganesha.online` (308 para www) e `www.iganesha.online` (produção).
- `/classroom` no serviço dedicado e em `ganesha-devops.vercel.app` redireciona para `/classroom/pt-BR` e carrega a interface com quatro aulas/24 etapas, 11 idiomas, atividades e recursos visuais.
- Navegação da primeira explicação para a prática foi exercitada na publicação real. Prática sem resposta mantém avanço desabilitado.
- Acesso direto ao domínio pelo ambiente Codex encontrou `ERR_CERT_AUTHORITY_INVALID`; diagnóstico anterior identificou certificado emitido por Cloudflare Corporate Zero Trust. Isso limita a verificação deste ambiente e não atesta falha no certificado público. Não houve desativação de TLS nem alteração de confiança do sistema.

## Coordenação e procedência

A sessão de Manuel informou no Slack #devops às 20:49 UTC que assumiu deployment e GitHub. Às 21:04 UTC o Diretor encontrou o serviço publicado e enviou pelo bot próprio a confirmação do commit aprovado e os resultados de QA. Às 21:07 UTC Manuel confirmou no #management que `dpl_9hWCwktMbyqtRUWbhLicQJFUQVVc` usou exatamente `2ac2fe859db98687fc4e3acacfbf0c56526452d9` e que o deployment hospedeiro `dpl_B9Lfh9H6aioGkmXuemdpHkcBxAkE` está Ready, encaminhando apenas `/classroom` e seus descendentes. A correspondência do SHA é declaração do operador; a página Vercel/CLI não expõe esse SHA. Evidência: https://ganeshagrupo.slack.com/archives/C0C56JD9G20/p1790629647887779 . O operador também verificou português, árabe, assets, página de curso existente e saúde dos bots.

Lucas autorizou expressamente aproveitar a publicação existente. O Diretor não alterou rotas, domínios ou o deployment de `ganesha-devops`.

Um projeto vazio temporário, `project-a6q10` (`prj_ILXpoW5TIzTsvbp6hGFbr065GMZF`), foi criado pelo Diretor com autorização antes de identificar a publicação existente. Não teve deployment, domínio personalizado ou variáveis de ambiente. Foi removido pelo Diretor; a Vercel confirmou `projectDeleted=project-a6q10`. Nenhum recurso da publicação existente foi removido.

## Qualidade e limites

20 testes, build/TypeScript e cobertura das 83 chaves nos 11 idiomas passaram antes da publicação. Artista validou as 24 etapas, erro/acerto das oito avaliações, restauração, celular e comandos RTL. Evidência: `design/PUBLIC_BETA_QA.md`.

A beta contém quatro aulas, 24 etapas, 12 práticas e oito verificações. Progresso local no navegador, práticas autodeclaradas e exemplos simulados identificados. Sem login/pagamento, execução de IA ou progresso em conta. Revisão humana de tradução e liberação pedagógica plena continuam pendentes.

## Próximo incremento

0.3.0: 12 aulas com 10 etapas distintas, pelo menos quatro práticas e duas avaliações por aula, nos 11 idiomas; meta 22:00 UTC. Educador coordena conteúdo com Diretor e Artista; Construtor prepara suporte compatível com 0.2. Não ativar conteúdo incompleto nem migrar créditos automaticamente. Pacote e prévias da beta atual preservados.
