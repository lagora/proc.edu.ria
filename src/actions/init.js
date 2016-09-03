import store from '../store';
import { initCamera } from './camera';
import * as canvas from './canvas';
import * as constants from '../constants';
import * as demo from './demo';
import * as three from './three';
import * as render from './render';

export const init = () => {
  return [
    three.initScene(),
    three.initRenderer(),
    render.setRatio(),
    initCamera(),
    three.initHelpers(),
    demo.cube(),
  ];
}
