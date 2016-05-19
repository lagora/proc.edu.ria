import getCacheName from "./getCacheName.es6.js";

function scan(max, step = 1) {
  let i = 0, cached = [];
  for (let y = 0; y < max; y += step) {
    for (let z = 0; z < max; z += step) {
      for (let x = 0; x < max; x += step) {
        cached.push( { i, x, y, z });
        i++;
      }
    }
  }

  return cached;
}

export default scan;
