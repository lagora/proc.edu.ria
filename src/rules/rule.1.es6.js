import *  as methods from '../methods.es6.js';
var rule = require('../../rules/rule.1.json');
var axes = ['x', 'y', 'z'];

function one(subSeed) {

};

function all (cfg, callback) {
  console.time(`\tNULL PASS: rule_1 using version: ${rule.version}`);

  console.timeEnd(`\tEND`);
  callback(null, cfg);
};

export { one, all };
export default all;
