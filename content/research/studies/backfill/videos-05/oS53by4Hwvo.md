# Peter — aplicativo móvel de registro de treinos

Fonte: [Full Tutorial: Build a Beautiful Mobile App with Claude Code in 16 Minutes](https://www.youtube.com/watch?v=oS53by4Hwvo), Peter Yang, publicada em 2026-04-01; estudo em 2026-09-28. O resultado apresentado inclui entrada, sessão de treino e histórico. A construção é uma retrospectiva apoiada na conversa anterior, e não uma instalação e implementação contínuas em dezesseis minutos.

## Proveniência e cobertura

Leitura sequencial integral das 516 linhas/cues automáticas em inglês, intervalos 1–260 e 261–516. Artefato `transcripts/local/aq.oS53by4Hwvo.en.dfdf14ebd2cb.txt`, 33.781 bytes, SHA-256 `dfdf14ebd2cb7be1647054f3561a801de2e7acf73da20135b1cf576248eec799`. JSON3 e seis capturas têm bytes/hash no manifesto. Metadados/player: 16:56; legenda: 00:01–16:57,720. O excedente de 1,720 segundo e a exportação completa da faixa não certificam fala completa.

A legenda confunde Claude com Cloud/Clockwork e EAS com “ES”. O quadro de 15:00 confirma o rótulo EAS Build. A nomenclatura do produto é contextualizada; comandos transcritos não são instruções atuais verificadas. `full_transcript_read=true`; `full_video_watched`, `full_source_analyzed` e `full_speech_coverage_verified=false`. Nenhuma instalação, execução do app, credencial, publicação ou prática foi realizada pelo estudo.

## Sequência integral

| Faixa | Raciocínio, exemplo e alcance |
|---|---|
| 00:01–00:29 | Apresenta um app para registrar treinos e diz tê-lo construído na noite anterior, durante algumas horas após o trabalho. A duração do tutorial não é duração de desenvolvimento. |
| 00:29–01:35 | Na apresentação inicial, cria “Peter's workout”, adiciona agachamento com barra, remada e supino, define três séries de oito e aquecimento. Salva, inicia sessão, marca séries, mostra descanso e calendário. Menciona alternância de unidades e configuração do temporizador. Há estados de app, não apenas desenhos. |
| 01:35–02:03 | Define três fases: requisitos em Claude, design em Pencil, implementação em Claude Code com teste por Expo Go. |
| 02:03–03:21 | Reabre conversa anterior. Especifica telas de criar/editar treino, executar treino e calendário. Parte de sua experiência com StrongLifts, buscando mais flexibilidade de séries/repetições. Suas observações pessoais sobre exercício não são prescrição nem objeto de validação deste estudo. Solicita requisitos concisos e perguntas numeradas para explicitar decisões ausentes. |
| 03:21–04:27 | Responde sobre progressão de carga, temporizador, interação do calendário, séries não concluídas, unidades e armazenamento. Prefere registro manual, mas discute uma regra simples após três sessões completas. A conversa revela decisões de produto; a regra de progressão não é exercitada três vezes na demonstração. |
| 04:27–05:47 | O agente tenta gerar Markdown antes da revisão; o autor queria primeiro ver requisitos no chat. Revisa modelo de dados e telas, define padrões de três séries/oito repetições, peso da barra e tema escuro vermelho. Separa requisitos visuais dos técnicos e deixa margem ao designer. |
| 05:47–06:12 | Mostra versão 1.1 com seções de design e especificação técnica; transfere a parte visual para Pencil. |
| 06:12–07:03 | Remete a outro tutorial sobre Pencil, cola requisitos, escolhe Opus e seis agentes de design; corta a espera. A preferência de modelo é opinião histórica. Instalação, conta e configuração completa do editor não são ensinadas aqui. |
| 07:03–08:17 | Percorre desenhos de lista/edição de treinos, catálogo de aproximadamente trinta exercícios, séries, sessão, temporizador, calendário, histórico e ajustes. Diz que a geração levou menos de cinco minutos e demonstra que texto/cor podem ser editados. Essas telas no editor são design; a execução funcional é evidenciada no app da abertura. |
| 08:17–08:57 | Abre `fitness.pen` e explica a representação textual de fontes, cores, posições e espaçamento, comparando-a a JSON. O mecanismo de transferência é um arquivo estruturado legível pelo agente, além de capturas do design. Isso não significa que cada elemento visual já possua lógica de aplicação. |
| 08:57–10:26 | Retorna ao chat, informa telas produzidas e pede especificação técnica. Corrige referência descrita como Figma ID para Pencil ID. Divide trabalho: estrutura e templates; sessão/descanso; calendário/histórico. Revisa escopo para incluir exercícios personalizados e pede `spec.md`. |
| 10:26–11:44 | Explica preferência por planejar no chat antes de programar, embora diga que poderia usar Claude Code. Cria pasta `fitness-app`, coloca a especificação e mostra conexão Pencil MCP já disponível. Pede identificar telas de `fitness.pen`; relata retorno com os designs. Não acompanha configuração limpa da conexão. |
| 11:44–12:41 | Reabre a conversa da construção na noite anterior, faz comentário pessoal sobre ter perdido o horário de treinar e lê uma síntese do próprio agente. Diz que validou os marcos, pediu o primeiro e que o agente capturou designs, criou projeto Expo e instalou dependências. Essa síntese não substitui os comandos/diffs originais. |
| 12:41–13:24 | Descreve teste no iPhone com Expo Go e espelhamento. Relata cerca de vinte minutos para resolver incompatibilidade entre SDK 55 do projeto e SDK 54 suportado pelo Expo Go usado naquela sessão, terminando em downgrade. Não acompanha toda a falha e recuperação. Esses números descrevem a gravação, não recomendação de versões atuais. |
| 13:24–14:17 | Relata teclado cobrindo campos numéricos e iteração para corrigir. Constrói os marcos restantes, pede revisão de aparência/código, testa informalmente e solicita commit no GitHub. Cita cerca de 6.400 linhas e oito telas. Não audita diff completo nem suite de testes; tamanho de código não mede qualidade. |
| 14:17–15:18 | Diz poder usar o app pessoalmente e pergunta como instalá-lo sem manter Expo Go ou publicá-lo na App Store. A resposta oferece caminhos de EAS Build e loja; ele pretende fazer o primeiro depois. Não executa build independente nem submissão. Valor de conta Apple citado é histórico e não foi verificado. |
| 15:18–16:56 | Recapitula perguntas de requisitos, separação visual/técnica, Pencil, MCP e marcos com testes intermediários. Afirma que MCP deveria estar disponível com Pencil instalado; isso não foi validado em ambiente novo. Incentiva criação e pede inscrição. O relato de duas horas de trabalho continua distinto dos dezesseis minutos editados. |

## Quadros, mecanismo e provas

Foram inspecionados os estados de 00:45, 01:05, 01:20, 01:25, 13:10 e 15:00. Em 00:45 o treino nomeado contém um exercício configurado como três séries/oito repetições. Em 01:05 há sessão ativa, círculo de aquecimento marcado e descanso de um minuto. São telas de telefone apresentadas pelo autor como app em Expo Go com espelhamento; não um teste independente no meu dispositivo.

Em 01:20 o calendário exibe registros anteriores “Workout A”. Em 01:25 muda a data selecionada e aparece “Peter's workout” com três exercícios, inclusive séries registradas como zero no supino. Isso sustenta recuperação de um registro na sessão demonstrada, mas não prova gravação após encerrar e reabrir o processo. O nome foi preservado com capitalização irregular visível na interface; não é motivo para criar uma correção que o autor não realizou.

O quadro de 13:10 é um resumo textual do agente: afirma usar stores Zustand com persistência AsyncStorage, resolver dependências, substituir um bottom sheet por modais nativos e criar campo numérico compartilhado com controle de concluir acima do teclado. Afirma também que a impossibilidade inicial de abrir a sessão era esperada, pois o segundo marco ainda não estava implementado. Esses detalhes são **relato de construção**, não diffs nem reprodução observada. Distinguir uma função ainda fora do marco de uma regressão evita tratar todo botão inativo como o mesmo tipo de problema.

A persistência é, portanto, alegada na implementação e compatível com o histórico exibido; durabilidade após reinício, migração, perda/duplicação de registros e troca de unidades permanecem sem teste acompanhado. Não assumir armazenamento em nuvem ou sincronização entre aparelhos. Pedido para testar a cada marco também não comprova execução sistemática de todos os critérios. A sequência contínua de falha, alteração de código e reteste do teclado não foi exibida nas amostras.

Em 15:00 há resposta com opções de distribuição ainda não executadas. O texto do agente contém alegações sobre conta, instalação, build e custos que não foram verificadas. O marco entregue é execução de desenvolvimento em Expo Go; um repositório no GitHub não equivale a App Store, instalação independente ou distribuição a outra pessoa.

## Dependências, atualidade e utilidade

Exige acesso a Claude e Claude Code, Pencil com conexão MCP funcional, ambiente local para projeto React Native/Expo e dependências, telefone com Expo Go compatível, conectividade de desenvolvimento, navegador/editor para arquivos e GitHub para o checkpoint. Espelhamento do iPhone aparece no fluxo; disponibilidade e configuração por sistema não são explicadas desde o início. Não há pressuposto de conta, chave ou instalação já autorizada para o aluno.

As interfaces são de abril de 2026. Atalhos, agentes de design, conexão automática MCP, SDKs e distribuição precisam ser verificados no ambiente de uma futura prática. Não transportar o downgrade de SDK 55 para 54 para uma aula atual sem diagnóstico. Claude em chat, Claude Code e Pencil são superfícies distintas; nenhuma paridade com Codex Desktop foi demonstrada. A competência transferível é separar requisitos/telas/dados, construir por marcos e testar no aparelho que receberá a interface.

O caso oferece mais evidência de entrada e estado que uma demo apenas visual. Para iniciante absoluto, não basta como receita integral: a configuração móvel, as correções e a distribuição estão condensadas ou pendentes. Complementa o app web de atividades estudado no lote anterior com teclado móvel, histórico e distinção entre ambiente de desenvolvimento e instalação final. Mantém-se no corpus sem tornar todas as ferramentas obrigatórias.

## Prática original proposta

Proposta não executada e sem gerar aula automaticamente: um registro móvel simples de sessões de estudo, com título, três etapas editáveis, conclusão e calendário. O domínio mantém o mecanismo de estado/histórico sem transformar exemplos de treino em orientação de saúde. Primeiro declarar o que deve sobreviver ao fechamento; separar template de sessão já realizada e limitar o primeiro marco a criar/editar/listar.

1. **Entrada e teclado:** criar um registro, alterar nome/quantidade com teclado aberto e concluir sem ocultar o botão. Testar vazio e número inválido, corrigir e repetir no aparelho. Uma tela de design aprovada não satisfaz este check.
2. **Estado e histórico:** concluir algumas etapas, finalizar a sessão e abrir a mesma data no calendário. Conferir valores e ausência de duplicação. Alterar o template depois e confirmar a regra definida para registros antigos.
3. **Persistência e entrega:** encerrar/reabrir o app e conferir título, dados e preferências. Registrar separadamente teste em ambiente de desenvolvimento e instalação independente. Só chamar a segunda de concluída após abrir o build fora da sessão de desenvolvimento; loja fica fora do escopo até haver submissão e resultado verificados.

Pendem audiovisual contínuo, transcrição/fala conferidas, código e correções reais, testes de persistência/unidades/progressão e validação atual das dependências. A aula L01 permanece apenas plano; este documento é pesquisa e proposta de prática.
