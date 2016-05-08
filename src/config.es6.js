import Configurator from './configurator.es6.js';
var cfg = new Configurator(4, 'proc.edu.ria');
// console.log('cfg', cfg);
cfg.dev = true;
cfg.debug = true;
cfg.wireframe = false;
cfg.autoRotate = false;
cfg.w = 320;
cfg.h = 240;
cfg.fov = 75;
cfg.near = 0.001;
cfg.far = 1000;
cfg.zoom = 2;
cfg.levelMax = 0;
cfg.cameraType = 'orbit';
cfg.cameraTypes = ['orbit', 'fps'];
cfg.clock = new THREE.Clock();

// if (cfg.debug) {
//   console.info('cfg:', cfg);
//   console.info('size', cfg.size);
//   console.info('seed', cfg.seed.length, cfg.seed);
// }

export default cfg;
