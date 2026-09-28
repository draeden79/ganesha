# Tradução direta — japonês e fragmento chinês de apps

2026-09-28. Tradução integral direta por agente de IA, sem serviço externo de tradução. Revisão humana pendente; não é certificação linguística.

Fonte congelada: `source-messages/en.json`, 1.192 chaves, SHA-256 `b6d7fb2a57d75927cd887986a9a7a3ae81f90b469eb199fc1f7717f376e1966e`.

- `source-messages/ja.json`: 1.192/1.192 chaves; conteúdo integral japonês, sem resumo ou fallback inglês. Inclui os seis ajustes de `TRANSLATION_DELTA.json`.
- `source-messages/zh-CN.part-asia.json`: 324/324 chaves dos prefixos `app-state.`, `app-storage.` e `app-delivery.`, tradução integral para mesclar com fragmentos de fundamentos/sites e automação de outros agentes.
- Coreano foi redistribuído pelo Diretor; este agente não criou nem alterou o catálogo coreano0.3.0. O chinês final será mesclado pelo coordenador.

Validações locais passaram: JSON válido, conjunto exato de chaves, valores string não vazios, nenhuma tradução idêntica à fonte inglesa, preservação de comandos entre backticks, URLs, nomes de arquivos, chaves de armazenamento, dataset, endereço fictício, horários, valores decimais e trecho JSON literal. O validador trata pontuação de fim de frase separadamente de URLs: dois trechos ingleses terminam `http://localhost:8000.`; o ponto é pontuação, não parte do endereço. Não se adicionou um ponto incorreto ao endereço traduzido.

Revisão de autoria: cada bloco foi traduzido após leitura, na ordem das chaves congeladas; os blocos só foram anexados após contagem igual à lista de chaves. Conceitos de simulação, auto-relato externo, resultado esperado, erro, limites locais e revisão humana pendente foram mantidos. A classificação de testes não virou alegação de execução.

O uso de um serviço externo de tradução foi rejeitado pela revisão automática por falta de autorização específica para exportar o currículo. Nenhum conteúdo curricular foi enviado. Todo conteúdo entregue aqui foi traduzido diretamente no agente, sem contornar a rejeição.

## Integridade dos arquivos entregues

- `ja.json` — 1192 chaves; SHA-256 `b3e431ddb6e9a9e13c389ca6b58b76c0f4a81553fc9d5b52d8df17bb57a6b487`.
- `zh-CN.part-asia.json` — 324 chaves; SHA-256 `d0359d6f0faab63158d5c0cb7e3dae66df6fe1ede204e47bcb50f968c5bb1d5c`.
