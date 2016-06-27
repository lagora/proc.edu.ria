import THREE from 'three';
import uuid from 'uuid';

export function add(newState, action) {
  const name = uuid.v4();
  const DirectionalLight = new THREE.DirectionalLight(
    action.hex, action.instensity
  );
  DirectionalLight.position.set( 0, 1, 0.75 );
  DirectionalLight.name = name;
  newState.lights.push(name);
  newState.scene.add(DirectionalLight);
  return newState;
}
