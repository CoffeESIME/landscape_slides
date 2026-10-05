import requests,pathlib,json,re,sys,io
from PIL import Image
from fontTools.ttLib import TTFont
sys.stdout.reconfigure(encoding='utf-8');root=pathlib.Path(__file__).resolve().parents[1]
s=requests.Session()
for family,name in [('Cormorant+Garamond:ital,wght@0,400;1,400','Cormorant'),('Manrope:wght@200..800','Manrope')]:
 css=s.get('https://fonts.googleapis.com/css2?family='+family+'&display=swap',timeout=30).text
 for b in css.split('@font-face'):
  u=re.search(r'url\(([^)]+)\)',b)
  if not u:continue
  fn=('CormorantGaramond-Italic' if 'font-style: italic' in b else 'CormorantGaramond-Regular') if name=='Cormorant' else 'Manrope'
  r=s.get(u[1],timeout=30);r.raise_for_status();f=TTFont(io.BytesIO(r.content));f.flavor='woff2';p=root/'public/fonts'/(fn+'.woff2');p.parent.mkdir(parents=True,exist_ok=True);f.save(str(p));print('font',fn)
mp=root/'public/bibliography/media.json';items=json.loads(mp.read_text(encoding='utf-8'))
targets={'storm':'File:Landscape with stormy clouds and a pirogue on the Mekong at golden hour in Si Phan Don.jpg','water':'File:Beech Forest (AU), Great Otway National Park, Beauchamp Falls -- 2019 -- 1271.jpg','bird-song':'File:Erithacus rubecula - European Robin XC441752.mp3'}
for name,title in targets.items():
 try:
  d=s.get('https://commons.wikimedia.org/w/api.php',params={'action':'query','titles':title,'prop':'imageinfo','iiprop':'url|extmetadata','iiurlwidth':1280,'format':'json'},timeout=40).json();i=next(iter(d['query']['pages'].values()))['imageinfo'][0];m=i['extmetadata'];audio=name=='bird-song';url=i['url'] if audio else i.get('thumburl',i['url'])
  if not audio:url=url.replace('upload.wikimedia.org','thumb.wikimedia.org')
  print('GET',url,flush=True);r=s.get(url,timeout=45);r.raise_for_status();local='audio/birds/robin.mp3' if audio else f'images/{name}/{name}.webp';p=root/'public'/local;p.parent.mkdir(parents=True,exist_ok=True)
  if audio:p.write_bytes(r.content)
  else:
   im=Image.open(io.BytesIO(r.content)).convert('RGB');im.thumbnail((1920,1280));im.save(p,'WEBP',quality=86)
  clean=lambda k:re.sub('<[^>]+>','',m.get(k,{}).get('value','')).strip();items=[e for e in items if e['id']!=name];items.append({'id':name,'type':'audio' if audio else 'image','source':i['descriptionurl'],'author':clean('Artist'),'license':clean('LicenseShortName'),'attribution':title,'localPath':local,'alt':clean('ImageDescription')[:350] or title});mp.write_text(json.dumps(items,ensure_ascii=False,indent=2),encoding='utf-8');print('OK',name)
 except Exception as e:print('FAILED',name,str(e)[:200])
