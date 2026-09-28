# Lote de aquisição e estudo — 2026-09-28

Checkpoint em 2026-09-28T19:33:51.941658+00:00. Este relatório é um snapshot; `video-inventory/coverage.json` e os manifestos podem avançar nos lotes seguintes.

Inventário deduplicado: **4851 vídeos YouTube**. **3 faixas exportadas**, **1 faixa textual integralmente lida e analisada**, **0 audiovisuais integralmente estudados**, **0 transcrições com cobertura de toda a fala verificada**. Restam 4848 vídeos catalogados sem transcrição. Não há declaração de cobertura de 100%.

| Fonte | Vídeos YouTube descobertos | Faixas exportadas | Faixas integralmente lidas | Sem transcrição |
| --- | ---: | ---: | ---: | ---: |
| peter-yang-youtube | 301 | 1 | 0 | 300 |
| peter-yang-newsletter | 0 | 0 | 0 | 0 |
| riley-brown-youtube | 230 | 0 | 0 | 230 |
| tech-with-tim-youtube | 2191 | 1 | 1 | 2190 |
| designcourse-youtube | 1496 | 0 | 0 | 1496 |
| builder-blog | 96 | 0 | 0 | 96 |
| nate-herk-youtube | 525 | 1 | 0 | 524 |
| claude-academy | 1 | 0 | 0 | 1 |
| openai-learn-codex | 11 | 0 | 0 | 11 |

Um vídeo ligado por mais de uma fonte aparece em suas respectivas linhas; o total global é deduplicado por ID. O zero na newsletter significa ausência de IDs incorporados já consolidados neste checkpoint, não ausência de vídeos nessa fonte.

## Inventário realizado

- Cinco canais: 4.743 uploads públicos paginados até o fim, sem erros/avisos: Peter 301; Riley 230; Tech With Tim 2.191; DesignCourse 1.496; Nate 525. Inclui vídeos, Shorts e transmissões disponíveis. Ainda faltam playlists/podcasts, vídeos não listados descobertos em outras páginas e impedimentos identificáveis.
- OpenAI Learn Codex: onze links YouTube na página renderizada; outras páginas educacionais relacionadas ainda precisam de reconciliação.
- Claude Academy: 313 páginas HTML públicas percorridas dentro dos dez cursos, fila HTML esgotada sem erro. O primeiro player foi identificado na página renderizada; o HTML inicial omite players. Inspeção renderizada das demais aulas continua pendente.
- Builder: 554 páginas públicas percorridas, fila de links HTML esgotada, sete URLs com erro específico registrado. Inclui páginas de índice e artigos; não chamar esse total de 554 artigos lidos. Inspeção renderizada pode revelar players adicionais.
- Newsletter: 37 permalinks vistos na paginação renderizada até agora; o arquivo ainda não foi esgotado. Dois artigos do corpus inicial foram lidos apenas até a barreira de assinatura.

## Artefatos reais e limites

`transcripts/manifest.json` registra os originais locais por tamanho, SHA-256, idioma, origem e cues. Há três TXT nativos e três arquivos JSON3, referentes a três vídeos:

| Vídeo | Faixa | Último início / fim conhecido | Estado |
| --- | --- | --- | --- |
| ntDIxaeo3Wg — Tim | en-CA, authored-or-unspecified; alternativa automática en | TXT 35:36; en-CA JSON3 fim 35:40,3; automático fim 35:46,514; vídeo 35:48 | Toda faixa en-CA lida, 706 cues; estudo original feito; visual e cobertura da fala pendentes |
| bdMHQLvtVaQ — Peter | en, automática | TXT último início 53:50; fim não fornecido; vídeo 53:52 | Faixa exportada; estudo ainda pendente neste checkpoint; JSON3 bloqueado por HTTP429 |
| saggDHHnmtQ — Nate | en, automática | TXT último início 36:55; JSON3 fim 36:58,16; vídeo 36:57 | Faixa exportada; estudo pendente; timing ultrapassa duração e requer revisão |

Os arquivos brutos ficam em `transcripts/local/`, ignorados pelo Git e disponíveis no caminho absoluto do manifesto. Não há licença/autorização de republicação registrada. O HTML público e as aulas não devem incorporar automaticamente esses textos na íntegra. Para auditoria, preservar links para a fonte e o caminho do acervo interno.

## Conteúdo realmente estudado

A ficha `studies/ntDIxaeo3Wg.md` resulta da leitura sequencial de todas as linhas do TXT de Tim (1–711), não de capítulos ou busca por palavras. Ela registra os dois jogos, Git/GitHub, falhas, planejamento, contexto persistido, tarefas e limites de assuntos apenas apresentados. Ainda não certifica estudo integral do audiovisual.

As 23 fichas do ciclo anterior representam 4 índices, 16 leituras por seções e 3 vídeos catalogados por metadados. Não foram reclassificadas retroativamente como estudo integral. `STUDY_PROTOCOL.md` define o novo estágio.

## Bloqueios e próximas ações

- Peter JSON3: HTTP429, manter TXT já adquirido e tentar timing em lote posterior após pausa.
- Tim: exportação nativa direta inicialmente falhou; descrição + Mostrar transcrição recuperou a faixa. Incorporado ao runbook.
- Academy: players omitidos no HTML inicial; fazer reconciliação renderizada. Uma consulta HTTP adicional sem os mesmos cabeçalhos do crawler retornou403; o Browser mostra a aula pública. Não usar esse erro para inferir ausência.
- Builder: sete falhas por URL estão em `page-discovery/builder-blog.json`; inspecionar sem apagar a descoberta.
- Nenhum denominador completo por fonte está certificado. Datas exatas da maioria dos vídeos ainda são pendentes de consulta ao vídeo.

## Continuidade e validação

Usuário autorizou três agentes paralelos: aquisição de legendas; estudo integral dos vídeos; estudo integral das fontes oficiais e Builder para a auditoria do Educador. O Devorador coordena descoberta, validação e integração. Diretórios separados evitam sobrescrever dados.

Onze testes de pesquisa/identidade de vídeo passaram. O corpus anterior segue validado (23 fichas). O inventário e os hashes locais dos seis artefatos de legenda foram validados. Nenhuma aula foi alterada. A automação semanal existente permanece única; retoma o ledger.
