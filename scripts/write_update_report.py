import json,pathlib
r=pathlib.Path.cwd();seq=json.loads((r/'verification/sequence.json').read_text());names=['Mirar','Sentir','Habitar entre concreto','Reconocer','Conocer juntos','Valorar antes de transformar','Regresar']
report='''# Informe de actualización

**Entre concreto: una flor y un canto** · 3 de octubre de 2026

Se actualizó la aplicación existente: **35 escenas, 133 pasos, siete actos**. Se conserva React, Vite, TypeScript, Framer Motion, las dos familias tipográficas locales, Drawer, los renderers anteriores, el controlador de navegación y el mecanismo de caché offline. No se creó otro proyecto ni se borraron escenas originales.

## Archivos modificados

| Archivo | Cambio |
|---|---|
| `src/data/presentation.ts` | Nuevo guion declarativo, siete actos, título, descripción y notas por escena |
| `src/data/types.ts` | EvidenceType, metadatos de notas, escenas sin rótulos y tres temas nuevos |
| `src/data/themes.ts` | Inicio azul piedra; amanecer, ciudad y ciencia comunitaria |
| `src/data/mediaManifest.ts` | Registro de audio local; resuelve recursos mediante BASE_URL |
| `src/data/sources.ts` | Fuentes locales, ciencia comunitaria, Kailash y Thoreau; bibliografía anterior conservada |
| `src/components/SceneView.tsx` | Reutilización de layouts e integración de experiencias nuevas |
| `src/App.tsx` | Conteos dinámicos, siete atajos, cierre sin avance, controles discretos, nuevas notas y fuentes |
| `src/hooks/useAudio.ts` | Detención exclusiva al cambiar de escena, mute inmediato y repetición controlada |
| `src/styles/main.css` | Composiciones de radios, especies, capas y registro; portátil, 16:9 y movimiento reducido |
| `public/bibliography/media.json` | Créditos y rutas de fotografías y audio incorporados |
| `index.html` | Título y descripción completos |
| `scripts/serve.mjs` | MIME de WAV y nombre actualizado |
| `package.json` | Comando test:e2e |
| `README.md`, `ASSETS-PENDIENTES.md`, `VERIFICACION.md` | Instrucciones y estado real del proyecto |
| `dist/` | Versión compilada y service worker regenerados |

`src/hooks/navigation.mjs`, Drawer, el diseño base de SceneView, el video original, las fuentes locales y los assets anteriores se reutilizaron.

## Nuevos componentes y contenido

En `src/components/LocalNature.tsx`:

- **BirdReveal**: escucha sin imagen → pregunta → foto → nombre común → nombre científico → mismo audio → cambio del observador. Recibe medios y nombres; utiliza el controlador global de sonido.
- **BiodiversityRadiusMap**: radios 1/2/5, centro configurable, conteos agregados, selección fotográfica, fuentes y puntos derivados de coordenadas. No contiene especies hardcodeadas. Distingue lista seleccionada de conteo histórico.
- **PlaceLayers**: cinco categorías progresivas, observado con enlace de evidencia y por investigar con borde discontinuo. Una capa sin evidencia no se dibuja como confirmada.
- **CommunityScienceFlow**: observación → registro → mapa → conocimiento colectivo. Los puntos conceptuales están identificados como esquema, no datos locales.
- **ObservationRecord**: campos de registro revelados por pasos.

Nuevos archivos: `src/data/biodiversity.ts`, `local-observations.json`, `local-bird.json`, `places.ts`, `poems.ts`, `narrative.ts`, `public/bibliography/radius-counts.json`. Los scripts de descarga conservan el procedimiento de investigación; las respuestas extensas se guardan en `research/`, fuera del paquete público.

## Escenas fuera del flujo principal

Se archivó íntegra la versión anterior en `src/data/archive/presentation.ts`. El inventario previo está en `INVENTARIO-NARRATIVO.md`.

- Sabana/prospect-refuge pasa a notas de biofilia.
- Atracción y miedo se fusionan en Miedo; la distinción de Mill se integra en Podemos/¿Debemos?
- Dos horas sin teléfono, Amar, Pantalla, Cuerpo, Escuchar, Tiempo, Memoria metafórica y Cuidar quedan como complemento.
- Mapa internacional, Niyamgiri y Wirikuta salen del recorrido principal; notas y fuentes permanecen. Takayna y Kahoʻolawe permanecen en bibliografía y en el renderer del mapa preservado.
- El ejercicio del petirrojo europeo permanece archivado. El flujo principal usa un colibrí documentado alrededor del centro indicado.

Las notas complementarias se consultan desde Bibliografía. El archivo conserva los pasos completos para futuras recuperaciones, sin intercalarlos después del cierre.

## Escenas reutilizadas

Biofilia, miedo, awe y video, YO/small self, alteridad, transformación, caminar, goce, pausas de Li Bai y Heine, recuerdo del lugar perdido, regreso y cierre. Se reescribieron sus textos o notas según el nuevo alcance. El YO mantiene su animación original.

## Nueva secuencia

'''
for i,n in enumerate(names):
 report+='### '+str(i+1)+'. '+n+'\n\n'
 report+=' → '.join(s['title'] for s in seq if s['chapter']==i)+'.\n\n'
