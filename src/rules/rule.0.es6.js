import waterfall from 'async-waterfall'
import fs from 'fs-extra'

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
  for (let y = 0; y < max; y += step) {
    for (let z = 0; z < max; z += step) {
      for (var x = 0; x < max; x += step) {
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
  
  let then = () => {
    console.info('\tSTART: rule_0')
    var useDb = true === rule.cfg.dump.db
    var dumpFile = true === rule.cfg.dump.file
    var cnx = false
    console.info('\t\tuseDb', useDb, 'dumpFile', dumpFile)
    waterfall([
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
          let position = { x: bit.x, y: bit.y, z: bit.z }
          let size = rule.data[subSeed].size
          axes.forEach((axis) => {
            position[axis] += rule.data[subSeed].position[axis]
          })
          let dataBit = { type, level, levelSize, index, subSeed, position, size }
          // if (rule.cfg.ws && rule.cfg.wsId) {
          //   rule.cfg.ws.sendMessage('one', JSON.stringify({type: 'raw', data: dataBit}), rule.cfg.wsId);
          // }
          // if (rule.cfg.db) {
          //   rule.cfg.db.insert(dataBit);
          // }
          return dataBit
        })
        next(null, data)
      },
      (data, next) => {
        if (rule.cfg.ws && rule.cfg.wsId) {
          rule.cfg.ws.sendMessage('one', JSON.stringify({type: 'raw', data: data}), rule.cfg.wsId);
        }
      },
      (data, next) => {
        if (dumpFile) {
          console.info('\t\tdumping data to file')
          let dumpFilename = `./data/data.0.size-${rule.cfg.size}.json`
          let exists = fs.existsSync(dumpFilename)

          if (exists) {
            fs.unlinkSync(dumpFilename)
          }

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
      }
    ], (err, data) => {
      console[err ? 'error':'info']('\t\t'+(err ? 'KO':'OK'), err, 'LVL 0:', data ? `${data.length} entries`:'no entries')
      console.info('\tEND: rule_0')
      done(null, data)
    })
  }

console.error(rule.cfg);

  if (rule.cfg.db) {
    rule.cfg.db.find({type: 'raw', size: data.size}, (err, items) => {
      console.log('err', err, 'items', items);
      if (err || !items || 0 === items.length) {
        then();
      } else {
        server.sendMessage('one', JSON.stringify({type: 'raw', data: items}), id);
      }
    });
  } else {
    then()
  }

}

export default rule_0
