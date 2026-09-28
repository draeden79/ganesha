# Currículo Ganesha

Responsável: Educador. Idioma de trabalho da equipe: português brasileiro.

## Estado desta entrega

**L01 é conteúdo provisório de protótipo, não aula pedagogicamente concluída.** Há sete telas, quatro exercícios e duas verificações em dados. O primeiro lote do Devorador foi lido como pacote de descoberta (`EARLY_BATCH.md` e `registry.json`, commit `c531c9e`), com vínculos conferidos no registro expandido `5226254`. Ler essas sínteses não equivale a estudar integralmente as fontes.

Os 11 idiomas mantêm 112 mensagens por catálogo, totalizando 1.232 mensagens localizadas. A auditoria estrutural anterior passou, mas não avaliou estudo integral, qualidade da sequência ou aprendizagem. Revisão humana de linguagem segue pendente em todos. A classificação anterior `lesson.status=ready` foi retirada: agora a aula é `draft`, o curso continua `preview` e `releasedLessonIds` está vazio. Nenhuma versão publicada foi alterada. O protótipo visual pode ser examinado em modo de demonstração explicitamente provisório, sem passar pelo aceite pedagógico de release.

O produto atende iniciantes que querem construir e publicar um site/aplicativo ou automatizar uma tarefa. A primeira trilha proposta usa um projeto pequeno e progressivo: um site de apresentação de um serviço fictício, com uma ação de contato. O recorte evita que autenticação, pagamentos ou dados pessoais dominem a primeira experiência.

O mapa de expansão é planejamento editorial, não catálogo disponível. A interface só deve anunciar como disponível uma aula com dados, traduções e interações realmente entregues.

## Arquivos

- `MAPA_CURRICULAR.md`: progressão, pré-requisitos e evidências de aprendizagem.
- `CONTRATO.md`: contrato entre currículo, design e implementação.
- `course.json`: aula, etapas, competências, rubricas e avaliações sem depender de idioma.
- `messages/{locale}.json`: fontes editoriais simples dos 11 catálogos.
- `../locales/{locale}.json`: catálogos canônicos consumidos pelo aplicativo, com revisão de origem e estado de tradução.
- `build_course.py`: geração determinística de estrutura e catálogos; não traduz nem aplica fallback.
- `evidence-bindings.json`: vínculos por etapa e ferramenta para o registro do Devorador.
- `L01_REFERENCE.md`: proposta de sequência e vínculos de descoberta; não certifica estudo integral.
- `PEDAGOGICAL_AUDIT.md` e `maturity.json`: sustentação por etapa, lacunas, solicitações ao Devorador e critérios para reavaliação.
- `RESEARCH_PRIORITIES.md`: seleção atual de poucos recursos completos por lacuna, com avanço independente do inventário inteiro.
- `L01_REVISION_PLAN.md`: proposta de aprofundamento e ajuste de escopo da aula, sem conteúdo novo liberado.
- `L01_WORKED_EXAMPLE.md`: exemplo original interno de pedido, plano simulado, revisão e conferência; ainda não integra o produto ou os catálogos.
- `L01_DESKTOP_PRACTICE.md`: percurso externo proposto para Claude e Codex, com pré-requisitos, registro autodeclarado e recuperação; ainda sem execução/validação visual.
- `reviews/`: pareceres incrementais sobre originais efetivamente lidos, com aceites e limites; não substituem o estado global de maturidade.
- `LOCALIZATION.md` e `AUDIT.json`: cobertura efetiva e resultado estrutural histórico, sem certificação pedagógica.

O contrato canônico é `contracts/course.ts`, mantido pelo Diretor. Gere os arquivos com `python3 content/curriculum/build_course.py`. O gate de release `python3 coordination/validate_content.py` deve rejeitar este protótipo sem aulas liberadas; não enfraquecer o gate para manter a demonstração navegável. O Diretor e o Construtor coordenam o percurso de preview separado da liberação.

## Limites

Não há integração do Ganesha com Claude ou Codex implícita no conteúdo. A prática dentro do curso é identificada como simulação. A execução na ferramenta ocorre fora do curso e o registro do aluno é autodeclarado, a menos que uma integração real posteriormente forneça evidência verificável.

Nenhum idioma pode herdar português silenciosamente. Tradução existente, validação estrutural e revisão linguística humana são estados diferentes.
