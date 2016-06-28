import store from '../store.es6.js';

export function add(hex = 0xffffbb, intensity = 0.5) {
  store.dispatch({ type: 'ADD_DIRECTIONAL_LIGHT', hex, intensity });
}
