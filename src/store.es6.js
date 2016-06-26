import { createStore } from 'redux';
import stateUpdater from './reducers/stateUpdater.es6.js';

let store = createStore(stateUpdater);

export default store;
