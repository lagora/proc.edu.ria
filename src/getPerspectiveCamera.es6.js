import THREE from "three";
import cycleCheck from "./cycleCheck.es6.js";

function getPerspectiveCamera(cfg) {
  if (cfg === undefined || typeof === "undefined") {
    throw new Error("no cfg");
  }

  var err =  cycleCheck(cfg, ["fov", "w", "h", "near", "far"]);

  if (err) {
    throw new Error(err);
  }

  let ratio = cfg.w / cfg.h;

  return new THREE.PerspectiveCamera( cfg.fov, ratio, cfg.near, cfg.far );
}

export default getPerspectiveCamera;
