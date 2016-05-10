import mergeWorldAndLocalPosition from "./mergeWorldAndLocalPosition.es6.js";
import adjustPositionBySize from "./adjustPositionBySize.es6.js";
import getLocalPositionByRule from "./getLocalPositionByRule.es6.js";
import getRuleMaterialOptions from "./getRuleMaterialOptions.es6.js";

function getPositionByRule(ruleData, bit, size) {
  let rawLocalPosition = getLocalPositionByRule(ruleData);
  let localPosition = adjustPositionBySize(rawLocalPosition, size);
  return mergeWorldAndLocalPosition(bit, localPosition);
}

export default getPositionByRule;
