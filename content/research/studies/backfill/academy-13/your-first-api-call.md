# Your first API call — chamada, resposta e preparação do ambiente

[Aula da Claude Academy](https://academy.claude.com/courses/claude-platform-101/your-first-api-call), texto integral lido em 28/09/2026. Artefato `studies/local/backfill-ac13-first-api.txt`, com as três figuras observadas. Duas capturas foram preservadas; a figura de credencial tem apenas nota de inspeção, sem copiar ou testar o valor exposto. Vídeo `j0ftK_R5DTs` pendente, sem controle Transcript observado. `text_read_complete=true`; nenhuma certificação audiovisual ou execução desta pesquisa.

## Percurso completo da aula

O texto começa pela obtenção de chave e instalação do SDK TypeScript. Em seguida descreve uma chamada com modelo, limite de saída e mensagens. O primeiro exemplo é uma saudação; o segundo pede revisão de uma função chamada `add` que subtrai. Acrescenta instrução de sistema para resposta curta e percorre blocos retornados, imprimindo apenas os de texto.

A aula destaca que a resposta é uma coleção de blocos, não uma string única. Depois propõe envolver a mesma chamada numa rota de produto para resumir uma reunião, salvar o resultado e devolvê-lo à interface. Encerra recapitulando preparação, parâmetros e leitura da saída. O trecho de integração com banco é descrição, sem implementação completa na página.

## Evidência visual e limite de procedimento

A figura do console apresenta um diálogo de criação de chave e aviso para guardá-la. Há um valor com aparência de credencial visível; não foi transcrito, usado ou salvo numa captura local. A validade e a revogação são desconhecidas. A nota `backfill-ac13-first-api-1-observation.txt` documenta essa inspeção sem reproduzir o valor. O curso deve usar representação fictícia para explicar esse passo.

A figura de terminal mostra execução do arquivo TypeScript por `tsx` e uma resposta que identifica subtração no lugar de soma. Isso sustenta que a demonstração apresenta um diagnóstico textual. Não mostra alteração da função ou teste que prove a correção. A terceira figura mostra painel local com duas reuniões, prévias de transcrição e botões para gerar resumo; não mostra resumos gerados, persistência após recarga ou teste de erro.

Portanto, há uma sequência de código e resposta de revisão, mas não um app completo implantado. A biblioteca instalada não fornece automaticamente a preparação do runtime, do ambiente, da rota e da interface. Também não há log completo da chamada que permita auditar consumo, configuração ou todos os blocos recebidos.

## Correção necessária antes de adaptar

A aula apresenta salvar a chave em `.env.local` como forma de mantê-la fora do versionamento. O nome do arquivo, sozinho, não estabelece isso. A [documentação do Git](https://git-scm.com/docs/gitignore) define exclusão por regras de ignore e esclarece que arquivos já rastreados não são afetados. Para uma prática, conferir a regra e o estado do arquivo com valor fictício; não presumir proteção pelo nome.

O [SDK oficial TypeScript](https://github.com/anthropics/anthropic-sdk-typescript) usa a variável de ambiente `ANTHROPIC_API_KEY` por padrão e se destina a aplicações no servidor. Isso exige que a variável chegue ao processo; o exemplo da aula não demonstra carregar `.env.local` no runtime escolhido. O SDK também desabilita uso no navegador por padrão devido à exposição de credenciais. Foram lidos esses trechos específicos, sem estudar toda a documentação ou executar instalação.

A menção da aula a crédito inicial gratuito não foi verificada como oferta para novas contas e não deve ser prometida ao aluno. Nomes de modelos, preços e elegibilidade são dados do exemplo ou pontos ainda pendentes de validação no ambiente real.

## Análise e pertinência

O caso da soma tem resposta verificável sem depender da autoridade do modelo: entradas conhecidas permitem calcular o resultado esperado. É um bom ponto para separar diagnóstico, mudança e teste. A resposta correta sobre um trecho minúsculo não demonstra capacidade de revisar qualquer projeto, nem prova que um pedido de “revisor sênior” produz revisão confiável.

A integração de resumo acrescenta exigências que a chamada isolada não resolve. É preciso saber qual reunião foi lida, distinguir processamento de conclusão e conferir o resultado antes de salvar ou apresentar. Tratar todos os blocos como texto pode falhar quando aparecem outros tipos; ignorá-los sem avaliar o fluxo também pode ocultar uma etapa incompleta. A fonte introduz a estrutura, sem ensinar todos os protocolos posteriores.

## Prática original proposta

Em ambiente de ensaio preparado, usar uma pequena função de total de itens fictícios. Primeiro definir duas entradas e totais esperados; pedir revisão, comparar o diagnóstico e só depois propor correção. Esta pesquisa não realizou a prática, não criou chave e não enviou solicitações pagas.

1. **Resultado verificável:** registrar entrada, esperado e diagnóstico. Depois da correção, executar os mesmos casos e um vazio. Uma explicação plausível não substitui as saídas.
2. **Preparação sem segredo real:** com valor fictício, conferir se a variável chega ao processo e se o arquivo de configuração está corretamente fora do versionamento. Não imprimir uma chave verdadeira para demonstrar carregamento.
3. **Erro de integração:** simular resposta sem bloco textual ou falha na chamada e verificar mensagem de estado, encerramento do carregamento e nova tentativa. Definir o que acontece com uma saída anterior.

L01 permanece plano revisado; programação e integração são propostas posteriores. Pendências: vídeo, runtime, autenticação própria, chamada real, recuperação e produto completo. Originais internos ignorados pelo Git; não há licença de republicação presumida.
