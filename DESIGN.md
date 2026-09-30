# Dirección visual — oráculo local

Experience: imagen centrada en negro puro al inicio; relato como única superficie temporal de lectura. Se mantiene la identidad existente.
Se consideraron relato en columna lateral, texto sobre la ilustración y panel central; se elige el panel central por el encargo y la legibilidad móvil. El selector tipográfico/magenta no corresponde al negro puro solicitado.

Tokens previos a la implementación: negro #000, texto #e8e5df, panel rgba(12,12,12,.9); serif Georgia local para lectura; ancho 680px; texto 17–20px; interlineado 1.65; escala de espacio 8/16/24/32px; sin borde ni sombra. Blanco 650ms, negro 520ms, entrada relato 500/350ms, cierre 180ms, mensaje 2200ms. Easing cubic-bezier(.22,1,.36,1).

Capas raster idénticas con máscaras de cabeza suavizadas y relativas al viewBox. Zonas curvas existentes se conservan. Hover solo con mouse y movimiento de cabeza; sin recoloración. Reduced motion elimina transformaciones y usa opacidad.
Estados explícitos: idle, white-hover, black-hover, white-react, black-react, story-opening, story-visible, story-closing, easter-egg. Sin apilar relatos. Cinco pointerdowns en 1800ms interrumpen el flujo.
Accesibilidad: teclado, foco visible en silueta, diálogo con nombre español y foco de lectura, Escape, cierre exterior, restauración de foco. Panel desplazable internamente; sin scroll de la página. Responsive 360/768/1280/1600px.
Sin APIs, tipografías remotas, dependencias añadidas, sonidos ni destellos. Los relatos son ficción literaria, no diagnósticos ni certezas sobre el futuro real.

Refinamiento: el relato incorpora párrafos alternados rojo claro #ff9797 y azul #8abfff, con contraste sobre negro, frases resaltadas y un fragmento tachado en relatos positivos. Acción Cerrar mensaje siempre accesible al pie del panel; solo el texto tiene scroll. Miau local sintetizado tras gesto explícito, sin autoplay ni red. La portada inicial permanece intacta.

Variedad editorial: mensajes conversacionales breves de 50–95 palabras; panel máximo 62% del alto en desktop y 70% en móvil, con scroll interno si hace falta. Algunas letras muestran brillo, pulso lento (dos ciclos) o fractura ligera; nunca destellos rápidos. Reduced motion elimina pulso e inclinación. Finales literarios ocasionalmente interrumpidos, conservando ficción y sin enlace de contacto inventado.
