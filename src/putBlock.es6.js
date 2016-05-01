import THREE from 'three';

let axes = ['x', 'y', 'z'];

var putBlock = (scene, data) => {
  if (!data) {
    console.error('no data, aborting');
    return;
  } else if (data.raw) {
    putBlock(scene, data.raw);
  }

  let geometry = new THREE.BoxGeometry(
    data.size.x, data.size.y, data.size.z,
    1, 1, 1
  );
  // let material = new THREE.MeshLambertMaterial( { color: c } )
  // let material = new THREE.MeshNormalMaterial( { wireframe: cfg.wireframe } )
  let material = new THREE.MeshPhongMaterial( {
    color: 0xdddddd,
    specular: 0x009900,
    shininess: 30,
    fog: true,
    shading: THREE.FlatShading
  } );
  // let material = new THREE.MeshDepthMaterial( { wireframe: cfg.wireframe } )
  // let material = new THREE.LineBasicMaterial( { fog: true })
  let cube = new THREE.Mesh( geometry, material );
  cube.castShadow = true;
  cube.receiveShadow = true;
  cube.name = data.name;

  axes.forEach((axis) => {
    cube.position[axis] = data.position[axis];
  });

  scene.add( cube );
};

export default putBlock;
