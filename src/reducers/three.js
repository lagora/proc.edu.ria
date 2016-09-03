import 'babel-polyfill';
import * as THREE from 'three';
import * as actions from '../actions/three';

export const initScene = (state, action) => {
  const scene = new THREE.Scene();
  scene.up = new THREE.Vector3(0, 0, 1);
  return { ...state, scene };
}

export const initRenderer = (state, action) => {
  const renderer = new THREE.WebGLRenderer();
  document.body.appendChild( renderer.domElement );
  renderer.setSize( state.width * state.zoom, state.height * state.zoom );
  const canvas = renderer.domElement;
  return { ...state, renderer, canvas };
}

export const initHelpers = (state, action) => {
  const gridHelper = new THREE.GridHelper( state.size - 1 , 1 );
  // gridHelper.position.set( state.size / 2, state.size / 2);
  gridHelper.position.x = state.size / 2;
  gridHelper.position.z = state.size / 2;
  state.scene.add(gridHelper);

  const axisHelper = new THREE.AxisHelper( state.size * 2 );
  state.scene.add(axisHelper);

  return state;
}

export default function reduce(state, action) {
  if (action.type === actions.INIT_SCENE) {
    return initScene(state, action);
  } else if (action.type === actions.INIT_RENDERER) {
    return initRenderer(state, action);
  } else if (action.type === actions.INIT_HELPERS) {
    return initHelpers(state, action);
  }

  return state;
}
