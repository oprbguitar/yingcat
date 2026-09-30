# Dirección visual

Modo experience: ilustración única sobre negro puro, centrada, sin texto ni decoración.
El selector propone portada tipográfica y paleta hielo/magenta; se descartan porque contradicen el encargo explícito.
Se consideraron capas recortadas, máscara suavizada y movimiento de imagen completa. Se elige el fallback autorizado: el pelaje y los bigotes cruzan la unión y duplicar el raster dejaría contornos estáticos visibles al desplazar una copia.

Tokens: fondo #000; tamaño desktop min(78vmin,850px), móvil min(92vmin,700px); separación 0; forma sin marco; tipografía no aplicable; movimiento blanco 1100ms, negro 680ms; easing cubic-bezier(.22,1,.36,1).
Zonas curvas proporcionales siguen la unión de las siluetas, con acceso mediante mouse, touch y teclado. Solo el cursor cambia en hover. El foco de teclado usa la propia silueta, sin elemento adicional.
Responsive a 360, 768, 1280 y 1600px. Reduced motion: respuesta de 160ms y desplazamiento máximo 0.5px. No hay animación ambiental, scroll ni cambios de layout.
