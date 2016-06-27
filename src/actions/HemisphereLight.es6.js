import store from '../store.es6.js';

export function add(skyColor, groundColor, intensity) {
  return (new Promise(resolve => {
    store.dispatch({
      type: 'ADD_HEMISPHERE_LIGHT',
      skyColor, groundColor, intensity
    });
    resolve();
  }));
}
