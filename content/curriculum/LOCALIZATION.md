# Cobertura de localização L01

Data: 2026-09-28. Versão `0.1.0`. Cobertura de **conteúdo da aula**, não da interface do aplicativo. O Construtor mantém os catálogos de UI separadamente.

Esta cobertura pertence ao **protótipo pedagógico provisório**, reclassificado como `draft`. A completude dos textos traduzidos não demonstra estudo integral das fontes nem prontidão da aula. Nenhuma revisão de tradução foi realizada nesta reclassificação.

| Locale | Mensagens requeridas/presentes | Direção | Revisão humana |
| --- | --- | --- | --- |
| pt-BR | 112/112 | LTR | pendente |
| en | 112/112 | LTR | pendente |
| es | 112/112 | LTR | pendente |
| fr | 112/112 | LTR | pendente |
| de | 112/112 | LTR | pendente |
| ja | 112/112 | LTR | pendente |
| hi | 112/112 | LTR | pendente |
| id | 112/112 | LTR | pendente |
| ar | 112/112 | RTL | pendente |
| ko | 112/112 | LTR | pendente |
| zh-CN | 112/112 | LTR | pendente |

Total: 1.232 mensagens localizadas. O conjunto inclui título, resumo, competências, objetivos, instruções, exemplos, alternativas, feedback, dicas, rubricas, avisos de simulação/execução externa, orientações das duas ferramentas e descrições de recursos visuais. Zero chaves ausentes, vazias, pendentes de tradução ou de revisão de origem. Não há fallback entre idiomas.

Todos os textos foram redigidos/localizados por IA. `translated` significa texto produzido, não revisão de um especialista nativo. Mesmo pt-BR continua com `humanReviewStatus=pending`: nenhuma revisão humana foi declarada nesta entrega. Não usar a auditoria estrutural como certificação de fluência ou qualidade pedagógica. Chinês simplificado (`zh-CN`) segue a hipótese inicial comunicada ao usuário.

## Consistência e acessibilidade

Claude, Claude Code, Codex, Ganesha e rótulos reais Code/Chat/Local permanecem nomes próprios. Objetivos, rubricas, respostas corretas e IDs são comuns; a correção não depende das palavras traduzidas. Troca de idioma não altera o critério nem a resposta salva.

Árabe exige `dir=rtl` e isolamento bidirecional de nomes latinos, URLs e código quando misturados ao texto. Textos longos devem quebrar naturalmente. Figtree precisa de fontes complementares para árabe, devanágari, japonês, coreano e chinês. O teste visual dessas fontes, de foco e de ausência de overflow pertence ao app integrado e não foi substituído por esta auditoria.

Os visuais usam texto HTML e as chaves `*.visual` para descrição/legenda. Imagens decorativas não substituem explicações. Não renderizar um texto alternativo como se houvesse uma captura real da ferramenta. Em um diagrama HTML, evitar leitura duplicada quando a legenda e os elementos já expressam a mesma informação.

## Auditoria e manutenção

`AUDIT.json` preserva o resultado estrutural histórico da entrega `4525851`, anterior à retirada do status `ready`. Seus metadados deixam explícito que não é um aceite pedagógico atual. Os vínculos temporários usados apenas para a auditoria não alteraram outros worktrees. O estado vigente de maturidade está em `maturity.json`.

No checkout integrado:

```sh
python3 content/curriculum/build_course.py
python3 coordination/validate_content.py
```

Após a reclassificação, a segunda chamada deve rejeitar o release por falta de aulas liberadas. Isso não significa perda de traduções. A auditoria pedagógica não modifica o texto dos catálogos.

Editar `messages/{locale}.json`, nunca só o catálogo gerado. Alteração no significado de uma pergunta ou na resposta correta exige rever todos os idiomas e decidir migração de progresso. Revisão humana futura deve ser registrada por idioma/chave e preservada pelo processo editorial; o gerador atual identifica todos como textos produzidos por IA e não inventa nomes de revisores.

## Atualização da beta0.2.0

A fonte vigente passou a `beta/{locale}.json`; `messages/{locale}.json` é derivado pelo gerador. As contagens112/1.232 acima descrevem a versão0.1.0. A0.2.0 tem quatro aulas, mantendo11idiomas sem fallback, autoria por IA, revisão humana pendente e árabe RTL. `BETA_VALIDATION.json` registra a contagem e conferência desta edição. Aprovações linguísticas humanas não são inferidas da validade de JSON ou da revisão pedagógica em português.
