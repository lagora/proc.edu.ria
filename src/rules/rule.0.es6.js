import * as methods from '../methods.es6.js';
var rule = require('../../rules/rule.0.json');
var axes = ['x', 'y', 'z'];

function one(subSeed, bit) {
  // console.log(`${rule.name} ${subSeed}`);
  let size = { x: 0, y: 0, z: 0 };
  if (rule.data[subSeed] && rule.data[subSeed].size) {
    size = rule.data[subSeed].size;
  }
  let position = {};
  ['x', 'y', 'z'].forEach((axis) => {
    //world position
    position[axis] = bit[axis];

    //putBlock position cube using a axial center anchor vertex
    position[axis] += size[axis] / 2;

    if (rule.data[subSeed].position) {
      if (rule.data[subSeed].position[axis]) {
        position[axis] += rule.data[subSeed].position[axis];
      }
    }
  });
  let data = { position, size };
  return data;
}

function all(cfg, callback) {
  console.time(`\tSTART: rule_0 using version: ${rule.version}`, cfg);
  cfg.scan = cfg.scan || scan(cfg.size, cfg.unit);
  let data = [];
  for (var i = 0; i < cfg.cubicSize; i++) {
    let bit = cfg.scan[i];
    // console.trace('bit', bit);
    let index = bit.i;
    let _one = one(cfg.seedHash[index], bit);
    _one.type = 'raw';
    _one.level = 0;
    _one.levelSize = cfg.size;
    _one.subSeed = cfg.seedHash[index];
    _one.renderMethod = rule.renderMethod;
    data.push(_one);
  }
  // console.trace('data', data);
  console.timeEnd(`\tEND`);
  window.localStorage.setItem(`rule_0-${cfg.seed}`, data);
  cfg.data = cfg.data || [];
  cfg.data.push(data);
  callback(null, cfg);
};

export { all, one };
export default all;
