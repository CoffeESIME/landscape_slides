import requests
u='https://api.inaturalist.org/v1/observations?lat=19.35&lng=-99.283333&radius=5&taxon_id=3&quality_grade=research&per_page=100&photos=true'
r=requests.get(u,timeout=40);print(r.status_code)
if r.ok:
 from pathlib import Path
 Path('public/bibliography/local-observations.json').write_text(r.text,encoding='utf-8')
 print('saved',len(r.content))
