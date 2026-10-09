import { chromium } from '@playwright/test';
import { build } from 'esbuild';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const bundle=await build({entryPoints:['src/data/presentation.ts'],bundle:true,write:false,platform:'node',format:'esm'});
const {presentation,chapters}=await import('data:text/javascript;base64,'+Buffer.from(bundle.outputFiles[0].text).toString('base64'));
await mkdir('verification/revision-20261008',{recursive:true});
await writeFile('verification/sequence.json',JSON.stringify(presentation.map(s=>({id:s.id,title:s.title,chapter:s.chapter,steps:s.steps.length})),null,2));
const browser=await chromium.launch({headless:true,executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE||process.env.LOCALAPPDATA+'/ms-playwright/chromium-1234/chrome-win64/chrome.exe'});
const ctx=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce'});
await ctx.addInitScript(()=>{window.__audios=[];const NativeAudio=window.Audio;window.Audio=function(...args){const a=new NativeAudio(...args);window.__audios.push(a);return a;};});
const page=await ctx.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url())});
await page.goto('http://127.0.0.1:4173');await page.locator('[data-scene="preludio"]').waitFor();
assert.equal(await page.locator('.controls,.topbar,.scene-label,.restore-controls').count(),0);
await page.keyboard.press('h');assert.equal(await page.locator('.controls').count(),1);await page.keyboard.press('h');
await page.screenshot({path:'verification/revision-20261008/opening.png'});
let visited=0;const missing=[];
for(let i=0;i<presentation.length;i++)for(let s=0;s<presentation[i].steps.length;s++){
 await page.waitForFunction(({id,s})=>document.querySelector('.stage')?.getAttribute('data-scene')===id&&document.querySelector('.stage')?.getAttribute('data-step')===String(s),{id:presentation[i].id,s});
 await page.waitForTimeout(25);
 assert.equal(await page.locator('.controls,.topbar,.scene-label,.restore-controls').count(),0);
 const bad=await page.locator('.scene-content img,.scene-background img').evaluateAll(imgs=>imgs.filter(im=>!im.getAttribute('src')).map(im=>im.outerHTML));missing.push(...bad);
 if(s===0){await page.keyboard.press('p');await page.locator('dialog').waitFor();assert.match(await page.locator('dialog').innerText(),/tipo de evidencia/i);await page.keyboard.press('Escape');}
 visited++;await page.keyboard.press('ArrowRight');
}
assert.equal(await page.locator('.stage').getAttribute('data-scene'),'cierre');assert.equal(await page.locator('.stage').getAttribute('data-step'),String(presentation.at(-1).steps.length-1));
await page.screenshot({path:'verification/revision-20261008/closing.png'});
await page.keyboard.press('Home');assert.equal(await page.locator('.stage').getAttribute('data-scene'),'preludio');await page.keyboard.press('Space');assert.equal(await page.locator('.stage').getAttribute('data-scene'),'primera-mirada');await page.keyboard.press('ArrowLeft');assert.equal(await page.locator('.stage').getAttribute('data-scene'),'preludio');await page.keyboard.press('End');assert.equal(await page.locator('.stage').getAttribute('data-scene'),'cierre');
for(let i=0;i<chapters.length;i++){await page.keyboard.press(String(i+1));assert.equal(await page.locator('.stage').getAttribute('data-scene'),presentation[chapters[i].start].id);}
await page.goto('http://127.0.0.1:4173/#ave/0');await page.keyboard.press('m');await page.waitForTimeout(1500);assert.equal(await page.evaluate(()=>window.__audios.filter(a=>!a.paused).length),1);
await page.keyboard.press('ArrowRight');await page.keyboard.press('ArrowRight');await page.waitForTimeout(100);assert.equal(await page.evaluate(()=>window.__audios.filter(a=>!a.paused).length),0);
for(let i=0;i<3;i++)await page.keyboard.press('ArrowRight');await page.waitForTimeout(1500);assert.equal(await page.evaluate(()=>window.__audios.filter(a=>!a.paused).length),1);await page.getByRole('button',{name:'Escuchar el mismo canto',exact:false}).click();await page.waitForTimeout(300);assert.equal(await page.evaluate(()=>window.__audios.filter(a=>!a.paused).length),1);await page.keyboard.press('m');await page.waitForTimeout(100);assert.equal(await page.evaluate(()=>window.__audios.filter(a=>!a.paused).length),0);
for(const size of [{width:1920,height:1080},{width:1366,height:768}]){
 await page.setViewportSize(size);
 for(const [id,step] of [['primera-mirada',0],['iztaccihuatl',0],['biodiversidad',0],['ave',4],['capas',4],['ciencia-comunitaria',3],['regreso',8],['lo-pequeno',0]]){
  await page.goto('http://127.0.0.1:4173/#'+id+'/'+step);await page.waitForTimeout(150);await page.screenshot({path:`verification/revision-20261008/${id}-${size.width}.png`});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 }
}
await page.goto('http://127.0.0.1:4173/#biodiversidad');await page.getByRole('button',{name:'2 km',exact:true}).click();assert.match(await page.locator('.campus-heading').innerText(),/85/);await page.getByRole('button',{name:'5 km',exact:true}).click();assert.match(await page.locator('.campus-heading').innerText(),/179/);
await page.keyboard.press('r');assert.match(await page.locator('dialog').innerText(),/iNaturalist/);await page.keyboard.press('Escape');
await page.getByRole('button',{name:'Especies y distancias',exact:true}).click();assert.ok(await page.locator('.campus-records tbody tr').count()>0);assert.ok((await page.locator('.campus-heading').boundingBox()).y>=0);assert.equal(await page.locator('.campus-heading').isVisible(),true);assert.match(await page.locator('.campus-records').innerText(),/ m| km/);
await page.goto('http://127.0.0.1:4173/#asombro');await page.waitForTimeout(50);assert.equal(await page.locator('video').count(),0);assert.match(await page.locator('.scene-content').innerText(),/ASOMBRO/);
await page.goto('http://127.0.0.1:4173/#miedo');for(let step=0;step<6;step++){assert.equal(await page.locator('.black-scene').count(),0);await page.waitForFunction(()=>[...document.querySelectorAll('.scene-background img')].every(im=>im.complete&&im.naturalWidth>0));await page.keyboard.press('ArrowRight');}
await page.goto('http://127.0.0.1:4173/#cierre');assert.equal(await page.evaluate(()=>window.__audios.filter(a=>!a.paused).length),0);
await page.keyboard.press('s');await page.getByRole('button',{name:'Preparar copia sin conexión',exact:false}).click();await page.getByRole('status').filter({hasText:'Lista para usar sin conexión'}).waitFor({timeout:90000});await page.keyboard.press('Escape');
await ctx.setOffline(true);await page.reload();await page.locator('.stage').waitFor();await page.evaluate(()=>location.hash='#ave/4');await page.locator('.bird-reveal img').waitFor();assert.equal(await page.locator('.bird-reveal img').evaluate(im=>im.complete&&im.naturalWidth>0),true);
await page.evaluate(()=>location.hash='#biodiversidad');await page.locator('.campus-capture img').waitFor();await page.waitForFunction(()=>document.querySelector('.campus-capture img')?.naturalWidth>0);assert.match(await page.locator('.campus-heading').innerText(),/48/);
await ctx.setOffline(false);
assert.deepEqual(missing,[]);assert.deepEqual(errors,[]);
await writeFile('verification/results.json',JSON.stringify({scenes:presentation.length,steps:visited,errors,missing,checks:['keyboard-full-route','all-presenter-notes','chapter-jumps','home-end-space-left','audio-exclusive-mute-replay','asombro-without-video','fear-photos-no-black-steps','controls-hidden-by-default','real-app-captures-and-distances','hash','sources','radii','1920x1080','1366x768','reduced-motion','offline-reload-and-image']},null,2));
await browser.close();console.log('PASS',presentation.length,'scenes',visited,'steps');

