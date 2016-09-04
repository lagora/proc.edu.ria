export default function getLowestVerticalSurface(verticalSurfacesList) {
  let lowest = verticalSurfacesList.sort((a, b) => {
    if (a.position.z < b.position.z) {
      return -1;
    } else if (a.position.z > b.position.z) {
      return 1;
    }

    return 0;
  });

  return lowest[0];
}
  
