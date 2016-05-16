function mergePositions (positionA, positionB) {
  let mergedPosition = {};
  ["x", "y", "z"].forEach((axis) => {
    mergedPosition[axis] = positionA[axis] + positionB[axis];
  });
  return mergedPosition;
}

export default mergePositions;
