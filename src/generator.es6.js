console.info('Proc.Edu.Ria')
import waterfall  from 'async-waterfall'
import fs  from 'fs-extra'
import sha512  from 'sha512'
import resetDb  from './reset.db.es6.js'
import rule_0  from './rules/rule.0.es6.js'

var argv = {}
process.argv.join(' ').split('--').slice(1).map((a) => a.trim()).map((a) => {
  let b = a.split(' ')
  if (1 === b.length) {
    argv[b[0]] = true
  } else {
    argv[b[0]] = isNaN(b[1]) ? b[1]:parseInt(b[1])
  }
})
var size = argv.size || 4
var cubicSize = Math.pow(size, 3)
var mkSeed = (str) => sha512(str).toString('hex')
var seedSource = argv.seed || 'proc.edu.ria'
var rawSeed = mkSeed(seedSource)

while (rawSeed.length < cubicSize) {
  let remaining = cubicSize - rawSeed.length
  console.info(`Filling up seed: ${((rawSeed.length/cubicSize)*100).toString().substr(0, 2)}% => ${remaining}/${cubicSize}`)
  rawSeed += mkSeed(rawSeed).substr(0, remaining)
}

var seed = rawSeed.substr(0, cubicSize)

var cfg = {
  debug: argv.debug || true,
  dump: {
    db: -1 !== process.argv.indexOf('--dump-db'),
    file: -1 !== process.argv.indexOf('--dump-file')
  },
  size:size,
  cubicSize:cubicSize,
  seedSource:seedSource,
  rawSeed:rawSeed,
  seed:seed,
  unit:1
}

console.info('cfg:', cfg)

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
    rulesSettings.push(rule)
  }
})

//console.info('rules:', rules)

let index = 0
console.info('START: generation')
waterfall([
  (next) => {
    if (true === cfg.dump.db) {
      resetDb(next)
    } else {
      next()
    }
  }
  ,(next) => {
    let data_0 = []
    rule_0(data_0, rulesSettings[index], next)
    data.concat(data_0)
  }
], (err, results) => {
  data = results
  // console.log('err', err, 'data', data)
  console.info('END: generation')
  process.exit(0)
})
