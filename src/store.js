import {
  createStore,
  applyMiddleware,
} from 'redux';

import { initialState } from './state';
import reducer from './reducers';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import multi from 'redux-multi'
// import * as middleware from './middleware';

const store = initialState.debug ? createStore(
  reducer,
  initialState,
  applyMiddleware(thunk, createLogger(), multi)
  //, window.devToolsExtension && window.devToolsExtension()
) : createStore(
  reducer,
  initialState,
  applyMiddleware(thunk, multi)
);

export default store;
