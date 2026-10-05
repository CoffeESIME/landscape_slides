export type PlaceLayer = { category: string; items: string[]; evidenceUrl?: string };
export const nearbyPlace: {image?: string; name: string} = {name:'Espacio cercano por documentar'};
export const observedLayers: PlaceLayer[] = [];
export const investigationLayers: PlaceLayer[] = [
 {category:'VIDA',items:['aves','plantas','insectos']},
 {category:'SUELO',items:['permeabilidad','temperatura','materia']},
 {category:'PERSONAS',items:['paso','descanso','observación']},
 {category:'EDUCACIÓN',items:['registro','aprendizaje','ciencia comunitaria']},
 {category:'PAISAJE',items:['vista','memoria','continuidad']}
];
export const communityFlow = ['observación individual','registro','mapa','conocimiento colectivo'];
export const recordFields = ['📍 lugar','📅 fecha','🔢 cantidad','📷 fotografía','🎵 audio'];
export const fieldwork = ['observar','identificar','registrar','comparar','compartir','volver a observar'];
