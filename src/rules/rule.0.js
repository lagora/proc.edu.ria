import * as THREE from 'three';

const setPosition = hex => {
  let position = { x: 0, y: 0, z: 0 };
  if (['2', '3', '6', '7', '9'].indexOf(hex) > -1) {
    position.x = 0.5;
  }
  if (['3', '5', '8'].indexOf(hex) > -1) {
    position.y = 0.5;
  }
  if (['5', '6', '8'].indexOf(hex) > -1) {
    position.z = 0.5;
  }
  return position;
}

const setSize = hex => {
  let size = { x: 0.5, y: 0.5, z: 0.5 };
  if (['b', 'c', 'd', 'e', 'f'].indexOf(hex) > -1) {
    size.x = 1;
  }
  if (['9', 'a', 'd', 'e', 'f'].indexOf(hex) > -1) {
    size.y = 1;
  }
  if (['9', 'a', 'b', 'c', 'f'].indexOf(hex) > -1) {
    size.z = 1;
  }
  return size;
};

const axes = ['x', 'y', 'z'];

export const rule = state => {
  const { hash, size } = state;
  const datas = state.data[0];
  console.log('hash', hash);
  let i = 0;
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      for (let z = 0; z < size; z++) {
        const hex = hash[i];
        const data = datas[hex] || {};
        const worldPosition = setPosition(hex);
        const position = { ...worldPosition, x, y, z };
        let cubeSize = setSize(hex);
        console.log(i, state.hash.length, hex, data, position, cubeSize);
        let geometry = new THREE.BoxBufferGeometry(cubeSize.x, cubeSize.y, cubeSize.z);
        let material = new THREE.MeshBasicMaterial();
        let mesh = new THREE.Mesh( geometry, data.material );
        // mesh.castShadow = true;
        // mesh.receiveShadow = true;
        mesh.position.set(position.x, position.y, position.z);
        state.scene.add(mesh);
        i++;
      }
    }
  }
}
