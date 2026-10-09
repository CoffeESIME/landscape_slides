export type PlaceLayer = { category: string; items: string[]; evidenceUrl?: string };
export const nearbyPlace: {image?: string; name: string} = {name:'Espacio cercano por documentar'};
export const observedLayers: PlaceLayer[] = [];
export const investigationLayers: PlaceLayer[] = [
 {category:'VIDA',items:['¿qué aves llegan?','¿qué plantas aparecen?']},
 {category:'AMBIENTE',items:['¿qué pasa cuando llueve?','¿qué temperatura y sonidos hay?']},
 {category:'PERSONAS',items:['¿quién lo recorre?','¿quién permanece?']},
 {category:'TIEMPO',items:['¿qué cambia durante el día?','¿y entre estaciones?']},
 {category:'PAISAJE',items:['¿qué memorias contiene?','¿qué usos tiene?']}
];
export const communityFlow = ['observar','registrar','compartir','agregar','conocer'];
export const recordFields = ['📍 lugar','📅 fecha','🔢 cantidad','📷 fotografía','🎵 audio'];
export const fieldwork = ['observar','identificar','registrar','comparar','compartir','volver a observar'];
