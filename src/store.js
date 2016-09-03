import {
  createStore,
  applyMiddleware,
} from 'redux';

import initialState from './state';
import reducer from './reducers';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import multi from 'redux-multi'
// import * as middleware from './middleware';

const logger = createLogger();
const store = createStore(
  reducer
  , applyMiddleware(
    thunk, logger, multi
  )
  //, window.devToolsExtension && window.devToolsExtension()
);

export default store;
