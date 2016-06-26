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
    //   var light = new THREE.SpotLight( 0xffffff );
    //   light.position.set( 10, cfg.size * 2, cfg.size );
    //
    //   light.castShadow = true;
    //   let shadowMapSize = 4096;
    //   light.shadow.mapSize.width = shadowMapSize;
    //   light.shadow.mapSize.height = shadowMapSize;
    //
    //   light.shadow.camera.near = cfg.near;
    //   light.shadow.camera.far = cfg.far;
    //   light.shadow.camera.fov = cfg.fov / 2;
    //   return Object.assign({}, newState, {
    //     lights: Object.assign
    //   });
    case 'ADD_HEMISPHERE_LIGHT':
      let HemisphereLight = new THREE.HemisphereLight(
        action.skyColor,
        action.groundColor,
        action.intensity
      );
      HemisphereLight.name = name;
      newState.lights.push(name);
      newState.scene.add(HemisphereLight);
      return newState;
    case 'ADD_DIRECTIONAL_LIGHT':
      let DirectionalLight = new THREE.DirectionalLight(
        action.hex, action.instensity
      );
      DirectionalLight.position.set( 0, 1, 0.75 );
      DirectionalLight.name = name;
      newState.lights.push(name);
      newState.scene.add(DirectionalLight);
      return newState;
    case 'ADD_SPOT_LIGHT':
      let SpotLight = new THREE.SpotLight(
        action.color, action.intensity, action.distance,
        action.angle, action.penumbra, action.decay
      );
      SpotLight.position.set( 10, newState.size * 2, newState.size );

      SpotLight.castShadow = true;
      let shadowMapSize = 4096;
      SpotLight.shadow.mapSize.width = shadowMapSize;
      SpotLight.shadow.mapSize.height = shadowMapSize;

      SpotLight.shadow.camera.near = newState.near;
      SpotLight.shadow.camera.far = newState.far;
      SpotLight.shadow.camera.fov = newState.fov / 2;
      SpotLight.name = name;
      newState.lights.push(name);
      newState.scene.add(SpotLight);
      return newState;
    case 'REMOVE_HEMISPHERE_LIGHT':
    case 'REMOVE_DIRECTIONAL_LIGHT':
    case 'REMOVE_SPOT_LIGHT':
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
      newState.scene.add(gridHelper);
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
    case 'MERGE_GEOMETRY':
      let combinedMeshes = new THREE.Geometry();
      for (var i = 0; i < action.meshes.length; i++) {
        action.meshes[i].updateMatrix();
        combinedMeshes.merge(action.meshes[i].geometry, action.meshes[i].matrix);
      }

      return Object.assign({}, newState, { combinedMeshes });
    case 'ADD_MESH':
      let meshToAdd = new THREE.Mesh(newState.combinedMeshes, action.material);
      meshToAdd.castShadow = state.shadows || true;
      meshToAdd.receiveShadow = state.shadows || true;
      newState.scene.add(meshToAdd);
      return newState;
    case 'RULE_0':
      let position = Object.assign({}, action);
      let size = { x: 1, y: 1, z: 1};

      switch(action.hex) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
          size = { x: 0.5, y: 0.5, z: 0.5 };
          break;
        case '9':
        case 'a':
          size.x = 0.5;
          break;
        case 'b':
        case 'c':
          size.y = 0.5;
          break;
        case 'd':
        case 'e':
          size.z = 0.5;
          break;
      }

      if (['2', '3', '6', '7', 'a'].indexOf() >= 0) {
        position.x += 0.5;
      }

      if (['3', '4', '7', '8', 'c'].indexOf() >= 0) {
        position.y += 0.5;
      }

      if (['5', '6', '7', '8', 'e'].indexOf() >= 0) {
        position.z += 0.5;
      }

      newState.data[0].push({
        position, size
      });
      return newState;
    default:
      return newState;
  }
}
