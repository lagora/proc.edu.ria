import THREE from 'three';
import store from '../store.es6.js';
import state from '../state.es6.js';

function initControls() {
  return (new Promise((resolve, reject) => {
    if (state.cameras.length > 0) {
      store.dispatch({ type: 'INIT_CAMERA_CONTROLS' });
      resolve();
    } else {
      store.dispatch({ type: 'STOP' });
      reject('no camera found');
    }
  }));
}

function addPerspectiveCamera() {
  return (new Promise(resolve => {
    store.dispatch({ type: 'ADD_PERSPECTIVE_CAMERA' });
    store.dispatch({ type: 'SET_CURRENT_CAMERA' });
    setCurrent().then(resolve);
  }));
}

function setCurrent(index) {
  return (new Promise(resolve => {
    store.dispatch({ type: 'SET_CURRENT_CAMERA', index });
    resolve();
  }));
}

function init() {
  return (new Promise(resolve => {
    addPerspectiveCamera()
    .then(setCurrent)
    .then(resolve)
    .catch(err => console.error(err));
  }));
}

function updateAngle() {
  return (new Promise(resolve => {
    store.dispatch({ type: 'UPDATE_CAMERA_ANGLE' });
    resolve();
  }));
}

function updateControls() {
  return (new Promise(resolve => {
    store.dispatch({ type: 'UPDATE_CAMERA_CONTROLS'});
    resolve();
  }));
}

function lookAt(vector) {
  return (new Promise(resolve => {
    const halfSize = state.size / 2;
    vector = vector || new THREE.Vector3(halfSize, halfSize, halfSize);
    store.dispatch({ type: 'CAMERA_LOOK_AT', vector });
    resolve();
  }));
}

function update() {
  return (new Promise((resolve, reject) => {
    updateControls()
    .then(updateAngle)
    .then(lookAt)
    // .then(() => {
    //   store.dispatch({ type: 'UPDATE_CAMERA' });
    // })
    .then(resolve)
    // .catch(err => {
    //   store.dispatch({ type: 'STOP' });
    //   console.trace(err);
    // })
    ;
  }));
}

export {
  addPerspectiveCamera,
  setCurrent,
  initControls,
  updateControls,
  updateAngle,
  lookAt,
  update
};
