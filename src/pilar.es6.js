import putBlock from './putBlock.es6.js';

export default (scene, cfg) => {
  let size = { x: cfg.size, y: cfg.size * 10, z: cfg.size };
  let position = { x: size.x / 2, y: ((size.y / 2)) * -1 , z: size.z / 2 };
  putBlock(scene, { position, size }, false);
};
