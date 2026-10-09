# Entre concreto: una flor y un canto

Naturaleza, asombro y el derecho a disfrutar del mundo.

Presentación existente actualizada en React + Vite + TypeScript. Conserva navegación por pasos, hash, notas del expositor, fuentes locales, audio compartido, video, preferencias, movimiento reducido y copia offline.

## Abrir

- Ejecutar `Iniciar-presentacion.ps1` o `node scripts/serve.mjs` y abrir http://127.0.0.1:4173.
- Desarrollo: `npm run dev`.
- Compilar y generar service worker: `npm run build`.
- Pruebas unitarias: `npm test`.
- Prueba integral: `npm run test:e2e` con la versión compilada servida en 4173. Usa Chromium instalado en el equipo; puede definirse `PLAYWRIGHT_CHROMIUM_EXECUTABLE` para otro ejecutable.
- Pruebas adicionales de medios: `node tests/media.e2e.mjs`.

## Controles

→ / Espacio: avanzar; ←: regresar; ↓ / ↑: pasos internos; Home / End: primera / última escena; 1–7: actos; F: pantalla completa; M: sonido; P: notas; I: índice; H: ocultar controles; ?: ayuda. La proyección empieza sin controles, números ni indicadores de pasos. H o doble clic muestran/ocultan las herramientas; S abre preferencias y R las fuentes. Pasar el cursor no revela los controles.

El sonido requiere activación deliberada. Los silencios detienen inmediatamente cualquier pista anterior. El cierre no tiene música ni avance automático. Las notas se muestran en la misma pantalla: no son una ventana privada de segunda pantalla.

## Sin conexión

En Preferencias, elegir **Preparar copia sin conexión** y esperar la confirmación. El servidor local puede servir `dist` sin Internet. No abrir `index.html` con `file://`: usar el lanzador. Las referencias externas necesitan conexión; las fotografías, fuentes, video, sonidos y datos mostrados están incluidos.

## Contenido y datos

- `src/data/presentation.ts`: 35 escenas, 130 pasos, siete actos y notas.
- `src/data/biodiversity.ts`: centro, selección de registros y configuración del ave.
- `src/data/campus-explorer.json`: capturas reales de Islas Vivas (aves_zona), radios y registros con distancia. El enlace al explorador requiere la app en localhost:3011; las capturas funcionan offline.
- `src/data/local-observations.json`: ocho especies documentadas y sus fuentes.
- `src/data/local-bird.json`: foto y vocalización del colibrí orejas blancas.
- `public/bibliography/radius-counts.json`: conteos y consultas exactas de iNaturalist.
- `src/data/places.ts`: imagen opcional del espacio cercano y capas observadas/por investigar.
- `src/data/poems.ts`: verificación editorial de poemas y citas.
- `public/bibliography/media.json`: autorías, licencias y rutas de medios.
- `src/data/archive/presentation.ts`: las 30 escenas originales intactas; notas complementarias accesibles desde Bibliografía.

No sustituir la foto del espacio cercano por una imagen de otro terreno. Los radios parten del centro de UAM Cuajimalpa utilizado por el proyecto aves_zona: 19.3525, −99.2824. No convertir los conteos históricos en afirmaciones de presencia actual.

Ver **ACTUALIZACION.md** para el informe completo, **INVENTARIO-NARRATIVO.md** para las decisiones previas y **ASSETS-PENDIENTES.md** para el material editorial pendiente.
