import * as actions from '../actions';
import { initialState } from '../state';
import canvasReducer from './canvas';
import cameraReducer from './camera';
import deltaReducer from './delta';
// import lightsReducer from './lights';
import threeReducer from './three';
// import nullReducer from './null';

export default function reduce(
  state = initialState,
  action = { type: actions.NULL_ACTION }
) {
  state = cameraReducer(state, action);
  state = canvasReducer(state, action);
  state = deltaReducer(state, action);
  // state = lightsReducer(state, action);
  state = threeReducer(state, action);
  // state = nullReducer(state, action);

  return state;
}
