import requests,json,pathlib,math,io,datetime
from PIL import Image
root=pathlib.Path(__file__).resolve().parents[1];base='https://api.inaturalist.org/v1/observations';params=dict(lat=19.35,lng=-99.2833333333,radius=5,taxon_id=3,quality_grade='research',d2='2026-10-03',locale='es',per_page=200,rank='species',geo=True)
def get(url,ps):
 r=requests.get(url,params=ps,timeout=45);r.raise_for_status();return r.json()
counts={}
for radius in [1,2,5]:
 j=get(base+'/species_counts',{**params,'radius':radius});counts[str(radius)]={'count':j['total_results'],'url':requests.Request('GET',base+'/species_counts',params={**params,'radius':radius}).prepare().url};print('COUNT',radius,j['total_results'],flush=True)
(root/'public/bibliography/radius-counts.json').write_text(json.dumps(counts,indent=2),encoding='utf-8')
j=get(base,{**params,'photos':True,'photo_license':'cc0,cc-by,cc-by-sa'});sounds=get(base,{**params,'sounds':True});
(root/'public/bibliography/local-sounds.json').write_text(json.dumps(sounds,ensure_ascii=False),encoding='utf-8')
print('sounds',sounds['total_results'],[(x['taxon']['name'],[(s.get('license_code'),s.get('file_url')) for s in x['sounds']]) for x in sounds['results'][:8]],flush=True)
selected=[];seen=set();media=json.loads((root/'public/bibliography/media.json').read_text(encoding='utf-8'))
for x in j['results']:
 t=x['taxon'];name=t['name']
 if name in seen or x.get('geoprivacy') or x.get('obscured') or t.get('rank')!='species':continue
 photo=next((p for p in x['photos'] if p.get('license_code') in ['cc0','cc-by','cc-by-sa']),None)
 if not photo:continue
 lat,lon=map(float,x['location'].split(','));d=6371*2*math.asin(math.sqrt(math.sin(math.radians(lat-19.35)/2)**2+math.cos(math.radians(lat))*math.cos(math.radians(19.35))*math.sin(math.radians(lon+99.2833333333)/2)**2))
 if d>5:continue
 id='local-'+str(x['id']);path='images/local/'+id+'.webp';dest=root/'public'/path;dest.parent.mkdir(parents=True,exist_ok=True)
 try:
  r=requests.get(photo['url'].replace('square','large'),timeout=30);r.raise_for_status();im=Image.open(io.BytesIO(r.content)).convert('RGB');im.thumbnail((1200,900));im.save(dest,'WEBP',quality=86)
 except Exception as e:print('photo failed',e,flush=True);continue
 source='https://www.inaturalist.org/observations/'+str(x['id']);media.append(dict(id=id,type='image',source=source,author=photo.get('attribution',''),license=photo['license_code'].upper(),attribution=photo.get('attribution','')+' · Convertida a WebP.',localPath=path,alt=t.get('preferred_common_name',name)+' · '+name))
 selected.append(dict(id=id,commonName=t.get('preferred_common_name',name),scientificName=name,radiusKm=next(r for r in [1,2,5] if d<=r),observedAt=x['observed_on'],latitude=lat,longitude=lon,photo=path,source='iNaturalist',sourceUrl=source,verified=True));seen.add(name)
 if len(selected)>=8:break
(root/'src/data/local-observations.json').write_text(json.dumps(selected,ensure_ascii=False,indent=2),encoding='utf-8')
(root/'public/bibliography/media.json').write_text(json.dumps(media,ensure_ascii=False,indent=2),encoding='utf-8');print('SELECTED',[(x['commonName'],x['radiusKm']) for x in selected],flush=True)
