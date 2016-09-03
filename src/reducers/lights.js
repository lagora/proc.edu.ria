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

export const addHemisphereLight = (state, action) => {
  const HemisphereLight = new THREE.HemisphereLight( 0x777777, 0xcccccc, 0.5 );
  add(HemisphereLight).to(scene);
  // return helpers.addToScene()
};

export const addSpotLight = (state, action) => {

};

export const addDirectionalLight = (state, action) => {

};

export default function reduce(state, action) {
  if (action.type === actions.ADD_HEMISPHERE_LIGHT) {
    return addHemisphereLight(state, action);
  } else if (action.type === actions.ADD_SPOT_LIGHT) {
    return addSpotLight(state, action);
  } else if (action.type === actions.ADD_DIRECTIONAL_LIGHT) {
    return addDirectionalLight(state, action);
  }

  return state;
}
