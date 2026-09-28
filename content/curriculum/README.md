# Currículo Ganesha

Responsável: Educador. Idioma de trabalho da equipe: português brasileiro.

## Estado desta entrega

L01 completa para integração em modo `preview`: sete telas, quatro exercícios e duas verificações obrigatórias em telas distintas. Primeiro lote do Devorador recebido e lido (`EARLY_BATCH.md` e `registry.json`, commit `c531c9e`); vínculos de evidência conferidos também contra o registro expandido `5226254`. Isso não significa leitura integral de todos os sites ou vídeos catalogados pelo Devorador.

Os 11 idiomas têm 112 mensagens por catálogo, totalizando 1.232 mensagens localizadas. A auditoria estrutural do Diretor passou com os catálogos reais. Revisão humana de linguagem segue pendente em todos. `lesson.status=ready` indica integridade editorial e estrutural para a demonstração; `course.status=preview` preserva o limite de revisão e não publica o curso.

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
- `L01_REFERENCE.md`: justificativa, sequência, critérios e fontes da aula.
- `LOCALIZATION.md` e `AUDIT.json`: cobertura efetiva, limites e auditoria.

O contrato canônico é `contracts/course.ts`, mantido pelo Diretor. Gere os arquivos com `python3 content/curriculum/build_course.py`; no checkout integrado, valide com `python3 coordination/validate_content.py`.

## Limites

Não há integração do Ganesha com Claude ou Codex implícita no conteúdo. A prática dentro do curso é identificada como simulação. A execução na ferramenta ocorre fora do curso e o registro do aluno é autodeclarado, a menos que uma integração real posteriormente forneça evidência verificável.

Nenhum idioma pode herdar português silenciosamente. Tradução existente, validação estrutural e revisão linguística humana são estados diferentes.
