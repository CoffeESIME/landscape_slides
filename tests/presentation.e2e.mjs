import { chromium } from '@playwright/test';
import { build } from 'esbuild';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const bundle=await build({entryPoints:['src/data/presentation.ts'],bundle:true,write:false,platform:'node',format:'esm'});
const {presentation,chapters}=await import('data:text/javascript;base64,'+Buffer.from(bundle.outputFiles[0].text).toString('base64'));
await mkdir('verification/bienestar-caeiro',{recursive:true});
await writeFile('verification/sequence.json',JSON.stringify(presentation.map(s=>({id:s.id,title:s.title,chapter:s.chapter,steps:s.steps.length})),null,2));
const browser=await chromium.launch({headless:true,executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE||process.env.LOCALAPPDATA+'/ms-playwright/chromium-1234/chrome-win64/chrome.exe'});
const ctx=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce'});
await ctx.addInitScript(()=>{window.__audios=[];const NativeAudio=window.Audio;window.Audio=function(...args){const a=new NativeAudio(...args);window.__audios.push(a);return a;};});
const page=await ctx.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url())});
await page.goto('http://127.0.0.1:4173');await page.locator('[data-scene="preludio"]').waitFor();
assert.equal(await page.locator('.controls,.topbar,.scene-label,.restore-controls').count(),0);
await page.keyboard.press('h');assert.equal(await page.locator('.controls').count(),1);await page.keyboard.press('h');
await page.screenshot({path:'verification/bienestar-caeiro/opening.png'});
let visited=0;const missing=[];
for(let i=0;i<presentation.length;i++)for(let s=0;s<presentation[i].steps.length;s++){
 await page.waitForFunction(({id,s})=>document.querySelector('.stage')?.getAttribute('data-scene')===id&&document.querySelector('.stage')?.getAttribute('data-step')===String(s),{id:presentation[i].id,s});
 await page.waitForTimeout(25);
 assert.equal(await page.locator('.controls,.topbar,.scene-label,.restore-controls').count(),0);
 const bad=await page.locator('.scene-content img,.scene-background img').evaluateAll(imgs=>imgs.filter(im=>!im.getAttribute('src')).map(im=>im.outerHTML));missing.push(...bad);
 if(s===0){await page.keyboard.press('p');await page.locator('dialog').waitFor();assert.match(await page.locator('dialog').innerText(),/tipo de evidencia/i);await page.keyboard.press('Escape');}
 assert.equal(await page.evaluate(()=>location.hash),'#'+presentation[i].id+(s?'/'+s:''));
 assert.doesNotMatch(await page.locator('.scene-content').innerText(),/\[PENDIENTE|VERIFICAR CITA|INSERTAR TRADUCCIÓN|¿Vacío de qué|igual mañana|qué estamos quitando/);
 visited++;await page.keyboard.press('ArrowRight');
}
assert.equal(await page.locator('.stage').getAttribute('data-scene'),'cierre');assert.equal(await page.locator('.stage').getAttribute('data-step'),String(presentation.at(-1).steps.length-1));
await page.screenshot({path:'verification/bienestar-caeiro/closing.png'});
await page.keyboard.press('Home');assert.equal(await page.locator('.stage').getAttribute('data-scene'),'preludio');await page.keyboard.press('Space');assert.equal(await page.locator('.stage').getAttribute('data-scene'),'primera-mirada');await page.keyboard.press('ArrowLeft');assert.equal(await page.locator('.stage').getAttribute('data-scene'),'preludio');await page.keyboard.press('End');assert.equal(await page.locator('.stage').getAttribute('data-scene'),'cierre');
for(let i=0;i<chapters.length;i++){await page.keyboard.press(String(i+1));assert.equal(await page.locator('.stage').getAttribute('data-scene'),presentation[chapters[i].start].id);}
await page.goto('http://127.0.0.1:4173/#ave/0');
const video=page.locator('.bird-reveal video');
await video.waitFor();await page.keyboard.press('m');
await page.waitForFunction(()=>{const v=document.querySelector('video');return v&&!v.paused&&v.currentTime>0&&!v.muted;});
assert.equal(await video.evaluate(v=>getComputedStyle(v).opacity),'0');
assert.equal(await page.evaluate(()=>window.__audios.filter(a=>!a.paused).length),0);
await page.keyboard.press('ArrowRight');assert.match(await page.locator('.bird-reveal').innerText(),/¿Qué escuchan/);
await page.keyboard.press('ArrowRight');await page.waitForFunction(()=>document.querySelector('video')?.currentTime>0);
assert.equal(await video.evaluate(v=>getComputedStyle(v).opacity),'1');
await page.keyboard.press('ArrowRight');assert.match(await page.locator('.bird-reveal').innerText(),/Colibrí orejas blancas/);
await page.keyboard.press('ArrowRight');assert.match(await page.locator('.bird-reveal').innerText(),/Basilinna leucotis/);
await page.keyboard.press('ArrowRight');await page.waitForTimeout(500);
assert.match(await page.locator('.bird-reveal').innerText(),/¿Lo escucharían igual ahora/);
await video.evaluate(v=>v.currentTime=12);
await page.getByRole('button',{name:'Repetir el mismo registro',exact:false}).click();
assert.ok(await video.evaluate(v=>v.currentTime<2));
await page.keyboard.press('m');assert.equal(await video.evaluate(v=>v.muted),true);
await page.getByRole('button',{name:'Repetir el mismo registro',exact:false}).click();assert.equal(await video.evaluate(v=>v.muted),true);
await page.getByRole('button',{name:'Pausar registro',exact:true}).click();assert.equal(await video.evaluate(v=>v.paused),true);
await page.getByRole('button',{name:'Reproducir registro',exact:true}).click();
await page.keyboard.press('m');assert.equal(await video.evaluate(v=>v.muted),false);
await page.keyboard.press('ArrowRight');assert.equal(await video.evaluate(v=>v.paused),true);
await page.evaluate(()=>location.hash='#ave/5');await video.waitFor();await page.waitForFunction(()=>!document.querySelector('video')?.paused);
await page.evaluate(()=>{window.__lastVideo=document.querySelector('video');location.hash='#resolucion';});
await page.waitForFunction(()=>window.__lastVideo.paused);
for(const size of [{width:1920,height:1080},{width:1366,height:768}]){
 await page.setViewportSize(size);
 for(const [id,step] of [['animales',1],['animales',2],['regreso',0],['regreso',4],['regreso',9],['lo-pequeno',2],['caeiro',0],['caeiro',1],['cierre',0],['cierre',11]]){
  await page.goto('http://127.0.0.1:4173/#'+id+'/'+step);await page.waitForTimeout(150);if(id==='ave'){await page.waitForFunction(()=>document.querySelector('video')?.readyState>=2);await page.locator('video').evaluate(v=>{v.pause();v.currentTime=4;});await page.waitForFunction(()=>{const v=document.querySelector('video');return v&&!v.seeking&&v.readyState>=2;});}await page.screenshot({path:`verification/bienestar-caeiro/${id}-${step}-${size.width}.png`});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth||document.documentElement.scrollHeight>innerHeight),false);
 }
}
await page.goto('http://127.0.0.1:4173/#biodiversidad');await page.getByRole('button',{name:'2 km',exact:true}).click();assert.match(await page.locator('.campus-heading').innerText(),/85/);await page.getByRole('button',{name:'5 km',exact:true}).click();assert.match(await page.locator('.campus-heading').innerText(),/179/);
await page.keyboard.press('r');assert.match(await page.locator('dialog').innerText(),/iNaturalist/);await page.keyboard.press('Escape');
await page.getByRole('button',{name:'Especies y distancias',exact:true}).click();assert.ok(await page.locator('.campus-records tbody tr').count()>0);assert.ok((await page.locator('.campus-heading').boundingBox()).y>=0);assert.equal(await page.locator('.campus-heading').isVisible(),true);assert.match(await page.locator('.campus-records').innerText(),/ m| km/);
await page.goto('http://127.0.0.1:4173/#asombro');await page.waitForTimeout(50);assert.equal(await page.locator('video').count(),0);assert.match(await page.locator('.scene-content').innerText(),/ASOMBRO/);
await page.goto('http://127.0.0.1:4173/#miedo');for(let step=0;step<6;step++){assert.equal(await page.locator('.black-scene').count(),0);await page.waitForFunction(()=>[...document.querySelectorAll('.scene-background img')].every(im=>im.complete&&im.naturalWidth>0));await page.keyboard.press('ArrowRight');}
await page.goto('http://127.0.0.1:4173/#cierre');assert.equal(await page.evaluate(()=>window.__audios.filter(a=>!a.paused).length),0);
await page.keyboard.press('s');await page.getByRole('button',{name:'Preparar copia sin conexión',exact:false}).click();await page.getByRole('status').filter({hasText:'Lista para usar sin conexión'}).waitFor({timeout:90000});await page.keyboard.press('Escape');
await ctx.setOffline(true);await page.reload();await page.locator('.stage').waitFor();await page.evaluate(()=>location.hash='#ave/4');await page.locator('.bird-reveal video').waitFor();await page.waitForFunction(()=>document.querySelector('video')?.readyState>=2);assert.equal(await page.locator('video').evaluate(v=>v.videoWidth),500);await page.getByRole('button',{name:'Repetir el mismo registro',exact:false}).click();await page.waitForFunction(()=>document.querySelector('video')?.currentTime>0);
await page.evaluate(()=>location.hash='#biodiversidad');await page.locator('.campus-capture img').waitFor();await page.waitForFunction(()=>document.querySelector('.campus-capture img')?.naturalWidth>0);assert.match(await page.locator('.campus-heading').innerText(),/48/);
await ctx.setOffline(false);
assert.equal(presentation.length,31);assert.equal(Number(presentation.reduce((n,s)=>n+s.minutes,0).toFixed(1)),30.8);
assert.deepEqual(missing,[]);assert.deepEqual(errors,[]);
await writeFile('verification/results.json',JSON.stringify({scenes:presentation.length,steps:visited,errors,missing,checks:['keyboard-full-route','all-presenter-notes','chapter-jumps','home-end-space-left','video-real-hidden-reveal-names-replay-global-mute-no-overlap','asombro-without-video','fear-photos-no-black-steps','controls-hidden-by-default','real-app-captures-and-distances','hash','sources','radii','1920x1080','1366x768','reduced-motion','offline-reload-video-playback-and-map']},null,2));
await browser.close();console.log('PASS',presentation.length,'scenes',visited,'steps');

