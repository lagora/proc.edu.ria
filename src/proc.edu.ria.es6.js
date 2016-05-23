import "babel-polyfill";
import cfg from "./config.es6.js";
import THREE from "three";
import { scene, renderer, camera } from "./init.es6.js";
import sceneAdd from "./sceneAdd.es6.js";
import getCityPilar from "./getCityPilar.es6.js";
import generator from "./generator.es6.js";
import putBlock from "./putBlock.es6.js";
import getCityBlockHelper from "./getCityBlockHelper.es6.js";
import getSkyMap from "./getSkyMap.es6.js";
import getSkyBelow from "./getSkyBelow.es6.js";
import mergeGeometry from "./mergeGeometry.es6.js";

var startTime = Date.now();
let meshes = [];
var renderMethods = { putBlock };
camera.reset();

var update = () => {
  cfg.delta = cfg.clock.getDelta();
  camera.update();
  renderer.clear();
  requestAnimationFrame( update );
  renderer.render( scene, camera.camera );
};

update();

// let pilar = getCityPilar(cfg.size);
meshes.push(getCityPilar(cfg.size));
// sceneAdd(scene, pilar);

let _grid = getCityBlockHelper(cfg.size);
sceneAdd(scene, _grid);

// meshes.push(getSkyMap(cfg));
// let _skymap = getSkyMap(cfg);
// sceneAdd(scene, _skymap);

let _skyBelow = getSkyBelow(cfg);
// meshes.push(_skyBelow);
sceneAdd(scene, _skyBelow);

var generatorCallback = (err, levelData) => {
  if (err || !levelData) {
    console.log("no levelData");
    return;
  }

  levelData
  .forEach((item) => {
    meshes.push(renderMethods[item.renderMethod](item));
  });

  let material = new THREE.MeshPhongMaterial({
    color: 0xdddddd,
    specular: 0x009900,
    shininess: 30,
    fog: true,
    wireframe: cfg.wireframe,
    shading: THREE.FlatShading
  } );
  let mesh = new THREE.Mesh(mergeGeometry(meshes), material);
  mesh.castShadow = cfg.shadows || true;
  mesh.receiveShadow = cfg.shadows || true;
  sceneAdd(scene, mesh);
};

generator(cfg, generatorCallback);
