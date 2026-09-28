# Comunicação de Produto no Slack

Pedido explícito do usuário em 2026-09-28: criar uma identidade do Diretor no workspace Ganesha, entrar no canal `#management` e publicar somente atualizações importantes para os times de Growth e Landing page.

## Responsabilidades

- Growth: aquisição de tráfego para a landing page.
- Landing page: venda, cadastro/login, pagamento e acesso comercial.
- Produto: aulas, experiência de aprendizagem, progresso, qualidade do conteúdo e evolução do aplicativo.

## Estado da configuração

- Integração Slack instalada e conectada; identidade autenticada atual: Lucas. Não usá-la silenciosamente no lugar do bot solicitado.
- Workspace confirmado: Ganesha, `T0C4LM9QGJK`, `ganeshagrupo.slack.com`.
- Canal público confirmado: `#management`, `C0C56JD9G20`, https://ganeshagrupo.slack.com/archives/C0C56JD9G20 .
- Usuário confirmou explicitamente criar e instalar “Diretor — Produto” em 2026-09-28. App instalado: `A0C555FGZCZ`; identidade de publicação: `B0C555U2MC1`, apresentada como assistente de IA.
- Único escopo concedido: `incoming-webhook`, vinculado a `#management`. Instalação confirmada na interface do Slack e no canal (`1790625784.693649`).
- Primeiro informe publicado e conferido no canal em 2026-09-28 às 13:05:19 America/Los_Angeles: https://ganeshagrupo.slack.com/archives/C0C56JD9G20/p1790625919791749 . O ID do bot que publicou corresponde ao da instalação.
- Credencial somente no arquivo local ignorado `.env.slack-bot`, permissão 0600. Não copiar seu valor para mensagens, documentação, commits ou logs.
- A integração publica informes; não possui escopos de leitura nem um serviço autônomo que escute menções. Leituras necessárias de confirmação usam o conector Slack já conectado.
- A identidade deve se apresentar como assistente de coordenação de Produto. Não assumir que conectar o Slack cria uma identidade independente, nem renomear a conta existente do usuário para esse fim.

## Critério de publicação

Publicar somente quando houver mudança material: nova versão testável com link realmente acessível ao destinatário; funcionalidade ou aula aceita; alteração de escopo ou prazo sustentada por evidência; decisão/dependência que afete Growth ou Landing page; bloqueio relevante de lançamento/integracão; resolução de um bloqueio comunicado.

Não publicar progresso rotineiro, contagem de commits/testes/downloads, ações internas de agentes ou estado inalterado. Agrupar mudanças relacionadas em um informe curto. Distinguir claramente protótipo, conteúdo em revisão e produto liberado. URLs locais do Mac não são tratadas como links acessíveis ao restante do time.

Formato: marco/estado, impacto para as outras frentes, dependência ou próxima entrega e link útil quando verificado. Sem promessas de prazo não fundamentadas; sem prompts/respostas de alunos, dados pessoais, credenciais ou transcrições brutas.

## Rotina e rastreabilidade

O usuário rejeitou explicitamente periodicidade horária. A automação `diretor-marcos-do-produto-no-slack`, criada pausada, foi excluída. Não há agenda de postagem nem verificação horária: o Diretor avalia um informe quando recebe e verifica uma entrega, decisão ou bloqueio material no trabalho do Produto. Permanecer silencioso nos demais eventos. O usuário já autorizou esses informes dentro deste escopo; não pedir aprovação a cada mensagem após a configuração.

Antes de publicar, conferir o registro local e mensagens recentes do canal para evitar duplicação. Depois, registrar evento, texto, data, identidade, canal, ID/permalink da mensagem e evidências. Em envio com resultado incerto, verificar o canal antes de repetir. Não ler nem escrever outros canais sem necessidade para o pedido.

## Publicação e primeiro informe enviado

Texto completo, com plano e responsabilidades dos cinco agentes, em `slack/INITIAL_UPDATE.md`. Publicação confirmada no canal, timestamp `1790625919.791749`; histórico e hash em `slack/publications.jsonl`. A primeira tentativa não chegou ao Slack por restrição de rede do ambiente; a ausência foi conferida antes de uma única nova tentativa com rede autorizada.

Para um novo marco já revisado, usar `python3 coordination/slack/publish.py <evento-unico> <arquivo-de-texto>`. O publicador lê a credencial local, envia como o app próprio e bloqueia repetição do evento/texto. Não cria agendamento. Usar execução com rede autorizada quando o sandbox bloquear o acesso ao Slack.

O recebimento HTTP não substitui a leitura posterior de `#management`: conferir texto e identidade, registrar timestamp/permalink e marcar o registro como `verified`. Se o resultado for incerto, não repetir antes dessa conferência. Somente uma tentativa comprovadamente ausente pode receber `verified_not_delivered`; preservar seu histórico. Não usar a identidade Lucas para contornar problema no bot.
