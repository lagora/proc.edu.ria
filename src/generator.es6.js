console.info('Proc.Edu.Ria')
import fs from 'fs-extra'
import waterfall from 'async-waterfall'
import sha512 from 'sha512'
import rule_0 from './rules/rule.0.es6.js'

var size = 5
var cubicSize = Math.pow(size, 3)
var mkSeed = (str) => sha512(str).toString('hex')
var seedSource = 'proc.edu.ria'
var rawSeed = mkSeed(seedSource)

while (rawSeed.length < cubicSize) {
  let remaining = cubicSize - rawSeed.length
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

var rulesSettings = []
var data = []

var scan = (max, step, callback) => {
  let i = 0
  for (var x = 0; x < max; x += step) {
    for (let y = 0; y < max; y += step) {
      for (let z = 0; z < max; z += step) {
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
    while (rulesSettings.length < rule.index) {
      rulesSettings.push({})
    }
    rule.cfg = cfg
    rule.method = methods[rule.method]
    rulesSettings.push(rule)
  }
})

//console.info('rules:', rules)


let index = 0
waterfall([
  (next) => {
    let data_0 = []
    rule_0(data_0, rulesSettings[index], next)
    data.concat(data_0)
    let dumpFilename = `./data/data.0.size-${cfg.size}.json`
    fs.writeJSON(`${dumpFilename}`, data_0, (err) => {
      if (err) {
        console.error(`ERROR: while trying to write dump ${dumpFilename}`, err)
      } else {
        console.info(`OK: dump ${dumpFilename}`)
      }
    })
  }
], (err, results) => {
  data = results
  console.log('err', err, 'data', data)
})
