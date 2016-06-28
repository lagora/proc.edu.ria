import THREE from 'three';
import state from './state.es6.js';

import * as scene from './reducers/Scene.es6.js';
import * as renderer from './reducers/Renderer.es6.js';
import * as HemisphereLight from './reducers/HemisphereLight.es6.js';
import * as DirectionalLight from './reducers/DirectionalLight.es6.js';
import * as SpotLight from './reducers/SpotLight.es6.js';
import * as Light from './reducers/Light.es6.js';
import * as GridHelper from './reducers/GridHelper.es6.js';
import * as camera from './reducers/Camera.es6.js';
import * as helpers from './reducers/Helpers.es6.js';
import * as mesh from './reducers/Mesh.es6.js';

import rule_0 from './reducers/rule.0.es6.js';
// import rule_1 from './reducers/rule.1.es6.js';

const actions = {
  scene, renderer
};

export default function stateUpdater(newState = state, action) {
  const isRenderRelated = action.type === 'RENDERER_RENDER'|| action.type === 'RENDERER_CLEAR';
  const isUpdateRelated = action.type.indexOf('UPDATE_CAMERA') >= 0 || action.type === 'CAMERA_LOOK_AT';
  if (!isRenderRelated && !isUpdateRelated) {
    console.info(action, newState);
  }

  const splitActionType = action.type.split('_');
  const actionSubject = splitActionType[0].toLowerCase();
  const method = splitActionType.slice(1).join('').toLowerCase();

  switch (actionSubject) {
    case 'scene':
      return scene[method](newState, action);
    case 'renderer':
      return renderer[method](newState, action);
  }

  switch (action.type) {
    case 'STOP':
      return Object.assign({}, newState, {
        running: false
      });
    case 'ENABLE_RENDERER_SHADOW_MAP':
      return renderer.enableShadowMap(newState, action);
    case 'ADD_HEMISPHERE_LIGHT':
      return HemisphereLight.add(newState, action);
    case 'ADD_DIRECTIONAL_LIGHT':
      return DirectionalLight.add(newState, action);
    case 'ADD_SPOT_LIGHT':
      return SpotLight.add(newState, action);
    case 'ADD_GRID_HELPER':
      return GridHelper.add(newState, action);
    case 'REMOVE_LIGHT':
      return Light.remove(newState, action);
    case 'REMOVE_GRID_HELPER':
      return helpers.remove(newState, action);
    case 'ADD_PERSPECTIVE_CAMERA':
      return camera.addPerspectiveCamera(newState, action);
    case 'SET_CURRENT_CAMERA':
      return camera.setCurrent(newState, action);
    case 'INIT_CAMERA_CONTROLS':
      return camera.initControls(newState, action);
    case 'UPDATE_CAMERA_CONTROLS':
      return camera.updateControls(newState, action);
    case 'UPDATE_CAMERA_ANGLE':
      return camera.updateAngle(newState, action);
    case 'UPDATE_CAMERA_LOOK_AT':
      return camera.lookAt(newState, action);
    case 'TEST_CUBE':
      let geometry = new THREE.BoxGeometry(1, 1, 1);
      let material = new THREE.MeshPhongMaterial(
        {
          color: 0xdddddd,
          specular: 0x009900,
          shininess: 30,
          fog: true,
          // shading: THREE.FlatShading
        }
      );
      let mesh = new THREE.Mesh( geometry, material );
      newState.scene.add(mesh);
      return newState;
    case 'MERGE_GEOMETRY':
      return mesh.mergeGeometry(newState, action);
    case 'ADD_MESH':
      return mesh.addMesh(newState, action);
    case 'RULE_0':
      return rule_0(newState, action);
    // case 'RULE_1':
    //   return rule_1(newState, action);
    default:
      return newState;
  }
}
