# Revisão editorial — rota de sites 0.3.0

Pacote de autoria: `sites.pt-BR.json` e `sites.en.json`. Três aulas, 30 etapas, 19 práticas externas e seis avaliações (duas por aula, índices 3 e 8). Todas as etapas têm objetivo próprio. Variantes Claude/Codex aparecem apenas na seleção de contexto e no planejamento, onde o procedimento difere.

## Progressão e decisões

- `site-build` depende de `verification`: contrato de página → pasta exclusiva → plano → decisão de escopo → criação de arquivo → abertura real → conteúdo → primeiro clique → limite de evidência → registro local. O aluno não precisa abrir terminal, instalar bibliotecas ou publicar nessa aula.
- `site-quality` depende de `site-build`: critérios separados → leitura como visitante → clique/repetição/recarga → escolha de evidência → teclado → largura → correção baseada em observação → regressão → perda de requisito → decisão de continuar. Ausência de falha permite revisão de resultados, sem exigir defeito inventado.
- `site-publish` depende de `site-quality`: arquivo/hospedagem/acesso → pacote identificado → conta/equipe/custos → escolha de pasta → upload → visibilidade → teste sem sessão do dono → atualização no mesmo projeto → diagnóstico de acesso → entrega e recuperação. A atualização manual em Production deploys é explicitamente uma mudança de produção.

O projeto permanece Ponte Musical, com violão/piano/canto e contato que somente mostra aulas@example.com. Nenhum cadastro, envio ou backend foi introduzido. As cópias Versão A/B são exercícios originais de identificação e regressão; não são demonstrações das fontes. No inglês, os rótulos visíveis são Version A/B, mantendo caminhos e endereço literal.

## Fundamento consultado

Relidos integralmente nesta autoria os originais locais fornecidos pela pesquisa, sem tratar as fichas como substituto de leitura:

1. `res-codex-prompting`: `studies/local/codex-prompting.txt`, 503 linhas. [Prompting](https://learn.chatgpt.com/docs/prompting). Fundamento: resultado/contexto/limites, correção específica, passos de reprodução, preservação de requisitos e reteste. Os exemplos documentais são prompts e não logs de execução; interfaces CLI/IDE não foram transferidas para Desktop. Animação de ditado não foi inspecionada nesta autoria e não sustenta as aulas.
2. `res-netlify-drop-static`: `studies/local/publishing-netlify-drop.md`, 86 linhas. [Netlify Drop Quickstart](https://docs.netlify.com/start/quickstarts/netlify-drop-quickstart/). Fundamento: conta/equipe, upload por pasta, URL, atualização manual em Production deploys e diagnóstico. A fonte também cobre builds e agentes; o exercício deliberadamente fica em HTML estático autossuficiente. Não se sugere criar HTML vazio como solução de entrega.
3. `res-netlify-project-visibility`: `studies/local/publishing-netlify-visibility.md`, 112 linhas. [Project visibility](https://docs.netlify.com/manage/security/secure-access-to-sites/project-visibility/). Fundamento: produção e prévias diferentes, Make public após deploy de produção, permissões e política de equipe. O aluno verifica a conta atual; não há promessa de gratuidade ou de acesso público automático.
4. `res-claude-desktop-start` e `res-codex-desktop-quickstart`: aceites textuais prévios do Educador, usados apenas nas duas variantes de contexto/planejamento. Não foram observadas novas sessões dos aplicativos nesta autoria.

Os testes de leitura, contato, teclado, janela estreita, regressão, visitante e versão são desenho pedagógico original. Eles fornecem critérios e ações para o aluno executar; não alegam que alguma fonte demonstrou essa sequência inteira. Janela estreita não é apresentada como teste de todos os dispositivos; os testes de teclado não são certificação de acessibilidade.

## Revisão e validação efetuadas

- JSON válido nos dois idiomas, três aulas com exatamente dez etapas cada.
- Práticas por aula: 6, 6 e 7; avaliações exatamente nos índices 3 e 8, três alternativas e feedback individual em cada uma.
- IDs, pré-requisitos, enumerações, fontes, chaves e respostas corretas coincidem entre idiomas.
- Campos pedagógicos preenchidos, critérios específicos (1–3 por etapa), prompts separados e objetivos por etapa.
- Corpos com no máximo 68 palavras em português e 70 em inglês; verificação estrutural não equivale a eficácia didática comprovada.
- Revisão semântica da progressão e dos limites feita pelo autor. Tradução por IA; revisão humana de idioma pendente.

Não foram executados Claude/Codex, upload, mudança de visibilidade ou teste de visitante para validar este pacote. As ações externas continuam autodeclaradas pelo aluno e não têm verificação automática da Ganesha. Rótulos atuais de conta, permissões e êxito operacional permanecem verificações no ambiente do aluno. Este material não promove automaticamente o curso para `ready`.
