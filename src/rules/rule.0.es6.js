import * as THREE from 'three';
import waterfall from 'async-waterfall';

import scan from '../scan.es6.js';

var axes = ['x', 'y', 'z'];
var methods = {};

var rule_0 = (cfg, done) => {

  let then = (cfg, done) => {
    console.info('\tSTART: rule_0', cfg.rule)
    waterfall([
      (next) => {
        let data = scan(cfg.size, 1)
        next(null, cfg, data)
      },
      (cfg, data, next) => {
        data = data.map((bit) => {
          let index = bit.i;
          let type = 'raw';
          let level = 0;
          let levelSize = cfg.size;
          let subSeed = cfg.seed[index];
          let position = { x: bit.x, y: bit.y, z: bit.z };
          let size = cfg.rule.data[subSeed].size;
          axes.forEach((axis) => {
            position[axis] += cfg.rule.data[subSeed].position[axis]
          });
          let raw = { type, level, levelSize, index, subSeed, position, size };
          let object = {
            type: 'object'
          };
          let geometry = new THREE.BoxGeometry(
            size.x, size.y, size.z,
            1, 1, 1
          );
          object.material = new THREE.MeshPhongMaterial( {
            color: 0xdddddd,
            specular: 0x009900,
            shininess: 30,
            fog: true,
            shading: THREE.FlatShading
          } );

          let cube = new THREE.Mesh( geometry, object.material );
          cube.castShadow = true;
          cube.receiveShadow = true;

          axes.forEach((axis) => {
            cube.position[axis] = position[axis]
          });

          object.vertices = geometry.vertices;

          cfg.db.insert(raw);
          cfg.ws.sendMessage('one', JSON.stringify(raw), cfg.wsId);

          cfg.db.insert(object);
          cfg.ws.sendMessage('one', JSON.stringify(object), cfg.wsId);

          // cfg.db.insert({type: 'mesh', mesh: JSON.stringify(cube)});
          // cfg.db.insert({type: 'mesh', data: JSON.stringify(cube)});
          // cfg.ws.sendMessage('one', JSON.stringify(cube), cfg.wsId);

          return raw;
        })
        next(null, data);
      },
    ], (err, data) => {
      console[err ? 'error':'info']('\t\t'+(err ? 'KO':'OK'), err, 'LVL 0:', data ? `${data.length * 2} entries`:'no entries')
      console.info('\tEND: rule_0');
      done(null, data);
    })
  };

  var previous = (type, callback, done) => {
    console.log(`looking for previous rule_0 records using type:${type}, levelSize:${cfg.size}`);
    cfg.db.find({type: 'object', level:0, levelSize: cfg.size}, (err, items) => {
      if (err) {
        callback(cfg, done);
      } else if (!items || 0 === items.length) {
        console.log(`no previous ${type} rule_0 data found`);
        callback(cfg, done);
      } else {
        console.info(`found previous ${type} rule_0 data, sending them`);
        cfg.ws.webSocketOut({type: 'object', data: items}, cfg.wsId);
        done(null, items);
      }
    });
  };

  previous('object', () => {
    previous('raw', then, done);
  }, done);

}

export default rule_0
