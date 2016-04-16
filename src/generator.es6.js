import waterfall from 'async-waterfall';
import sha512 from 'sha512';
import rule_0 from './rules/rule.0.es6.js';

var cache = {}

var generate = (cfg, done) => {
  cfg.cubicSize = Math.pow(cfg.size, 3);
  var mkSeed = (str) => sha512(str).toString('hex');
  cfg.seedSource = cfg.originalSeed ? cfg.originalSeed:'proc.edu.ria';
  cfg.rawSeed = cache[cfg.seedSource] ? cache[cfg.seedSource]:mkSeed(cfg.seedSource);

  while (cfg.rawSeed.length < cfg.cubicSize) {
    let remaining = cfg.cubicSize - cfg.rawSeed.length;
    console.info(`Filling up seed: ${((cfg.rawSeed.length/cfg.cubicSize)*100).toString().substr(0, 2)}% => ${remaining}/${cfg.cubicSize}`)
    cfg.rawSeed += mkSeed(cfg.rawSeed).substr(0, remaining);
  }
  cache[cfg.seedSource] = cfg.rawSeed;

  cfg.seed = cfg.rawSeed.substr(0, cfg.cubicSize);
  cfg.unit = 1;

  let index = 0;
  console.info('START: generation');
  waterfall([
    (next) => {
      cfg.rule = cfg.rules[index];
      let result = rule_0(cfg, next);
      index++;
    }
  ], (err, results) => {
    console.info('END: generation');
    if (done) done(err, results);
  })
}

export default generate
