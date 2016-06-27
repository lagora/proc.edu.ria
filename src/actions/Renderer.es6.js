import THREE from 'three';
import store from '../store.es6.js';
import state from '../state.es6.js';

function enableShadowMap() {
  return (new Promise(resolve => {
    store.dispatch({
      type: 'ENABLE_RENDERER_SHADOW_MAP'
    });
    resolve();
  }));
}

function resize() {
  return (new Promise(resolve => {
    store.dispatch({ type: 'RENDERER_RESIZE'});
    resolve();
  }));
}

function init() {
  return (new Promise(resolve => {
    let renderer = new THREE.WebGLRenderer();
    store.dispatch({ type: 'RENDERER_INIT', renderer });
    resolve();
  }));
}

function attach() {
  return (new Promise(resolve => {
    store.dispatch({ type: 'RENDERER_ATTACH' });
    resolve();
  }));
}

function clear() {
  return (new Promise(resolve => {
    store.dispatch({ type: 'RENDERER_CLEAR'});
    resolve();
  }));
}

function render() {
  return (new Promise((resolve, reject) => {
    store.dispatch({ type: 'RENDERER_RENDER' });
    resolve();
  }));
}

export { init, enableShadowMap, resize, attach, clear, render};
