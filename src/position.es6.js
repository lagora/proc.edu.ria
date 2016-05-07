export default function (worldPosition, localPosition, size, worldSize) {
  let position = {};
  ['x', 'y', 'z'].forEach((axis) => {
    position[axis] = worldPosition[axis];
    // position[axis] = worldPosition[axis] + localPosition[axis];
    position[axis] += localPosition[axis];
    // position[axis] += size[axis] / 2;
  });
  return position;
};
