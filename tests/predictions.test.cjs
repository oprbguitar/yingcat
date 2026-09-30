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
    for (let i = 0; i < 4096; i++) {
      const story = engine.generateStory(cat);
      ids.add(story.id); texts.add(story.text);
      assert.match(story.id, new RegExp(`^${cat.toUpperCase()}-\\d+$`));
      const count = story.text.trim().split(/\s+/).length;
      assert.ok(count >= 100 && count <= 220, `word count ${count}`);
      assert.equal(story.text.split('\n\n').length, 3);
      assert.doesNotMatch(story.text, /Vas a morir|Tendrás cáncer|definitivamente te engaña/i);
      if (cat === 'black') assert.match(story.text, /ficción|relato|historia/);
    }
    assert.equal(ids.size, 4096);
    assert.equal(texts.size, 4096);
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
      assert.ok(engine.generateStory(cat).text.split(/\s+/).length >= 100);
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
