import * as THREE from 'three';

const setPosition = (bx, by, bz, position = {}) => {
  return {
    x: bx + (position.x || 0),
    y: by + (position.y || 0),
    z: bz + (position.z || 0)
  };
};

const setSize = (size = {}) => {
  return {
    width: size.x || 1,
    height: size.y || 1,
    depth: size.z || 1
  };
};

export const rule = state => {
  const { hash, size } = state;
  const datas = state.data[0];
  const defaultPosition = { x: 0, y: 0, z: 0 };
  let i = 0;
  for (let bx = 0; bx < size; bx++) {
    for (let by = 0; by < size; by++) {
      for (let bz = 0; bz < size; bz++) {
        const hex = hash[i];
        const data = datas[hex] || {};
        const { x, y, z } = setPosition(bx, by, bz, data.position);
        const { width, height, depth } = setSize(data.size);
        let geometry = new THREE.BoxGeometry(width, height, depth);
        let material = new THREE.MeshBasicMaterial({ color: 0xdddddd });
        let mesh = new THREE.Mesh( geometry, data.material );
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.position.set(x, y, z);
        state.scene.add(mesh);
        i++;
      }
    }
  }
}
