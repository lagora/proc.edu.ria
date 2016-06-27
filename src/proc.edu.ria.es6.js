import 'babel-polyfill';
// import THREE from 'three';
import state from './state.es6.js';

import * as scene from './actions/Scene.es6.js';
import * as light from './actions/Light.es6.js';
import * as helpers from './actions/Helpers.es6.js';
import * as renderer from './actions/Renderer.es6.js';
import * as camera from './actions/Camera.es6.js';
import * as test from './actions/testCube.es6.js';

// import getCityPilar from './getCityPilar.es6.js';
// import putBlock from './putBlock.es6.js';
// import getCityBlockHelper from './getCityBlockHelper.es6.js';

function update() {
  // // cfg.delta = cfg.clock.getDelta();
  camera.update()
  .then(renderer.clear)
  .then(() => {
    requestAnimationFrame( update );
    renderer.render();
  });
}

scene.init()
.then(renderer.init)
.then(renderer.enableShadowMap)
.then(renderer.resize)
.then(light.init)
.then(helpers.init)
.then(renderer.attach)
.then(camera.addPerspectiveCamera)
// .then(camera.setCurrent)
.then(camera.initControls)
.then(test.cube)
// .then(rule_0)
.then(update)
.catch(err => console.trace(err))
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
