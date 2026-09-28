# Testes intermitentes — localizar a falha antes de declarar correção

Fonte: Sami Jaber, [Eliminating and Debugging Flaky Integration Tests](https://www.builder.io/blog/flaky-integration-tests), Builder.io, publicado em 01/03/2023; observado em 28/09/2026. URL previamente inventariada. Leitura integral do corpo em inglês e dos blocos de código: `studies/local/backfill-a07-flaky-tests.txt`, linhas 1–129. Quatro imagens do artigo foram conferidas. Há um vídeo incorporado de Trace não acompanhado: `text_read_complete=true`, **`full_source_analyzed=false`**. O HTML preservado não conta como leitura integral.

## Argumento e sequência integral do texto

O autor escreve a partir da manutenção dos testes dos SDKs da Builder. Organiza o artigo em prevenção de condições de corrida, detecção de operações assíncronas esquecidas e investigação de testes que falham intermitentemente. O exemplo usa Playwright; o autor sugere utilidade mais ampla, mas não demonstra equivalência com outras ferramentas.

| Etapa | Evidência e função no raciocínio |
| --- | --- |
| Contexto, 8–12 | Experiência declarada na infraestrutura de testes e escolha de Playwright. Não há estatística inicial de frequência de falhas. |
| Estado do elemento, 14–53 | Exemplo de botão: localizar, conferir visibilidade, ler estilo calculado e comparar a cor. O autor relaciona leitura de elemento desconectado e substituições durante hidratação a falhas de sincronização. |
| Atualização da dica, 39–43 | Após comentário de outra pessoa, acrescenta que `toHaveCSS` atende melhor ao exemplo de CSS. Mantém a dica original para outros cálculos por avaliação no navegador. Essa correção editorial faz parte do conteúdo estudado. |
| Promises, 55–64 | Esquecer `await` em uma operação assíncrona pode tornar a sequência do teste inadequada. O autor indica a regra `no-floating-promises` e mostra um alerta no editor. |
| Investigação, 66–102 | Isolar o teste, repeti-lo, guardar trace e inspecionar relatório com etapas, capturas, rede e console. Os objetivos são reproduzir, entender e depois conferir que a instabilidade desapareceu. |
| Encerramento, 104–129 | Convite para retorno ao autor, publicidade contemporânea da Builder e cartões de outros artigos. Nenhum link, assinatura ou contato foi acionado. |

O procedimento escrito usa `test.only()` para reduzir o conjunto executado e configura `repeatEach: 100` com trace ligado. Em seguida aponta o relatório de falha como porta de entrada para a investigação. O texto termina sem mostrar o patch de um caso identificado e uma nova série de resultados após esse patch. Portanto, há instrução para retestar, mas não evidência de reteste completo de uma correção específica.

## Figuras e o que demonstram

Capturas locais `backfill-a07-flaky-tests-figure-1.png` a `-4.png`, obtidas da mídia da fonte no navegador:

1. Capa com configuração de trace e repetição; a imagem usa 10 repetições, enquanto o exemplo do corpo usa 100. São valores ilustrativos diferentes, não dois resultados de execução.
2. Console com elemento criado, anexado ao documento e depois removido, acompanhado de leituras de estilos. Mostra a diferença no objeto retornado no exemplo; não identifica por si só a causa de toda falha intermitente.
3. Editor com chamada assíncrona sem espera e diagnóstico da regra sobre Promises. Demonstra o alerta, sem mostrar a configuração completa do lint ou uma execução posterior aprovada.
4. Relatório com divergência entre cor esperada e recebida, tentativas, seções de etapas/capturas e acesso ao trace. É evidência de uma falha ilustrada, não de sua causa ou resolução.

O DOM continha um elemento `video` sem `src` ou `source` observável, junto da seção que anuncia demonstração do relatório. Não foi reproduzido, baixado ou substituído por inferência a partir da imagem. Esse conteúdo material mantém o estado da fonte incompleto, embora o texto esteja integralmente analisado. Não foram encontrados painéis expansíveis de conteúdo no corpo observado.

## Cuidado com o exemplo atualizado

A atualização é pedagogicamente valiosa porque o próprio autor revisa uma primeira solução. Porém o trecho curto publicado de `toHaveCSS` omite `await` e apresenta a string de cor sem fechamento do parêntese do valor CSS. Isso é observação do texto literal, não execução de teste nesta pesquisa. O snippet não deve ser transcrito para uma aula como código pronto e validado.

A fonte também usa leitura pontual de estilo seguida de comparação de string. Minha análise é que o objetivo pedagógico deve permanecer a sincronização com a condição relevante, não decorar essa string. Uma verificação de visibilidade e uma leitura posterior são duas operações; o artigo não prova que todo estado intermediário permaneça estável entre elas. A demonstração de um elemento removido não autoriza concluir que a hidratação seja a causa de qualquer teste que falhe.

Estes pontos não invalidam a contribuição histórica do artigo. Delimitam seu uso: reconstruir o diagnóstico, reconhecer a revisão do autor e consultar documentação oficial atual da ferramenta antes de transformar exemplos de 2023 em procedimento executável. Nesta rodada, os links técnicos externos não foram estudados e nenhum código foi corrigido ou executado.

## Análise original: três níveis de evidência

É útil separar três afirmações: o teste falhou; foi encontrada uma explicação compatível com a falha; uma mudança foi feita e verificada. Um trace pode sustentar as duas primeiras, mas o resultado de um teste posterior é necessário para a terceira. Se um agente apenas abre o relatório e descreve uma hipótese, seu trabalho ainda é diagnóstico.

Repetir ajuda a tornar um comportamento raro observável. Uma série sem falhas reduz a suspeita nas condições exercitadas, mas não garante ausência de falhas futuras, nem representa outros navegadores, dados ou ambientes automaticamente. O relatório deve incluir quantas execuções foram feitas e em que contexto; “agora passa” é uma afirmação menor que “o defeito foi eliminado”.

Isolar com `test.only()` serve à investigação, mas deixa os outros testes fora daquela execução. Como prática editorial adicional, proponho registrar quando a seleção foi removida e quando a verificação relevante do conjunto voltou a ocorrer. Essa etapa não está demonstrada no texto e não foi executada aqui. Sem ela, pode-se confundir um teste isolado verde com a suite validada.

O autor enfatiza esperas e análise de trace, não aumentar pausas arbitrárias até a falha desaparecer. Para o curso, a pergunta útil é “qual condição precisamos observar antes de continuar?” e não apenas “quanto tempo vamos esperar?”. Ainda assim, definir a condição correta exige conhecer o comportamento que a interface deve oferecer.

## Pré-requisitos, atualidade e pertinência

Execução técnica pressupõe projeto existente com Playwright, aplicação acessível, familiaridade com JavaScript/TypeScript, Promises, configuração de testes e interpretação de DOM. Lint precisa estar preparado para a regra citada; o artigo não fornece a instalação completa. Também não fornece um aplicativo de ensaio independente.

Para uma pessoa comum, o texto é adequado primeiro como mapa do processo de manutenção: reproduzir, guardar evidência, formular hipótese, corrigir e repetir verificações. A operação do código requer apoio e vem depois de entender o resultado esperado. O artigo permanece no corpus mesmo sendo técnico e de 2023; não deve ser usado como instrução atual sem conferência da ferramenta.

Complementa a ficha de TDD de `articles-03`: ali a ênfase é especificar comportamento; aqui é recuperar confiança quando a execução do teste oscila. Também complementa revisão de código ao mostrar evidência em execução. Não ensina necessidades de usuário ou publicação. L01 continua plano revisado; a ficha não altera currículo, configurações ou infraestrutura.

## Prática original: relatório e plano para uma confirmação intermitente

Proposta não executada. O instrutor prepara, para etapa posterior, uma aplicação fictícia com botão de envio, resposta com atraso controlado e confirmação exibida apenas após retorno. Em L01, fornece relatórios sintéticos de uma execução que passou e outra que falhou. O aluno entrega um plano de diagnóstico, declara sua hipótese e identifica qual observação poderia refutá-la. Não se registra pedido ou confirmação real.

**Check 1 — evidência antes da correção:** distinguir o clique, a resposta do serviço e o momento em que a confirmação aparece. O plano deve apontar qual condição o teste deveria esperar e qual trace ou registro mostra a ordem dos eventos. Se só houver mensagem final sem sequência, marcar a causa como hipótese e pedir a evidência faltante, sem afirmar que o defeito foi corrigido.

**Check 2 — reteste sem mascarar regressão:** na execução posterior autorizada, repetir o cenário de sucesso com diferentes atrasos previstos e também o cenário de resposta de erro. O primeiro deve aguardar e exibir confirmação; o segundo deve manter um erro claro, sem inventar sucesso. Registrar contagem, ambiente e resultado. Após uma correção, repetir ambos e restaurar o conjunto de verificações pertinente ao terminar a investigação isolada.

O check de erro impede “consertar” a intermitência fazendo a tela sempre anunciar sucesso. Se qualquer check falhar, conservar o caso e rever a hipótese antes de nova mudança. Uma série de ensaio aprovada comprova apenas os casos, atrasos e ambiente descritos; não equivale a validação de produção.

## Pendências e direitos

Vídeo de Trace pendente; referências oficiais externas, configuração de lint, código do autor e execução/reteste não revisados. A imagem do relatório não substitui esse audiovisual. Texto, HTML e capturas ficam locais e ignorados pelo Git, sem licença presumida para republicar os originais. Esta ficha é análise original com proposta de prática, não relato de correção realizada.
