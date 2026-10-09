# Verificación final del pulido

Versión: 31 escenas, 111 pasos, siete actos, guía de 30 minutos.

| Prueba | Resultado |
|---|---|
| npm run build | PASS: TypeScript estricto, Vite y cache de 55 recursos |
| npm test | PASS: 5 pruebas de navegación y aliases |
| npm run test:e2e | PASS: recorrido de 31 escenas / 111 pasos, notas, hashes, controles, cierre |
| node tests/media.e2e.mjs | PASS: fullscreen, pasos internos, cinco audios decodificados y rangos offline |
| node tests/integrity.e2e.mjs | PASS: 34 archivos de manifest, 222 posiciones visuales, 6 aliases, tiempos y fullscreen de video |
| 1920×1080 / 1366×768 | Sin overflow de documento ni elementos de texto/controles fuera de viewport en los pasos examinados |
| Video del colibrí | Audio con imagen oculta, revelación, nombres, replay desde cero, mute global conservado, pausa y parada al salir |
| Offline | Recarga del shell, reproducción real del video, mapa local y respuestas 206 para rangos del MP4 |
| Reduced motion | Recorrido y video probados con preferencia reduce; prueba adicional del video con no-preference |
| Audiencia / evidencia | Sin marcadores editoriales ni frases retiradas en el recorrido; capas sólo POR INVESTIGAR |
| Cierre | Última escena, última frase correcta, sin avance posterior ni audio |

Resultados de máquina: verification/results.json, verification/media-results.json, verification/integrity-results.json. Secuencia: verification/sequence.json.

Capturas nuevas: verification/pulido-20261009, 38 PNG (18 encuadres por cada resolución, más apertura y cierre), y contact-sheet.jpg para revisión. Incluyen Kailash, Iztaccíhuatl, físico/vivido, miedo, ciudad, cerro, terceros lugares, goce, colibrí, resolución, historias, CampusExplorer, ciencia comunitaria, lugar/capas, regreso, flor y cierre. Revisadas visualmente en hoja de contacto; video y capas también a resolución completa.

Errores encontrados y corregidos: el cambio entre dos hashes heredados dirigidos a la misma escena podía dejar el alias en la URL. Se normaliza ahora en cada hashchange y hay regresión automatizada. La compilación necesitó ejecución fuera del aislamiento por acceso de esbuild a directorios padres; terminó correctamente. Se reutilizó el servidor existente en 4173.

Límites: pruebas ejecutadas en Chromium local; no certifican todos los navegadores o dispositivos. La duración oral requiere ensayo. El audio real fue comprobado por presencia de pista, decodificación/reproducción y controles; no se afirma identificar cada sonido del ambiente. La foto y evidencia del predio siguen pendientes y no se sustituyen por datos del radio del campus.

Original del video preservado; SHA-256: 96C32E6ECB4C187DF02CDAC105BF89B2096EA0368E52FD15869F15D819D00069.
