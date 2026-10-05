import requests, sys, json
sys.stdout.reconfigure(encoding='utf-8')
s=requests.Session();s.headers['User-Agent']='AprenderAMirar/1.0 educational'
for q in ['mountain lake mist landscape -painting -artwork','forest sunbeams photograph','thunderstorm lightning ocean -painting -artwork','Niyamgiri','Wirikuta','forest stone hiking path','Erithacus rubecula song filetype:audio']:
 try:
  d=s.get('https://commons.wikimedia.org/w/api.php',params={'action':'query','list':'search','srsearch':q,'srnamespace':6,'srlimit':6,'format':'json'},timeout=35).json()
  print(q, '\n', '\n'.join(x['title'] for x in d.get('query',{}).get('search',[])),flush=True)
 except Exception as e: print(e)
