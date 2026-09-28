# Critérios de aceite

Cada item registra evidência, responsável e resultado em `STATUS.md`. Ausência de evidência significa pendente, não aprovado.

## Qualidade para iniciantes — revisão de 28/09/2026

A primeira aula da prévia 3107 foi reprovada pelo usuário após a revisão dos agentes. O aceite editorial anterior não demonstra compreensão da experiência renderizada. Aplicar [LEARNING_QUALITY.md](LEARNING_QUALITY.md): habilidade observável, atividade útil, demonstração, tentativa diferente, feedback e observação de pessoas do público. Revisar primeiro uma atividade completa antes de ampliar a aula. Quantidades herdadas de etapas e verificações são restrições da implementação atual, não prova nem requisito universal de qualidade pedagógica; ajustar o contrato se a sequência de aprendizagem justificar.

- [ ] A tela implementada ensina antes de pedir a ação e explica o propósito dos controles.
- [ ] A prática e o feedback demonstram a habilidade pretendida; copiar um texto visível não é certificado de compreensão.
- [ ] Observação humana registra compreensão, uso e aplicação em outro exemplo, incluindo ajuda necessária e falhas.
- [ ] O estado da candidata distingue revisão por agentes, validação técnica e evidência humana, com versão e limitações explícitas.

## Release candidate da primeira aula

- [ ] O mapa completo apresenta pré-requisitos, competências e quantidade de aulas justificada pelo Educador.
- [ ] Uma aula tem IDs estáveis, objetivos, prática e pelo menos duas etapas de verificação distintas, ambas com feedback e nova tentativa.
- [ ] Concluir a aula depende de prática e das duas verificações; recarregar ou navegar para trás não contorna os critérios.
- [ ] Claude e Codex compartilham competência, mas têm instruções e limitações coerentes com fontes atuais.
- [ ] Cada referência de evidência resolve para fonte real, data e localizador. Links não são inventados nem substituídos por resultados de busca.
- [ ] Fontes que sustentam a aula possuem ficha de estudo integral com escopo, sequência, exemplos, pré-requisitos, erros/limites e evidências localizáveis; exportação de transcrição, metadados ou resumo de descoberta não passam neste critério.
- [ ] Instruções operacionais em vídeo têm revisão dos trechos visuais necessários, com cobertura registrada. Elaboração pedagógica original e lacunas de sustentação estão identificadas por etapa.
- [ ] Simulação, autoavaliação e execução local estão claramente identificadas; nenhuma integração fictícia é apresentada como real.
- [ ] Há textos completos para todos os estados liberados em todos os 11 idiomas, incluindo feedback, erros, acessibilidade e conteúdo da aula.
- [ ] O relatório por locale distingue tradução presente, revisão e pendência; fallback não passa no gate de release.
- [ ] Trocar ferramenta ou idioma mantém respostas/progresso compatíveis e não mistura texto de idiomas diferentes.
- [ ] Persistência sobrevive ao reload; dados corrompidos, indisponíveis ou incompatíveis têm recuperação visível, sem quebra do app.
- [ ] Progresso registra curso/versão; uma nova versão não destrói tentativas ou conclusões anteriores.
- [ ] Navegação por teclado, foco visível, labels, contraste e mensagens de erro são verificados.
- [ ] Layout funciona em tela estreita e desktop; árabe é RTL e trechos de código/URLs permanecem legíveis em LTR.
- [ ] Todas as páginas seguem `DESIGN_SYSTEM.md`, sem texto educacional embutido em assets.
- [ ] Modo de demonstração não é confundido com autenticação; contrato com landing/cadastro/pagamento está documentado.
- [ ] Build e testes relevantes passam no commit candidato; registrar comandos e limitações do ambiente.
- [ ] Versão/estado do curso aparece no produto; aulas futuras ou pendentes não aparecem como já disponíveis.

## Matriz mínima de verificação

| Cenário | Evidência esperada |
| --- | --- |
| Novo aluno, Claude, pt-BR | Percurso completo, respostas incorretas/corretas e conclusão |
| Novo aluno, Codex, en | Variante específica; duas verificações e progresso |
| Árabe, mobile | Screenshot/inspeção de RTL, foco, overflow, código LTR |
| Demais nove locales | Auditoria de chaves e amostra visual de texto longo e fontes |
| Retomar | Reload após prática e após uma verificação; etapa e estado restaurados |
| Recuperar | Storage indisponível, JSON inválido e versão incompatível |
| Atualizar curso | Progresso antigo preservado, migração explícita ou retomada da versão antiga |
| Acesso | Entrada autorizada, acesso ausente/negado e demonstração honesta |
| Aula provisória | Acesso permitido apenas pela configuração explícita de demo; liberação canônica respeita status e releasedLessonIds |

## Preview para teste visual

Uma aula provisória pode ser apresentada na rota de demonstração por configuração explícita, com aviso de conteúdo em revisão. A liberação pedagógica continua bloqueada. Build, testes de navegação, presença de traduções e auditoria estrutural não substituem os critérios de estudo e qualidade acima. O validador do Diretor mantém a exigência de ao menos uma aula liberada e deve falhar quando todas estão em rascunho; registrar esse resultado como bloqueio de release esperado, sem ocultá-lo nem classificá-lo como defeito visual.

Não é promessa de ausência de bugs. Falhas bloqueadoras impedem release; limitações conhecidas acompanham a entrega.
