import test from 'node:test';
import assert from 'node:assert/strict';
import {forward,backward,parseHash} from '../src/hooks/navigation.mjs';
const scenes=[{id:'start',steps:[{},{}]},{id:'memory',steps:[{},{},{}]},{id:'end',steps:[{}]}];
test('el avance agota pasos y el regreso restaura el último paso',()=>{assert.deepEqual(forward([0,0],scenes),[0,1]);assert.deepEqual(forward([0,1],scenes),[1,0]);assert.deepEqual(backward([1,0],scenes),[0,1]);});
test('los extremos se mantienen sin avance automático',()=>{assert.deepEqual(backward([0,0],scenes),[0,0]);assert.deepEqual(forward([2,0],scenes),[2,0]);});
test('hash conserva la escena y el paso, normaliza entradas inválidas',()=>{assert.deepEqual(parseHash('#memory/2',scenes),[1,2]);assert.deepEqual(parseHash('#memory/99',scenes),[1,2]);assert.deepEqual(parseHash('#memory/-5',scenes),[1,0]);assert.deepEqual(parseHash('#missing/x',scenes),[0,0]);assert.deepEqual(parseHash('#end/Infinity',scenes),[2,0]);});
test('ida y vuelta por el recorrido conserva la posición',()=>{let p=[0,0];for(let i=0;i<5;i++)p=forward(p,scenes);assert.deepEqual(p,[2,0]);for(let i=0;i<5;i++)p=backward(p,scenes);assert.deepEqual(p,[0,0]);});
