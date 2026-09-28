# Ganesha — especificação do curso

Versão do plano: 2026-09-28. Responsável: Diretor. Base: `dd724a6`.

## Resultado esperado

Uma pessoa sem experiência em IA escolhe Claude ou Codex, aprende uma competência comum, executa uma atividade adequada à ferramenta e demonstra o aprendizado. O curso cobre sites, aplicativos e automações; o Educador determina o número final de aulas e etapas a partir dos objetivos, fontes e pré-requisitos. Cada etapa ocupa uma tela e cada aula contém prática e pelo menos duas verificações de aprendizagem distintas.

O primeiro incremento valida uma aula completa: acesso ao ambiente do curso, escolha de idioma e ferramenta, orientação, prática identificada, primeira verificação, segunda verificação, resultado e retomada após recarregar. O mapa completo pode estar visível como planejamento, mas somente aulas revisadas e traduzidas serão liberadas.

## Escopo e integração

- Dentro: experiência após acesso; navegação do curso; conteúdo e variações por ferramenta; prática; avaliação com feedback; progresso; idiomas; acessibilidade; rastreabilidade e versão do curso.
- Fora: landing page, aquisição, cadastro, cobrança, gestão de assinaturas. Essas áreas pertencem ao colega responsável.
- Não há stack no commit inicial. Base acordada com Construtor e sessão de origem: Next.js, React e TypeScript; adaptar a integração se receber a stack do colega. Evitar backend e dependências desnecessários no protótipo.
- O contrato de entrada, acesso e progresso está em `contracts/INTEGRATION.md`. Uma demonstração local pode usar acesso de demonstração explícito. Não é autenticação de produção.
- Exercícios locais ou simulados não executam Claude/Codex real por trás da interface. Não exibir resultado de execução, revisão por IA ou publicação como se uma integração inexistente tivesse ocorrido.

## Jornada

1. Entrar na área `/learn/[locale]` com acesso confirmado pelo sistema do colega; a demonstração identificada fica em `/course/[locale]`.
2. Escolher idioma e ferramenta, podendo alterá-los depois. A troca não apaga progresso.
3. Ver a aula disponível, seus objetivos e a versão do curso.
4. Percorrer uma etapa por tela, com posição no percurso, retorno e ação principal clara.
5. Realizar prática com resultado esperado, critérios de qualidade, limites e contexto da ferramenta.
6. Responder à primeira verificação e receber feedback específico, com nova tentativa.
7. Realizar a segunda verificação, de critério ou mecanismo diferente, e receber feedback.
8. Concluir somente com a prática registrada e ambas as verificações satisfeitas; retomar em outro acesso sem perda silenciosa.

## Conteúdo e idiomas

Locales obrigatórios: `pt-BR`, `en`, `es`, `fr`, `de`, `ja`, `hi`, `id`, `ar`, `ko`, `zh-CN`. Chinês simplificado é a suposição inicial; registrar alteração se o usuário preferir outra variante.

Todo texto visível pertence a catálogos, inclusive navegação, instruções, erros, opções, feedback, acessibilidade, legendas e rótulos de gráficos. Nenhuma frase educacional será embutida em uma imagem. Nomes próprios de produtos podem ser preservados.

Cada tradução registra seu estado. `pending` e `missing` não contam como concluídos. Fallback permite desenvolvimento, mas bloqueia a publicação do escopo afetado. A liberação exige cobertura completa dos 11 idiomas no conjunto de aulas e telas publicado; revisão linguística humana, se não realizada, permanece declarada separadamente.

Árabe usa `lang="ar"` e `dir="rtl"`; layout com propriedades CSS lógicas. Código, URLs e identificadores técnicos mantêm direção LTR. Figtree para alfabetos compatíveis, com fontes de apoio para árabe, devanágari e idiomas do leste asiático. Tamanho e altura de linha devem acomodar essas fontes.

## Pedagogia e veracidade

- Competência é independente da ferramenta; instruções operacionais pertencem à variante Claude/Codex.
- Fontes primárias sustentam afirmações sobre recursos, acesso e limitações de produtos. Não presumir paridade entre ferramentas.
- Cada afirmação relevante aponta para evidência com URL, data de consulta, localizador e trecho curto ou paráfrase claramente identificada.
- Quiz de memorização e confirmação de leitura não substituem duas verificações distintas. Uma sugestão viável é compreensão por cenário e avaliação do artefato por critérios.
- Autoavaliação e respostas determinísticas devem ser descritas honestamente. Resultado não implica avaliação externa por IA.

## Publicação e atualização

Uma versão publicada é imutável. Progresso se associa a curso, versão, aula e etapa com IDs estáveis. Correções geram nova versão e política explícita de migração; conclusão passada nunca é apagada silenciosamente. Mudanças de competência ou critérios exigem revisão de compatibilidade.

O Devorador propõe alterações semanais com evidências, aulas impactadas, severidade, tradução necessária e recomendação. O Diretor coordena revisão e testes antes de publicar. A automação de sexta-feira é propriedade da sessão de origem e seu registro será apenas conferido aqui.
