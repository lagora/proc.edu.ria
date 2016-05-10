import THREE from 'three';
import cfg from './config.es6.js';

function getHelpers(cfg) {
  if (!cfg.debug) {
    return {};
  }

  var gridHelper = new THREE.GridHelper( cfg.size - 1 , 1 );
  gridHelper.position.set( cfg.size / 2, cfg.size / 2);
  // gridHelper.position.x = cfg.size / 2;
  // gridHelper.position.z = cfg.size / 2;
  var axisHelper = new THREE.AxisHelper( cfg.size * 2 );
  return { axisHelper, gridHelper };
}

export default getHelpers;
