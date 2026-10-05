import requests,json,pathlib,io,re,time
from PIL import Image
s=requests.Session();s.headers['User-Agent']='EntreConcretoPresentation/1.0 (educational presentation; credits preserved)'
root=pathlib.Path(__file__).resolve().parents[1];mp=root/'public/bibliography/media.json';m=json.loads(mp.read_text(encoding='utf-8'))
files=[('city-people','Couple in Chapultepec Park - Mexico City - Mexico (27193719509).jpg'),('city-walk','Gente corriendo, El Sope.jpg')]
for id,title in files:
 try:
  r=s.get('https://commons.wikimedia.org/w/api.php',params=dict(action='query',titles='File:'+title,prop='imageinfo',iiprop='url|extmetadata',iiurlwidth=1280,format='json'),timeout=25);r.raise_for_status();j=r.json();info=next(iter(j['query']['pages'].values()))['imageinfo'][0];meta=info['extmetadata'];clean=lambda k:re.sub('<[^>]+>','',meta.get(k,{}).get('value','')).strip();print(id,info.get('thumburl'),clean('LicenseShortName'),flush=True)
  u=info.get('thumburl',info['url'])+'?utm_campaign=index&utm_content=original&utm_source=commons.wikimedia.org';r=s.get(u,timeout=30);r.raise_for_status();im=Image.open(io.BytesIO(r.content)).convert('RGB');im.thumbnail((1600,1100));local='images/'+id+'/'+id+'.webp';p=root/'public'/local;p.parent.mkdir(parents=True,exist_ok=True);im.save(p,'WEBP',quality=85);m=[x for x in m if x['id']!=id];m.append(dict(id=id,type='image',source=info['descriptionurl'],author=clean('Artist'),license=clean('LicenseShortName'),attribution=title+' · Convertida a WebP; encuadre.',localPath=local,alt=clean('ImageDescription')[:250]));mp.write_text(json.dumps(m,ensure_ascii=False,indent=2),encoding='utf-8')
 except Exception as e:print('FAILED',id,str(e)[:150],flush=True)
