import requests, re, json, pathlib, io, html
from PIL import Image
from bs4 import BeautifulSoup
root=pathlib.Path(__file__).resolve().parents[1]
targets={'kailash':'KailashNorth.jpg','izta':'Iztaccíhuatl vista desde la CDMX.jpg','estrella':'Vista aérea del Cerro de la Estrella 04.jpg','flower':'2009-03-20 Flowers in a crack.jpg'}
p=root/'public/bibliography/media.json'; items=json.loads(p.read_text(encoding='utf-8'))
for id,file in targets.items():
 try:
  url='https://commons.wikimedia.org/wiki/File:'+file.replace(' ','_')
  r=requests.get(url,timeout=35);r.raise_for_status();s=BeautifulSoup(r.text,'html.parser')
  a=s.select_one('.fullImageLink a');link=a['href'];link='https:'+link if link.startswith('//') else link
  license=s.select_one('.licensetpl_short'); author=s.select_one('#fileinfotpl_aut')
  author=author.find_next_sibling().get_text(' ',strip=True) if author else ''
  lic=license.get_text(' ',strip=True) if license else ''
  if not lic or not author:raise Exception('Metadata incomplete '+lic+' '+author)
  raw=requests.get(link,timeout=55);raw.raise_for_status();im=Image.open(io.BytesIO(raw.content)).convert('RGB');im.thumbnail((2000,1400))
  path='images/'+id+'/'+id+'.webp';dest=root/'public'/path;dest.parent.mkdir(parents=True,exist_ok=True);im.save(dest,'WEBP',quality=88)
  items=[x for x in items if x['id']!=id];items.append(dict(id=id,type='image',source=url,author=author,license=lic,attribution=file+' · Redimensionada y convertida a WebP; encuadre de pantalla.',localPath=path,alt={'kailash':'Montaña de roca y nieve.','izta':'Perfil de Iztaccíhuatl visto desde la Ciudad de México.','estrella':'Cerro de la Estrella y ciudad, Iztapalapa, Ciudad de México.','flower':'Flores en una grieta del pavimento, Durham, Estados Unidos. Imagen ilustrativa, no registro del campus.'}[id]))
  p.write_text(json.dumps(items,ensure_ascii=False,indent=2),encoding='utf-8');print('OK',id,author,lic,flush=True)
 except Exception as e:print('FAILED',id,str(e),flush=True)
