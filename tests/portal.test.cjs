const assert = require('node:assert/strict');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require('C:/Users/oprbg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

const url = process.env.PORTAL_URL || pathToFileURL(path.resolve(__dirname, '..', 'index.html')).href;
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function point(page, cat) {
  const box = await page.locator('.portal-art').boundingBox();
  return { x: box.x + box.width * (cat === 'white' ? .69 : .28),
    y: box.y + box.height * (cat === 'white' ? .22 : .68) };
}

async function activate(page, cat, touch = false) {
  const position = await point(page, cat);
  if (touch) await page.touchscreen.tap(position.x, position.y);
  else await page.mouse.click(position.x, position.y);
}

async function waitState(page, state) {
  await page.waitForFunction(expected => document.querySelector('.portal').dataset.state === expected, state);
}

async function waitRestored(page) {
  await page.waitForFunction(() => ['idle', 'white-hover', 'black-hover'].includes(document.querySelector('.portal').dataset.state) && document.querySelector('#story-overlay').hidden && document.querySelector('#easter-egg').hidden);
}

async function visibleStory(page, cat, touch = false) {
  await activate(page, cat, touch);
  assert.equal(await page.locator('.portal').getAttribute('data-state'), `${cat}-react`);
  assert.equal(await page.locator('#story-overlay').isVisible(), false, 'Story must wait for reaction');
  await waitState(page, 'story-visible');
  const text = await page.locator('#story-text').innerText();
  const words = text.trim().split(/\s+/).length;
  assert.ok(words >= 100 && words <= 220, `Story has ${words} words`);
  return text;
}

async function run() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    for (const width of [360, 768, 1280, 1600]) {
      const context = await browser.newContext({ viewport: { width, height: 900 } });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(url);
      await waitRestored(page);
      assert.equal((await page.locator('body').innerText()).trim(), '', 'Initial portal has no visible text');
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      assert.equal(await page.locator('#story-overlay').isVisible(), false);

      // Hover affects only the selected head.
      const hover = await point(page, 'white');
      await page.mouse.move(hover.x, hover.y);
      await delay(400);
      assert.notEqual(await page.locator('.cat-layer--white').evaluate(el => getComputedStyle(el).transform), 'none');
      assert.equal(await page.locator('.cat-layer--black').evaluate(el => getComputedStyle(el).transform), 'none');
      await page.mouse.move(0, 0);

      const first = await visibleStory(page, 'white');
      await page.keyboard.press('Escape');
      await waitRestored(page);
      const second = await visibleStory(page, 'white');
      assert.notEqual(first, second, 'Immediate exact repeat');
      await page.mouse.click(2, 2);
      await waitRestored(page);
      await visibleStory(page, 'black');
      await activate(page, 'black');
      await waitRestored(page);

      // Genuine pointer events, including taps during the reaction.
      for (let index = 0; index < 5; index++) {
        await activate(page, 'white');
        if (index < 4) await delay(100);
      }
      await waitState(page, 'easter-egg');
      assert.equal(await page.locator('#easter-egg').innerText(), '¡Se ve que tienes mucho tiempo!!');
      assert.equal(await page.locator('#story-overlay').isVisible(), false);
      await delay(2300);
      await waitRestored(page);
      assert.equal(await page.locator('#easter-egg').isVisible(), false);
      await visibleStory(page, 'black');
      await page.keyboard.press('Escape');
      await waitRestored(page);
      assert.deepEqual(errors, []);
      console.log(`PASS desktop ${width}px, story lifecycle and Easter egg`);
      await context.close();
    }

    const mobile = await browser.newContext({ viewport: { width: 360, height: 640 }, hasTouch: true, isMobile: true });
    const mobilePage = await mobile.newPage();
    await mobilePage.goto(url);
    await visibleStory(mobilePage, 'white', true);
    assert.ok(await mobilePage.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    const panel = await mobilePage.locator('.story-panel').boundingBox();
    assert.ok(panel.x >= 0 && panel.x + panel.width <= 361, 'Mobile panel stays in viewport');
    await mobilePage.mouse.move(panel.x + panel.width / 2, panel.y + panel.height / 2);
    await mobilePage.mouse.wheel(0, 180);
    await delay(100);
    assert.equal(await mobilePage.locator('#story-overlay').isVisible(), true, 'Reading scroll must not dismiss story');
    await activate(mobilePage, 'white', true);
    await waitRestored(mobilePage);
    for (let index = 0; index < 5; index++) {
      await activate(mobilePage, 'black', true);
      if (index < 4) await delay(100);
    }
    await waitState(mobilePage, 'easter-egg');
    await waitRestored(mobilePage);
    for (let index = 0; index < 5; index++) {
      await activate(mobilePage, 'black', true);
      if (index < 4) await delay(300);
    }
    await waitState(mobilePage, 'easter-egg');
    assert.equal(await mobilePage.locator('#story-overlay').isVisible(), false, 'Rapid taps crossing story reveal suppress the prediction');
    console.log('PASS mobile touch and Easter egg');
    await mobile.close();

    const reduced = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1280, height: 900 } });
    const reducedPage = await reduced.newPage();
    await reducedPage.goto(url);
    await activate(reducedPage, 'black');
    await delay(100);
    for (const cat of ['white', 'black']) {
      assert.equal(await reducedPage.locator(`.cat-layer--${cat}`).evaluate(el => getComputedStyle(el).transform), 'none');
    }
    await waitState(reducedPage, 'story-visible');
    await reducedPage.keyboard.press('Escape');
    await waitRestored(reducedPage);
    console.log('PASS reduced motion preserves functionality without head transforms');
    await reduced.close();
  } finally { await browser.close(); }
}

run().catch(error => { console.error(error); process.exitCode = 1; });
