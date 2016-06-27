import store from '../store.es6.js';

export function add(
  color,
  intensity,
  distance,
  angle,
  penumbra,
  decay
) {
  return (new Promise(resolve => {
    store.dispatch({
      type: 'ADD_SPOT_LIGHT',
      color, intensity, distance, angle, penumbra, decay
    });
    resolve();
  }));
}
