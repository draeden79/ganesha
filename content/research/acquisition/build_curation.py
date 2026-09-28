#!/usr/bin/env python3
"""Materialize the editorial shortlist and refresh acquisition evidence only."""
import json
from datetime import datetime, timezone
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
HERE=ROOT/'acquisition'
LOCAL=ROOT/'transcripts/local'
def lines(p): return [json.loads(x) for x in p.read_text().splitlines()] if p.exists() else []
rows={r['id']:r for r in lines(ROOT/'video-inventory/videos.jsonl')}
meta={r['video_id']:r for r in lines(HERE/'triage-metadata.jsonl')}
acquired={r['video_id']:r for r in lines(HERE/'manifest.jsonl')}
canonical=json.loads((ROOT/'transcripts/manifest.json').read_text())['videos']
acquired.update({r['video_id']:r for r in canonical})

# Selection is driven by uncovered learning outcomes, not a fixed video quota.
specs=[
 ('G9o8eoHzpxc',True,'app_dados_interacoes','primary_case',
  'App cotidiano para organizar filmes, séries e jogos; problema, telas, especificação e estados de borda são explícitos. Substitui o tutorial antigo de watchlist.',
  ['Claude Design e Claude Code são ferramentas citadas','Capítulo sobre telas e casos de borda'],
  ['Contas nas ferramentas; navegação entre projeto e prévia','Decidir campos, ações e estados de um app de favoritos'],
  ['GepHGs_CZdk'],
  'Confirmar persistência, criar/editar/excluir, estados vazios e entradas inválidas na faixa inteira e nas telas. Não deduzir CRUD apenas da descrição.'),
 ('GUgxx6fMiR8',False,'site_construir_testar_corrigir_publicar','reserve_if_gap',
  'Percurso explícito de planejamento, construção e publicação em domínio próprio, mas com setup e patrocínio de hospedagem. Mantido como alternativa somente se o estudo de Riley revelar lacuna material.',
  ['Demonstra instalação de Claude Code e Cursor, Git e publicação','Hostinger é patrocinador explicitamente divulgado'],
  ['Instalar aplicativo/editor; compreender pasta local e conta de hospedagem','Custo de domínio/hospedagem se a pessoa escolher reproduzir exatamente essa rota'],
  ['SKBDC3QugZw','vQDAxWS9OXc'],
  'Não baixar agora. Reabrir apenas se Riley deixar lacuna material; separar patrocínio de requisito e evitar administração de servidor como rota inicial.'),
 ('68BnH29qvAA',True,'automacao_primeira_rotina','primary_case',
  'Demonstra uma primeira rotina curta e distingue tarefa agendada determinística de tarefa que precisa de decisão; candidato ao primeiro resultado de automação.',
  ['Descrição anuncia primeira Claude Routine e comparação com agendamento simples'],
  ['Conta e acesso à superfície usada; projeto disponível se exigido pela demonstração'],
  [],
  'Conferir na faixa e no visual o gatilho, ação, resultado, pausa/cancelamento e histórico. Verificar a interface e acesso atuais antes de ensinar passos.'),
 ('HN0oWxbF2bM',True,'automacao_gatilho_acao','later_practical_case',
  'Caso cotidiano com gatilho de chegada de email, classificação e ações distintas. Entra depois da primeira rotina; é a fonte de fluxo orientado a eventos, não uma exigência de primeiro contato.',
  ['Capítulos identificam Gmail trigger, classificação, OpenRouter, respostas, notificações e rascunhos'],
  ['Conta n8n e conexão a uma caixa de testes','Entender credenciais, condições e diferenças entre rascunhar e enviar'],
  ['06Beyp_iDL0'],
  'Estudar fluxo inteiro e decisões. Para uma futura prática, começar com dados de teste e rascunhos; envio, permissões e manutenção precisam ser ensinados explicitamente. Confirmar casos de falha no visual.'),
 ('bTF3tACqPRU',True,'automacao_erros_manutencao','targeted_support',
  'Preenche a lacuna específica de perceber, registrar e notificar uma falha; inclui distinção entre erro técnico e resultado incorreto.',
  ['Capítulos incluem Error Trigger, conexão do fluxo de erro, planilha, notificação e definição de erro'],
  ['Ter um fluxo n8n simples funcionando e saber ler a saída','Conexões a planilha/canal apenas se reproduzir os exemplos opcionais'],
  [],
  'Verificar integralmente erro induzido, registro, notificação, recuperação e repetição. A notificação por si só não comprova recuperação nem resultado correto.'),
 ('-zFd1nPn6U0',True,'automacao_validacao','targeted_support',
  'Preenche a lacuna de comparar entradas conhecidas e resultados esperados antes/depois de uma mudança. Complementa tratamento de falhas técnicas sem duplicá-lo.',
  ['Capítulos distinguem avaliação de categoria e de correção; descrição usa comparação de alterações'],
  ['Fluxo simples e pequeno conjunto de exemplos com resultado esperado','Planilha/dataset conforme a interface demonstrada'],
  ['bdMHQLvtVaQ'],
  'Estudar a faixa toda; conferir configuração, conjunto de exemplos e pelo menos um resultado errado. Traduzir a prática para critérios simples, sem exigir jargão de evals.'),
 ('E2UgYp2vh5U',True,'transferencia_claude_codex','comparative_task',
  'Executa a mesma tarefa nos dois agentes. Útil para separar objetivo, contexto e verificação da preferência por uma marca; a comparação de vencedor não é adotada como fato atual.',
  ['Mesma tarefa segundo descrição; capítulos de prompt, construção e produto final'],
  ['Já ter concluído um pequeno app com um agente','Acesso aos dois produtos para a prática de transferência, se escolhida'],
  [],
  'Ler inteiro e verificar telas dos dois resultados. Comparar comportamento solicitado, não reutilizar rankings de custo/modelo de maio de 2026 nem transformar code review avançado em pré-requisito.'),
 ('ntDIxaeo3Wg',True,'primeiro_resultado','reuse_existing_evidence',
  'Faixa já estudada integralmente: jogo local simples, teste e mudança limitada. Reaproveitar a evidência existente; não recomendar todo o setup de CLI como primeira aula.',
  ['A ficha de estudo confirma terminal, editor, pasta local, conta Claude, Git e GitHub na demonstração','Jogo da velha em navegador narrado entre 14:24 e 16:46'],
  ['Na adaptação editorial, apenas uma superfície acessível e capacidade de abrir o resultado; rota Desktop depende da fonte oficial estudada pelo Diretor'],
  ['saggDHHnmtQ'],
  'Concluir pendências visuais da ficha existente. Primeiro resultado deve verificar separadamente abrir, cumprir o pedido e manter comportamento após uma mudança.'),
 ('fK_bm84N7bs',True,'transferencia_design_frontend','reuse_official_reference',
  'Faixa oficial já adquirida sobre frontend com Codex; serve como contraponto primário ao caso Claude, sem novo download nem curso genérico adicional.',
  ['Identidade OpenAI e título confirmados nos metadados de aquisição'],
  ['Requisitos da demonstração ainda precisam ser lidos integralmente'],
  ['3KAI__5dUn0'],
  'Estudar a faixa toda e conferir visualmente o que muda na interface e como o resultado é testado. Não promover por ser fonte oficial.'),
 ('SKBDC3QugZw',True,'site_construir_testar_corrigir_publicar','primary_case',
  'Selecionado pelo Diretor: a descrição confirma landing page, erros enfrentados e resultado final; capítulos identificam ajustes e deploy. A narrativa de correção tem prioridade, e música/imagens/chat são desvios a analisar, não requisitos para o aluno.',
  ['Claude Code, Cursor e Producer.ai citados; capítulos de GitHub, ajustes e deploy'],
  ['Várias contas e integrações além do primeiro site'],
  ['GUgxx6fMiR8'],
  'Adquirir primeiro, estudar integralmente e conferir visualmente landing page, falhas, ajustes e deploy. Há complemento primário de upload/publicação sendo estudado por outro agente; Tim só substitui se houver lacuna material.'),
 ('vQDAxWS9OXc',False,'app_dados_interacoes','deferred_setup_and_age',
  'Apesar do exemplo neutro de tarefas, tutorial de 2024 começa com SSH e Firebase. A carga de configuração e a idade o tornam uma rota inicial pior para o público definido.',
  ['Capítulos de SSH, Firebase, usuários/tarefas e domínio'],
  ['Administração de conexão, banco e publicação'],
  ['G9o8eoHzpxc','GUgxx6fMiR8'],
  'Preservar metadados. Não adquirir para a prioridade atual.'),
 ('yXsBQGnx0dA',False,'app_dados_interacoes','deferred_domain_mismatch',
  'O exemplo é FAQ de saúde e passa a gerar respostas quando não encontra resposta cadastrada. Não é o domínio simples e neutro desejado para a primeira prática.',
  ['Descrição explicita negócio de saúde, FAQ e fallback gerado'],
  ['Base de respostas e avaliação especializada do domínio'],
  ['G9o8eoHzpxc'],
  'Não adquirir para a rota inicial. Evitar transportar o fallback como padrão de app de perguntas.'),
 ('06Beyp_iDL0',False,'automacao_gatilho_acao','deferred_complexity',
  'O rótulo beginner não corresponde ao percurso mínimo: RAG, chatbot, suporte e conteúdo em um só vídeo. O caso de inbox tem um objetivo cotidiano mais delimitado.',
  ['Capítulos começam por RAG e chatbot; descrição inclui credenciais e variáveis'],
  ['Integrações, modelos e pipeline de recuperação'],
  ['HN0oWxbF2bM'],
  'Não adquirir para a prioridade atual.'),
 ('jlZfuNoBBCY',False,'app_dados_interacoes','deferred_complexity',
  'O título sobre dados cotidianos oculta uma arquitetura RAG com banco vetorial e duas pipelines KNIME. Excede a necessidade de app simples com campos e interações.',
  ['Capítulos explícitos de arquitetura RAG e criação/consulta de banco vetorial; parceria KNIME divulgada'],
  ['Plataforma KNIME, embeddings e pipeline de dados'],
  ['G9o8eoHzpxc'],
  'Não adquirir para a prioridade atual.'),
 ('GepHGs_CZdk',False,'app_dados_interacoes','superseded_by_more_complete_case',
  'Watchlist é pertinente, mas o caso de 2026 do mesmo autor acrescenta problema, telas e estados de borda. Evitar duas introduções de filmes e duplicação de setup.',
  ['Terminal, Cursor, clonagem, planejamento e watchlist constam nos capítulos'],
  ['Repositório e familiaridade mínima com arquivos'],
  ['G9o8eoHzpxc'],
  'Não adquirir enquanto o caso mais recente atender à lacuna de dados/interações.')
]
candidates=[]
for video_id,selected,theme,role,reason,confirmed,estimated,duplicates,next_action in specs:
    m=meta.get(video_id)
    doc=json.loads((LOCAL/m['artifact']['path']).read_text()) if m else {}
    a=acquired.get(video_id)
    publication=doc.get('upload_date')
    if publication: publication=publication[:4]+'-'+publication[4:6]+'-'+publication[6:8]
    else: publication=a.get('published_at') if a else None
    candidates.append({
      'video_id':video_id,'url':rows.get(video_id,{}).get('url','https://www.youtube.com/watch?v='+video_id),
      'title':doc.get('title') or (a.get('title') if a else rows.get(video_id,{}).get('title')),
      'source_ids':rows.get(video_id,{}).get('source_ids',[]),'selected':selected,'selection_meaning':'selected_for_integral_study; not curriculum-approved',
      'theme':theme,'role':role,'audience':'Pessoas comuns criando um primeiro resultado, sites, apps simples ou automações úteis.',
      'prerequisites':{'confirmed':confirmed,'confirmed_evidence':'existing_integral_text_study' if video_id=='ntDIxaeo3Wg' else 'public_title_description_chapters_only','estimated':estimated,'estimates_require_integral_study':True},
      'currency':{'published_at':publication,'assessed_at':'2026-09-28','operational_steps_currently_verified':False,'note':'Data não comprova compatibilidade atual; conferir interface, acesso, custos e modelos antes de instrução operacional.'},
      'duplication':{'related_video_ids':duplicates,'policy':'Escolher uma fonte por lacuna; alternativas ficam em reserva e não geram download automático.'},
      'reason':reason,'status':('existing_transcript_analyzed_visual_pending' if video_id=='ntDIxaeo3Wg' else 'exported_track_study_pending' if a and selected else 'selected_pending_acquisition' if selected else 'not_selected'),
      'acquisition_action':'reuse_existing' if selected and a else 'acquire_selected' if selected else 'do_not_acquire',
      'next_action':next_action,'metadata_evidence':m.get('artifact') if m else None,
      'transcript_artifacts':a.get('artifacts') if a else [],
      'full_source_analyzed':False,'curriculum_approved':False})
