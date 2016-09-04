import mergePositions from "./mergePositions.es6.js";
import adjustPositionBySize from "./adjustPositionBySize.es6.js";
import getLocalPositionByRule from "./getLocalPositionByRule.es6.js";

function getPositionByRule(ruleData, worldPosition, size) {
  let rawLocalPosition = getLocalPositionByRule(ruleData);
  let localPosition = adjustPositionBySize(rawLocalPosition, size);
  return mergePositions(worldPosition, localPosition);
}

export default getPositionByRule;
