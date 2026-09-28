# Prioridade atual: curadoria relevante e estudo profundo

Diretriz posterior do usuário em 2026-09-28: não há tempo para consumir todo o histórico antes de criar o curso. Priorizar pessoas comuns usando IA para construir sites, apps simples e automações. O inventário amplo permanece como backlog; coleta exaustiva não bloqueia as aulas. Ver `CURATION_PLAN.md` e `curation.json`. Triagem pode usar metadados; conteúdo que sustenta aula exige estudo integral do recurso selecionado e revisão visual pertinente. As orientações históricas abaixo só valem quando compatíveis com esta prioridade.

# Entrega incremental ao Educador

Estado por etapa e pendências: `DELIVERY_STATUS.md`. Entrada P0: `studies/official/P0_MAP.md`. Sete fichas oficiais cobrem prompting, um quickstart por ferramenta e o ciclo curto de planejamento/revisão; `/docs/app` é complemento do quickstart Codex. O Educador leu os originais de prompting e Claude quickstart, conferiu hashes e aceitou afirmações textuais delimitadas em `9f6a634`. As práticas propostas não foram executadas nas ferramentas.

P1 publicação: `studies/publishing/netlify-manual-static.md` estuda dois documentos oficiais integrais e distingue upload, acesso público, teste do visitante e atualização. Nenhuma publicação foi executada. As animações foram inspecionadas parcialmente, como declara o manifesto.

Os casos selecionados de site, app e rotina estão entregues em `studies/site/`, `studies/app/` e `studies/automation/`, com leitura integral e visuais pontuais. Seus pareceres limitam o uso como tutorial inicial. `studies/scheduling/` acrescenta referências atuais e prática original manual de CSV. A fila segue P0 primeiro resultado, P1 site/publicação e P2 app/automação. Não promover um vídeo a tutorial completo porque o título o anuncia.

`studies/manifest.json` agrega estudos; `transcripts/manifest.json` agrega faixas adquiridas. `integrate_studies.py` verifica identidade dos arquivos e cobertura da leitura declarada antes de atualizar os índices. Isso não prova que a legenda cobre toda a fala nem que o pesquisador executou o procedimento. O inventário completo e o registro da aquisição permanecem auditáveis em `video-inventory/` e `acquisition/`; a fila histórica está inativa.

Originais de leitura e capturas ficam no worktree, ignorados pelo Git. Um commit transporta as fichas e os manifestos, não esses originais; os outros agentes locais devem consultá-los nesta raiz e conferir o hash. Republicação dos originais não é presumida.

O lote inicial `52262547` foi integrado pelo Diretor como `0da1615`. O histórico de expansão e os primeiros três arquivos de legenda foram entregues em `f42b1b5`; a primeira curadoria e três fichas oficiais em `8af94e4`. Esses snapshots não descrevem a cobertura atual, que deve ser lida nos manifestos.

Nenhuma aula foi alterada pelo Devorador. Aprovação curricular cabe ao Educador e integração ao Diretor. A automação semanal existente deve seguir `WEEKLY_RUNBOOK.md` e a prioridade atual; não foi criada outra rotina.

Entrega: branch `codex/devorador-research`, diretório `/Users/lucasmarques/.codex/worktrees/81be/Ganesha/content/research/`. Preservar o worktree ou atualizar o destino da automação existente se ele for removido.

Proveniência Codex: `res-codex-desktop-quickstart` / `ev-codex-desktop-quickstart` identificam `/docs/quickstart`; `res-codex-desktop-start` continua identificando `/docs/app`. Educador registrou revisão delimitada P0 em `2b331d2`, sem aceitar demonstração audiovisual ou operação real.
