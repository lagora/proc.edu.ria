import qsp from "../node_modules/querystringparser/js/querystringparser.js";
import makeSeedHash from "./makeSeedHash.es6.js";

var querystring = window.location.search ? window.location.search.substr(1):"";
var qs = qsp.parse(querystring);
var defaultState = require("./config.json");

Object.keys(defaultState).forEach((key) => {
  defaultState[key] = qs[key] || defaultState[key];
});
defaultState.cubicSize = Math.pow(defaultState.size, 3);
defaultState.size = parseInt(defaultState.size);
defaultState.hash = qs.hash || makeSeedHash(defaultState);

console.log("defaultState.hash", defaultState.hash);

defaultState.scene = null;
defaultState.renderer = null;
defaultState.camera = null;
defaultState.cameras = [];
defaultState.cameraType = 'orbit';
defaultState.cameraAutoRotate = false;
defaultState.cameraAngle = 0;
defaultState.cameraControls = null;
defaultState.cameraLookAt = null;
defaultState.lights = [];
defaultState.helpers = [];
defaultState.data = [];

window.state = defaultState;

export default defaultState;