selected_ids={c['video_id'] for c in candidates if c['selected']}
preserved=[{'video_id':vid,'title':row['title'],'status':'preserved_not_selected','reason':'Adquirido antes da mudança explícita de prioridade; não entra automaticamente na curadoria.'} for vid,row in acquired.items() if vid not in selected_ids]
result={
 'schema_version':1,'updated_at':datetime.now(timezone.utc).isoformat(),
 'policy':{'general_historical_acquisition_active':False,'reason':'Mudança explícita do usuário: foco em pessoas comuns criando sites, apps simples e automações; não maximizar downloads.','general_queue_stopped_after_video_id':'iqNzfK4_meQ','selection_basis':'Objetivos não cobertos, adequação do percurso, dependências e duplicação; sem quota por canal ou número-alvo de vídeos.','metadata_is_not_study':True,'new_acquisitions_are_research_only':True},
 'criteria':{'include':['Problema cotidiano definido e resultado observável','Construir e avaliar algo utilizável','Evidência de teste/correção/publicação ou ciclo de automação','Transferência da mesma competência entre ferramentas'], 'defer':['Shorts e snippets como substituto do vídeo completo','Hype, notícias e rankings sem tarefa transferível','Setup avançado, SSH/self-hosting, RAG e bancos vetoriais como entrada','Duplicação de cursos genéricos e exemplos de domínio que exijam especialização']},
 'tracks':[
  {'id':'primeiro_resultado','selected_video_ids':['ntDIxaeo3Wg'],'completion_evidence_required':['Abrir resultado','Verificar comportamento solicitado','Pedir mudança pequena e repetir teste'],'remaining_gap':'Rota gráfica acessível depende da fonte oficial Desktop estudada separadamente; este vídeo não comprova essa rota.'},
  {'id':'site','selected_video_ids':['SKBDC3QugZw','fK_bm84N7bs'],'completion_evidence_required':['Página atende pedido','Testes funcionais e de tela pequena','Corrigir falha observada','Abrir URL publicada fora da prévia'],'remaining_gap':'Teste funcional, responsividade e recuperação precisam de verificação integral; descrição sozinha não os confirma. Outro agente estuda uma fonte primária curta de upload/publicação.'},
  {'id':'app','selected_video_ids':['G9o8eoHzpxc'],'completion_evidence_required':['Dados e estados definidos','Criar/alterar/remover itens','Confirmar persistência se necessária','Verificar entrada inválida e estado vazio'],'remaining_gap':'Persistência e operações de dados ainda não confirmadas.'},
  {'id':'automacao','selected_video_ids':['68BnH29qvAA','HN0oWxbF2bM','-zFd1nPn6U0','bTF3tACqPRU'],'completion_evidence_required':['Gatilho e ação observados','Resultado confrontado com exemplo esperado','Falha induzida registrada','Recuperação, pausa e manutenção demonstradas'],'remaining_gap':'A fonte de rotina é o primeiro contato; inbox e n8n são percurso posterior. Não estão confirmados controle de duplicação, repetição segura nem manutenção prolongada.'},
  {'id':'transferencia','selected_video_ids':['E2UgYp2vh5U','fK_bm84N7bs'],'completion_evidence_required':['Mesmo pedido e contexto em Claude e Codex','Mesmo critério comportamental aplicado aos dois','Identificar o que depende da interface'],'remaining_gap':'Ainda exige estudo integral e conferência dos dois resultados; rankings do autor não são conclusões do curso.'}
 ],
 'candidates':candidates,'preserved_prior_acquisitions':preserved,
 'handoff':'Estudar integralmente as faixas selecionadas, registrar limitações e conferir visuais materiais. Nenhum item é aprovado para currículo apenas pela triagem ou exportação.'}
