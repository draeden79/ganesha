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
- Usuário escolheu explicitamente bot/app. Nome do app preparado: “Diretor — Produto”; bot `diretor-produto`, descrito como assistente de IA.
- Manifesto preparado com apenas `incoming-webhook`; destino será restrito a `#management` na instalação. O Chrome possui sessão autorizada; o navegador interno solicitou login.
- Revisão automática bloqueou o clique “Create and Install”, exigindo confirmação no momento da concessão de acesso. Confirmação específica solicitada ao usuário; pendente.
- Nenhuma conta criada, canal acessado ou mensagem publicada até este registro.
- A identidade deve se apresentar como assistente de coordenação de Produto. Não assumir que conectar o Slack cria uma identidade independente, nem renomear a conta existente do usuário para esse fim.

## Critério de publicação

Publicar somente quando houver mudança material: nova versão testável com link realmente acessível ao destinatário; funcionalidade ou aula aceita; alteração de escopo ou prazo sustentada por evidência; decisão/dependência que afete Growth ou Landing page; bloqueio relevante de lançamento/integracão; resolução de um bloqueio comunicado.

Não publicar progresso rotineiro, contagem de commits/testes/downloads, ações internas de agentes ou estado inalterado. Agrupar mudanças relacionadas em um informe curto. Distinguir claramente protótipo, conteúdo em revisão e produto liberado. URLs locais do Mac não são tratadas como links acessíveis ao restante do time.

Formato: marco/estado, impacto para as outras frentes, dependência ou próxima entrega e link útil quando verificado. Sem promessas de prazo não fundamentadas; sem prompts/respostas de alunos, dados pessoais, credenciais ou transcrições brutas.

## Rotina e rastreabilidade

O usuário rejeitou explicitamente periodicidade horária. A automação `diretor-marcos-do-produto-no-slack`, criada pausada, foi excluída. Não há agenda de postagem nem verificação horária: o Diretor avalia um informe quando recebe e verifica uma entrega, decisão ou bloqueio material no trabalho do Produto. Permanecer silencioso nos demais eventos. O usuário já autorizou esses informes dentro deste escopo; não pedir aprovação a cada mensagem após a configuração.

Antes de publicar, conferir o registro local e mensagens recentes do canal para evitar duplicação. Depois, registrar evento, texto, data, identidade, canal, ID/permalink da mensagem e evidências. Em envio com resultado incerto, verificar o canal antes de repetir. Não ler nem escrever outros canais sem necessidade para o pedido.

## Primeiro informe preparado — ainda não enviado

Texto completo, com plano e responsabilidades dos cinco agentes, em `slack/INITIAL_UPDATE.md`. O usuário pediu publicação imediata; o envio aguarda somente a configuração autorizada do bot. Não substituir esse informe por um aviso rotineiro de instalação, não marcar pessoas e não usar @channel/@here.
