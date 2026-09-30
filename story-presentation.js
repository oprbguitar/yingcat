(function (root) {
  'use strict';

  function randomIndex(length) {
    return root.Predictions.secureRandomIndex(Array.from({ length }));
  }

  function phraseRange(text) {
    const difficulties = [
      'primero aparecen dudas, cansancio y una carpeta desordenada',
      'El presupuesto sigue siendo limitado',
      'una demora', 'un silencio incómodo', 'una mañana agotadora',
      'una preocupación', 'una compra aplazada'
    ];
    const phrase = difficulties.find(value => text.includes(value));
    if (phrase) return [text.indexOf(phrase), text.indexOf(phrase) + phrase.length];
    const words = [...text.matchAll(/\S+/g)];
    const count = Math.min(words.length, 4 + randomIndex(4));
    return words.length ? [words[0].index, words[count - 1].index + words[count - 1][0].length] : null;
  }

  function appendParagraph(container, text, tone, strike) {
    const paragraph = document.createElement('p');
    paragraph.className = `story-paragraph tone-${tone}`;
    const words = [...text.matchAll(/\S+/g)];
    const count = Math.min(words.length, 2 + randomIndex(4));
    const candidates = words.slice(0, words.length - count + 1).map((word, index) => [
      word.index, words[index + count - 1].index + words[index + count - 1][0].length
    ]).filter(range => !strike || range[1] <= strike[0] || range[0] >= strike[1]);
    const highlight = candidates.length ? candidates[randomIndex(candidates.length)] : null;
    const ranges = [
      ...(strike ? [{ start: strike[0], end: strike[1], tag: 's', className: 'story-strike' }] : []),
      ...(highlight ? [{ start: highlight[0], end: highlight[1], tag: 'mark', className: 'story-highlight' }] : [])
    ].sort((first, second) => first.start - second.start);
    let cursor = 0;
    ranges.forEach(range => {
      paragraph.append(document.createTextNode(text.slice(cursor, range.start)));
      const fragment = document.createElement(range.tag);
      fragment.className = range.className;
      fragment.textContent = text.slice(range.start, range.end);
      paragraph.append(fragment);
      cursor = range.end;
    });
    paragraph.append(document.createTextNode(text.slice(cursor)));
    container.append(paragraph);
  }

  function render(container, text, cat) {
    container.replaceChildren();
    const parts = text.split(/(\n\s*\n)/);
    const offset = randomIndex(2);
    let paragraphIndex = 0;
    parts.forEach((part, index) => {
      if (index % 2) {
        container.append(document.createTextNode(part));
        return;
      }
      if (!part) return;
      const strike = cat === 'white' && paragraphIndex === 0 ? phraseRange(part) : null;
      appendParagraph(container, part, (paragraphIndex + offset) % 2 ? 'blue' : 'red', strike);
      paragraphIndex += 1;
    });
  }

  root.StoryPresentation = Object.freeze({ render });
})(window);
