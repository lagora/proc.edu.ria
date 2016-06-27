import store from '../store.es6.js';

export function add() {
  return (new Promise(resolve => {
    store.dispatch({ type: 'ADD_GRID_HELPER' });
    resolve();
  }));
}

export function remove(name) {
  return (new Promise(resolve => {
    store.dispatch({ type: 'REMOVE_GRID_HELPER' });
    resolve();
  }))
}
