# Destiny — oráculo de los dos gatos

Portal estático con HTML, CSS y JavaScript nativos. Al abrir solo aparece la ilustración centrada sobre negro. No requiere instalación ni servicios externos.

Abre index.html directamente o visita https://oprbguitar.github.io/yingcat/. GitHub Pages publica desde main y su raíz.

## Interacción

El gato blanco cuenta una historia favorable; el negro, una ficción sombría. Hover mueve solamente la cabeza recortada; clic o tap provoca una reacción antes de abrir el relato. Enter y espacio también activan cada gato. Escape, un toque fuera del panel o sobre la posición del gato cierran el relato, sin recargar.

Cinco pulsaciones rápidas en 1800ms interrumpen la reacción y muestran durante 2200ms: «¡Se ve que tienes mucho tiempo!!». Después vuelve la ilustración.

Todo el contenido es ficción literaria de entretenimiento, generado localmente. No ofrece diagnósticos ni certezas sobre sucesos reales. Los relatos tienen 100–220 palabras en español; el motor evita repeticiones consecutivas por gato y usa crypto.getRandomValues con fallback.

## Archivos

- index.html: ilustración original, máscaras SVG de cabeza y zonas curvas; diálogo y mensaje temporales.
- portal.css: tokens, estados, animaciones, lectura móvil y movimiento reducido.
- portal.js: Pointer Events y máquina de estados; un único relato activo, temporizadores cancelables y foco de teclado.
- predictions.js: fragmentos compatibles, estructuras narrativas y generador aleatorio sin red.
- tests/: pruebas del motor y de las interacciones en navegador.
- DESIGN.md: decisiones visuales y accesibilidad.

La imagen img/portal.png se conserva sin modificaciones. Las máscaras suavizan las uniones; una copia de la cabeza seleccionada se desplaza sobre la base estática. Debido al origen rasterizado, el efecto es aproximado, no una animación anatómica.

## Verificación

Motor: node --test tests/predictions.test.cjs.
Interfaz: node tests/portal.test.cjs. Esta prueba usa Playwright del runtime local de Codex y Edge instalado; fuera de ese entorno adapta la ruta require de Playwright.

No se agregaron dependencias de producción, APIs, fuentes remotas ni audio. Después de cargar los archivos no se realizan solicitudes para generar relatos.

El motor ofrece 8192 combinaciones (4096 por gato) con ocho estructuras narrativas. Pruebas exhaustivas: 100–220 palabras y ausencia de textos duplicados. Cobertura del motor: 99.19% líneas y 84% ramas.
En móviles pequeños el panel puede cubrir la ilustración. Se puede cerrar tocando el margen exterior o con un toque breve en la posición de cualquier gato, incluso bajo el panel. Desplazar el contenido, mantener el toque o seleccionar texto no lo cierra.

Actualización: Cerrar mensaje permanece visible mientras se desplaza el relato, también en móvil. Los párrafos combinan rojo/azul y fragmentos resaltados al azar; los relatos positivos tachan un fragmento completo. Cada toque sobre gato reproduce un miau sintetizado localmente con Web Audio (según disponibilidad de audio del navegador y volumen del dispositivo). story-presentation.js preserva el texto mediante nodos DOM seguros y cat-sound.js genera el sonido sin red. Prueba adicional: node tests/message.test.cjs.
