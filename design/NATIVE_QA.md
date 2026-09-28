# QA do redesign baseado no desktop

Data28/09/2026. Direção nova substitui a aprovação visual da baseline96a9edb. O web funcional refeito será validado separadamente depois da implementação do Construtor.

## Referência real

App `ai.omganesha.app`, janelaGanesha, versão instalada no Mac. Jornada e primeira etapa observadas; capturas em `reference/`. Nenhuma atividade respondida/concluída ou IA acionada. Feedback/checks nativos posteriores estavam bloqueados e não foram inventados como observação.

## Protótipo v2

URL `http://127.0.0.1:4176/native.html`. Currículo canônico lido do Educador, sem cópia emdesign. O protótipo preserva7telas,4práticas e2checks; seu estado usa chave separada do app real.

- Desktop1280×720: jornada com lateral252px, cartões horizontais e painel de etapa; captura `qa/native-web-journey.png`.
- Etapa desktop: lateral removida, superfície ampla, h1/body maiores, ilustração contextual transparente; `qa/native-web-stage.png`.
- Prática desktop: conteúdo e rubrica do Educador renderizados em layout focado; `qa/native-web-practice.png`.
- Prática mobile390×844: clientWidth=scrollWidth=390; `qa/native-web-mobile-practice.png`.
- Prática árabe390×844: dir=rtl, clientWidth=scrollWidth=390, título emy90px; `qa/native-web-ar-mobile.png`.
- Ajuda árabe abre diálogo com as duas dicas e o critério reais da etapa; botão de fechar recebe foco. Não é chat/IA. Escape e retorno de foco são fornecidos pelo dialog nativo.
- JavaScript passou `node --check design/native.js`.

O protótipo não substitui testes de storage/versionamento do app. Os11catálogos curriculares são resolvidos diretamente; revisão nativa das traduções continua pendente. A especificação mantém fontes e RTL da implementação. A validação final dos11idiomas no novo app ainda depende da integração.

## Limites e decisões

Somente um curso/aula disponível é mostrado; não copiar as6aulas do desktop nem o perfilLucas. O curso nativo sobre viagem não substitui nosso currículo. O logo/mascote foram reutilizados dos recursos locais legítimos; fonteFigtree com licença. A ilustração de oficina foi derivada com image_gen para fundo transparente, mantendo assunto coerente com criação de sites.

Em mobile, a rolagem vertical é natural. O fade/rodapé sobreposto do desktop não foi copiado porque poderia encobrir campo e feedback. A trilha pode rolar horizontalmente dentro do próprio contêiner; o documento não deve rolar horizontalmente.
