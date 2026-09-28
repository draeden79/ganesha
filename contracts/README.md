# Contrato compartilhado v1

O arquivo `course.ts` é a referência estrutural sem dependência de framework. O Diretor mantém este contrato; alterações devem ser comunicadas antes de uma entrega incompatível. JSON de conteúdo não importa TypeScript, apenas segue o formato.

Arquivos esperados:

- `content/research/registry.json`: `ResearchRegistry` (Devorador); `sources.json` mantém o inventário editorial de fontes escolhidas.
- `content/curriculum/course.json`: `Course` (Educador).
- `content/locales/{locale}.json`: `LocaleCatalog` (Educador).
- Catálogos da UI no aplicativo: mesma política de chaves e cobertura (Construtor).

IDs usam ASCII estável, por exemplo `source.openai.codex.desktop`, `evidence.codex.workspace`, `competency.describe-outcome`, `lesson.first-project`, `step.first-project.check-scope`, `rubric.first-project`. Não dependem de índice, idioma ou posição. Reordenar não muda IDs. Remover um ID publicado exige migração.

`messageKey` aponta para texto traduzível. O valor é texto simples; código usa blocos próprios e direção LTR. O renderizador não interpreta HTML arbitrário dos catálogos. O conjunto de chaves requerido é derivado do escopo efetivamente liberado, incluindo variantes, avaliações e feedback. Se houver alternativa de estrutura já iniciada pelo Educador/Construtor, o Diretor pode registrar um adaptador em vez de bloquear a primeira aula.

## Invariantes além dos tipos

1. Referências de IDs e chaves existem e IDs são únicos no seu namespace.
2. Pré-requisitos não criam ciclos. Ordem é apresentação, não identidade.
3. Cada aula liberada tem prática e duas verificações em telas diferentes, de objetivos/critérios distintos; todas apontam para competências.
4. Cada etapa operacional inclui variantes para Claude e Codex. Uma explicação comum pode manter variantes vazias, explicitamente.
5. Cada `evidenceId` resolve no registro; datas e trechos são preenchidos a partir de consulta real.
6. Todas as chaves do escopo liberado existem em 11 catálogos, sem `pending`/`missing`/texto vazio e na mesma revisão da origem. `translated` indica tradução produzida; `reviewed` exige revisão declarada.
7. `published` é imutável. `preview` pode demonstrar conteúdo ainda em revisão com indicação honesta, mas não satisfaz o aceite de release.
8. Aula completa exige prática registrada e as duas verificações obrigatórias aprovadas. Não basta chegar à última tela.
9. Tentativas e progresso de versões antigas são preservados. Alterações incompatíveis nunca concedem aprovação automática.
10. Respostas de quizzes podem estar no bundle de demonstração. Isso não serve como certificação protegida ou avaliação antifraude.

## Semântica de avaliação

`single-choice`/`multiple-choice` têm opções com IDs estáveis e correção determinística. `artifact-review` tem checklist de critérios; `self-report` significa autoavaliação declarada, não avaliação por IA. Um artefato pode ser descrito ou revisado localmente sem upload de arquivos privados. Cada tentativa registra apenas os dados mínimos necessários.

## Atualização semanal

Uma `UpdateProposal` referencia fontes anteriores/novas, evidências alteradas, aulas e etapas afetadas, impacto, traduções e recomendação de versão. Proposta não altera automaticamente conteúdo publicado. A cadeia é: detecção → proposta → revisão pedagógica/técnica → tradução → testes → aprovação de release → publicação versionada.

## Auditoria executável

`python3 coordination/validate_content.py` verifica IDs, referências, pré-requisitos, prática, duas verificações, chaves e revisão de origem nos 11 locales. `--research-only` permite conferir o registro antes da chegada do currículo. O relatório diferencia tradução presente de revisão humana; não certifica qualidade linguística, pedagogia nem comportamento da UI. Testes do aplicativo e revisão visual continuam necessários.
