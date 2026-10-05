import requests
for u in ['https://upload.wikimedia.org/wikipedia/commons/4/46/KailashNorth.jpg?download=1','https://upload.wikimedia.org/wikipedia/commons/4/46/KailashNorth.jpg?x=20261004','https://thumb.wikimedia.org/wikipedia/commons/thumb/4/46/KailashNorth.jpg/1280px-KailashNorth.jpg']:
 try:
  r=requests.get(u,timeout=12);print(r.status_code,len(r.content),u,flush=True)
  if r.ok:
   from pathlib import Path
   Path('public/images/kailash').mkdir(exist_ok=True);Path('public/images/kailash/download.jpg').write_bytes(r.content);break
 except Exception as e:print(e)
