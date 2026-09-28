# Ganesha — currículo 0.3.0

Pacote isolado para integração pelo Diretor e revisão de experiência pelo Artista. O currículo ativo 0.2.0 permanece intacto. A versão ampliada tem 12 aulas, exatamente 10 etapas por aula, 24 avaliações determinísticas obrigatórias e 94 exercícios com rubrica. Das práticas, 67 são externas e autodeclaradas. Estimativa editorial de duração: 395 minutos; não foi medida com alunos.

## Percurso

| Aula | Tema | Entrega ou evidência principal |
| --- | --- | --- |
| 1 | Preparar seu espaço de trabalho | Pasta, brief de texto simples e contexto conferido |
| 2 | Escrever pedidos que orientam o trabalho | Pedido completo, plano revisado e limites explícitos |
| 3 | Verificar, corrigir e repetir | Comparação independente, correção delimitada e reteste |
| 4 | Construir a primeira página | index.html aberto e conteúdo Ponte Musical conferido |
| 5 | Tornar a página utilizável | Interação, teclado, foco e tela estreita testados |
| 6 | Publicar e atualizar a página | Link de visitante, versão atualizada e cópia de recuperação |
| 7 | Criar um app com estado | Adicionar, concluir, remover e validar tarefas |
| 8 | Guardar e recuperar dados | Persistência, mesma origem e testes isolados de falha |
| 9 | Entregar e manter o app | Exportação/importação validada, recuperação e instruções |
| 10 | Preparar dados para automação | CSV, contrato, gabarito e entradas de teste |
| 11 | Gerar um relatório repetível | Total correto, repetição, erro preservado e recuperação |
| 12 | Agendar com controle | Ensaio manual, condições, disparo acompanhado e pausa |

As três rotas práticas são independentes depois dos fundamentos. Apps e automação não exigem completar sites. Aulas 4, 7 e 10 dependem da aula 3; dentro de cada rota, as aulas seguem a anterior.

## Conteúdo e integração

- `authoring/`: fonte pedagógica integral em português e inglês e recibos de revisão dos domínios.
- `course.template.json`: curso compilado no contrato 1.0.0, com IDs da versão 3 para todas as etapas e avaliações.
- `source-messages/`: catálogos planos de 1.192 chaves; a existência de um arquivo durante a tradução não significa que esteja completo.
- `bundle/content/`: único diretório de entrega compilada. Copiar de um commit estável informado pelo Educador, nunca de um arquivo em mutação.
- `bundle/STATUS.json` e `VALIDATION.json`: cobertura efetivamente compilada, checks e limites. `localizationComplete` só é verdadeiro quando os 11 catálogos integrais passam.
- `AUTHORING_MANIFEST.json`: hashes das fontes, número de chaves e hash do inglês usado na tradução.
- `TRANSLATION_DELTA.json`: mudanças finais explícitas para tradutores que partiram da fonte anterior. Este arquivo não é um catálogo completo.
- `SOURCE_BINDINGS.json`: fontes atribuídas e referências ainda não mapeadas no registro de pesquisa. Lista vazia de evidências não significa estudo ou execução concluídos.

Copiar o curso junto dos catálogos correspondentes. Não misturar mensagens 0.2 com conteúdo 0.3. Preservar progresso antigo sob sua versão; novos critérios não recebem aprovação automática por acertos antigos. O aplicativo pode expor esta versão por política explícita de beta, mantendo `releasedLessonIds=[]`, aulas `draft` e curso `preview`. O Educador não promoveu uma liberação canônica nem publicou o site.

## Validação reproduzível

A partir da raiz do repositório, com Python 3:

```sh
python3 content/curriculum/v0.3.0/build.py prepare
python3 content/curriculum/v0.3.0/build.py compile --locales pt-BR en
python3 content/curriculum/v0.3.0/validate.py --locales pt-BR en
```

Quando todos os catálogos estiverem completos, omitir `--locales` nos dois últimos comandos exige os 11 idiomas. O compilador verifica todos os catálogos pedidos antes de escrever a saída. A auditoria verifica IDs únicos, chaves, rubricas, posição das avaliações, pré-requisitos, avisos externos e preservação da 0.2.0. Candidatos a divergências de literais exigem revisão: contagem de chaves não demonstra qualidade linguística.

## Revisão e limites

O Educador leu as 120 etapas em português, conferiu a paridade das fontes pt/en e revisou objetivos, progressão, práticas, alternativas e critérios. O Artista reportou leitura integral das 120 etapas pt-BR, mais estrutura pt/en; suas correções finais estão incorporadas. Os pedidos longos são callouts visíveis; campos de exercício recebem ações curtas. Ajuda opcional não contém o único enunciado de uma atividade.

Práticas externas permitem registrar execução real, impedimento ou análise simulada. A rubrica avalia a honestidade desse registro e sua comparação com os critérios visíveis. Ela não certifica que um arquivo externo, publicação ou agenda foi executado. Os 24 checks continuam obrigatórios e determinísticos. Simulações originais são identificadas. Ativação de agenda pelo aluno é opcional e depende de testes manuais aprovados, Python e acesso; uma configuração salva não prova disparo. O autor não operou agendas.

Os catálogos adicionais são traduções por agentes de IA. Revisão humana de idioma, piloto com iniciantes, duração medida e execução ponta a ponta nas contas das duas ferramentas continuam pendentes. Os recibos de domínio delimitam as fontes textuais lidas; vídeos, imagens e links não inspecionados não recebem aceite integral. No material de automação, seis testes da referência Python foram executados em arquivos temporários; isso não comprova execução em Claude Desktop ou Codex Desktop.
