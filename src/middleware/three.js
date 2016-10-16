import * as THREE from 'three';
var config = require('../assets/config.json');
const OrbitControls = require('../../node_modules/three-orbit-controls')(THREE);
import { INIT_THREE, INIT_PROCEDURIA } from '../constants';
import {
  getRatio,
  initClock, initScene, getRenderer,
  getPerspectiveCamera, setCameraPosition, setCameraLookAt,
  getGridHelper, getAxisHelper,
  getHemisphereLight, getHemisphereLightHelper,
  getDirectionalLight, getDirectionalLightHelper,
  getSpotLight, getSpotLightHelper,
  getBufferGeometry,
  addFog,
} from '../helpers/three';

export default store => next => action => {
  const { type } = action;
  const state = store.getState();

  if (type === INIT_THREE) {
    const T = THREE;
    const { debug, width, height, zoom, size, fov, near, far } = state;
    const ratio = getRatio(width)(height);

    const { cameraType } = config;
    const orbitCamera = cameraType === 'orbit';
    const fpsCamera = cameraType === 'fps';
    const orbitCameraPosition = { x: size * 1.5, y: size * 1.5, z: size * 1.5};
    const fpsCameraPosition = { x: 0, y: 0.1, z: 0};
    const cameraPosition = orbitCamera ? orbitCameraPosition : fpsCameraPosition;

    const clock = initClock(THREE);
    store.getState().scene = initScene(T);
    store.getState().renderer = getRenderer(T)(width)(height)(zoom);
    store.getState().camera = setCameraLookAt(T)(
      setCameraPosition(
        getPerspectiveCamera(T)(fov)(ratio)(near)(far)
      )(cameraPosition.x)(cameraPosition.y)(cameraPosition.z)
    )(0)(0)(0);
    const cameraControls = new OrbitControls(store.getState().camera, state.canvas);
    cameraControls.autoRotate = store.getState().cameraAutoRotate;

    store.getState().scene.add(getHemisphereLight(T));
    store.getState().scene.add(getDirectionalLight(T));
    store.getState().scene.add(getSpotLight(T)(size)(near)(far)(fov));

    if (debug) {
      getHemisphereLightHelper(T)(state.scene).forEach(lightHelper => {
        store.getState().scene.add(lightHelper);
      });
      getDirectionalLightHelper(T)(size)(state.scene).forEach(lightHelper => {
        store.getState().scene.add(lightHelper);
      });
      getSpotLightHelper(T)(size)(state.scene).forEach(lightHelper => {
        store.getState().scene.add(lightHelper);
      });
      store.getState().scene.add(getGridHelper(T)(size));
      store.getState().scene.add(getAxisHelper(T)(size));
    }

    const geometry = getBufferGeometry(T);
    store.getState().renderer.shadowMapEnabled = true;
    // store.getState().scene.fog = addFog(state);

    return next({
      ...action,
      ratio, clock, geometry,
      cameraType, cameraControls, cameraPosition
    });
  }


  return next(action);
};
