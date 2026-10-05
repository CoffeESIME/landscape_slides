import requests,json
s=requests.Session();s.headers['User-Agent']='EntreConcretoPresentation/1.0 (educational presentation)'
r=s.get('https://commons.wikimedia.org/w/api.php',params=dict(action='query',list='search',srsearch='Cliffs of Moher filetype:bitmap',srnamespace=6,srlimit=3,format='json'));print([x['title'] for x in r.json()['query']['search']])
