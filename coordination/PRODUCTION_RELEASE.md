# Publicação da beta 0.2.0 — 28/09/2026

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

A sessão de Manuel informou no Slack #devops às 20:49 UTC que assumiu deployment e GitHub. Às 21:04 UTC o Diretor encontrou o serviço publicado e enviou pelo bot próprio a confirmação do commit aprovado e os resultados de QA, solicitando a correspondência exata do SHA e coordenação das rotas. A página da Vercel indica origem CLI, sem SHA visível; a correspondência exata do deployment ao commit permanece pendente de confirmação do operador.

Lucas autorizou expressamente aproveitar a publicação existente. O Diretor não alterou rotas, domínios ou o deployment de `ganesha-devops`.

Um projeto vazio temporário, `project-a6q10` (`prj_ILXpoW5TIzTsvbp6hGFbr065GMZF`), foi criado pelo Diretor com autorização antes de identificar a publicação existente. Não teve deployment, domínio personalizado ou variáveis de ambiente. Foi removido pelo Diretor; a Vercel confirmou `projectDeleted=project-a6q10`. Nenhum recurso da publicação existente foi removido.

## Qualidade e limites

20 testes, build/TypeScript e cobertura das 83 chaves nos 11 idiomas passaram antes da publicação. Artista validou as 24 etapas, erro/acerto das oito avaliações, restauração, celular e comandos RTL. Evidência: `design/PUBLIC_BETA_QA.md`.

A beta contém quatro aulas, 24 etapas, 12 práticas e oito verificações. Progresso local no navegador, práticas autodeclaradas e exemplos simulados identificados. Sem login/pagamento, execução de IA ou progresso em conta. Revisão humana de tradução e liberação pedagógica plena continuam pendentes.

## Próximo incremento

0.3.0: 12 aulas com 10 etapas distintas, pelo menos quatro práticas e duas avaliações por aula, nos 11 idiomas; meta 22:00 UTC. Educador coordena conteúdo com Diretor e Artista; Construtor prepara suporte compatível com 0.2. Não ativar conteúdo incompleto nem migrar créditos automaticamente. Pacote e prévias da beta atual preservados.
