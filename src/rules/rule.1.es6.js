// var rule = require("../../rules/rule.1.json");

function one(subSeed) {}

function all (cfg, callback) {
  if (callback) {
    callback(null, cfg);
  } else {
    return [];
  }
}

export { one, all };
export default all;
