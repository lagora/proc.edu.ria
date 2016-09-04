import store from '../store';
import { initCamera } from './camera';
import * as canvas from './canvas';
import * as constants from '../constants';
import * as demo from './demo';
import * as three from './three';
import * as procEduRia from './proc.edu.ria';
import * as rules from './rules';
import * as render from './render';

export const init = () => {
  const state = store.getState();
  return [
    three.initScene(),
    three.initRenderer(),
    render.setRatio(),
    initCamera(),
    three.initHelpers(),
    // demo.cube(),
    procEduRia.setSquareSize(state.size),
    procEduRia.setCubicSize(state.size),
    procEduRia.makeHashFromSeed(state.seed),
    procEduRia.generateHashRange(),
    rules.loadRules(),
    rules.generateData(),
    // rules.generateGeometry(),
    // rules.generateMaterial(),
    // rules.generateMesh(),
    rules.rule0(),
  ];
}
