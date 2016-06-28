import store from '../store.es6.js';

export function add(
  color,
  intensity,
  distance,
  angle,
  penumbra,
  decay
) {
  store.dispatch({
    type: 'ADD_SPOT_LIGHT',
    color, intensity, distance, angle, penumbra, decay
  });
}
