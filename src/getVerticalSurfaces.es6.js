function getVerticalSurfaces(item) {
  let position = Object.assign({}, item.position);
  position.z = item.position.z + item.size.z;

  let size = Object.assign({}, item.size);
  size.z = 0;

  return { position, size };
}

export default getVerticalSurfaces;
