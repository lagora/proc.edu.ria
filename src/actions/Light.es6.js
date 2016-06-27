import store from '../store.es6.js';
import * as HemisphereLight from './HemisphereLight.es6.js';
import * as DirectionalLight from './DirectionalLight.es6.js';
import * as SpotLight from './SpotLight.es6.js';

function init() {
  return (new Promise(resolve => {
    HemisphereLight.add()
    // .then(HemisphereLightHelper.add)
    .then(DirectionalLight.add)
    // .then(DirectionalLightHelper.add)
    .then(SpotLight.add)
    // .then(SpotLightHelper.add)
    .then(resolve)
    .catch(err => console.error(err));
  }));
}

function remove(name) {
  return (new Promise (resolve => {
    store.dispatch({ type: 'REMOVE_LIGHT', name});
    resolve();
  }));
}

export { init, remove };
