(function (root) {
  'use strict';

  // Each structure has its own cause and turning point. The other fragments
  // refer to that same sequence without inventing conflicting people or objects.
  const structures = {
    white: [
      ['Esta pequeña fábula empieza con una carta olvidada entre papeles. Al abrirla, una invitación antigua vuelve a parecer posible. La rutina estaba dejando poco espacio para descansar, pero una tarde libre permite responder sin prisa y escuchar una propuesta diferente.', 'La respuesta abre una puerta que parecía cerrada. Una conversación sencilla convierte la invitación en un plan realizable.'],
      ['En esta historia, un viaje corto empieza con una demora. En lugar de perder toda la mañana, el personaje encuentra un lugar tranquilo y conversa con alguien que también esperaba. El encuentro cambia el sentido de una salida aparentemente inútil.', 'Una recomendación permite retomar el camino con menos gastos y descubrir un destino cercano que nadie había considerado.'],
      ['El relato comienza cuando una tarea pendiente por fin recibe atención. No hay entusiasmo inmediato: primero aparecen dudas, cansancio y una carpeta desordenada. Sin embargo, separar lo urgente de lo importante deja espacio para una solución que estaba a la vista.', 'Al compartir el primer resultado, llega una colaboración concreta. El proyecto avanza por pasos pequeños y el esfuerzo empieza a rendir.'],
      ['Una reunión familiar inaugura esta fábula con un silencio incómodo. La mesa reúne recuerdos distintos y nadie encuentra las palabras adecuadas. Un comentario sobre una receta antigua rompe la tensión y permite hablar de lo cotidiano antes de tocar asuntos difíciles.', 'Una disculpa sin adornos cambia la conversación. No resuelve el pasado completo, pero permite acordar un encuentro más tranquilo.'],
      ['La historia nace con el hallazgo de un objeto guardado hace años. Su valor no parece económico, aunque trae una idea olvidada. El personaje empieza a investigar por curiosidad y descubre que todavía puede aprender algo sin cambiar toda su vida.', 'Esa curiosidad termina en una habilidad útil. Al practicar sin exigirse perfección, aparece una ocasión para compartirla y recibir apoyo.'],
      ['En esta fábula, una mañana agotadora obliga a bajar el ritmo. El personaje deja una obligación secundaria para después y sale a caminar. La pausa no ofrece milagros: simplemente permite ordenar pensamientos y reconocer una preocupación que podía conversar con alguien.', 'Pedir compañía cambia el peso del día. Una sugerencia práctica devuelve margen para decidir y recuperar una rutina más amable.'],
      ['Este relato se abre con una compra aplazada. Antes de pagar, el personaje revisa sus prioridades y descubre que la urgencia era menor de lo que parecía. Esa pequeña espera permite comparar opciones y recordar una conversación que había quedado pendiente.', 'Una consulta oportuna revela una alternativa mejor. El ahorro deja espacio para un plan compartido y una sorpresa sencilla.'],
      ['Una coincidencia inicia esta historia: dos personas llegan al mismo sitio por motivos diferentes. La primera iba a resolver una gestión; la segunda buscaba orientación. Mientras esperan, descubren un interés común que hace más ligera una mañana de trámites.', 'El encuentro continúa con una propuesta modesta. Ambas personas cumplen lo acordado y la confianza crece a partir de hechos concretos.']
    ],
    black: [
      ['En esta ficción sombría, una carta aparece bajo una puerta que llevaba semanas cerrada. Nadie recuerda haberla esperado. El personaje intenta continuar con sus obligaciones, pero las palabras del sobre vuelven durante cada pausa, como una advertencia escrita para otra persona.', 'Al buscar una explicación, encuentra versiones incompatibles. Cada respuesta exige otra llamada y el asunto empieza a consumir el día.'],
      ['Este relato oscuro empieza con un viaje demorado. El último vehículo sale antes de tiempo y la estación queda casi vacía. El personaje conserva un pasaje que ya no sirve mientras una voz distante anuncia destinos que nadie parece dispuesto a visitar.', 'Un cambio de ruta obliga a pagar más y llegar tarde. La persona que debía esperar deja de responder.'],
      ['En esta historia de ficción, una tarea olvidada vuelve durante la noche. La fecha ya pasó y el personaje abre una carpeta donde faltan documentos. Un trabajo que parecía seguro empieza a depender de mensajes ambiguos y promesas hechas por otras personas.', 'La explicación llega demasiado tarde. Alguien niega el acuerdo anterior y el esfuerzo acumulado queda suspendido en una conversación fría.'],
      ['La fábula sombría empieza en una reunión donde falta una silla. Nadie menciona la ausencia al principio. Los platos siguen pasando, aunque una frase accidental abre una discusión antigua y convierte los recuerdos familiares en pruebas de versiones que ya no encajan.', 'Una noticia agrava el silencio. La reunión termina antes de tiempo y cada persona se lleva una explicación distinta.'],
      ['En este relato, un objeto desaparece justo cuando parecía indispensable. El personaje revisa cajones y bolsillos hasta encontrar una fotografía que no recordaba. La búsqueda se vuelve extraña: cada lugar familiar parece guardar una ausencia pequeña que antes había pasado inadvertida.', 'El objeto no regresa. En su lugar aparece un mensaje incompleto y la sospecha empieza a ocupar el espacio de los hechos.'],
      ['Esta ficción comienza con una madrugada de cansancio y lluvia. El personaje intenta sostener su rutina, pero una llamada interrumpe el primer descanso. No hay un diagnóstico ni una certeza: solamente una inquietud que convierte los ruidos de la casa en preguntas.', 'Cancelar un compromiso provoca reproches. Una conversación pendiente se aplaza otra vez y el día pierde sus puntos de apoyo.'],
      ['El relato se oscurece alrededor de una oferta demasiado oportuna. El personaje entrega una pequeña suma para reservar algo prometido y guarda el comprobante. Cuando vuelve a consultar, la dirección ha cambiado y el nombre de contacto parece no pertenecer a nadie.', 'Recuperar el dinero exige trámites interminables. Quien recomendó la oferta se distancia y deja preguntas sin respuesta.'],
      ['En la versión más sombría de esta ficción, una coincidencia reúne dos noticias malas en la misma tarde. El personaje atraviesa una calle donde cierran temprano y descubre una corona de flores frente a una casa. La escena parece anunciar el final de una época.', 'Un funeral ajeno atraviesa el relato como una sombra. Los planes cotidianos se interrumpen y una despedida queda sin palabras.']
    ]
  };

  const developments = {
    white: [
      'El movimiento también alcanza el trabajo: un pendiente se aclara y permite organizar mejor la semana. Un pago pequeño llega a tiempo para cubrir un gasto previsto, sin convertir la calma en una promesa de abundancia.',
      'La nueva situación ayuda a revisar las cuentas con serenidad. Una cantidad recuperada permite resolver un gasto doméstico, mientras una conversación laboral ofrece una tarea concreta y un plazo que por fin resulta razonable.',
      'Al ordenar los siguientes pasos, el personaje encuentra una oportunidad de trabajo que puede explorar sin abandonar sus responsabilidades. El presupuesto sigue siendo limitado, pero una decisión prudente evita un gasto innecesario y devuelve tranquilidad.',
      'Las consecuencias llegan a la rutina diaria: queda tiempo para descansar mejor y terminar una gestión pendiente. Una ayuda práctica reduce los gastos del mes y permite dedicar atención a algo que llevaba demasiado tiempo esperando.'
    ],
    black: [
      'El problema también alcanza el trabajo: un pendiente se complica y altera la semana. Un cobro inesperado reduce el margen de las cuentas, mientras la explicación más sencilla empieza a parecer insuficiente frente a tantos retrasos.',
      'La situación obliga a revisar las cuentas durante la noche. Una suma que parecía disponible ya no alcanza para un gasto doméstico, y una conversación laboral termina con un plazo imposible que nadie acepta discutir.',
      'Al intentar ordenar los siguientes pasos, el personaje encuentra otra oportunidad que se cierra antes de responder. El presupuesto se estrecha y una decisión apresurada convierte una dificultad pequeña en una cadena de obligaciones.',
      'Las consecuencias invaden la rutina: el descanso se interrumpe y una gestión pendiente exige regresar varias veces. Cada viaje cuesta un poco más, mientras la solución prometida cambia de fecha sin ofrecer una razón convincente.'
    ]
  };

  const connections = {
    white: [
      'Una amistad escucha sin juzgar y ayuda a elegir el siguiente paso. El afecto aparece en acciones pequeñas: acompañar, cumplir una hora y recordar algo que importaba.',
      'Al contar lo ocurrido en casa, aparece una colaboración inesperada. Repartir una preocupación permite recuperar una conversación cariñosa y preparar un momento juntos, sin exigir que todo salga perfecto.',
      'Una persona nueva aporta una mirada distinta y respeta los límites del personaje. La confianza nace despacio, mientras una relación cercana encuentra espacio para hablar con más honestidad.',
      'El personaje decide responder a alguien que extrañaba. El intercambio no borra las diferencias, pero deja una invitación abierta y un gesto de cariño que cambia el ánimo.'
    ],
    black: [
      'Una amistad responde con evasivas y deja al personaje sin compañía. El afecto se vuelve una lista de mensajes vistos, horarios incumplidos y explicaciones que llegan cuando ya no sirven.',
      'Al contar lo ocurrido en casa, aparece una discusión que llevaba tiempo esperando. Cada palabra despierta otra deuda y el silencio final pesa más que el problema inicial.',
      'Una persona nueva ofrece ayuda, pero su versión cambia demasiado. La confianza empieza a resquebrajarse mientras una relación cercana interpreta la distancia como una ofensa que nadie sabe reparar.',
      'El personaje escribe a alguien que extrañaba y recibe una despedida breve. La respuesta cierra una posibilidad, dejando una habitación silenciosa y una conversación que ya no tendrá continuación.'
    ]
  };

  const endings = {
    white: [
      'Al terminar esta fábula, nada es perfecto, pero las piezas encuentran su lugar. La ganancia más duradera es una confianza tranquila: el próximo paso ya no parece tan lejano.',
      'El desenlace reúne esas pequeñas mejoras en una tarde serena. Queda trabajo por hacer, aunque el personaje descubre que puede avanzar acompañado y disfrutar lo conseguido sin adelantarse al mañana.',
      'La historia cierra con una invitación sencilla y una preocupación menos. Lo favorable no llega como un milagro, sino como la suma de decisiones, encuentros y cuidados que empiezan a dar fruto.',
      'Cuando cae la noche, el personaje guarda un recuerdo amable de lo ocurrido. La oportunidad sigue abierta y el relato deja una sensación cálida: todavía hay caminos que merecen explorarse.'
    ],
    black: [
      'El relato termina sin resolver la última pregunta. En la casa queda una luz encendida y un teléfono inmóvil; afuera, alguien repite una frase que el personaje había guardado en secreto, aunque nunca debió conocerla.',
      'La historia cierra con una puerta que ya no vuelve a abrirse. No hay consuelo inmediato: solamente el eco de los pasos y la certeza literaria de que una etapa ha quedado atrás.',
      'En el último tramo de esta ficción, una pérdida inesperada vacía los planes. El personaje conserva un recuerdo sin dueño y comprende que algunas despedidas llegan antes que cualquier explicación.',
      'El final deja una coincidencia imposible sobre la mesa. Todo parece haberse detenido, pero un ruido al otro lado de la pared devuelve la inquietud: quizá el relato todavía no ha terminado.'
    ]
  };

  // Eight reading structures vary when consequences, support and the turn arrive.
  const templates = [
    (opening, turn, practical, relationship, ending) => [opening, `${turn} ${practical} ${relationship}`, ending],
    (opening, turn, practical, relationship, ending) => [opening, `${practical} ${relationship} ${turn}`, ending],
    (opening, turn, practical, relationship, ending) => [opening, `${practical} ${turn} ${relationship}`, ending],
    (opening, turn, practical, relationship, ending) => [opening, `${relationship} ${turn} ${practical}`, ending],
    (opening, turn, practical, relationship, ending) => [opening, `${relationship} ${practical} ${turn}`, ending],
    (opening, turn, practical, relationship, ending) => [opening, `${turn} ${relationship} ${practical}`, ending],
    (opening, turn, practical, relationship, ending) => [`${opening} ${turn}`, `${practical} ${relationship}`, ending],
    (opening, turn, practical, relationship, ending) => [opening, `${practical} ${relationship}`, `${turn} ${ending}`]
  ];

  let previousIds = Object.freeze({ white: null, black: null });

  function secureRandomIndex(array) {
    if (!Array.isArray(array) || array.length === 0) throw new TypeError('Random collection must not be empty');
    if (root.crypto && typeof root.crypto.getRandomValues === 'function') {
      const value = new Uint32Array(1);
      const ceiling = 4294967296 - (4294967296 % array.length);
      for (let attempt = 0; attempt < 8; attempt += 1) {
        root.crypto.getRandomValues(value);
        if (value[0] < ceiling) return value[0] % array.length;
      }
    }
    return Math.floor(Math.random() * array.length);
  }

  function generateStory(cat) {
    if (cat !== 'white' && cat !== 'black') throw new TypeError('Unknown cat');
    const total = structures[cat].length * 64 * templates.length;
    let combination = secureRandomIndex(Array.from({ length: total }));
    if (combination === previousIds[cat]) combination = (combination + 1) % total;
    previousIds = Object.freeze({ ...previousIds, [cat]: combination });
    const structure = structures[cat][Math.floor(combination / 64) % structures[cat].length];
    const development = developments[cat][Math.floor(combination / 16) % 4];
    const connection = connections[cat][Math.floor(combination / 4) % 4];
    const ending = endings[cat][combination % 4];
    return {
      id: `${cat.toUpperCase()}-${String(combination + 1).padStart(4, '0')}`,
      text: templates[Math.floor(combination / 512)](structure[0], structure[1], development, connection, ending).join('\n\n')
    };
  }

  const api = Object.freeze({ generateStory, secureRandomIndex });
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (root.window) root.window.Predictions = api;
  else root.Predictions = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);



