import requests,json,pathlib,hashlib,io
from urllib.parse import quote
from PIL import Image
root=pathlib.Path(__file__).resolve().parents[1];p=root/'public/bibliography/media.json';items=json.loads(p.read_text(encoding='utf-8'))
for id,file,author,alt in [('kailash','KailashNorth.jpg','Jean-Marie Hullot','Montaña de roca y nieve.'),('izta','Iztaccíhuatl vista desde la CDMX.jpg','JUANCHISPENCER98','Perfil de Iztaccíhuatl desde la Ciudad de México.'),('estrella','Vista aérea del Cerro de la Estrella 04.jpg','ProtoplasmaKid','Cerro de la Estrella y ciudad, Iztapalapa, Ciudad de México.'),('flower','2009-03-20 Flowers in a crack.jpg','Ildar Sagdejev (Specious)','Flores entre pavimento en Durham, Estados Unidos. Imagen ilustrativa, no del campus.')]:
 try:
  if id in ['kailash','izta']:continue
  f=file.replace(' ','_');h=hashlib.md5(f.encode()).hexdigest();url='https://upload.wikimedia.org/wikipedia/commons/'+h[0]+'/'+h[:2]+'/'+quote(f)
  r=requests.get(url.replace('/commons/','/commons/thumb/')+'/1280px-'+quote(f)+'?utm_campaign=index&utm_content=original&utm_source=commons.wikimedia.org',headers={'User-Agent':'EntreConcretoPresentation/1.0 (educational slide deck; Wikimedia Commons attribution)'},timeout=50);r.raise_for_status();im=Image.open(io.BytesIO(r.content)).convert('RGB');im.thumbnail((2000,1400));local='images/'+id+'/'+id+'.webp';dest=root/'public'/local;dest.parent.mkdir(parents=True,exist_ok=True);im.save(dest,'WEBP',quality=88)
  items=[x for x in items if x['id']!=id];items.append(dict(id=id,type='image',source='https://commons.wikimedia.org/wiki/File:'+quote(f),author=author,license='CC BY-SA 4.0',licenseUrl='https://creativecommons.org/licenses/by-sa/4.0/',attribution=file+' · Convertida a WebP; encuadre de pantalla.',localPath=local,alt=alt));p.write_text(json.dumps(items,ensure_ascii=False,indent=2),encoding='utf-8');print('OK',id,flush=True)
 except Exception as e:print('FAILED',id,str(e),flush=True)
