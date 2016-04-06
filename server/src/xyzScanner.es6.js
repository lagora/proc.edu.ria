var scan = (max, step, callback) => {
  /**
  * for every x in x, every y in h, every z in d, callback()
  **/
  let i = 0
  for (let x = 0; x < max; x += step) {
    for (let y = 0; y < max; y += step) {
      for (let z = 0; z < max; z += step) {
        callback(i, {x, y, z})
        // this.data.push({x, y, z, i})
        i++
      }
    }
  }
}

export default scan
