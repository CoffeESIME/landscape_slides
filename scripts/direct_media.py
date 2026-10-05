import requests,hashlib,urllib.parse,pathlib,io,json,subprocess,sys
from PIL import Image
sys.stdout.reconfigure(encoding='utf-8');root=pathlib.Path(__file__).resolve().parents[1];mp=root/'public/bibliography/media.json';items=json.loads(mp.read_text(encoding='utf-8'))
targets=[('storm','Landscape with stormy clouds and a pirogue on the Mekong at golden hour in Si Phan Don.jpg','Basile Morin','CC BY-SA 4.0','Nubes de tormenta sobre el río Mekong en Si Phan Don, Laos.'),('bird-song','Erithacus rubecula.ogg','Vladimir Yu. Arkhipov','CC BY-SA 3.0','Canto de petirrojo europeo, grabado en Tver, Rusia, el 2 de mayo de 2011.')]
for name,title,author,lic,alt in targets:
 try:
  filename=title.replace(' ','_');digest=hashlib.md5(filename.encode()).hexdigest();enc=urllib.parse.quote(filename);audio=name=='bird-song'
  path=f'{digest[0]}/{digest[:2]}/{enc}';u=f'https://upload.wikimedia.org/wikipedia/commons/{path}' if audio else f'https://upload.wikimedia.org/wikipedia/commons/thumb/{path}/1280px-{enc}'
  r=requests.get(u,timeout=45);print(name,r.status_code,flush=True);r.raise_for_status();local='audio/birds/robin.mp3' if audio else 'images/storm/storm.webp';p=root/'public'/local;p.parent.mkdir(parents=True,exist_ok=True)
  if audio:
   q=p.with_suffix('.ogg');q.write_bytes(r.content);subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-i',str(q),'-c:a','libmp3lame','-b:a','128k',str(p)],check=True)
  else:Image.open(io.BytesIO(r.content)).convert('RGB').save(p,'WEBP',quality=86)
  items=[e for e in items if e['id']!=name];items.append({'id':name,'type':'audio' if audio else 'image','source':'https://commons.wikimedia.org/wiki/File:'+enc,'author':author,'license':lic,'attribution':title,'localPath':local,'alt':alt});mp.write_text(json.dumps(items,ensure_ascii=False,indent=2),encoding='utf-8')
 except Exception as e:print(str(e)[:160])
