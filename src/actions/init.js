// import store from '../store';
import {
  INIT_THREE,
  INIT_PROCEDURIA,
  LOAD_RULES,
  RULE_0,
} from '../constants';
// import { initCamera } from './camera';
// import * as canvas from './canvas';
// import * as constants from '../constants';
// import * as demo from './demo';
// import * as three from './three';
// import * as procEduRia from './proc.edu.ria';
// import * as rules from './rules';
// import * as render from './render';

// export const PARSE_URL_PARAMS = 'PARSE_URL_PARAMS';
// export const INIT_REACT_INTERFACE = 'INIT_REACT_INTERFACE';
//
// export const parseUrlParams = () => dispatch => dispatch({ type: PARSE_URL_PARAMS });
// export const initRectInterface = () => dispatch => dispatch({ type: INIT_REACT_INTERFACE });

// export const init = () => dispatch => dispatch({ type: INIT_THREE });
export function init() {
  return [
    { type: INIT_THREE },
    { type: INIT_PROCEDURIA },
    { type: LOAD_RULES },
    // { type: RULE_0 },
  ];
}
// export const init = () => {
//   console.log('init');
//   return function(dispatch) {
//     return dispatch({ type: 'INIT_THREE' });
//   }
// }

// export default function() {
//   // store.dispatch({ type: INIT_THREE });
//   // const state = store.getState();
//   // const stack = [
//     // parseUrlParams(),
//     // three.initClock(),
//     // three.initScene(),
//     // three.initRenderer(),
//     // render.setRatio(),
//     // initRectInterface(),
//     // initCamera(),
//     // three.addHemisphereLight(),
//     // three.addDirectionalLight(),
//     // three.addSpotLight(),
//     // three.initBufferGometry(),
//     // three.initShadowMap(),
//     // three.initFog(),
//     // procEduRia.setSquareSize(),
//     // procEduRia.setCubicSize(),
//     // procEduRia.makeHashFromSeed(),
//     // procEduRia.generateHashRange(),
//     // rules.loadRules(),
//     // rules.generateData(),
//     // procEduRia.makeCityPilar(),
//     // rules.rule0(),
//   // ];
//   // if (state.debug === true) {
//   //   return stack.concat([
//   //     three.initHemisphereLightsHelpers(),
//   //     three.initDirectionalLightsHelpers(),
//   //     three.initSpotLightsHelpers(),
//   //     three.initHelpers(),
//   //   ]);
//   // }
//   // return stack;
// }
