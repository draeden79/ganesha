# Redesign baseado no Ganesha Desktop — aplicativo funcional

Referência: pacote `eaa70e6` do Artista; evidências e especificação em `design/specs/NATIVE_REFERENCE.md`. Essa revisão substitui o layout antigo, preservando o motor de progresso. O currículo integrado está `draft` e sem aulas liberadas (`f51ae82`); a demonstração usa a allowlist explícita do app e informa conteúdo em revisão.

## Implementação

- Jornada: lateral de 252px, logo nativo, sete cartões horizontais, etapa selecionada conectada ao painel lavanda e um CTA. Progresso real na lateral; sem anel, hero separado ou avisos repetidos.
- Etapa: lateral removida, cabeçalho compacto, superfície branca ampla, corpo maior, campo/rubrica leves e feedback próximo à ação. Dicas e índice em `dialog` nativo, com foco contido, Escape e devolução de foco.
- Idioma e ferramenta discretos, aviso editorial único por tela. Simulação e atividade externa continuam identificadas junto ao exercício. Não há botão que afirme enviar para IA.
- Cinco novos rótulos de UI traduzidos nos 11 locales; as 112 mensagens do currículo e todos os IDs foram mantidos. Fontes locais e RTL preservados; contagens em fração isoladas para não inverter em árabe.

## Evidências verificadas no app real

- Construtor: screenshot desktop da jornada confirma composição nova e assets corretos.
- Ajuda: abre as dicas/critério da etapa; Escape fecha e devolve foco ao botão Ajuda.
- Prática: texto fictício e quatro critérios registrados; após reload, resposta, critérios, feedback e botão Continuar foram restaurados.
- Verificação 1: resposta incorreta mostra feedback específico e bloqueia avanço; resposta correta libera. Nenhuma prática real de IA foi executada no teste.
- Troca Claude→Codex deixa o percurso de Codex pendente; retorno a Claude restaura resultado e tentativas. Troca pt-BR→ar preserva a mesma etapa, alternativa e feedback.
- Viewport efetivo 390×844: documento com 390px (sem overflow), título da avaliação árabe em y=90px, `lang=ar`, `dir=rtl` e Noto Arabic. Captura visual da avaliação verificada.
- Jornada árabe mobile: documento 390px; trilho de 984px contido em viewport próprio de 330px, permitindo scroll horizontal sem expandir a página.
- `tsc --noEmit`, 16 testes unitários e auditoria de 11×112 traduções/IDs passaram; build Next passou. A rodada final de fidelidade em todos os idiomas e percurso completo fica registrada pela coordenação/Artista após receberem o build.

## Limites

Conteúdo e traduções continuam em revisão; build/QA visual não certificam estudo integral das fontes ou liberação pedagógica. Persistência é apenas no navegador. Autenticação, banco remoto e execução de Claude/Codex não estão integrados. A preservação de backup sob quota e concorrência real entre processos continua com os limites descritos em `APP_QA.md`.
