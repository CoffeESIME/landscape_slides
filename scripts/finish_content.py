from pathlib import Path
import json
p=Path('src/data/presentation.ts');s=p.read_text(encoding='utf-8').replace("{text:'agua',image:'water'}","{text:'agua',image:'opening'}").replace("{image:'storm',audio:'storm',text:'¿Esto también es naturaleza?'}","{image:'forest',audio:'storm',text:'¿Esto también es naturaleza?'}")
s=s.replace('antes de revelar la imagen.','antes de revelar el bosque oscuro. La tormenta incluida es un ambiente sintetizado de demostración.')
p.write_text(s,encoding='utf-8')
p=Path('src/components/SceneView.tsx');s=p.read_text(encoding='utf-8').replace('x:22.5,y:36.8','x:21.5,y:42.4').replace('x:73.2,y:39.3','x:73.2,y:45').replace('x:90.2,y:72.8','x:92.6,y:84.4').replace('x:13.1,y:38.7','x:13.1,y:40.5')
s=s.replace("step===2?'Grabación de campo · créditos en fuente'","step===2?(audioManifest.bird.path?'Grabación de campo · créditos en fuente':'[CANTO DE PETIRROJO PENDIENTE DE INCORPORAR]')")
p.write_text(s,encoding='utf-8')
p=Path('src/App.tsx');s=p.read_text(encoding='utf-8').replace('el canto del petirrojo es una grabación acreditada.','el canto del petirrojo está pendiente de incorporar con su acreditación.')
p.write_text(s,encoding='utf-8')
p=Path('public/bibliography/media.json');items=json.loads(p.read_text(encoding='utf-8'));items=[i for i in items if i['id'] not in ['storm','water']]
alts={'opening':'Montaña y bosque reflejados en las aguas de Glencoe Lochan, Escocia.','forest':'Rayos de sol atraviesan las copas de un bosque.','mountain':'Cabaña en una ladera nevada ante las cumbres de las Dolomitas.','office':'Sala Roosevelt de la Casa Blanca: mesa de reuniones en un interior cerrado.','park':'Árboles junto a un sendero del Vondelpark, en Ámsterdam.','infrastructure':'Vista aérea de una mina a cielo abierto y el territorio circundante en Mongolia Interior.','memory':'Dos personas ascienden por un sendero de piedra cubierto de hojas en el bosque.','bird':'Petirrojo europeo de pecho anaranjado sobre una rama, en invierno.','wirikuta':'Milpa en el paisaje de Wirikuta, San Luis Potosí, México.','takayna':'Vegetación y sombra profunda en el bosque de takayna, Tasmania.','kahoolawe':'Fotografía aérea histórica de la costa de Kahoʻolawe, Hawái.'}
for i in items:
 i['alt']=alts.get(i['id'],i['alt'])
 if i['id']=='mountain':i['author']='Wolfgang Moroder'
 if i['id']=='kahoolawe':i['author']='Autor no identificado; archivo NARA'
 i['licenseUrl']={'CC BY-SA 3.0':'https://creativecommons.org/licenses/by-sa/3.0/','CC BY-SA 2.0':'https://creativecommons.org/licenses/by-sa/2.0/','CC BY-SA 4.0':'https://creativecommons.org/licenses/by-sa/4.0/','CC BY 2.0':'https://creativecommons.org/licenses/by/2.0/','CC0':'https://creativecommons.org/publicdomain/zero/1.0/','Public domain':'https://creativecommons.org/publicdomain/mark/1.0/'}.get(i['license'],'')
 i['modifications']='Redimensionado y convertido a WebP; el encuadre y el color pueden modificarse en pantalla.'
p.write_text(json.dumps(items,ensure_ascii=False,indent=2),encoding='utf-8')
for path in ['public/images/storm/storm.webp','public/images/water/water.webp']:
 p=Path(path)
 if p.exists():p.unlink()
