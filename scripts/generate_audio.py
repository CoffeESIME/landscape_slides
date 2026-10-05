"""Ambientes SINTÉTICOS de demostración. No son grabaciones de campo."""
import numpy as np, pathlib, subprocess, wave, json
root=pathlib.Path(__file__).resolve().parents[1];sr=22050;rng=np.random.default_rng(37)
def noise(n):
 x=rng.normal(0,1,n);return np.convolve(x,np.ones(40)/40,mode='same')
def chirps(t,count=20):
 out=np.zeros(len(t))
 for start in rng.uniform(.5,t[-1]-.7,count):
  x=t-start; env=np.where((x>0)&(x<.45),np.sin(np.pi*np.clip(x/.45,0,1))**2,0)
  out+=.045*env*np.sin(2*np.pi*(2300*x+1400*x*x))
 return out
for name,folder,length in [('forest','forest',24),('storm','storm',20),('body','footsteps',24),('soundscape','water',18)]:
 t=np.arange(int(length*sr))/sr;n=len(t);wind=noise(n)*(.32+.14*np.sin(t*.7));x=wind
 if name in ['forest','soundscape']:x=x+chirps(t,22)
 if name in ['body','soundscape']:
  for st in np.arange(1,length-1,.78):x+=noise(n)*.9*np.exp(-np.maximum(t-st,0)*24)*((t>st)&(t<st+.3))
 if name=='storm':
  x=rng.normal(0,.015,n)+wind
  for st in [2.5,10.5,16]:x+=noise(n)*2*np.exp(-np.maximum(t-st,0)*1.3)*((t>st)&(t<st+4))
 if name=='soundscape':x+=rng.normal(0,.013,n)*(1+.3*np.sin(t*2.8))
 envelope=np.minimum(1,t/1.2)*np.minimum(1,(length-t)/1.5);x=np.clip(x*envelope*1.6,-.8,.8);p=root/'public/audio'/folder;p.mkdir(parents=True,exist_ok=True);wav=p/(name+'.wav')
 with wave.open(str(wav),'w') as w:w.setnchannels(1);w.setsampwidth(2);w.setframerate(sr);w.writeframes((x*32767).astype('<i2').tobytes())
 subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-i',str(wav),'-codec:a','libmp3lame','-b:a','96k',str(p/(name+'.mp3'))],check=True);wav.unlink();print(name,'generated')
