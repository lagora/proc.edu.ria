import waterfall from 'async-waterfall';
import * as r from './rules.es6.js';

export default function (world, done) {
  world.unit = 1;
  world.version = "0.0";
  waterfall([(next) => {
    next(null, world);
  }].concat(Object.values(r)), done);
}
