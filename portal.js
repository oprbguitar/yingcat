const portal = document.querySelector('.portal');
const overlay = document.querySelector('#story-overlay');
const panel = document.querySelector('.story-panel');
const storyText = document.querySelector('#story-text');
const egg = document.querySelector('#easter-egg');
const zones = [...document.querySelectorAll('.zone')];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let state = 'idle';
let pendingTimer;
let tapTimes = [];
let lastFocus;

function setState(next) {
  state = next;
  portal.dataset.state = next;
}

function clearPending() {
  clearTimeout(pendingTimer);
}

function restore() {
  overlay.hidden = true;
  egg.hidden = true;
  portal.classList.remove('dimmed');
  zones.forEach(zone => zone.removeAttribute('aria-disabled'));
  setState('idle');
  lastFocus?.focus({ preventScroll: true });
}

function closeStory() {
  if (!state.startsWith('story-')) return;
  clearPending();
  setState('story-closing');
  overlay.dataset.phase = 'closing';
  pendingTimer = setTimeout(restore, reducedMotion.matches ? 40 : 180);
}

function showStory(cat) {
  const story = Predictions.generateStory(cat);
  StoryPresentation.render(storyText, story.text, cat);
  storyText.scrollTop = 0;
  panel.dataset.storyId = story.id;
  overlay.dataset.cat = cat;
  overlay.dataset.phase = 'opening';
  overlay.hidden = false;
  portal.classList.add('dimmed');
  setState('story-opening');
  panel.focus({ preventScroll: true });
  pendingTimer = setTimeout(() => {
    overlay.dataset.phase = 'visible';
    setState('story-visible');
  }, reducedMotion.matches ? 80 : cat === 'white' ? 500 : 350);
}

function activate(cat, zone) {
  if (state.startsWith('story-')) { closeStory(); return; }
  if (!['idle', 'white-hover', 'black-hover'].includes(state)) return;
  clearPending();
  lastFocus = zone;
  setState(`${cat}-react`);
  zones.forEach(item => item.setAttribute('aria-disabled', 'true'));
  pendingTimer = setTimeout(() => showStory(cat), reducedMotion.matches ? 100 : cat === 'white' ? 650 : 520);
}

function showEgg() {
  clearPending();
  overlay.hidden = true;
  portal.classList.remove('dimmed');
  tapTimes = [];
  setState('easter-egg');
  egg.hidden = false;
  pendingTimer = setTimeout(restore, 2200);
}

function catAt(x, y) {
  const point = new DOMPoint(x, y);
  return zones.find(zone => {
    const matrix = zone.getScreenCTM();
    return matrix && zone.isPointInFill(point.matrixTransform(matrix.inverse()));
  })?.dataset.cat;
}

function hitsCatAt(x, y) { return Boolean(catAt(x, y)); }

// Capture before activation so the fifth press cancels the pending prediction.
document.querySelector('main').addEventListener('pointerdown', event => {
  if (!event.isPrimary || event.button !== 0 || event.target.closest('.story-close')) return;
  const pressedCat = catAt(event.clientX, event.clientY);
  if (pressedCat) CatSound.play(pressedCat);
  if (event.target.closest('.story-panel') && !hitsCatAt(event.clientX, event.clientY)) return;
  if (state === 'easter-egg') return;
  const now = performance.now();
  tapTimes = [...tapTimes.filter(time => now - time <= 1800), now];
  if (tapTimes.length >= 5) showEgg();
}, true);

for (const zone of zones) {
  const cat = zone.dataset.cat;
  zone.addEventListener('pointerenter', event => {
    if (event.pointerType === 'mouse' && state === 'idle') setState(`${cat}-hover`);
  });
  zone.addEventListener('pointerleave', () => {
    if (state === `${cat}-hover`) setState('idle');
  });
  zone.addEventListener('pointerup', event => {
    if (event.isPrimary && event.button === 0) activate(cat, zone);
  });
  zone.addEventListener('keydown', event => {
    if ((event.key === 'Enter' || event.key === ' ') && !event.repeat) {
      event.preventDefault();
      CatSound.play(cat);
      activate(cat, zone);
    }
  });
}

let storyPress;
overlay.addEventListener('pointerdown', event => {
  storyPress = { x: event.clientX, y: event.clientY, time: performance.now() };
});
document.querySelector('.story-close').addEventListener('click', closeStory);
overlay.addEventListener('pointerup', event => {
  if (event.target.closest('.story-close')) return;
  if (!event.target.closest('.story-panel')) { closeStory(); return; }
  // Keep a tap on either cat meaningful even when the reading panel covers it.
  // Scrolling, long presses and text selection must not dismiss the story.
  if (!storyPress || performance.now() - storyPress.time > 500 ||
      Math.hypot(event.clientX - storyPress.x, event.clientY - storyPress.y) > 6 ||
      window.getSelection()?.toString()) return;
  if (hitsCatAt(event.clientX, event.clientY)) closeStory();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeStory();
  if (event.key === 'Tab' && state.startsWith('story-')) {
    event.preventDefault();
    const closeButton = document.querySelector('.story-close');
    (document.activeElement === closeButton ? panel : closeButton).focus({ preventScroll: true });
  }
});
reducedMotion.addEventListener('change', () => {
  if (state.endsWith('-hover')) setState('idle');
});
setState('idle');
