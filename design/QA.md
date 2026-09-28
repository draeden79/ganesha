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
