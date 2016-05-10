function scan(max, step = 1) {
  let cachedName = `scan-${max}-${step}`;
  var cached = window.localStorage.getItem(cachedName);
  if (!cached) {
    cached = [];
    let i = 0;
    for (let x = 0; x < max; x += step) {
      for (let y = 0; y < max; y += step) {
        for (let z = 0; z < max; z += step) {
          // yield { i, x, y, z };
          cached.push({ i, x, y, z });
          i++;
        }
      }
    }
    window.localStorage.setItem(cachedName, cached);
  }

  return cached;
}

export default scan;