previous=json.loads((HERE/'curation.json').read_text()) if (HERE/'curation.json').exists() else {}
# Preserve later editorial decisions and user directives. Regeneration refreshes
# evidence; it must not reinstate an earlier restriction or erase study flags.
result['policy'].update(previous.get('policy',{}))
for field in ('tracks','criteria','handoff'):
    if field in previous:
        result[field]=previous[field]
previous_candidates={c['video_id']:c for c in previous.get('candidates',[])}
historical=result['policy'].get('scope')=='exhaustive_user_directive_2026_09_28'
for candidate in result['candidates']:
    candidate.update(previous_candidates.get(candidate['video_id'],{}))
    current=acquired.get(candidate['video_id'])
    if current:
        candidate['transcript_artifacts']=current.get('artifacts',[])
        for flag in ('full_transcript_read','full_video_watched','full_source_analyzed','full_speech_coverage_verified'):
            candidate[flag]=bool(candidate.get(flag) or current.get(flag))
        candidate['status']='full_source_analyzed' if candidate.get('full_source_analyzed') else 'transcript_analyzed_visual_pending' if candidate.get('full_transcript_read') else 'exported_track_study_pending'
        candidate['acquisition_action']='reuse_existing'
    if historical:
        candidate['selection_scope']='immediate_course_study_priority_only'
        candidate['permanently_excluded']=False
        if not candidate['selected'] and not current:
            candidate['acquisition_action']='historical_queue'
            candidate['status']='deferred_in_exhaustive_priority'
(HERE/'curation.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'selected_for_study':sum(c['selected'] for c in candidates),'selected_pending_acquisition':sum(c['acquisition_action']=='acquire_selected' for c in candidates),'not_selected_after_metadata_triage':sum(not c['selected'] for c in candidates),'preserved_prior_acquisitions':len(preserved)}))
