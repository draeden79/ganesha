# Inventário e transcrições de todo o histórico

Diretriz explícita recebida em 2026-09-28, após o ciclo inicial: cobrir todos os vídeos das nove fontes prioritárias. Prioritárias não significa exclusivas; outras fontes são permitidas para complementar e verificar. Esta diretriz substitui o encerramento anterior e a prioridade de publicação/automação.

## Escopo e denominadores

1. **Canais:** percorrer até o fim todas as abas de vídeos, Shorts e transmissões. A primeira execução concluiu essas abas nos cinco canais, com 4.743 IDs públicos. Resultados e log da paginação estão em `video-inventory/youtube-crawls/`. Contagens arredondadas dos cabeçalhos não são denominadores.
2. **Reconciliação dos canais:** listar playlists, podcasts e cursos; confrontar os IDs com os uploads. Identificar vídeos não listados e de outros autores separadamente. Uma aba sem continuação não prova que todos os vídeos historicamente publicados continuam públicos. IDs privados/removidos devem ter impedimento específico quando identificáveis.
3. **Peter Yang newsletter:** esgotar o arquivo renderizado e suas páginas, guardar permalinks e inspecionar cada artigo para vídeos YouTube/Substack ou outros players. Parte paga permanece bloqueada se não houver acesso autorizado; não inferir que não contém vídeos.
4. **Builder:** seguir o link “Next page” até o final do blog, deduplicar artigos e inspecionar players em cada página. A primeira página possui um link real para `/blog/page/2`; não extrapolar contagem a partir de um padrão de URL.
5. **Claude Academy:** a coleção Build with Claude lista dez cursos. Percorrer os programas e todas as aulas, identificar cada player e suas faixas. Quiz, resumo e conteúdo escrito não equivalem a transcrição do vídeo.
6. **OpenAI Learn Codex:** registrar os onze vídeos ligados na página renderizada e conferir as páginas educacionais vinculadas para outros players. A completude é declarada pelo escopo verificado, nunca por toda a plataforma OpenAI.

## Aquisição por vídeo

O ledger `video-inventory/videos.jsonl` usa ID YouTube para deduplicar e preserva todas as fontes/páginas de descoberta. Novos provedores ficam inicialmente em `other-media.json`, com página e próxima ação, até haver um identificador estável. Datas exatas desconhecidas são `null`, não estimadas a partir de “há X meses”.

Cada vídeo começa com `pending` e motivo `not_yet_attempted`. Registrar a tentativa, data, resultado, idioma, origem manual/automática/desconhecida, URL, duração e artefato/hash. O formato nativo “authored or unspecified” não permite afirmar que uma pessoa escreveu a legenda.

Estados separados:

- `exported_track`: faixa acessível exportada inteira e arquivo validado; conteúdo e cobertura da fala ainda precisam de revisão.
- `partial`: aquisição efetivamente parcial, com intervalos disponíveis e ausentes.
- `full_verified`: faixa completa revisada e sem lacuna de fala conhecida; registrar o critério e a evidência dessa verificação.
- `pending`: ainda sem transcrição; distinguir não tentado, sem faixa, bloqueio, privado, removido e falha temporária.

Não promover `exported_track` a `full_verified` porque o último início de legenda está perto do fim. O TXT nativo não informa o fim da última legenda. JSON3 preserva início/duração de cada cue, mas nem isso prova ausência de palavras omitidas. Registrar limitações, silêncio/outro final quando efetivamente conferido e excesso de tempo de legenda em relação ao player.

## Métodos confirmados

- Browser: abrir a descrição, clicar “Mostrar transcrição”, então `content.exportYouTubeTranscript()`. A primeira tentativa direta de Tim falhou e foi recuperada assim; o aviso do player sobre legendas não basta para concluir ausência.
- yt-dlp 2026.8.19, sem cookies: `collect_videos.py` esgota uploads públicos e conserva páginas/log. Usar instalação isolada e Python compatível; não depender de um caminho temporário em outra máquina.
- Legendas públicas JSON3: download sem vídeo/áudio é possível. Houve HTTP 429 no vídeo de Peter; respeitar pausa, conservar TXT já obtido e tentar o formato temporal em lote posterior. Não trocar identidades/proxies para insistir.
- `collect_embeds.py` percorre apenas HTML público e links encontrados, com checkpoint por página. Fila HTML vazia não confirma esgotamento de um arquivo que carrega por JavaScript; reconciliação no Browser continua pendente.

## Lotes e continuidade

1. Inventariar e reconciliar todo o universo, preservando descoberta já feita. Nunca selecionar apenas recentes como substituto do histórico.
2. Processar IDs pendentes em lotes com checkpoint. Prioridade de aquisição pode antecipar conteúdo útil ao curso, mas não elimina o restante do backlog.
3. Para falhas, guardar a próxima ação por vídeo e retomar após condição adequada. Falha de acesso não é evidência de inexistência.
4. Recalcular contagens com `python3 content/research/video_inventory.py build`; validar com `validate --artifacts` na máquina que conserva os arquivos.
5. Entregar commits de manifestos, relatórios e procedimentos ao Diretor; enviar referências úteis ao Educador. Não alterar aulas automaticamente.
6. A automação existente `devorador-atualiza-o-semanal-das-fontes` retoma o ledger e faz a varredura incremental, às sextas-feiras às 09:00 America/Los_Angeles. Não criar outra automação. Permanecer silenciosa quando não houver mudança relevante.

## Guarda e uso

As transcrições brutas estão em `transcripts/local/`, ignoradas pelo Git, para pesquisa interna. O manifesto versionado contém raiz absoluta, caminhos relativos, tamanho e SHA-256. Outros worktrees desta máquina podem ler essa raiz; cherry-pick não transporta os arquivos. Ao mudar de máquina, copiar o acervo por canal privado autorizado e verificar os hashes. Aulas e site recebem sínteses originais, referências e evidências curtas, nunca o acervo bruto.
