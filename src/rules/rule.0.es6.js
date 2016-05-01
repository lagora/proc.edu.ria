import * as THREE from 'three';
import waterfall from 'async-waterfall';

import scan from '../scan.es6.js';

import rule_0_v00 from './rule.0.v.0.0.es6.js';
import rule_0_v10 from './rule.0.v.1.0.es6.js';
import rule_0_v20 from './rule.0.v.2.0.es6.js';

const POSITION_X = 0;
const POSITION_Y = 1;
const POSITION_Z = 2;
const SIZE_X = 3;
const SIZE_Y = 4;
const SIZE_Z = 5;

var axes = ['x', 'y', 'z'];
var methods = {};

export default function (cfg, done) {
  console.info(`\tSTART: rule_0 using version: ${cfg.version}`);

  let data = scan(cfg.size, 1);
  switch (cfg.version) {
    case "0.0":
      data  = rule_0_v00(cfg, data);
      break;
    case "1.0":
      data  = rule_0_v10(cfg, data);
      break;
    case "2.0":
      data  = rule_0_v20(cfg, data);
      break;
    default:
    data = rule_0_v20(cfg, data);
  }

  if (done) {
    done(null, data);
  } else {
    return data;
  }
};
