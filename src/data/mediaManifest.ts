import { localBird } from './biodiversity';
import media from '../../public/bibliography/media.json';
export interface Media { id: string; type: string; source: string; author: string; license: string; attribution: string; localPath: string; alt: string; }
// Se resuelven con BASE_URL para poder servir la aplicación en una subcarpeta.
export const asset = (path: string) => import.meta.env.BASE_URL + path;
export const mediaManifest: Media[] = [...media, {id:'niyamgiri',type:'placeholder',source:'https://www.survivalinternational.org/peoples/dongria',author:'Esquema original de esta presentación',license:'CC0',attribution:'Marcador conceptual; no representa la topografía real de Niyamgiri.',localPath:'images/niyamgiri/placeholder.svg',alt:'Esquema de montañas. Falta incorporar una fotografía documental de Niyamgiri.'}];
export const mediaById: Record<string, Media> = Object.fromEntries(mediaManifest.map(m=>[m.id,m]));
export const imagePath = (id?: string) => id && mediaById[id] ? asset(mediaById[id].localPath) : undefined;
export const audioManifest = {
 forest: {path:'audio/forest/forest.mp3',loop:true,label:'Ambiente de demostración sintetizado · viento y aves'},
 storm: {path:'audio/storm/storm.mp3',loop:true,label:'Tormenta de demostración sintetizada'},
 body: {path:'audio/footsteps/body.mp3',loop:true,label:'Viento y pasos de demostración sintetizados'},
 soundscape: {path:'audio/water/soundscape.mp3',loop:false,label:'Paisaje sonoro de demostración sintetizado · 18 segundos'},
 bird: {path:localBird.audio || null,loop:false,label:'Vocalización real · colibrí orejas blancas · ver créditos'},
};
export const bird = {commonName:'Petirrojo europeo',scientificName:'Erithacus rubecula',image:'bird',focus:{x:50,y:48},audio:'bird' as const};
export const videoManifest = { awe: {path:'video/mountains/scale.mp4',poster:'mountain',duration:20,description:'Secuencia de escala a partir de una fotografía; no es filmación de campo.'} };
