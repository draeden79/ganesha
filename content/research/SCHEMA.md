# Formato e integração

Versão da pesquisa: 1. Registro de curso: ResearchRegistry 1.0.0 do Diretor.

`registry.json` é a interface canônica de consumo pelo currículo. `sources.json` é o inventário das nove coleções aprovadas. Cada recurso dessas coleções recebe `res-...` em `resources.jsonl`, que vira Source no registry; evidência consumida recebe `ev-...`. Não usar ID de coleção no lugar de Source.id. Não renomear IDs consumidos por aulas.

| Campo da ficha | Regra |
| --- | --- |
| canonical_url / aliases | URL primária e redirecionamentos confirmados; UTMs removidos para deduplicar. URLs de vídeos normalizadas por ID. |
| published_at | Data de publicação original, somente com evidência. Nunca usar a data do crawl. |
| updated_at | Data explícita da atualização, ou null. Texto relativo fica em update_date_evidence sem falsa precisão. |
| first_seen_at / last_checked_at | Observação da coleta. O primeiro lote preserva somente o dia conhecido; quando há instante de captura registrado, usar ISO 8601 UTC. Não inventar horário individual por chamada. |
| themes | primeiros-passos, prompts, contexto-harness, planejamento, construcao, design, revisao-testes, publicacao, automacoes. |
| tools / tool_version | Superfície explicitada. null quando a versão não foi informada; não escolher um modelo por memória. |
| level | beginner/intermediate/mixed; classificação editorial, não certificação da fonte. |
| access | Estado, método e escopo realmente lido; video_watched e transcript_read separados. |
| ingestion_status | catalog_indexed, excerpt_ingested ou discovered_only. |
| original_summary | Síntese original em pt-BR, limitada ao material acessado. |
| evidence | Trecho curto + URL + seção, linha da captura ou timestamp. Até 25 palavras de citação por recurso. |
| dedupe_key | URL canônica normalizada. |
| fingerprint | SHA-256 do registro normalizado; exclui datas de observação e o próprio hash. Não é hash de vídeo, transcrição nem página integral. |
| freshness / limitations | Recência, risco de mudança, conflitos e limites de uso. |

O hash detecta alterações no material registrado. Ele não prova que a página inteira ficou inalterada. Por isso a rotina revisita as seções sensíveis, índices e documentos vivos. Alterar só a data de consulta não gera novidade. Evitar reescrever resumos sem mudança de conteúdo; uma correção editorial legítima também pode produzir um diff e precisa de revisão.

No contrato estreito do Diretor, Source.availability=verified significa que a seção indicada foi acessada. Não significa que todo um curso, vídeo ou artigo pago foi ingerido. Evidence.caveat preserva o limite de leitura; fichas completas são a fonte de auditoria. Recursos discovered_only não geram Evidence. Campos de pesquisa adicionais não precisam ser expostos na interface do aluno.

`update-proposals.json` contém apenas propostas. A versão-base é a versão observada do curso e precisa ser conferida na integração. O Diretor/Educador decidem aceitação, versão, migração e idiomas afetados. Esta pesquisa não edita aula publicada. `preserveProgress: true` é a recomendação para correção de rótulos; rever se a decisão pedagógica exigir nova avaliação.

`research.py` usa apenas Python 3.9+ e biblioteca padrão. Não busca páginas e não transcreve vídeos; recebe lotes com leitura já verificada. Execute uma escrita por vez. Arquivos de dados são substituídos individualmente de forma atômica; usar Git como checkpoint e revisar o log em caso de interrupção entre arquivos.
