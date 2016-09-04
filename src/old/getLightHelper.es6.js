import THREE from "three";

function getLightHelpers(cfg, lightType, light) {
  let helper;
  switch (lightType) {
    case "HemisphereLight":
      helper = new THREE.HemisphereLightHelper(light, 4);
      break;
    case "DirectionalLight":
      helper = new THREE.DirectionalLightHelper(light, cfg.size + 1);
      break;
    case "spotLight":
      helper = new THREE.SpotLightHelper(light);
      break;
    }
  return helper;
}

export default getLightHelpers;
