import THREE from 'three';
import store from '../store.es6.js';

function init() {
  const scene = new THREE.Scene();
  store.dispatch({ type: 'SCENE_INIT', scene });
  up();
}

function up() {
  store.dispatch({ type: 'SCENE_UP' });
}

function remove(name) {
  store.dispatch({ type: 'REMOVE_FROM_SCENE', name });
}

export { init, up, remove };
