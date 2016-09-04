const position = (hex, bx, by, bz) => {
  let x = bx, y = by, z = bz;
  return { x, y, z };
};

const size = (hex) => {
  let width = 1, height = 1, depth = 1;
  return { width, height, depth };
};

export const rule = state => {
  const { hash, size } = state;
  let data = [], i = 0;
  for (let bx = 0; bx < size; bx++) {
    for (let by = 0; by < size; by++) {
      for (let bz = 0; bz < size; bz++) {
        const hex = hash[i];
        const { x, y, z } = position(hex, bx, by, bz);
        const { width, height, depth } = size(hex);
        data.push({ i, x, y, z });
        i++;
      }
    }
  }

  return data;
}
