# Hooks — definir um evento e verificar o resultado da rotina

Fonte: [Hooks, Claude Academy](https://academy.claude.com/courses/claude-code-101/hooks), aula 12 de Claude Code 101, observada em 28/09/2026; vídeo `IkaPHiMDazM`. Sete parágrafos da transcrição oficial e todo o complemento lidos; duas imagens conferidas. Vídeo contínuo e cobertura de fala não certificados.

## Sequência e mecanismo apresentado

A aula contrasta instruções que o agente precisa lembrar com comandos acionados por eventos. Propõe formatação, registro de atividade, bloqueio antes de uma ação e notificações. Explica evento, filtro de ferramenta e comando em `settings.json`; distingue momentos antes/depois da ferramenta, envio do pedido e término da resposta. No exemplo de bloqueio anterior à chamada, descreve entrada JSON e retorno pelo código de saída. Encerra com configuração no projeto e referência ao diretório do projeto.

O exemplo de formatação lista ferramentas de edição e escolhe o formatador pela extensão. Não apresenta o script completo, uma execução que altere arquivo, um teste de bloqueio ou recuperação de configuração incorreta. A narração identifica `MultiEdit`; o quadro observado mostra `Edit|Write`. Não presumir equivalência de nomes entre versões.

## Evidência visual

A primeira imagem localiza `.claude/settings.json` e uma pasta de hooks no explorador do editor. Isso confirma a organização mostrada, sem provar que o arquivo foi carregado numa sessão. A segunda mostra `PreToolUse`, filtro `Bash` e caminho para um script, seguido do início de `PostToolUse` com filtro de edição. A implementação do script e o restante da configuração estão fora do recorte da própria imagem. Não há resultado de execução.

## Ressalva conferida na documentação atual

A expressão de execução sem exceções é ampla demais para um critério operacional. A referência atual condiciona o acionamento ao evento e ao filtro, documenta erros de inicialização e timeouts, e explica que o código de saída deve ser interpretado junto com a saída estruturada. Um hook de comando anterior à ferramenta que expira não bloqueia por esse motivo; o fluxo de permissões continua. Na sessão interativa, há ainda a condição de confiança na pasta. A leitura complementar foi limitada a essas seções. [Referência de hooks](https://code.claude.com/docs/en/hooks).

Para o curso, tratar acionamento configurado e resultado concluído como verificações separadas. A presença do arquivo não garante que o comando exista, que o filtro corresponda à ferramenta usada ou que a rotina termine com o efeito esperado. Um erro de execução também não equivale automaticamente a uma ação bloqueada.

## Aplicação pedagógica

O conteúdo é posterior à primeira construção. Antes de automatizar uma verificação, o aluno precisa saber executá-la e reconhecer seu resultado. A lógica transfere para outras rotinas: identificar o evento, delimitar o que ele aciona e decidir como observar sucesso, falha e repetição. A configuração apresentada é específica de Claude Code; não deve ser copiada para o Codex como se os formatos fossem iguais.

Não ensinar uma simples busca de texto num comando como proteção universal de arquivos. A aula lista intenções de bloqueio, mas não demonstra cobertura dos caminhos alternativos. O exercício abaixo usa somente registro de uma ação de teste, sem alterar configurações de proteção do ambiente do aluno.

## Prática original: registrar uma verificação conhecida

Proposta não executada. Começar pelo relatório CSV do curso e pela verificação manual já especificada. Definir a entrada, o total esperado e a saída que será preservada em caso de erro. Depois, escrever uma proposta de rotina: qual evento a inicia, quais arquivos se aplicam e onde observar a conclusão.

Numa etapa posterior, em ambiente de ensaio preparado pelo Educador, implementar uma rotina simples que registra quando a verificação foi solicitada. Só depois associá-la ao evento escolhido. A primeira atividade pode ficar na tabela de cenários se a interface do aluno não oferecer hooks compatíveis.

1. **Acionamento delimitado:** executar uma ação incluída no filtro e outra excluída. Conferir os registros esperados e a ausência de registros indevidos. Essa comparação detecta tanto filtro que não funciona quanto rotina acionada em excesso.
2. **Resultado independente do disparo:** provocar uma entrada de teste inválida e conferir que o relatório anterior continua preservado. Um registro dizendo que a rotina começou não certifica essa propriedade.
3. **Falha observável:** no ambiente de ensaio, simular indisponibilidade da rotina e registrar o estado observado. O relato precisa distinguir rotina não iniciada, execução falha e verificação reprovada. Repor a configuração correta e repetir o caso.

Entrega: especificação do evento, tabela de cenários e resultados observados quando houver execução. Em L01, usar somente para explicar como planejar uma automação; não configurar hooks nem editar arquivos como resultado dessa primeira aula.

## Proveniência e pendências

Textos `studies/local/backfill-ac06-hooks.txt` e `-summary.txt`; faixa `transcripts/local/IkaPHiMDazM.academy.txt`; capturas `backfill-ac06-hooks-0.png` e `-1.png`. Hashes e intervalos no manifesto. Nenhum hook foi instalado, executado ou desabilitado nesta pesquisa. Faltam vídeo contínuo, scripts completos e prática operacional. Data de publicação não identificada; originais internos ignorados pelo Git, sem licença de republicação presumida.
