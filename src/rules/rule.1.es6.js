import getPositionByRule from "../getPositionByRule.es6.js";
import getSizeByRule from "../getSizeByRule.es6.js";
import cycleCheck from "../cycleCheck.es6.js";

var rule1Json = require("../../rules/rule.1.json");

export default function rule1(args) {
  let ruleNumber = 1;
  let type = "raw";
  let renderMethod = rule1Json.renderMethod;
  let err = cycleCheck(args, ["hex", "index", "size", "cubicSize"]);
  if (err) {
    throw new Error(err);
  }

  // if (args.hex === "0" || args.index === args.cubicSize) {
  //   return false;
  // }

  let ruleData = rule1Json.data;
  let ruleDataKeys = Object.keys(ruleData);
  let applicables = ruleDataKeys.filter(key => args.hex === key.substr(0, 1));

  if (applicables.length === 0) {
    // console.log(`no applicable rules fox hex ${args.hex}`);
    return false;
  }

  let nextPositions = {};

  nextPositions.x = args.hash.substr(args.index + 1, 1);

  if (args.index + args.size < args.cubicSize) {
    nextPositions.y = args.hash.substr(args.index + args.size, 1);
  }

  if (args.index + Math.pow(args.size, 2) < args.cubicSize) {
    nextPositions.z = args.hash.substr(args.index + Math.pow(args.size, 2), 1);
  }

  var getFormula = (hex, axis, hex2) => {
    return `${hex}${axis}${hex2}`;
  };

  let data = [];
  ["x", "y", "z"]
  .filter(axis => nextPositions[axis])
  // .filter(axis => ruleData[getFormula(args.hex, axis, nextPositions[axis])])
  .forEach((axis) => {
    let formula = getFormula(args.hex, axis, nextPositions[axis]);
    let size = getSizeByRule(ruleData[formula]);
    let position = getPositionByRule(ruleData[formula], args.block, size);
    console.log("ruleData[formula]", ruleData[formula]);
    let color = 0xff0000;
    data.push({ ruleNumber, type, position, size, color, renderMethod });
  });

  return data;
}
