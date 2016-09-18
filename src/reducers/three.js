import 'babel-polyfill';
import * as THREE from 'three';
import * as actions from '../actions/three';
import * as helpers from '../helpers';

export default function reduce(state, action) {
  if (action.type === actions.INIT_CLOCK) {
    const clock = THREE.Clock();
    return { ...state, clock };
  } else if (action.type === actions.INIT_SCENE) {
    const scene = new THREE.Scene();
    scene.up = new THREE.Vector3(0, 0, 1);

    return { ...state, scene };
  } else if (action.type === actions.INIT_RENDERER) {
    const renderer = new THREE.WebGLRenderer();
    document.body.appendChild( renderer.domElement );
    renderer.setSize( state.width * state.zoom, state.height * state.zoom );

    return { ...state, renderer };
  } else if (action.type === actions.INIT_HELPERS) {
    const oddSize = state.size % 2 !== 0;
    const gridSize = state.size;
    const gridHelper = new THREE.GridHelper( gridSize , 1 );
    gridHelper.position.x = gridSize / 2;
    gridHelper.position.z = gridSize / 2;
    state.scene.add(gridHelper);

    const axisHelper = new THREE.AxisHelper( state.size * 2 );
    axisHelper.position.x = gridSize / 2;
    axisHelper.position.z = gridSize / 2;
    state.scene.add(axisHelper);
  } else if (action.type === actions.INIT_HEMISPHERE_LIGHTS_HELPERS) {
    state.scene.children
    .filter(object => object.type === 'HemisphereLight')
    .forEach(light => {
      state.scene.add(new THREE.HemisphereLightHelper(light, 4));
    });
  } else if (action.type === actions.INIT_DIRECTIONAL_LIGHTS_HELPERS) {
    state.scene.children
    .filter(object => object.type === 'DirectionalLight')
    .forEach(light => {
      state.scene.add(new THREE.DirectionalLightHelper(light, state.size + 1));
    });
  } else if (action.type === actions.INIT_SPOT_LIGHTS_HELPERS) {
    state.scene.children
    .filter(object => object.type === 'SpotLight')
    .forEach(light => {
      state.scene.add(new THREE.SpotLightHelper(light));
    });
  } else if (action.type === actions.INIT_BUFFER_GEOMETRY) {
    return { ...state, geometry: new THREE.BufferGeometry() };
  } else if (action.type === actions.INIT_SHADOW_MAP) {
    state.renderer.shadowMapEnabled = true;
  } else if (action.type === actions.INIT_FOG) {
    state.scene.fog = new THREE.Fog(0xffffff, state.near, state.far);
  }

  return state;
}
