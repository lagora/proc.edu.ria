export default function(worldPosition, localPosition) {
  let merged = {};
  ["x", "y", "z"].forEach((axis) => {
    merged[axis] = worldPosition[axis] + localPosition[axis];
  });
  return merged;
}
