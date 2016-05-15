var rule = require("../../rules/rule.1.json");


function all (cfg, callback) {
  if (callback) {
    callback(null, cfg);
  } else {
    return [];
  }
}

export { all };
export default all;
