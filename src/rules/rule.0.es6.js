import * as methods from '../methods.es6.js';
var rule = require('../../rules/rule.0.json');
var axes = ['x', 'y', 'z'];

export default function (world, callback) {
  console.time(`\tSTART: rule_0 using version: ${rule.version}`);
  world = methods.ruleInit(world);
  for (var i = 0; i < world.scan.length; i++) {
    let bit = world.scan[i];
    let index = bit.i;
    let type = 'raw';
    let level = 0;
    let levelSize = world.size;
    let subSeed = world.seed[index] || 'proc.edu.ria';
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

    let renderMethod = rule.renderMethod;
    let raw = { type, level, levelSize, index, subSeed, position, size, renderMethod };
    // console.log(raw);
    world.data[world.rule.index].push(raw);
  }

  console.timeEnd(`\tEND`);
  callback(null, world);
};
