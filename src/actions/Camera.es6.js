import THREE from 'three';
import store from '../store.es6.js';
import state from '../state.es6.js';

function initControls() {
  if (state.cameras.length > 0) {
    store.dispatch({ type: 'INIT_CAMERA_CONTROLS' });
  } else {
    store.dispatch({ type: 'STOP' });
    console.error('no camera found');
  }
}

function addPerspectiveCamera() {
  store.dispatch({ type: 'ADD_PERSPECTIVE_CAMERA' });
}

function setCurrent(index) {
  store.dispatch({ type: 'SET_CURRENT_CAMERA', index });
}

function init() {
  addPerspectiveCamera();
  setCurrent();
  initControls();
}

function updateAngle() {
  store.dispatch({ type: 'UPDATE_CAMERA_ANGLE' });
}

function updateControls() {
  store.dispatch({ type: 'UPDATE_CAMERA_CONTROLS'});
}

function lookAt(vector) {
  const halfSize = state.size / 2;
  vector = vector || new THREE.Vector3(halfSize, halfSize, halfSize);
  store.dispatch({ type: 'CAMERA_LOOK_AT', vector });
}

function update() {
  updateControls();
  updateAngle();
  lookAt();
}

export {
  init,
  addPerspectiveCamera,
  setCurrent,
  initControls,
  updateControls,
  updateAngle,
  lookAt,
  update
};
