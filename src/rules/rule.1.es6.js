import *  as methods from '../methods.es6.js';
var rule = require('../../rules/rule.1.json');
var axes = ['x', 'y', 'z'];

export default function (world, callback) {
  console.time(`\tNULL PASS: rule_1 using version: ${rule.version}`);
  // world = ruleInit(world);
  // let data = scan(world.size, 1);
  // for (var i = 0; i < data.length; i++) {
  //   let bit = data[i];
  //   let index = bit.i;
  //   let type = 'raw';
  //   let level = 0;
  //   let levelSize = world.size;
  //   let subSeed = world.seed[index] || 'proc.edu.ria';
  //   let position = positionAdjstement(bit, rule.data[subSeed].position);
  //   let size = rule.data[subSeed].size;
  //   let render = rule.render;
  //   world.data[world.rule.index].push({ type, level, levelSize, index, subSeed, position, size, render });
  // }

  console.timeEnd(`\tEND`);
  callback(null, world);
};
