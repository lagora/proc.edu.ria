import THREE from 'three';
import store from '../store.es6.js';

export function cube() {
  return (new Promise(resolve => {
    store.dispatch({ type: 'TEST_CUBE' });
    resolve();
  }));
}
