import type { Theme } from './types';
export const themes: Record<Theme,{bg:string;ink:string;accent:string}> = {
 dawn:{bg:'#413b40',ink:'#f6e9dd',accent:'#d2af92'},city:{bg:'#303c3d',ink:'#f0eee4',accent:'#acbf9e'},science:{bg:'#e8ece5',ink:'#203c37',accent:'#476954'},
 contemplative:{bg:'#202e3b',ink:'#f0f0e9',accent:'#b8cbbd'},life:{bg:'#293c2b',ink:'#f4efdc',accent:'#d9d8a0'},fear:{bg:'#111821',ink:'#eeede7',accent:'#b6c5d7'},paper:{bg:'#ffffff',ink:'#161616',accent:'#47543d'},other:{bg:'#202621',ink:'#eae7dc',accent:'#c2bca1'},body:{bg:'#233d34',ink:'#fff3d9',accent:'#d1d49f'},memory:{bg:'#463a2c',ink:'#f4e9d8',accent:'#dbc19b'},joy:{bg:'#263a30',ink:'#f6f2df',accent:'#e2dcab'},black:{bg:'#000000',ink:'#f1eee7',accent:'#bdbbb0'}
};
