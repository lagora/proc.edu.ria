import THREE from 'three';
import uuid from 'uuid';

export function add(newState, action) {
  const name = uuid.v4();
  const SpotLight = new THREE.SpotLight(
    action.color = 0xffffff,
    action.intensity,
    action.distance,
    action.angle,
    action.penumbra,
    action.decay
  );
  SpotLight.position.set( 10, newState.size * 2, newState.size );

  SpotLight.castShadow = true;
  const shadowMapSize = 4096;
  SpotLight.shadow.mapSize.width = shadowMapSize;
  SpotLight.shadow.mapSize.height = shadowMapSize;

  SpotLight.shadow.camera.near = newState.near;
  SpotLight.shadow.camera.far = newState.far;
  SpotLight.shadow.camera.fov = newState.fov / 2;
  SpotLight.name = name;
  newState.lights.push(name);
  newState.scene.add(SpotLight);
  return newState;
}
