import THREE from 'three';

export const getPerspectiveCamera = state => new THREE.PerspectiveCamera(
  state.fov, state.ratio, state.near, state.far
);

export const to = (...args) => {
  console.log('to', args);
  // return
}

export const add = object => {
  return { object, to: to };
}

export const addToScene = (scene, object) => {
  const newScene = { ...scene };
  newScene.add(object);
  return newScene;
}
