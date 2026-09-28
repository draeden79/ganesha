# Critérios de aceite

Cada item registra evidência, responsável e resultado em `STATUS.md`. Ausência de evidência significa pendente, não aprovado.

## Release candidate da primeira aula

- [ ] O mapa completo apresenta pré-requisitos, competências e quantidade de aulas justificada pelo Educador.
- [ ] Uma aula tem IDs estáveis, objetivos, prática e pelo menos duas etapas de verificação distintas, ambas com feedback e nova tentativa.
- [ ] Concluir a aula depende de prática e das duas verificações; recarregar ou navegar para trás não contorna os critérios.
- [ ] Claude e Codex compartilham competência, mas têm instruções e limitações coerentes com fontes atuais.
- [ ] Cada referência de evidência resolve para fonte real, data e localizador. Links não são inventados nem substituídos por resultados de busca.
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

Não é promessa de ausência de bugs. Falhas bloqueadoras impedem release; limitações conhecidas acompanham a entrega.
