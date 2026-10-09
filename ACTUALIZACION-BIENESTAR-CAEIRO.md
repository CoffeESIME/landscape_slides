# Actualización puntual: bienestar, regreso y Caeiro

Base: estado actual del repositorio, commit ca19c70. No se reaplicó el pulido anterior.

## Cambios narrativos

- `animales`: después de BIOFILIA aparece NATURALEZA Y BIENESTAR con descanso, atención y vínculo. Notas de 45–60 segundos explican beneficios posibles, variabilidad y transición hacia el miedo. Referencia añadida: [OMS, Urban green spaces and health (2016)](https://www.who.int/europe/publications/i/item/WHO-EURO-2016-3352-43111-60341), revisión sobre mecanismos y evidencia del vínculo entre espacios verdes y salud, sin promesas automáticas.
- `regreso`: pregunta por maneras de mirar la montaña. Ocho relaciones se muestran individualmente, sin mezclar una lista de componentes. Se conserva exactamente la foto de Iztaccíhuatl. Concluye: «La montaña no cambió. Cambió aquello que somos capaces de reconocer en ella».
- `lo-pequeno`: conserva la flor y las primeras dos frases. Termina con «Cambió nuestra capacidad de encontrarlo». Las notas conducen a Caeiro.
- `caeiro`: nueva coda de dos pasos, con pasajes breves del fragmento proporcionado: «Como quien abre los ojos y ve,» y «Y lo pienso viendo y oyendo, / Y ando con Él a toda hora». Crédito visible Alberto Caeiro · Fernando Pessoa / El guardador de rebaños. Fondo oscuro limpio, tipografía editorial y versos estáticos. Se documenta que son pasajes separados y que el texto se proporcionó sin traductor/edición; no se inventa atribución editorial.
- `cierre`: se conserva íntegro. Caeiro conduce al primer paso negro y silencioso antes de la frase inicial. Nada aparece después de la frase final.

Las notas afectadas se usan directamente desde `rehearsal.ts` en la declaración de las escenas. No hay dos guiones divergentes.

## Archivos modificados

| Archivo | Motivo |
|---|---|
| src/data/presentation.ts | Paso de bienestar, regreso, flor, coda y descripción oficial. |
| src/data/rehearsal.ts | Notas y puentes concordantes; tiempos de bienestar y coda. |
| src/data/poems.ts | Dos fragmentos de Caeiro, crédito y procedencia. |
| src/data/sources.ts | Referencia de bienestar y ficha del texto aportado. |
| src/components/SceneView.tsx | Un renderer breve de coda con crédito y título en cursiva. |
| src/styles/main.css | Tres reglas locales para el poema y su crédito. |
| tests/presentation.e2e.mjs | Conteo/duración y capturas de escenas afectadas. |
| tests/integrity.e2e.mjs | Regresiones de notas, secuencia flor/coda/cierre, cierre intacto y tiempos. |
| README.md | Conteos, duración y enlace a esta actualización. |
| verification/results.json, integrity-results.json, sequence.json | Evidencia automática del recorrido actual. |
| verification/bienestar-caeiro/ | 22 capturas PNG nuevas y hoja de contacto. |

Se conservan sin modificaciones CampusExplorer, biodiversidad, ciencia comunitaria, colibrí, terceros lugares, Conocer un lugar, App, navegación, audio y generación del service worker.

## Duración

32 escenas, 113 pasos. Guía total: **31,3 minutos (31 min 18 s)**, orientativa y manual. Se suman 48 segundos de bienestar y 30 de coda a la guía anterior. Actos: 4 / 4,8 / 5 / 5 / 5 / 4 / 3,5 minutos. La participación de la audiencia y el ensayo determinan la duración real.

## Validación

- `npm run build`: PASS (TypeScript, Vite y 55 recursos de caché).
- `npm test`: PASS, 5 pruebas.
- `npm run test:e2e`: PASS, recorrido completo de 32 escenas y 113 pasos, notas, medios y offline.
- `node tests/integrity.e2e.mjs`: PASS, 226 posiciones de escena/paso entre 1920×1080 y 1366×768, sin desbordamientos detectados; 34 assets; notas, coda y cierre verificados.
- `node tests/media.e2e.mjs`: PASS, pruebas existentes de audio, fullscreen y rangos offline.
- Revisión visual de capturas en ambas resoluciones: bienestar, regreso, flor, ambos pasos de Caeiro y cierre. El poema y el crédito se ven completos.

Capturas: `verification/bienestar-caeiro/`; resumen visual: `contact-sheet.jpg`. Los informes anteriores se conservan como historial del pulido anterior.
