import 'babel-polyfill';
import * as THREE from 'three';
import * as actions from '../actions/lights';
import {
  add,
  to
} from '../helpers';

/*
var HemisphereLight = new THREE.HemisphereLight( 0x777777, 0xcccccc, 0.5 );
var DirectionalLight = new THREE.DirectionalLight( 0xffffbb, 0.5 );
DirectionalLight.position.set( 0, 1, 0.75 );
var spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 10, cfg.size * 2, cfg.size );

spotLight.castShadow = true;
let shadowMapSize = 4096;
spotLight.shadow.mapSize.width = shadowMapSize;
spotLight.shadow.mapSize.height = shadowMapSize;

spotLight.shadow.camera.near = cfg.near;
spotLight.shadow.camera.far = cfg.far;
spotLight.shadow.camera.fov = cfg.fov / 2;
*/

export default function reduce(state, action) {
  if (action.type === actions.ADD_HEMISPHERE_LIGHT) {
    const HemisphereLight = new THREE.HemisphereLight( 0x777777, 0xcccccc, 0.5 );
    state.scene.add(HemisphereLight);
  } else if (action.type === actions.ADD_SPOT_LIGHT) {
    var spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set( 0, state.size * 2, state.size );
    spotLight.castShadow = true;
    const shadowMapSize = 4096;
    spotLight.shadow.mapSize.width = shadowMapSize;
    spotLight.shadow.mapSize.height = shadowMapSize;
    spotLight.shadow.camera.near = state.near;
    spotLight.shadow.camera.far = state.far;
    spotLight.shadow.camera.fov = state.fov / 2;
    state.scene.add(spotLight);
  } else if (action.type === actions.ADD_DIRECTIONAL_LIGHT) {
    var directionalLight = new THREE.DirectionalLight( 0xffffbb, 0.5 );
    directionalLight.position.set( 0, 1, 0.75 );
    state.scene.add(directionalLight);
  } else if (action.type === actions.UPDATE_LIGHT_POSITION) {
    // state.scene.children.map(object => {
    //   // if (object.type === action.)
    // });
  }

  return state;
}
