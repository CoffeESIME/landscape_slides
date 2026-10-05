import requests,re,pathlib,json,io,subprocess,sys,html
from PIL import Image
from fontTools.ttLib import TTFont
sys.stdout.reconfigure(encoding='utf-8');root=pathlib.Path(__file__).resolve().parents[1];s=requests.Session()
css=s.get('https://fonts.googleapis.com/css2?family=Manrope:wght@400&display=swap',timeout=30).text
u=re.search(r'url\(([^)]+)\)',css)
if u:
 f=TTFont(io.BytesIO(s.get(u[1],timeout=30).content));f.flavor='woff2';f.save(str(root/'public/fonts/Manrope.woff2'))
for name,repo in [('CormorantGaramond','cormorantgaramond'),('Manrope','manrope')]:
 r=s.get(f'https://raw.githubusercontent.com/google/fonts/main/ofl/{repo}/OFL.txt',timeout=30)
 if r.ok:(root/'public/fonts'/(name+'-OFL.txt')).write_text(r.text,encoding='utf-8')
mp=root/'public/bibliography/media.json';items=json.loads(mp.read_text(encoding='utf-8'))
targets=[('storm','https://commons.wikimedia.org/wiki/File:Landscape_with_stormy_clouds_and_a_pirogue_on_the_Mekong_at_golden_hour_in_Si_Phan_Don.jpg','Basile Morin','CC BY-SA 4.0','Nubes de tormenta sobre el río Mekong, en Si Phan Don, Laos.'),('bird-song','https://commons.wikimedia.org/wiki/File:Erithacus_rubecula.ogg','Vladimir Yu. Arkhipov','CC BY-SA 3.0','Canto del petirrojo europeo; región de Tver, Rusia, 2 de mayo de 2011.')]
for name,page,author,license,alt in targets:
 try:
  h=s.get(page,timeout=40).text
  links=re.findall(r'href="(https://(?:upload|thumb)\.wikimedia\.org/[^"]+)"',h)
  audio=name=='bird-song'; candidates=[u for u in links if (u.endswith('.ogg') and '/transcoded/' not in u) if audio] if audio else [u for u in links if '/1280px-' in u]
  if not candidates:candidates=[u for u in links if '/thumb/' not in u]
  if not candidates:raise Exception('No original link found')
  url=html.unescape(candidates[0]);print('GET',url,flush=True);r=s.get(url,timeout=60);r.raise_for_status()
  local='audio/birds/robin.mp3' if audio else 'images/storm/storm.webp';p=root/'public'/local;p.parent.mkdir(parents=True,exist_ok=True)
  if audio:
   ogg=p.with_suffix('.ogg');ogg.write_bytes(r.content);subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-i',str(ogg),'-c:a','libmp3lame','-b:a','128k',str(p)],check=True)
  else:
   im=Image.open(io.BytesIO(r.content)).convert('RGB');im.thumbnail((1920,1280));im.save(p,'WEBP',quality=86)
  items=[e for e in items if e['id']!=name];items.append({'id':name,'type':'audio' if audio else 'image','source':page,'author':author,'license':license,'attribution':page.split('File:')[-1].replace('_',' '),'localPath':local,'alt':alt});mp.write_text(json.dumps(items,ensure_ascii=False,indent=2),encoding='utf-8');print('OK',name)
 except Exception as e:print('FAILED',name,str(e)[:200])
