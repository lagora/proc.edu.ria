import THREE from 'three';
import store from './store.es6.js';

const defaultMaterial = new THREE.MeshPhongMaterial({
  color: 0xdddddd,
  specular: 0x009900,
  shininess: 30,
  fog: true,
  // wireframe: cfg.wireframe,
  shading: THREE.FlatShading
});

export function setSceneUp() {
  return (new Promise(resolve => {
    store.dispatch({ type: 'SET_SCENE_UP' });
    resolve();
  }));
}

export function initScene() {
  return (new Promise(resolve => {
    const scene = new THREE.Scene();
    store.dispatch({ type: 'INIT_SCENE', scene });
    setSceneUp().then(resolve);
  }));
}

export function setRendererShadowMap() {
  return (new Promise(resolve => {
    store.dispatch({
      type: 'ENABLE_RENDERER_SHADOW_MAP'
    });
    resolve();
  }));
}

export function setRendererSize() {
  return (new Promise(resolve => {
    store.dispatch({ type: 'SET_RENDERER_SIZE'});
    resolve();
  }));
}

export function initRenderer() {
  return (new Promise(resolve => {
    const renderer = new THREE.WebGLRenderer();
    store.dispatch({ type: 'INIT_RENDERER', renderer });
    resolve();
  }));
}

export function attachRendererToDom() {
  return (new Promise(resolve => {
    store.dispatch({ type: 'ATTACH_RENDERER_TO_DOM' });
    resolve();
  }));
}

export function clearRenderer() {
  return (new Promise(resolve => {
    store.dispatch({ type: 'CLEAR_RENDERER'});
    resolve();
  }));
}

export function render() {
  return (new Promise(resolve => {
    store.dispatch({ type: 'RENDER' });
    resolve();
  }));
}

export function addHemisphereLight(skyColor = 0x777777, groundColor = 0xcccccc, intensity = 0.5) {
  return (new Promise(resolve => {
    store.dispatch({
      type: 'ADD_HEMISPHERE_LIGHT',
      skyColor, groundColor, intensity
    });
    resolve();
  }));
}

export function removeHemisphereLight(name) {
  return (new Promise(resolve => {
    store.dispatch({ type: 'REMOVE_HEMISPHERE_LIGHT', name });
    resolve();
  }));
}

export function addDirectionalLight(hex = 0xffffbb, intensity = 0.5) {
  return (new Promise(resolve => {
    store.dispatch({ type: 'ADD_DIRECTIONAL_LIGHT', hex, intensity })
    resolve();
  }));
}

export function removeDirectionalLight(name) {
  return (new Promise(resolve => {
    store.dispatch({ type: 'REMOVE_DIRECTIONAL_LIGHT', name});
    resolve();
  }));
}

export function addSpotLight(
  color = 0xffffff,
  intensity,
  distance,
  angle,
  penumbra,
  decay
) {
  return (new Promise(resolve => {
    store.dispatch({
      type: 'ADD_SPOT_LIGHT',
      color, intensity, distance, angle, penumbra, decay
    });
    resolve();
  }));
}

export function removeSpotLight(name) {
  store.dispatch({ type: 'REMOVE_SPOT_LIGHT', name});
  resolve();
}

export function initLights() {
  return (new Promise(resolve => {
    addHemisphereLight()
    // .then(addHemisphereLightHelper)
    .then(addDirectionalLight)
    // .then(addDirectionalLightHelper)
    .then(addSpotLight)
    // .then(addSpotLightHelper)
    .then(resolve);
  }));
}

export function addGridHelper() {
  return (new Promise(resolve => {
    store.dispatch({ type: 'ADD_GRID_HELPER' });
    resolve();
  }));
}

export function removeGridHelper(name) {
  return (new Promise(resolve => {
    store.dispatch({ type: 'REMOVE_GRID_HELPER' });
    resolve();
  }))
}

export function initHelpers() {
  return (new Promise(resolve => {
    addGridHelper().then(resolve);
  }));
}

export function initCameraControls() {
  return (new Promise(resolve => {
    store.dispatch({ type: 'INIT_CAMERA_CONTROLS' });
    resolve();
  }));
}

export function addPerspectiveCamera() {
  return (new Promise(resolve => {
    store.dispatch({ type: 'ADD_PERSPECTIVE_CAMERA' });
    resolve();
  }));
};

export function setCurrentCamera(index) {
  return (new Promise(resolve => {
    store.dispatch({ type: 'SET_CURRENT_CAMERA', index });
    resolve();
  }));
}

export function initCamera() {
  return (new Promise(resolve => {
    addPerspectiveCamera()
    .then(setCurrentCamera)
    .then(resolve);
  }));
}

export function updateCameraAngle() {
  return (new Promise(resolve => {
    store.dispatch({ type: 'UPDATE_CAMERA_ANGLE' });
    resolve();
  }));
}

export function updateCameraControls() {
  return (new Promise(resolve => {
    store.dispatch({ type: 'UPDATE_CAMERA_CONTROLS'});
    resolve();
  }));
}

export function cameraLookAt(vector) {
  return (new Promise(resolve => {
    const halfSize = state.size / 2;
    const vector = vector || new THREE.Vector3(halfSize, halfSize, halfSize);
    store.dispatch({ type: 'CAMERA_LOOK_AT', vector });
    resolve();
  }))
}

export function updateCamera() {
  return (new Promise(resolve => {
    updateCameraControls()
    .then(updateCameraAngle)
    .then(cameraLookAt)
    // .then(() => {
    //   store.dispatch({ type: 'UPDATE_CAMERA' });
    // })
    .then(resolve);
  }))
}

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

export function testCube() {
  return (new Promise(resolve => {
    store.dispatch({ type: 'TEST_CUBE' });
    resolve();
  }));
}
