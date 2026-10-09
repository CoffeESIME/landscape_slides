# Pulido de «Entre concreto: una flor y un canto»

## A. Recorrido narrativo

31 escenas y 111 pasos manuales. Mirar → sentir → habitar → reconocer → conocer juntos → conocer un lugar → regresar. El observador enlaza el experimento de las montañas, la escucha del colibrí y el regreso a la misma montaña y flor. Las preguntas y palabras breves permanecen en pantalla; el razonamiento y los puentes están en notas.

Se conserva la arquitectura React/Vite/TypeScript, SceneView, Drawer, teclado, hashes, fuentes, audio manager, fullscreen, reduced motion, preload y service worker. CampusExplorer conserva centro 19.3525, −99.2824, capturas y conteos 48 / 85 / 179, con advertencias de registros históricos, esfuerzo desigual y precisión variable.

## B. Cambios por archivo

| Archivo | Cambio y motivo |
|---|---|
| src/data/presentation.ts | Secuencia de 31 escenas, siete actos, universidad abierta, historias compartidas, fusiones y cierre definitivo. |
| src/data/rehearsal.ts | Notas de ensayo de todas las escenas y tiempos específicos; desarrolla los seis puentes entre actos. |
| src/data/narrative.ts | Pregunta «¿Lo escucharían igual ahora?» y repetición del mismo registro. |
| src/data/places.ts | Preguntas sobre vida, ambiente, personas, tiempo y paisaje; cinco acciones de ciencia comunitaria. No se fabrican observaciones. |
| src/data/local-video.json | Archivo real, copia compatible, créditos propios, identificación confirmada por el expositor y metadata separada de datos de campo. |
| src/data/mediaManifest.ts | Configuración declarativa del nuevo video. Audio anterior preservado para archivo. |
| src/data/sources.ts | Fuente de la grabación propia; elimina marcadores entre corchetes de referencias complementarias. |
| public/bibliography/media.json | Créditos del video propio, sin reutilizar licencia o autoría del canto anterior. |
| public/video/colibri-presentacion.mp4 | Derivado H.264/SDR de reproducción, con audio del mismo video. Original del usuario intacto. |
| src/components/LocalNature.tsx | BirdReveal audiovisual progresivo, pausa y replay que conserva mute; PlaceLayers sin «vacío»; flujo comunitario completo. |
| src/components/SceneView.tsx | Conecta video y volumen global; escena del lugar sin placeholder editorial ni foto sustituta. |
| src/components/CampusExplorer.tsx | Advertencias visibles sobre muestreo y precisión, además del carácter histórico. |
| src/App.tsx | Estado de sonido compartido con video, detención al salir, preload previo, créditos propios, guía de minutos y normalización de hash. |
| src/hooks/navigation.mjs | Alias para los enlaces de escenas fusionadas, retiradas o renombradas. |
| src/styles/main.css | Video vertical completo sin recortar al ave; controles discretos y tamaño de capas adaptable. |
| tests/navigation.test.mjs | Regresión de hashes antiguos y destinos útiles. |
| tests/presentation.e2e.mjs | 111 pasos, notas, imágenes, cierre, colibrí progresivo, mute/replay, offline y capturas. |
| tests/media.e2e.mjs | Conserva pruebas de audio y fullscreen; añade rangos HTTP del nuevo video offline. |
| tests/integrity.e2e.mjs | Todos los pasos a ambas resoluciones, límites de elementos, assets, aliases, tiempos y fullscreen del video. |
| src/data/archive/presentation-before-polish.txt | Copia literal del guion previo a esta intervención. El archivo original de TypeScript también se conserva. |
| verification/ | Resultados, metadatos del video y capturas nuevas en pulido-20261009. |
| README.md, INVENTARIO-NARRATIVO.md, ASSETS-PENDIENTES.md, VERIFICACION.md | Uso, decisiones de auditoría, pendientes reales y evidencia de validación actualizados. |

## C. Antes → después → decisión

