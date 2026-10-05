import requests,json,pathlib
r=requests.get('https://upload.wikimedia.org/wikipedia/commons/4/46/KailashNorth.jpg');print(r.text[:200])
j=json.loads(pathlib.Path('public/bibliography/local-sounds.json').read_text(encoding='utf-8'))
for x in j['results']:
 for s in x['sounds']:
  if s.get('license_code') in ['cc-by','cc-by-sa','cc0']:print(x['id'],x['taxon']['name'],s)
