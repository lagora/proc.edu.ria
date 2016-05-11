import THREE from "three";
var OrbitControls = require("three-orbit-controls")(THREE);
import cfg from "./config.es6.js";
import { renderer } from "./init.es6.js";

class Camera {
  constructor() {
    this.type = "orbit";
    this.autoRotate = cfg.autoRotate;
    this.camera = new THREE.PerspectiveCamera( cfg.fov, cfg.w / cfg.h, cfg.near, cfg.far );
    this.angle = 0;
    this.reset();
  }

  update() {

    if ("orbit" === this.type && this.autoRotate) {
      this.controls.update();
      this.angle += 0.25;
    }

    this.camera.lookAt(new THREE.Vector3(cfg.size /2 , cfg.size / 2, cfg.size / 2));
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
  };
}

export default Camera;
