import THREE from "three";

function getLights(cfg) {
  var HemisphereLight = new THREE.HemisphereLight( 0x777777, 0xcccccc, 0.5 );
  var DirectionalLight = new THREE.DirectionalLight( 0xffffbb, 0.5 );
  DirectionalLight.position.set( 0, 1, 0.75 );
  var spotLight = new THREE.SpotLight( 0xffffff );
  spotLight.position.set( 10, cfg.size * 2, cfg.size );

  spotLight.castShadow = true;
  let shadowMapSize = 2048;
  spotLight.shadow.mapSize.width = shadowMapSize;
  spotLight.shadow.mapSize.height = shadowMapSize;

  spotLight.shadow.camera.near = cfg.near / 2;
  spotLight.shadow.camera.far = cfg.far * 2;
  spotLight.shadow.camera.fov = cfg.fov;
  return { HemisphereLight,  DirectionalLight,  spotLight };
}

export default getLights;
