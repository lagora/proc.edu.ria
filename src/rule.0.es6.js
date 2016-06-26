import state from './state.es6.js';
import store from './store.es6.js';

export default function rule_0(max = state.max, step = 1) {
  return (new Promise(resolve => {
    let i = 0;
    for (let y = 0; y < max; y += step) {
      for (let z = 0; z < max; z += step) {
        for (let x = 0; x < max; x += step) {
          let hex = state.hash.substr(i);
          store.dispatch({
            TYPE: 'RULE_0',
            i, hex, x, y, z
          });
          i++;
        }
      }
    }

    resolve();
  }));
}
