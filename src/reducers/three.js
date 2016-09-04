import 'babel-polyfill';
import * as THREE from 'three';
import * as actions from '../actions/three';
import * as helpers from '../helpers';

export default function reduce(state, action) {
  if (action.type === actions.INIT_SCENE) {
    const scene = new THREE.Scene();
    scene.up = new THREE.Vector3(0, 0, 1);

    return { ...state, scene };
  } else if (action.type === actions.INIT_RENDERER) {
    const renderer = new THREE.WebGLRenderer();
    document.body.appendChild( renderer.domElement );
    renderer.setSize( state.width * state.zoom, state.height * state.zoom );

    return { ...state, renderer };
  } else if (action.type === actions.INIT_HELPERS) {
    const gridHelper = new THREE.GridHelper( state.size * 2 , 1 );
    gridHelper.position.x = state.size / 2;
    gridHelper.position.z = state.size / 2;
    state.scene.add(gridHelper);

    const axisHelper = new THREE.AxisHelper( state.size * 2 );
    axisHelper.position.x = state.size / 2;
    axisHelper.position.z = state.size / 2;
    state.scene.add(axisHelper);
  }

  return state;
}
