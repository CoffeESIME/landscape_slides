import requests,pathlib,json,re,sys,io
from PIL import Image
sys.stdout.reconfigure(encoding='utf-8')
root=pathlib.Path(__file__).resolve().parents[1]; mp=root/'public/bibliography/media.json'; items=json.loads(mp.read_text(encoding='utf-8'))
s=requests.Session();s.headers['User-Agent']='Mozilla/5.0'
for family,name in [('Cormorant+Garamond:ital,wght@0,400;1,400','Cormorant'),('Manrope:wght@200..800','Manrope')]:
 css=s.get('https://fonts.googleapis.com/css2?family='+family+'&display=swap',headers={'User-Agent':'Mozilla/5.0'},timeout=30).text
 blocks=css.split('@font-face')
 for b in blocks:
  if 'U+0000-00FF' not in b:continue
  u=re.search(r'url\(([^)]+)\)',b)
  if not u:continue
  fn=('CormorantGaramond-Italic' if 'font-style: italic' in b else 'CormorantGaramond-Regular') if name=='Cormorant' else 'Manrope'
  p=root/'public/fonts'/(fn+'.woff2');p.parent.mkdir(parents=True,exist_ok=True);r=s.get(u[1],timeout=30);r.raise_for_status();p.write_bytes(r.content);print('font',fn)
targets={'niyamgiri':'File:Niyamgiri rice.jpg','bird-song':'File:Erithacus rubecula - European Robin XC542842.mp3'}
for name,q in [('storm','thunderstorm landscape filetype:bitmap'),('water','waterfall forest stream filetype:bitmap')]:
 try:
  d=s.get('https://commons.wikimedia.org/w/api.php',params={'action':'query','list':'search','srsearch':q,'srnamespace':6,'srlimit':5,'format':'json'},timeout=30).json()
  hits=d.get('query',{}).get('search',[]); print(name,[h['title'] for h in hits]);
  if hits:targets[name]=hits[0]['title']
 except Exception as e:print(e)
for name,title in targets.items():
 try:
  d=s.get('https://commons.wikimedia.org/w/api.php',params={'action':'query','titles':title,'prop':'imageinfo','iiprop':'url|extmetadata','iiurlwidth':1280,'format':'json'},timeout=40).json();i=next(iter(d['query']['pages'].values()))['imageinfo'][0];m=i['extmetadata'];audio=name=='bird-song'
  url=i['url'] if audio else i.get('thumburl',i['url']);r=s.get(url,timeout=45);r.raise_for_status()
  local='audio/birds/robin.mp3' if audio else f'images/{name}/{name}.webp';p=root/'public'/local;p.parent.mkdir(parents=True,exist_ok=True)
  if audio:p.write_bytes(r.content)
  else:
   im=Image.open(io.BytesIO(r.content)).convert('RGB');im.thumbnail((1920,1280));im.save(p,'WEBP',quality=86)
  clean=lambda k:re.sub('<[^>]+>','',m.get(k,{}).get('value','')).strip()
  items=[e for e in items if e['id']!=name];items.append({'id':name,'type':'audio' if audio else 'image','source':i['descriptionurl'],'author':clean('Artist'),'license':clean('LicenseShortName'),'attribution':title,'localPath':local,'alt':clean('ImageDescription')[:350] or title});mp.write_text(json.dumps(items,ensure_ascii=False,indent=2),encoding='utf-8');print('OK',name)
 except Exception as e:print('FAILED',name,str(e)[:200])
