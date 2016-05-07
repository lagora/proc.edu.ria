function scan(max, step) {
  let i = 0;
  let results = [];
  for (let x = 0; x < max; x += step) {
    for (let y = 0; y < max; y += step) {
      for (let z = 0; z < max; z += step) {
        // yield { i, x, y, z };
        results.push({ i, x, y, z });
        i++;
      }
    }
  }
  return results;
};

export default scan;
