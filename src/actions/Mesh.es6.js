import store from '../store.es6.js';

export function mergeGometry(meshes) {
  store.dispatch({ type: 'MERGE_GEOMETRY', meshes });
}

export function addMeshes(meshes, material = defaultMaterial) {
  store.dispatch({ type: 'ADD_MESH', mesh, material });
}
