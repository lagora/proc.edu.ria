import THREE from 'three';
import store from '../store.es6.js';
import state from '../state.es6.js';

function enableShadowMap() {
  store.dispatch({
    type: 'ENABLE_RENDERER_SHADOW_MAP'
  });
}

function resize() {
  store.dispatch({ type: 'RENDERER_RESIZE'});
}

function init() {
  let renderer = new THREE.WebGLRenderer();
  store.dispatch({ type: 'RENDERER_INIT', renderer });
}

function attach() {
  store.dispatch({ type: 'RENDERER_ATTACH' });
}

function clear() {
  store.dispatch({ type: 'RENDERER_CLEAR'});
}

function render() {
  store.dispatch({ type: 'RENDERER_RENDER' });
}

export { init, enableShadowMap, resize, attach, clear, render};
