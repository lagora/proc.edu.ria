import * as GridHelper from './GridHelper.es6.js';

export function init() {
  return (new Promise(resolve => {
    GridHelper.add().then(resolve).catch(err => console.error(err));
  }));
}
