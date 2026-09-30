(function (root) {
  'use strict';

  const openings = {
    white: [
      'Imagínate que lo mejor llega cuando dejas de mirar el reloj.',
      '¿En serio crees que esa pequeña demora no puede favorecerte?',
      'Hubo un momento en que casi dijiste que no. Casi.',
      'Y si esa casualidad tuviera algo bastante amable preparado para ti…',
      'A ver, piensa en aquello que habías dado por perdido.',
      'No te rías todavía: la suerte también llega despeinada.',
      'Quizá puedes empezar de nuevo justo donde termina tu paciencia.',
      '¿Te acuerdas de ese plan que siempre dejabas para después?',
      'Supón que una mañana corriente decide regalarte algo distinto.',
      'Mira qué curioso: no todo lo inesperado viene a complicarte.',
      'Hay días que parecen pequeños hasta que te devuelven una alegría.',
      'Puedes imaginar una buena noticia llegando por el camino largo.'
    ],
    black: [
      'Imagínate que la puerta se cierra antes de escuchar tu explicación.',
      '¿En serio crees que ese silencio significa que todo marcha bien?',
      'Hubo un momento en que aún podías volver. ¿Y ahora?',
      'Y si aquella coincidencia fuera la primera sombra que encuentras…',
      'A ver, piensa en lo que nadie quiso decirte de frente.',
      'No mires atrás todavía: quizá lo peor apenas está tomando aire.',
      'Quizá te inquiete que nadie parezca sorprendido por lo ocurrido.',
      '¿Te acuerdas de la promesa que parecía demasiado fácil de cumplir?',
      'Supón que una mañana corriente te deja sin la salida prevista.',
      'Mira qué curioso: tu reloj sigue andando, pero nadie llega.',
      'Hay días que podrías sentir torcidos antes de abrir los ojos.',
      'Puedes imaginar que la mala noticia conoce primero tu dirección.'
    ]
  };

  const scenarios = {
    white: [
      ['Tras una preocupación, encuentras una carta con una invitación que parecía vencida.', 'Si respondes, puedes abrir una puerta que todavía estaba esperándote.'],
      ['Un viaje demorado te reúne con alguien bajo el mismo techo.', 'Al conversar, puedes descubrir un camino que antes no habías considerado.'],
      ['Una tarea pendiente aparece entre papeles que ibas a desechar.', 'Revisarla te revela una solución sencilla, escondida detrás de tanta prisa.'],
      ['Una reunión familiar te recibe con recuerdos distintos y silencios incómodos.', 'Una disculpa sincera puede acercarte a otros sin resolverlo todo hoy.'],
      ['Tras una preocupación, encuentras un objeto que despierta tu curiosidad dormida.', 'Seguir esa pista puede devolverte una habilidad que todavía resulta útil.'],
      ['Una mañana cansada te invita a caminar antes de seguir trabajando.', 'La pausa te permite ordenar pensamientos y escuchar una propuesta sin apuro.'],
      ['Una compra aplazada te obliga a revisar prioridades antes de pagar.', 'Esperar puede revelarte una alternativa mejor y devolverte un poco de tranquilidad.'],
      ['Una demora te reúne con alguien mientras resuelves una gestión pendiente.', 'El encuentro puede dejarte una propuesta concreta y ganas de conversar.']
    ],
    black: [
      ['Podrías encontrar una carta bajo una puerta que creías abandonada.', 'Buscar explicaciones podría devolverte versiones incompatibles y una pregunta sin respuesta.'],
      ['Un viaje podría dejarte esperando en una estación demasiado vacía.', 'La última salida podría desaparecer mientras la lluvia te borra el camino.'],
      ['Una tarea olvidada podría regresar cuando ya no puedas entregarla.', 'La carpeta incompleta podría dejarte rodeado de promesas que nadie reconoce.'],
      ['Una reunión podría recibirte con una silla vacía y miradas esquivas.', 'Una noticia podría interrumpirte justo antes de pedir una explicación.'],
      ['Podrías perder un objeto justo cuando necesitas encontrarlo con urgencia.', 'Buscarlo podría mostrarte una fotografía desconocida y otra ausencia difícil de entender.'],
      ['Una llamada podría interrumpir tu primera pausa después de una noche agotadora.', 'Responder podría dejarte una inquietud persistente que ninguna explicación termina de apagar.'],
      ['Una oferta podría tentarte a pagar antes de hacer las preguntas necesarias.', 'Quizá conserves el comprobante cuando la dirección prometida ya haya desaparecido.'],
      ['Podrías encontrar una corona de flores bloqueando una entrada desconocida.', 'Un funeral ajeno podría hacerte sentir que tus planes pierden sentido.']
    ]
  };

  const consequences = {
    white: [
      'Un pago pendiente puede llegarte a tiempo para ordenar tus cuentas sin apuro.',
      'En el trabajo, una gestión puede aclararse y devolverte margen para elegir mejor.',
      'Evitar un gasto innecesario te permite descansar con una preocupación menos encima.',
      'Una oportunidad modesta puede ayudarte a avanzar sin abandonar lo que funciona.'
    ],
    black: [
      'Un cobro inesperado podría vaciar tus cuentas y dejarte otro compromiso pendiente.',
      'En el trabajo, alguien podría negar lo acordado y devolverte toda la responsabilidad.',
      'Una gestión podría exigirte regresar varias veces, consumiendo tu dinero y paciencia.',
      'Una oportunidad podría cerrarse mientras otra preocupación reclama el tiempo que te queda.'
    ]
  };

  // Elena and Mateo are invented literary examples, never attributed testimonials.
  const connections = {
    white: [
      'Una amistad puede escucharte y ayudarte a compartir ese peso sin juzgarte.',
      'Piensa en Elena: perdió su taller y lo reconstruyó; puedes recuperar tu impulso.',
      'A Mateo le tomó varios intentos levantar su puente; tú también puedes perseverar.',
      'Un mensaje cercano puede traerte una invitación y ganas de volver a encontrarte.'
    ],
    black: [
      'Una amistad podría responderte con evasivas justo cuando necesitas una palabra clara.',
      'Piensa en Elena: atravesó aquel invierno sola; quizá puedas resistir también esa intemperie.',
      'A Mateo le tomó años salir del derrumbe; podrías necesitar ayuda para empezar.',
      'Un mensaje podría traerte una despedida y hacerte sentir demasiado grande la habitación.'
    ]
  };

  const endings = {
    white: [
      'Puedes quedarte con algo pequeño y firme: todavía tienes otro camino.',
      'Nada queda perfecto. Pero puedes respirar con una preocupación menos.',
      'Lo que te faltaba por escribir… empieza con una sonrisa compartida.',
      'Y entonces… se abre algo bueno para ti. El resto puede esperar.'
    ],
    black: [
      'Y entonces… Se acabó. Quizá solo te quede escuchar aquel silencio.',
      'Lo que te faltaba por escribir… podría quedar detrás de la puerta.',
      'Podrías escuchar otra llamada desde una habitación vacía. ¿Te acercarías?',
      'Todo podría detenerse, salvo aquel ruido. Quizá no quieras contestar todavía.'
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
    white: 'Un triunfo inesperado podría traerte alegría desbordante: lo imposible parece abrirse para ti.',
    black: 'Podrías sentir una calma macabra: un funeral sin nombre borraría tus últimas certezas.'
  };
  const extensions = {
    white: 'Después, puedes reconocer cuánto te había pesado aquella preocupación. No necesitas resolver tu vida entera: basta con disfrutar ese respiro, aceptar compañía y reservar una tarde para lo que te importa. Mira alrededor; también puedes recibir cariño sin sentir que debes devolverlo todo de inmediato.',
    black: 'Después, podrías reconocer cuánto habría crecido aquella sombra. Quizá ninguna respuesta te convenza: las versiones se contradicen, las habitaciones parecen más frías y el camino de regreso pierde sus señales. Al mirar alrededor, podrías descubrir que incluso las voces conocidas te suenan demasiado lejos esta noche.'
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
