import localObservations from './local-observations.json';
import birdRecord from './local-bird.json';
import radiusCounts from '../../public/bibliography/radius-counts.json';
export type Radius = 1 | 2 | 5;
export type Center = { latitude: number; longitude: number; name: string };
export type SpeciesObservation = {
 id: string; commonName: string; scientificName: string; radiusKm: Radius;
 observedAt?: string; latitude?: number; longitude?: number; photo?: string; audio?: string;
 source?: 'iNaturalist' | 'eBird' | 'NaturalistaMX' | 'own'; sourceUrl?: string;
 verified: boolean; quantity?: number;
};
// Incorporar registros trazables después de confirmar campus, periodo y coordenadas.
// radiusKm es el menor radio que contiene la observación; los conteos son acumulativos.
export const biodiversity: {center: Center | null; observations: SpeciesObservation[]; period: string; selectedIds: string[]} = {
 center: {latitude:19.35,longitude:-99.2833333333,name:'19°21′ N · 99°17′ O'}, observations: localObservations as SpeciesObservation[], period: 'iNaturalist · grado de investigación · hasta 03 oct 2026', selectedIds: localObservations.map(o=>o.id)
};
export const localBird: {audio?: string; image?: string; commonName?: string; scientificName?: string; source?: string} = birdRecord;
export const counts = radiusCounts;
export const recognition = { generic: 'PÁJAROS', conclusion: 'Aprender aumenta la resolución del mundo.' };
