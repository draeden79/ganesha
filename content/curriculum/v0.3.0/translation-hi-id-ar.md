# Tradução 0.3.0 — hi / id / ar

Entrega local concluída em 2026-09-28, aproximadamente 21:34 UTC. **Hindi e indonésio estão completos.** Árabe foi transferido ao Diretor e sua equipe; nenhum catálogo árabe 0.3.0 foi criado ou modificado por este agente.

## Fonte e método

Fonte final: `source-messages/en.json`, **1.192 chaves**, SHA-256 `b6d7fb2a57d75927cd887986a9a7a3ae81f90b469eb199fc1f7717f376e1966e`.

Método efetivo dos dois catálogos: tradução direta pelo agente nesta sessão, escrita e consolidada localmente por grupos de aulas. Sem resumo, fallback inglês ou tradução externa do catálogo. Inclui os seis ajustes de `TRANSLATION_DELTA.json`, inclusive ensaio explícito da rotina, análise do disparo não ocorrido, aba Code do Claude Desktop e atualização do importador na cópia de teste.

A revisão humana de idioma permanece pendente. Verificações estruturais e de literais não equivalem a essa revisão nem a validação operacional das aulas.

## Entregas e verificações

| Catálogo | Chaves | SHA-256 |
| --- | ---: | --- |
| `source-messages/id.json` | 1.192 | `1676bb4491a432aa502f2eaf02ca0c3d514dc5480ffe5824acd38ca5f52ba885` |
| `source-messages/hi.json` | 1.192 | `8ea8b2cf2bd84a4a5174f9e06e14513fb056c7cfbc8a47f1dbce89540fc6713d` |

Ambos passaram: JSON válido; conjunto e ordem de chaves correspondentes à fonte; todos os valores strings não vazias; zero valores inteiros idênticos ao inglês; todos os módulos e suas avaliações presentes. Comparação por chave confirmou quantidades e conteúdo literal de comandos entre backticks, nomes de arquivos, números, conjunto CSV, chaves `ganesha.tasks.v1`/`ganesha.tasks.test`, endereço fictício e fuso. URLs foram comparadas desconsiderando somente pontuação final de frase. O objeto JSON do exemplo de importação permanece literal.

Preservadas as distinções editoriais: observação versus simulação, erro versus sucesso, HTML/download versus substituição Python, ativação de agenda opcional condicionada aos testes/acesso, conferência do primeiro disparo e pausa.

## Bloqueio de serviço externo

Antes da tradução local, foram feitos cinco pedidos HTTP de disponibilidade com quatro frases genéricas de teste escritas pelo agente, sem chaves ou texto do catálogo, para `translate.googleapis.com`, `translate.google.com` e `lingva.ml`. A tentativa de executar o lote completo foi rejeitada pela revisão automática antes de iniciar o processo, por falta de autorização explícita para divulgação do currículo ao destino. **Nenhuma string do catálogo foi enviada.** Não houve nova tentativa de envio após a rejeição; nenhuma resposta externa foi usada nos catálogos entregues. O coordenador foi informado imediatamente.

Sem commit; sem alterações no pacote canônico 0.2.0, gerador ou aplicativo durante esta tradução.
