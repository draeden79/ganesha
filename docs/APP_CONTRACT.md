# Contrato do aplicativo — Construtor

Branch `codex/construtor-app`; Next.js App Router + React + TypeScript. Sem landing page, cadastro ou cobrança.

## Conteúdo para o Educador

`src/lib/course-schema.ts` contém o contrato TypeScript inicial. Cada Course tem `id`, `version`, `locale`, `translationStatus`, `title`, `description`, `lessons`. IDs de aulas/etapas/opções são iguais nos 11 idiomas. Cada Lesson tem `id`, `title`, `summary`, `durationMinutes`, `steps`. Cada Step tem `id`, `type` (instruction/practice/check/reflection), `title`, `body` (parágrafos), `toolNotes` opcional (`claude`, `codex`), `example` opcional. Practice: `practice.placeholder`, `criteria` (strings), `feedback`. Check: `check.prompt`, `choices` ({ id, text, feedback }), `correctChoiceId`. Pelo menos uma prática e duas etapas check por aula. Sem limite fixo de aulas ou etapas.

O contrato canônico final é `contracts/course.ts`, do Diretor. `src/lib/course-schema.ts` é apenas o view model; `src/lib/course-adapter.ts` já consome os dados reais do Educador em `content/curriculum/course.json` e `content/locales/*.json`, preservando IDs, objetivos, ações, resultados, dicas, critérios, status de tradução e evidenceIds. Nenhum fixture pedagógico concorrente é publicado. Texto alternativo e material visual seguem os mesmos locales. Cada etapa tem uma tela. Fontes pedagógicas estão documentadas junto ao curso.

## Sessão e acesso

`/course/[locale]` é uma demonstração pública claramente rotulada. Nunca usa parâmetros de URL ou localStorage como prova de direito de acesso. `/learn/[locale]` e `/api/progress` reservam o percurso protegido e sempre consultam o adaptador de servidor antes de conteúdo/dados protegidos.

O adaptador de cadastro/pagamentos deverá entregar identidade validada no servidor, entitlement `ganesha-course`, expiração e revogação; cookie HttpOnly/Secure/SameSite ou provedor de sessão equivalente. Não aceitar `userId`, plano ou entitlement enviados pelo cliente como autorização. Sem integração configurada, o percurso protegido falha fechado. Nenhuma chave de IA no cliente.

O modo demo persiste respostas, tentativas e progresso somente no navegador por versão de curso. Não há autenticação, progresso remoto, tutor ao vivo ou execução real de Claude/Codex. A futura API de progresso deve usar identidade da sessão, validar IDs/versão, isolar usuários e aplicar CSRF/origem às mutações.

## Localização

Locales obrigatórios: pt-BR, en, es, fr, de, ja, hi, id, ar, ko, zh-CN. Catálogos de UI e conteúdo separados; falta de tradução sinalizada, nunca contabilizada como pronta. Árabe usa `dir=rtl`; código mantém `dir=ltr`. Auditoria testa paridade de chaves, IDs e etapas. Tradução automática/editorial pendente é reportada como rascunho.
