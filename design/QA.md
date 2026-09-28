# QA visual — Ganesha

Data: 28/09/2026. Responsável: Artista. Evidência separada para o protótipo de design e o app integrado. Nenhum resultado abaixo substitui teste funcional, revisão nativa das traduções ou validação das fontes.

## Protótipo de design

Preview: `http://127.0.0.1:4175/` (servidor local da pasta `design/`).

| Verificação | Resultado / evidência |
| --- | --- |
| 11 locales / nenhuma chave ausente | `node design/qa/verify-locales.cjs`: 84 chaves por locale, arrays de sete etapas; presença/estrutura, não revisão linguística |
| Sintaxe | `node --check design/prototype.js` e `node --check design/locales.js` passam |
| Jornada desktop | 1280px, sem overflow horizontal nos 11 idiomas; `qa/prototype-locales-desktop.json` |
| Jornada mobile | 390px, sem overflow horizontal nos 11 idiomas; `qa/prototype-locales-mobile.json` |
| Árabe RTL | Ordem visual espelhada, tipografia árabe, setas direcionais e CTA espelhados; `qa/prototype-ar-mobile.png` |
| Prática em árabe | `dir=rtl` no documento; `textarea dir=auto` preserva texto escrito pelo aluno em seu idioma original; sem overflow em 390px |
| Simulação / carregamento | Aviso visível de não execução; botão preparando exemplo desativado e status descritivo. Não há chamada de IA real |
| Verificação 1 | Resposta incorreta → feedback explicativo → nova escolha → aprovação; `qa/prototype-error.png` |
| Verificação 2 | Tela independente, alternativas próprias e aprovação separada; contador 2/2 somente depois das duas |
| Prática de transferência | Campo obrigatório e autoavaliação antes de concluir; celebração não substitui a prática |
| Retomada | Após concluir, reload manteve 7/7 e 2/2; draft, ferramenta e respostas preservados |
| Acessibilidade | Labels associados, radios/checkboxes nativos, foco 3px; nomes de etapas preservados por aria-label no índice compacto; botão de retorno com nome acessível mesmo quando só mostra seta |
| Contraste de tokens | Corpo 17,73:1; apoio 5,64:1; CTA roxo/branco 6,00:1; roxo/lavanda 5,46:1; feedback 6,34:1 e 5,93:1; borda interativa/creme 3,15:1. `qa/contrast.json` |
| Movimento reduzido | CSS remove animações/transições com prefers-reduced-motion; status de carregamento mantém texto. Regra inspecionada; preferência de sistema não foi alterada |

Limitações do protótipo: exemplos provisórios, fontes remotas, armazenamento de uma só aba sem sincronização entre abas; não é o renderer real. Estados de recuperação/indisponibilidade por query são demonstrações explícitas. Não contém autenticação, pagamento, execução de ferramentas ou avaliação automática de resposta aberta.

## App integrado do Construtor — revisão inicial

Origem usada para QA: `http://localhost:3100/course/pt-BR`. `127.0.0.1:3100` ficou reservado ao Diretor/usuário após identificarmos compartilhamento de storage. Snapshot em desenvolvimento, sem hash de release final; HMR podia atualizar CSS durante a revisão.

| Prioridade | Achado | Estado e evidência |
| --- | --- | --- |
| P1 | Dicas e critérios ocultos em larguras ≤1150px | **Corrigido e retestado**: ambos aparecem em 390px; disclosure abre as dicas. `qa/app-mobile-step-hints.png` |
| P2 | Índice compacto deixava somente números como nome de botão | **Corrigido e retestado**: sete títulos completos via aria-label; altura medida 44px em cada botão |
| P2 | Ilustração recortada no hero | Correção de contain/área de imagem recebida no código; reteste visual final pendente |
| P2 | Metadados visuais não apareciam nas etapas | Renderer começou a mostrar figura com legenda na etapa scope; especificação enviada para todas as sete telas em `specs/L01_SCREEN_MAP.md`. Revisão final da cobertura pendente |
| P3 | Contagem “1 aulas” | Corrigido no snapshot observado para “Aulas: 1” |

Aprovado no snapshot observado: identidade visual consistente, 390px sem overflow na jornada/etapa, label do campo de prática, rubrica clicável, simulação/autodeclaração explícitas, foco movido ao título na navegação. Tab a partir do título alcançou orientação da ferramenta com outline sólido de 3px.

Pendente nesta revisão: app em árabe/hi/CJK após integrar catálogos do Educador; idiomas em build estável; revisão de foco e feedback com leitor de tela real; bugs funcionais/persistência/versionamento sob responsabilidade de Construtor/Diretor.

## Capturas

As capturas são do estado e viewport indicados pelo nome. Screenshots de viewport foram preferidos após o recurso de full-page gerar artefato de composição; nenhuma captura com esse artefato deve ser usada como evidência de layout.

