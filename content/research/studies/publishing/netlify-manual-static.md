# Publicar e atualizar uma página estática por upload manual

Estudo em 2026-09-28. **Procedimento documentado; nenhuma conta criada, arquivo enviado ou configuração alterada.** Não há publicação real validada neste estudo.

## Fontes e cobertura

Principal: [Netlify Drop Quickstart](https://docs.netlify.com/start/quickstarts/netlify-drop-quickstart/), atualização exibida em 2026-07-28. Lido integralmente o Markdown oficial, **linhas 1–86**, numa leitura sequencial. Original interno: `studies/local/publishing-netlify-drop.md`, 7.829 bytes, SHA-256 `631f0cc805e5e64c9a99cf3480282a79b504d7fa34e94f3ceb2448110fc1fc4d`.

Único complemento: [Project visibility](https://docs.netlify.com/manage/security/secure-access-to-sites/project-visibility/), atualização exibida em 2026-08-19. Lidas integralmente **linhas 1–112** do Markdown oficial. Original interno: `studies/local/publishing-netlify-visibility.md`, 8.198 bytes, SHA-256 `03e6fc8fa9e6e67dee726653cadd27a968b8e1c3a320dc598317794d20d65fdb`. Resolve a lacuna entre receber uma URL e disponibilizá-la a visitantes.

A leitura inclui a alternativa com agentes, avisos sobre planos, permissões, configurações da equipe e webhooks; esses conteúdos não foram omitidos da análise por estarem fora da prática escolhida. As páginas renderizadas também foram conferidas para autoria, data e ilustrações. Links para outras páginas não foram estudados. Capturas e hashes estão no [manifesto](manifest.json); os originais permanecem ignorados pelo Git.

## Fatos documentados, na ordem da fonte

**Principal:** apresenta upload sem Git; publicação por conta/equipe, pasta e URL; depois distingue acesso público de privado; oferece atualização por agentes ou pasta; encerra com diagnóstico. A opção por pasta atualiza produção diretamente. O upload sem login pode ter senha temporária; builds dependem de login. A página cita `index.html`, rede, navegador, memória e tamanho: recomenda menos de 50 MB; arquivos acima de 10 MB podem travar. Esses números são orientações operacionais, não garantia de plano. Evidências: linhas 8–32, 34–42, 44–70, 72–86. [Fonte principal](https://docs.netlify.com/start/quickstarts/netlify-drop-quickstart/).

**Complemento:** define público/privado e diferenças entre planos; trata padrões de equipe e previews; mostra Make public após deploy de produção; depois convites, papéis, padrão de novas equipes, experiência do visitante e limitação de webhooks privados. Owners e Developers com acesso podem alterar visibilidade; Internal Builders não. A política Private for all projects impede exceção individual. Equipes novas desde 2026-07-28 podem começar privadas. Produção e previews têm controles distintos. Evidências: linhas 8–43, 45–81, 83–112. [Visibilidade](https://docs.netlify.com/manage/security/secure-access-to-sites/project-visibility/).

## Percurso curto proposto ao Educador

**Público e seleção:** pessoa que já tem uma página simples funcionando e sabe localizar uma pasta. A fonte acrescenta o elo de publicação ausente nos exemplos locais de Tim; não repete ensino de editor/CLI. É adequada ao corpus enxuto porque publicação e atualização estão na mesma página. Não exige transferir ações de um agente de terminal para Desktop. O complemento é necessário para verificar acesso externo.

**Preparação editorial da prática:** entregar uma pasta `meu-site` contendo `index.html` com conteúdo real e os arquivos locais usados pela página, por exemplo `estilo.css` e `imagens/`. O arquivo inicial deve ficar diretamente nessa pasta para eliminar ambiguidade do exercício. Não usar um projeto que exija compilação, servidor ou credenciais. Essa redução de escopo é desenho pedagógico; a documentação cobre projetos mais amplos. A dica da fonte sobre um HTML vazio não é critério de página concluída: arquivo em branco não satisfaz o resultado do aluno.

1. **Pré-conferência local:** abrir a página preparada; confirmar um título, uma imagem e um link. Registrar uma frase visível de versão, como “Rascunho A”. Guardar a pasta original antes de alterar.
2. **Destino:** usar a conta/equipe escolhida e entrar em [Netlify Drop](https://app.netlify.com/drop). Levar a pasta ao campo de upload; aguardar o resultado. Não criar outro projeto para cada revisão. Etapa documentada na principal, linhas 18–26.
3. **Acesso externo:** copiar a URL apresentada. Se o projeto estiver privado, localizar Make public ou as configurações de visibilidade; conferir que se trata da produção desejada. A ação depende do papel/política de equipe descritos no complemento, linhas 45–64 e 73–93. A execução real desta etapa ainda não ocorreu.
4. **Conferência do visitante:** abrir essa URL em uma janela sem a sessão Netlify do dono ou em outro navegador não autenticado. Ver o conteúdo, imagem e link; não aceitar a tela do painel como evidência de acesso público. Esse teste é proposta editorial, ausente como teste executado nas fontes.
5. **Alteração e republicação:** trocar “Rascunho A” por “Versão B” localmente e repetir o teste local. No mesmo projeto, usar a área Production deploys para enviar a pasta atualizada. Reabrir a URL externa e verificar a mudança e os três elementos anteriores. Referência operacional: principal, linhas 60–70; verificação de regressão: proposta editorial.

## Falhas e recuperação ensináveis

| Sintoma no exercício | Diagnóstico proposto e evidência exigida |
| --- | --- |
| Página abre só para o dono | Comparar sessão autenticada e visitante; verificar acesso/papel antes de reenviar arquivos. Registrar a tela vista pelo visitante. |
| Site vazio ou recursos ausentes | Inspecionar a pasta efetivamente selecionada e abrir seu HTML localmente; conferir nomes/caminhos das imagens. Corrigir o pacote e repetir a mesma verificação externa. São passos de diagnóstico propostos, não erros reproduzidos neste estudo. |
| Upload não termina | Consultar os limites/recomendações da fonte e a conexão; registrar o estado e a mensagem. Não presumir que várias tentativas idênticas resolvem a causa. |
| Versão antiga continua visível | Conferir pasta, projeto e frase de versão antes de nova publicação; distinguir um arquivo local alterado de uma entrega remota confirmada. |
| Controle de acesso não aparece | Verificar papel e política de equipe; não inferir que o conteúdo precisa ser reenviado nem ensinar mudança global como resposta automática. |

**Duas checagens mínimas e distintas:** (a) acesso: o visitante sem sessão vê a página; (b) comportamento: imagem/link funcionam e a nova frase aparece após atualização. Uma terceira checagem de regressão repete as funções anteriores. Entrega do aluno: URL, evidência da versão A, evidência da B e resultado das checagens. Um marcador de publicação bem-sucedida sozinho não aprova a prática.

## Visuais, atualidade e limites

Foram vistos os dois PNGs oficiais: URL destacada no painel e área de upload dentro de Production deploys. Também foram vistos estados selecionados dos dois GIFs oficiais: lista de projetos/área de upload, projeto existente para atualização e resultado visual do exemplo. São **ilustrações da documentação**, não telas de uma conta operada neste estudo. A imagem de republicação contém data de novembro de 2025, portanto o curso precisa conferir rótulos na interface disponível ao aluno.

O texto integral das duas páginas foi estudado. As animações não foram examinadas quadro a quadro; a fonte principal permanece `partial` com `full_text_analyzed=true` e `full_source_analyzed=false`. O complemento textual está `full_source_analyzed`, limitado à página e sem execução de seu procedimento. **Estudo da documentação e validação operacional são estados independentes.**

Falta validar em ambiente real: criação/login da conta escolhida, papel efetivo, localização atual dos campos, upload inicial, configuração pública, visitante sem sessão, republicação na mesma URL e recuperação de erro. Não foram pesquisados preços em detalhe, domínio próprio, backend, formulários ou rollback. Esta ficha não permite prometer hospedagem gratuita ilimitada nem publicação de qualquer aplicativo.
