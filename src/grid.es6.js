import THREE from 'three';
let axes = ['x', 'y', 'z'];

export default (scene, cfg) => {
  cfg.scan.forEach((data) => {
    let cube = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial( { wireframe: true })
    );
    data.z += cfg.size / 2;
    cube.position.set(data.x, data.y, data.z);
    scene.add( cube );
  });
};
