import THREE from 'three';
import cfg from './config.es6.js';
import { scene, camera, renderer, render } from './init.es6.js';
import { HemisphereLight, HemisphereLightHelper, DirectionalLightHelper } from './light.es6.js';
import generator from './generator.es6.js';
import putBlock from './putBlock.es6.js';
import putObject from './putObject.es6.js';

let data = []
let geometry = new THREE.BufferGeometry();
geometry.dynamic = true;

let angle = 0;
var put = {
  'raw': putBlock,
  'object': putObject
};
var putMethod = 'raw';

var generate = generator(cfg);
var generatedData = undefined;

var update = () => {
  if (cfg.autoRotate && window.controls.autoRotate) controls.update();

  if (cfg.debug) {
    HemisphereLightHelper.update();
    DirectionalLightHelper.update();
  }

  camera.lookAt(new THREE.Vector3());
  requestAnimationFrame( update );
  renderer.render( scene, camera );
  angle += 0.25;
  // generatedData = generator(cfg).next().value;
  // if (!generatedData) {
  //   console.log('generatedData', generatedData.value);
  //   put[putMethod](scene, generatedData.value[putMethod]);
  // }
};

update();

generatedData = generatedData = generator(cfg).next();
console.log('generatedData', generatedData);
while (!generatedData.done) {
  put[putMethod](scene, generatedData.value[putMethod]);
  generatedData = generator(cfg).next();
}

// generator(cfg, (err, data) => {
//   console.log('err', err);
//   if (Array.isArray(data)) {
//     data.forEach((item) => {
//       put[putMethod](scene, item[putMethod], geometry);
//     });
//   }
// });
