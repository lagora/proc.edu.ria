import getPositionByRule from "../getPositionByRule.es6.js";
import getSizeByRule from "../getSizeByRule.es6.js";

const type = "raw";
const renderMethod = "putBlock";
const rule = require("../../rules/rule.0.json");

export default function (args) {
  if (args.hex === "0") {
    return false;
  }

  let ruleData = rule.data[args.hex];
  let size = getSizeByRule(ruleData);
  let position = getPositionByRule(ruleData, args.block, size);
  return { type, position, size, renderMethod };
}
