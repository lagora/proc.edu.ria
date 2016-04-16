var scan = (max, step, callback) => {
  let i = 0
  let data = []
  for (let y = 0; y < max; y += step) {
    for (let z = 0; z < max; z += step) {
      for (let x = 0; x < max; x += step) {
        if (callback) {
          callback(i, x, y, z);
        } else {
          data.push({i, x, y, z});
        }
        i++
      }
    }
  }
  if (!callback)  return data;
}

export default scan;
