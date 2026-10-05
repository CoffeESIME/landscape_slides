import { readdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
async function walk(dir){const entries=await readdir(dir,{withFileTypes:true});return (await Promise.all(entries.map(e=>e.isDirectory()?walk(dir+'/'+e.name):[dir+'/'+e.name]))).flat();}
const files=(await walk('dist')).filter(p=>!p.endsWith('/sw.js'));const urls=files.map(f=>'./'+f.slice(5));
const hash=createHash('sha256');for(const f of files)hash.update(await readFile(f));const version=hash.digest('hex').slice(0,12);
const shell=urls.filter(u=>u==='./index.html'||u.startsWith('./assets/')||u.includes('/fonts/')||u.endsWith('favicon.svg')||u.includes('/opening/'));
const worker=`const CACHE='aprender-mirar-${version}';
const ALL=${JSON.stringify(urls)};const SHELL=${JSON.stringify(shell)};
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('aprender-mirar-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('message',e=>{if(e.data?.type==='CACHE_ALL')e.waitUntil((async()=>{try{const c=await caches.open(CACHE);for(const u of ALL)if(!(await c.match(u)))await c.add(u);e.source?.postMessage({type:'OFFLINE_READY'});}catch{e.source?.postMessage({type:'OFFLINE_ERROR'});}})());});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;e.respondWith((async()=>{const c=await caches.open(CACHE);const cached=await c.match(e.request.url);if(cached){const range=e.request.headers.get('range');if(range){const b=await cached.arrayBuffer();const m=/bytes=(\\d+)-(\\d*)/.exec(range);if(m){const start=+m[1],end=m[2]?Math.min(+m[2],b.byteLength-1):b.byteLength-1;if(start>=b.byteLength)return new Response(null,{status:416,headers:{'Content-Range':'bytes */'+b.byteLength}});return new Response(b.slice(start,end+1),{status:206,headers:{'Content-Type':cached.headers.get('Content-Type')||'application/octet-stream','Content-Range':'bytes '+start+'-'+end+'/'+b.byteLength,'Content-Length':String(end-start+1),'Accept-Ranges':'bytes'}});}}return cached;}try{const r=await fetch(e.request);if(r.ok&&r.status===200)c.put(e.request,r.clone());return r;}catch{if(e.request.mode==='navigate')return (await c.match('./index.html'))||Response.error();return Response.error();}})());});`;
await writeFile('dist/sw.js',worker);console.log('Offline: '+files.length+' recursos · '+version);
