import {chromium} from '@playwright/test';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
const b=await chromium.launch({headless:true,executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE||process.env.LOCALAPPDATA+'/ms-playwright/chromium-1234/chrome-win64/chrome.exe',args:['--enable-unsafe-swiftshader']});
const p=await b.newPage({viewport:{width:1440,height:1100},deviceScaleFactor:1});
const summary=JSON.parse(await readFile('research/uam-app/summary.json','utf8'));
const snapshots=[];
function distance(lat,lon){const rad=x=>x*Math.PI/180;return 6371*2*Math.asin(Math.sqrt(Math.sin(rad(lat-19.3525)/2)**2+Math.cos(rad(lat))*Math.cos(rad(19.3525))*Math.sin(rad(lon+99.2824)/2)**2));}
for (const radius of [1,2,5]) {
 const query=`radius=${radius}&taxon=birds&quality=research&sources=inaturalist&view=points`;
 const url='http://localhost:3011/?'+query;
 await p.goto(url,{timeout:120000});
 await p.waitForFunction(()=>{const el=document.querySelector('.metrics-strip');return el&&!el.classList.contains('is-loading')&&el.innerText.includes('ESPECIES REGISTRADAS');},null,{timeout:120000});
 await p.waitForTimeout(4000);
 const r=await p.request.get('http://localhost:3011/api/biodiversity/observations?'+query.replace('&view=points',''),{timeout:120000});if(!r.ok())throw Error('observations '+r.status());const obs=await r.json();await writeFile(`research/uam-app/observations-${radius}.json`,JSON.stringify(obs,null,2));
 if(await p.locator('.map-unavailable').count())throw Error('Map unavailable');
 await writeFile(`research/uam-app/metrics-${radius}.txt`,await p.locator('.metrics-strip').innerText());
 await p.locator('.map-frame').screenshot({path:`public/images/uam-app/mapa-${radius}km.png`});
 const records=obs.geojson.features.map(f=>({commonName:f.properties.commonName||f.properties.scientificName,scientificName:f.properties.scientificName,observedAt:f.properties.observedOn,sourceUrl:f.properties.observationUrl,distanceKm:distance(f.geometry.coordinates[1],f.geometry.coordinates[0])})).sort((a,b)=>a.distanceKm-b.distanceKm);
 const species=[...new Map(records.map(r=>[r.scientificName,r]).reverse()).values()].sort((a,b)=>a.distanceKm-b.distanceKm).slice(0,8);
 snapshots.push({radiusKm:radius,count:Number((await p.locator('.metric strong').first().innerText()).replace(/[^0-9]/g,'')),image:`images/uam-app/mapa-${radius}km.png`,url,generatedAt:obs.meta.generatedAt,truncated:obs.meta.truncated,returned:obs.meta.returned,species});console.log('captured',radius,snapshots.at(-1).count,obs.meta.returned);
}
const data={title:'UAM Cuajimalpa',center:{latitude:19.3525,longitude:-99.2824},source:'iNaturalist · grado de investigación',capturedAt:'2026-10-08',filters:{taxon:'birds',quality:'research',sources:['inaturalist'],period:'Todo el periodo'},snapshots};
await writeFile('src/data/campus-explorer.json',JSON.stringify(data,null,2));await b.close();

