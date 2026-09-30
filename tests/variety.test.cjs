const assert=require('node:assert/strict');
const {chromium}=require('C:/Users/oprbg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{const b=await chromium.launch({channel:'msedge',headless:true});try{
 for(const width of [360,768,1280,1600]){
 const p=await b.newPage({viewport:{width,height:800}});await p.goto(process.env.PORTAL_URL||'file:///C:/Users/oprbg/Documents/Claude/Destiny/index.html');
 const stats=await p.evaluate(()=>{
 const effects=new Set(),starts=new Set();
 for(let i=0;i<150;i++){const cat=i%2?'white':'black';const story=Predictions.generateStory(cat);const target=document.querySelector('#story-text');StoryPresentation.render(target,story.text,cat);if(target.textContent!==story.text)throw Error('Text changed');const letter=target.querySelector('.story-letter');if(letter)effects.add(letter.className);starts.add(story.text.split(' ').slice(0,4).join(' '));const count=story.text.split(/\s+/).length;if(count<50||count>95)throw Error('Length '+count);}
 return{effects:[...effects],starts:starts.size};
 });assert.ok(stats.effects.length>=3);assert.ok(stats.starts>=8);
 const r=await p.locator('.portal').boundingBox();await p.mouse.click(r.x+r.width*.69,r.y+r.height*.22);await p.waitForFunction(()=>document.querySelector('.portal').dataset.state==='story-visible');
 const panel=await p.locator('.story-panel').boundingBox();assert.ok(panel.height<=800*.71&&panel.height>0);await p.locator('.story-close').click();await p.waitForFunction(()=>document.querySelector('#story-overlay').hidden);console.log('PASS concise/variety/effects/compact '+width);await p.close();
 }
 }finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
