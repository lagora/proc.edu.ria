import THREE from "three";
import qsp from "../node_modules/querystringparser/js/querystringparser.js";
import makeSeedHash from "./makeSeedHash.es6.js";
import scan from "./scan.es6.js";

var querystring = window.location.search ? window.location.search.substr(1):"";
var qs = qsp.parse(querystring);
var cfg = require("./config.json");

Object.keys(cfg).forEach((key) => {
  cfg[key] = qs[key] || cfg[key];
});
cfg.cubicSize = Math.pow(cfg.size, 3);
cfg.size = parseInt(cfg.size);
cfg.hash = qs.hash || makeSeedHash(cfg);
cfg.scan = scan(cfg.size);
cfg.clock = new THREE.Clock();

console.log("cfg.hash", cfg.hash);

export default cfg;
