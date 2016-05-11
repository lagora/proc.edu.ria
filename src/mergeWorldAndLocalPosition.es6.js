function mergeWorldAndLocalPosition (worldPosition, localPosition) {
  let mergedPosition = {};
  ["x", "y", "z"].forEach((axis) => {
    mergedPosition[axis] = worldPosition[axis] + localPosition[axis];
  });
  return mergedPosition;
}

export default mergeWorldAndLocalPosition;
