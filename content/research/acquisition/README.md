# Aquisição retomável de faixas completas

Este diretório é uma entrega intermediária de aquisição e curadoria. **Faixa exportada não significa estudo integral nem cobertura de fala verificada.** Em 2026-09-28 houve uma priorização temporária de fontes práticas, preservada na curadoria. **Às 20:42 UTC, nova diretriz explícita do usuário retomou o consumo e a organização de todo o histórico.** A pertinência ao curso ordena e classifica o acervo; não exclui fontes definitivamente.

O modo histórico exige a opção explícita `--historical`, com escopo `exhaustive_user_directive_2026_09_28`. O padrão continua limitado à seleção imediata. A rodada atual é um lote de até 30 IDs novos, com 20 segundos mínimos entre IDs; não significa que todo o acervo foi concluído. Os 23 vídeos já adquiridos no manifesto canônico foram preservados, inclusive flags de leitura e estudo. O coletor nunca grava naquele manifesto.

`curation.json` registra critérios, seleção por lacuna de aprendizagem, rejeições/reservas, público, pré-requisitos confirmados ou estimados, atualidade, duplicação e próxima ação. `build_curation.py` materializa essa decisão editorial e atualiza apenas a evidência de aquisição. A escolha não usa quota de vídeos ou canais. O caso principal de site é Riley `SKBDC3QugZw`; Tim `GUgxx6fMiR8` fica em reserva somente se houver lacuna material.

O coletor não modifica os manifestos canônicos. Seus resultados ficam em `manifest.jsonl`, as tentativas em `attempts.jsonl`, o estado em `state.json`, a fila ativa em `active-selection.json` e as contagens em `coverage.json`. `queue.json` conserva o inventário de descoberta. No modo histórico, `historical-queue.json` contém todos os IDs ordenados, `historical-priority.jsonl` explicita motivos/pesos de título e duração, e `historical-checkpoint.json` registra o lote, sucessos, próxima posição e impedimentos. `historical-baseline.json` conserva os flags canônicos anteriores para auditoria de não regressão. O Diretor pode integrar os resultados ao ledger depois de verificar os artefatos.

## Método e limites

- `yt-dlp 2026.8.19`, metadados públicos e legenda original JSON3; sem vídeo/áudio, cookies, proxies ou troca de identidade.
- Uma faixa original por vídeo, priorizando legenda inglesa authored-or-unspecified e depois automática. A lista de idiomas pode incluir traduções oferecidas pela plataforma; isso não significa que foram baixadas. Downloads com parâmetro explícito `tlang` são rejeitados.
- Cada resposta JSON3 integral e não vazia gera um artefato original e um TXT derivado com todos os eventos de texto. Legendas automáticas podem ter eventos sobrepostos; o TXT não elimina palavras nem tenta reconstruir a fala.
- Nomes novos começam com `aq.` e incluem hash parcial. SHA-256 completo, tamanho, idioma, origem, data de aquisição, data de publicação quando disponível e limites temporais ficam no manifesto.
- Os arquivos brutos ficam em `../transcripts/local/`, ignorados pelo Git e destinados somente à pesquisa interna. A raiz absoluta consta em cada registro. Um commit dos manifestos não transporta o acervo para outra máquina.
- HTTP 429 interrompe o lote inteiro e impõe uma hora de pausa. Desafio de acesso interrompe e impõe 24 horas. Sem contorno por cookies, proxies ou identidade. Falhas não provam inexistência da faixa.
- Ausência de JSON3 por esse método fica pendente para revisão no painel nativo de transcrição. Descrição e capítulos nunca contam como transcrição.
- `exported_track` é o único sucesso criado pelo coletor. `full_transcript_read`, `full_video_watched`, `full_speech_coverage_verified` e `full_source_analyzed` continuam falsos.

## Retomar

Para a diretriz histórica vigente, usar explicitamente:

```sh
PYTHONPATH=/private/tmp/ganesha-research-tools \
  /Users/lucasmarques/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 \
  content/research/acquisition/collect_tracks.py --historical --max-videos 30 --pause-seconds 20
```

`--plan-only` gera a fila/checkpoint sem rede. A próxima execução reavalia o ledger e pula toda faixa já adquirida; os índices se referem ao snapshot indicado, e IDs permanecem a chave estável quando o inventário cresce. Uma pausa de acesso bloqueia também uma nova execução. A pontuação é triagem provisória de metadados, não estudo nem garantia de adequação.

Após o lote, `validate_historical_batch.py` verifica arquivos, hashes, consistência da posição e preservação dos flags canônicos previamente verdadeiros. O checkpoint do lote fica arquivado em `batches/<batch_id>.json`, ligado à cópia exata da fila em `queue-snapshots/<sha256>.json`; assim, rodadas futuras podem atualizar o checkpoint ativo sem perder a evidência anterior. Alterações legítimas do manifesto canônico pelo Diretor podem mudar seu hash sem representar regressão de estudo.

É necessário Python compatível com o yt-dlp instalado em diretório isolado. Na máquina desta aquisição:

```sh
PYTHONPATH=/private/tmp/ganesha-research-tools \
  /Users/lucasmarques/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 \
  content/research/acquisition/collect_tracks.py --max-videos 40 --pause-seconds 20
```

Se o diretório temporário de dependências desaparecer, reinstalar a mesma versão em ambiente isolado antes de retomar; não considerar esse caminho uma dependência portátil. **Sem `--ids`, o coletor só processa pendências explicitamente selecionadas em `curation.json`.** A opção `--ids ID ...` limita a execução àqueles IDs; não antecipa itens para depois continuar pelo histórico. O coletor pula IDs já adquiridos no seu manifesto ou no canônico. O checkpoint respeita a pausa também entre execuções.

```sh
python3 content/research/acquisition/verify_artifacts.py
python3 content/research/acquisition/build_curation.py
python3 content/research/acquisition/collect_tracks.py --report-only
```

A validação confirma existência, tamanho, SHA-256 e contagem dos cues; não confirma fidelidade à fala. Os resultados nunca devem ser apresentados como cobertura completa de um canal, da plataforma ou do audiovisual.
