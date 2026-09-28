# Worktrees — executar e conferir no checkout correto

[Documentação oficial OpenAI](https://learn.chatgpt.com/docs/environments/git-worktrees), fonte `openai-learn-codex`, consultada em 28/09/2026 com a skill OpenAI Docs. Não há data editorial identificada no corpo. Foram lidas as 180 linhas de `studies/local/backfill-a06-worktrees.txt`, incluindo a explicação expansível da limitação de branches e as três respostas expansíveis de FAQ. As duas figuras materiais foram conferidas. Hashes e bytes estão no manifesto.

`text_read_complete=true` e `full_source_analyzed=true` referem-se à página completa observada. Não foram criados worktrees, branches ou projetos nem executados Handoff, configurações, testes, commits ou publicação. Capturas mostram a documentação, não operações realizadas neste projeto. O HTML preservado não é certificado como leitura textual.

## Argumento e sequência completos

A página explica como manter tarefas do mesmo projeto em cópias de trabalho diferentes e depois escolher onde inspecionar a mudança. O requisito estrutural é Git: cada checkout tem arquivos próprios, enquanto informações de commits e branches continuam compartilhadas. O benefício documentado é trabalhar em paralelo com menor interferência nos arquivos em edição. Isso não demonstra isolamento de serviços externos, contas ou bancos de dados.

| Percurso da fonte | Conteúdo e localizador |
| --- | --- |
| Escopo e termos | Linhas 11–30 distinguem checkout Local, worktree e Handoff. O trabalho e os comandos ficam no computador ou ambiente remoto que contém o projeto. Remote no celular controla esse ambiente; não executa o worktree no telefone. |
| Início | Linhas 31–49: selecionar Worktree no compositor, escolher ambiente de preparação quando necessário, escolher o estado inicial, enviar o pedido e decidir onde continuar. O estado padrão é detached HEAD; a origem pode incluir mudanças locais conforme a escolha documentada. |
| Permanecer no worktree | Linhas 51–78: preparar dependências e ferramentas, validar naquele diretório, criar branch quando necessário e seguir para commit/push/PR. O botão Open e o terminal dão acesso à cópia de trabalho correta. |
| Levar para Local | Linhas 80–101: usar Hand off quando o ambiente habitual é mais adequado para inspecionar ou testar. A tarefa pode voltar ao worktree associado. A transferência usa Git; arquivos ignorados exigem tratamento específico. |
| Tipos e preparação | Linhas 103–127: diferenciar worktree gerenciado de permanente, entender origem do checkout e quais arquivos ignorados podem ser copiados por `.worktreeinclude`. |
| Limitação e recuperação | Linhas 129–145: exemplo de branch já usada em outro worktree, explicação do conflito e caminhos de resolução. O painel explicativo foi aberto e lido. |
| Limpeza e FAQ | Linhas 147–177: limite padrão, exceções à limpeza, snapshots e restauração, configuração do diretório e permanência do histórico da tarefa. As três respostas foram abertas e lidas. |

A documentação diferencia também tarefas agendadas em projeto Git, que podem usar worktrees de fundo, de projetos sem versionamento, nos quais a execução ocorre diretamente no diretório do projeto. Isso não transforma um projeto sem Git em um worktree nem oferece, nesta página, um procedimento completo de automação.

## Exemplos, imagens e falha documentada

`backfill-a06-worktrees-branch.png` mostra o diálogo ilustrativo de criação de branch com prefixo `codex/`. `backfill-a06-worktrees-handoff.png` mostra a transferência para Local e a descrição de checkout da branch. Os rótulos foram confrontados com o texto do corpo. São exemplos de interface; não comprovam transferência ou teste bem-sucedidos. Não foi encontrado vídeo incorporado no corpo observado.

O erro concreto apresentado é tentar usar localmente uma branch ainda associada a outro worktree. A fonte oferece trocar a branch no outro checkout ou usar Handoff para o fluxo de retorno a Local. Explica que operações concorrentes sobre a mesma referência mutável tornariam seu estado ambíguo. É um exemplo documental com mensagem de erro e resolução sugerida, não uma sessão registrada de erro → correção → reteste. Não foi reproduzido nesta pesquisa.

Outro exemplo é a inclusão de arquivos ignorados de configuração. A fonte distingue arquivos rastreados, já presentes pelo checkout; ignorados que correspondem a `.worktreeinclude`; e outros não rastreados, que não são copiados por esse mecanismo. Documenta ainda cópia automática de `AGENTS.override.md` ignorado, descarte de symlinks de origem e preservação de arquivos já existentes no destino. Esse comportamento é descrito para **worktrees locais gerenciados pelo Desktop**, não para worktrees remotos ou criados manualmente pela CLI. Os exemplos de configuração não foram aplicados nem usados para copiar dados do usuário.

## Gerenciamento, retenção e limites

O worktree gerenciado é normalmente associado a uma tarefa e pode ser descartado automaticamente; o permanente vira um projeto próprio, permite várias tarefas e não participa dessa remoção automática. A fonte informa retenção padrão dos 15 worktrees gerenciados mais recentes e ajustes em Settings. Tarefas fixadas, em andamento e worktrees permanentes aparecem como exceções à limpeza. Arquivar a tarefa associada ou exceder o limite pode provocar remoção de worktrees gerenciados.

Segundo a documentação, antes dessa remoção o produto guarda um snapshot e oferece restaurá-lo quando a tarefa é reaberta. Isso é uma capacidade relatada pela fonte, não teste de restauração independente. A página não estabelece a cobertura de todo arquivo ignorado ou serviço externo; não a interpreto como prova de backup completo. A FAQ também distingue o histórico da conversa da existência do diretório de trabalho e indica onde alterar a raiz de worktrees. Nenhuma dessas configurações foi alterada.

## Análise original: estado, ambiente e evidência

Para quem cria um site, a falha mais instrutiva pode ser olhar a página servida por uma cópia e editar outra. Uma resposta dizendo “alterei o título” não revela qual diretório alimenta o navegador aberto. Proponho que a verificação registre três coisas juntas: diretório alterado, comando/servidor usado e resultado observado. Se essas origens não coincidirem, repetir o pedido de alteração pode acumular trabalho sem resolver o diagnóstico.

Um segundo problema é confundir isolamento de arquivos com ambiente pronto. A cópia pode conter o código correto e ainda não ter dependências ou uma configuração local de ensaio. A fonte menciona scripts de preparação e arquivos ignorados; infiro daí que o plano de trabalho deve distinguir mudança de produto de preparação para testá-la. Instalar dependências ou copiar configuração não comprova que a alteração solicitada funciona.

Handoff é útil quando a verificação depende do ambiente habitual, mas não substitui critérios de aceitação. Mover tarefa e código responde “onde continuar”; testar responde “o resultado corresponde ao pedido?”. Essa distinção evita ensinar a conclusão de uma operação de interface como sucesso do site.

O estado inicial também precisa ser explícito. Se uma atividade começa da branch principal, de uma branch de recurso ou de alterações locais ainda não registradas, o mesmo pedido pode partir de arquivos diferentes. Registrar essa decisão no plano reduz surpresa na revisão. Esta é uma recomendação pedagógica derivada do mecanismo, não um incidente comprovado pela página.

## Pré-requisitos, pertinência, atualidade e lacunas

Pré-requisitos para executar o fluxo: projeto Git, noção de checkout/branch, capacidade de localizar o diretório e um modo conhecido de verificar o resultado. Permanecer no worktree pode exigir preparação das dependências; transferir para Local exige compreender o destino da tarefa e do código. A leitura conceitual pode anteceder esses requisitos, mas a operação não é uma primeira tarefa apropriada para quem ainda confunde arquivo, projeto e página publicada.

A ficha complementa Projects e quickstart com separação de cópias, preparação e recuperação de um conflito documentado. É pertinente a implementação e correção posteriores; L01 permanece plano revisado. Não duplica prompting e não fornece publicação completa: a menção a commit/push/PR é uma continuação possível, não uma demonstração de site entregue.

A data de coleta é 28/09/2026. Rótulos, retenção e comportamento são observações da documentação nessa data. O texto nomeia o app Desktop como ChatGPT desktop app e apresenta Remote no mobile; preservo essa distinção em vez de afirmar equivalência universal com CLI ou Codex cloud. Permanecem lacunas sobre conflitos complexos, restauração efetiva, serviços externos e uma execução completa com resultado e reteste.

## Prática original: planejar e depois testar a cópia certa

Proposta não executada. O instrutor prepara um repositório de ensaio de uma oficina fictícia, com uma página estática e um procedimento de prévia conhecido. Em L01, o aluno só entrega um plano revisado: mudança solicitada, estado inicial, cópia escolhida, preparação necessária, forma de observar resultado e caminho de recuperação. Em etapa posterior autorizada, pode executar uma mudança pequena, como corrigir o horário exibido.

**Check 1 — origem e destino:** antes da execução, registrar qual checkout será editado e de qual diretório a prévia será iniciada. Confrontar os arquivos e o estado inicial com a fixture do instrutor. Se estiverem diferentes do plano, corrigir a seleção ou o plano antes de avaliar a página. Se o exercício usar configuração ignorada, usar apenas dados fictícios preparados para a atividade.

**Check 2 — comportamento e reteste:** na prévia que corresponde ao checkout escolhido, conferir o horário novo e verificar que o link de contato continua abrindo o destino esperado. Se um deles falhar, registrar observação e resultado esperado, pedir uma correção focada e repetir os dois checks na mesma origem. Caso a turma exercite Handoff, repetir esses checks no destino após a transferência, registrando qual ambiente serviu a página.

Guardar pedido, plano, diretório verificado, resultado antes/depois e checks repetidos. A execução bem-sucedida comprova essa mudança local; não comprova publicação, restauração de snapshot ou funcionamento de outro ambiente. Evitar criar branch, arquivar ou apagar worktrees reais apenas para demonstrar a ficha.

## Escopo não revisado e direitos

Não foram abertas todas as referências externas, operado o produto, testados os comandos, provocados conflitos ou restaurados snapshots. Não houve aquisição audiovisual. Texto integral, HTML e capturas ficam locais e ignorados pelo Git; a ficha é análise original, sem licença de republicação presumida para os originais.
