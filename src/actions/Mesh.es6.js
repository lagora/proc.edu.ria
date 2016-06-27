import store from '../store.es6.js';

export function mergeGometry(meshes) {
  return (new Promise(resolve => {
    store.dispatch({ type: 'MERGE_GEOMETRY', meshes });
    resolve();
  }));
}

export function addMeshes(meshes, material = defaultMaterial) {
  return (new Promise(resolve => {
    store.dispatch({ type: 'ADD_MESH', mesh, material });
    resolve();
  }));
}
