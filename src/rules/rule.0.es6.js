
var scan = (max, step, callback) => {
  let i = 0
  for (var x = 0; x < max; x += step) {
    for (let y = 0; y < max; y += step) {
      for (let z = 0; z < max; z += step) {
        // console.log('scan', i, x, y, z)
        callback(i, x, y, z)
        i++
      }
    }
  }
}

var rule_0 = (data, rule, next) => {
  scan(rule.cfg.size, 1, (index, x, z) => {
    let type = 'raw'
    let level = 0
    let levelSize = rule.cfg.size
    let subSeed = rule.cfg.seed[index]
    let {position, size} = rule.data[subSeed]
    data.push({type, level, levelSize, index, subSeed, position, size})
  })
  next(null, data)
}

export default rule_0
