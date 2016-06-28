import store from '../store.es6.js';

export function add(skyColor, groundColor, intensity) {
  store.dispatch({
    type: 'ADD_HEMISPHERE_LIGHT',
    skyColor, groundColor, intensity
  });
}
