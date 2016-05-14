function cycleCheck (list, keys, all = false) {
  var err = false;
  keys[ all ? "map":"some"]((key) => {
    if (list[key] === undefined || typeof list[key] === 'undefined') {
      err = `missing ${key}`;
    }
  });
  return err;
}

export default cycleCheck;
