import THREE from 'three';
import uuid from 'uuid';

export function add(newState, action) {
  const name = uuid.v4();
  const gridHelper = new THREE.GridHelper( newState.size - 1 , 1 );
  // gridHelper.position.set( cfg.size / 2, cfg.size / 2);
  gridHelper.position.x = newState.size / 2;
  gridHelper.position.z = newState.size / 2;
  gridHelper.name = name;
  newState.helpers.push(name);
  newState.scene.add(gridHelper);
  return newState;
}
