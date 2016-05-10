import "babel-polyfill";
import cfg from "./config.es6.js";
import THREE from "three";
import Camera from "./camera.es6.js";
import { scene, renderer, render } from "./init.es6.js";
import { HemisphereLight, HemisphereLightHelper, DirectionalLightHelper } from "./light.es6.js";
import scan from "./scan.es6.js";
import sceneAdd from "./sceneAdd.es6.js";
import makePilar from "./makePilar.es6.js";
import generator from "./generator.es6.js";
import putBlock from "./putBlock.es6.js";
import mergeGeometry from "./mergeGeometry.es6.js";

var renderMethods = {
  "putBlock": putBlock
};
var camera = new Camera();

var update = () => {
  cfg.delta = cfg.clock.getDelta();

  if (cfg.debug) {
    HemisphereLightHelper.update();
    DirectionalLightHelper.update();
  }

  camera.update();
  renderer.clear();
  requestAnimationFrame( update );
  renderer.render( scene, camera.camera );
};

update();

let pilar = makePilar(cfg.size);
sceneAdd(scene, pilar);
let meshes = [];

generator(cfg, (err, worldData) => {
  console.log('worldData', worldData[0][0]);
  worldData.forEach((levelData) => {
    levelData
    .filter((item) => {
      return !!item.renderMethod;
    }).forEach((item) => {
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
  });
});
