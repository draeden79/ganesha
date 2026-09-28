# Revisão para iniciantes absolutos — Sites

Escopo: somente `authoring/sites.pt-BR.json` e `authoring/sites.en.json`. Revisão dos campos `body`, `action` e `hint` de todas as 30 etapas, nos dois idiomas. Não se afirma que todos os campos das 30 etapas foram reescritos: títulos, objetivos, resultados, critérios, prompts copiáveis, variantes e avaliações mantêm o conteúdo anterior.

## Três problemas P0 tratados

1. **Vocabulário usado antes de ser explicado.** A entrada de construção agora explica site e navegador com Chrome/Safari como exemplos; a etapa de pasta explica pasta e arquivo; a criação explica index.html como o nome do arquivo da página. A entrada de publicação define publicar e URL; a etapa de envio define upload. O texto de planejamento apresenta IA como o assistente que recebe o pedido. Termos de administração, produção e prévia ficam explicados na dica da etapa correspondente.
2. **Várias exigências disputando a mesma ação principal.** Cada `action` passou a pedir uma atividade focal curta, por exemplo criar a pasta, abrir index.html, clicar uma vez ou conferir os três serviços. Preparação, testes adicionais, instruções da ferramenta e correção ficam em `hint`, em ordem. Atividades que exigem uma sequência, como publicar uma atualização, continuam com passos explicados na dica; não se afirma que uma publicação possa ser realizada com um único clique.
3. **Conferência dependente de jargão e da mensagem da IA.** Os corpos mostram exemplos observáveis: canto ausente, endereço que aparece, botão escondido, acesso bloqueado para visitante. As instruções de abertura, seleção de cópia, janela privada, conta e recuperação são concretas. Custos, permissões, resultados não executados e limites da verificação continuam explícitos nas dicas.

## Verificação efetuada

- JSON válido em português e inglês.
- Três aulas, exatamente dez etapas cada, em ambos os idiomas.
- Todos os 60 corpos revisados têm entre 20 e 45 palavras, contando por espaços.
- Slugs, `kind`, `mode` e conjunto de campos de cada etapa iguais à cópia anterior.
- Objetos `check` preservados integralmente: perguntas, três opções, feedback e alternativa correta não mudaram.
- Exemplos continuam identificados como simulados; nenhuma execução externa ou publicação foi alegada.

## Limites da revisão

Os prompts completos ainda contêm instruções técnicas que o aluno copia para a IA; não precisam ser digitados nem dominados por ele para começar. Critérios e resultados esperados permanecem os mesmos para não alterar a avaliação nesta revisão urgente. Algumas dicas ainda são longas porque contêm procedimentos e recuperação de erros; o corpo principal e a ação foram simplificados. A eficácia com iniciantes absolutos precisa de observação de uso, e a tradução continua pendente de revisão humana. Nenhum teste de aluno ou publicação foi executado nesta revisão.
