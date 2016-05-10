import putBlock from "./putBlock.es6.js";

function makePilar (worldSize) {
  let size = { x: worldSize, y: worldSize * 10, z: worldSize };
  let position = { x: size.x / 2, y: ((size.y / 2)) * -1 , z: size.z / 2 };
  return putBlock({ position, size });
}

export default makePilar;
