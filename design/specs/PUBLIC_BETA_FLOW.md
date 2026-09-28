# Beta pública — continuidade entre aulas

Sprint de 28/09/2026. Complementa `NATIVE_REFERENCE.md`; mantém o design desktop aprovado. O currículo, sua ordem e disponibilidade pertencem ao Educador. Não criar aulas, etapas, promessas de conclusão ou integrações pela interface.

## Mínimo de navegação

1. **Jornada:** lista de aulas com título completo, seleção e progresso real por aula. O painel principal identifica a aula selecionada; os cartões mostram somente suas etapas. A contagem de etapas nunca representa a contagem de aulas.
2. **Mobile:** todas as aulas disponíveis devem continuar acessíveis por um seletor com rótulo “Aula” ou por uma lista compacta. A lista desktop pode ser substituída, mas não simplesmente escondida. O seletor fica antes da trilha; seus rótulos completos ficam disponíveis mesmo quando o controle é compacto.
3. **Atividade:** mantém o modo em foco, sem lateral. Voltar no cabeçalho abre a jornada da aula atual. O índice contém apenas etapas dessa aula, com título e contagem correspondentes.
4. **Continuidade:** a última etapa de uma aula mostra “Próxima aula” e o nome da próxima aula quando há uma disponível. A ação segue os mesmos gates de prática/check existentes; visitar uma etapa não a conclui.
5. **Retomada:** abrir uma aula em andamento deve priorizar a etapa pendente/atual, sem apagar respostas nem trocar silenciosamente de aula após mudar idioma.
6. **Final:** concluir o percurso exige as práticas e checks definidos pelo currículo. A tela final distingue percurso concluído de resultado externo autodeclarado; acesso à revisão continua disponível.
7. **Estado editorial:** indicador beta/revisão único e discreto, detalhes expansíveis. Conteúdo indisponível não oferece um CTA que termina em erro nem recebe tradução inventada como fallback.

## Percurso confirmado pelo Educador

Snapshot recebido às 20:23 UTC: `course.first-site`, versão `0.2.0`; aulas `lesson.foundations`, `lesson.site`, `lesson.app`, `lesson.automation`. Títulos: Fundamentos → Seu primeiro site → Um app de tarefas → Uma automação útil. Cada aula tem seis telas: aprender, preparar, verificação 1, executar, verificação 2, entregar.

Site, App e Automação dependem somente de Fundamentos. A sugestão “Próxima aula” pode seguir a ordem editorial, mas a interface não deve exigir concluir Site antes de permitir Automação. Cada aula mantém dois checks obrigatórios e prática externa autodeclarada. O pacote é beta/rascunho, sem afirmação de liberação editorial plena. Conteúdo final e IDs de etapas devem ser lidos do pacote canônico, não deste snapshot.

## Visual preservado

Lateral branca, trilho horizontal contido, painel lavanda conectado e CTA único na jornada. Na etapa: título perto do topo, corpo amplo, fluxo natural, formulário legível e ajuda local em diálogo. Logo/mascote e assets existentes; sem novo redesign. RTL deve espelhar ordem e setas, mantendo marcas/código LTR.

## Matriz de QA desta entrega

| Verificação | Evidência esperada |
| --- | --- |
| Entrada pública e `/classroom` | Página abre na URL publicada sem credencial técnica obrigatória |
| Desktop | Todas as aulas reais selecionáveis; painel e etapas mudam juntos |
| Mobile 390×844 | Seletor/lista de aulas acessível; página sem overflow horizontal |
| Passagem de aula | Última etapa libera CTA correto; próxima aula tem título/índice coerentes |
| Progresso e retorno | Trocar aula e voltar preserva respostas e estados de cada aula |
| Conteúdo longo | Instruções, rubricas e feedback completos, sem corte ou máscara |
| Idioma e RTL | Troca conserva a aula/etapa válida; indisponibilidade explícita; árabe legível |
| Conclusão | Nenhuma conclusão geral antes dos requisitos; revisão permanece acessível |

Aprovação visual requer a build e URL exatas da entrega. Testes do motor de persistência/versionamento permanecem com Construtor/Devorador; o Artista testa as interações visíveis necessárias para a revisão.
