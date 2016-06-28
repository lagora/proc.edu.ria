import store from '../store.es6.js';
import * as HemisphereLight from './HemisphereLight.es6.js';
import * as DirectionalLight from './DirectionalLight.es6.js';
import * as SpotLight from './SpotLight.es6.js';

function init() {
  HemisphereLight.add();
  DirectionalLight.add();
  SpotLight.add();
  // HemisphereLightHelper.add();
  // DirectionalLightHelper.add();
  // SpotLightHelper.add();
}

function remove(name) {
  store.dispatch({ type: 'REMOVE_LIGHT', name});
}

export { init, remove };
