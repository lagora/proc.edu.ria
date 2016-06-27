import THREE from "three";
// import cfg from "./config.es6.js";
import state from './state.es6.js';
import {
  initScene,
  initRenderer,
  initCamera,
} from './actions.es6.js';

import * as lights from "./Light.es6.js";
import getHelpers from "./getHelpers.es6.js";
import getLightHelper from "./getLightHelper.es6.js";
import sceneAdd from "./sceneAdd.es6.js";

// var state.scene = new THREE.state.scene();
initScene()
.then(initRenderer)
.then(() => {
  Object.keys(lights).forEach((lightType) => {
    if (state.debug) {
      state.sceneAdd(state.scene, getLightHelper(state, lightType, lights[lightType]));
    }
    state.sceneAdd(state.scene, lights[lightType]);
  });

  if (state.debug) {
    var helpers = getHelpers(state);
    Object.values(helpers).forEach((helper) => {
      state.sceneAdd(state.scene, helper);
    });
  }

  setRendererSize( state.w * state.zoom, state.h * state.zoom );
  document.body.appendChild( renderer.domElement );
})
.then(initCamera);
