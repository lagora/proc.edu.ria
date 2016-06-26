import THREE from 'three';
var OrbitControls = require("three-orbit-controls")(THREE);
import state from '../state.es6.js';
import uuid from 'uuid';

export default function stateUpdater(newState = state, action) {
  const isRenderRelated = action.type === 'RENDER'|| action.type === 'CLEAR_RENDERER';
  const isUpdateRelated = action.type.indexOf('UPDATE_CAMERA') >= 0 || action.type === 'CAMERA_LOOK_AT';
  if (!isRenderRelated && !isUpdateRelated) {
    console.info(action, newState);
  }

  const name = uuid.v4();

  switch (action.type) {
    case 'INIT_SCENE':
      return Object.assign({}, newState, { scene: action.scene });
    case 'SET_SCENE_UP':
      let scene = newState.scene;
      scene.up = action.up || new THREE.Vector3(0, 0, 1);
      return Object.assign({}, newState, { scene });
    case 'INIT_RENDERER':
      return Object.assign({}, newState, { renderer: action.renderer });
    case 'ENABLE_RENDERER_SHADOW_MAP':
      newState.renderer.shadowMap.enabled = true;
      return newState;
    case 'SET_RENDERER_SIZE':
      newState.renderer.setSize(
        newState.w * newState.zoom,
        newState.h * newState.zoom
      );
      return newState;
    case 'ATTACH_RENDERER_TO_DOM':
      document.body.appendChild( newState.renderer.domElement );
      return newState;
    case 'CLEAR_RENDERER':
      newState.renderer.clear();
      return newState;
    case 'RENDER':
      newState.renderer.render(
        newState.scene,
        newState.cameras[newState.camera]
      );
      return newState;
    // case 'INIT_LIGHTS':
    //   var HemisphereLight = new THREE.HemisphereLight( 0x777777, 0xcccccc, 0.5 );
    //   var DirectionalLight = new THREE.DirectionalLight( 0xffffbb, 0.5 );
    //   DirectionalLight.position.set( 0, 1, 0.75 );
    //   var spotLight = new THREE.SpotLight( 0xffffff );
    //   spotLight.position.set( 10, cfg.size * 2, cfg.size );
    //
    //   spotLight.castShadow = true;
    //   let shadowMapSize = 4096;
    //   spotLight.shadow.mapSize.width = shadowMapSize;
    //   spotLight.shadow.mapSize.height = shadowMapSize;
    //
    //   spotLight.shadow.camera.near = cfg.near;
    //   spotLight.shadow.camera.far = cfg.far;
    //   spotLight.shadow.camera.fov = cfg.fov / 2;
    //   return Object.assign({}, newState, {
    //     lights: Object.assign
    //   });
    case 'ADD_HEMISPHERE_LIGHT':
      const hemisphereLight = new THREE.HemisphereLight(
        action.skyColor,
        action.groundColor,
        action.intensity
      );

      hemisphereLight.name = name;
      newState.lights.push(name);
      newState.scene.add(hemisphereLight);
      return newState;
    case 'REMOVE_HEMISPHERE_LIGHT':
      newState.lights = newState.lights.filter(name => name !== action.name);
      newState.scene.remove(action.name);
      return newState;
    case 'ADD_GRID_HELPER':
      const gridHelper = new THREE.GridHelper( newState.size - 1 , 1 );
      // gridHelper.position.set( cfg.size / 2, cfg.size / 2);
      gridHelper.position.x = newState.size / 2;
      gridHelper.position.z = newState.size / 2;
      gridHelper.name = name;
      newState.helpers.push(name);
      return newState;
    case 'REMOVE_GRID_HELPER':
      newState.helpers = newState.helpers.filter(name => name !== action.name);
      newState.scene.remove(action.name);
      return newState;
    case 'ADD_PERSPECTIVE_CAMERA':
      let camera = new THREE.PerspectiveCamera(
        90,
        newState.w / newState.h,
        newState.near,
        newState.far
      );
      var distance = newState.size * 1.5;
      camera.position.x = distance;
      camera.position.y = distance;
      camera.position.z = distance;
      newState.cameras.push(camera);
      return newState;
    case 'SET_CURRENT_CAMERA':
      return Object.assign({}, newState, {
        camera: (action.index || newState.cameras.length - 1)
      });
    case 'INIT_CAMERA_CONTROLS':
      const cameraControls = new OrbitControls(
        newState.cameras[newState.camera],
        newState.renderer.domElement
      );
      return Object.assign({}, newState, { cameraControls });
    case 'UPDATE_CAMERA_CONTROLS':
      if ("orbit" === newState.cameraType && newState.cameraAutoRotate) {
        newState.controls.update();
      }
      return newState;
    case 'UPDATE_CAMERA_ANGLE':
      if (!newState.cameraAutoRotate) {
        return newState;
      }

      return Object.assign({}, newState, { cameraAngle: newState.cameraAngle + 0.25 });
    case 'UPDATE_CAMERA_LOOK_AT':
      return Object.assign({}, newState, { cameraLookAt: action.vector });
    case 'TEST_CUBE':
      let geometry = new THREE.BoxGeometry(1, 1, 1);
      let material = new THREE.MeshPhongMaterial(
        {
          color: 0xdddddd,
          specular: 0x009900,
          shininess: 30,
          fog: true,
          // shading: THREE.FlatShading
        }
      );
      let mesh = new THREE.Mesh( geometry, material );
      newState.scene.add(mesh);
      return newState;
    default:
      return newState;
  }
}
