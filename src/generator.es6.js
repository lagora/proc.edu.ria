import * as r from './rules.es6.js';

function generator (cfg, callback) {
  let data = Object.values(r).map((rule) => {
    return rule(cfg);
  });

  callback(null, data);
}

export default generator;
