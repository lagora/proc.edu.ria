import THREE from 'three';
import cfg from './config.es6.js';
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
scene.up = new THREE.Vector3(0, 0, 1);

if (cfg.debug) {
  var size = cfg.size - 1;
  var step = 1;
  var gridHelper = new THREE.GridHelper( size , step );
  gridHelper.position.x = cfg.size / 2;
  gridHelper.position.z = cfg.size / 2;
  var axisHelper = new THREE.AxisHelper(cfg.size * 2 );
  scene.add( axisHelper );
  if (cfg.debug)  console.info(
    'init',
    'gridHelper:', 'size:', size
  );
  scene.add( gridHelper );
};

renderer.setSize( cfg.w * cfg.zoom, cfg.h * cfg.zoom );

let axes = ['x', 'y', 'z'];

var material = new THREE.LineBasicMaterial({
    color: 0xffffff
});
let geometry = new THREE.Geometry();
for (var x = 0; x <= cfg.size; x++) {
  for (var y = 0; y <= cfg.size; y++) {
    for (var z = 0; z <= cfg.size; z++) {
      geometry.vertices.push(new THREE.Vector3(0, y, z));
      geometry.vertices.push(new THREE.Vector3(cfg.size, y, z));
      geometry.vertices.push(new THREE.Vector3(x, y, 0));
      geometry.vertices.push(new THREE.Vector3(x, y, cfg.size));
      geometry.vertices.push(new THREE.Vector3(x, 0, z));
      geometry.vertices.push(new THREE.Vector3(x, cfg.size, z));
    }
  }
}
scene.add(new THREE.LineSegments(geometry, material));


document.body.appendChild( renderer.domElement );

export { scene, renderer };
