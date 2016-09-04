import 'babel-polyfill';
import * as THREE from 'three';
const OrbitControls = require('../../node_modules/three-orbit-controls')(THREE);
import * as constants from '../constants';
import { add, to } from '../helpers';
import * as actions from '../actions/camera';


export default function reduce(state, action ) {
  if (action.type === actions.SET_PERSPECTIVE_CAMERA) {
    const ratio = state.width / state.height;
    const camera = new THREE.PerspectiveCamera(
      state.fov, ratio, state.near, state.far
    );
    return { ...state, camera, ratio };
  } else if (action.type === actions.SET_CAMERA_POSITION) {
    const { x, y, z } = action;
    state.camera.position.x = x;
    state.camera.position.y = y;
    state.camera.position.z = z;
  } else if (action.type === actions.SET_CAMERA_LOOK_AT) {
    const { x, y, z } = action;
    state.camera.lookAt(new THREE.Vector3(x, y, z));
  } else if (action.type === actions.SET_CAMERA_CONTROLS) {
    let cameraControls = undefined;
    if (constants.CAMERA_TYPE_ORBITAL === action.cameraType) {
      cameraControls = new OrbitControls(state.camera, state.canvas);
      cameraControls.autoRotate = state.cameraAutoRotate;
    }
    return { ...state, cameraControls };
  }

  return state;
}
