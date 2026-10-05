import requests,json,pathlib
p=dict(lat=19.35,lng=-99.2833333333,radius=5,taxon_id=3,quality_grade='research',d2='2026-10-03',locale='es',per_page=100,sounds='true')
r=requests.get('https://api.inaturalist.org/v1/observations',params=p,timeout=40);r.raise_for_status();j=r.json();pathlib.Path('public/bibliography/local-sounds.json').write_text(json.dumps(j,ensure_ascii=False),encoding='utf-8');print(j['total_results']);print([(x['id'],x['taxon']['name'],[(s.get('license_code'),s.get('file_url')) for s in x['sounds']]) for x in j['results'][:15]])
