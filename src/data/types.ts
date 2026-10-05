export type Theme = 'contemplative' | 'life' | 'fear' | 'paper' | 'other' | 'body' | 'memory' | 'joy' | 'black' | 'dawn' | 'city' | 'science';
export type AudioId = 'forest' | 'storm' | 'body' | 'soundscape' | 'bird';
export interface Step { text?: string; detail?: string; image?: string; audio?: AudioId | null; kind?: string; words?: string[]; }
export type EvidenceType = 'scientific' | 'philosophical' | 'poetic' | 'personal-reflection' | 'local-observation';
export interface Scene { id: string; title: string; chapter: number; theme: Theme; layout?: string; image?: string; minutes: number; steps: Step[]; sources: string[]; concealed?: boolean; notes: { objective: string; idea: string; say: string; question?: string; pause?: string; caution?: string; speakerNotes?: string; audiencePrompt?: string; evidenceType?: EvidenceType; sources?: string }; }
export interface Source { id: string; author: string; title: string; year: string; chapter?: string; idea: string; type: string; url?: string; status?: string; }
