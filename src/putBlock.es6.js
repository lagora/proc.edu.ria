import cfg from './config.es6.js';
import THREE from 'three';

let axes = ['x', 'y', 'z'];

var putBlock = (scene, data, laterMerging = true) => {
  if (!data) {
    console.error('no data, aborting');
    return;
  } else if (data.raw) {
    putBlock(scene, data.raw);
  }

  let geometry = new THREE.BoxGeometry(
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
  let mesh = new THREE.Mesh( geometry, material );
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.position.set(data.position.x, data.position.y, data.position.z);

  if (laterMerging) {
    return mesh;
  } else {
    scene.add( mesh );
  }
};

export default putBlock;
