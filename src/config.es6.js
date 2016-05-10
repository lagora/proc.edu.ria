import Configurator from './configurator.es6.js';
import querystringparser from '../node_modules/querystringparser/js/querystringparser.js';
var querystring = window.location.search ? window.location.search.substr(1):'';
var qs = querystringparser.parse(querystring);
var cfg = new Configurator(qs.size || 4, 'proc.edu.ria');
cfg.dev = true;
cfg.shadows = qs.shadows || false;
cfg.debug = qs.debug || false;
cfg.wireframe = qs.wireframe || false;
cfg.autoRotate = qs.autoRotate || false;
cfg.w = qs.w || 320;
cfg.h = qs.h || 240;
cfg.fov = qs.fov || 75;
cfg.near = qs.near || 0.001;
cfg.far = qs.far || 1000;
cfg.zoom = qs.zoom || 2;
cfg.levelMax = qs.levelMax || 0;
cfg.cameraType = qs.cameraType || 'orbit';
cfg.cameraTypes = ['orbit', 'fps'];
cfg.clock = new THREE.Clock();

if (cfg.debug) {
  // console.log('cfg', cfg);
  console.info('size', cfg.size);
  console.info('seed', cfg.seed.length, cfg.seed);
}

export default cfg;
