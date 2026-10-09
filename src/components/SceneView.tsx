import CampusExplorer from './CampusExplorer';
import { dimensions } from '../data/narrative';
import { metadata } from '../data/presentation';
import { biodiversity, localBird, counts } from '../data/biodiversity';
import { nearbyPlace, observedLayers, investigationLayers } from '../data/places';
import { poems } from '../data/poems';
import { BirdReveal, BiodiversityRadiusMap, PlaceLayers, CommunityScienceFlow, ObservationRecord } from './LocalNature';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Play, RotateCcw } from 'lucide-react';
import type { Scene } from '../data/types';
import { asset, bird, imagePath, mediaById, videoManifest, audioManifest } from '../data/mediaManifest';
import { sourceById } from '../data/sources';

export const places = [
 {id:'wirikuta',name:'Wirikuta',location:'San Luis Potosí · México',x:21.5,y:42.4,concept:'Peregrinación y continuidad',text:'Una ruta viva enlaza territorio, tradición oral y continuidad cultural wixárika.'},
 {id:'niyamgiri',name:'Niyamgiri',location:'Odisha · India',x:73.2,y:45,concept:'Hogar y montaña sagrada',text:'Para la comunidad Dongria Kondh, estas colinas son sustento y ámbito sagrado de Niyam Raja.'},
 {id:'takayna',name:'takayna',location:'Tasmania · Australia',x:92.6,y:84.4,concept:'Un paisaje cultural vivo',text:'El bosque templado forma parte de un paisaje aborigen vivo y de una disputa por su protección.'},
 {id:'kahoolawe',name:'Kahoʻolawe',location:'Hawái · Océano Pacífico',x:13.1,y:40.5,concept:'Memoria y restauración',text:'La historia de la isla enlaza cultura hawaiana, resistencia a los bombardeos y restauración.'}
];

function ScaleVideo({ reduced }: { reduced:boolean }) {
 const ref=useRef<HTMLVideoElement>(null);const [playing,setPlaying]=useState(false); const [failed,setFailed]=useState(false);
 useEffect(()=>{if(!reduced)ref.current?.play().then(()=>setPlaying(true)).catch(()=>setPlaying(false));},[reduced]);
 return <div className="scale-video">
  <video ref={ref} src={asset(videoManifest.awe.path)} poster={imagePath(videoManifest.awe.poster)} muted playsInline preload="metadata" onEnded={()=>setPlaying(false)} onError={()=>setFailed(true)} aria-label={videoManifest.awe.description}/>
  <div className="scale-video-caption"><span>Una medida distinta de nosotros</span><button onClick={()=>{const v=ref.current;if(!v)return;if(playing){v.pause();setPlaying(false);}else{if(v.ended)v.currentTime=0;v.play().then(()=>setPlaying(true)).catch(()=>setFailed(true));}}}>{playing?'Pausar secuencia':<><Play size={14}/> Reproducir · 20 s</>}</button></div>
  {failed&&<span className="media-warning">Video no disponible · se muestra la fotografía.</span>}
 </div>;
}

function WorldMap({ onPlace }: {onPlace:(id:string)=>void}) {
 return <div className="world-composition"><svg className="world-map" preserveAspectRatio="none" viewBox="0 0 1000 500" role="img" aria-label="Mapa esquemático del mundo; cuatro lugares señalados, posiciones aproximadas">
  <defs><pattern id="graticule" width="83.33" height="83.33" patternUnits="userSpaceOnUse"><path d="M83 0H0V83" fill="none" stroke="currentColor" strokeOpacity=".1"/></pattern></defs>
  <rect width="1000" height="500" fill="url(#graticule)"/>
  <g fill="currentColor" opacity=".16" stroke="currentColor" strokeWidth="1"><path d="M80 85 140 55 190 67 231 52 285 80 271 112 246 130 250 158 219 190 204 202 211 217 246 232 257 260 231 260 195 232 180 199 140 185 122 153 90 143Z"/><path d="M253 256 303 256 342 291 347 319 320 360 297 401 270 443 254 410 263 358 245 317Z"/><path d="M298 33 355 25 377 66 343 104 318 78Z"/><path d="M455 106 487 82 509 93 531 79 550 101 544 135 576 143 561 169 530 171 510 157 482 166 462 147Z"/><path d="M462 179 513 162 563 188 590 230 558 276 541 337 506 353 478 308 472 267 445 227Z"/><path d="M545 94 614 57 716 50 795 69 876 68 935 105 925 151 856 161 820 190 806 221 769 228 754 207 734 250 713 260 693 211 664 189 610 185 574 154Z"/><path d="M800 270 850 282 884 303 863 311 825 295Z"/><path d="M830 335 871 317 920 335 945 365 918 400 881 401 850 380 824 375Z"/><path d="M921 413 933 416 931 432 922 432Z"/><path d="M978 401 985 414 972 450 960 463 957 447Z"/></g>
 </svg>{places.map(p=><button key={p.id} className={'map-point point-'+p.id} style={{left:p.x+'%',top:p.y+'%'}} onClick={()=>onPlace(p.id)} aria-label={'Explorar '+p.name}><i/><span>{p.name}</span></button>)}<span className="map-caption">Cuatro lugares, cuatro relaciones · localizaciones aproximadas</span></div>;
}

