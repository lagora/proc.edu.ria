var cache = {};

function scan(max, step) {
  cache[max] = cache[max] || {};
  cache[max][step] = cache[max][step] || [];
  if (cache[max][step].length) {
    return cache[max][step];
  }

  let i = 0;
  for (let x = 0; x < max; x += step) {
    for (let y = 0; y < max; y += step) {
      for (let z = 0; z < max; z += step) {
        // yield { i, x, y, z };
        cache[max][step].push({ i, x, y, z });
        i++;
      }
    }
  }
  return cache[max][step];
};

export default scan;
