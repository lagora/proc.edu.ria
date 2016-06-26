import 'babel-polyfill';
// import THREE from 'three';
import state from './state.es6.js';
import {
  initScene,

  initRenderer,
  setRendererSize,
  enableRendererShadowMap,
  attachRendererToDom,
  clearRenderer,
  render,

  initLights,
  initHelpers,

  initCamera,
  initCameraControls,
  cameraLookAt,
  updateCamera,

  testCube,
} from './actions.es6.js';

import rule_0 from './rule.0.es6.js';

// import getCityPilar from './getCityPilar.es6.js';
// import putBlock from './putBlock.es6.js';
// import getCityBlockHelper from './getCityBlockHelper.es6.js';

function update() {
  // cfg.delta = cfg.clock.getDelta();
  updateCamera()
  .then(clearRenderer)
  .then(() => {
    requestAnimationFrame( update );
    render();
  });
}

initScene()
.then(initRenderer)
.then(enableRendererShadowMap)
.then(setRendererSize)
.then(initLights)
.then(initHelpers)
.then(attachRendererToDom)
.then(initCamera)
.then(initCameraControls)
// .then(testCube)
.then(rule_0)
.then(update)
.catch(err => console.error(err))
;

// rule_0()
// // .then(rule_1)
// ;

// update();
//
// // let pilar = getCityPilar(cfg.size);
// // state.sceneAdd(state.scene, pilar);
//
// // let _grid = getCityBlockHelper(cfg.size);
// // state.sceneAdd(state.scene, _grid);
//
// let meshes = [];
//
// var generatorCallback = (err, levelData) => {
//   // worldData.forEach((levelData) => {
//   if (err || !levelData) {
//     console.log('no levelData');
//     return;
//   }
//
//   // if (Array.isArray(levelData)) {
//   //   for (let eachLevelData in levelData) {
//   //     generatorCallback(null, eachLevelData);
//   //   }
//   //   return;
//   // }
//   console.log('levelData', levelData);
//     levelData
//     // .filter((item) => {
//     //   return !!item.renderMethod;
//     // })
//     .forEach((item) => {
//       meshes.push(renderMethods[item.renderMethod](item));
//     });
//
//     let material = new THREE.MeshPhongMaterial({
//       color: 0xdddddd,
//       specular: 0x009900,
//       shininess: 30,
//       fog: true,
//       wireframe: cfg.wireframe,
//       shading: THREE.FlatShading
//     } );
//     let mesh = new THREE.Mesh(mergeGeometry(meshes), material);
//     mesh.castShadow = cfg.shadows || true;
//     mesh.receiveShadow = cfg.shadows || true;
//     state.sceneAdd(state.scene, mesh);
//   // });
// };
//
// generator(cfg, generatorCallback);
