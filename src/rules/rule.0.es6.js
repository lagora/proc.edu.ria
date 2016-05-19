import getPositionByRule from "../getPositionByRule.es6.js";
import getSizeByRule from "../getSizeByRule.es6.js";

var rule0Json = require("../../rules/rule.0.json");

export default function rule0(args) {
  let ruleNumber = 0;
  let type = "raw";
  let renderMethod = rule0Json.renderMethod;

  if (args.hex === "0") {
    return false;
  }

  let ruleData = rule0Json.data[args.hex];
  let size = getSizeByRule(ruleData);
  let position = getPositionByRule(ruleData, args.block, size);
  return { ruleNumber, type, position, size, renderMethod };
}
