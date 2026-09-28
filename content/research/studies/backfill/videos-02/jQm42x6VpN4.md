# Landing page em Cursor — geração, correção e publicação

Fonte: [Cursor Landing Page Full Tutorial (No Coding just AI Prompts)](https://www.youtube.com/watch?v=jQm42x6VpN4), Riley Brown, publicada em 2025-01-10 segundo aquisição existente. Estudo em 2026-09-28. Estado canônico anterior `not_started`; nenhuma ficha anterior encontrada.

**Parecer:** percurso curto que efetivamente vai de template local a página em Vercel e domínio próprio. É mais completo em publicação que demos apenas locais, mas pressupõe ferramentas/contas e pula detalhes que um iniciante precisaria resolver. Não mostra republicação, visitante sem sessão nem testes dos controles da página. A promessa de cinco minutos é promocional: não contabiliza instalação, contas, autenticação, espera e DNS.

## Leitura e cobertura

Faixa inglesa automática integral: **210 linhas/cues**, lidas sequencialmente 1–210 em `transcripts/local/aq.jQm42x6VpN4.en.d3c02d2cb33e.txt`, 14.443 bytes, SHA-256 `d3c02d2cb33e0347d52f53fc6f38bace1935f2fa303727d755c49a53d2347c04`. JSON3 de origem no manifesto; não é segunda leitura independente. A legenda corrompe marcas, domínio e comandos; não usar sua grafia como receita de instalação ou DNS.

Cues de 00:00,080 a 09:34,040; metadados e player mostram 09:32. Excesso final de 2,040 s sem verificação de fala. Quatro quadros inspecionados: 03:23, 08:13, 09:18 e 09:23. Texto integral lido; audiovisual, precisão de fala e fonte integral não certificados. O estudo não clonou template, executou comandos, criou repositório, publicou ou alterou DNS.

## Sequência completa

| Tempo | Ação e resultado |
| --- | --- |
| 00:00–00:40 | Promove Cursor e a facilidade de gerar landing page por imagem/prompts. Orienta baixar o editor; não demonstra instalação completa ou pré-requisitos de execução. |
| 00:41–01:28 | Abre pasta vazia, cria projeto e usa Command-I para Composer em modo Agent. Pede para executar um template GitHub do autor; a fonte não ensina o template por dentro. |
| 01:29–02:06 | Aceita comandos, instala dependências e inicia servidor `localhost:3000`. Abre a página local no navegador. Sua fala admite não explicar bem localhost; o aluno ainda precisa saber que esse endereço não é uma publicação externa. |
| 02:07–03:21 | Copia screenshot de referência e pede reprodução muito próxima, com troca do nome SayBriefly para SayShort. O agente cria SVGs, logos e metadados. Autor aceita alterações. Não há autorização/licença da referência analisada; uma prática original deve usar referência própria ou permitida. |
| 03:22–03:46 | A página apresenta falha de compilação. Autor cola erro no agente; resposta atribui a problema de classe Tailwind ausente e corrige arquivo. Não se mostra um diagnóstico independente ou explicação completa da alteração. |
| 03:47–04:31 | Página volta a renderizar. Autor nota logos estranhos e pede refinamento de cor, fonte e estilo pela mesma referência. Aparência inicial não foi perfeita. |
| 04:32–05:32 | Muda o conteúdo para create.inc, apresentado como lugar para descobrir APIs de texto, imagem, vídeo e outros recursos de IA. Isso é texto da landing page; não há integração funcional dessas APIs construída. Espera pela atualização é resumida. |
| 05:33–06:31 | Pede preservar o estilo e implantar em Vercel. Cria repositório GitHub e fornece referência ao agente para executar comandos. Autenticação Git/CLI e tratamento de falhas de push não são detalhados. |
| 06:32–07:44 | Entra na Vercel e acompanha comandos interativos de implantação: conta, novo projeto, nome, pasta e configurações. As respostas pertencem ao ambiente da gravação; “pressionar Enter” só faz sentido com aqueles prompts/valores. |
| 07:45–08:18 | Abre projeto/logs, vê construção progredir e estado Ready, visita URL `vercel.app`. Quadro de 08:13 mostra a landing page nesse domínio. |
| 08:19–09:15 | Usa domínio já comprado na Namecheap. Adiciona domínio no projeto Vercel e registros DNS indicados no painel; anuncia configuração correta. Não mostra compra, domínio com registros existentes, conflito, propagação lenta ou recuperação. |
| 09:16–09:34 da legenda | Abre create.inc e apresenta resultado; recapitula screenshot e poucos prompts. Encerra sem atualização posterior, teste de formulário, mobile ou visitante independente. |

## Evidências, erro e reteste

**03:23:** quadro mostra Build Error/Failed to compile em `app/globals.css`, com classe `border-border` inexistente e referência às diretivas Tailwind. Também aparece aviso de Next.js desatualizado. A causa exibida do bloqueio é a classe; o aviso de versão não é demonstrado como causa. A correção é enviada pelo agente e a renderização reaparece em seguida, segundo a sequência textual; o diff exato não foi auditado.

**08:13:** conteúdo create.inc está renderizado em URL `vercel.app`. Hero, navegação, botões e cartões de APIs aparecem. A presença de Login/Get Started/Explore APIs não comprova seus destinos ou funcionamento. “Página publicada” é conclusão mais restrita que “serviço de APIs pronto”.

**09:18:** painel Vercel lista create.inc com configuração válida e redirecionamento para www.create.inc; este e o subdomínio vercel.app aparecem atribuídos ao projeto. O próprio painel avisa que propagação global pode demorar. Isso é evidência de configuração exibida, não teste global independente.

**09:23:** quadro final mostra cartões e conteúdo abaixo do hero após a navegação ao domínio próprio narrada pelo autor; a URL não está legível nesse quadro. A navegação é feita no navegador habitual do autor. Não foi demonstrada visita sem sessão da conta de hospedagem, em outro dispositivo ou rede. Tampouco foi verificada disponibilidade atual do domínio por este estudo.

O episódio contém recuperação concreta de compilação seguida de página renderizada e deploy. Não contém testes negativos de DNS/deploy, nem atualização/republicação e regressão. Não tomar “qualquer erro, cole no agente” como solução garantida: o valor pedagógico está em registrar mensagem, mudança e resultado observável.

## Pré-requisitos, interfaces e limites

Pressupõe Cursor com agente, pasta local, template/repositório acessível, ambiente capaz de instalar dependências e executar npm, navegador, conta GitHub, conta/CLI Vercel autorizada e domínio com acesso à zona DNS para a parte opcional. A instalação das ferramentas necessárias, autenticação e permissões não são fechadas passo a passo. O template não foi adquirido/auditado nesta rodada; sua disponibilidade e licença permanecem pendentes.

É uma aplicação frontend com etapa de build, não uma pasta HTML simples cuja execução está explicada integralmente. A origem em screenshot não elimina dependências do template. Não são implementados banco, login, formulário ou APIs apesar dos textos e botões na tela.

Interface de janeiro de 2025: Composer, atalhos, aprovação de comandos, CLI Vercel e caminhos de painel/DNS são históricos. Não presumir equivalência no Codex Desktop, no Cursor atual ou em outras contas. Especialmente, valores A/CNAME e respostas do CLI devem vir da configuração vigente do projeto, não ser copiados de um vídeo antigo.

No corpus completo, manter como caso de primeira publicação com ferramentas de desenvolvimento, após explicar local versus externo. Para pessoas comuns que já possuem pasta estática, é uma rota com mais dependências do que a prática de upload manual estudada separadamente. Isso organiza a ordem, sem excluir a fonte.

## Prática original e verificações

Proposta não executada: página original de um clube de leitura, com nome, próxima reunião, três livros e um contato. Usar referência própria; definir o que cada botão faz antes da geração. Executar localmente, corrigir eventual falha com mensagem exata e publicar usando um procedimento atual já validado para o ambiente escolhido. Domínio próprio é extensão opcional, não condição para concluir.

1. **Local/funcional:** abrir a página, conferir texto, imagem e destino de contato; repetir em tela estreita. Se houve erro, reabrir após correção e registrar o comportamento, sem aprovar só a resposta do agente.
2. **Visitante:** abrir a URL publicada sem sessão do dono e confirmar os mesmos elementos. Separar localhost, URL de preview e destino final.
3. **Atualização:** mudar uma frase identificável, republicar no mesmo projeto e verificar a nova versão na URL já entregue, junto dos links anteriores. Este terceiro teste preenche uma lacuna do vídeo; não foi executado pelo autor nesta fonte.

Transferência: clube → portfólio, evento ou serviço. Pendências de estudo: audiovisual contínuo, detalhe do template/comandos, transições de correção/deploy, DNS completo e precisão da legenda. Capturas internas e hashes estão no manifesto; nenhum original integral foi republicado na ficha.
