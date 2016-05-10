import axes from './axes.es6.js';

export default function(worldPosition, localPosition) {
  let merged = {};
  axes.forEach((axis) => {
    merged[axis] = worldPosition[axis] + localPosition[axis];
  });
  return merged;
}
