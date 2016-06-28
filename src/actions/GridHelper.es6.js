import store from '../store.es6.js';

export function add() {
  store.dispatch({ type: 'ADD_GRID_HELPER' });
}

export function remove(name) {
  store.dispatch({ type: 'REMOVE_GRID_HELPER' });
}
