import THREE from 'three';
import store from './store.es6.js';

const defaultMaterial = new THREE.MeshPhongMaterial({
  color: 0xdddddd,
  specular: 0x009900,
  shininess: 30,
  fog: true,
  // wireframe: cfg.wireframe,
  shading: THREE.FlatShading
});

export function testCube() {
  return (new Promise(resolve => {
    store.dispatch({ type: 'TEST_CUBE' });
    resolve();
  }));
}
