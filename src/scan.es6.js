import cfg from './config.es6.js';

function scan(max, step = 1) {
  let i = 0;
  let data = [];
  for (let x = 0; x < max; x += step) {
    for (let y = 0; y < max; y += step) {
      for (let z = 0; z < max; z += step) {
        // yield { i, x, y, z };
        data.push({ i, x, y, z });
        i++;
      }
    }
  }

  return data;
}

export default scan;
