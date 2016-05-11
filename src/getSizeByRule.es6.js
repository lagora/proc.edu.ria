function getSizeByRule(ruleData) {
  let size = { x: 1, y: 1, z: 1 };
  if (ruleData && ruleData.size) {
    ["x", "y", "z"].forEach((axis) => {
      size[axis] = ruleData.size[axis] || size[axis];
    });
  }
  return size;
}

export default getSizeByRule;
