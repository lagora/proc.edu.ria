import THREE from 'three';
import controls from 'three-orbit-controls';
import cfg from './config.es6.js';
import { scene, camera, renderer, render } from './init.es6.js';
import { HemisphereLight, HemisphereLightHelper, DirectionalLightHelper } from './light.es6.js';
import generator from './generator.es6.js';
import putBlock from './putBlock.es6.js';
import putObject from './putObject.es6.js';

var data = []
var geometry = new THREE.BufferGeometry();
geometry.dynamic = true;

var angle = 0;
var put = {
  'raw': putBlock,
  'object': putObject
};
var putMethod = 'raw';

var update = function()  {
  if (cfg.autoRotate) controls.update();

  if (cfg.debug) {
    HemisphereLightHelper.update();
    DirectionalLightHelper.update();
  }

  camera.lookAt(new THREE.Vector3());
  global.window.requestAnimationFrame( update );
  renderer.render( scene, camera );
  angle += 0.25;
};

update();

generator(cfg, function(err, data)  {
  console.log('err', err);
  if (Array.isArray(data)) {
    data.forEach(function(item)  {
      put[putMethod](scene, item[putMethod], geometry);
    });
  }
});