- `qa/prototype-desktop.png`: jornada desktop.
- `qa/prototype-practice.png`: prática com exemplo explicitamente simulado.
- `qa/prototype-error.png`: feedback de tentativa incorreta.
- `qa/prototype-ar-mobile.png`: jornada em árabe, 390px.
- `qa/prototype-ar-practice.png`: prática em árabe, 390px.
- `qa/app-mobile-step-hints.png`: app após correção de dicas/índice.

## Adendo — app estável em localhost:3101

Currículo `course.first-site@0.1.0`, Educador `4525851`; implementação final `96a9edb` (reteste do bundle final registrado abaixo). Origem exclusiva de QA: `localhost:3101`, sem alterar dados da origem do usuário.

| Cenário | Evidência observada |
| --- | --- |
| Árabe mobile, 390×844 | `html dir=rtl`; Noto Sans Arabic Variable; jornada, formulário e verificação sem overflow; `qa/app-ar-mobile.png`, `qa/app-ar-practice.png` |
| Árabe desktop, 1280×900 | Sidebar à direita (x=1056px); conteúdo começa em x=0; largura do documento1280px; `qa/app-ar-desktop-check.png` |
| Campo de texto RTL/LTR | `textarea dir=auto` permite texto próprio de qualquer direção; nomes de ferramentas isolados por bdi |
| Rubricas mobile | Alturas56–76px em árabe, labels completos e sem truncamento; cartões de prática legíveis |
| Erro em árabe | Seleção preservada, feedback localizado em role=status, foco permanece no botão de verificar; Continuar permanece desabilitado; `qa/app-ar-feedback.png` |
| Troca de idioma | Os11locales mantiveram a etapa3, a seleção e a tentativa; título, opções, feedback, dicas e rótulos mudaram para o locale escolhido |
| Overflow dos11locales | Verificação com feedback incorreto: `clientWidth=scrollWidth=390` em cada idioma; relatório `qa/app-locales-mobile.json` |
| Hindi | Noto Sans Devanagari Variable; captura inspecionada sem glifos ausentes ou corte; `qa/app-hi-mobile-check.png` |
| Japonês | Stack Hiragino/Yu Gothic/Meiryo; captura inspecionada; `qa/app-ja-mobile-check.png` |
| Coreano | Stack Apple SD Gothic Neo/Malgun Gothic; captura inspecionada; `qa/app-ko-mobile-check.png` |
| Chinês simplificado | Stack PingFang SC/Microsoft YaHei; `qa/app-zh-mobile-check.png`; idioma zh-CN conforme escopo |

Revisão **visual**, não revisão linguística humana. A renderização foi verificada no navegador do macOS disponível; compatibilidade de fallback CJK em Linux/Android/Windows ainda depende dos testes da distribuição. Não certificamos fluência das traduções nem comportamento em leitor de tela real.

Ajustes finais solicitados e recebidos no código pelo Construtor: isolar wordmark em LTR para preservar posição do ponto; remover diagrama em sequência da verificação de alternativas (as próprias opções são os cartões comparáveis); retirar tracking latino de títulos/eyebrows árabes e CJK. Recomendação de ordem mobile: índice compacto antes do artigo; título/objetivo antes das dicas/critérios. O conteúdo de apoio deve permanecer acessível.

### Reteste final — commit `96a9edb`

Servidor3101 reiniciado após o build. Reload confirmou Figtree/Noto novamente carregadas; uma perda transitória de CSS durante a troca do build foi resolvida pelo reinício e não permaneceu no candidato final.

- Wordmark com `direction:ltr` no árabe; ponto e identidade preservados.
- Headings árabes com `letter-spacing:normal`; verificação de alternativas sem figura de sequência redundante.
- Índice compacto acima do artigo; dicas/critérios depois do artigo no mobile. Título observado em y≈552px e dicas em y≈1677px na tela árabe390px, em vez de ocupar a área anterior ao título.
- Os11locales foram retestados em390×844 após reinício: nenhum overflow horizontal. `qa/app-locales-mobile.json` identifica o hash final. Capturas hi/ja/ko/zh substituídas pelas do build final.
- Desktop1280×900: jornada sem overflow e imagem com object-fit:contain; `qa/app-desktop-journey.png`. RTL desktop em `qa/app-ar-desktop-check.png`; mobile final em `qa/app-ar-final.png`.
- Capturas `app-ar-mobile`, `app-ar-practice`, `app-ar-feedback` registram os fluxos verificados antes das últimas correções cosméticas; não devem ser confundidas com o layout final.

**Conclusão do Artista:** sem defeito visual bloqueador encontrado no escopo revisado. Dicas, critérios, duas verificações e prática de transferência preservados. Revisão nativa das traduções, leitor de tela real e testes multiplataforma permanecem pendentes. A aprovação funcional/de publicação pertence ao Diretor.
