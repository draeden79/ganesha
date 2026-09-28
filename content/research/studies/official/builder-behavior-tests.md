# Estudo — How to De-Slop an AI-Generated Codebase

Recurso `res-builder-behavior-tests`, fonte `builder-blog`, autora Alice Moore, inglês. [Original](https://www.builder.io/blog/de-slop-ai-generated-codebase), publicado em 16/09/2026 conforme cabeçalho; coletado/estudado em 28/09/2026. Texto `studies/local/official-builder-de-slop.txt`, SHA-256 `3b6cff23253daef1ad69270201450aef0e275d24d3a26131352f52f7733746f5`, linhas 1–291 integralmente lidas. Artigo substantivo em 17–189; identificação 10–15, anúncios e navegação também observados. Coleta pelo corpo renderizado do original, não por resumo de terceiro.

Estado: texto integral analisado. Diagramas de abstração e integração vistos, com capturas locais; diagrama de triagem pendente no primeiro registro, sujeito à atualização no manifesto. Original e capturas ignorados pelo Git; não se presume licença de republicação.

## Encadeamento do argumento e dos exemplos

O artigo diferencia falhas de tipos, duplicação e comportamento (17–37), relaciona contexto disperso a reparos locais ruins (39–53), usa lint para localizar candidatos (55–71), separa reparo/arquitetura/código correto (73–87), propõe introdução gradual de regras (89–101), mostra otimização da métrica errada (103–113), exige contrato (115–125), investiga desenho e abstração (127–147), verifica comportamento e mocks (149–167) e transforma recorrências em checks úteis (169–189). Termina com promoção de apresentações, Agent-Native, artigos relacionados e newsletter; publicidade não constitui validação técnica.

Exemplos importantes: preservar tipo retornado pelo parser elimina ida desnecessária por tipo amplo (61–67); resposta Zoom sem validação, teste Clips excessivamente simulado e spread condicional correto exigem decisões diferentes (81–83). No ensaio Analytics, lint/typecheck/23 testes ficaram verdes sem estabelecer validação; outra tentativa introduziu schema (107–109). No ensaio Chrome, remover o padrão denunciado preservou dispatch sem parsing; a alternativa validou, mas introduziu `any` (111).

“not a measure of how often agents make this mistake” (113) é a restrição decisiva do relato. Os 41.280 avisos e 66 guard checks são descrições daquele recorte, não metas para outras equipes.

## Qualidade da evidência e limites do relato

**Afirmações da autora:** scan em revisão fixada; amostragem de achados; ensaios controlados; nenhuma adoção de regras ou aplicação dos patches experimentais ao Agent-Native (75–77). Esta ficha não repetiu o experimento, não auditou o commit nem executou a suíte. Assim, o resultado pode fundamentar uma pergunta de revisão, mas não uma alegação independente de causalidade ou eficácia geral.

**Inferência editorial:** o erro pedagógico mais perigoso seria apresentar uma lista de ferramentas como prova de qualidade. O estudo sugere separar perguntas: código obedece à regra? contrato é preservado? entrada inválida é barrada? módulos comunicam? persistência aconteceu? Dois checks verdes que verificam a mesma hipótese não são duas confirmações independentes de comportamento.

O ensaio de mensagem ilustra um tradeoff real: uma correção pode satisfazer validação e piorar a disciplina de tipos. Portanto, “teste passou” não elimina revisão da mudança. A crítica a mocks tampouco justifica proibi-los: é necessário saber quais interações a simulação remove e quais precisam ser exercitadas juntas. O texto não mede custo/benefício de migrar toda uma suíte.

## Inspeção visual realizada

`official-builder-abstraction.png`: desenho antes/depois mostra três callers com checks locais; depois, um validador compartilhado e checks riscados. Confirma uma ilustração de simplificação, não um patch executado.

`official-builder-integration.png`: comparação mostra caminho unitário retornando sucesso por handler simulado, e integração passando por handler, provedor de teste e pedido persistido. A imagem destaca conexões exercitadas; não mostra logs de uma compra real. Datas, hashes e estado de cada imagem ficam no manifesto.

## Prática original: antes → correção → reteste

Competência: formular contrato de comportamento e provar que uma mudança resolve a falha sem perder o caso válido. Proposta vinculada a `res-builder-behavior-tests`, sem criar ID curricular formal.

Projeto didático: formulário de inscrição local com nome e e-mail. Estado inicial intencional: o botão mostra confirmação e limpa o formulário, mesmo quando não grava o registro. Evitar serviços reais; a persistência deve usar um ambiente de treino fornecido.

Antes: com entrada válida, enviar e abrir a lista em nova navegação; anotar a ausência do registro. Em seguida enviar um e-mail inválido e registrar a mensagem/estado. Guardar os mesmos dados de teste para a comparação, sem informações pessoais.

Contrato original: “Uma inscrição só pode ser confirmada depois da gravação. Uma entrada inválida deve mostrar erro e não gerar registro. Se a gravação falhar, preserve os dados do formulário para correção. Não altere a aparência dos outros componentes.” O aluno pede que o agente localize a cadeia de validação, envio e persistência antes de editar.

Correção: revisar proposta/diff, incluindo o lugar em que a mensagem de sucesso é emitida. O agente deve identificar qual teste falhava antes e executar o mesmo após o patch. Uma troca apenas visual não satisfaz o contrato.

Reteste A — caso válido: enviar, navegar/recarregar, conferir exatamente um registro com os valores esperados. Reteste B — caso inválido: verificar a mensagem e a ausência de gravação; é uma condição diferente de A. Reteste C — falha controlada da persistência: confirmar que não há falso sucesso, nenhum registro parcial e os campos continuam preenchidos. O instrutor deve fornecer um mecanismo seguro de simular essa falha.

Entregável: tabela antes/depois por caso, diff e saídas de verificações. Se o ambiente impedir um reteste, marcá-lo pendente. Transferência: aplicar as mesmas perguntas a upload, exportação ou carrinho de demonstração e identificar a evidência de efeito persistente correspondente.

## Não revisado

Repositório, revisão exata, implementação das regras e dados completos dos ensaios não auditados. Páginas de terceiros vinculadas, vídeo eventual e produtos anunciados não consumidos. Nenhum resultado da prática proposta foi produzido nesta pesquisa. Não ensinar o exemplo de checkout como autorização para movimentar dinheiro.
