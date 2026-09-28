# Estudo — primeiro uso de Claude Code Desktop

Recurso `res-claude-desktop-start`, fonte `claude-academy`, inglês. [Quickstart oficial](https://code.claude.com/docs/en/desktop-quickstart), observado em 28/09/2026; data editorial não informada. Artefato `studies/local/official-claude-desktop-quickstart.md`, SHA-256 `7e0fbc28948beca6fa3e042857f07ffccfffe08b9ce0039fee2c66214cf66ac8`, 140 linhas lidas integralmente. Coleta pelo `read_page` do site; não contém marcador de truncamento. Documento textual integral analisado; não há imagens substantivas no `main` observado. `full_source_analyzed=true` refere-se ao documento, não a testar o aplicativo.

Complemento: [referência Desktop](https://code.claude.com/docs/en/desktop), artefato `studies/local/official-claude-desktop-rendered.txt`, SHA-256 `a828ef46c9220646c20e8cfb04ecb9dc3bc4538979f48cb03e983fe0730806d5`. Leitura seletiva 110–142, 210–238 e 619–733. A primeira tentativa de `read_page` cortou a referência em 12.000 caracteres; foi conservada como aquisição truncada, nunca como leitura integral. Originais locais ignorados pelo Git.

## Sequência e evidência do original

1. Acesso/instalação: assinatura Pro/Max/Team/Enterprise, instalador conforme sistema, conta Anthropic (9–54). “you don't need to install Node.js or the CLI” (54) vale para abrir Code.
2. Distinguir Chat/Cowork/Code; abrir Code; resolver solicitação de upgrade ou login, ou encaminhar 403 (34–50).
3. Escolher Local e pasta; a fonte também apresenta Cloud, SSH e WSL como alternativas (60–73).
4. Escolher modelo; enviar tarefa pequena, por exemplo teste ou instruções de projeto (75–86).
5. Conferir modo de permissão. Manual propõe e espera; Auto/Accept edits já aplicam edições, posteriormente visíveis no diff (89–101).
6. Ampliar contexto, interromper/redirecionar, usar skills, revisar/comentar arquivos, escolher autonomia, plugins, painéis, preview, PR/CI, recorrência e sessões paralelas (103–132). Encerrar com links para referência, comparação, erros e práticas (134–140).

Não há demonstração de sucesso executada, nem tratamento passo a passo de cada expansão. Os exemplos de tarefas são pontos de partida, não especificações suficientes de um produto.

## Acesso e fluxo de revisão: consequências curriculares

**Fato primário:** o complemento distingue ferramentas do projeto da instalação de Code (706–711), atalhos Desktop de terminal (235) e limites de automação (625–678). Shift+Tab da Academy não deve aparecer como passo Desktop. A referência confirma que `--print`/`--output-format` não têm equivalente na interface interativa. Hooks/configuração compartilhados não tornam as superfícies idênticas.

**Interpretação editorial:** o primeiro exercício precisa conter uma pasta conhecida e uma mudança pequena cuja consequência o aluno consiga avaliar. A ausência de Node como requisito do assistente não elimina eventual Node, Git, dependências ou servidor requeridos pelo projeto. O modo escolhido altera o significado de “aprovar”: em Manual, a decisão antecede a alteração; nos outros modos citados, ler o diff é revisão de algo já aplicado. Aceitar um patch tampouco publica um site.

**Drift observado:** o quickstart ainda nomeia Cowork, enquanto o banner da Academy anuncia renomeação em rollout. Não corrigir um produto por adivinhação nem prometer os mesmos rótulos a todos; capturar a interface usada pelo aluno. A leitura de documentação não confirma os direitos de acesso da conta real.

## Prática original completa: primeira alteração sob controle

Competência: localizar projeto, enviar tarefa delimitada e avaliar a mudança no lugar certo. Proposta vinculada a `res-claude-desktop-start`, sem novo ID formal.

Preparação: pasta didática já fornecida pelo curso, com um pequeno HTML local e texto inicial conhecido. O aluno registra sistema/versão e identifica a aba Code. Escolhe Local, abre a pasta e seleciona Manual pelo seletor. Confirma o nome/caminho da pasta na sessão antes de pedir alteração.

Prompt original: “Nesta pasta, localize a página inicial e me diga qual arquivo contém o título. Depois proponha trocar somente o título para ‘Minha primeira página’. Preserve links e demais textos. Mostre a alteração antes de aplicá-la.”

O aluno lê a resposta, compara o nome do arquivo e confere a proposta no diff. Se o arquivo estiver errado, rejeita e informa o caminho correto; se certo, aceita. Abre o arquivo/preview e confere o título. Depois comenta uma linha pedindo uma correção pequena, lê a nova diferença e repete a inspeção. A etapa final registra resultado observado e limitações de teste; não inclui publicação ou compra.

Verificação 1: conferir que a sessão está na pasta esperada e que só o texto autorizado mudou. Verificação 2: abrir o resultado renderizado e identificar se a alteração apareceu; diff correto sozinho não atesta a página exibida. Verificação de transferência: reproduzir o exercício em uma segunda pasta e explicar por que contexto da primeira não basta.

## Erros e recuperação sem confundir camadas

Quickstart: upgrade implica verificar plano; login online pede concluir autenticação e reiniciar; 403 remete a diagnóstico. Complemento 689–707: conferir assinatura, reautenticação, reinício completo, rede/proxy; pasta ausente ou sem permissão pode impedir sessão; ferramenta ausente exige confirmar PATH/terminal. Esses são ramos condicionais, não uma lista de comandos a executar indiscriminadamente.

Na aula, peça ao aluno três dados antes de diagnosticar: etapa em que falhou, mensagem literal e pasta/ambiente selecionado. “O assistente abriu, mas o projeto não roda” deve ser avaliado separadamente de “não consigo entrar na aba”. O teste de recuperação é retomar a mesma etapa e conferir que o impedimento desapareceu, sem alterar requisitos do exercício.

## Pendências

Não houve instalação, autenticação, compra, execução de projeto, clique em controles do aplicativo nem comparação real macOS/Windows/Linux. Páginas de Cloud/SSH/WSL e demais links não foram estudadas integralmente. Não há captura do app funcionando; a aula visual deve validar a UI atual antes de publicação.
