import requests,json,pathlib,io
from PIL import Image
root=pathlib.Path(__file__).resolve().parents[1];q=dict(lat=19.35,lng=-99.2833333333,radius=1,taxon_id=3,quality_grade='research',d2='2026-10-03',locale='es',per_page=100,photo_license='cc0,cc-by,cc-by-sa',photos='true',rank='species')
r=requests.get('https://api.inaturalist.org/v1/observations',params=q,timeout=30);r.raise_for_status();j=r.json();obs=json.loads((root/'src/data/local-observations.json').read_text(encoding='utf-8'));names={o['scientificName'] for o in obs}
for x in j['results']:
 if x.get('obscured') or x.get('geoprivacy'):continue
 photo=next((p for p in x['photos'] if p.get('license_code') in ['cc0','cc-by','cc-by-sa']),None)
 if not photo:continue
 r=requests.get(photo['url'].replace('square','large'),timeout=30);r.raise_for_status();im=Image.open(io.BytesIO(r.content)).convert('RGB');im.thumbnail((1200,900));id='local-'+str(x['id']);local='images/local/'+id+'.webp';im.save(root/'public'/local,'WEBP',quality=86);lat,lon=map(float,x['location'].split(','));url='https://www.inaturalist.org/observations/'+str(x['id']);o=dict(id=id,commonName=x['taxon'].get('preferred_common_name',x['taxon']['name']),scientificName=x['taxon']['name'],radiusKm=1,observedAt=x['observed_on'],latitude=lat,longitude=lon,photo=local,source='iNaturalist',sourceUrl=url,verified=True);match=next((i for i,v in enumerate(obs) if v['scientificName']==o['scientificName']),len(obs)-1);obs[match]=o
 (root/'src/data/local-observations.json').write_text(json.dumps(obs,ensure_ascii=False,indent=2),encoding='utf-8');mp=root/'public/bibliography/media.json';m=json.loads(mp.read_text(encoding='utf-8'));m.append(dict(id=id,type='image',source=url,author=photo['attribution'],license=photo['license_code'].upper(),attribution=photo['attribution']+' · Convertida a WebP.',localPath=local,alt=o['commonName']));mp.write_text(json.dumps(m,ensure_ascii=False,indent=2),encoding='utf-8');print(o);break
