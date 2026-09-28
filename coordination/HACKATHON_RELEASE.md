# Sprint de publicação — 2026-09-28

Usuário autorizou colocar a primeira versão pública em `https://iganesha.online/classroom` em 30 minutos. Início 20:18 UTC; meta 20:48 UTC (13:48 America/Los_Angeles). Restam duas horas de hackathon no início deste sprint.

## Escopo decidido pelo Educador

Quatro aulas, seis etapas por aula, oito verificações distintas: fundamentos de IA e pedidos verificáveis; site; aplicativo com estado e armazenamento local; automação de CSV para relatório, com execução manual e agendamento posterior opcional. Conteúdo efetivo e prática em todos os percursos, sem telas apenas de roadmap. Versão 0.2.0 e novos IDs isolam as aprovações anteriores.

Os 11 idiomas permanecem. Beta pública deve identificar revisão humana de tradução pendente e prática externa autodeclarada. Não inventar execução de demonstrações, integração de IA, persistência remota, login, pagamento ou aceite de release canônico. O Educador mantém decisão pedagógica sobre disponibilidade da beta.

## Entregas paralelas

- Educador: conteúdo real e revisão da beta até 20:31 UTC; conversa direta com Construtor.
- Construtor: navegação entre aulas/etapas, progresso local, avaliações, rota `/classroom`, assets isolados do Next da landing; commit e verificações até aproximadamente 20:35.
- Artista: preservar design limpo aprovado, garantir seletor de aula no mobile e QA antes de 20:42.
- Devorador: suporte focal com fontes estudadas, lacunas operacionais e receitas concretas; sem novo inventário amplo.
- Diretor: integração, auditoria do conteúdo, publicação e verificação da URL real. Nenhum deploy concorrente do Construtor.
- Tarefa “Configurar domínio na Vercel”: confirmar projeto/time/acesso, DNS e HTTPS; preservar site/landing/backend atuais.

## Dependência de produção

O domínio foi transferido para nameservers Vercel; a tarefa de infraestrutura ainda não certificou HTTPS. O repositório original contém outro Next (`ganesha-devops`) com serviços Slack. A estratégia em avaliação é projeto separado de classroom com proxy apenas de `/classroom` e seus recursos, preservando o restante do domínio. Nenhum segredo do bot Diretor pode integrar o pacote de deploy.

## Verificação mínima de entrega

Build e testes relevantes; quatro aulas com conteúdo e verificações; cobertura dos 11 idiomas; jornada desktop/mobile; avaliação incorreta impede conclusão e correta permite; reload restaura progresso; URL HTTPS e arquivos JS/CSS/imagens do domínio real funcionam. Registrar falhas honestamente e resolver as impeditivas antes de declarar entrega.
