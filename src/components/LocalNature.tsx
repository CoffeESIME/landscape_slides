import { useEffect, useRef, useState } from 'react';
import { asset } from '../data/mediaManifest';
import type { Center, Radius, SpeciesObservation } from '../data/biodiversity';
import type { PlaceLayer } from '../data/places';
import { communityFlow, recordFields } from '../data/places';
import { birdNarrative, communityNarrative } from '../data/narrative';

export function BirdReveal({step,video,commonName,scientificName,enabled,volume}:{step:number;video:string;commonName:string;scientificName:string;enabled:boolean;volume:number}) {
 const ref=useRef<HTMLVideoElement>(null);
 const [playing,setPlaying]=useState(false);
 const [failed,setFailed]=useState(false);
 const phase=step<2?0:step<5?2:step;
 const start=()=>{const v=ref.current;if(!v)return;setFailed(false);v.play().catch(()=>setFailed(true));};
 const replay=()=>{const v=ref.current;if(!v)return;v.currentTime=0;start();};
 useEffect(()=>{const v=ref.current;if(!v)return;v.muted=!enabled;v.volume=volume;},[enabled,volume]);
 useEffect(()=>{const v=ref.current;if(!v)return;v.pause();v.currentTime=0;if(phase!==6&&(phase>=2||enabled))v.play().catch(()=>setFailed(true));return()=>v.pause();},[phase]);
 useEffect(()=>{const v=ref.current;if(v&&enabled&&phase===0)v.play().catch(()=>setFailed(true));},[enabled,phase]);
 return <div className={'bird-reveal reveal-'+step}>
  <video ref={ref} className={step<2?'bird-hidden':''} src={asset(video)} playsInline preload="auto" aria-label={step<2?'Audio del registro; imagen oculta':'Registro audiovisual propio de un colibrí'} onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)} onEnded={()=>setPlaying(false)} onError={()=>setFailed(true)}/>
  <div className="bird-reveal-copy">
   {step===1&&<h2>{birdNarrative.question}</h2>}
   {step>=3&&step<6&&<h2>{commonName}</h2>}
   {step>=4&&step<6&&<p className="latin"><em>{scientificName}</em></p>}
   {step===5&&<p className="bird-question">{birdNarrative.again}</p>}
   {step===6&&<h2>{birdNarrative.conclusion.join('\n')}</h2>}
   {step>=2&&step<6&&<div className="bird-media-controls"><button className="text-link" onClick={()=>playing?ref.current?.pause():start()}>{playing?'Pausar registro':'Reproducir registro'}</button><button className="text-link" onClick={replay}>{birdNarrative.replay}</button></div>}
   {step>=2&&step<6&&<p className="credit">{enabled?'Audio del mismo video':'Sin sonido · M para escuchar'}</p>}
   {failed&&<p role="status" className="media-warning">No se pudo reproducir el registro. Usa Reproducir para reintentar.</p>}
  </div>
 </div>;
}

