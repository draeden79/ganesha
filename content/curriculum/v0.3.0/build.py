"""Compile isolated0.3.0 curriculum; never writes the active0.2.0 package."""
import argparse
import hashlib
import json
from pathlib import Path

ROOT=Path(__file__).resolve().parent
VERSION='0.3.0'
LOCALES=['pt-BR','en','es','fr','de','ja','hi','id','ar','ko','zh-CN']
DOMAINS=['foundations','sites','apps','automation']
SLUGS=['workspace','requests','verification','site-build','site-quality','site-publish','app-state','app-storage','app-delivery','automation-input','automation-report','automation-schedule']
REGISTRY=ROOT.parents[1]/'research'/'registry.json'

def read(p):return json.loads(p.read_text())
def write(p,x):
 p.parent.mkdir(parents=True,exist_ok=True)
 p.write_text(json.dumps(x,ensure_ascii=False,indent=2)+'\n')

def prepare():
 source={lang:sum((read(ROOT/'authoring'/f'{domain}.{lang}.json')['lessons'] for domain in DOMAINS),[]) for lang in ['pt-BR','en']}
 for lang,lessons in source.items():
  assert [l['slug'] for l in lessons]==SLUGS,(lang,'lesson order')
  for lesson in lessons:
   assert len(lesson['steps'])==10,lesson['slug']
   assert [i for i,s in enumerate(lesson['steps']) if s['kind']=='check']==[3,8],lesson['slug']
   assert len({s['slug'] for s in lesson['steps']})==10
   assert sum(s['kind']=='practice' for s in lesson['steps'])>=4
   for step in lesson['steps']:
    for key in ['title','objective','body','action','expected','hint']:
     assert isinstance(step[key],str) and step[key].strip(),(lang,lesson['slug'],step['slug'],key)
    assert step['criteria']
    if step['kind']=='check':
     c=step['check'];assert [o['id'] for o in c['options']]==['a','b','c']
     assert c['correct'] in ['a','b','c']
 evidence={}
 frozen_bindings=None
 if REGISTRY.exists():
  for e in read(REGISTRY)['evidence']:evidence.setdefault(e['sourceId'],[]).append(e['id'])
 else:
  # The isolated package carries the reviewed bindings used for its snapshot.
  frozen_bindings=read(ROOT/'SOURCE_BINDINGS.json')['lessons']
 messages={'pt-BR':{},'en':{}}
 intern={}
 def message(key,pt,en):
  assert all(isinstance(x,str) and x.strip() for x in [pt,en]),key
  pair=(pt,en)
  if pair in intern:return intern[pair]
  assert key not in messages['pt-BR'],key
  intern[pair]=key
  messages['pt-BR'][key]=pt;messages['en'][key]=en
  return key
 course={'schemaVersion':'1.0.0','id':'course.first-site','version':VERSION,'status':'preview','defaultLocale':'pt-BR','requiredLocales':LOCALES,'titleKey':message('course.title','Sites, apps e automações com IA','Sites, apps and automations with AI'),'summaryKey':message('course.summary','12 aulas práticas: prepare seu contexto, construa e teste projetos, entregue resultados e controle uma automação. Exemplos originais e práticas simuladas estão identificados. Execução externa é autodeclarada; tradução por IA com revisão humana pendente. Tempos são estimativas de planejamento.','12 practical lessons: prepare context, build and test projects, deliver results and control an automation. Original examples and simulated practices are labeled. External execution is self-reported; AI translation awaits human review. Durations are planning estimates.'),'releasedLessonIds':[],'competencies':[],'rubrics':[],'lessons':[]}
 notice=message('notice.external-record','Registre o que realmente executou ou o impedimento encontrado. Se analisar um exemplo simulado, identifique esse modo; ele não comprova execução externa.','Record what you actually ran or the obstacle encountered. If you analyze a simulated example, identify that mode; it does not establish external execution.')
 recordcriterion=message('criterion.execution-record','O registro distingue observação real, análise simulada e pendências.','The record distinguishes actual observation, simulated analysis and remaining work.')
 comparisoncriterion=message('criterion.compare-record','Comparei com os critérios da etapa e indiquei o que está conferido ou pendente.','I compared against this step’s criteria and identified what is checked or still pending.')
 refs={}
 for index,(lp,le) in enumerate(zip(source['pt-BR'],source['en'])):
  for k in ['slug','prerequisites','minutes','sourceRefs']:
   assert lp[k]==le[k],(lp['slug'],k)
  slug=lp['slug'];cid=f'competency.{slug}.v3'
  def lm(field):return message(f'{slug}.{field}',lp[field],le[field])
  lesson={'id':f'lesson.{slug}','order':index+1,'status':'draft','titleKey':lm('title'),'summaryKey':lm('summary'),'objectiveKeys':[lm('outcome')],'competencyIds':[cid],'prerequisiteLessonIds':[f'lesson.{p}' for p in lp['prerequisites']],'estimatedMinutes':lp['minutes'],'steps':[]}
  if frozen_bindings is None:
   ev=list(dict.fromkeys(x for ref in lp['sourceRefs'] for x in evidence.get(ref,[])))
   unmapped=[ref for ref in lp['sourceRefs'] if ref not in evidence]
  else:
   binding=frozen_bindings[slug]
   assert binding['sourceRefs']==lp['sourceRefs'],(slug,'Changed source references require the research registry')
   ev=binding['evidenceIds']
   unmapped=binding['unmappedReferences']
  refs[slug]={'sourceRefs':lp['sourceRefs'],'evidenceIds':ev,'unmappedReferences':unmapped}
  course['competencies'].append({'id':cid,'titleKey':lesson['titleKey'],'outcomeKey':lesson['objectiveKeys'][0],'prerequisiteIds':[f'competency.{p}.v3' for p in lp['prerequisites']],'evidenceIds':ev})
  for sp,se in zip(lp['steps'],le['steps']):
   for k in ['slug','kind','mode']:
    assert sp[k]==se[k],(slug,sp['slug'],k)
   assert len(sp['criteria'])==len(se['criteria'])
   assert bool(sp.get('prompt'))==bool(se.get('prompt'))
   assert sp.get('code')==se.get('code')
   assert set(sp.get('variants',{}))==set(se.get('variants',{}))
   ss=sp['slug'];prefix=f'{slug}.{ss}';sid=f'step.{slug}.{ss}.v3'
   def sm(field):return message(f'{prefix}.{field}',sp[field],se[field])
   step={'id':sid,'kind':sp['kind'],'titleKey':sm('title'),'objectiveKey':sm('objective'),'actionKey':sm('action'),'expectedResultKey':sm('expected'),'hintKeys':[sm('hint')],'criteriaKeys':[message(f'{prefix}.criterion.{i+1}',a,b) for i,(a,b) in enumerate(zip(sp['criteria'],se['criteria']))],'isAssessment':sp['kind']=='check','executionMode':sp['mode'],'blocks':[{'id':f'block.{prefix}.body.v3','kind':'paragraph','textKey':sm('body')}],'competencyIds':[cid],'evidenceIds':ev,'toolVariants':{t:{'blocks':[],'evidenceIds':[]} for t in ['claude','codex']}}
   if sp.get('prompt'):
    step['blocks'].append({'id':f'block.{prefix}.prompt.v3','kind':'callout','textKey':sm('prompt')})
   if sp.get('code'):
    step['blocks'].append({'id':f'block.{prefix}.code.v3','kind':'code','code':sp['code']})
   for tool in ['claude','codex']:
    if sp.get('variants',{}).get(tool):
     key=message(f'{prefix}.tool.{tool}',sp['variants'][tool],se['variants'][tool])
     step['toolVariants'][tool]={'blocks':[{'id':f'block.{prefix}.{tool}.v3','kind':'paragraph','textKey':key}],'evidenceIds':ev}
   if sp['mode']=='external-real-task':
    step['blocks'].append({'id':f'block.{prefix}.record.v3','kind':'callout','textKey':notice})
   if sp['kind']=='check':
    cp,ce=sp['check'],se['check'];assert cp['correct']==ce['correct']
    def cm(field):return message(f'{prefix}.check.{field}',cp[field],ce[field])
    chk={'id':f'check.{slug}.{ss}.v3','kind':'single-choice','questionKey':cm('question'),'competencyIds':[cid],'successFeedbackKey':cm('success'),'retryFeedbackKey':cm('retry'),'required':True,'options':[],'correctOptionIds':[f'option.{slug}.{ss}.{cp["correct"]}.v3']}
    for op,oe in zip(cp['options'],ce['options']):
     assert op['id']==oe['id']
     opt=op['id'];chk['options'].append({'id':f'option.{slug}.{ss}.{opt}.v3','labelKey':message(f'{prefix}.option.{opt}',op['text'],oe['text']),'feedbackKey':message(f'{prefix}.feedback.{opt}',op['feedback'],oe['feedback'])})
    step['check']=chk
   elif sp['kind'] in ['practice','reflect']:
    rid=f'rubric.{slug}.{ss}.v3'
    criteria=[{'id':f'criterion.{slug}.{ss}.{i+1}.v3','labelKey':key,'feedbackKey':step['hintKeys'][0],'required':True} for i,key in enumerate(step['criteriaKeys'])]
    if sp['mode']=='external-real-task':
     criteria=[{'id':f'criterion.{slug}.{ss}.record.v3','labelKey':recordcriterion,'feedbackKey':notice,'required':True},{'id':f'criterion.{slug}.{ss}.compare.v3','labelKey':comparisoncriterion,'feedbackKey':step['hintKeys'][0],'required':True}]
    course['rubrics'].append({'id':rid,'criteria':criteria})
    step['exercise']={'id':f'exercise.{slug}.{ss}.v3','mode':'local-user' if sp['mode']=='external-real-task' else 'simulated','promptKey':step['actionKey'],'deliverableKey':step['expectedResultKey'],'rubricId':rid}
   lesson['steps'].append(step)
  course['lessons'].append(lesson)
 write(ROOT/'course.template.json',course)
 write(ROOT/'SOURCE_BINDINGS.json',{'version':VERSION,'scope':'Sources support the stated concepts or procedures; original examples are not represented as source executions.','lessons':refs})
 for lang,msg in messages.items():write(ROOT/'source-messages'/f'{lang}.json',msg)
 write(ROOT/'AUTHORING_MANIFEST.json',{'version':VERSION,'sourceFiles':{str(p.relative_to(ROOT)):hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(ROOT/'authoring'/f'{domain}.{lang}.json' for domain in DOMAINS for lang in ['pt-BR','en'])},'messageCount':len(messages['en']),'sourceEnglishSha256':hashlib.sha256((ROOT/'source-messages/en.json').read_bytes()).hexdigest(),'lessons':SLUGS})
 print(f'Prepared12lessons/120steps; {len(messages["en"])} message keys; {sum(len(v.split()) for v in messages["en"].values())} English words.')

