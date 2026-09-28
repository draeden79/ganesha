# Lote inicial para o Educador

Consulta: 28/09/2026. Há 21 recursos catalogados: 4 índices/programas, 14 leituras de texto por seções e 3 vídeos apenas localizados. Todas as nove fontes têm tentativa de acesso registrada. O histórico completo continua pendente.

## Base utilizável agora

| Competência candidata | Evidência com ID estável | Implicação pedagógica |
| --- | --- | --- |
| Entender o agente e seus limites | res-claude-agent-basics | Mostrar diferença entre resposta, plano e alteração real de arquivos. |
| Dar contexto e resultado esperado | res-codex-prompting; res-codex-project-instructions | Um pedido pode ser melhorado e instruções do projeto podem persistir. |
| Planejar e construir em partes | res-claude-plan-build-review; res-builder-visual-plan | Especificar estados e critérios antes de aceitar a implementação. |
| Conferir funcionamento | res-claude-verify-unattended; res-builder-behavior-tests | Examinar evidências e entradas inválidas, além da aparência da tela. |
| Descrever uma automação | res-peter-workflow-public; res-claude-local-schedule; res-codex-local-schedule | Mapear etapas e testar a tarefa manual antes de escolher sua agenda. |

As referências canônicas, citações curtas e limites de cada conclusão estão em `resources.jsonl`. Essas competências são propostas para decisão curricular, sem impor contagem de aulas.

## Diferenças que afetam o onboarding

- Claude Desktop: aba Code, projeto Local e seleção da pasta. O app inclui Claude Code; não exigir Node.js/CLI como condição de abrir Code. Dependências de um app criado são outra questão. Ver [quickstart oficial](https://code.claude.com/docs/en/desktop-quickstart).
- Codex: a [URL antiga do app](https://developers.openai.com/codex/app) redirecionou para [ChatGPT desktop app](https://learn.chatgpt.com/docs/app), que orienta escolher Codex. Rótulos antigos precisam de revisão antes de produzir capturas/telas.
- CLAUDE.md e AGENTS.md cumprem papéis próximos, mas são arquivos e regras diferentes. CLI e Desktop também têm controles distintos; não traduzir atalhos mecanicamente.
- Tarefas com arquivos locais dependem de máquina/app disponíveis. A existência de rotinas na nuvem não torna qualquer tarefa local executável com a máquina desligada.

## Lacunas e honestidade

YouTube ainda não forneceu transcrições primárias nesta amostra. Riley Brown e DesignCourse estão com descoberta primária pendente; Tech With Tim forneceu descrição/capítulos. Peter Yang forneceu artigos públicos parciais, com o restante protegido. Não usar tópicos de capítulos como demonstrações verificadas.

O programa Claude Code 101 pressupõe editor/terminal, embora não pressuponha experiência com IA. A Ganesha atende um público anterior a esse pré-requisito. Publicação de um site, persistência de dados, autenticação, acessibilidade e toda a localização em 11 idiomas ainda precisam de fundamentação mais específica; esta coleta não certifica esses temas.

Nenhum vídeo assistido, nenhum quiz da fonte concluído e nenhuma integração real com Claude/Codex executada. Sínteses internas em pt-BR; tradução para o site pendente nos 11 idiomas.
