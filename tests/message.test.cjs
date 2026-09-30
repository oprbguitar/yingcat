const assert = require('node:assert/strict');
const {chromium}=require('C:/Users/oprbg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
  for(const width of [360,768,1280,1600]){
   const page=await browser.newPage({viewport:{width,height:640}});
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto(process.env.PORTAL_URL||'file:///C:/Users/oprbg/Documents/Claude/Destiny/index.html');
   assert.equal(await page.locator('.story-close').isVisible(),false);
   const box=await page.locator('.portal').boundingBox();
   await page.mouse.click(box.x+box.width*.69,box.y+box.height*.22);
   await page.waitForFunction(()=>document.querySelector('.portal').dataset.state==='story-visible');
   assert.equal(await page.locator('.story-close').isVisible(),true);
   assert.equal(await page.locator('#story-text .story-paragraph').count(),3);
   assert.ok(await page.locator('#story-text mark').count()>0);
   assert.equal(await page.locator('#story-text s').count(),1);
   assert.ok(await page.locator('.tone-red').count()>0&&await page.locator('.tone-blue').count()>0);
   const position=await page.locator('.story-close').boundingBox();assert.ok(position.y>=0&&position.y+position.height<=640);
   const audio=await page.evaluate(()=>CatSound.status());assert.equal(audio,'running');
   await page.locator('.story-close').click();
   await page.waitForFunction(()=>document.querySelector('#story-overlay').hidden);
   assert.deepEqual(errors,[]);
   console.log('PASS close/colors/phrases/meow '+width);await page.close();
  }
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
