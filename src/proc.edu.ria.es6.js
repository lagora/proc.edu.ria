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
// import cfg from './config.es6.js';

// import { renderer, camera } from './init.es6.js';
// import sceneAdd from './sceneAdd.es6.js';
// import getCityPilar from './getCityPilar.es6.js';
// import generator from './generator.es6.js';
// import putBlock from './putBlock.es6.js';
// import getCityBlockHelper from './getCityBlockHelper.es6.js';
// import mergeGeometry from './mergeGeometry.es6.js';

// var renderMethods = { putBlock };

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
.then(testCube)
.then(update)
.catch(err => console.error(err))
;
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