export function BiodiversityRadiusMap({observations,center,radii,counts,period}:{observations:SpeciesObservation[];center:Center|null;radii:Radius[];counts?:Partial<Record<Radius,{count:number;url:string}>>;period:string}) {
 const [radius,setRadius]=useState<Radius>(radii[0]);
 const filtered=observations.filter(o=>o.verified&&o.sourceUrl&&o.radiusKm<=radius);
 const species=[...new Map(filtered.map(o=>[o.scientificName,o])).values()].slice(0,8);
 return <section className="radius-layout"><div className="radius-visual"><p className="eyebrow">ALREDEDOR DE AQUÍ</p><svg viewBox="0 0 440 440" role="img" aria-label="Radios concéntricos de uno, dos y cinco kilómetros; puntos de registros seleccionados">
  <path d="M220 15V425M15 220H425" className="map-axis"/>
  {[...radii].reverse().map(r=><g key={r}><circle cx="220" cy="220" r={r*38} className={radius===r?'selected-ring':'radius-ring'}/><text x="225" y={220-r*38+17}>{r} km</text></g>)}
  <circle cx="220" cy="220" r="4" className="map-dot"/>
  {center&&filtered.filter(o=>o.latitude!==undefined&&o.longitude!==undefined).map(o=><circle key={o.id} cx={220+(o.longitude!-center.longitude)*111.32*Math.cos(center.latitude*Math.PI/180)*38} cy={220-(o.latitude!-center.latitude)*111.32*38} r="4" className="map-dot"><title>{o.commonName} · {o.observedAt}</title></circle>)}
 </svg><p className="credit">{center?.name||'Centro por confirmar'}<br/>Esquema de distancias · norte arriba</p></div>
 <div className="radius-data"><div className="radius-options" aria-label="Elegir radio">{radii.map(r=><button key={r} aria-pressed={radius===r} onClick={()=>setRadius(r)}>{r} km</button>)}</div>
 <h2>{counts?.[radius]?<><b>{counts[radius]!.count}</b> especies registradas</>:species.length?<><b>{species.length}</b> especies en esta selección</>:'Registros por incorporar'}</h2>
 <p className="credit">{period}<br/>Registros históricos, no censo de presencia actual. Centro aproximado.</p>
 {counts?.[radius]&&<a className="credit" href={counts[radius]!.url} target="_blank" rel="noreferrer">Consulta y metodología ↗</a>}
 {species.length>0&&<p className="credit selection-label">Una selección de registros · no es el inventario completo</p>}<div className="species-list">{species.map(o=><article key={o.id}>{o.photo&&<img src={asset(o.photo)} loading="lazy" alt={o.commonName}/>}<div><strong>{o.commonName}</strong><em>{o.scientificName}</em><a href={o.sourceUrl} target="_blank" rel="noreferrer">{o.observedAt} · {o.source} ↗</a></div></article>)}</div>
 {!species.length&&<p className="data-pending">Sin fotografías seleccionadas para este radio. No significa ausencia de aves.</p>}
 </div></section>;
}

export function PlaceLayers({step,observedLayers,investigationLayers}:{step:number;observedLayers:PlaceLayer[];investigationLayers:PlaceLayer[]}) {
 const categories=[...new Set([...observedLayers,...investigationLayers].map(l=>l.category))].slice(0,step+1);
 return <section className="place-layers"><header><p className="eyebrow">CAPAS DEL LUGAR</p><h2>¿Qué podemos aprender de este lugar?</h2><p className="layer-legend"><span>● Observado · con evidencia</span><span>○ Por investigar · pregunta pendiente</span></p></header><div className="layer-columns">{categories.map(category=><article key={category}><h3>{category}</h3>{observedLayers.filter(l=>l.category===category&&l.evidenceUrl).map((l,i)=><div key={'o'+i} className="observed-layer"><small>● OBSERVADO</small><p>{l.items.join(' · ')}</p><a href={l.evidenceUrl} target="_blank" rel="noreferrer">Evidencia ↗</a></div>)}{[...investigationLayers,...observedLayers.filter(l=>!l.evidenceUrl)].filter(l=>l.category===category).map((l,i)=><div className="investigation-layer" key={'i'+i}><small>○ POR INVESTIGAR</small><p>{l.items.join(' · ')}</p></div>)}</article>)}</div><p className="credit">Las preguntas no confirman la presencia de estas relaciones en el lugar.</p></section>;
}

export function CommunityScienceFlow({step}:{step:number}) {
 return <section className="community-flow"><p className="eyebrow">CIENCIA COMUNITARIA</p><h2>{step===5?communityNarrative.conclusion:communityNarrative.title}</h2><ol>{communityFlow.slice(0,step).map((label,i)=><li key={label}><span>0{i+1}</span>{label}{i<4&&<b>→</b>}</li>)}</ol>{step>=2&&<div className="community-points" aria-label="Esquema de agregación, no registros geográficos reales">{Array.from({length:18},(_,i)=><i key={i} style={{left:(7+i*37%86)+'%',top:(15+i*23%68)+'%'}}/>)}<small>Esquema de agregación · sin coordenadas reales</small></div>}<p className="credit">{communityNarrative.platforms}</p></section>;
}
export function ObservationRecord({step,image}:{step:number;image?:string}) {
 return <section className="observation-record">{image&&<img src={asset(image)} alt="Ave: punto de partida para una observación"/>}<div><p className="eyebrow">DEL ENCUENTRO AL REGISTRO</p><h2>{step===6?communityNarrative.recordResult:communityNarrative.recordTitle}</h2><ul>{recordFields.slice(0,step).map(f=><li key={f}>{f}</li>)}</ul><p className="credit">Guía de campos · registrar los datos del encuentro real</p></div></section>;
}
