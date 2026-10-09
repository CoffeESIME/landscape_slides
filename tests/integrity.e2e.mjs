import {chromium} from '@playwright/test';
import {build} from 'esbuild';
import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
const bundle=await build({entryPoints:['src/data/presentation.ts'],bundle:true,write:false,platform:'node',format:'esm'});
const {presentation}=await import('data:text/javascript;base64,'+Buffer.from(bundle.outputFiles[0].text).toString('base64'));
const browser=await chromium.launch({headless:true,executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE||process.env.LOCALAPPDATA+'/ms-playwright/chromium-1234/chrome-win64/chrome.exe'});
const ctx=await browser.newContext({reducedMotion:'reduce'});
const page=await ctx.newPage();
const base='http://127.0.0.1:4173/';
const assets=JSON.parse(await readFile('public/bibliography/media.json','utf8'));
for(const m of assets){const response=await ctx.request.get(base+m.localPath);assert.equal(response.status(),200,m.localPath);assert.ok((await response.body()).length>0,m.localPath);}
const clipping=[];let checked=0;
for(const viewport of [{width:1920,height:1080},{width:1366,height:768}]){
 await page.setViewportSize(viewport);await page.goto(base);
 for(const scene of presentation)for(let step=0;step<scene.steps.length;step++){
  const hash='#'+scene.id+(step?'/'+step:'');
  await page.evaluate(hash=>location.hash=hash,hash);
  await page.waitForFunction(({id,step})=>document.querySelector('.stage')?.dataset.scene===id&&document.querySelector('.stage')?.dataset.step===String(step),{id:scene.id,step});
  await page.waitForTimeout(35);
  const outside=await page.locator('.scene-content h1,.scene-content h2,.scene-content h3,.scene-content p,.scene-content button,.scene-content li').evaluateAll(els=>els.filter(e=>{const r=e.getBoundingClientRect();return r.width&&r.height&&(r.x< -1||r.y< -1||r.right>innerWidth+1||r.bottom>innerHeight+1);}).map(e=>e.textContent));
  if(outside.length)clipping.push({hash,viewport,outside});checked++;
 }
}
assert.deepEqual(clipping,[]);
for(const [old,current] of Object.entries({'espacio-vacio':'conocer-lugar',antes:'transformar',tesis:'transformar',poder:'transformar',poesia:'caminar','bosque-poema':'caminar'})){
 await page.goto(base+'#'+old);await page.waitForFunction(id=>document.querySelector('.stage')?.dataset.scene===id,current);
 await page.waitForFunction(id=>location.hash==='#'+id,current);
}
const minutes=Array.from({length:7},(_,i)=>Number(presentation.filter(s=>s.chapter===i).reduce((n,s)=>n+s.minutes,0).toFixed(2)));
assert.deepEqual(minutes,[4,4,5,5,5,4,3]);
assert.equal(presentation.find(s=>s.id==='iztaccihuatl').image,presentation.find(s=>s.id==='regreso').image);
assert.equal(presentation.find(s=>s.id==='flor').image,presentation.find(s=>s.id==='lo-pequeno').image);
await page.emulateMedia({reducedMotion:'no-preference'});await page.goto(base+'#ave/4');
await page.locator('.bird-reveal video').waitFor();await page.keyboard.press('m');
await page.waitForFunction(()=>document.querySelector('video')?.currentTime>0);
await page.keyboard.press('f');await page.waitForFunction(()=>!!document.fullscreenElement);
await page.waitForFunction(()=>document.querySelector('video')?.readyState>=2);
assert.equal(await page.locator('video').evaluate(v=>v.muted),false);
await page.keyboard.press('m');assert.equal(await page.locator('video').evaluate(v=>v.muted),true);
await page.getByRole('button',{name:'Repetir el mismo registro',exact:false}).click();
assert.equal(await page.locator('video').evaluate(v=>v.muted),true);
await page.keyboard.press('f');await page.waitForFunction(()=>!document.fullscreenElement);
await writeFile('verification/integrity-results.json',JSON.stringify({assets:assets.length,sceneStepsAtBothSizes:checked,clipping,minutes,legacyHashes:6,videoFullscreen:true,videoMutePreservedOnReplay:true},null,2));
await browser.close();console.log('PASS assets, all hashes, layout bounds, chapter timings, video fullscreen');
