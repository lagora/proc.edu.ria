console.info('Proc.Edu.Ria')
import fs from 'fs-extra'
import waterfall from 'async-waterfall'
import sha512 from 'sha512'

var size = 5
var cubicSize = Math.pow(size, 3)
var mkSeed = (str) => sha512(str).toString('hex')
var seedSource = 'proc.edu.ria'
var rawSeed = mkSeed(seedSource)

while (rawSeed.length < cubicSize.length) {
  let remaining = cubicSize.length - rawSeed.length
  console.info(`Filling up seed: ${remaining}/${cubicSize}`)
  rawSeed += mkSeed(rawSeed).substr(0, remaining)
}

var seed = rawSeed.substr(0, cubicSize)

var cfg = {
  size:size,
  cubicSize:cubicSize,
  seedSource:seedSource,
  rawSeed:rawSeed,
  seed:seed,
  unit:1
}

console.info(`size:${size}\ncubicSize:${cubicSize}\nseedSource:${seedSource}\nseed:${seed.length} => ${seed}`)

var rulesIndexFilename = './rules.json'
var rulesIndexFound = fs.existsSync(rulesIndexFilename)
console.error(rulesIndexFound ? 'OK':'KO', `looking for ${rulesIndexFilename}`)

if (!rulesIndexFound) {
  process.exit(1)
}

var rulesIndex = fs.readJsonSync(rulesIndexFilename)
//console.info('rules:', rulesIndex)

var rules = []
var data = []

var scan = (max, step, callback) => {
  let i = 0
  for (var x = 0; x < max.length; x += step) {
    for (let y = 0; y < max.length; y += step) {
      for (let z = 0; z < max.length; z += step) {
        console.log('scan', i, x, y, z)
        callback(i, x, y, z)
        i++
      }
    }
  }
}

var methods = {
  scan:scan
}

rulesIndex.files.forEach((rule) => {
  let ruleFilename = `./${rulesIndex.path}/${rule.filename}`
  let ruleFileFound = fs.existsSync(ruleFilename)
  console.info(ruleFileFound ? 'OK':'KO', `looking for ${ruleFilename}`)
  if (!ruleFileFound) {
    process.exit(1)
  } else {
    let rule = fs.readJsonSync(ruleFilename)
    while (rules.length < rule.index) {
      rules.push({})
    }
    rule.cfg = cfg
    rule.method = methods[rule.method]
    rules.push(rule)
  }
})

//console.info('rules:', rules)

rules[0].method(cfg.unit, cfg.unit, (i, x,y, z) => {

})

/*
let index = 0
waterfall([
  (next) => {
    let rule = rules[index]
    let callback = (i, x, y, z) => {
console.log('callback', i, x, y, z)
      console.info(i, x, y, z)
    }
    rule.method(rule.cfg.unit, rule.cfg.unit, callback)
    index++
    next(null, data)
  }
], (err, results) => {
  console.log('err', err, 'results', results)
})
*/
