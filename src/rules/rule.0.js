import * as THREE from 'three';
/*
hex:
  0: empty block
  1-8: quarter block
  9-e: half-block
  f: full block
*/
const setPosition = (hex, x, y, z) => {
  if (hex === '0') {
    return { x, y, z };
  }
  const _int = parseInt(hex, 16);
  if (_int > 0 && _int < 9) {
    x += 0.25;
    y += 0.25;
    z += 0.25;
  }
  if (_int > 4 && _int < 9) {
    z += 0.5;
  }
  if (hex === '2' || hex === '6') {
    x += 0.5;
  }
  if (hex === '4' || hex === '8') {
    y += 0.5;
  }
  if (hex === '9' || hex === 'a') {
    x += 0.25;
    y += 0.5;
    z += 0.5;
  }
  if (hex === 'a') {
    x += 0.5;
  }
  if (hex === 'b' || hex === 'c') {
    x += 0.5;
    y += 0.25;
    z += 0.5;
  }
  if (hex === 'c') {
    y += 0.5;
  }
  if (hex === 'd' || hex === 'e') {
    x += 0.5;
    y += 0.5;
    z += 0.25;
  }
  if (hex === 'e') {
    z += 0.5;
  }
  if (hex === 'f') {
    x += 0.5;
    y += 0.5;
    z += 0.5;
  }

  return { x, y, z };
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

export const rule = state => {
  const { hash, size } = state;
  const datas = state.data[0];
  let i = 0;
  for (let x = 0; x < size; x++) {
    for (let z = 0; z < size; z++) {
      for (let y = 0; y < size; y++) {
        const hex = hash[i];
        if (hex !== '0') {
          const data = datas[hex] || {};
          const position = setPosition(hex, x, y, z);
          const cubeSize = setSize(hex);
          const geometry = new THREE.BoxBufferGeometry(cubeSize.x, cubeSize.y, cubeSize.z);
          const materialArgs = {
            color: 0xdddddd,
            specular: 0x009900,
            shininess: 30,
            fog: true,
            wireframe: false,
            shading: "FlatShading",
          };
          const material = new THREE.MeshPhongMaterial(materialArgs);
          const mesh = new THREE.Mesh( geometry, material );
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          mesh.position.set(position.x, position.y, position.z);
          state.scene.add(mesh);
        }
        i++;
      }
    }
  }
}
