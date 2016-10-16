// import * as actions from '../actions';
import {
  INIT_THREE,
  INIT_PROCEDURIA,
} from '../constants';
import { initialState } from '../state';
import canvasReducer from './canvas';
import demoReducer from './demo';
import fpsReducer from './fps';
import procEduRiaReducer from './proc.edu.ria';
import renderReducer from './render';

export default function reduce(state = initialState, action) {
  if (!action) {
    return state;
  }

  const { type } = action;

  if (!type) {
    return state;
  }

  if (type === 'PARSE_URL_PARAMS') {
    const search = window.location.search;
    const newState = { ...state };
    if ( search.length > 0 ) {
      search.split('?')[1].split('&')
      .map(paramString => paramString.split('='))
      .forEach(paramString => {
        if (paramString[0] !== undefined) {
          let value = paramString[1];
          // const lowercase = value.toLowerCase() ? value.toLowerCase() : value;
          value = isNaN(value) ? value : parseInt(value, 10);
          // value = (lowercase === 'true' || value) ? value : !!value;
          newState[paramString[0]] = value;
        }
      });
      console.log('newState', newState);
    }
    return { ...state, newState };
  }

  state = canvasReducer(state, action);
  state = demoReducer(state, action);
  state = fpsReducer(state, action);
  state = procEduRiaReducer(state, action);
  state = renderReducer(state, action);

  if (type === INIT_THREE) {
    Object.keys(action).filter(key => key !== 'type').forEach(key => {
      state = { ...state, [key]: action[key] };
    });
  }

  return state;
}
