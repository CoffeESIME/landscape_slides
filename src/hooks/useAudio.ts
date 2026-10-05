import { useCallback, useEffect, useRef, useState } from 'react';
import type { AudioId } from '../data/types';
import { asset, audioManifest } from '../data/mediaManifest';
export function useAudio(id: AudioId | null | undefined) {
 const [replayKey,setReplayKey]=useState(0);
 const [enabled,setEnabled]=useState(false);const [volume,setVolume]=useState(.3); const [error,setError]=useState('');
 const current=useRef<HTMLAudioElement|null>(null); const players=useRef(new Set<HTMLAudioElement>());const level=useRef(volume);const fades=useRef(new WeakMap<HTMLAudioElement,number>());
 const fade = useCallback((el:HTMLAudioElement,to:number,stop=false)=>{
  const previous=fades.current.get(el);if(previous)cancelAnimationFrame(previous);const from=el.volume;const start=performance.now();
  const frame=(now:number)=>{const t=Math.min((now-start)/1100,1);el.volume=Math.max(0,Math.min(1,from+(to-from)*t));if(t<1)fades.current.set(el,requestAnimationFrame(frame));else if(stop){el.pause();players.current.delete(el);}};fades.current.set(el,requestAnimationFrame(frame));
 },[]);
 useEffect(()=>{level.current=volume;if(current.current)fade(current.current,volume);},[volume,fade]);
 useEffect(()=>{
  const old=current.current;current.current=null;if(old){const pending=fades.current.get(old);if(pending)cancelAnimationFrame(pending);old.pause();players.current.delete(old);}
  setError('');if(!enabled||!id)return;
  let cancelled=false;const config=audioManifest[id];if(!config.path){setError('Canto de la especie pendiente de incorporar. Consulta la lista de recursos.');return;}const el=new Audio(asset(config.path));el.loop=config.loop;el.volume=0;players.current.add(el);current.current=el;
  el.play().then(()=>{if(!cancelled)fade(el,level.current);else el.pause();}).catch(()=>{if(!cancelled)setError('No se pudo iniciar el audio. Pulsa sonido para reintentar.');});
  return()=>{cancelled=true;if(current.current===el)current.current=null;const pending=fades.current.get(el);if(pending)cancelAnimationFrame(pending);el.pause();players.current.delete(el);};
 },[id,enabled,fade,replayKey]);
 useEffect(()=>()=>{players.current.forEach(p=>p.pause());players.current.clear();},[]);
 return {enabled,replay:()=>{setEnabled(true);setReplayKey(k=>k+1);},toggle:()=>setEnabled(v=>!v),volume,setVolume,error,label:id?audioManifest[id].label:'Silencio'};
}
