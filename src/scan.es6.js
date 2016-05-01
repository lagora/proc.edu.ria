export default function (max, step, callback) {
  let i = 0
  let data = []
  for (let y = 0; y < max; y += step) {
    for (let z = 0; z < max; z += step) {
      for (let x = 0; x < max; x += step) {
        data.push({i, x, y, z});
        i++
      }
    }
  }
  return data;
};
