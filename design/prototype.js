(() => {
'use strict';
const dictionaries = window.GANESHA_LOCALES;
const query = new URLSearchParams(location.search);
let locale = Object.hasOwn(dictionaries, query.get('lang')) ? query.get('lang') : 'pt-BR';
const storageKey = 'ganesha-design-prototype-v1';
const fresh = () => ({version:1, step:0, tool:'claude', completed:[], drafts:{}, reviewed:{}, answers:{}, checks:{}, external:false});
let data = fresh(), storageFailed = query.get('state') === 'save-error';
try {
  const stored = localStorage.getItem(storageKey);
  if (stored) {
    const parsed = JSON.parse(stored);
    if (parsed.version===1 && Array.isArray(parsed.completed) && parsed.completed.every(x=>Number.isInteger(x)&&x>=0&&x<7) && Number.isInteger(parsed.step) && parsed.step>=0 && parsed.step<7 && ['claude','codex'].includes(parsed.tool) && parsed.drafts && parsed.reviewed && parsed.answers && parsed.checks) data=parsed;
    else storageFailed=true;
  }
} catch { storageFailed=true; }
let screen=query.get('screen')==='lesson'?'lesson':'journey';
if (query.has('step') && /^[0-6]$/.test(query.get('step'))) data.step=Number(query.get('step'));
let notice='', result=false, busy=false;
const $=s=>document.querySelector(s);
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const t=k=>{if(!Object.hasOwn(dictionaries[locale],k)) throw new Error(`Missing locale key: ${locale}.${k}`);return dictionaries[locale][k];};
const n=x=>new Intl.NumberFormat(locale).format(x);
const paths={
  journey:'M4 19h4V9h5V4h7 M4 4h3 M17 16h3v4h-3z',
  grid:'M4 4h6v6H4z M14 4h6v6h-6z M4 14h6v6H4z M14 14h6v6h-6z',
  arrow:'M5 12h14 M13 6l6 6-6 6', back:'M19 12H5 M11 6l-6 6 6 6',
  check:'m5 12 4 4L19 6', globe:'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0 M3 12h18 M12 3c5 5 5 13 0 18-5-5-5-13 0-18',
  spark:'m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5z',
  pen:'m15 4 5 5-10 10-6 1 1-6z M13 6l5 5',
  target:'M20 12a8 8 0 1 1-8-8 M16 12a4 4 0 1 1-4-4 M12 12l8-8 M16 4h4v4',
  browser:'M3 5h18v15H3z M3 9h18 M6 7h.01 M9 7h.01',
  flag:'M5 21V4 M5 4c5-3 9 3 14 0v10c-5 3-9-3-14 0',
  user:'M16 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0 M4 21a8 8 0 0 1 16 0',
  info:'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0 M12 11v6 M12 7v.1',
  shield:'m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6z m-4 9 3 3 5-5',
  cloud:'M7 18a5 5 0 0 1-1-10 6 6 0 0 1 11-2 6 6 0 0 1 1 12 M12 11v6 M12 20v.1',
  book:'M12 6C8 3 5 3 3 4v15c3-1 6-1 9 2 3-3 6-3 9-2V4c-2-1-5-1-9 2v15'
};
const icon=(name,size=20)=>`<svg aria-hidden="true" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><path d="${paths[name]||paths.spark}"/></svg>`;
const arrow=(name='arrow')=>`<span class="arrow">${icon(name,18)}</span>`;
const completed=i=>data.completed.includes(i);
const completion=()=>data.completed.length;
const mark=i=>{if(!completed(i))data.completed.push(i);save();};
function save(){try {if(query.get('state')==='save-error')throw Error();localStorage.setItem(storageKey,JSON.stringify(data));}catch{storageFailed=true;}}
function feedback(text,good=false){return `<div class="feedback ${good?'good':'error'}" role="status">${icon(good?'check':'info')}<p>${escape(text)}</p></div>`;}
function stageStatus(i){return completed(i)?t('done'):i===data.step?t('current'):t('pending');}
function flow(){return `<div class="flow visual">${t('flowLabels').map((label,i)=>`${i?arrow():''}<div class="flow-item"><span>${icon(['target','user','check'][i],27)}</span><strong>${escape(label)}</strong><p>${escape(t('flowDetails')[i])}</p></div>`).join('')}</div>`;}
function mini(){return `<div class="mini-site"><div class="browser-dots" aria-hidden="true"><i></i><i></i><i></i></div><div class="mini-content"><strong>${escape(t('siteTitle'))}</strong><p>${escape(t('siteBody'))}</p><div class="fake-pill" aria-hidden="true"></div><div class="mini-grid" aria-hidden="true"><span></span><span></span><span></span></div></div></div>`;}
function toolPicker(){return `<p class="small">${t('tool')}</p><div class="tool-picker" role="group" aria-label="${t('tool')}">${['claude','codex'].map(tool=>`<button data-tool="${tool}" aria-pressed="${data.tool===tool}"><bdi>${tool==='claude'?'Claude':'Codex'}</bdi></button>`).join('')}</div>`;}
function shell(body){
return `<a class="skip" href="#main">${t('skip')}</a><div class="shell"><aside class="sidebar"><div class="brand"><span class="brandmark" aria-hidden="true"><svg width="32" height="36" viewBox="0 0 32 36" fill="none"><path d="M5 28V13a11 11 0 0 1 22 0v15" stroke="currentColor" stroke-width="5" stroke-linecap="round"/><path d="M16 14v12c0 7 10 7 10 1" stroke="currentColor" stroke-width="5" stroke-linecap="round"/></svg></span>ganesha</div><nav class="nav" aria-label="Ganesha"><button data-action="home" ${screen==='journey'?'aria-current="page"':''}>${icon('journey')}${t('journey')}</button><button data-action="start" ${screen==='lesson'?'aria-current="page"':''}>${icon('book')}${t('stages')}</button></nav><div class="sidebar-foot"><div class="profile"><span class="avatar">${icon('user',18)}</span><span>${t('profile')}</span></div><p>${storageFailed?t('storageError'):t('saved')}</p></div></aside><div class="workspace"><header class="topbar"><div class="breadcrumb">${t('journey')} <span aria-hidden="true">/</span> <strong>${t('demoOnly')}</strong></div><div class="language">${icon('globe',17)}<select id="locale" aria-label="${t('language')}">${Object.entries(dictionaries).map(([code,d])=>`<option lang="${code}" value="${code}" ${locale===code?'selected':''}>${d.name}</option>`).join('')}</select></div></header><main class="main" id="main">${storageFailed?feedback(t('storageError')):''}${query.get('state')==='recovered'?`<div class="feedback good" role="status">${icon('cloud')}<p><strong>${t('recoveredTitle')}</strong>${t('recoveredBody')}</p></div>`:''}${body}<p class="prototype-note">${icon('info',14)}${t('prototype')}</p></main></div></div>`;
}
function journey(){return `<div class="intro"><div><p class="eyebrow">${t('tag')}</p><h1 tabindex="-1">${t('hello')}</h1><p>${t('tagline')}</p></div><span class="pill">${icon('spark',14)}${t('demoOnly')}</span></div><section class="hero"><div class="hero-copy"><span class="pill purple">${t('newStart')}</span><h2>${t('heroTitle')}</h2><p>${t('heroBody')}</p><button class="btn primary" data-action="start">${completion()?t('resume'):t('begin')}${arrow()}</button></div><img src="assets/creative-workshop.png" alt="${t('alt')}" width="1254" height="1254"></section><div class="dashboard-grid"><section><div class="section-heading"><h2>${t('journey')}</h2><span class="small">${n(completion())}/${n(7)}</span></div><div class="card"><div class="journey-head"><div><h3>${t('lessonTitle')}</h3><p>${n(completion())} / ${n(7)} ${t('completed')}</p></div><span class="progress-number">${icon('flag',22)}</span></div><ol class="journey">${t('stageTitles').map((label,i)=>`<li class="${completed(i)?'done':i===data.step?'current':''}"><button data-step="${i}" ${i===data.step?'aria-current="step"':''}><span class="node">${completed(i)?icon('check'):icon(['spark','pen','shield','browser','shield','pen','flag'][i])}</span><span class="step-label"><strong>${label}</strong><span>${t('stageTypes')[i]}</span></span>${i===data.step||completed(i)?`<span class="pill ${completed(i)?'green':'purple'}">${stageStatus(i)}</span>`:arrow()}</button></li>`).join('')}</ol></div></section><aside class="side-stack"><section class="card project-card"><p class="eyebrow">${t('artifact')}</p>${mini()}<h3>${t('lessonTitle')}</h3><p>${t('artifactBody')}</p></section><section class="card evidence-card"><h3>${t('evidence')}</h3><p class="small">${t('evidenceBody')}</p><div class="evidence-row">${icon('pen',23)}<div><strong>${t('practice')}</strong><p>${t('openPractice')}</p></div></div><div class="evidence-row">${icon('shield',23)}<div><strong>${t('checks')}</strong><p>${n(Number(!!data.checks[2])+Number(!!data.checks[4]))} / ${n(2)}</p></div></div><div class="meter" role="progressbar" aria-label="${t('completed')}" aria-valuenow="${completion()}" aria-valuemin="0" aria-valuemax="7"><span style="width:${completion()/7*100}%"></span></div></section></aside></div>`;}
function practice(i){return `${i===1?toolPicker():''}${flow()}<div class="sim-header"><strong>${i===1?t('practice'):t('stageTypes')[5]}</strong><span class="pill purple">${t('openPractice')}</span></div><div style="margin-top:18px"><label for="draft">${i===1?t('inputLabel'):t('correctionLabel')}</label><textarea id="draft" dir="auto" placeholder="${i===1?t('inputPlaceholder'):t('correctionPlaceholder')}">${escape(data.drafts[i]||'')}</textarea><label class="answer"><input type="checkbox" id="reviewed" ${data.reviewed[i]?'checked':''}>${t('practiceAck')}</label></div>${i===1?`<div class="sim-header"><span class="pill purple">${t('simulated')}</span><button class="btn secondary small" data-action="simulate" ${busy?'disabled':''}>${t('generate')}</button></div><p class="form-help">${t('simulatedNote')}</p>${busy?`<div class="loading" role="status"><span class="spinner" aria-hidden="true"></span>${t('loading')}</div>`:result?`<div class="preview-response" role="status"><strong>${t('result')}</strong><p>${t('resultBody')}</p></div>`:''}`:''}`;}
function check(i){const answers=t(i===2?'answer1':'answer2'),question=t(i===2?'q1':'q2');return `<fieldset><legend>${question}</legend>${answers.map((answer,j)=>`<label class="answer"><input type="radio" name="answer" value="${j}" ${Number(data.answers[i])===j && Object.hasOwn(data.answers,i)?'checked':''}>${answer}</label>`).join('')}</fieldset>${Object.hasOwn(data.checks,i)?`<div class="feedback ${data.checks[i]?'good':'error'}" role="status">${icon(data.checks[i]?'check':'info')}<p><strong>${data.checks[i]?t('correct'):t('wrong')}</strong>${t(i===2?(data.checks[i]?'feedbackGood':'feedbackBad'):(data.checks[i]?'feedback2Good':'feedback2Bad'))}</p></div>`:''}`;}
function lesson(){const i=data.step;let content='';
if(i===0)content=flow()+mini();
if(i===1||i===5)content=practice(i);
if(i===2||i===4)content=check(i);
if(i===3)content=`${toolPicker()}<div class="preview-response"><strong>${t('external')}</strong><p>${t('externalBody')}</p></div><label class="answer" style="margin-top:20px"><input type="checkbox" id="external" ${data.external?'checked':''}>${t('ack')}</label><p class="form-help">${t('demoOnly')} · ${t('openPractice')}</p>`;
if(i===6&&completed(6))content=`<div class="success-art">${icon('flag')}</div><h2>${completed(6)?t('completedDemo'):t('summaryTitle')}</h2><p style="margin-top:12px">${t('summaryBody')}</p><div class="evidence-row">${icon('pen')}<div><strong>${t('practice')}</strong><p>${t('openPractice')}</p></div></div><div class="evidence-row">${icon('shield')}<div><strong>${t('checks')}</strong><p>${n(Number(!!data.checks[2])+Number(!!data.checks[4]))} / ${n(2)}</p></div></div>`;
if(i===6&&!completed(6))content=`${toolPicker()}<div class="flow visual flow-transfer"><div class="flow-item"><span>${icon('pen',27)}</span><strong>${t('inputLabel')}</strong></div>${arrow()}<div class="flow-item"><span>${icon('browser',27)}</span><strong><bdi>${data.tool==='claude'?'Codex':'Claude'}</bdi></strong></div></div><div style="margin-top:22px"><label for="draft">${t('transferLabel')}</label><textarea id="draft" dir="auto" placeholder="${t('transferPlaceholder')}">${escape(data.drafts[6]||'')}</textarea><label class="answer"><input type="checkbox" id="reviewed" ${data.reviewed[6]?'checked':''}>${t('practiceAck')}</label></div>`;
const pass=(i===2||i===4)&&data.checks[i];
return `<div class="lesson-top"><button class="btn ghost" data-action="home" aria-label="${t('back')}">${arrow('back')}<span class="label">${t('back')}</span></button><div class="lesson-progress"><p>${n(i+1)} / ${n(7)} · ${t('stageTypes')[i]}</p><div class="track" aria-hidden="true">${t('stageTitles').map((_,j)=>`<span class="${completed(j)?'filled':''}"></span>`).join('')}</div></div><span class="pill purple"><bdi>${data.tool==='claude'?'Claude':'Codex'}</bdi></span></div><div class="lesson-grid"><article class="card stage ${i===6?'summary-stage':''}"><p class="eyebrow">${t('stageTypes')[i]}</p><h1 tabindex="-1">${t('stageTitles')[i]}</h1><p>${t('stageDescriptions')[i]}</p>${content}${notice?feedback(t(notice)):''}<div class="stage-footer"><p>${storageFailed?t('storageError'):t('saved')}</p><button class="btn primary" data-action="${i===2||i===4?pass?'next':'verify':i===6?completed(6)?'home':'complete':'next'}">${i===2||i===4?pass?t('next'):t('verify'):i===6?completed(6)?t('back'):t('complete'):t('next')}${arrow()}</button></div>${i===6&&completed(6)?`<button class="btn ghost small" style="margin-top:14px" data-action="reset">${t('reset')}</button>`:''}</article><aside class="lesson-aside"><div class="card stage-list"><h3>${t('stages')}</h3><nav aria-label="${t('stages')}">${t('stageTitles').map((name,j)=>`<button data-step="${j}" aria-label="${escape(name)}" ${i===j?'aria-current="step"':''}><span class="dot">${completed(j)?icon('check',13):n(j+1)}</span><span>${name}</span></button>`).join('')}</nav></div><details class="hint" open><summary>${t('help')}</summary><p>${t('hint')}</p></details></aside></div>`;
}
function render(focus=false){document.documentElement.lang=locale;document.documentElement.dir=locale==='ar'?'rtl':'ltr';document.title=`Ganesha · ${t('journey')}`;const unavailable=query.get('state')==='unavailable';$('#app').innerHTML=shell(unavailable?`<article class="card stage"><p class="eyebrow">${t('demoOnly')}</p><h1 tabindex="-1">${t('unavailableTitle')}</h1><p>${t('unavailableBody')}</p><div class="stage-footer"><button class="btn primary" data-action="home">${t('back')}${arrow()}</button></div></article>`:screen==='journey'?journey():lesson());bind();if(focus)$('h1')?.focus({preventScroll:true});}
function go(step){data.step=step;screen='lesson';notice='';result=false;save();render(true);window.scrollTo({top:0,behavior:'instant'});}
function bind(){
$('#locale').addEventListener('change',e=>{locale=e.target.value;render();$('#locale').focus();});
document.querySelectorAll('[data-step]').forEach(el=>el.addEventListener('click',()=>go(Number(el.dataset.step))));
document.querySelectorAll('[data-tool]').forEach(el=>el.addEventListener('click',()=>{data.tool=el.dataset.tool;save();render();document.querySelector(`[data-tool="${data.tool}"]`)?.focus();}));
$('#draft')?.addEventListener('input',e=>{data.drafts[data.step]=e.target.value;data.reviewed[data.step]=false;$('#reviewed').checked=false;data.completed=data.completed.filter(i=>i!==data.step&&i!==6);save();});
$('#reviewed')?.addEventListener('change',e=>{data.reviewed[data.step]=e.target.checked;if(!e.target.checked)data.completed=data.completed.filter(i=>i!==data.step&&i!==6);save();});
$('#external')?.addEventListener('change',e=>{data.external=e.target.checked;if(!e.target.checked)data.completed=data.completed.filter(i=>i!==3&&i!==6);save();});
document.querySelectorAll('input[name=answer]').forEach(el=>el.addEventListener('change',e=>{data.answers[data.step]=Number(e.target.value);delete data.checks[data.step];data.completed=data.completed.filter(i=>i!==data.step&&i!==6);save();render();document.querySelector(`input[name=answer][value="${e.target.value}"]`)?.focus();}));
document.querySelectorAll('[data-action]').forEach(el=>el.addEventListener('click',()=>action(el.dataset.action)));
}
function action(type){let i=data.step;
if(type==='home'){screen='journey';query.delete('state');notice='';render(true);window.scrollTo({top:0,behavior:'instant'});return;}
if(type==='start'){go(data.step);return;}
if(type==='reset'){data=fresh();save();go(0);return;}
if(type==='simulate'){busy=true;result=false;render();setTimeout(()=>{busy=false;result=true;render();},900);return;}
if(type==='verify'){if(!Object.hasOwn(data.answers,i)){notice='checkRequired';render();return;}data.checks[i]=data.answers[i]===(i===2?1:2);if(data.checks[i])mark(i);notice='';save();render();return;}
if(type==='next'){
 if((i===1||i===5)&&(!(data.drafts[i]||'').trim()||!data.reviewed[i])){notice=!(data.drafts[i]||'').trim()?'needText':'practiceAck';render();return;}
 if(i===3&&!data.external){notice='ack';render();return;}
 if((i===2||i===4)&&!data.checks[i])return;
 mark(i);go(Math.min(6,i+1));return;
}
if(type==='complete'){if(!(data.drafts[6]||'').trim()||!data.reviewed[6]){notice=!(data.drafts[6]||'').trim()?'needText':'practiceAck';render();return;}if(![0,1,2,3,4,5].every(completed)||!data.checks[2]||!data.checks[4]){notice='gate';render();return;}mark(6);notice='';render(true);}
}
render();
})();
