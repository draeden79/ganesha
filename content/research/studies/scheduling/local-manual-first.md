# Primeira automação local: testar antes de agendar

Estudo de 28/09/2026. Proposta para pessoas comuns produzirem um relatório a partir de dados fictícios. Nenhuma tarefa agendada foi criada, editada ou executada neste estudo.

## Duas referências, uma lacuna concreta

[Claude Desktop — tarefas locais](https://code.claude.com/docs/en/desktop-scheduled-tasks): corpo textual integral preservado em `studies/local/schedule-claude.txt`, 90 linhas, 9.078 bytes, SHA-256 `eccbfc17ff5df9863ab547fe6df56386196c82bb9b939bec60d6f407113f0e7a`. DOM e texto lidos integralmente; sem ilustrações materiais no corpo. O estudo não inclui páginas vinculadas.

O documento compara execução local, nuvem e `/loop`, passa por criação, agenda, execução, atrasos, permissões e manutenção. Para arquivos locais, exige máquina acordada e app aberto. A rota documentada é Code → Routines → New routine → Local; pasta é obrigatória. Manual e Run now permitem executar sem periodicidade. Execuções perdidas podem originar uma única recuperação, não uma repetição de todo o histórico. Active/Paused, histórico e revisão de permissões permitem acompanhar e interromper o processo. Linhas 16–77 sustentam essas distinções; detalhes de versão e intervalos precisam de reconferência antes da aula. A orientação da fonte para autorizações persistentes não dispensa entender cada ferramenta do exercício.

[Codex no app — Scheduled tasks](https://learn.chatgpt.com/docs/automations): variante Desktop renderizada integralmente preservada em `studies/local/schedule-codex-desktop.txt`, 220 linhas, 13.373 bytes, SHA-256 `cfaed4e71ba8928e069dad5b350d770c8c51200738188be2ceb02ede1e9b0c36`. Texto completo lido, incluindo os três exemplos extensos. Vídeo incorporado, ilustrações e outras variantes da página não foram estudados integralmente; `full_source_analyzed=false`.

O documento distingue tarefa ligada à conversa e execução independente, projeto local e worktree, acompanhamento, testes, limpeza e permissões. A recomendação expressa é experimentar o prompt em conversa comum antes de agendar, depois revisar as primeiras saídas. Tarefas que dependem do projeto local requerem app aberto, máquina ligada e pasta disponível. A revisão de resultados ocorre em Scheduled. Os exemplos de skills, relatórios de commits e correções são referências de formato, não pré-requisitos para um relatório simples. Linhas 18–126 fundamentam esse recorte. O aviso de aposentadoria de modelo foi lido, mas não fixa uma escolha de modelo para o curso.

As páginas são atuais na data de consulta, sem data de publicação confirmada. A diferença entre as superfícies exige dois percursos de configuração; a lógica da transformação e os critérios de aprovação podem ser iguais. O vídeo de rotina com Zoho/Twilio fica como caso posterior, sem obrigar integrações de terceiros nesta primeira prática.

## Prática original proposta ao Educador

Esta atividade é uma criação editorial, não um exemplo executado pelos autores nem pelo Devorador. O instrutor prepara uma pasta exclusiva com `pedidos.csv`; o aluno sabe localizar arquivos e verificar uma tabela pequena. Não há dados pessoais, envio de mensagens ou serviço externo.

| id | categoria | quantidade |
| --- | --- | --- |
| P01 | Material | 2 |
| P02 | Brinde | 1 |
| P03 | Material | 3 |

Resultado esperado definido antes da execução: três registros, seis unidades, Material com cinco e Brinde com uma. O relatório deve identificar a entrada utilizada, listar totais e separar limitações de resultados. Isso é o gabarito do exercício, não um log de execução.

Pedido original sugerido: “Leia pedidos.csv nesta pasta e produza relatorio.md com quantidade de registros, total de unidades e unidades por categoria. Preserve a entrada. IDs devem ser únicos e quantidades devem ser inteiros positivos. Se faltar coluna, houver ID repetido ou valor inválido, explique o problema e preserve o último relatório válido. Reexecutar a mesma entrada deve recalcular o relatório, sem acumular contagens. Mostre como você conferiu.”

1. **Rodada manual:** enviar o pedido em uma conversa local, abrir o relatório e comparar cada total com o gabarito. Conferir que a entrada não mudou. O relato do agente é informação adicional; o arquivo produzido é a evidência principal.
2. **Repetição:** pedir a mesma tarefa novamente. Conferir que três registros não viraram seis e que os grupos mantêm os totais. O aluno deve explicar por que escrever sobre o relatório é diferente de acrescentar resultados a cada execução.
3. **Falha controlada:** numa cópia de treino, trocar uma quantidade por `abc`; executar novamente. Esperado: diagnóstico do registro e preservação do último resultado válido, sem aprovação silenciosa de total parcial. Corrigir o dado e repetir a conferência normal. Duplicidade e cabeçalho ausente podem ser variações posteriores.
4. **Agenda somente após aprovação manual:** definir quando, em qual pasta e onde o resultado aparecerá. No Claude, a documentação oferece Manual/Run now e depois periodicidade; no Codex, a conversa permite formular trabalho, frequência e destino. Conferir a configuração exibida, o fuso escolhido e os requisitos de máquina/app. Não criar uma automação real apenas para demonstrar um formulário.
5. **Acompanhamento:** conferir a primeira execução agendada com o mesmo gabarito; registrar horário previsto, execução observada, entrada e saída. Pausar após o exercício, mantendo os artefatos para revisão. Ausência de execução requer verificar histórico e dependências, sem confundir isso com erro na soma.

Check de conteúdo: os totais e categorias coincidem com os dados. Check de repetição: a segunda execução não duplica. Check de recuperação: entrada inválida produz diagnóstico e não destrói o último resultado válido; corrigir restaura o resultado esperado. Check de agenda: existe evidência da execução e do arquivo posterior ao agendamento, não apenas uma configuração salva.

## Suficiência e pendências

As referências sustentam os mecanismos de teste, configuração e acompanhamento. A prática cobre entrada, saída, validação, erro, repetição e manutenção de forma observável; ainda precisa ser executada nas duas ferramentas pelo responsável pela validação didática. Não há comprovação de que um modelo obedecerá ao pedido na primeira tentativa, que implementará gravação segura ou que a periodicidade funcionou nesta máquina.

Duplicação evitada: reutilizar o conhecimento de pasta, pedido e revisão da L01. Git, worktrees, skills, RAG, banco vetorial, email e SMS não são requisitos deste exercício. A aceitação curricular cabe ao Educador; a pesquisa não altera aulas. Originais internos ficam fora do Git. A indisponibilidade do download Markdown por HTTP não impediu a leitura integral do corpo público renderizado no navegador.
