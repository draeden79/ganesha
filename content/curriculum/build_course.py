"""Build the reviewed hackathon beta. No locale fallback; published data immutable."""
import json
from pathlib import Path
ROOT=Path(__file__).resolve().parent
LOCALES=['pt-BR','en','es','fr','de','ja','hi','id','ar','ko','zh-CN']
VERSION='0.2.0'
SLUGS=['foundations','site','app','automation']
COMMON=['course.title','course.summary','step.learn','step.prepare','step.check-plan','step.execute','step.check-result','step.deliver','action.learn','action.prepare','action.check','action.execute','hint.compare','hint.repair','tool.claude','tool.codex','notice.simulated','criterion.compare','criterion.record','feedback.retry','feedback.success']
FIELDS=['title','objective','learn','prepare','execute','deliver','q1','q1.a','q1.b','q1.c','q1.feedback','q2','q2.a','q2.b','q2.c','q2.feedback']
existing=ROOT/'course.json'
if existing.exists() and json.loads(existing.read_text()).get('status')=='published':
 raise ValueError('Published course is immutable; create a new version')
# Draft lessons are available only through the explicitly authorized beta allowlist.
course={'schemaVersion':'1.0.0','id':'course.first-site','version':VERSION,'status':'preview','defaultLocale':'pt-BR','requiredLocales':LOCALES,'titleKey':'course.title','summaryKey':'course.summary','releasedLessonIds':[],'competencies':[],'rubrics':[],'lessons':[]}
for slug in SLUGS:
 course['competencies'].append({'id':f'competency.{slug}','titleKey':f'{slug}.title','outcomeKey':f'{slug}.objective','prerequisiteIds':[] if slug=='foundations' else ['competency.foundations'],'evidenceIds':['ev-codex-prompting']})
course['rubrics']=[{'id':'rubric.beta','criteria':[{'id':f'criterion.{key}','labelKey':f'criterion.{key}','feedbackKey':'hint.compare','required':True} for key in ['compare','record']]}]
for i,slug in enumerate(SLUGS):
 lesson={'id':f'lesson.{slug}','order':i+1,'status':'draft','titleKey':f'{slug}.title','summaryKey':f'{slug}.objective','objectiveKeys':[f'{slug}.objective'],'competencyIds':[f'competency.{slug}'],'prerequisiteLessonIds':[] if i==0 else ['lesson.foundations'],'estimatedMinutes':[25,45,50,45][i],'steps':[]}
 for name in ['learn','prepare','check-plan','execute','check-result','deliver']:
  sid=f'step.{slug}.{name}'
  ischeck=name.startswith('check')
  action='action.check' if ischeck else 'action.prepare' if name=='prepare' else 'action.learn' if name=='learn' else 'action.execute'
  body='hint.compare' if ischeck else f'{slug}.{name}'
  step={'id':sid,'kind':'check' if ischeck else 'explain' if name=='learn' else 'practice','titleKey':f'step.{name}','objectiveKey':f'{slug}.objective','actionKey':action,'expectedResultKey':f'{slug}.objective','hintKeys':['hint.compare','hint.repair'],'criteriaKeys':['criterion.compare','criterion.record'],'isAssessment':ischeck,'executionMode':'guided-simulation' if ischeck or name=='prepare' else 'concept' if name=='learn' else 'external-real-task','blocks':[{'id':f'{sid}.body','kind':'paragraph','textKey':body}],'competencyIds':[f'competency.{slug}'],'evidenceIds':['ev-codex-prompting'],'toolVariants':{t:{'blocks':[{'id':f'{sid}.{t}','kind':'paragraph','textKey':f'tool.{t}'}],'evidenceIds':['ev-claude-desktop-start' if t=='claude' else 'ev-codex-desktop-quickstart']} for t in ['claude','codex']}}
  if name=='prepare': step['blocks'].insert(0,{'id':sid+'.notice','kind':'callout','textKey':'notice.simulated'})
  if slug=='automation' and name=='prepare':
   step['blocks'].append({'id':sid+'.csv','kind':'code','code':'id,item,amount\n1,Caderno,10.50\n2,Curso,20.00'})
  if slug=='site' and name=='deliver':
   step['evidenceIds']=['ev-netlify-drop-static','ev-netlify-project-visibility']
  if ischeck:
   q='q1' if name=='check-plan' else 'q2'
   correct='b' if q=='q1' else ['c','a','c','c'][i]
   step['check']={'id':f'check.{slug}.{q}.v2','kind':'single-choice','questionKey':f'{slug}.{q}','competencyIds':[f'competency.{slug}'],'successFeedbackKey':f'{slug}.{q}.feedback','retryFeedbackKey':f'{slug}.{q}.feedback','required':True,'options':[{'id':f'option.{slug}.{q}.{o}','labelKey':f'{slug}.{q}.{o}','feedbackKey':f'{slug}.{q}.feedback'} for o in ['a','b','c']],'correctOptionIds':[f'option.{slug}.{q}.{correct}']}
  elif name!='learn':
   step['exercise']={'id':f'exercise.{slug}.{name}.v2','mode':'simulated' if name=='prepare' else 'local-user','promptKey':f'{slug}.{name}','deliverableKey':'criterion.record','rubricId':'rubric.beta'}
  lesson['steps'].append(step)
 course['lessons'].append(lesson)
required=set()
def keys(x):
 if isinstance(x,dict):
  for k,v in x.items():
   if k.endswith('Key') and isinstance(v,str): required.add(v)
   elif k.endswith('Keys'): required.update(v)
   else: keys(v)
 elif isinstance(x,list):
  for v in x: keys(v)
keys(course)
catalogs={}
for locale in LOCALES:
 source=ROOT/'beta'/f'{locale}.json'
 raw=json.loads(source.read_text())
 assert len(raw['common'])==len(COMMON),(locale,'common',len(raw['common']))
 assert len(raw['lessons'])==4
 messages=dict(zip(COMMON,raw['common']))
 for slug,row in zip(SLUGS,raw['lessons']):
  assert len(row)==len(FIELDS),(locale,slug,len(row))
  messages.update({f'{slug}.{key}':value for key,value in zip(FIELDS,row)})
 assert all(isinstance(v,str) and v.strip() for v in messages.values()),locale
 assert required<=messages.keys(),required-messages.keys()
 # Keep the serialized catalog restricted to keys actually used by this course.
 messages={k:messages[k] for k in sorted(required)}
 catalogs[locale]={'schemaVersion':'1.0.0','courseId':course['id'],'courseVersion':VERSION,'locale':locale,'direction':'rtl' if locale=='ar' else 'ltr','humanReviewStatus':'pending','translationMethod':'ai-authored','messages':{k:{'value':v,'status':'translated','sourceRevision':VERSION} for k,v in messages.items()}}
(ROOT/'course.json').write_text(json.dumps(course,ensure_ascii=False,indent=2)+'\n')
for locale,catalog in catalogs.items():
 (ROOT.parent/'locales'/f'{locale}.json').write_text(json.dumps(catalog,ensure_ascii=False,indent=2)+'\n')
 (ROOT/'messages'/f'{locale}.json').write_text(json.dumps({k:v['value'] for k,v in catalog['messages'].items()},ensure_ascii=False,indent=2)+'\n')
print(f'Built {len(course["lessons"])} draft beta lessons, 24 steps, 8 checks, {len(required)} keys × {len(catalogs)} locales.')
