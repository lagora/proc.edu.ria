function adjustPositionUsingSize (position, size) {
  let newPosition = { x:0, y: 0, z:0 };
  ["x", "y", "z"].forEach((axis) => {
    newPosition[axis] += size[axis] / 2;
  });
  return newPosition;
}

export default adjustPositionUsingSize;
