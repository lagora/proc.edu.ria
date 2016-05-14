import THREE from "three";
import cfg from "./config.es6.js";
import getLights from "./getLights.es6.js";
import getHelpers from "./getHelpers.es6.js";
import getLightHelper from "./getLightHelper.es6.js";
import sceneAdd from "./sceneAdd.es6.js";

var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
scene.up = new THREE.Vector3(0, 0, 1);

var lights = getLights(cfg);

Object.keys(lights).forEach((lightType) => {
  sceneAdd(scene, getLightHelper(cfg, lightType, lights[lightType]));
  sceneAdd(scene, lights[lightType]);
});

var helpers = getHelpers(cfg);
Object.values(helpers).forEach((helper) => {
  sceneAdd(scene, helper);
});

renderer.setSize( cfg.w * cfg.zoom, cfg.h * cfg.zoom );
document.body.appendChild( renderer.domElement );

export { scene, renderer };
