import THREE from "three";
import getPositionByRule from "../getPositionByRule.es6.js";
import getSizeByRule from "../getSizeByRule.es6.js";
import getRuleDataBySubseed from "../getRuleDataBySubseed.es6.js"
import getRuleMaterialOptions from "../getRuleMaterialOptions.es6.js";

var rule = require("../../rules/rule.0.json");

function one(ruleData, bit) {
  let size = getSizeByRule(ruleData);
  let position = getPositionByRule(ruleData, bit, size);
  let materialOptions = getRuleMaterialOptions(rule.material.args);
  let material = new THREE[rule.material.name](materialOptions);
  let data = { position, size };
  return data;
}

function all(cfg, callback) {
  cfg.scan = cfg.scan || scan(cfg.size, cfg.unit);
  let data = [];
  for (var i = 0; i < cfg.cubicSize; i++) {
    let bit = cfg.scan[i];
    let index = bit.i;
    let subseed = cfg.seedHash[index];
    let ruleData = getRuleDataBySubseed(rule.data, subseed);
    let _one = one(ruleData, bit);
    _one.type = "raw";
    _one.level = 0;
    _one.levelSize = cfg.size;
    _one.seed = cfg.seed;
    _one.subseed = cfg.seedHash[index];
    _one.renderMethod = rule.renderMethod;
    data.push(_one);
  }
  if (callback) {
    cfg.data = cfg.data || [];
    cfg.data.push(data);
    callback(null, cfg);
  } else {
    return data;
  }
};

export { all, one };
export default all;
