import getCacheName from "./getCacheName.es6.js";
import cfg from "./config.es6.js";
import THREE from "three";

function putBlock (data, scene) {
  let cacheName = getCacheName(`putBlock-${data.i}`, { seed: data.seed, size: data.levelSize });
  let mesh = false;//window.localStorage.getItem(cacheName);
  console.trace(`using cache: ${!!mesh}`);
  if (!mesh) {
    let geometry = new THREE.BoxGeometry(
      data.size.x, data.size.y, data.size.z
    );
    data.material = new THREE.MeshPhongMaterial(
      {
        color: 0xdddddd,
        specular: 0x009900,
        shininess: 30,
        fog: true,
        wireframe: cfg.wireframe,
        // shading: THREE.FlatShading
      }
    );
    mesh = new THREE.Mesh( geometry, data.material );
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.position.set(data.position.x, data.position.y, data.position.z);
    console.trace("setting up cache");
    window.localStorage.setItem(cacheName, JSON.stringify(mesh));
  } else {
    try {
      mesh = JSON.parse(mesh);
    } catch(e) {
      console.info(e);
      window.localStorage.removeItem(cacheName);
    }
  }

  if (scene) {
    scene.add( mesh );
  } else {
    return mesh;
  }
};

export default putBlock;
