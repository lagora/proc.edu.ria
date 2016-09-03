import 'babel-polyfill';
import THREE from 'three';
import * as actions from '../actions/demo';
import { add, to } from '../helpers';

export default function reduce(state, action) {
  if (action.type === actions.DEMO_CUBE) {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    geometry.position.set(0, 0, 0);
    const material = new THREE.MeshBasicMaterial({color: 0xdddddd});
    const mesh = new THREE.Mesh( geometry, material );
    const scene = { ...state.scene };
    scene.add(mesh);
    return { ...state, scene };
  }

  return state;
}
