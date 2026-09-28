# Revisão de Fundamentos 0.3.0 — primeiro lote

Fonte revisada: `content/curriculum/v0.3.0/authoring/foundations.pt-BR.json`, no worktree do Educador. Revisão de estrutura, densidade e coerência da interação; não é QA de um app 0.3.0 renderizado nem aprovação das fontes técnicas ou traduções.

## Parecer

A progressão das três aulas é coerente: preparar contexto e acesso → delimitar e revisar pedidos → observar, corrigir e retestar. As 30 etapas têm propósitos próprios, com exemplos concretos, ações frequentes e checks distintos. Não há necessidade de alongar os textos para preencher uma meta de palavras.

O lote inspecionado contém 19 práticas, três reflexões, seis checks e duas explicações. Corpos têm 17–60 palavras, com checks mais curtos. O núcleo textual máximo medido é de 136 palavras, incluindo título, objetivo, corpo, ação, resultado, pedido e critérios; variantes, dicas e conteúdo interno dos checks são medidos/avaliados separadamente. Dados de densidade em `../qa/v03-foundations-density.json`.

Aprovação da progressão e da densidade, com correções de interação necessárias antes de fechar o lote.

## Correções prioritárias

| Local | Problema | Ajuste solicitado |
| --- | --- | --- |
| `workspace.access` e práticas `select-context`, `read-only-request`, `compare-context` | A introdução permite continuar em simulação se o acesso falhar, mas os critérios posteriores exigem pasta aberta/resumo recebido e comparado. O aluno impedido não pode atestar esses resultados honestamente. | Oferecer resultado real **ou** impedimento declarado com análise do exemplo, mantendo clara a distinção entre simulação e execução. `requests.send-and-review` já fornece um bom padrão de resultado alternativo. |
| `workspace.access` e `verification.evidence-types` | São `explain`, mas ação/resultado pedem anotação ou registro. Se compiladas como leitura sem exercício, não haverá campo correspondente. | Transformar em prática com campo ou ajustar ação/resultado para observação/identificação sem registro. Alinhar conteúdo e interação. |
| `workspace.folder` | Criar a pasta e criar/salvar `brief.txt` são operações diferentes. Falta o caminho mínimo de editor e salvamento para um iniciante. | Indicar como abrir um editor, salvar texto simples na pasta e conferir nome/extensão, com orientação por sistema quando necessário. |
| `workspace.access` | Pede abrir documentação oficial, mas não fornece um acesso visível na etapa. Metadados de fonte não são um recurso do aluno por si. | Incluir URL/recurso oficial que efetivamente apareça no conteúdo entregue. |

## Melhorias pontuais

- `verification.diagnosis-check`: alternativas com 4, 6 e 21 palavras. A correta é a única que parece um relato detalhado. Dois distratores plausíveis e comparáveis reduzem a pista de forma, preservando a avaliação do raciocínio.
- `workspace.context-check`: renomear a escola para coincidir com o projeto errado é pouco plausível. Uma confusão real de pasta/arquivo torna o check mais útil.
- Os 30 campos `criteria` repetem exatamente o respectivo `expected`. Isso funciona para ações simples, mas práticas compostas como `requests.complete-request`, `verification.retest` e o registro final se beneficiam de dois ou três critérios específicos. Não multiplicar checkboxes sem necessidade.

## O que preservar

O uso do caso textual da agenda permite verificar uma diferença sem exigir código. A distinção entre corrigir uma falha e solicitar uma mudança é clara. O aluno não é instruído a inventar erro, conta ou execução. Os exemplos completos, o pedido separado, os objetivos específicos e os feedbacks por alternativa melhoram substancialmente a versão compacta anterior.

## Reteste das correções prioritárias

As fontes pt-BR e en foram relidas após a atualização do Educador. Confirmados: `workspace.access` e `verification.evidence-types` são práticas; criação de `brief.txt` inclui editor, texto simples, pasta e conferência da extensão; as práticas de contexto/leitura/comparação aceitam impedimento declarado, sem atestar execução inexistente.

A estrutura de interação prioritária está corrigida. Foi solicitado um último esclarecimento nas alternativas simuladas: nomear ou mostrar o exemplo efetivamente disponível, em vez de dizer apenas “use o exemplo” onde ainda não há um. Uma árvore literal da pasta atende `folder`; o caso anterior atende `select-context`; o pedido presente atende a análise sem execução em `read-only-request`.

Os ajustes de alternativas, critérios compostos e link oficial visível foram enviados como melhorias pontuais antes da localização. Nenhum arquivo de autoria ou implementação foi alterado pelo Artista.


## Reteste final do lote

Confirmados em pt-BR e nos trechos correspondentes em inglês: links oficiais aparecem no corpo de acesso; a alternativa de contexto aborda mistura de projetos; as alternativas de diagnóstico agora apresentam relatos comparáveis; três práticas compostas têm três critérios específicos. A árvore da pasta e as referências ao caso anterior/pedido disponível tornam as alternativas simuladas concretas.

Após as correções, o lote contém 21 práticas, três reflexões e seis checks. Os dados de densidade preservam a medição inicial e adicionam a medição posterior, sem apagar o histórico do achado.

**Parecer:** as 30 etapas de Fundamentos em português estão aprovadas quanto à sequência, densidade e coerência entre ação/registro, dentro desta revisão editorial. As correções pontuais espelhadas em inglês foram conferidas; isso não equivale a revisão linguística integral dos 11 idiomas nem a QA visual do app renderizado. Nenhum bloqueio editorial identificado neste lote permanece aberto.
