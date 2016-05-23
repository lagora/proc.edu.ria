import THREE from "three";

export default function getSkyBelow(cfg) {
  // let geometry = new THREE.PlaneGeometry(
  let geometry = new THREE.BoxGeometry(
    cfg.far,
    1,
    cfg.far,
    cfg.cubicSize,//divisions
    1,//divisions
    cfg.cubicSize//divisions
  );
  // let material = new THREE.MeshBasicMaterial({
  //   color: 0xff0000
  // });

  // let material = new THREE.MeshBasicMaterial({
  //   color: 0xff0000,
  //   wireframe: true,
  //   wireframeLinewidth: 4
  // });

  let material = new THREE.ShaderMaterial( {
    // color: 0xff0000,
    // wireframe: true,
    // wireframeLinewidth: 4,
    vertexShader: document.getElementById( "vertexShader" ).textContent,
    fragmentShader: document.getElementById( "fragmentShader" ).textContent
  });
  let plane = new THREE.Mesh( geometry, material );
  plane.position.y = cfg.size * -1;
  return plane;
}
