import cfg from "./config.es6.js";
import THREE from "three";

export default function putBlock(data, scene) {
  if (data.ruleNumber > 0)  console.log("data", data);
  let geometry = new THREE.BoxGeometry(
    data.size.x, data.size.y, data.size.z
  );
  let material = new THREE.MeshPhongMaterial({
    color: data.color || 0xdddddd,
    specular: 0x009900,
    shininess: 60,
    fog: true,
    wireframe: cfg.wireframe
    // shading: THREE.FlatShading
  });
  // var material = new THREE.ShaderMaterial( {
  //   vertexShader: document.getElementById( 'vertexShader' ).textContent,
  //   fragmentShader: document.getElementById( 'fragmentShader' ).textContent
  // });
  let mesh = new THREE.Mesh( geometry, material );
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.position.set(data.position.x, data.position.y, data.position.z);

  if (scene) {
    scene.add( mesh );
  } else {
    return mesh;
  }
};
