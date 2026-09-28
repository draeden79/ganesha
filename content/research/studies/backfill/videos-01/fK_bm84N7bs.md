# Frontends com Codex — esboço, resultado e verificação visual

Fonte: [Build beautiful frontends with OpenAI Codex](https://www.youtube.com/watch?v=fK_bm84N7bs), OpenAI; Romain Huet e Channing Conger, identificados na descrição do vídeo. Publicada em 2025-10-27, segundo metadados já adquiridos. Estudo em 2026-09-28. Estado anterior conferido no manifesto canônico de transcrições: `not_started`; nenhuma ficha anterior encontrada nos estudos.

**Parecer:** demonstração curta útil para ensinar a transformar um esboço em critérios observáveis e revisar telas. Não é instalação guiada nem construção completa de um app do zero. Usa um projeto existente, infraestrutura de Codex cloud, PR e servidor local. A boa aparência não elimina falhas de verificação: um relatório de lint com falha aparece na tela.

## Cobertura e proveniência

Faixa inglesa automática inteira lida sequencialmente: **288 linhas/cues**, intervalos 1–180 e 181–288 de `transcripts/local/aq.fK_bm84N7bs.en.6c10d987982b.txt`. São 19.242 bytes, SHA-256 `6c10d987982bb4ece25fa14848488005f89132d43a3ed0477d31f1294dbab3a7`. O JSON3 de origem permanece registrado no manifesto; não representa segunda leitura independente.

Os cues vão de 00:04,319 a 08:26,360, enquanto a aquisição informa 08:29 e o player observado exibe 08:28. A faixa não prova fala completa no começo/fim ou precisão de termos. Por exemplo, nomes próprios, Wanderlust, Three.js e Playwright aparecem corrompidos na legenda. As correções de nomes usadas aqui vêm da descrição/telas; não transformar grafias automáticas em instruções de instalação.

Três quadros foram inspecionados: 05:44, 06:24 e 06:54. Vídeo/fala integral não acompanhados; as transições entre quadros não foram verificadas. `full_transcript_read=true`; demais certificações integrais falsas. Nenhum código, tarefa cloud, PR ou app do exemplo foi executado por este estudo.

## Sequência completa da fonte

| Faixa | Conteúdo e resultado atribuído corretamente |
| --- | --- |
| 00:04–00:54 | Apresenta CLI, extensão de IDE e cloud como superfícies do produto de 2025; introduz visão e conferência visual pelo próprio agente. São afirmações históricas do fabricante, não inventário atual do Desktop. |
| 00:55–01:19 | Mostra app existente de viagens, com descoberta de destinos e assistente. Propõe melhorar sua tela inicial. A obtenção/configuração desse projeto não é ensinada. |
| 01:20–02:15 | Desenham globo 3D e detalhes do destino. Enviam foto do quadro numa tarefa Codex via ChatGPT no celular, pedindo navegação pelo globo, seleção de marcadores e setas do teclado. O esboço é acompanhado por requisitos de comportamento. |
| 02:16–03:01 | Criam segunda tarefa para Travel Log: checklist de continentes, garrafas de vinho, fotos e estatísticas. Pedem consistência visual e responsividade móvel. A fonte não estabelece origem/persistência dos dados desse novo painel. |
| 03:02–04:09 | Enquanto tarefas rodam, descrevem iteração por screenshot. Citam Playwright MCP para agente local e ferramentas de navegador do cloud. Não mostram instalação, permissões ou igualdade de ferramentas entre ambientes. |
| 04:10–05:08 | Exemplo prévio: dados públicos de táxis de Nova York carregados num contêiner para produzir dashboards com diferentes temas. Objetivo é entender/apresentar dados ou código, inclusive por página descartável. Importação, consulta e validação numérica não são reproduzidas. |
| 05:09–05:40 | Explicam graus de fidelidade: esboço deixa decisões abertas, screenshot preciso reduz liberdade. Preview permite escolher aparência sem checkout local; isso não substitui testar o comportamento. |
| 05:41–06:08 | Voltam à tarefa do globo; identificam Three.js, textura e resultado. Criam PR e mencionam checkout no terminal/servidor local para verificar animações. Comandos e configuração não são ensinados por completo. |
| 06:09–06:27 | Apresentam globo girando, tooltip, escolha de destino e botão de assistente. Narradores relatam funcionamento; o quadro de 06:24 confirma estado Kyoto, sem certificar todos os cliques ou teclado. |
| 06:28–07:25 | Revisam alternativas de Travel Log. Mostram screenshot de desktop e uma captura móvel longa; defendem olhar além da primeira dobra. Sugerem incluir tema claro/escuro e tamanhos no pedido antes do PR, sem executar todos esses testes nesta fonte. |
| 07:26–07:55 | Discutem expansão futura do ciclo multimodal para apps móveis e desktop; o web é descrito como prova de conceito. Aspiração não comprova capacidade disponível em qualquer produto. |
| 07:56–08:26 | Recapitulam autoinspeção visual e GPT-5 Codex, convidam a começar no produto e agradecem. Fecho promocional, sem novas verificações. |

## Exemplos, falha material e limites

O exemplo principal transforma a tela de descoberta de Wanderlust em globo com marcadores à esquerda e destino à direita. O segundo produz um painel de viagens coerente com o app. O terceiro é uma referência a dashboards de táxis feitos antes da gravação. Esses três exemplos têm escopos diferentes: interação em app existente, layout de painel e exploração de dados. Não os somar como evidência de um único app novo com backend completo.

**05:44 — falha que a fala não detalha:** o resumo visível da tarefa registra `npm run lint` sem sucesso. A explicação exibida é dependência transitiva `get-intrinsic` ausente, associada a resposta 403 do registro npm naquele ambiente. Isso é diagnóstico do relatório mostrado, não diagnóstico reproduzido por este estudo. Não aparece uma correção seguida de lint aprovado na cobertura textual ou nos quadros conferidos. O preview pode abrir mesmo com uma verificação pendente.

**06:24 — estado do resultado:** globo, marcador, destino Kyoto e botão que menciona esse destino estão visíveis. A diferença em relação a Hyderabad no preview de 05:44 é compatível com navegação, mas dois quadros não provam qual ação a causou. Arrastar, setas e integração real do assistente precisam de testes separados.

**06:54 — móvel:** é visível uma captura estreita de página inteira sobre o preview de desktop. Ela sustenta que houve inspeção de outro tamanho; texto pequeno nessa visão geral não permite aprovar legibilidade, toque, overflow ou acessibilidade. A recomendação sobre modo escuro é sugestão posterior, sem resultado mostrado.

## Pré-requisitos e compatibilidade

O percurso pressupõe app/repositório existente, acesso ao cloud, ambiente de execução, integração de PR e capacidade de checkout/servidor local. Para reproduzir a parte local citada, também seria necessário disponibilizar ao agente ferramentas de navegador. A fonte não entrega configuração desses elementos. Tampouco ensina dados, conta de usuário, gravação, implantação pública ou recuperação de erro operacional.

O estudo não certifica rótulos ou disponibilidade atuais. **Não há demonstração do aplicativo Codex Desktop nesta fonte de 2025.** O princípio de enviar referência visual e conferir saída é transferível; a tarefa cloud no celular, o preview, o PR e o Playwright MCP citado não devem virar passos presumidos do Desktop. As afirmações de qualidade do modelo são do fabricante, sem avaliação comparativa independente neste estudo.

## Impacto no curso e prática original

Manter a fonte no histórico completo e usá-la no momento de revisão visual, após o aluno já conseguir abrir uma página. Sua contribuição é a ligação entre referência, critérios e evidência. Não substitui as aulas de ambiente nem publicação.

Prática proposta, não executada: a partir de uma página simples já funcional, desenhar em papel uma galeria de três passeios com um cartão de detalhes. Pedir a alteração com dois comportamentos explícitos: selecionar um cartão muda título/descrição; em tela estreita, a informação continua acessível. Evitar globo 3D para que complexidade gráfica não esconda o objetivo.

1. **Comportamento:** selecionar os três cartões e conferir título/descrição correspondentes; voltar ao primeiro e testar teclado se incluído no requisito. Screenshot sozinho não aprova essa etapa.
2. **Visual em dois tamanhos:** conferir tela larga e estreita, inclusive conteúdo abaixo da primeira dobra; verificar texto, imagens, ausência de sobreposição e acesso aos controles.
3. **Correção e regressão:** registrar um defeito concreto, enviar imagem com descrição, aplicar correção e repetir as duas checagens. Se um comando de qualidade falhar, registrar falha/causa/novo resultado separadamente da aparência.

Transferência: catálogo de passeios → produtos, receitas ou portfólio. Dados reais, persistência e publicação exigem contratos/testes próprios. Pendências de estudo: sequência audiovisual integral, execução dos gestos, leitura ampliada de detalhes das capturas e fala nas extremidades. Capturas internas e hashes constam no manifesto; nenhum original protegido foi republicado na ficha.
