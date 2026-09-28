# Revisão de fontes pelo Diretor

Consulta em 2026-09-28; registro de pesquisa original: `content/research/registry.json`, commit de origem `c531c9e`.

## Amostra primária conferida

| Ponto | Evidência revisada | Consequência para L01 |
| --- | --- | --- |
| Entrada no Codex desktop | [ChatGPT desktop app](https://learn.chatgpt.com/docs/app), “Send your first message”, linha 900 na extração consultada | Orientar escolha de Codex e nova conversa; evitar captura baseada em navegação antiga |
| Claude Code no desktop | [Desktop quickstart](https://code.claude.com/docs/en/desktop-quickstart), “Install” e “Start your first session” | Abrir Code e selecionar ambiente/pasta. Node.js e CLI não são exigidos para abrir Code; dependências do projeto são outro assunto |

As duas páginas foram abertas e o texto relevante foi conferido pelo Diretor. Isto é revisão pontual de afirmações operacionais; não representa consumo completo de todos os recursos nem execução real nas ferramentas.

## Validação estrutural

`python3 coordination/validate_content.py --research-only` passou: 21 fontes, 14 evidências, sem referências quebradas. A validade estrutural não confirma toda afirmação editorial; o Devorador preserva localizadores, datas, tipo de trecho e limites de acesso.

## Restrições preservadas

Há vídeos somente localizados, artigos parcialmente acessíveis e pesquisa adicional pendente. Não atribuir demonstração assistida ou curso concluído a esses recursos. Aulas futuras sobre publicação, aplicativos e automações precisam de fontes específicas antes de instruções operacionais finais.
