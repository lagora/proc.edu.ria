import * as THREE from 'three'
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
    var dumpFile = true === rule.cfg.dump.file
    var cnx = false
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
          let dbDataRawType = { type, level, levelSize, index, subSeed, position, size }
          let dbDataBlockType = {}
          dbDataBlockType.geometry = new THREE.BoxGeometry(
            size.x, size.y, size.z,
            1, 1, 1
           )
           dbDataBlockType.position = position;
           dbDataBlockType.material = new THREE.MeshPhongMaterial( {
             color: 0xdddddd,
             specular: 0x009900,
             shininess: 30,
             fog: true,
             shading: THREE.FlatShading
           } )
          // if (rule.cfg.ws && rule.cfg.wsId) {
          //   rule.cfg.ws.sendMessage('one', JSON.stringify({type: 'raw', data: dbDataRawType}), rule.cfg.wsId);
          // }
          if (rule.cfg.db) {
            rule.cfg.db.insert(dbDataRawType);
            rule.cfg.ws.sendMessage('one', JSON.stringify({type: 'raw', data: dbDataRawType}), rule.cfg.wsId);

            rule.cfg.db.insert(dbDataBlockType);
            rule.cfg.ws.sendMessage('one', JSON.stringify({type: 'block', data: dbDataBlockType}), rule.cfg.wsId);
          }
          return dbDataRawType
        })
        next(null, data)
      },
      // (data, next) => {
      //   if (rule.cfg.ws && rule.cfg.wsId) {
      //     rule.cfg.ws.sendMessage('one', JSON.stringify({type: 'raw', data: data}), rule.cfg.wsId);
      //   }
      // },
    ], (err, data) => {
      console[err ? 'error':'info']('\t\t'+(err ? 'KO':'OK'), err, 'LVL 0:', data ? `${data.length} entries`:'no entries')
      console.info('\tEND: rule_0')
      done(null, data)
    })
  }

console.error(rule.cfg);

  if (rule.cfg.db) {
    console.log(`looking for previous rule_0 records using type:raw, levelSize:${rule.cfg.size}`);
    rule.cfg.db.find({type: 'raw', levelSize: rule.cfg.size}, (err, items) => {
      if (err) {
        then();
      } else if (!items || 0 === items.length) {
        console.log('no previous rule_0 data found');
        then();
      } else {
        console.info('found previous rule_0 data, sending them');
        rule.cfg.ws.webSocketOut({type: 'raw', data: items}, rule.cfg.wsId);
        done(null, items);
      }
    });
  } else {
    then()
  }

}

export default rule_0