export function PlaceCard({id}:{id:string}) {
 const p=places.find(x=>x.id===id)!;const source=sourceById[id];
 return <><img className="place-photo" src={imagePath(id)} alt={mediaById[id]?.alt || p.name}/><p className="eyebrow">{p.location}</p><h2>{p.name}</h2><p className="place-concept">{p.concept}</p><p>{p.text}</p><a href={source.url} target="_blank" rel="noreferrer">{source.author} ↗</a><p className="credit">Fotografía: {mediaById[id]?.author} · {mediaById[id]?.license}</p></>;
}

export default function SceneView({scene,step,reduced,onStart,onPlace,onReplay}:{scene:Scene;step:number;reduced:boolean;onStart:()=>void;onPlace:(id:string)=>void;onReplay:()=>void}) {
 const current=scene.steps[step];const [choice,setChoice]=useState<number|null>(null);
 if(scene.layout==='opening')return <div className="opening-content"><div className="opening-eyebrow"><span/> UNA INVITACIÓN A DETENERSE</div><h1>Entre concreto:<br/><em>una flor y un canto</em></h1><p className="opening-subtitle">{metadata.subtitle}</p><button className="start-button" onClick={onStart}>Comenzar el recorrido <span>↗</span></button></div>;
 if(scene.layout==='bird-reveal')return <BirdReveal {...localBird} step={step} onReplay={onReplay}/>;
 if(scene.layout==='radius-map')return <CampusExplorer/>;
 if(scene.layout==='place-layers')return <PlaceLayers step={step} observedLayers={observedLayers} investigationLayers={investigationLayers}/>;
 if(scene.layout==='community-flow')return <CommunityScienceFlow step={step}/>;
 if(scene.layout==='observation')return <ObservationRecord step={step} image={localBird.image}/>;
 if(scene.layout==='resolution'&&step===1)return <div className="resolution-species">{biodiversity.observations.slice(0,6).map(o=><article key={o.id}>{o.photo&&<img src={asset(o.photo)} alt={o.commonName} loading="lazy"/>}<h3>{o.commonName}</h3><em>{o.scientificName}</em></article>)}</div>;
 if(scene.layout==='dimensions'&&step===1)return <div className="landscape-dimensions">{dimensions.map(d=><section key={d.label}><p className="eyebrow">{d.label}</p><h2>{d.title}</h2><p>{d.items.join(' · ')}</p></section>)}</div>;
 if(scene.layout==='nearby')return <div className="generic-scene">{nearbyPlace.image&&<img className="nearby-image" src={asset(nearbyPlace.image)} alt={nearbyPlace.name}/>}<h2>{current.text}</h2>{!nearbyPlace.image&&<p className="scene-detail">Fotografía del espacio cercano pendiente · imaginemos el lugar que queremos conocer.</p>}</div>;
 if(scene.layout==='poem'&&current.kind){const poem=poems[current.kind as 'libai'|'heine'];return <div className="generic-scene poem-pause">{import.meta.env.DEV?<><h2 className="editorial-placeholder">{poem.placeholder}</h2><p className="scene-detail">{poem.label} · no proyectar como cita</p></>:<p className="eyebrow">UNA PAUSA PARA PERMANECER</p>}</div>;}
 if(current.kind==='black')return <div className="black-scene" aria-label={current.audio?'Escucha de tormenta sobre pantalla negra':'Silencio sobre pantalla negra'}/>;
 if(scene.layout==='map')return <div className="map-scene"><p className="eyebrow">GEOGRAFÍAS DEL SIGNIFICADO</p><h2>{current.text}</h2><WorldMap onPlace={onPlace}/></div>;
 if(scene.layout==='experiment')return <div className="experiment"><p className="eyebrow">UN PEQUEÑO EXPERIMENTO</p><h2>{current.text}</h2><p className="question-detail">{current.detail}</p><div className="choices">{['office','park','forest'].map((id,i)=><button key={id} className={choice===i?'selected':''} aria-pressed={choice===i} onClick={()=>setChoice(choice===i?null:i)}><img src={imagePath(id)} alt={['Sala de trabajo cerrada','Parque urbano con árboles','Bosque iluminado'][i]}/><span><b>{'ABC'[i]}</b>{['Una oficina','Un parque','Un bosque'][i]}<i>{choice===i?'Elegido':'↗'}</i></span></button>)}</div>{current.words&&<p className="word-line">{current.words.join(' — ')}</p>}</div>;
 if(scene.layout==='awe'&&current.kind==='video')return <ScaleVideo reduced={reduced}/>;
 if(scene.layout==='prospect')return <div className="prospect"><div className="prospect-titles"><h2>perspectiva</h2><span>↔</span><h2>refugio</h2></div><svg viewBox="0 0 1000 250" className="prospect-diagram" role="img" aria-label="Observador bajo un árbol, mirando el agua y el horizonte"><path d="M30 180 180 115 270 165 400 85 540 185M20 216Q250 196 500 220T980 215"/><path d="M750 213V88M750 115 710 82M750 132 801 98"/><ellipse cx="750" cy="60" rx="130" ry="47"/><circle cx="641" cy="171" r="11"/><path d="M641 182v29m0-17-15 12m15-12 15 10m-15 7-11 18m11-18 11 18"/><path className="sightline" d="m625 174-290-48m290 48-290 25"/></svg><div className="word-line">{current.words?.join(' · ')}</div><p className="subtle-detail">{current.detail}</p></div>;
 if(scene.layout==='self'&&step<3)return <div className="self-scene"><motion.span className="self-word" animate={{scale:step===0?1:step===1?.42:.17}} transition={{duration:reduced?0:1.7}}>YO</motion.span><div className="orbit-words">{current.words?.map((w,i)=><motion.span key={w} initial={{opacity:0}} animate={{opacity:1}} style={{left:[13,72,43,20,78,48][i]+'%',top:[25,20,10,72,70,83][i]+'%'}}>{w}</motion.span>)}</div></div>;
 if(scene.layout==='social'&&step===0)return <div className="social-scene"><div className="social-card"><div className="social-top"><span className="avatar">m</span><span>miradas.del.mundo<small>Un lugar para detenerse</small></span><b>•••</b></div><img src={imagePath('mountain')} alt={mediaById.mountain?.alt}/><div className="social-actions"><Heart size={19}/><MessageCircle size={19}/><span>1 284 miradas</span></div></div><h2>{current.text}</h2></div>;
 if(scene.layout==='bird')return <div className={'bird-scene bird-step-'+step}><div className="bird-field" style={{backgroundImage:`url(${imagePath('forest')})`}}><motion.img src={imagePath(bird.image)} alt={'Fotografía de '+bird.commonName+' entre ramas; composición didáctica'} animate={{scale:step===1||step===2?3.8:1}} transition={{duration:reduced?0:1.4}} style={{left:bird.focus.x+'%',top:bird.focus.y+'%'}}/>{step===1&&<div className="bird-marker" style={{left:bird.focus.x+'%',top:bird.focus.y+'%'}}/>}</div><div className="bird-text"><h2>{step===1?bird.commonName:current.text}</h2>{step===1&&<p><em>{bird.scientificName}</em></p>}<small>{step===2?(audioManifest.bird.path?'Grabación de campo · créditos en fuente':'[CANTO DE PETIRROJO PENDIENTE DE INCORPORAR]'):'Ejercicio visual · composición fotográfica'}</small></div></div>;
 if(scene.layout==='care')return <div className="care-scene"><p className="eyebrow">UNA POSIBILIDAD, NO UNA LEY</p><div className="care-path">{current.words?.map((w,i)=><motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} key={w}><span>{String(i+1).padStart(2,'0')}</span><h2>{w}</h2>{i<current.words!.length-1&&<b>↓</b>}</motion.div>)}</div></div>;
 if(scene.layout==='meaning'&&current.words)return <div className="meaning-scene"><p className="eyebrow">NIYAMGIRI · INDIA</p>{current.words.map(w=><motion.p key={w} initial={{opacity:0,x:-15}} animate={{opacity:1,x:0}}>{w.split(' → ')[0]}<span>→</span><strong>{w.split(' → ')[1]}</strong></motion.p>)}</div>;
 return <div className={'generic-scene '+(current.kind==='placeholder'?'placeholder-scene ':'')+(scene.layout==='equation'?'equation-scene ':'')+(scene.layout==='other'?'other-scene ':'')}>
  {scene.layout==='time'&&step<4&&<p className="eyebrow">EL MISMO LUGAR · OTRO TIEMPO</p>}
  {current.text&&<motion.h2 key={current.text} initial={{opacity:0,y:reduced?0:12}} animate={{opacity:1,y:0}} transition={{duration:reduced?0:.8}} className={(current.kind==='strike'?'strike ':'')+(current.text.length>95?'long-text':'')}>{current.text}</motion.h2>}
  {current.words&&<div className={scene.layout==='body'||scene.layout==='return'?'sensory-words':'concept-words'}>{current.words.map((word,i)=><motion.span key={word} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:reduced?0:i*.06}}>{word}</motion.span>)}</div>}
  {current.detail&&<p className="scene-detail">{current.detail}</p>}
  {scene.layout==='listen'&&step===0&&<div className="listening-waves" aria-label="Escucha de 18 segundos">{Array.from({length:24},(_,i)=><i key={i} style={{animationDelay:(i*.16)+'s',height:12+Math.sin(i)*15+Math.cos(i*2)*10+'px'}}/>)}</div>}
  {scene.layout==='time'&&step<4&&<div className="time-ticks">{['amanecer','día','atardecer','noche'].map((t,i)=><span key={t} className={i===step?'active':''}>{t}</span>)}</div>}
 </div>;
}
