import * as actions from '../actions';
import { initialState } from '../state';
import canvasReducer from './canvas';
import demoReducer from './demo';
import cameraReducer from './camera';
import fpsReducer from './fps';
// import lightsReducer from './lights';
import procEduRiaReducer from './proc.edu.ria';
import renderReducer from './render';
import rulesReducer from './rules';
import threeReducer from './three';
// import nullReducer from './null';

export default function reduce(
  state = initialState,
  action = { type: actions.NULL_ACTION }
) {
  state = cameraReducer(state, action);
  state = canvasReducer(state, action);
  state = demoReducer(state, action);
  state = fpsReducer(state, action);
  // state = lightsReducer(state, action);
  state = procEduRiaReducer(state, action);
  state = renderReducer(state, action);
  state = rulesReducer(state, action);
  state = threeReducer(state, action);
  // state = nullReducer(state, action);

  return state;
}
