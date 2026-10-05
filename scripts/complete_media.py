import requests,pathlib,json,re,sys,io
from PIL import Image
sys.stdout.reconfigure(encoding='utf-8')
root=pathlib.Path(__file__).resolve().parents[1]; mpath=root/'public/bibliography/media.json'; entries=json.loads(mpath.read_text(encoding='utf-8'))
s=requests.Session();s.headers['User-Agent']='AprenderAMirar/1.0 educational'
targets={'forest':'File:Forest-ray-of-sunshine-sunbeams (23957956609).jpg','memory':'File:Two hikers ascending a stone-stepped forest path.jpg','niyamgiri':'File:Niyamgiri rice.jpg','wirikuta':'File:Milpa (Wirikuta, San Luis Potosí).jpg','bird-song':'File:Erithacus rubecula - European Robin XC509375.mp3'}
for key,query in {'storm':'lightning storm landscape filetype:bitmap -painting -artwork -radar -map','water':'forest river photograph filetype:bitmap -painting -artwork'}.items():
 d=s.get('https://commons.wikimedia.org/w/api.php',params={'action':'query','list':'search','srsearch':query,'srnamespace':6,'srlimit':4,'format':'json'},timeout=30).json()
 hits=d.get('query',{}).get('search',[])
 if hits: targets[key]=hits[0]['title']
for name,title in targets.items():
 try:
  d=s.get('https://commons.wikimedia.org/w/api.php',params={'action':'query','titles':title,'prop':'imageinfo','iiprop':'url|extmetadata','iiurlwidth':1920,'format':'json'},timeout=40).json()
  info=next(iter(d['query']['pages'].values()))['imageinfo'][0]; meta=info['extmetadata']; audio=name=='bird-song'
  url=info['url'] if audio else info.get('thumburl',info['url']); r=s.get(url,timeout=50);r.raise_for_status()
  local='audio/birds/robin.mp3' if audio else f'images/{name}/{name}.webp'; p=root/'public'/local;p.parent.mkdir(parents=True,exist_ok=True)
  if audio:p.write_bytes(r.content)
  else:
   im=Image.open(io.BytesIO(r.content)).convert('RGB');im.thumbnail((1920,1280));im.save(p,'WEBP',quality=85)
  clean=lambda key:re.sub('<[^>]+>','',meta.get(key,{}).get('value','')).strip()
  entries=[e for e in entries if e['id']!=name];entries.append({'id':name,'type':'audio' if audio else 'image','source':info['descriptionurl'],'author':clean('Artist'),'license':clean('LicenseShortName'),'attribution':title,'localPath':local,'alt':clean('ImageDescription')[:350] or title})
  print(name,title,flush=True)
  mpath.write_text(json.dumps(entries,ensure_ascii=False,indent=2),encoding='utf-8')
 except Exception as e:print('ERROR',name,str(e)[:160],flush=True)
