# Aquisição retomável de faixas completas

Este diretório é uma entrega intermediária de aquisição e curadoria. **Faixa exportada não significa estudo integral nem cobertura de fala verificada.** Em 2026-09-28 o usuário mudou a prioridade: selecionar fontes práticas para pessoas comuns criarem sites, apps simples e automações. A fila histórica foi interrompida após `iqNzfK4_meQ`; os onze vídeos já adquiridos foram preservados. Ela não é mais a fila ativa nem a meta imediata.

`curation.json` registra critérios, seleção por lacuna de aprendizagem, rejeições/reservas, público, pré-requisitos confirmados ou estimados, atualidade, duplicação e próxima ação. `build_curation.py` materializa essa decisão editorial e atualiza apenas a evidência de aquisição. A escolha não usa quota de vídeos ou canais. O caso principal de site é Riley `SKBDC3QugZw`; Tim `GUgxx6fMiR8` fica em reserva somente se houver lacuna material.

O coletor não modifica os manifestos canônicos. Seus resultados ficam em `manifest.jsonl`, as tentativas em `attempts.jsonl`, o checkpoint em `state.json`, a seleção ativa em `active-selection.json` e as contagens em `coverage.json`. O inventário completo continua registrado em `queue.json` para descoberta e auditoria, sem disparar aquisição. O Diretor pode integrar os resultados ao ledger depois de verificar os artefatos.

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
