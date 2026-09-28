# Revisão Apps para iniciantes absolutos

Escopo: 30 etapas em `authoring/apps.pt-BR.json` e `authoring/apps.en.json`. Revisão editorial direta; não houve execução externa do app nem teste com participantes.

## Três problemas P0 corrigidos

1. **Termos antes de significado.** A entrada pressupunha conhecimento de app, estado, servidor, armazenamento, JSON e importação. Agora app e estado são definidos na primeira etapa; servidor e navegador antes de abrir o endereço; guardar e localStorage antes de pedir salvamento; JSON antes do pedido que o utiliza; exportar/importar antes dos testes de arquivos. Origem, porta, booleano, foco, versão e sincronização recebem explicações contextuais.
2. **Várias ações na mesma instrução.** Pedidos combinavam preparação, execução, comparação, correção e registro. Cada `action` agora contém uma pequena ação principal. Preparação e verificações seguintes ficam em `hint`, com ordem explícita e uma operação por vez. Os corpos têm 20–45 palavras em ambos os idiomas e apresentam exemplos concretos, com cenários simulados identificados.
3. **Exigência implícita de programar e administrar o ambiente.** Instruções iniciais agora dizem que a IA cria os arquivos e prepara o endereço; o aluno não precisa escrever código ou instalar algo para começar. A criação de arquivos de teste também é delegada à IA. Os pedidos completos continuam separados, com limites para não apagar dados, não publicar automaticamente e manter ensaios isolados.

## Auditoria das 30 etapas

| Aula | Etapas auditadas | Mudança principal |
| --- | --- | --- |
| app-state | state-model; request-state; serve-local; check-empty; add-two; toggle-one; remove-target; input-keyboard; check-regression; state-handoff | App/estado definidos; plano e abertura mediados pela IA; testar uma ação e registrar o observado. |
| app-storage | memory-storage; request-storage; reload-state; check-origin; reopen-limit; invalid-storage; failed-write; repair-persistence; check-save-claim; storage-handoff | Guardar/localStorage/JSON explicados; ver e salvar diferenciados; endereço, recuperação e erros apresentados com exemplos pequenos. |
| app-delivery | files-and-data; request-portable; export-inspect; check-contract; preview-cancel-import; reject-bad-import; restore-backup; package-handoff; check-delivery; maintain-version | Exportar/importar explicados; confirmação e cópia anterior mantidas; IA prepara arquivos; publicação opcional deslocada para dica. |

## Validação e limites

- JSON válido nos dois arquivos; 3 aulas × 10 etapas por idioma.
- 60 corpos com 20–45 palavras, contadas por separação em espaços.
- Mesmo conjunto de campos; slugs, kind, mode, checks completos, opções/respostas corretas, critérios, códigos, prompts e variantes preservados.
- Títulos e resumos das aulas simplificados; body, action e hint revisados em todas as etapas.
- Nenhum outro domínio ou catálogo de tradução alterado.
- Os critérios e resultados esperados completos permanecem: as dicas ainda contêm verificações adicionais para concluir cada etapa. A redução aqui é da entrada e da ação principal; testes de falha/importação continuam sendo conteúdo avançado acompanhado por IA. Não afirmamos validação de aprendizagem com iniciantes reais.
