import cfg from "./config.es6.js";
import THREE from "three";

export default function putBlock(data, scene) {
  if (data.ruleNumber > 0)  console.log("data", data);
  let geometry = new THREE.BoxGeometry(
    data.size.x, data.size.y, data.size.z
  );
  data.material = new THREE.MeshPhongMaterial(
    {
      color: data.color || 0xdddddd,
      specular: 0x009900,
      shininess: 30,
      fog: true,
      wireframe: cfg.wireframe
      // shading: THREE.FlatShading
    }
  );
  let mesh = new THREE.Mesh( geometry, data.material );
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.position.set(data.position.x, data.position.y, data.position.z);

  if (scene) {
    scene.add( mesh );
  } else {
    return mesh;
  }
};
