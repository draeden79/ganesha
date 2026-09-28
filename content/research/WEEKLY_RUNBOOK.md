# Prioridade atual: curadoria relevante e estudo profundo

Diretriz posterior do usuário em 2026-09-28: não há tempo para consumir todo o histórico antes de criar o curso. Priorizar pessoas comuns usando IA para construir sites, apps simples e automações. O inventário amplo permanece como backlog; coleta exaustiva não bloqueia as aulas. Ver `CURATION_PLAN.md` e `curation.json`. Triagem pode usar metadados; conteúdo que sustenta aula exige estudo integral do recurso selecionado e revisão visual pertinente. As orientações históricas abaixo só valem quando compatíveis com esta prioridade.

# Varredura semanal e expansão histórica

Automação informada pela sessão de origem: `devorador-atualiza-o-semanal-das-fontes`, ACTIVE, sexta-feira 09:00, America/Los_Angeles, anexada à tarefa Devorador `01a0e952-8940-75d0-b32e-52078719adc0`. Não criar outra. Este arquivo descreve o procedimento; não é uma segunda automação.

## Prioridade vigente: inventário integral e transcrições

A diretriz explícita de 2026-09-28 substitui o encerramento anterior: obter as transcrições de **todos os vídeos** das fontes prioritárias, incluindo histórico e incorporações. As fontes não são exclusivas. Seguir `TRANSCRIPTION_PLAN.md`; retomar o ledger `video-inventory/videos.jsonl` e o manifesto `transcripts/manifest.json`. Nunca limitar a varredura a recentes ou declarar 100% sem denominador conhecido.

Antes de cada lote, conferir `video-inventory/coverage.json` e as filas de páginas. As abas públicas dos cinco canais foram paginadas até o fim, mas playlists, podcasts, incorporações e itens inacessíveis ainda exigem reconciliação. Arquivos exportados são distintos de conteúdo lido e de cobertura da fala verificada.

## Ciclo incremental

1. Ler sources.json, resources.jsonl, ingestion-log.jsonl, queue.json e a versão vigente do curso. Validar antes de começar: `python3 content/research/research.py validate`.
2. Consultar os nove índices prioritários e fontes complementares pertinentes. Na newsletter usar /archive se a home continuar vazia. Em canais, tentar página de vídeos e metadados públicos. Se a ferramenta só expuser navegação, registrar falha/limitação; não concluir ausência de novos uploads.
3. Comparar URLs canônicas/IDs com o catálogo. Processar conteúdos novos ou alterados. Documentos vivos de Desktop, Artifacts, permissões e automações devem ser revisitados mesmo sem nova URL. Usar fontes oficiais para conferir interfaces, modelos e comandos. Datas desconhecidas permanecem null.
4. Para cada candidato, abrir o recurso primário e ler apenas o que estiver acessível. Em vídeo, obter transcrição acessível e registrar idioma, origem manual/automática/desconhecida, intervalos realmente disponíveis e lidos, URL/ID, datas, artefato local e hash; título, descrição ou capítulos não bastam. Não usar resumo de terceiro como se fosse o vídeo, não contornar assinatura e não contornar restrições de acesso. Guardar síntese própria e evidência curta.
5. Preparar um JSONL temporário com somente fichas novas/reconsultadas no formato documentado. Preservar o resumo quando nada mudou. Ao editar uma ficha, remover fingerprint/dedupe_key antigos; a ferramenta recalcula. Declarar redirecionamentos confirmados em aliases para preservar IDs.
6. Preparar opcionalmente JSON de observações: `[{"source_id":"riley-brown-youtube","status":"index_unavailable","checked_at":"2026-10-02T16:00:00Z","detail":"Exemplo de formato: substituir pelo resultado real da consulta."}]`. Valores são exemplo, não evidência de execução futura. Registrar cada acesso real, inclusive falhas.
7. Revisar o diff: `python3 content/research/research.py diff --batch /tmp/ganesha-batch.jsonl --observations /tmp/ganesha-observations.json`. Aplicar com `python3 content/research/research.py apply --batch /tmp/ganesha-batch.jsonl --observations /tmp/ganesha-observations.json --run-id weekly-AAAA-MM-DD`. Para uma coleta só de observações, passar JSONL vazio. Repetir o mesmo run-id/lote não duplica o log; reutilizar ID com conteúdo diferente falha.
8. Falhas ficam no log e não apagam evidência previamente lida. sources.json é o inventário-base: o estado mais recente de acesso fica nas últimas observations do ingestion-log.jsonl. Se um recurso antes lido mudar, preservá-lo no Git e registrar o novo hash; se ficar indisponível, registrar a falha sem inventar nova leitura.
9. Gerar relatório legível apenas com o que mudou, a cobertura real e lacunas. Atualizar conflitos/queue. Para novidades que afetem aulas, preencher UpdateProposal com versão-base real, IDs existentes, competências/telas atingidas, risco e todos os 11 locales. Não escrever nas aulas nem aceitar a proposta automaticamente.
10. Validar, conferir mudanças e fazer commit local. Enviar ao Diretor `01a0e952-1611-7c60-9b42-115d061cd07a` e Educador `01a0e952-e209-7551-a613-65cca61cee14` caminho absoluto, commit, achados e impactos. Notificar somente novidade útil, mudança significativa de acesso, falha nova ou ação necessária. `notify` do script é um sinal para revisão; não envia mensagem. Repetição sem mudança relevante fica silenciosa.

## Recuperação e cobertura

Rede, autenticação ou máquina indisponível não equivale a zero novidades. Registrar o que não foi possível checar e não avançar um marco de cobertura completa. Não executar coleta paga/privada sem acesso autorizado. Não emitir certificado de conteúdo consumido para vídeo não assistido.

O histórico completo tem prioridade P0 em queue.json, com pendências por vídeo no ledger. Backfill ocorre em lotes identificados separados da varredura incremental; não reler o catálogo inteiro toda sexta-feira. O denominador total de vídeos/artigos é desconhecido enquanto a paginação não terminar. Os 11 idiomas não estão prontos por existir este inventário: o material interno é pt-BR, e toda adaptação visível precisa de tradução/revisão no currículo.

A rotina local precisa conservar acesso a este repositório e aos arquivos de pesquisa. Se o worktree for removido, o Diretor/origem deve atualizar o destino existente da automação. Não criar duplicata como atalho.

## Recuperação confirmada no YouTube

Abrir a descrição e “Mostrar transcrição” antes da exportação nativa. Um erro inicial ou aviso do player de que não há legendas não prova ausência. Preservar TXT e, quando acessível, JSON3 com tempos finais. HTTP 429 exige pausa e tentativa posterior, registrada por ID; não insistir trocando identidade. Guardar brutos em `transcripts/local/` para consulta interna e publicar apenas manifestos/sínteses. Não replicar transcrições no site.

Comandos do inventário: `python3 content/research/video_inventory.py build` e `python3 content/research/video_inventory.py validate --artifacts`. A validação com artefatos requer a raiz absoluta registrada no manifesto. `collect_videos.py` usa yt-dlp instalado separadamente; `collect_embeds.py` salva checkpoint por página pública e não conclui um índice renderizado por JavaScript.
