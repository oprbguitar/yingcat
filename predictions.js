(function (root) {
  'use strict';

  const openings = {
    white: [
      'Imagínate que lo mejor llega cuando dejas de mirar el reloj.',
      '¿En serio crees que esa pequeña demora no puede favorecerte?',
      'Hubo un momento en que casi dijiste que no. Casi.',
      'Y si esa casualidad tuviera una segunda intención bastante amable…',
      'A ver, piensa en aquello que habías dado por perdido.',
      'No te rías todavía: la suerte también llega despeinada.',
      'Quizá esta fábula empieza justo donde termina tu paciencia.',
      '¿Te acuerdas de ese plan que siempre dejabas para después?',
      'Supón que una mañana corriente decide regalarte algo distinto.',
      'Mira qué curioso: no todo lo inesperado viene a complicarte.',
      'Hay días que parecen pequeños hasta que alguien los cambia.',
      'Vamos a imaginar una buena noticia llegando por el camino largo.'
    ],
    black: [
      'Imagínate que la puerta se cierra antes de escuchar la explicación.',
      '¿En serio crees que ese silencio significa que todo marcha bien?',
      'Hubo un momento en que aún podías volver. Ya pasó.',
      'Y si aquella coincidencia fuera la primera de una larga sombra…',
      'A ver, piensa en lo que nadie quiso decirte de frente.',
      'No mires atrás todavía: esta fábula apenas está tomando aire.',
      'Quizá lo inquietante sea que nadie parece sorprendido por lo ocurrido.',
      '¿Te acuerdas de la promesa que parecía demasiado fácil de cumplir?',
      'Supón que una mañana corriente pierde su última salida disponible.',
      'Mira qué curioso: el reloj sigue andando, pero nadie llega.',
      'Hay días que empiezan torcidos y encuentran cómo doblarse más.',
      'Vamos a imaginar que la mala noticia conoce primero tu dirección.'
    ]
  };

  const scenarios = {
    white: [
      ['Tras una preocupación, una carta olvidada devuelve una invitación que parecía vencida.', 'Responder abre una puerta pequeña, aunque todavía queda tiempo para cruzarla.'],
      ['Un viaje demorado reúne a dos desconocidos bajo el mismo techo.', 'Conversar descubre un camino cercano que ninguno había considerado antes.'],
      ['Una tarea pendiente aparece entre papeles que ibas a desechar.', 'Revisarla revela una solución sencilla, escondida detrás de tanta prisa.'],
      ['Una reunión familiar empieza con recuerdos distintos y silencios incómodos.', 'Una disculpa sincera permite sentarse juntos sin resolverlo todo hoy.'],
      ['Tras una preocupación, un objeto encontrado despierta una curiosidad que llevaba años dormida.', 'Seguir esa pista recupera una habilidad que todavía puede ser útil.'],
      ['Una mañana cansada invita a caminar antes de seguir trabajando.', 'La pausa ordena pensamientos y deja escuchar una propuesta sin apuro.'],
      ['Una compra aplazada obliga a revisar prioridades antes de pagar.', 'Esperar revela una alternativa mejor y una razón para respirar tranquilo.'],
      ['Una demora en una gestión reúne a dos personas con un interés común.', 'El encuentro deja una propuesta concreta y ganas de volver a conversar.']
    ],
    black: [
      ['En esta ficción, una carta aparece bajo una puerta abandonada.', 'Buscar explicaciones devuelve versiones incompatibles y una pregunta que nadie responde.'],
      ['En esta ficción, un viaje termina en una estación vacía.', 'La última salida desaparece del tablero mientras la lluvia borra el camino.'],
      ['En esta ficción, una tarea olvidada regresa después del plazo.', 'La carpeta incompleta convierte las promesas anteriores en palabras sin dueño.'],
      ['En esta ficción, una reunión familiar deja una silla vacía.', 'Una noticia interrumpe la mesa y nadie logra terminar su explicación.'],
      ['En esta ficción, un objeto desaparece del sitio de siempre.', 'Buscarlo descubre una fotografía desconocida y otra ausencia que parecía imposible.'],
      ['En esta ficción, una llamada interrumpe una madrugada sin descanso.', 'Responder deja una inquietud persistente, sin diagnóstico ni certeza que la explique.'],
      ['En esta ficción, una oferta exige pagar antes de preguntar.', 'El comprobante permanece, pero la dirección prometida ya no existe.'],
      ['En esta ficción, una corona de flores bloquea una entrada.', 'Un funeral ajeno atraviesa la tarde y vuelve irreconocibles los planes.']
    ]
  };

  const consequences = {
    white: [
      'Un pago pendiente llega a tiempo y permite ordenar las cuentas sin apuro.',
      'En el trabajo, una gestión se aclara y devuelve margen para elegir mejor.',
      'Un gasto innecesario desaparece y queda tiempo para descansar con menos preocupaciones.',
      'Una oportunidad modesta permite avanzar sin abandonar lo que ya estaba funcionando.'
    ],
    black: [
      'Un cobro inesperado vacía las cuentas y deja otro compromiso imposible de cumplir.',
      'En el trabajo, alguien niega lo acordado y devuelve toda la responsabilidad.',
      'Cada gestión exige regresar otra vez; el dinero termina antes que los trámites.',
      'Una oportunidad se cierra mientras otra preocupación reclama el tiempo que quedaba.'
    ]
  };

  const connections = {
    white: [
      'Una amistad escucha, acompaña y encuentra la forma de compartir ese peso.',
      'En casa, repartir las preocupaciones devuelve una conversación cariñosa que hacía falta.',
      'Alguien nuevo cumple lo prometido y deja una confianza pequeña, pero firme.',
      'Un mensaje cercano trae una invitación sencilla y ganas de volver a encontrarse.'
    ],
    black: [
      'Una amistad responde con evasivas; después, ni siquiera queda ese refugio imperfecto.',
      'En casa, una discusión antigua vuelve y nadie recuerda cómo detenerla.',
      'Alguien nuevo cambia su versión; la confianza se rompe antes de empezar.',
      'Un mensaje cercano contiene una despedida; la habitación parece agrandarse de golpe.'
    ]
  };

  const endings = {
    white: [
      'La fábula deja una certeza pequeña: esta vez sí había otro camino.',
      'Nada queda perfecto. Pero la noche encuentra una preocupación menos.',
      'Lo que faltaba por escribir… empieza con una sonrisa compartida.',
      'Y entonces… se abre algo bueno. El resto puede esperar.'
    ],
    black: [
      'Y entonces… Se acabó. El silencio ocupa todo lo que quedaba.',
      'Lo que faltaba por escribir… quedó al otro lado de la puerta.',
      'La fábula termina. Alguien sigue llamando desde una habitación vacía.',
      'Todo se detiene, salvo aquel ruido. Nadie se atreve a contestar.'
    ]
  };

  const templates = [
    (opening, scene, turn, practical, relationship, ending) => [`${opening} ${scene}`, `${turn} ${practical} ${relationship}`, ending],
    (opening, scene, turn, practical, relationship, ending) => [`${opening} ${scene}`, `${practical} ${relationship} ${turn}`, ending],
    (opening, scene, turn, practical, relationship, ending) => [`${opening} ${scene}`, `${practical} ${turn} ${relationship}`, ending],
    (opening, scene, turn, practical, relationship, ending) => [`${opening} ${scene}`, `${relationship} ${turn} ${practical}`, ending],
    (opening, scene, turn, practical, relationship, ending) => [`${opening} ${scene}`, `${relationship} ${practical} ${turn}`, ending],
    (opening, scene, turn, practical, relationship, ending) => [`${opening} ${scene}`, `${turn} ${relationship} ${practical}`, ending],
    (opening, scene, turn, practical, relationship, ending) => [`${opening} ${scene} ${turn}`, `${practical} ${relationship}`, ending],
    (opening, scene, turn, practical, relationship, ending) => [`${opening} ${scene}`, `${practical} ${relationship}`, `${turn} ${ending}`]
  ];
  const intensityTurns = {
    white: 'Un triunfo inesperado trae alegría desbordante: hasta lo imposible parece abrirse.',
    black: 'La escena se vuelve macabra: un funeral sin nombre borra toda esperanza.'
  };
  const extensions = {
    white: 'Después, una conversación permite reconocer cuánto había pesado aquella preocupación. No hace falta resolver la vida entera: basta con disfrutar ese respiro, aceptar compañía y reservar una tarde para lo que importa. El personaje mira alrededor y descubre que también puede recibir sin sentirse en deuda.',
    black: 'Después, una conversación permite reconocer cuánto había crecido aquella sombra. Nadie ofrece una respuesta firme: las versiones se contradicen, las habitaciones parecen más frías y el camino de regreso pierde sus señales. El personaje mira alrededor y descubre que incluso las voces conocidas suenan demasiado lejos.'
  };
  const lengths = ['short', 'medium', 'long'];
  const combinations = Array.from({ length: 12 * 8 * 4 * 4 * 4 * 8 });
  let previousIds = Object.freeze({ white: null, black: null });
  let previousLengths = Object.freeze({ white: null, black: null });
  let previousOpenings = Object.freeze({ white: null, black: null });

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
    let combination = secureRandomIndex(combinations);
    let lengthIndex = combination % lengths.length;
    if (lengthIndex === previousLengths[cat]) lengthIndex = (lengthIndex + 1) % lengths.length;
    previousLengths = Object.freeze({ ...previousLengths, [cat]: lengthIndex });
    const length = lengths[lengthIndex];
    const intensity = Math.floor(combination / 3) % 2 ? 'extreme' : 'normal';
    let openingIndex = combination % 12;
    if (openingIndex === previousOpenings[cat]) {
      openingIndex = (openingIndex + 1) % 12;
      combination = Math.floor(combination / 12) * 12 + openingIndex;
    }
    if (combination === previousIds[cat]) combination = (combination + 12) % combinations.length;
    previousIds = Object.freeze({ ...previousIds, [cat]: combination });
    previousOpenings = Object.freeze({ ...previousOpenings, [cat]: openingIndex });
    const contentIndex = Math.floor(combination / 12);
    const scenario = scenarios[cat][Math.floor(contentIndex / 64) % 8];
    const practical = consequences[cat][Math.floor(contentIndex / 16) % 4];
    const relationship = connections[cat][Math.floor(contentIndex / 4) % 4];
    const ending = endings[cat][contentIndex % 4];
    const turn = intensity === 'extreme' ? intensityTurns[cat] : scenario[1];
    const opening = openings[cat][openingIndex];
    const paragraphs = length === 'short'
      ? [`${opening} ${scenario[0]}`, turn, ending]
      : templates[Math.floor(contentIndex / 512)](opening, scenario[0], turn, practical, relationship, ending);
    const text = (length === 'long'
      ? [paragraphs[0], `${paragraphs[1]} ${extensions[cat]}`, paragraphs[2]]
      : paragraphs).join('\n\n');
    return {
      id: `${cat.toUpperCase()}-${String(combination + 1).padStart(4, '0')}-${intensity.toUpperCase()}-${length.toUpperCase()}`,
      text, length, intensity
    };
  }

  const api = Object.freeze({ generateStory, secureRandomIndex });
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (root.window) root.window.Predictions = api;
  else root.Predictions = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
