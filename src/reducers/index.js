import * as actions from '../actions';
import { initialState } from '../state';
import canvasReducer from './canvas';
import demoReducer from './demo';
import fpsReducer from './fps';
import procEduRiaReducer from './proc.edu.ria';
import renderReducer from './render';
import rulesReducer from './rules';

export default function reduce(
  state = initialState,
  action = { type: actions.NULL_ACTION }
) {
  if (action.type === 'PARSE_URL_PARAMS') {
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
  state = rulesReducer(state, action);

  return state;
}
