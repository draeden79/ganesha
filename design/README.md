# Ganesha — entrega do Artista

**Direção atual: v2, baseada no Ganesha Desktop real.** Leia `specs/NATIVE_REFERENCE.md`. Preview novo: `http://127.0.0.1:4176/native.html`; iniciar com `python3 design/serve-preview.py --port 4176` (o currículo deve estar em `content/`, ou use `--content-dir`). A composição v1 abaixo é histórica.

Direção visual, tokens, asset 3D, protótipo navegável e especificação de telas do curso pós-acesso. Leia primeiro `../DESIGN_SYSTEM.md`, depois `specs/EXPERIENCE.md` e `specs/L01_SCREEN_MAP.md`.

## Preview

Abra `design/index.html` ou sirva a pasta:

```sh
python3 -m http.server 4175 --bind 127.0.0.1 --directory design
```

- Jornada: http://127.0.0.1:4175/
- Prática: http://127.0.0.1:4175/?screen=lesson&step=1
- Verificação: http://127.0.0.1:4175/?screen=lesson&step=2
- Árabe RTL: http://127.0.0.1:4175/?lang=ar&screen=lesson&step=1
- Falha de salvamento: http://127.0.0.1:4175/?state=save-error
- Exemplo de dados recuperados: http://127.0.0.1:4175/?state=recovered
- Exemplo de conteúdo indisponível: http://127.0.0.1:4175/?state=unavailable

`step` é zero-based, de 0 a 6. O protótipo salva somente dados de demonstração em uma chave própria (`ganesha-design-prototype-v1`). Não escreve dados do aplicativo de produção. Os estados `recovered` e `unavailable` são exemplos de interface explicitamente rotulados, não integrações reais. A simulação não envia mensagens ou executa Claude/Codex.

## Arquivos

- `tokens.css`: cores, fontes, espaçamento, bordas, feedback e movimento.
- `prototype.css`: layouts e componentes de referência responsivos; reduzir movimento via preferência do sistema.
- `index.html`, `prototype.js`, `locales.js`: protótipo sem build, com 11 catálogos de demonstração e RTL.
- `assets/creative-workshop.png`: oficina isométrica, sem texto rasterizado; prompt/proveniência em `assets/README.md`.
- `specs/EXPERIENCE.md`: biblioteca de componentes, estados, localização, acessibilidade e microinterações.
- `specs/L01_SCREEN_MAP.md`: todas as telas L01 ligadas aos IDs reais do Educador.
- `QA.md` e `qa/`: evidência visual e auditorias; distinguir protótipo e app integrado.

## Integração

A propriedade do Artista é apenas `design/`. O Construtor pode importar `tokens.css` e copiar a imagem para `public/`. O app real usa exclusivamente o currículo e os catálogos do Educador em `content/`. **Não importar `design/locales.js` como conteúdo do curso.**

O protótipo usa exemplos provisórios e textos próprios para estudo de interação; não substitui a execução externa, rubricas e avaliação pedagógica do curso. Traduções presentes não significam revisão nativa concluída. Fontes são remotas no protótipo; no app real, preferir fontes locais licenciadas e fallback verificado.

Verificação de cobertura de strings do protótipo: `node design/qa/verify-locales.cjs` (presença/estrutura, não qualidade linguística). Teste manual necessário para teclado, fluxo, densidade e RTL.
