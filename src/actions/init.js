import store from '../store';
import { initCamera } from './camera';
import * as canvas from './canvas';
import * as constants from '../constants';
import * as demo from './demo';
import * as lights from './lights';
import * as three from './three';
import * as procEduRia from './proc.edu.ria';
import * as rules from './rules';
import * as render from './render';

export const PARSE_URL_PARAMS = 'PARSE_URL_PARAMS';

export const parseUrlParams = () => store.dispatch({ type: PARSE_URL_PARAMS });

export const init = () => {
  const state = store.getState();
  const stack = [
    parseUrlParams(),
    three.initClock(),
    three.initScene(),
    three.initRenderer(),
    render.setRatio(),
    initCamera(),
    lights.addHemisphereLight(),
    lights.addDirectionalLight(),
    lights.addSpotLight(),
    three.initBufferGometry(),
    three.initShadowMap(),
    three.initFog(),
    procEduRia.setSquareSize(state.size),
    procEduRia.setCubicSize(state.size),
    procEduRia.makeHashFromSeed(state.seed),
    procEduRia.generateHashRange(),
    rules.loadRules(),
    rules.generateData(),
    procEduRia.makeCityPilar(),
    rules.rule0(),
  ];
  if (state.debug === true) {
    return stack.concat([
      three.initHemisphereLightsHelpers(),
      three.initDirectionalLightsHelpers(),
      three.initSpotLightsHelpers(),
      three.initHelpers(),
    ]);
  }
  return stack;
}
