import 'babel-polyfill';
import cfg from './config.es6.js';
import THREE from 'three';
import Camera from './camera.es6.js';
import { scene, renderer, render } from './init.es6.js';
import { HemisphereLight, HemisphereLightHelper, DirectionalLightHelper } from './light.es6.js';
import scan from './scan.es6.js';
import generator from './generator.es6.js';
import * as renderMethods from './methods.es6.js';
import pilar from './pilar.es6.js';

var camera = new Camera();

let world = {
  seed: cfg.rawSeed,
  size: cfg.size,
  unit: cfg.unit,
  cubicSize: cfg.cubicSize,
  scan: scan(cfg.size, 1),
  data: []
};

let geometry = new THREE.BufferGeometry();
geometry.dynamic = true;

var update = () => {
  cfg.delta = cfg.clock.getDelta();

  if (cfg.debug) {
    HemisphereLightHelper.update();
    DirectionalLightHelper.update();
  }

  camera.update();
  renderer.clear();
  requestAnimationFrame( update );
  renderer.render( scene, camera.camera );
};

update();

pilar(scene, cfg);

generator(world, (err, newWorld) => {
  world = newWorld;
  world.data.forEach((levelData) => {
    levelData.forEach((item) => {
      renderMethods[item.renderMethod](scene, item, world.size);
    });
  });
});