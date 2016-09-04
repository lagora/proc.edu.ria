import THREE from "three";
var OrbitControls = require("three-orbit-controls")(THREE);
import cfg from "./config.es6.js";
import getPerspectiveCamera from "./getPerspectiveCamera.es6.js";
import { renderer } from "./init.es6.js";

class Camera {
  constructor() {
    this.type = "orbit";
    this.autoRotate = cfg.autoRotate;
    this.camera = getPerspectiveCamera(cfg);
    this.angle = 0;
  }

  update() {

    if ("orbit" === this.type && this.autoRotate) {
      this.controls.update();
      this.angle += 0.25;
    }

    let halfSize = cfg.size / 2;

    this.camera.lookAt(new THREE.Vector3(halfSize, halfSize, halfSize));
  }

  reset() {
    this.controls = new OrbitControls(this.camera, renderer.domElement);
    if ("orbit" === this.type) {
      let sizeToUse = "size";
      var distance = cfg[sizeToUse] * 1.5;
      this.camera.position.x = distance;
      this.camera.position.y = distance;
      this.camera.position.z = distance;
      this.camera.lookAt( cfg.size, cfg.size, cfg.size);
      this.controls.autoRotate = this.autoRotate;
    }
  }
}

export default Camera;
