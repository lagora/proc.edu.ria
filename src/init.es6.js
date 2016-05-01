import THREE from 'three';
var OrbitControls = require('three-orbit-controls')(THREE);
import cfg from './config.es6.js';
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( cfg.fov, cfg.w / cfg.h, cfg.near, cfg.far );
var renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
scene.up = new THREE.Vector3(0, 0, 1);

if (cfg.debug) {
  var size = cfg.size + 1;
  var step = 1;
  var gridHelper = new THREE.GridHelper( size , step );
  if (cfg.debug)  console.info(
    'init',
    'gridHelper:', 'size:', size
  );
  scene.add( gridHelper );
};

renderer.setSize( cfg.w * cfg.zoom, cfg.h * cfg.zoom );

let axes = ['x', 'y', 'z'];

window.camereReset = () => {
  let sizeToUse = 'size';
  var distance = cfg[sizeToUse] * 1.5;
  camera.position.x = distance;
  camera.position.y = distance;
  camera.position.z = distance;
  camera.lookAt( { x: cfg[sizeToUse], y: cfg[sizeToUse], z: cfg[sizeToUse] });
};

window.camereReset();

window.controls = new OrbitControls(camera, renderer.domElement);
window.controls.autoRotate = cfg.autoRotate;

document.body.appendChild( renderer.domElement );

export { scene, camera, renderer };
