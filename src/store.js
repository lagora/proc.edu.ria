import {
  createStore,
  compose,
  applyMiddleware,
} from 'redux';

import { initialState } from './state';
import reducer from './reducers';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import three from './middleware/three';
import procEduRia from './middleware/proc.edu.ria';
import rule from './middleware/rule';
import createLogger from 'redux-logger';
import multi from 'redux-multi'
// import * as middleware from './middleware';

const store = initialState.debug ? createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(
      thunk,
      promiseMiddleware,
      three,
      procEduRia,
      rule,
      createLogger(),
      multi
    )
  )
  //, window.devToolsExtension && window.devToolsExtension()
) : createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(
      thunk,
      promiseMiddleware,
      three,
      procEduRia,
      rule,
      multi
    )
  )
);

export default store;
