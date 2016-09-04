function setMininalRuleItemData (cfg, index, rule) {
  let item = {};
  item.levelSize = cfg.size;
  item.seed = cfg.seed;
  item.subseed = cfg.hash[index];
  item.renderMethod = rule.renderMethod;
  return item;
}

export default setMininalRuleItemData;
