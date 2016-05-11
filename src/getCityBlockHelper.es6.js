import THREE from "three";
import scan from "./scan.es6.js";

function getCityBlockHelper(cfg) {
  if (!cfg.debug) {
    return;
  }

  var material = new THREE.LineBasicMaterial({color: 0xffffff});
  let geometry = new THREE.Geometry();
  scan(cfg.size, 1).forEach(({ x, y, z }) => {
    geometry.vertices.push(new THREE.Vector3(0, y, z));
    geometry.vertices.push(new THREE.Vector3(cfg.size, y, z));
    geometry.vertices.push(new THREE.Vector3(x, y, 0));
    geometry.vertices.push(new THREE.Vector3(x, y, cfg.size));
    geometry.vertices.push(new THREE.Vector3(x, 0, z));
    geometry.vertices.push(new THREE.Vector3(x, cfg.size, z));
  });

  return new THREE.LineSegments(geometry, material);
}

export default getCityBlockHelper;
