# Pesquisa da Ganesha — primeiro lote

Responsável: Devorador. Escopo exclusivo: `content/research/`. Referência temporal: 28/09/2026. Este material é interno e em pt-BR; não é conteúdo pronto para o site nem tradução concluída nos 11 idiomas.

- `sources.json`: nove fontes aprovadas, estado de acesso e cobertura.
- `resources.jsonl`: uma ficha por URL/recurso, IDs estáveis, datas, síntese original e evidência curta.
- `EARLY_BATCH.md`: entrega curta para orientar o Educador agora.
- `registry.json`: ResearchRegistry 1.0.0 canônico para o currículo.
- `REPORT-2026-09-28.md`: fechamento da ingestão inicial e cobertura atual.
- `SCHEMA.md` e `WEEKLY_RUNBOOK.md`: campos, integração e procedimento repetível.
- `queue.json`, `conflicts.json` e `update-proposals.json`: pendências e propostas sem alterar aulas.
- `ingestion-log.jsonl`: histórico de lotes e observações de acesso.
- `research.py`: validação, deduplicação, importação incremental e exportação do registry; Python padrão, sem chamadas de rede.

Validação: `python3 content/research/research.py validate`. Testes do processamento: `python3 -m unittest discover -s content/research -p 'test_*.py'`.

Estados: `catalog_indexed` = índice/programa consultado; `excerpt_ingested` = texto das seções indicadas lido; `discovered_only` = apenas localização/metadados. Vídeos não são marcados como assistidos por terem descrição. `partial` respeita a barreira de assinatura. Datas desconhecidas são `null`; consulta/crawl não substituem publicação ou atualização.

As docs oficiais complementam os hubs escolhidos para conferir comportamentos de produto. Fonte secundária pode localizar um candidato, mas não fundamenta as instruções técnicas. Nenhuma assinatura ou barreira de acesso foi contornada. Não guardamos cópias integrais dos artigos. As evidências são localizadas por URL e seção; números de linha descrevem a captura desta consulta e podem mudar.

O Educador escolhe competências, pré-requisitos, quantidade de aulas e etapas. Propostas de prática nas fichas são sugestões autorais da Ganesha, não exercícios copiados. Cada aula terá prática e duas verificações em telas distintas conforme o contrato geral. Simulações devem ser identificadas e não podem alegar execução real das ferramentas.