report+='''## Datos locales y metodología

Centro entregado por el usuario: **19°21′ N, 99°17′ O**, convertido a **19.3500, −99.2833333333**. No se adjudica nombre a la universidad. Precisión original: minutos; se presenta como aproximada.

| Radio acumulativo | Especies registradas |
|---|---:|
| 1 km | 40 |
| 2 km | 88 |
| 5 km | 176 |

Fuente: API de iNaturalist, `observations/species_counts`; taxón Aves (3), grado de investigación, identificación a rango especie y fecha de observación hasta 2026-10-03. Las consultas exactas están guardadas con cada conteo en `public/bibliography/radius-counts.json`. Se trata de registros históricos de plataforma, sensibles al esfuerzo de observación; no de abundancia, inventario exhaustivo ni presencia actual. Tampoco prueban presencia en el espacio específico.

Se incorporan ocho especies distintas con imágenes reutilizables, fecha, coordenadas y enlace individual. Sus distancias fueron comprobadas con Haversine. Los puntos del mapa son solo estos registros seleccionados. No hay foto seleccionada en el radio de 1 km; el mapa lo aclara sin confundirlo con ausencia de especies.

La vocalización de **Basilinna leucotis** corresponde al [registro 111224252](https://www.inaturalist.org/observations/111224252), de Arturo Crespo Moctezuma, observado el 12 de abril de 2022, CC BY. Se conserva el archivo original WAV sin edición; ambos pases utilizan el mismo archivo. La foto proviene de otra observación local de la misma especie, acreditada por separado.

## Assets pendientes

- Fotografía del espacio cercano: no existía en los assets recibidos. Se muestra una indicación transparente y se admite ruta configurable.
- Opcional: filmación real para awe. Se conserva la secuencia original de 20 s construida a partir de una foto.
- Opcional: flor fotografiada en México y ambientes de campo. La flor incorporada es ilustrativa, de Durham; la tormenta y otros ambientes heredados son síntesis declaradas.

Ya están integradas fotografías documentales de Kailash, Iztaccíhuatl, Cerro de la Estrella, flor entre pavimento, tormenta, precipicio, serpiente, mar y personas en Chapultepec. Cada archivo tiene crédito y licencia. Las imágenes del inicio y del regreso comparten exactamente la misma ruta; no son variantes generadas.

## Datos locales pendientes

Nombre del campus, precisión adicional del centro si se requiere, foto del lugar, periodo futuro de muestreo y evidencia de las capas del espacio. `observedLayers` está vacío deliberadamente: vida, suelo, personas, educación y paisaje aparecen como preguntas POR INVESTIGAR.

## Citas y fuentes

- **Thoreau**: fragmento breve cotejado en [Walking, Project Gutenberg](https://www.gutenberg.org/files/1022/1022-h/1022-h.htm), conservado en inglés. Sin traducción inventada.
- **Li Bai**: no existía traducción verificada; conservado como pausa y marcador de desarrollo.
- **Heine**: sin fragmento exacto; mismo tratamiento.
- **Montaigne**: sin pasaje cotejado; no se atribuye una cita ni se inventa una paráfrasis. Referencia preservada.
- Las fórmulas sobre paisaje, pertenencia y transformación se identifican como formulaciones del expositor; la reflexión sobre agotamiento no se presenta como resultado científico.
- El derecho al disfrute se explica como idea ética/cívica, no como afirmación jurídica formal. No se atribuye longevidad al small self.
- Las lecturas de Kellert, Mill, Hailwood y los casos internacionales conservan sus advertencias de cotejo; no se inventaron páginas ni citas.

En producción, los placeholders poéticos se convierten en pausas visuales. En desarrollo se ven los marcadores para edición. Las notas mantienen el pendiente explícito.

## Funcionalidades comprobadas

- Compilación TypeScript + Vite y generación de service worker: correctas.
- Cuatro pruebas unitarias originales de navegación: correctas.
- Recorrido automatizado de **35 escenas / 133 pasos**: correcto; sin errores de página ni assets faltantes.
- ArrowRight, Space, ArrowLeft, pasos internos, Home/End y siete saltos de acto.
- Notas de las 35 escenas, fuentes, selección de radios, hashes y cierre sin avance posterior.
- Pantalla completa mediante F; activación y mute; repetición del canto y exclusión de reproducción simultánea.
- Decodificación de los cinco audios locales y reproducción del video; desmontaje del video al abandonar el paso.
- Capturas revisadas en 1920×1080 y 1366×768; sin desbordamiento horizontal. Movimiento reducido probado.
- Preparación offline, recarga desconectada, imagen del ave sin red y respuestas 206 de audio/video desde caché.
- Todos los archivos del manifiesto existen; ocho especies únicas y distancias de registros comprobadas.
- Búsqueda de las referencias explícitas al conflicto local prohibidas por el encargo: sin coincidencias en el contenido.

Resultados: `verification/results.json`, `verification/media-results.json`, `verification/sequence.json` y capturas PNG. Tests reproducibles: `tests/presentation.e2e.mjs` y `tests/media.e2e.mjs`. Los tests de navegador requieren que `dist` esté servido en 4173.

## Prueba narrativa

El recorrido cambia el foco del observador: montaña → historia → emoción → pertenencia sin centralidad → ciudad viva → especies reconocibles → registro → conocimiento colectivo → preguntas sobre lo aparentemente vacío → conocer antes de transformar. Regresa a la misma montaña y termina en la flor, después en negro. La última frase permanece; no se añaden créditos ni agradecimientos después.

## Posibles mejoras futuras

1. Jornada de observación para documentar el espacio concreto y alimentar las capas con evidencia.
2. Sustituir los pendientes poéticos por traducciones verificadas con derechos claros.
3. Elegir una ventana temporal homogénea y actualizar los conteos, manteniendo instantáneas reproducibles.
4. Añadir fotografías propias del campus y video de campo para reforzar el acercamiento local.
5. Si se necesita, desarrollar una ventana privada de expositor; el modo actual, heredado, muestra notas en la misma pantalla.
'''
(r/'ACTUALIZACION.md').write_text(report,encoding='utf-8')
(r/'VERIFICACION.md').write_text('''# Verificación de la edición Entre concreto

Compilación final: correcta. 35 escenas, 133 pasos, siete actos.

- `npm test`: cuatro pruebas correctas.
- `node tests/presentation.e2e.mjs`: recorrido íntegro, notas, audio exclusivo/mute/replay, video, hash, fuentes, radios, 16:9, portátil, reduced-motion y recarga offline.
- `node tests/media.e2e.mjs`: pantalla completa, pasos internos, cinco audios decodificados y rangos offline de audio/video.
- Manifiesto: sin rutas faltantes. Ocho especies distintas; distancias comprobadas.
- Capturas visuales revisadas en `verification/`.

Los pendientes de contenido no se confunden con fallos de compilación: foto del espacio cercano, citas por cotejar y precisión del campus. Consultar ACTUALIZACION.md y ASSETS-PENDIENTES.md.
''',encoding='utf-8')
