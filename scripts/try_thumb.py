import requests
u='https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/KailashNorth.jpg/1280px-KailashNorth.jpg'
r=requests.get(u,timeout=20);print(r.status_code,len(r.content))
if r.ok:
 from pathlib import Path
 Path('public/images/kailash').mkdir(exist_ok=True)
 Path('public/images/kailash/download.jpg').write_bytes(r.content)
