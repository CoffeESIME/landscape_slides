import {chromium} from '@playwright/test';
const b=await chromium.launch({headless:true,executablePath:process.env.LOCALAPPDATA+'/ms-playwright/chromium-1234/chrome-win64/chrome.exe'});const p=await b.newPage({viewport:{width:1366,height:768},reducedMotion:'reduce'});
for (const [id,step] of [['miedo',1],['asombro',0],['biodiversidad',0]]){await p.goto(`http://127.0.0.1:4173/?revision=20261008#${id}/${step}`);await p.waitForTimeout(700);await p.screenshot({path:`verification/revision-${id}.png`});}
await p.getByRole('button',{name:'Especies y distancias',exact:true}).click();await p.screenshot({path:'verification/revision-distances.png'});await b.close();
