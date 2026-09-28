# Inventário integrado do conteúdo

`items.jsonl` reúne URLs conhecidas de vídeos, páginas descobertas, recursos e estudos. `coverage.json` apresenta contagens derivadas desses registros. Gerar novamente com `python3 content/research/content_inventory.py`, depois de integrar os estudos e reconstruir o inventário de vídeos.

Este índice apoia a instrução do usuário de 28/09/2026: consumir e organizar todo o conteúdo acessível das nove fontes prioritárias. A pertinência ao curso define a ordem e a classificação; não elimina permanentemente o histórico. Fontes complementares, como documentação de publicação, também aparecem quando efetivamente usadas.

Os números representam **URLs conhecidas**, não um arquivo histórico já fechado. Há páginas de índice, questionários, utilidades e candidatos a artigo. Uma aula e seu vídeo têm URLs distintas e podem compartilhar um estudo. O total não é uma contagem de obras únicas nem prova de que todos os arquivos históricos foram descobertos. Não calcular percentual definitivo de conclusão enquanto `historical_denominator_verified=false`.

- `transcript_status`: disponibilidade de uma faixa textual; não comprova sua leitura.
- `text_fully_read`: declaração de leitura integral apoiada pelo manifesto de estudo e verificada pelo integrador.
- `source_fully_analyzed`: escopo integral explicitamente declarado no estudo; documentos textuais e vídeos possuem exigências diferentes.
- `full_video_watched`: revisão contínua integral; imagens de momentos isolados não satisfazem esse estado.
- `access_issue`: barreira observada, ainda pendente de resolução ou reavaliação.
- `registry_ingestion_status`: estado legado do catálogo; `excerpt_ingested` não é convertido em leitura integral.

Os arquivos originais internos e capturas são referenciados por hash nos manifestos e ficam ignorados pelo Git. O índice público de pesquisa contém identidade, proveniência, análise original e pendências; não republica os textos completos dos autores.

Cada entrega continua disponível ao Educador com seu alcance declarado. O objetivo integral permanece ativo enquanto houver aquisição, estudo, revisão ou reconciliação pendente; a existência de material suficiente para uma aula não encerra esse trabalho.