| Antes | Después | Decisión |
|---|---|---|
| Kailash → Iztaccíhuatl → Kailash → paisaje | Misma estructura | Conservada; notas desarrolladas sin universalizar las historias. |
| Biofilia / miedo / asombro / yo / alteridad | Mismo arco, más breve | Yo pierde la reflexión lateral sobre agotamiento; alteridad sigue como puente. |
| poder | Fuera del recorrido | Tema recogido en transformar; original en complementos. |
| ciudad / cerro-estrella / flor | Mismas escenas | Zoom añade Cuajimalpa; ciudad dentro del paisaje; misma flor al volver. |
| terceros-lugares / goce | Dos respiraciones breves contiguas | Permanecer y disfrutar enlazados en notas, 54 s y 48 s orientativos. |
| caminar / poesia / bosque-poema | caminar | Thoreau como única pausa poética; Li Bai y Heine fuera del recorrido y preservados. |
| ave con foto/audio anteriores | ave con video y audio propios | Escuchar oculto, revelar, nombre común, científico, mismo registro y conclusión. |
| resolucion | resolucion | Conservada con razonamiento oral ampliado. |
| Salto directo al registro | historias → observacion → ciencia-comunitaria | Añadido puente experiencia/relato/registro sin equiparar evidencia. |
| cuantas-aves / biodiversidad en Reconocer | Después de ciencia comunitaria | Pregunta antes de los conteos, CampusExplorer íntegro en Conocer juntos. |
| universidad guiada por lo que debería existir | universidad centrada en aprendizaje | Diez posibilidades reveladas en grupos; sin imponer programas. |
| espacio-vacio | conocer-lugar | Pregunta abierta, sin asumir que el espacio se considera vacío. |
| capas / método en conocer-lugar | capas con preguntas y método oral | Evidencia vs investigación; evita una segunda lista de instrucciones. |
| antes / tesis | transformar | Una secuencia de tres revelaciones, sin moralina ni triple conclusión. |
| lugar-perdido | Dos pasos breves | Memoria con ejemplos hipotéticos, sin solicitar intimidad. |
| regreso / lo-pequeno | Mismos archivos de montaña y flor | Incluye historia en las capas del regreso; resolución del experimento. |
| cierre con segunda conclusión | cierre definitivo | Añade aprender sus historias; termina en «…si nunca supimos qué había ahí». |

Hashes heredados: espacio-vacio → conocer-lugar; antes / tesis / poder → transformar; poesia / bosque-poema → caminar. Se limita el paso al rango del destino.

## D. Video y créditos

Archivo encontrado: public/video/colibri_orejas_blancas.mp4, 66.028.197 bytes. MP4, HEVC Main 10, 2336×1080 codificados, rotación −90° (presentación vertical), aproximadamente 30 fps, HDR HLG/BT.2020. Duración 36,223 s. AAC estéreo, 48 kHz. El original se conserva sin modificar.

Copia de reproducción: public/video/colibri-presentacion.mp4, H.264, SDR BT.709, 500×1080, AAC estéreo; 16.081.083 bytes. Conversión con ffmpeg: rotación automática, zscale a luz lineal, tone mapping Hable, BT.709, escala a 1080 de altura, libx264 CRF 21, AAC 160 kbps, faststart. No se sustituyó el sonido ni se mezcló con el registro anterior.

Autor: expositor, grabación propia. Localidad: Cuajimalpa de Morelos. Especie: colibrí orejas blancas, Basilinna leucotis, confirmada por el expositor. No se presenta como identificación independiente. Uso autorizado por el autor para esta presentación; no se inventa licencia Creative Commons.

Fecha incrustada 2026-09-29T13:52:05Z y coordenadas +19.3471-099.3178/ conservadas en verification/colibri-original-metadata.json. Se distinguen de datos de campo confirmados.

Se reproduce primero el audio con imagen oculta. La revelación y la repetición arrancan el mismo archivo desde cero. M silencia también el video; replay no reactiva el sonido si está silenciado. Pausa, salida de escena y conclusión detienen la reproducción. La copia compatible y el original entran al cache automático que enumera public/dist; no requiere rutas hardcodeadas adicionales en el service worker.

## E. Evidencia pendiente

- Fotografía documental del lugar cercano y sus créditos.
- Observaciones/mediciones del lugar concreto: no se afirma que las preguntas sean hechos.
- Fecha de campo del video; la metadata se conserva como tal.
- Licencia pública del video sólo si se desea declarar una para redistribución. La integración solicitada ya está autorizada.

Las poesías no verificadas están fuera del recorrido y no bloquean esta versión. Detalle en ASSETS-PENDIENTES.md.

## F. Validación

Ver VERIFICACION.md y los JSON de verification. Se comprueba build, navegación, recorrido, medios, mute/replay, fullscreen, offline/cache, reduced motion, resoluciones, hashes, límites visuales y cierre. Se guardan capturas de los catorce temas solicitados, además de historias y el cerro.

Se corrigió durante la validación la normalización de hashes heredados cuando dos alias consecutivos apuntaban a la misma escena: ahora la URL también se actualiza aunque la escena no cambie.

## G. Tiempo de ensayo

| Acto | Minutos orientativos |
|---|---:|
| Mirar | 4 |
| Sentir | 4 |
| Habitar entre concreto | 5 |
| Reconocer | 5 |
| Conocer juntos | 5 |
| Conocer un lugar | 4 |
| Regresar | 3 |
| Total | 30 |

El preludio no consume tiempo de exposición. Las escenas van de 24 segundos a 3,5 minutos; no son mini-conferencias de un minuto. Reservar las respuestas de audiencia dentro de esas ventanas. La duración real depende del ensayo y la participación; ningún temporizador obliga a avanzar.
