from pathlib import Path
import json
p=Path('package.json');d=json.loads(p.read_text());d['scripts']['build']='tsc -b && vite build && node scripts/build-offline.mjs';p.write_text(json.dumps(d,indent=2)+'\n')
p=Path('src/App.tsx');s=p.read_text(encoding='utf-8').replace('Plein écran non disponible','No se pudo activar la pantalla completa. Abre la presentación en una ventana del navegador.').replace("'Présentation disponible hors connexion'.replace('Présentation disponible hors connexion','Pronta para usar sin conexión')","'Lista para usar sin conexión'").replace("'Photographie à remplacer'.replace('Photographie à remplacer','Fotografía pendiente de incorporar')","'Fotografía pendiente de incorporar'")
s=s.replace('if(panel||place)return;',"if(e.key.toLowerCase()==='p'&&panel==='notes'){setPanel(null);return;}\n  if(panel||place)return;")
p.write_text(s,encoding='utf-8')
p=Path('src/styles/main.css');s=p.read_text().replace("font-weight:200 800","font-weight:400").replace("url('/fonts/","url('../../public/fonts/");p.write_text(s)
p=Path('src/components/SceneView.tsx');s=p.read_text(encoding='utf-8').replace('className="world-map" viewBox="0 0 1000 500"','className="world-map" preserveAspectRatio="none" viewBox="0 0 1000 500"');p.write_text(s,encoding='utf-8')
