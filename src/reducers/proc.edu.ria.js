import { INIT_PROCEDURIA } from '../constants';
import * as helpers from '../helpers';
import { makeCityPilar } from '../helpers/proc.edu.ria';
import THREE from 'three';

export default function reduce(state, action) {
  if (!action) {
    return state;
  }
  const { type } = action;

  if (type === INIT_PROCEDURIA) {
    const { seed, size } = state;
    const squareSize = Math.pow(+size, 2);
    const cubicSize = Math.pow(+size, 3);
    const hash = helpers.hashPadding(seed, cubicSize);
    let hashRange = [];
    for (let i = 0; i < hash.length; i++) {
      if (hashRange.length === hash.length) {
        break;
      } else if (hashRange.indexOf(hash[i]) === -1) {
        hashRange.push(hash[i]);
      }
    }
    hashRange = hashRange.sort();

    state.scene.add(makeCityPilar(THREE)(size));
  }

  // if (type === actions.SET_CUBIC_SIZE) {
  //   const cubicSize = Math.pow(+state.size, 3);
  //   return { ...state, cubicSize };
  // }
  // if (type === actions.SET_SQUARE_SIZE) {
  //   const squareSize = Math.pow(+state.size, 2);
  //   return { ...state, squareSize };
  // }
  // if (type === actions.MAKE_HASH_FROM_SEED) {
  //   return { ...state, hash: helpers.hashPadding(action.seed, state.cubicSize) };
  // }
  // if (type === actions.GENERATE_HASH_RANGE) {
  //   const hashRange = [];
  //   for (let i = 0; i < state.hash.length; i++) {
  //     if (hashRange.length === state.hash.length) {
  //       break;
  //     } else if (hashRange.indexOf(state.hash[i]) === -1) {
  //       hashRange.push(state.hash[i]);
  //     }
  //   }
  //   return { ...state, hashRange: hashRange.sort() };
  // }
  //  if (type === actions.MAKE_CITY_PILAR) {
  //   const position = { x: state.size / 2, y: -50, z: state.size / 2};
  //   const geometry = new THREE.BoxBufferGeometry(state.size, 100, state.size);
  //   const materialArgs = {
  //     color: 0xdddddd,
  //     specular: 0x009900,
  //     shininess: 30,
  //     fog: true,
  //     wireframe: false,
  //     shading: "FlatShading",
  //   };
  //   const material = new THREE.MeshPhongMaterial(materialArgs);
  //   const mesh = new THREE.Mesh( geometry, material );
  //   mesh.castShadow = true;
  //   mesh.receiveShadow = true;
  //   mesh.position.set(position.x, position.y, position.z);
  //   state.scene.add(mesh);
  // }
  //  if (type === actions.UPDATE_SUN_ANGLE) {
  //   return { ...state, sun: { ...sun, angle: action.angle } };
  // }

  return state;
}
