import 'babel-polyfill';
import * as THREE from 'three';
const OrbitControls = require('../../node_modules/three-orbit-controls')(THREE);
import * as constants from '../constants';
import { getPerspectiveCamera, add, to } from '../helpers';
import * as actions from '../actions/camera';

export const setCameraControls = (state, action) => {
  let cameraControls = undefined;
  if (constants.CAMERA_TYPE_ORBITAL === action.cameraType) {
    let cameraControls = new OrbitControls(state.camera, state.canvas);
    state.cameraControls.autoRotate = state.cameraAutoRotate;
  }
  return { ...state, cameraControls };
}

export default function reduce(state, action ) {
  if (action.type === actions.SET_PERSPECTIVE_CAMERA) {
    const camera = getPerspectiveCamera(state);
    return { ...state, camera };
  } else if (action.type === actions.SET_CAMERA_POSITION) {
    const { x, y, z } = action;
    state.camera.position.x = x;
    state.camera.position.y = y;
    state.camera.position.z = z;
  } else if (action.type === actions.SET_CAMERA_LOOK_AT) {
    const { x, y, z } = action;
    state.camera.lookAt(new THREE.Vector3(x, y, z));
  } else if (action.type === actions.SET_CAMERA_CONTROLS) {
    return setCameraControls(state, action);
  }

  return state;
}
