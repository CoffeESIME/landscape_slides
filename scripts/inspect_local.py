import json, pathlib, collections, math
j=json.loads(pathlib.Path('public/bibliography/local-observations.json').read_text(encoding='utf-8'))
print('total',j['total_results'])
s={}
for x in j['results']:
 t=x['taxon']; s.setdefault(t['name'],(t.get('preferred_common_name'),x['id'],x.get('location'),len(x['sounds']),x['photos'][0].get('license_code') if x['photos'] else None))
print(json.dumps(s,ensure_ascii=False,indent=2))
