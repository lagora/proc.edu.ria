import * as r from './rules.es6.js';

function genBlock(hexSubSeed) {
  world.unit = 1;
  waterfall([(next) => {
    next(null, world);
  }].concat(Object.values(r)), done);
}


export default genBlock;
