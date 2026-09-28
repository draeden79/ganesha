# MCP — conexão, autenticação e resultado são verificações diferentes

Fonte: [MCP, Claude Academy](https://academy.claude.com/courses/claude-code-101/mcp), aula 11 de Claude Code 101, observada em 28/09/2026; vídeo `kkBFmwkDzdo`. Os onze parágrafos da transcrição oficial e todo o texto complementar foram lidos; seis imagens foram inspecionadas. O vídeo contínuo e a correspondência integral entre fala e transcrição seguem pendentes.

## Sequência do conteúdo

A aula apresenta MCP como ligação entre o agente e ferramentas ou dados externos. Usa Linear e Context7 como exemplos. Distingue servidores HTTP remotos de processos locais via stdio, introduz o comando de adição e a gestão por `/mcp`, e explica os escopos local, usuário e projeto. Termina discutindo o espaço ocupado por definições de ferramentas, alternativas por CLI e skills, e busca de ferramentas conforme a configuração.

Não há no texto uma implementação de servidor nem um fluxo completo de instalação, autenticação, chamada, erro e recuperação. Distribuir a configuração de um projeto não demonstra que cada colaborador tenha credenciais, autorização ou acesso à mesma informação.

## Conferência das seis imagens

| Imagem | Observação material | Limite da conclusão |
|---|---|---|
| 0 — Linear | A interface registra autenticação concluída e pede permissão para uma consulta de issue. | O pedido de permissão está aberto; o conteúdo retornado da issue não aparece. |
| 1 — Context7 | Há busca/leitura no projeto e pedido para resolver o identificador de uma biblioteca. | Resolver o identificador não é recuperar toda a documentação; a autorização da chamada ainda está pendente. |
| 2 — HTTP | Um comando para adicionar o servidor Linear está digitado. | Não há saída de sucesso nesse quadro. |
| 3 — stdio | Um comando aponta para um script Python local. | Não há execução nem conteúdo do script demonstrados nesse quadro. |
| 4 — lista de servidores | Chrome e Context7 aparecem conectados; Linear e Figma pedem autenticação. | A lista mistura estados. O texto alternativo genérico da imagem não autoriza chamar todos os servidores de conectados. |
| 5 — detalhe local | Dev-utils aparece conectado, com oito ferramentas e opções de listar, reconectar e desabilitar. | Contagem e conexão não comprovam que alguma ferramenta concluiu uma tarefa. |

Essas imagens são estados isolados da demonstração. A sequência não permite deduzir duração, ausência de falhas entre quadros ou persistência de autenticação. A inspeção não conectou nenhuma conta nem executou as chamadas mostradas.

## Atualização conferida na documentação

A aula generaliza carregamento antecipado das definições e menciona o limiar de 10%. A documentação atual descreve descoberta adiada como comportamento padrão, com variações por configuração/provedor; o limiar pertence ao modo `ENABLE_TOOL_SEARCH=auto`. Portanto, não ensinar 10% como regra universal. A leitura adicional cobriu somente a seção relevante, sem declarar consumo integral do documento. [MCP tool search](https://code.claude.com/docs/en/mcp#scale-with-mcp-tool-search).

## Aplicação ao curso

Uma pessoa que está construindo seu primeiro site ou app precisa definir primeiro qual informação externa realmente falta. Adicionar conectores por quantidade não cria uma entrega melhor. O uso faz sentido quando há uma pergunta concreta e uma forma de conferir a resposta ou a ação realizada.

O curso deve distinguir disponibilidade da ferramenta, autenticação, permissão para uma chamada e qualidade do resultado. Um indicador de conexão resolve apenas parte dessa cadeia. Nas imagens, até chamadas de leitura exigem uma decisão antes da execução. Esse detalhe oferece um exemplo concreto para explicar ao aluno o que está sendo solicitado naquele momento.

## Prática original: conferir uma consulta antes de alterar o projeto

Proposta não executada. Preparar uma tarefa fictícia com título, identificador e três critérios de aceitação. Primeiro, entregar esses dados ao agente em texto, pedir que os transforme em plano e comparar o resultado com a ficha original. Isso cria uma referência sem depender de conta externa.

Quando o ambiente de ensino já oferecer uma conexão autorizada, repetir com uma tarefa real apropriada ao exercício, inicialmente por leitura. Registrar serviço, identificador consultado, campos esperados e resultado retornado. Não solicitar mudanças na ferramenta externa durante essa comparação.

1. **Objeto correto:** conferir o identificador e um campo conhecido no resultado. Retornar uma tarefa com título parecido é falha, mesmo que a chamada esteja marcada como bem-sucedida.
2. **Dados suficientes:** comparar os três critérios de aceitação. Se a resposta omitir um deles, buscar a informação faltante antes de planejar a implementação.
3. **Recuperação compreensível:** diante de ferramenta indisponível ou autenticação pendente, registrar o estado e o passo necessário. Não inventar o conteúdo esperado nem usar a mensagem de conexão como evidência de consulta concluída.

Entrega: pergunta delimitada, fonte identificada, observação da chamada quando aplicável, comparação com os dados esperados e um plano revisado. A etapa não altera a regra de L01: o resultado inicial é o plano, antes da edição de arquivos.

## Proveniência e pendências

Textos em `studies/local/backfill-ac05-mcp.txt` e `-summary.txt`; transcrição limpa em `transcripts/local/kkBFmwkDzdo.academy.txt`; imagens `backfill-ac05-mcp-0.png` a `-5.png`. Hashes e intervalos estão no manifesto. Não houve instalação, conexão de conta, execução de servidor ou teste de desempenho. Vídeo integral, cobertura de fala e prática permanecem pendentes. Publicação não identificada; originais internos ignorados pelo Git, sem licença de republicação presumida.