def compile_locales(locales):
 course=read(ROOT/'course.template.json');source=read(ROOT/'source-messages/en.json')
 catalogs={}
 for locale in locales:
  messages=read(ROOT/'source-messages'/f'{locale}.json')
  assert set(messages)==set(source),(locale,'keys missing or extra')
  assert all(isinstance(v,str) and v.strip() for v in messages.values()),locale
  catalogs[locale]={'schemaVersion':'1.0.0','courseId':course['id'],'courseVersion':VERSION,'locale':locale,'direction':'rtl' if locale=='ar' else 'ltr','humanReviewStatus':'pending','translationMethod':'ai-authored','messages':{k:{'value':v,'status':'translated','sourceRevision':VERSION} for k,v in messages.items()}}
 output=ROOT/'bundle'/'content'
 write(output/'curriculum/course.json',course)
 for locale,cat in catalogs.items():write(output/'locales'/f'{locale}.json',cat)
 available=[locale for locale in LOCALES if (output/'locales'/f'{locale}.json').exists()]
 write(ROOT/'bundle/STATUS.json',{'version':VERSION,'canonicalActivation':False,'requiredLocales':LOCALES,'availableLocales':available,'localizationComplete':set(available)==set(LOCALES),'humanReview':'pending','lessonCount':12,'stepCount':120,'assessmentCount':24,'releaseEligible':False,'mode':'isolated-review-package'})
 print('Compiled isolated bundle:',','.join(locales))

if __name__=='__main__':
 parser=argparse.ArgumentParser();parser.add_argument('action',choices=['prepare','compile','all']);parser.add_argument('--locales',nargs='+',choices=LOCALES,default=LOCALES);args=parser.parse_args()
 if args.action in ['prepare','all']:prepare()
 if args.action in ['compile','all']:compile_locales(args.locales)
