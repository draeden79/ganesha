# Ganesha — experiência do curso

Website funcional do curso após acesso. Next.js 16.3.6, React 19.3, TypeScript. A landing page, o cadastro e a cobrança pertencem à outra frente do projeto.

A interface segue a referência real do Ganesha Desktop, registrada pelo Artista em `design/specs/NATIVE_REFERENCE.md`: jornada com lateral e trilha horizontal conectada ao painel selecionado; atividade sem lateral, com formulário amplo, índice e ajuda local em diálogo. O logo e o mascote vêm dos assets autorizados do aplicativo nativo. O motor de progresso e o conteúdo canônico são os mesmos da primeira versão.

## Executar

Node.js 20.9+ e pnpm 11:

```sh
pnpm install --store-dir .pnpm-store
pnpm dev --port 3100
```

Abra `http://127.0.0.1:3100/classroom/pt-BR`. `/classroom` retoma o idioma preferido. Para produção local:

```sh
pnpm build
pnpm start --port 3101
```

No ambiente Codex deste hackathon, Node está em `/Users/lucasmarques/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin` e o executável pnpm em `/Users/lucasmarques/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback/pnpm`. Adicione o diretório de Node ao PATH ao usar esses executáveis.

## O que está implementado

- `/classroom/[locale]`: beta pública 0.2.0 com quatro aulas, 24 etapas, 12 práticas e oito verificações independentes: fundamentos, site, aplicativo e automação. `/course/[locale]` mantém uma demonstração reduzida. Nenhuma aula planejada aparece como disponível.
- `src/lib/demo-config.ts` contém a lista explícita de aulas da prévia. Ela permite testar L01 enquanto o conteúdo está em revisão e sem liberação pedagógica. O adaptador canônico, sem essa opção, respeita `releasedLessonIds`; a rota protegida não usa essa configuração. Navegabilidade da prévia não equivale a curso liberado.
- Conteúdo do Educador em `content/curriculum/course.json` e `content/locales/*.json`, adaptado sem renomear IDs. Objetivos, ações, resultados, dicas, rubricas, feedback e variantes Claude/Codex preservados.
- 11 idiomas: pt-BR, en, es, fr, de, ja, hi, id, ar, ko, zh-CN. 83 chaves pedagógicas por idioma na beta 0.2.0; revisão humana das traduções pendente. Sem fallback silencioso. `lang`/`dir`, árabe RTL, fontes locais Figtree/Noto Arabic/Devanagari e stacks CJK, números localizados e código LTR.
- Progresso e tentativas por versão de curso e ferramenta, somente no navegador. Troca de idioma preserva respostas escritas pelo aluno. Etapas práticas exigem texto e autorrelato da rubrica; quizzes usam IDs, sem busca de palavras em um idioma.
- Restauração valida IDs/opções/rubricas/tentativas, deriva conclusão e informa recuperação. Dados inválidos são copiados para uma chave `:recovery:<timestamp>` antes de sobrescrita. Falha de backup bloqueia a sobrescrita; falha de armazenamento aparece na interface.
- Abas sincronizam via evento `storage`; rascunho mais recente por etapa vence e tentativas são unidas, ordenadas e deduplicadas (máximo 50 por etapa/ferramenta). Cursor da aba ativa é preservado. Não é edição colaborativa.
- Layout responsivo, trilho horizontal com scroll contido, setas e Home/End, formulários nativos, foco visível/programático, diálogos nativos com Escape/retorno de foco, figuras com legenda traduzida e imagem decorativa sem texto. Ajuda contém dicas locais do currículo; não representa um tutor conectado.

## Fronteira de acesso

`/learn/[locale]`, `/api/session` e `/api/progress` consultam `src/lib/access.ts`. O adaptador real não está configurado: o curso protegido permanece indisponível e GET/POST de progresso devolvem 503 `unconfigured`. Parâmetros de URL, localStorage e flags de ambiente não liberam acesso. Não há autenticação, pagamento, banco de progresso, tutor ao vivo ou chamada real de Claude/Codex nesta entrega.

O colega de cadastro/pagamentos precisa implementar a identidade e o entitlement validados no servidor e o armazenamento remoto por usuário. Ver `contracts/INTEGRATION.md` e `docs/APP_CONTRACT.md`. Não incluir segredos no cliente. O contrato canônico de conteúdo é `contracts/course.ts`; `src/lib/course-schema.ts` é apenas o modelo de apresentação.

## Validar

```sh
pnpm typecheck
pnpm test
pnpm check:content
pnpm check:content -- --classroom
pnpm build
```

Os testes cobrem o acesso fechado, erros de tradução, requisitos pedagógicos, restauração, rubricas, respostas incorretas, isolamento por ferramenta/versão e merge de abas/tentativas. `check:content` exige paridade de IDs e cobertura dos 11 idiomas. A auditoria editorial de fontes está no currículo; revisão nativa das traduções permanece pendente.

Build e validação desta prévia não certificam estudo integral das fontes nem liberação pedagógica. A revisão de conteúdo é responsabilidade da frente editorial; o aviso de conteúdo e traduções em revisão permanece visível na experiência.

Veja `docs/APP_QA.md` para resultados e limitações reais da entrega. O acesso externo da aula é registrado pelo aluno; o aplicativo não atesta a execução. `localStorage` não é garantia de preservação permanente: limpeza do navegador remove esses dados.

## Publicação

A beta está disponível em `https://ganesha-classroom.vercel.app/classroom`. O projeto existente do domínio encaminha `/classroom` para esse serviço, preservando a landing e os serviços Slack. O destino solicitado é `https://iganesha.online/classroom`; a validação direta desse hostname no ambiente Codex está limitada por um erro de confiança no certificado do proxy corporativo. Configuração dos domínios consta como válida na Vercel, e o encaminhamento foi verificado em `https://ganesha-devops.vercel.app/classroom`.

Contrato operacional: `docs/CLASSROOM_DEPLOY.md`. Evidências e limites da publicação: `coordination/PRODUCTION_RELEASE.md`. O pacote 0.3.0, com 12 aulas e 120 etapas, está em autoria e revisão separadas; ainda não substitui esta beta.
