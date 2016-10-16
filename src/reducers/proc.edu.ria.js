import {
  INIT_PROCEDURIA,
  LOAD_RULES,
  GENERATE_POSITIONS,
  GENERATE_DATA,
} from '../constants';
import * as helpers from '../helpers';
import { makeCityPilar } from '../helpers/proc.edu.ria';
import { rule as rule0 } from '../rules/rule.0';
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
    return { ...state, seed, size, hash, hashRange, squareSize, cubicSize };
  }

  // if (type === LOAD_RULES) {
  //   let rules = {};
  //   ['0'].forEach(hex => {
  //     rules[hex] = require(`../rules/rule.${hex}.json`);
  //   });
  //   return { ...state, rules };
  // }

  if (type === GENERATE_POSITIONS) {
    const { size, hash } = state;
    const positions = [];
    let i = 0;
    function getHeight(elevation) {
      // console.log('getHeight', elevation, elevation % 3);
      if (elevation % 4 === 0) {
        return elevation / 2;
      }
      if (elevation % 3 === 0) {
        return elevation - 1;
      }
      return 1;
    }
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        for (let z = 0; z < size; z++) {
          const symbol = hash[i];
          const elevation = y + 1;
          const height = getHeight(y + 1);
          // console.log(`i:${i}, x:${x}, y:${y}, z:${z}, symbol:${symbol}, elevation:${elevation}, height:${height}`);
          const position = { i, x, y, z, hash, symbol, height };
          positions.push(position);
          i++;
        }
      }
    }

    return { ...state, positions };
  }

  if (type === GENERATE_DATA) {
    state.positions.forEach(position => {
      // console.log('............', 'position', position);
      const { symbol, x, y, z, height } = position;
      const mesh = rule0(THREE).from(symbol).withHeight(height).at(x, y, z);
      // console.log('............', 'mesh', mesh);
      if (mesh) {
        state.scene.add(mesh);
      }
      // console.log('............', 'rule0', rule0);
    });
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
