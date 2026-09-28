# Execução do hackathon

Orçamento original: oito horas. Janelas abaixo são relativas ao início efetivo e não afirmam horas já trabalhadas. Entregas reais são registradas em `STATUS.md`.

## Responsabilidades e limites de edição

| Frente | Propriedade | Entrega | Dependência |
| --- | --- | --- | --- |
| Diretor | `coordination/`, `contracts/` e integração | Especificação, contratos, critérios, registro e release | Cadastro dos agentes e commits |
| Devorador | `content/research/` | Fontes/evidências e proposta de atualização | URLs primárias verificáveis |
| Educador | `content/curriculum/`, `content/locales/` | Mapa fundamentado, primeira aula, avaliações, traduções | Evidências e contrato |
| Artista | `design/` | Tokens, telas/estados, comportamento responsivo/RTL e assets | Jornada e design system |
| Construtor | Aplicativo, dependências e testes | Fluxo executável, adaptadores, persistência e QA | Contrato e primeira aula |

`DESIGN_SYSTEM.md` é referência compartilhada; mudanças exigem coordenação. Não editar outro worktree. Caso a implementação precise adaptar dados, manter o adaptador no aplicativo e propor ajuste de contrato ao Diretor.

## Janelas e saídas verificáveis

| Janela | Trabalho simultâneo | Critério de saída |
| --- | --- | --- |
| 0–1 h | Contrato; fontes primárias prioritárias; objetivos; tokens; base do app | Todos conhecem IDs, estrutura e propriedade; decisões registradas |
| 1–3 h | Primeira aula completa; UI; avaliações; variantes e traduções | Aula navegável com prática e duas verificações, mesmo ainda em preview |
| 3–5 h | Integração de commits; revisão de fontes; persistência; idiomas e RTL | Fluxo ponta a ponta repetível em Claude e Codex |
| 5–6,5 h | Recuperação de erros; teclado; mobile; auditoria de traduções | Evidências de testes e defeitos classificados |
| 6,5–8 h | Correções; release candidate; handoff ao colega; documentação | Versão identificada, pendências honestas e procedimento de execução |

Reduzir o número de aulas inicialmente liberadas antes de reduzir idiomas ou remover verificações. O mapa não limita o Educador a quatro aulas nem cinco etapas.

## Processo de integração

1. Cada responsável entrega caminho absoluto, branch, hash, arquivos, validação e pendências.
2. O Diretor inspeciona o diff, resolve contrato e incorpora commits no seu worktree. Não fazer force push nem copiar alterações sem origem registrada.
3. Contratos novos preservam versão ou recebem incremento quando incompatíveis. A aplicação pode usar adaptadores enquanto autores convergem.
4. O Construtor executa os testes do aplicativo; o Diretor verifica os resultados, cobertura de conteúdo e critérios de release.
5. Integração local não equivale a publicação. Registrar separadamente build, preview, release e implantação.

## Caminho crítico inicial

- Devorador: evidências mínimas de escolha, ambiente e primeiro fluxo nas duas ferramentas antes da pesquisa extensiva.
- Educador: IDs e esqueleto da primeira aula imediatamente; texto completo em seguida; entrega explícita de traduções por locale.
- Artista: tokens e estados da aula primeiro; assets decorativos depois.
- Construtor: navegação, idioma, ferramenta, checks e persistência usando fixtures claramente identificadas até integrar conteúdo.
- Diretor: publicar contrato, distribuir cadastro, integrar por pequenos commits e destravar diferenças sem aguardar todas as frentes terminarem.
