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
      multi
    )
  )
);

export default store;
