"""Rebuild the isolated design artifact from the preserved Professor sources."""
from pathlib import Path
import json, re, hashlib, html, textwrap

ROOT = Path(__file__).resolve().parent
SOURCE = ROOT / 'source'

def build_course():
    lessons=[]
    for p in sorted((SOURCE/'aulas').glob('*.md')):
        raw=p.read_text()
        chunks=re.split(r'^## (\d+)\. (.+)$', raw, flags=re.M)
        title=re.sub(r'^# Aula \d+ — ', '', chunks[0].splitlines()[0])
        lessons.append({'id':len(lessons)+1,'title':title,'file':str(p.relative_to(ROOT)),
            'intro':'\n'.join(chunks[0].splitlines()[2:]).strip(),
            'steps':[{'number':int(chunks[i]),'title':chunks[i+1], 'body':chunks[i+2].strip()} for i in range(1,len(chunks),3)]})
    course={'version':'Astra-PTBR-1.0','locale':'pt-BR','lessons':lessons,
            'welcome':(SOURCE/'COMECE-AQUI.md').read_text()}
    (ROOT/'course.js').write_text('window.ASTRA_COURSE = '+json.dumps(course,ensure_ascii=False,indent=2)+';\n')
    manifest={str(p.relative_to(SOURCE)):hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(SOURCE.rglob('*.md'))}
    (ROOT/'SOURCE_SHA256.json').write_text(json.dumps(manifest,indent=2)+'\n')
    print(f'{len(lessons)} aulas; {sum(len(x["steps"]) for x in lessons)} etapas; {len(manifest)} fontes preservadas')

def svg_text(x,y,text,size=20,weight=400,color='#17151F',width=47,line=28):
    rows=textwrap.wrap(text,width=width,break_long_words=False,break_on_hyphens=False) or ['']
    return ''.join(f'<text x="{x}" y="{y+i*line}" font-size="{size}" font-weight="{weight}" fill="{color}">{html.escape(t)}</text>' for i,t in enumerate(rows)),len(rows)*line

def build_assets():
    visuals=json.loads((ROOT/'visuals.pt-BR.json').read_text())
    for v in visuals:
        panels=v['panels']; n=len(panels); cols=2 if n in [2,4] else 3; rows=(n+cols-1)//cols
        cellw=(1120-(cols-1)*20)/cols; cellh=230 if rows==2 else 320
        height=210+rows*cellh+(rows-1)*20+85
        parts=[f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 {height}" role="img" aria-labelledby="title desc">',
            f'<title id="title">{html.escape(v["title"])}</title><desc id="desc">{html.escape(v["alt"])}</desc>',
            '<style>text{font-family:Figtree,Arial,sans-serif} .literal{direction:ltr;unicode-bidi:isolate}</style>',
            f'<rect width="1200" height="{height}" rx="28" fill="#F5F3FB"/>',
            '<text x="40" y="47" font-size="16" letter-spacing="2" fill="#6C3BEE" font-weight="700">GANESHA · DEMONSTRAÇÃO PREPARADA</text>']
        t,_=svg_text(40,96,v['title'],32,700,width=65);parts.append(t)
        t,_=svg_text(40,140,v['subtitle'],19,color='#625B70',width=100);parts.append(t)
        for j,p in enumerate(panels):
            x=40+(j%cols)*(cellw+20);y=190+(j//cols)*(cellh+20)
            parts += [f'<rect x="{x}" y="{y}" width="{cellw}" height="{cellh}" rx="18" fill="white" stroke="#DED8E9"/>',
                f'<circle cx="{x+32}" cy="{y+34}" r="14" fill="#EDE6FD"/>',f'<text x="{x+32}" y="{y+40}" text-anchor="middle" font-size="16" fill="#6C3BEE" font-weight="700">{j+1}</text>']
            t,_=svg_text(x+57,y+41,p['label'],18,700,width=int((cellw-78)/10));parts.append(t)
            yy=y+84
            for item in p['items']:
                if isinstance(item,str): item={'text':item}
                color={'good':'#246548','bad':'#923B25','accent':'#6C3BEE'}.get(item.get('tone'),'#17151F')
                t,hh=svg_text(x+24,yy,item['text'],20,600 if item.get('tone') else 400,color,width=int((cellw-50)/10.2),line=28)
                parts.append(t);yy+=hh+14
        t,_=svg_text(40,height-38,v['caption'],18,color='#625B70',width=105);parts.append(t)
        parts.append('</svg>')
        (ROOT/'assets'/f'{v["id"]}.svg').write_text('\n'.join(parts))
    (ROOT/'visuals.js').write_text('window.ASTRA_VISUALS = '+json.dumps(visuals,ensure_ascii=False,indent=2)+';\n')
    print(f'{len(visuals)} gráficos SVG e catálogo localizável gerados')

if __name__=='__main__':
    build_course();build_assets()
