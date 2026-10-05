import requests, pathlib, json, re, time
ROOT = pathlib.Path(__file__).resolve().parents[1]
S = requests.Session(); S.headers['User-Agent']='AprenderAMirar/1.0 (educational landscape presentation)'
queries = {
 'opening': 'mountain lake reflection forest landscape',
 'forest': 'forest path sunlight', 'water': 'river forest landscape',
 'mountain': 'Dolomites mountain landscape', 'storm': 'thunderstorm sea',
 'office': 'office interior empty', 'park': 'urban park trees',
 'infrastructure': 'open pit mine aerial', 'memory': 'ancient stone path forest',
 'bird': 'Erithacus rubecula branch', 'wirikuta': 'Wirikuta landscape',
 'niyamgiri': 'Niyamgiri hills', 'takayna': 'Tarkine forest', 'kahoolawe': 'Kahoolawe island'
}
def clean(s): return re.sub('<[^>]+>', '', s or '').strip()
manifest=[]
for name, q in queries.items():
 try:
  data=S.get('https://commons.wikimedia.org/w/api.php',params={'action':'query','generator':'search','gsrsearch':q+' filetype:bitmap','gsrnamespace':6,'gsrlimit':5,'prop':'imageinfo','iiprop':'url|extmetadata','iiurlwidth':1920,'format':'json'},timeout=40).json()
  pages=list(data.get('query',{}).get('pages',{}).values())
  done=False
  for p in pages:
   info=p.get('imageinfo',[{}])[0]; m=info.get('extmetadata',{})
   url=info.get('thumburl',info.get('url'))
   if not url: continue
   r=S.get(url,timeout=50)
   if r.status_code!=200: continue
   from PIL import Image
   import io
   im=Image.open(io.BytesIO(r.content)).convert('RGB')
   if im.width < im.height and name not in ['bird']: continue
   im.thumbnail((1920,1280))
   path=ROOT/'public'/'images'/name/(name+'.webp'); path.parent.mkdir(parents=True,exist_ok=True); im.save(path,'WEBP',quality=85)
   manifest.append({'id':name,'type':'image','source':info.get('descriptionurl'),'author':clean(m.get('Artist',{}).get('value','Autor por verificar')),'license':clean(m.get('LicenseShortName',{}).get('value','Ver ficha original')),'attribution':p['title'],'localPath':'images/'+name+'/'+name+'.webp','alt':clean(m.get('ImageDescription',{}).get('value',q))[:350]})
   print(name, p['title'], flush=True); done=True; break
  if not done: print('MISSING',name,flush=True)
 except Exception as e: print('ERROR',name,str(e)[:180],flush=True)
 (ROOT/'public'/'bibliography').mkdir(parents=True,exist_ok=True)
 (ROOT/'public'/'bibliography'/'media.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
 time.sleep(.3)
