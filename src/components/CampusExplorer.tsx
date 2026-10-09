import { useState } from 'react';
import campus from '../data/campus-explorer.json';
import { asset } from '../data/mediaManifest';

/** Real captures of aves_zona, bundled with the matching records for offline projection. */
export default function CampusExplorer() {
 const [radius,setRadius]=useState(1);
 const [view,setView]=useState<'map'|'records'>('map');
 const snapshot=campus.snapshots.find(s=>s.radiusKm===radius)!;
 return <section className="campus-explorer">
  <div className="campus-heading"><div><p className="eyebrow">{campus.title} · {campus.source}</p><h2>{snapshot.count} especies registradas <span>a {radius} km</span></h2></div>
   <nav aria-label="Radio alrededor del campus">{campus.snapshots.map(s=><button key={s.radiusKm} aria-pressed={radius===s.radiusKm} onClick={()=>setRadius(s.radiusKm)}>{s.radiusKm} km</button>)}</nav>
  </div>
  <div className="campus-view-switch" aria-label="Vista de biodiversidad"><button aria-pressed={view==='map'} onClick={()=>setView('map')}>Mapa de la app</button><button aria-pressed={view==='records'} onClick={()=>setView('records')}>Especies y distancias</button></div>
  {view==='map'?<figure className="campus-capture"><img key={radius} src={asset(snapshot.image)} alt={`Captura real de Islas Vivas: ${snapshot.count} especies de aves a ${radius} km de UAM Cuajimalpa; iNaturalist, grado de investigación.`}/></figure>:
   <div className="campus-records"><p className="credit">Selección de registros de la app · distancia en línea recta al campus</p><table><thead><tr><th>Especie</th><th>Distancia</th><th>Observación</th></tr></thead><tbody>{snapshot.species.map(s=><tr key={s.scientificName}><td>{s.commonName}<em>{s.scientificName}</em></td><td>{s.distanceKm<1?`${Math.round(s.distanceKm*1000)} m`:`${s.distanceKm.toFixed(2)} km`}</td><td><a href={s.sourceUrl} target="_blank" rel="noreferrer">{s.observedAt} ↗</a></td></tr>)}</tbody></table>{snapshot.truncated&&<p className="credit">Selección entre {snapshot.returned} registros cargados; consulta limitada por la app.</p>}</div>}
  <footer><p>Captura real · 8 oct 2026 · registros históricos; no censo ni presencia actual.<br/>Esfuerzo de muestreo desigual · precisión variable.<br/><span>© OpenStreetMap · OpenFreeMap · datos iNaturalist</span></p><a href={snapshot.url} target="_blank" rel="noreferrer">Abrir explorador completo ↗</a></footer>
 </section>;
}
