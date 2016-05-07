import cfg from './config.es6.js';
import THREE from 'three';

let axes = ['x', 'y', 'z'];

var putBlock = (scene, data, worldSize) => {
  if (!data) {
    console.error('no data, aborting');
    return;
  } else if (data.raw) {
    putBlock(scene, data.raw);
  }

  let geometry = new THREE.BoxBufferGeometry(
    data.size.x, data.size.y, data.size.z
  );
  let material = new THREE.MeshPhongMaterial( {
    color: 0xdddddd,
    specular: 0x009900,
    shininess: 30,
    fog: true,
    wireframe: cfg.wireframe,
    shading: THREE.FlatShading
  } );
  let cube = new THREE.Mesh( geometry, material );
  cube.castShadow = true;
  cube.receiveShadow = true;

  cube.position.set(data.position.x, data.position.y, data.position.z);

  scene.add( cube );

  if (1 == 0 && cfg.debug) {
    let cube = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial( { wireframe: true })
    );
    // data.z += cfg.size / 2;
    cube.position.set(
      Math.floor(data.position.x) + 0.5,
      Math.floor(data.position.y) + worldSize / 2,
      Math.floor(data.position.z) + 0.5
    );
    scene.add( cube );
  }
};

export default putBlock;
