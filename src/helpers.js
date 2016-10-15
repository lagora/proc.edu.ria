import THREE from 'three';
import * as crypto from 'crypto';

const md5 = data => crypto.createHash('md5').update(data + '').digest('hex');

export const hashPadding = (seed, size) => {
  const mkSeed = str => md5(str);
  let seedHash = mkSeed(seed);
  while (seedHash.length < +size) {
    let remaining = size - seedHash.length;
    seedHash += mkSeed(seedHash).substr(0, remaining);
  }

  return seedHash;
}

export const generateCubeVertices = (position, size) => {
  let vertices = [];

  return vertices;
}

export const scan = (hash, size, callback) => {
  let i = 0;
  for (let x = 0; x < size; x++) {
    for (let z = 0; z < size; z++) {
      for (let y = 0; y < size; y++) {
        const hex = hash[i];
        callback(hex, x, y, z);
        i++;
      }
    }
  }
}

export const cube = size => {
  const geometry = new THREE.BoxGeometry( size, size, size );
  const material = new THREE.MeshBasicMaterial({ color: 0xdddddd });
  const mesh = new THREE.Mesh( geometry, material );
  mesh.position.x = 0;
  mesh.position.y = 0;
  mesh.position.z = 0;
  return mesh;
}

export const to = (...args) => {
  console.log('to', args);
  // return
}

export const add = object => {
  return { object, to: to };
}

export const addToScene = (scene, object) => {
  const newScene = { ...scene };
  newScene.add(object);
  return newScene;
}

export const rotateSun = (cx, cy, x, y, angle) => {
  const radians = (Math.PI / 180) * angle;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  const nx = (cos * (x - cx)) + (sin * (y - cy)) + cx;
  const ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
  return { nx, ny };
}
