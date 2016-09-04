import * as THREE from 'three';
import * as actions from '../actions/rules';
// import * as rules from '../rules';

const rulesIndex = ['0', '1'];

export default function reduce(state, action) {
  if (action.type === actions.LOAD_RULES) {
    let rules = {};
    rulesIndex.forEach(hex => {
      rules[hex] = require(`../rules/rule.${hex}.json`);
    });
    return { ...state, rules };
  } else if (action.type === actions.GENERATE_DATA) {
    let rules = Object.keys(state.rules);
    let data = {};
    rules.forEach(ruleIndex => {
      data = { ...data, [ruleIndex]: state.rules[ruleIndex].data };
    });
    return { ...state, data };
  } else if (action.type === actions.GENERATE_MATERIAL) {
    let material = {};
    let rules = Object.keys(state.rules);
    rules.forEach(ruleIndex => {
      material = { ...material, [ruleIndex]: state.rules[ruleIndex].material };
    });
    return { ...state, material };
  } else if (action.type === actions.GENERATE_GEOMETRY) {
    let geometry = {};
    let rules = Object.keys(state.rules);
    rules.forEach(ruleIndex => {
      state.hashRange.forEach(hex => {
        const data = state.data[ruleIndex][hex];
        if (data) {
          const size = data.size || { x: 1, y: 1, z: 1 };
          const tmpGeometry = new THREE.BoxGeometry(size.x, size.y, size.z);
          geometry = { ...geometry, [ruleIndex]: { ...ruleIndex, [hex]: tmpGeometry } };
        }
      });
    });

    return { ...state, geometry };
  } else if (action.type === actions.GENERATE_MESH) {
    let mesh = {};
    let rules = Object.keys(state.rules);
    const defaultPosition = { x: 0, y: 0, z: 0 };
    rules.forEach(ruleIndex => {
      state.hashRange.forEach(hex => {
        let tmpMesh = new THREE.Mesh(
          state.geometry[ruleIndex],
          state.material[ruleIndex]
        );
        tmpMesh.position.set(position.x, position.y, position.z);
        // geometry.position.x = position.x;
        // geometry.position.y = position.y;
        // geometry.position.z = position.z;
        mesh = { ...mesh, [ruleIndex]: { ...mesh[ruleIndex], [hex]: tmpMesh } };
      });
    });

    return { ...state, mesh };
  }

  return state;
}
