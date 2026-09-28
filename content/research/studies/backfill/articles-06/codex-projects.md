# Projects and chats — quatro variantes oficiais estudadas

[Documentação oficial OpenAI](https://learn.chatgpt.com/docs/projects), fonte `openai-learn-codex`, observada em 28/09/2026. Publicação e atualização não informadas no corpo. Estudo com a skill OpenAI Docs; nenhuma configuração ou projeto do usuário foi alterado.

Leitura completa dos quatro corpos renderizados: `backfill-a06-projects-app.txt` (1–89), `-web.txt` (1–57), `-cli.txt` (1–28) e `-ide.txt` (1–27), todos em `studies/local/`. São 201 linhas, com hashes e bytes no manifesto. A ilustração material de projetos foi conferida. `text_read_complete=true`, `full_source_analyzed=true` no escopo da página e suas quatro variantes; referências externas não fazem parte dessa certificação.

## Sequência e diferenças documentadas

| Variante | Cobertura da leitura |
| --- | --- |
| Desktop | Escolha de projeto, tarefas distintas, organização, pastas locais, tarefa avulsa, Quick chat, contexto adicional e próximos passos. |
| Web | Projeto com arquivos/fontes/instruções, tarefas, organização, trabalho avulso e contexto conectado. Não fornece acesso direto a uma pasta local. |
| CLI | Diretório de trabalho, nova conversa, retomada, instruções duráveis e fontes adicionais. Sem a visão Projects do app. |
| IDE | Pasta/workspace, seleção da raiz, tarefas recentes, arquivos/seleção do turno e orientação durável. Sem a visão Projects do app. |

No Desktop, a pasta primária orienta início de tarefas, Git e descoberta automática de instruções; secundárias continuam disponíveis para arquivos. Fixar muda organização, não acesso. O texto diferencia o projeto do sandbox. Não descreve Codex cloud como quinta variante nem demonstra uma migração entre todos esses contextos.

## Evidência visual

`studies/local/backfill-a06-projects-figure.png` mostra a ilustração oficial: tarefas com estados/idades, uma fixada e pastas sob Projects. É material demonstrativo da documentação; não é captura dos projetos do usuário. Ícones decorativos não exigem estudo separado. Não foram encontrados vídeos na página observada.

## Mecanismo e análise original

O problema pedagógico principal é distinguir onde uma tarefa aparece de qual informação ela pode usar. Uma pessoa pode organizar um projeto de forma impecável e ainda fornecer a pasta errada para uma mudança. O plano precisa identificar o artefato de trabalho, sua localização e o resultado desejado. Um nome na barra lateral é apenas parte desse contexto.

Também convém separar continuidade da conversa de continuidade dos arquivos. Ao retomar uma tarefa, perguntar o que deve ser relido e verificar o estado atual evita supor que a conversa antiga descreve fielmente o projeto de agora. Essa é uma proposta de verificação, não um incidente relatado pela documentação.

Em trabalho com mais de uma pasta, uma ficha simples com “conteúdo do site”, “documentação” e “destino da alteração” pode ajudar o iniciante a localizar a ação. A existência de vários diretórios disponíveis não determina qual deve receber a entrega. Se o pedido for escrever um plano, declarar seu destino evita iniciar implementação por engano.

As quatro variantes não são quatro nomes para o mesmo acesso. Para ensinar a transferência de uma tarefa, manter o objetivo e reconstruir o contexto na superfície escolhida. A fonte permite mapear diferenças, mas não apresenta uma aplicação construída em todas elas nem comprova paridade de ferramentas, permissões ou resultados.

## Pré-requisitos, exemplos e erros

A pessoa precisa reconhecer arquivo, pasta e tarefa. Git só é necessário quando o trabalho usa recursos que dependem dele; a página inclui projetos sem código. Para quem está começando, basta escolher um contexto pequeno e saber apontar o documento de entrada e a entrega esperada.

Os exemplos oficiais ilustram organização e descoberta. Não há resposta de uma execução real, erro reproduzido ou correção retestada. Uma ficha não deve transformar menus e exemplos de títulos em prova operacional. Conta, plataforma, versão e permissões do aluno não foram testadas.

Hipóteses de falha úteis para uma prática: a referência está fora do contexto fornecido; duas pastas contêm arquivos com o mesmo nome; o aluno retoma uma tarefa e confunde uma versão antiga com a atual. Esses cenários são originais deste estudo, não defeitos atribuídos ao produto.

## Pertinência e relação com o corpus

Complementa o quickstart e prompting já estudados ao esclarecer a escolha de contexto antes da implementação. Não duplica instalação, resposta ou revisão. A prioridade para pessoa comum é identificar material de entrada e destino; multi-root, Git e detalhes de IDE podem permanecer para trabalho posterior.

A observação é de 28/09/2026. Interfaces e disponibilidade podem mudar; não se atribui essa data à publicação. As práticas abaixo não alteram o currículo: em L01, a entrega continua plano revisado. Não foram adicionados módulos, instaladas integrações ou reorganizadas tarefas reais.

## Prática original: preparar uma tarefa de site com contexto inequívoco

Proposta não executada. O instrutor fornece uma pasta de ensaio de uma oficina fictícia e um documento de requisitos. Preparar um plano para revisar a página, declarando o arquivo de referência, o destino do plano e a alteração que será avaliada em etapa posterior. Se a atividade ocorrer em superfície sem acesso à pasta local, fornecer os documentos pelo mecanismo disponível e registrar essa escolha.

**Check 1 — referência correta:** pedir que a ferramenta identifique o nome da oficina e uma restrição encontrada no documento fornecido, apontando sua origem. Comparar com o documento original. Se houver duas versões, a resposta deve mostrar qual foi usada; acertar por coincidência não resolve a ambiguidade de contexto.

**Check 2 — entrega e retomada:** conferir que o plano foi produzido no formato/destino solicitado e que diferencia etapas previstas de trabalho executado. Em uma retomada de ensaio, apresentar uma mudança pequena no requisito e pedir a revisão do plano. Confirmar que a versão revisada incorpora a mudança sem alegar que o site já foi alterado.

Se um check falhar, corrigir o contexto ou a indicação da referência e repetir ambos. O registro deve conter o pedido, a fonte selecionada, a diferença encontrada e o plano revisado. Não mover tarefas do usuário, anexar pastas ou alterar o estado real para demonstrar o exercício.

## Escopo não revisado

Não foram estudados todos os links externos, testados produtos nas quatro superfícies ou operadas contas do usuário. A página não equivale a documentação completa de cloud, sandbox, memórias ou permissões. HTML, textos e captura ficam locais e ignorados pelo Git, sem licença de republicação presumida.
