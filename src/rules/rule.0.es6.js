import waterfall from 'async-waterfall'
import fs from 'fs-extra'
import r from 'rethinkdb'

var axes = ['x', 'y', 'z']

var getVertices = (position, size) => {
  let start = {
    position: position,
    size: size
  }
  let end = {}
  axes.forEach((axis) => {
    end.position[axis] = position[axis] + size[axis]
  })
}

var scan = (max, step, callback) => {
  let i = 0
  let data = []
  for (var x = 0; x < max; x += step) {
    for (let y = 0; y < max; y += step) {
      for (let z = 0; z < max; z += step) {
        // console.log('scan', i, x, y, z)
        if (callback) {
          callback(i, x, y, z)
        } else {
          data.push({i, x, y, z})
        }
        i++
      }
    }
  }
  if (!callback)  return data
}

var rule_0 = (data, rule, done) => {
  console.info('\tSTART: rule_0')
  var useDb = true === rule.cfg.dump.db
  var dumpFile = true === rule.cfg.dump.file
  var cnx = false
  console.info('\t\tuseDb', useDb, 'dumpFile', dumpFile)
  waterfall([
    (next) => {
      if (useDb) {
        r.connect( {host: 'localhost', port: 28015}, (err, conn) => {
          if (err) {
            console.error(err);
          }
          if (conn) {
            console.info('\t\tOK: cnx')
            cnx = conn
          }
          next(err)
        })
      } else {
        next(null)
      }
    },
    (next) => {
      let data = scan(rule.cfg.size, 1)
      next(null, data)
    },
    (data, next) => {
      data = data.map((bit) => {
        let index = bit.i
        let type = 'raw'
        let level = 0
        let levelSize = rule.cfg.size
        let subSeed = rule.cfg.seed[index]
        let {position, size} = rule.data[subSeed]
        let dataBit = {type, level, levelSize, index, subSeed, position, size}
        return dataBit
      })
      next(null, data)
    },
    (data, next) => {
      if (dumpFile) {
        console.info('\t\tdumping data to file')
        let dumpFilename = `./data/data.0.size-${rule.cfg.size}.json`
        fs.writeJSON(`${dumpFilename}`, data, (err) => {
          if (err) {
            console.error(`\t\tERROR: while trying to write dump ${dumpFilename}`, err)
          } else {
            console.info(`\t\tOK: dump ${dumpFilename}`)
            next(null, data)
          }
        })
      } else {
        next(null, data)
      }
    },
    (data, next) => {
      if (useDb) {
        console.info('\t\tsave to db')
        data.map((dataBit) => {
            r.db('proceduria').table('data').insert(dataBit).run(cnx, (err) => {
              if (err) console.err('\t\tERR:', err, 'insert', dataBit)
            })
        })
      }
      next(null, data)
    }
  ], (err, data) => {
    console[err ? 'error':'info']('\t\t'+(err ? 'KO':'OK'), err, 'LVL 0:', data ? `${data.length} entries`:'no entries')
    console.info('\tEND: rule_0')
    done(null, data)
  })
}

export default rule_0
