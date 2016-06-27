import THREE from 'three';
import store from '../store.es6.js';

function init() {
  return (new Promise(resolve => {
    const scene = new THREE.Scene();
    store.dispatch({ type: 'SCENE_INIT', scene });
    up().then(resolve).catch(err => console.error(err));
  }));
}

function up() {
  return (new Promise(resolve => {
    store.dispatch({ type: 'SCENE_UP' });
    resolve();
  }));
}

function remove(name) {
  return (new Promise(resolve => {
    store.dispatch({ type: 'REMOVE_FROM_SCENE', name });
    resolve();
  }));
}

export { init, up, remove };
