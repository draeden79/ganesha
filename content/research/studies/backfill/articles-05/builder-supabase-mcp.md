# Five things to try with the Supabase MCP server — texto integral e telas

[Artigo de Alice Moore, Builder, 30/09/2025, atualizado em 21/10/2025](https://www.builder.io/blog/supabase-mcp). `source_id=builder-blog`; estudo em 28/09/2026. Texto completo lido em `studies/local/backfill-a05-builder-supabase.txt`, linhas 1–160. Cinco imagens materiais inspecionadas. Cinco vídeos com posters não foram acompanhados: `text_read_complete=true`, `full_source_analyzed=false`.

Alguns exemplos anunciam um prompt que não aparece no texto renderizado. O estudo registra essa ausência e não reconstrói o comando a partir do resultado prometido. Hashes, bytes, intervalos e telas conferidas estão no manifesto.

## Sequência completa descrita

| Linhas | Etapa e função |
| --- | --- |
| 8–30 | Define a conexão entre agente e backend e a situa no ecossistema MCP. |
| 32–46 | Apresenta a mudança para servidor remoto e vantagens alegadas do uso com Fusion. |
| 48–72 | Conecta organização; configura projeto por URL/chave pública ou solicita configuração automática. |
| 73–79 | Pede tabela de depoimentos e ligação ao frontend, em branch nova. |
| 81–93 | Caso 1: formulário de newsletter e persistência de inscrição. |
| 95–101 | Caso 2: design Figma e CSV alimentando componente dinâmico. |
| 103–111 | Caso 3: gráfico com dados e componentes já usados no projeto. |
| 113–119 | Caso 4: área administrativa com autenticação. |
| 121–131 | Caso 5: geração de descrição via função no servidor, com segredo; sugere cache como evolução. |
| 133–160 | Convite de uso, promoção e indicações. |

O prompt da tabela de depoimentos consta no texto. Outros comandos anunciados não constam integralmente. Os resultados são descritos pela autora; não há no texto logs, esquema final ou sequência erro→correção→reteste.

## Visuais conferidos e consequências para a leitura

As cinco capturas `studies/local/backfill-a05-supabase-0.png` a `-4.png` mostram capa, arquitetura cliente/servidor/serviço, área de integrações, autorização e configurações de ambiente.

A arquitetura ilustra que o servidor MCP dá acesso a operações de outro serviço. A captura de integrações localiza o controle, mas inclui texto de disponibilidade futura; não comprova conexão ativa ou estado atual do produto. Na captura OAuth, a autorização se aplica à organização selecionada e a todos os seus projetos, com operações de leitura/escrita abrangentes e acesso indicado a configurações e segredos. Não é uma ilustração de permissão limitada a uma tabela.

A tela de ambiente mostra valores exemplificativos de URL e chave anon. Ela não demonstra as políticas de acesso do banco. A instrução posterior sobre chave da API de geração aparece em outro contexto, como segredo da função no servidor. Não fundir essas duas categorias num único passo genérico de “colar a chave”. Nenhuma autorização foi concedida durante a pesquisa.

Cinco elementos de vídeo foram encontrados no corpo, com posters e sem fonte de reprodução no estado DOM observado. Não se concluiu que não existem; apenas que suas sequências não foram estudadas. Imagens de configuração não comprovam os cinco resultados operacionais.

## Mecanismo e limites da evidência

**Análise editorial:** o artigo reúne três camadas que o aluno precisa identificar: a ferramenta do agente, o destino de dados e a interface usada pelo visitante. Uma mensagem de sucesso do agente comprova apenas seu relato. Para verificar integração, seguir o mesmo identificador de ensaio pela interface até o registro no destino, e verificar se o comportamento persiste após recarregar.

A existência de login também não define quem pode editar quais registros. O texto chama o painel resultante de seguro, mas não apresenta papéis, políticas, testes negativos ou acesso direto ao recurso. Não ensinar que adicionar Supabase Auth certifica proteção de toda a aplicação. O procedimento curricular deve definir o comportamento permitido e conferir pelo menos um caso permitido e um negado em ambiente de ensaio.

A autora atribui melhores propriedades de segurança ao servidor remoto atualizado. Esta ficha registra a alegação e a tela observada; não realizou comparação técnica entre implementações nem confirmou configuração atual do serviço. A autorização ampla ilustrada é razão concreta para esclarecer escopo no plano, sem transformar a leitura num tutorial de administração de produção.

O exemplo de descrição de produto introduz uma nova dependência de execução, custo e variabilidade. Ter uma função no servidor não comprova que uma descrição gerada respeita os dados do produto. Cache também precisa de regra de atualização. Essas observações conectam esta fonte ao experimento de site gerado durante a navegação, estudado no mesmo lote; são inferências editoriais, não defeitos observados nos projetos da autora.

## Pré-requisitos e adequação

Reprodução pressupõe contas Builder/Fusion e Supabase, organização acessível, projeto identificável e conhecimento de qual ambiente é de teste. Os cinco casos acrescentam dependências diferentes: design e CSV, biblioteca visual existente, usuários e papéis ou serviço externo de geração. Não são cinco prompts intercambiáveis que dispensam preparação.

Para pessoa comum, o primeiro caso pode servir como introdução orientada a persistência. Painel administrativo e geração com API pertencem a etapas posteriores. A fonte não ensina recuperação de dados, política de acesso completa ou solução de falha de conexão. Esses detalhes permanecem no corpus como lacunas, sem excluir os casos técnicos.

O artigo foi atualizado em outubro de 2025; rótulos, conectores e permissões atuais não foram conferidos. Não é instrução de Claude Desktop ou Codex: a sequência visual pertence a Builder/Fusion. A declaração de ausência de alternativa equivalente é contextual à fonte, sem pesquisa comparativa atual nesta ficha.

## Pertinência e relação com o curso

Complementa Wishboard em articles-04 e Figma→site em articles-03 ao detalhar conexão e oferecer cinco tipos de uso. Existe sobreposição nos serviços e nas telas; a contribuição nova é separar requisitos de cada caso e tornar explícita a diferença entre configurar acesso, persistir dados e autorizar uma ação do visitante.

L01 termina no plano revisado, com origem/destino dos dados, permissões esperadas e duas verificações. Não conectar serviços nessa aula por causa deste artigo. As demos e prompts ausentes continuam pendentes; a ficha não é substituto de quickstart oficial atualizado para configurar cada serviço.

## Prática original: mural de recados com dados fictícios

Exercício proposto, não executado. Em projeto de teste preparado, planejar um mural que lê recados de uma tabela. Visitantes podem ler; apenas um usuário de ensaio com papel definido pode acrescentar ou editar. Usar conteúdo fictício. Registrar qual tabela e projeto serão usados e qual ação será considerada sucesso antes de executar.

**Check 1 — circuito de dados:** acrescentar um recado com identificador único pelo fluxo permitido, conferir a linha no destino e recarregar a interface. Alterar esse recado e conferir que a mudança aparece no mesmo item, sem criar cópia inesperada. Se houver discrepância, registrar passos, observado e esperado, corrigir e repetir.

**Check 2 — permissão e estado de erro:** abrir uma sessão visitante de ensaio e tentar a operação de escrita pelo fluxo disponibilizado; ela deve ser negada conforme o plano, com mensagem compreensível e sem mudança nos dados. Voltar ao papel autorizado e confirmar que a escrita funciona. Isso verifica os casos da prática, não certifica segurança completa. Se o ambiente não permitir executar esse teste, registrar pendência em vez de aprovar com base na presença de login.

Após qualquer ajuste de permissão, repetir o circuito de dados; após ajuste de interface, repetir a negação. Entrega: plano, identificação do ambiente de ensaio, resultados das duas sessões e reteste. Não incluir credenciais nos registros da atividade. A fonte não mostrou esses checks executados; são construção pedagógica original.

## Não revisado

Não foram assistidos os cinco vídeos, executados prompts, conectadas contas ou auditados banco, políticas, funções e segredos reais. Guias externos e versões atuais não foram estudados nesta ficha. Brutos e capturas são locais e ignorados pelo Git, sem licença de republicação presumida.
