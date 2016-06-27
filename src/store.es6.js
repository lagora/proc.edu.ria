import { createStore } from 'redux';
import reducer from './reducer.es6.js';

let store = createStore(reducer);

// store.subscribe(() =>
//   console.log(store.getState())
// );

export default store;
