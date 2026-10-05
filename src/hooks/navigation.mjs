export function forward(position, scenes) {
 const [index,step]=position;
 return step<scenes[index].steps.length-1 ? [index,step+1] : index<scenes.length-1 ? [index+1,0] : position;
}
export function backward(position, scenes) {
 const [index,step]=position;
 return step>0 ? [index,step-1] : index>0 ? [index-1,scenes[index-1].steps.length-1] : position;
}
export function parseHash(hash, scenes) {
 const [id,raw]=hash.replace(/^#/,'').split('/');
 const index=Math.max(0,scenes.findIndex(s=>s.id===id));
 const n=Number(raw || 0);
 return [index,Math.min(scenes[index].steps.length-1,Math.max(0,Number.isFinite(n)?Math.floor(n):0))];
}
