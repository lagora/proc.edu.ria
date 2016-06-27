import THREE from 'three';
import uuid from 'uuid';

export function add(newState, action) {
  const name = uuid.v4();
  const HemisphereLight = new THREE.HemisphereLight(
    action.skyColor = 0x777777,
    action.groundColor = 0xcccccc,
    action.intensity = 0.5
  );
  HemisphereLight.name = name;
  newState.lights.push(name);
  newState.scene.add(HemisphereLight);
  return newState;
}
