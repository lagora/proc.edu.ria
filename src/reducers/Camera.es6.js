import THREE from 'three';
var OrbitControls = require('three-orbit-controls')(THREE);
import uuid from 'uuid';

function addPerspectiveCamera(newState, action) {
  const cameras = newState.cameras.slice();
  const name = uuid.v4();
  const camera = new THREE.PerspectiveCamera(
    90,
    newState.w / newState.h,
    newState.near,
    newState.far
  );
  camera.name = name;
  var distance = newState.size * 1.5;
  camera.position.x = distance;
  camera.position.y = distance;
  camera.position.z = distance;
  cameras.push(camera);
  return Object.assign({}, newState, {
    camera: Object.assign({}, newState.cameras, cameras)
  });
}

function setCurrent(newState, action) {
  return Object.assign({}, newState, {
    camera: (action.index || newState.cameras.length - 1)
  });
}

function initControls(newState, action) {
  const cameraControls = new OrbitControls(
    newState.cameras[newState.camera],
    newState.renderer.domElement
  );
  return Object.assign({}, newState, { cameraControls });
}

function updateControls(newState, action) {
  if ("orbit" === newState.cameraType && newState.cameraAutoRotate) {
    newState.controls.update();
  }
  return newState;
}

function updateAngle(newState, action) {
  if (!newState.cameraAutoRotate) {
    return newState;
  }

  return Object.assign({}, newState, { cameraAngle: newState.cameraAngle + 0.25 });
}

function lookAt(newState, action) {
  return Object.assign({}, newState, { cameraLookAt: action.vector });
}

export {
  addPerspectiveCamera,
  setCurrent,
  initControls,
  updateControls,
  updateAngle,
  lookAt
};
