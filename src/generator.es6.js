import waterfall from 'async-waterfall';
import * as r from './rules.es6.js';

function generator (cfg, callback) {
  console.trace('generator', cfg);
  waterfall([(next) => {
    next(null, cfg);
  }].concat(Object.values(r)), callback);
}

export default generator;
