function getLocalPositionByRule(ruleData) {
  return Object.assign({}, ruleData.position, { x:0, y:0, z:0 });
}

export default getLocalPositionByRule;
