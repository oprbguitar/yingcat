# Destiny — oráculo de los dos gatos

Portal estático con HTML, CSS y JavaScript nativos. Al abrir solo aparece la ilustración centrada sobre negro. No requiere instalación ni servicios externos.

Abre index.html directamente o visita https://oprbguitar.github.io/yingcat/. GitHub Pages publica desde main y su raíz.

## Interacción

El gato blanco cuenta una historia favorable; el negro, una ficción sombría. Hover mueve solamente la cabeza recortada; clic o tap provoca una reacción antes de abrir el relato. Enter y espacio también activan cada gato. Escape, un toque fuera del panel o sobre la posición del gato cierran el relato, sin recargar.

Cinco pulsaciones rápidas en 1800ms interrumpen la reacción y muestran durante 2200ms: «¡Se ve que tienes mucho tiempo!!». Después vuelve la ilustración.

Todo el contenido es ficción literaria de entretenimiento, generado localmente. No ofrece diagnósticos ni certezas sobre sucesos reales. Los relatos tienen 25–140 palabras en español; el motor evita repeticiones consecutivas por gato y usa crypto.getRandomValues con fallback.

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

No se agregaron dependencias de producción, APIs ni fuentes remotas. Después de cargar los archivos no se realizan solicitudes para generar relatos.

El motor combina aperturas conversacionales, escenas, consecuencias, vínculos y finales. Evita repetir tanto el relato como la apertura inmediata por gato. Las pruebas comprueban longitud, variedad y tono de ficción.
En móviles pequeños el panel puede cubrir la ilustración. Se puede cerrar tocando el margen exterior o con un toque breve en la posición de cualquier gato, incluso bajo el panel. Desplazar el contenido, mantener el toque o seleccionar texto no lo cierra.

Actualización: Cerrar mensaje permanece visible mientras se desplaza el relato, también en móvil. Los párrafos combinan rojo/azul y fragmentos resaltados al azar; los relatos positivos tachan un fragmento completo. Cada toque sobre gato reproduce un miau sintetizado localmente con Web Audio (según disponibilidad de audio del navegador y volumen del dispositivo). story-presentation.js preserva el texto mediante nodos DOM seguros y cat-sound.js genera el sonido sin red. Prueba adicional: node tests/message.test.cjs.

El panel ocupa como máximo 62% del alto en desktop y 70% en móvil. Algunas letras al azar reciben brillo, un pulso lento de dos ciclos o una leve fractura visual. Se conserva el texto y el modo de movimiento reducido elimina el pulso. Prueba: node tests/variety.test.cjs.


Catálogo modular con doce aperturas, ocho estructuras, longitud breve/media/larga e intensidad normal/extrema. No repite el texto, la apertura ni la categoría de longitud inmediatamente por gato. Cobertura del motor: 99.44% líneas y 89.19% ramas; once pruebas unitarias.

Cada mensaje cambia paleta, fondo del panel, tipografía local y tamaño, sin repetir inmediatamente cada atributo. Se mantienen contraste y scroll interno. Gato blanco: miau suave; gato negro: grito de protesta sintetizado más agudo y áspero, con volumen moderado. Verificación: node tests/appearance.test.cjs.

Voz del oráculo: todos los mensajes te hablan directamente, sin introducirlos como ficción, relato o historia. Algunas variantes incorporan microanécdotas épicas de superación con personajes inventados; son recursos literarios, no testimonios ni citas atribuidas a personas reales. Los mensajes oscuros mantienen posibilidades y lenguaje figurado, sin diagnósticos ni afirmaciones ciertas sobre muerte, engaños o sucesos personales. El panel se acomoda suavemente al aparecer y el texto entra por párrafos; reduced motion elimina esas animaciones. Verificación adicional: node tests/motion.test.cjs.
