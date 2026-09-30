const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const enginePath = require.resolve('../predictions.js');
function load(next = () => 0) {
  const sandbox = { module: { exports: {} }, crypto: { getRandomValues(a) { a[0] = next(); return a; } } };
  vm.runInNewContext(fs.readFileSync(enginePath, 'utf8'), sandbox);
  return sandbox.module.exports;
}
test('validates cat and random collection inputs', () => {
  const engine = load();
  assert.throws(() => engine.generateStory('other'), /cat/i);
  assert.throws(() => engine.secureRandomIndex([]), /empty/i);
});
test('constant randomness cannot repeat the previous story for either cat', () => {
  const engine = load();
  for (const cat of ['white', 'black']) {
    const stories = Array.from({ length: 20 }, () => engine.generateStory(cat));
    stories.slice(1).forEach((story, i) => {
      assert.notEqual(story.id, stories[i].id);
      assert.notEqual(story.text, stories[i].text);
    });
  }
});
test('each cat provides more than 100 complete distinct Spanish stories', () => {
  let value = 0;
  const engine = load(() => value++);
  for (const cat of ['white', 'black']) {
    const ids = new Set();
    const texts = new Set();
    for (let i = 0; i < 8192; i++) {
      const story = engine.generateStory(cat);
      ids.add(story.id); texts.add(story.text);
      assert.match(story.id, new RegExp(`^${cat.toUpperCase()}-\\d+-(NORMAL|EXTREME)-(SHORT|MEDIUM|LONG)$`));
      const count = story.text.trim().split(/\s+/).length;
      assert.ok(count >= 25 && count <= 140, `word count ${count}`);
      assert.equal(story.text.split('\n\n').length, 3);
      assert.doesNotMatch(story.text, /Vas a morir|Tendrás cáncer|definitivamente te engaña/i);
      assert.doesNotMatch(story.text, /ficción|relato|historia|fábula|el personaje/i);
      assert.match(story.text, /\b(te|ti|tú|tu|tus|puedes|podrías|imagínate|piensa|crees|necesitas|quieras)\b/i);
    }
    assert.ok(ids.size > 100);
    assert.ok(texts.size > 100);
  }
});
test('browser global and Math.random fallback work without crypto', () => {
  const sandbox = { window: {}, Math: Object.assign(Object.create(Math), { random: () => 0.5 }) };
  vm.runInNewContext(fs.readFileSync(enginePath, 'utf8'), sandbox);
  assert.equal(sandbox.window.Predictions.secureRandomIndex(['a', 'b']), 1);
  assert.equal(typeof sandbox.window.Predictions.generateStory('white').text, 'string');
});
test('remembers previous combinations independently across alternating cats', () => {
  const engine = load();
  const firstWhite = engine.generateStory('white');
  const firstBlack = engine.generateStory('black');
  assert.notEqual(engine.generateStory('white').id, firstWhite.id);
  assert.notEqual(engine.generateStory('black').id, firstBlack.id);
});
test('rejects biased out-of-range crypto samples and bounds fallback retries', () => {
  const engine = load(() => 4294967295);
  const index = engine.secureRandomIndex(['a', 'b', 'c']);
  assert.ok(index >= 0 && index < 3);
});

test('CommonJS entry produces complete stories and validates inputs', () => {
  const engine = require('../predictions.js');
  for (const cat of ['white', 'black']) {
    for (let i = 0; i < 200; i++) {
      assert.ok(engine.generateStory(cat).text.split(/\s+/).length >= 25);
    }
  }
  assert.throws(() => engine.generateStory(null), /cat/i);
  assert.throws(() => engine.secureRandomIndex([]), /empty/i);
  assert.equal(engine.secureRandomIndex(['only']), 0);
});
test('CommonJS uses fallback when browser crypto is unavailable', () => {
  const engine = require('../predictions.js');
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'crypto');
  Object.defineProperty(globalThis, 'crypto', { value: undefined, configurable: true });
  try {
    const index = engine.secureRandomIndex(['a', 'b']);
    assert.ok(index === 0 || index === 1);
  } finally {
    if (descriptor) Object.defineProperty(globalThis, 'crypto', descriptor);
    else delete globalThis.crypto;
  }
});

test('conversational beginnings vary even with constant random input', () => {
  const engine = load();
  for (const cat of ['white', 'black']) {
    let previous = null;
    for (let i = 0; i < 30; i++) {
      const text = engine.generateStory(cat).text;
      const opening = text.split('\n\n')[0].split(/[.!?…]/)[0];
      assert.notEqual(opening, previous);
      assert.doesNotMatch(text, /El relato comienza/i);
      previous = opening;
    }
  }
});

test('varies length categories without immediate repetition and includes extremes', () => {
  let value = 0;
  const engine = load(() => value++);
  for (const cat of ['white', 'black']) {
    const lengths = new Set();
    const intensities = new Set();
    let previous = null;
    for (let i = 0; i < 300; i++) {
      const story = engine.generateStory(cat);
      assert.notEqual(story.length, previous);
      lengths.add(story.length); intensities.add(story.intensity);
      const words = story.text.split(/\s+/).length;
      if (story.length === 'short') assert.ok(words >= 25 && words < 55);
      if (story.length === 'medium') assert.ok(words >= 55 && words < 100);
      if (story.length === 'long') assert.ok(words >= 100 && words <= 140);
      if (story.intensity === 'extreme') {
        assert.match(story.text, cat === 'white' ? /triunfo|desbordante/ : /macabra|funeral/);
      }
      previous = story.length;
    }
    assert.equal(lengths.size, 3);
    assert.equal(intensities.size, 2);
  }
});


test('invented examples invite perseverance without attributed testimony or threats', () => {
  let value = 0;
  const engine = load(() => value++);
  const examples = new Set();
  for (const cat of ['white', 'black']) {
    for (let i = 0; i < 1000; i++) {
      const story = engine.generateStory(cat);
      if (story.text.includes('Piensa en Elena')) examples.add('Elena');
      if (story.text.includes('A Mateo le tomó')) examples.add('Mateo');
      assert.doesNotMatch(story.text, /tu amigo me contó|vas a morir|morirás|tendrás cáncer|testimonio real/i);
      assert.doesNotMatch(story.text, /ficción|relato|historia|fábula|el personaje/i);
    }
  }
  assert.equal(examples.size, 2);
});
