import waterfall from 'async-waterfall';
import rule_0 from './rules/rule.0.es6.js';

export default function* (cfg) {
  cfg.unit = 1;
  cfg.seed = cfg.rawSeed;
  cfg.version = "0.0";
  console.info('START: generation');
  yield rule_0(cfg);
}
