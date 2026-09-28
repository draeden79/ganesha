# Ganesha · proposta visual Astra

Entrega isolada do Artista para o curso **Astra-PTBR-1.0** do Professor. Criada em 28/09/2026. Não altera a aplicação, o currículo de produção ou a prévia 3107. Não foi publicada.

## Abrir para revisar

- **Mapa das aulas:** http://127.0.0.1:4180/astra/?view=course
- **Primeira atividade:** http://127.0.0.1:4180/astra/?lesson=1&step=1
- **Galeria dos 13 gráficos:** http://127.0.0.1:4180/astra/?view=gallery
- **Texto → arquivo → página:** http://127.0.0.1:4180/astra/?lesson=2&step=3
- **Regra de seleção:** http://127.0.0.1:4180/astra/?lesson=9&step=3

Se o servidor não estiver em execução, a partir da raiz do repositório:

```sh
python3 -m http.server 4180 --bind 127.0.0.1 --directory design
```

A pasta `astra/` é autocontida. Para servi-la diretamente, use `--directory design/astra` e abra a raiz da porta escolhida. Não depende de uma API, conta, ferramenta comercial ou serviço externo para mostrar o material de revisão.

## O que está entregue

- Apresentação das **12 aulas e 61 etapas**, navegáveis, com os textos integrais do Professor e pedidos copiáveis.
- **13 gráficos SVG produzidos**, com título, descrição acessível e texto editável; um por aula e uma comparação adicional na abertura da aula 1.
- Versões responsivas dos gráficos, feitas com texto HTML real. Cenas específicas mostram trecho de código, arquivo, página, hierarquia de informação e árvore de entrega.
- Cinco demonstrações preparadas: ciclo de tarefas (aula 5), validação de dias (6), restauração (7), seleção por duas condições (9) e repetição do histórico (10).
- Fontes originais preservadas em `source/`, com hashes em `SOURCE_SHA256.json`. Os gabaritos não aparecem automaticamente junto das tentativas.
- Evidências da revisão visual e dos estados interativos em `qa/`, descritas em `QA.md`.

O código desta pasta é um **protótipo de apresentação para revisão**. Não implementa os aplicativos que o aluno deverá construir, um avaliador de respostas, progresso do curso ou integração com Claude/Codex. A navegação não conclui atividades; as demonstrações não executam ações na ferramenta do aluno. Os exemplos interativos usam dados preparados e não persistem registros.

## Decisões de composição

1. Propósito antes da ação. Cada etapa abre com seu título e uma frase que explica a finalidade da aula; a preparação permanece visível no início.
2. Demonstração perto da prática. A figura aparece antes das instruções de execução e distingue exemplo de resultado observado. A comparação inicial usa exatamente o exemplo de materiais e brinde da autoria nova.
3. Leitura antes de formulário. Não há campos de resposta em cada explicação nem rubricas para liberar o avanço. Anotações e verificações permanecem nos lugares pedidos pelo Professor.
4. Copiar é uma ação explícita. O botão copia o bloco completo e informa o resultado; não envia nada à ferramenta. Instruções de preenchimento permanecem próximas.
5. Identidade preservada. Figtree, logo legítimo, roxo `#6C3BEE`, lavanda `#F5F3FB`, tinta `#17151F`, superfícies claras e cantos suaves. Nenhuma interface comercial foi redesenhada como captura oficial.
6. Ordem e significado não dependem só de cor. Diagramas usam rótulos e estados escritos; ações têm foco visível. No celular os painéis empilham, sem encolher todo o gráfico até tornar o texto ilegível.

## Localização

Lista de idiomas do produto utilizada para preparar a composição: **pt-BR, en, es, fr, de, ja, hi, id, ar, ko e zh-CN**. Só pt-BR tem conteúdo novo neste pacote. Os outros dez estão pendentes; nenhuma tradução antiga foi promovida a Astra-PTBR-1.0.

Os textos dos gráficos estão em `visuals.pt-BR.json`, separados da geometria. Os textos das aulas são compilados de Markdown preservado. SVGs mantêm texto editável; o protótipo usa HTML para permitir expansão, quebra de linha e ordem lógica. A galeria inclui ensaios explicitamente rotulados de direção RTL e texto ampliado, ainda em português. Não são traduções nem revisão linguística.

Antes da integração multilíngue: localizar os dez catálogos novos, extrair os rótulos e feedbacks do protótipo para os catálogos de UI do produto, isolar literais de código/IDs no renderer final, verificar fontes de árabe/CJK/devanágari e revisar todas as exportações com os textos finais. A estrutura comporta essa etapa; a localização completa não está entregue.

## Arquivos para o Construtor e o Diretor

| Arquivo | Função |
|---|---|
| `index.html`, `style.css`, `preview.js` | Protótipo navegável de apresentação |
| `course.js` | Conteúdo compilado do snapshot autoral |
| `visuals.pt-BR.json`, `visuals.js` | Texto, alt, relação aula/etapa e painéis dos gráficos |
| `assets/*.svg` | 13 gráficos exportáveis efetivamente produzidos |
| `VISUAL_INVENTORY.md` | Inventário de cada visual e interação |
| `build.py` | Reproduz conteúdo compilado, SVGs e hashes a partir do snapshot local |
| `source/` | Os 20 documentos do Professor preservados |
| `brand/` | Logo e fonte legítimos, com licença e procedência |
| `QA.md`, `qa/` | Escopo dos testes, resultados e capturas |

Para reconstruir: `python3 design/astra/build.py`. Não há instalação de dependências.

## Pendências que este design não resolve

- Teste real de compreensão e transferência com adultos iniciantes. Inspeção visual e testes determinísticos não demonstram aprendizagem.
- Execução dos projetos locais descritos nas aulas, incluindo armazenamento, restauração, falhas e isolamento entre laboratório e original.
- Demonstrações operacionais verificadas de acesso às ferramentas, criação de pasta, editor de texto, extensões, abertura e recarga nos sistemas atendidos. Os gráficos entregues são conceituais e estão identificados assim.
- Validação com tecnologias assistivas e revisão linguística das dez versões restantes.
- Integração na aplicação, medição de progresso e avaliação humana ou outro mecanismo de feedback real. Não há correção automática simulada.

O material está pronto para **revisão visual**, não declarado aprovado para publicação ou validado com alunos.
