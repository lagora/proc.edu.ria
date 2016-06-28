import THREE from 'three';
import store from '../store.es6.js';

export function cube() {
  store.dispatch({ type: 'TEST_CUBE' });
}
