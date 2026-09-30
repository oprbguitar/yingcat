const assert=require('node:assert/strict');
const {chromium}=require('C:/Users/oprbg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{const b=await chromium.launch({channel:'msedge',headless:true});try{
 for(const width of [360,768,1280,1600]){
 const p=await b.newPage({viewport:{width,height:800}});await p.goto(process.env.PORTAL_URL||'file:///C:/Users/oprbg/Documents/Claude/Destiny/index.html');
 const stats=await p.evaluate(()=>{
 function luminance(color){const parts=color.match(/[0-9.]+/g).slice(0,3).map(Number).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4;});return parts[0]*.2126+parts[1]*.7152+parts[2]*.0722;}
 const sets={palette:new Set(),font:new Set(),size:new Set(),words:new Set()};let previous;
 for(let i=0;i<120;i++){const s=Predictions.generateStory('white');StoryPresentation.render(document.querySelector('#story-text'),s.text,'white');const panel=document.querySelector('.story-panel'),d=panel.dataset;
 if(previous){if(previous.text===s.text)throw Error('Repeated story');for(const key of ['palette','font','size'])if(previous[key]===d[key])throw Error('Repeated '+key);}
 const background=luminance(getComputedStyle(panel).backgroundColor);for(const paragraph of panel.querySelectorAll('.story-paragraph')){const ink=luminance(getComputedStyle(paragraph).color);if((Math.max(ink,background)+.05)/(Math.min(ink,background)+.05)<4.5)throw Error('Low contrast');}
 for(const key of ['palette','font','size'])sets[key].add(d[key]);sets.words.add(s.text.split(/\s+/).length);previous={text:s.text,palette:d.palette,font:d.font,size:d.size};}
 return Object.fromEntries(Object.entries(sets).map(([k,v])=>[k,v.size]));});
 assert.equal(stats.palette,5);assert.equal(stats.font,3);assert.equal(stats.size,3);assert.ok(stats.words>=8);
 const r=await p.locator('.portal').boundingBox();await p.mouse.click(r.x+r.width*.28,r.y+r.height*.68);assert.equal(await p.evaluate(()=>CatSound.lastCat()),'black');await p.waitForFunction(()=>document.querySelector('.portal').dataset.state==='story-visible');await p.locator('.story-close').click();await p.waitForFunction(()=>document.querySelector('#story-overlay').hidden);await p.mouse.click(r.x+r.width*.69,r.y+r.height*.22);assert.equal(await p.evaluate(()=>CatSound.lastCat()),'white');console.log('PASS appearance/nonrepeat/length/selected sound '+width);await p.close();}
 }finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
