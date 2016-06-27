import THREE from 'three';

export function cube(newState) {
  let geometry = new THREE.BoxGeometry(1, 1, 1);
  let material = new THREE.MeshPhongMaterial(
    {
      color: 0xdddddd,
      specular: 0x009900,
      shininess: 30,
      fog: true,
      // shading: THREE.FlatShading
    }
  );
  let mesh = new THREE.Mesh( geometry, material );
  newState.scene.add(mesh);
  return newState;
}
