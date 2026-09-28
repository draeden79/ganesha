# Currículo Ganesha — beta 0.2.0

Percurso mínimo de quatro aulas práticas: fundamentos, site estático, app de tarefas e automação CSV. Cada aula tem seis telas, três práticas e duas verificações: 24 telas, 12 práticas e oito verificações. Site/app/automação dependem somente dos fundamentos.

**Beta pública de hackathon autorizada, com revisão pedagógica delimitada.** Curso `preview`, aulas `draft`, releases canônicos vazios. A aplicação usa allowlist beta explícita. Isso não equivale a uma aula estável validada com iniciantes. `BETA_REVIEW.md` explica o aceite, fontes e limites; `maturity.json` registra o estado vigente. O estado anterior da0.1.0 está preservado em `reviews/MATURITY_0_1_0.json`.

## Autoria e geração

- Edite `beta/{locale}.json`: fontes completas nos11idiomas. A estrutura tem21mensagens comuns e quatro linhas com16mensagens por aula.
- Execute `python3 content/curriculum/build_course.py`. Ele exige todos os idiomas e valida a forma antes de escrever; não traduz nem aplica fallback.
- `course.json` e `../locales/{locale}.json` são os artefatos canônicos renderizáveis. `messages/{locale}.json` é a cópia simples derivada, não a fonte desta versão.
- `contracts/course.ts`1.0.0 é mantido pelo Diretor. Nenhuma alteração de schema foi necessária.
- Versão0.2.0 e IDs novos de aulas/etapas/checks impedem equivalência automática com aprovações0.1.0. Preserve o histórico anterior separado.

Os textos e traduções foram produzidos por IA; revisão humana linguística está pendente. Árabe é RTL. Exemplos de resposta e de falhas são originais e explicitamente simulados. Execução externa é feita pelo aluno em sua ferramenta e registrada por autodeclaração. A Ganesha não controla Claude/Codex e não certifica execução por uma marcação de exercício.

Os arquivos L01_REFERENCE, L01_REVISION_PLAN, L01_WORKED_EXAMPLE e L01_DESKTOP_PRACTICE preservam o desenvolvimento editorial anterior. MAPA_CURRICULAR e RESEARCH_PRIORITIES são planejamento; não são catálogo de aulas liberadas. AUDIT/PROTOTYPE_VALIDATION são auditorias históricas0.1.0, não aprovação desta beta. O gate canônico de release deve continuar rejeitando releases vazios; não enfraquecê-lo para demonstrar a beta.
