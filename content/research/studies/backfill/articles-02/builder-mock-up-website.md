# Mock Up a Website in Five Prompts — estudo integral do texto

[Artigo de Alice Moore, Builder, 10/06/2025](https://www.builder.io/blog/mock-up-a-website). `source_id=builder-blog`; estudado em 28/09/2026. Texto integral lido: `studies/local/backfill-a02-builder-mock-up-website.txt`, linhas 1–174, 11.024 bytes. Inclui problema inicial, preparação, construção, mudanças, revisão, conclusão e chamadas comerciais. Quatro imagens centrais foram inspecionadas; sete elementos de vídeo/animação permanecem não assistidos.

`text_read_complete=true`; `full_source_analyzed=false`. O manifesto guarda texto lido como `kind=text`, HTML apenas coletado como `kind=raw_html`, hashes e cobertura. As imagens são capturas locais do navegador; não houve download de vídeo. Originais permanecem ignorados pelo Git, sem licença de republicação presumida.

## Sequência inteira da fonte

| Linhas | Reconstrução concisa |
| --- | --- |
| 8–24 | Apresenta tensão entre rapidez, flexibilidade e interação de protótipos. |
| 26–38 | Promove editor conectado ao código, GitHub, contexto visual e revisão por PR. |
| 40–60 | Prepara negócio fictício: identidade, páginas, objetivo e estilo; informa tecnologia/créditos da época. |
| 61–75 | Gera site de padaria e conecta repositório para histórico. |
| 77–95 | Botão de pedido só mostra alerta; cria branch/PR e solicita fluxo simulado com JSON. |
| 97–113 | Usa referência visual externa, preserva estilo da padaria e examina componentes/dados gerados. |
| 115–123 | Corrige título alterado pela importação por edição visual e aplicação ao código. |
| 125–137 | Pede ao bot, num comentário de PR, remoção de suporte a vídeo; relata correção e aponta prévia para conferir. |
| 139–174 | Reconhece exemplo simplificado, reafirma direção humana, sugere publicação futura e promove Builder. |

As cinco etapas combinam chat, referência visual, edição direta e comentário de revisão; não são cinco mensagens intercambiáveis. O carrinho usa dados fictícios. A publicação é sugerida, não demonstrada. A referência importada trouxe uma funcionalidade não desejada, mostrando necessidade de revisar o escopo além da aparência.

## Evidência visual e estado das correções

| Captura em `studies/local/` | O que foi efetivamente visto |
| --- | --- |
| `backfill-a02-builder-tradeoffs.png` | Comparação retórica entre ferramentas; não é avaliação quantitativa independente. |
| `backfill-a02-builder-order-alert.png` | Botão de pedido produz aviso de recurso ainda indisponível; sustenta a limitação inicial. |
| `backfill-a02-builder-bot-comment.png` | Comentário pede retirar vídeo; aparecem resposta do bot e nove commits relacionados. |
| `backfill-a02-builder-video-diff.png` | Um trecho de diff remove propriedades relacionadas a vídeo do uso de um cartão. |

As imagens foram abertas a partir de URLs observadas no DOM e inspecionadas. O diff sustenta uma alteração de código, mas não demonstra que todos os comportamentos foram retestados. A mensagem do bot também não é um teste. A autora indica usar a prévia; esta pesquisa não executou o protótipo nem examinou todas as mudanças.

Sete tags `video` estavam no corpo renderizado, sem `src`, `source` ou poster disponível naquele estado observado. Isso não comprova inexistência do conteúdo; as animações permanecem pendentes. Em especial, o funcionamento do carrinho e as transições entre editor, branch e PR não foram verificados como sequência audiovisual. Não se certifica antes→depois funcional completo com base apenas nos quadros estáticos.

## Pré-requisitos e superfícies

O fluxo descrito usa Builder no navegador e conta GitHub vinculada. Também menciona extensão de navegador, plugin Figma, branches, PRs e bot de revisão. Para acompanhar integralmente, o aluno precisa distinguir prévia, arquivo, repositório, versão principal e proposta de alteração. O texto pressupõe que a integração e o ambiente criado pela ferramenta funcionam; não oferece solução detalhada para falhas de autenticação ou permissões.

O que transfere para outras ferramentas é preparar o pedido, testar a interação prometida, delimitar uma mudança e conferir o resultado. Rótulos e recursos apresentados não são instruções de Claude Desktop ou Codex. A tecnologia padrão e os limites de crédito citados são informações de junho de 2025, não oferta atual confirmada. Não reproduzir a promessa de tempo ou custo da demonstração como garantia ao aluno.

## Análise editorial e limites das alegações

O artigo é do fornecedor e combina tutorial com promoção. A comparação de ferramentas é um enquadramento comercial; seus rótulos não foram validados contra produtos atuais. O estudo também não mediu velocidade, precisão de código ou esforço de revisão.

**Inferência curricular:** o caso mais útil é o botão que existe visualmente, mas não realiza a tarefa esperada. Permite ensinar que uma página renderizada e uma ação concluída são evidências diferentes. O passo seguinte deve definir o comportamento esperado antes de declarar o botão corrigido.

O fluxo simulado com dados fictícios não comprova pagamento, persistência de pedidos, estoque, autenticação ou integração real com negócio. A existência de código num repositório também não demonstra prontidão de produção. Esses são limites desta evidência, não diagnósticos de defeitos no produto do fornecedor.

O título mudou durante a importação e um suporte a vídeo apareceu sem ter sido pedido. Ambos são exemplos de expansão do resultado além da intenção. O curso pode usar essa sequência para pedir ao aluno que compare a referência visual com os requisitos próprios. Uma referência serve para comunicar uma característica; não deve se tornar autorização implícita para copiar todos os comportamentos.

A afirmação da autora sobre reutilizar conteúdo de qualquer site não foi verificada. A prática original abaixo usa referências próprias ou autorizadas. Nenhuma permissão ou licença externa é presumida a partir da frase do artigo. O conteúdo original foi estudado, mas não é republicado pela ficha.

## Pertinência, duplicação e lacunas

É uma boa fonte de estudo posterior a L01 para observar criação e revisão de uma página interativa. Em L01, aproveitar apenas a preparação do pedido e definição dos critérios; a entrega continua sendo plano revisado. A fonte permanece no corpus completo mesmo que nem todas as suas ferramentas entrem no caminho inicial do curso.

Há sobreposição com os artigos de intenção visual e revisão de código estudados em articles-01. A contribuição específica é encadear uma falha de interação, mudança de aparência e retirada de funcionalidade indevida no mesmo exemplo. As animações ainda pendentes limitam a certificação operacional do tutorial.

Lacunas: instalação/integração detalhada, diagnóstico de erros de ambiente, cenários de teste completos, acessibilidade, prova de funcionamento móvel e publicação verificada por visitante. O artigo não substitui a fonte oficial de hospedagem. Não há necessidade de ensinar compra, pagamento ou API no primeiro protótipo para aproveitar a sequência pedagógica.

## Prática original: catálogo com pedido de demonstração

Proposta deste estudo; não executada. Criar uma cópia de catálogo de três serviços ou produtos fictícios, cada um com nome e valor de demonstração. O objetivo é que uma pessoa selecione itens, confira quantidades e veja um resumo. Não recebe pagamento, não envia pedido real e não coleta dados pessoais.

**L01:** escrever e revisar o plano: itens, público, ação principal, o que é simulação, comportamento esperado e limites. Preparar dois cenários de teste antes de construir. Usar uma referência visual própria para comunicar só uma característica, como organização em cartões; listar comportamentos que não devem ser importados.

**Etapa posterior de construção:** pedir primeiro a estrutura e depois uma interação. Exemplo original: “Ao clicar em Selecionar, adicione o item ao resumo local. Permita aumentar, diminuir e remover quantidades. Identifique a página como demonstração e mostre o total calculado a partir dos três valores fornecidos. Não adicione pagamento ou cadastro.” Conferir a prévia antes de outra rodada de estilo.

**Check 1 — tarefa completa com valores conhecidos:** selecionar duas unidades do primeiro item e uma do segundo; comparar quantidades e soma esperadas com o resumo. Remover um item, esvaziar tudo e observar o estado vazio. Se houver apenas um aviso genérico ou o total não acompanhar a quantidade, registrar passos, esperado e observado; pedir correção e repetir exatamente a mesma sequência.

**Check 2 — regressão e escopo após ajuste visual:** alterar título ou organização dos cartões usando referência autorizada. Repetir o Check 1 e conferir que não surgiram vídeo, cadastro, envio real ou botões sem função. Comparar texto e destino de cada ação com o plano. Solicitar lista dos arquivos alterados e revisar mudanças não explicadas antes de aceitar a versão.

Entrega: plano, estados de antes/depois, resultado dos dois checks e limites restantes. Uma eventual publicação vem depois, com a fonte oficial de hospedagem e teste da URL por visitante. O exercício não registra protótipo simulado como sistema comercial pronto para clientes.

## O que não foi revisado

Não foram assistidas as sete animações/vídeos, executado Builder, criado repositório, enviado comentário ao bot, revisado PR real ou publicado site. Não foram auditadas integrações, planos atuais ou direitos de referências externas. Texto integral e quatro imagens relevantes estão concluídos; a fonte multimídia integral permanece pendente.
