# Destiny — portal inicial

Abre `index.html` directamente en un navegador. No requiere instalación, compilación ni conexión a Internet.

HTML, CSS y JavaScript nativos. La única imagen visible es `img/portal.png`, intacta, centrada sobre negro. Las dos zonas SVG transparentes siguen las siluetas y responden al clic, tap, Enter o espacio.

Blanco: respiración suave de 1100ms. Negro: reacción breve de 680ms. Cada pulsación reinicia la respuesta; al terminar se elimina la transformación. Se respeta la preferencia de movimiento reducido.

Se utiliza el fallback solicitado: se anima la ilustración completa según el gato pulsado. Dado que el pelaje y los bigotes se cruzan y la base es una imagen fusionada, mover copias recortadas sobre una base estática produciría bordes duplicados. No se modificó la imagen ni se incorporaron dependencias.

La dirección visual y las excepciones al selector se documentan en DESIGN.md. Alcance: exclusivamente pantalla inicial.

Validación: navegador Edge mediante Playwright a 360/768/1280/1600px; centrado y ausencia de scroll; ambas zonas y reinicio por clic; retorno sin transform; teclado; touch; movimiento reducido de 160ms; sin errores de JavaScript. Auditoría design-lint: APROBADO, puntaje 0.

Portal público: https://oprbguitar.github.io/yingcat/
Publicación: GitHub Pages desde la raíz de la rama main. Los cambios enviados a main actualizan el portal automáticamente.
