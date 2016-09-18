import * as actions from '../actions';
import * as helpers from '../helpers';
import THREE from 'three';

export default function reduce(state, action) {
  if (action.type === actions.SET_CUBIC_SIZE) {
    const cubicSize = Math.pow(+state.size, 3);
    return { ...state, cubicSize };
  } else if (action.type === actions.SET_SQUARE_SIZE) {
    const squareSize = Math.pow(+state.size, 2);
    return { ...state, squareSize };
  } else if (action.type === actions.MAKE_HASH_FROM_SEED) {
    return { ...state, hash: helpers.hashPadding(action.seed, state.cubicSize) };
  } else if (action.type === actions.GENERATE_HASH_RANGE) {
    const hashRange = [];
    for (let i = 0; i < state.hash.length; i++) {
      if (hashRange.length === state.hash.length) {
        break;
      } else if (hashRange.indexOf(state.hash[i]) === -1) {
        hashRange.push(state.hash[i]);
      }
    }
    return { ...state, hashRange: hashRange.sort() };
  } else if (action.type === actions.MAKE_CITY_PILAR) {
    const position = { x: state.size / 2, y: -50, z: state.size / 2};
    const geometry = new THREE.BoxBufferGeometry(state.size, 100, state.size);
    const materialArgs = {
      color: 0xdddddd,
      specular: 0x009900,
      shininess: 30,
      fog: true,
      wireframe: false,
      shading: "FlatShading",
    };
    const material = new THREE.MeshPhongMaterial(materialArgs);
    const mesh = new THREE.Mesh( geometry, material );
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.position.set(position.x, position.y, position.z);
    state.scene.add(mesh);
  } else if (action.type === actions.UPDATE_SUN_ANGLE) {
    return { ...state, sun: { ...sun, angle: action.angle } };
  }

  return state;
}
