import rule_0 from './rules/rule.0.es6.js';

export default function (cfg, done) {
  cfg.unit = 1;
  cfg.seed = cfg.rawSeed;
  cfg.version = "0.0";
  console.info('START: generation');
  rule_0(cfg, done);
}
