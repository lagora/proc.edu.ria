import THREE from 'three';

export function mergeGeometry(newState, action) {
  const combinedMeshes = new THREE.Geometry();
  for (let i = 0; i < action.meshes.length; i++) {
    action.meshes[i].updateMatrix();
    combinedMeshes.merge(action.meshes[i].geometry, action.meshes[i].matrix);
  }

  return Object.assign({}, newState, { combinedMeshes });
}

export function addMesh(newState, action) {
  let meshToAdd = new THREE.Mesh(newState.combinedMeshes, action.material);
  meshToAdd.castShadow = newState.shadows || true;
  meshToAdd.receiveShadow = newState.shadows || true;
  newState.scene.add(meshToAdd);
  return newState;
}
