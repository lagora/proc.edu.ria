import * as THREE from 'three';
import waterfall from 'async-waterfall';

import scan from '../scan.es6.js';

var rule_O_specs = {
  "0.0": {
    "version":"0.0",
    "name":"volumetric density",
    "method": "scan",
    "data": {
      "0": {
        "position": {
          "x":0,
          "y":0,
          "z":0
        },
        "size":{
          "x":0,
          "y":0,
          "z":0
        }
      },


      "1": {
        "position": {
          "x":0,
          "y":0,
          "z":0
        },
        "size":{
          "x":0.5,
          "y":0.5,
          "z":0.5
        }
      },
      "2": {
        "position": {
          "x":0.5,
          "y":0,
          "z":0
        },
        "size":{
          "x":0.5,
          "y":0.5,
          "z":0.5
        }
      },
      "3": {
        "position": {
          "x":0.5,
          "y":0.5,
          "z":0
        },
        "size":{
          "x":0.5,
          "y":0.5,
          "z":0.5
        }
      },
      "4": {
        "position": {
          "x":0,
          "y":0.5,
          "z":0
        },
        "size":{
          "x":0.5,
          "y":0.5,
          "z":0.5
        }
      },
      "5": {
        "position": {
          "x":0,
          "y":0,
          "z":0.5
        },
        "size":{
          "x":0.5,
          "y":0.5,
          "z":0.5
        }
      },
      "6": {
        "position": {
          "x":0.5,
          "y":0,
          "z":0.5
        },
        "size":{
          "x":0.5,
          "y":0.5,
          "z":0.5
        }
      },
      "7": {
        "position": {
          "x":0.5,
          "y":0.5,
          "z":0.5
        },
        "size":{
          "x":0.5,
          "y":0.5,
          "z":0.5
        }
      },
      "8": {
        "position": {
          "x":0,
          "y":0.5,
          "z":0.5
        },
        "size":{
          "x":0.5,
          "y":0.5,
          "z":0.5
        }
      },



      "9": {
        "position": {
          "x":0,
          "y":0,
          "z":0
        },
        "size":{
          "x":0.5,
          "y":1,
          "z":1
        }
      },
      "a": {
        "position": {
          "x":0.5,
          "y":0,
          "z":0
        },
        "size":{
          "x":0.5,
          "y":1,
          "z":1
        }
      },
      "b": {
        "position": {
          "x":0,
          "y":0,
          "z":0
        },
        "size":{
          "x":1,
          "y":0.5,
          "z":1
        }
      },
      "c": {
        "position": {
          "x":0,
          "y":0.5,
          "z":0
        },
        "size":{
          "x":1,
          "y":0.5,
          "z":1
        }
      },
      "d": {
        "position": {
          "x":0,
          "y":0,
          "z":0
        },
        "size":{
          "x":1,
          "y":1,
          "z":0.5
        }
      },
      "e": {
        "position": {
          "x":0,
          "y":0,
          "z":0.5
        },
        "size":{
          "x":1,
          "y":1,
          "z":0.5
        }
      },



      "f": {
        "position": {
          "x":0,
          "y":0,
          "z":0
        },
        "size":{
          "x":1,
          "y":1,
          "z":1
        }
      }
    }
  },
  "1.0": {
    "version": "1.0",
    "name": "volumetric density",
    "method": "scan",
    "data": [
      0,0,0,  0,0,0,
      0,0,0,  0.5,0.5,0.5,
      0.5,0,0,    0.5,0.5,0.5,
      0.5,0.5,0,  0.5,0.5,0.5,
      0,0.5,0,    0.5,0.5,0.5,
      0,0,0.5,    0.5,0.5,0.5,
      0.5,0,0.5,  0.5,0.5,0.5,
      0.5,0.5,0.5,  0.5,0.5,0.5,
      0,0.5,0.5,    0.5,0.5,0.5,
      0,0,0,    0.5,1,1,
      0.5,0,0,  0.5,1,1,
      0,0,0,    1,0.5,1,
      0,0.5,0,  1,0.5,1,
      0,0,0,    1,1,0.5,
      0,0,0.5,  1,1,0.5,
      0,0,0,  1,1,1
    ]
  }
};

const POSITION_X = 0;
const POSITION_Y = 1;
const POSITION_Z = 2;
const SIZE_X = 3;
const SIZE_Y = 4;
const SIZE_Z = 5;

var axes = ['x', 'y', 'z'];
var methods = {};

export default function* (cfg) {
  let rule = rule_O_specs[cfg.version];
  console.info(`\tSTART: rule_0 using version: ${cfg.version}`);

  let data = scan(cfg.size, 1);

  if ("0.0" === cfg.version) {
    for (var i = 0; i < data.length; i++) {
      let bit = data[i];
      let index = bit.i;
      let type = 'raw';
      let level = 0;
      let levelSize = cfg.size;
      let subSeed = cfg.seed[index];
      let position = { x: bit.x, y: bit.y, z: bit.z };
      let size = rule.data[subSeed].size;
      axes.forEach((axis) => {
        position[axis] += rule.data[subSeed].position[axis]
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
      yield { raw, object };
    }
  }

  // if ("1.0" === cfg.version) {
  //   for (var i = 0; i < data.length; i++) {
  //     let bit = data[i];
  //     let index = bit.i;
  //     let type = 'raw';
  //     let level = 0;
  //     let levelSize = cfg.size;
  //     let subSeed = cfg.seed[index];
  //     let hexSeed = parseInt(subSeed, 16);
  //     let position = {
  //       x: bit.x + rule.data[hexSeed + POSITION_X],
  //       y: bit.y + rule.data[hexSeed + POSITION_Y],
  //       z: bit.z + rule.data[hexSeed + POSITION_Z]
  //     };
  //     let size = {
  //       x: rule.data[hexSeed + SIZE_X],
  //       y: rule.data[hexSeed + SIZE_Y],
  //       z: rule.data[hexSeed + SIZE_Z]
  //     };
  //     let raw = { type, level, levelSize, index, subSeed, position, size };
  //     let object = {
  //       type: 'object'
  //     };
  //     let geometry = new THREE.BoxGeometry(
  //       size.x, size.y, size.z,
  //       1, 1, 1
  //     );
  //     object.material = new THREE.MeshPhongMaterial( {
  //       color: 0xdddddd,
  //       specular: 0x009900,
  //       shininess: 30,
  //       fog: true,
  //       shading: THREE.FlatShading
  //     } );
  //
  //     let cube = new THREE.Mesh( geometry, object.material );
  //     cube.castShadow = true;
  //     cube.receiveShadow = true;
  //
  //     axes.forEach((axis) => {
  //       cube.position[axis] = position[axis]
  //     });
  //
  //     object.vertices = geometry.vertices;
  //     yield { raw, object };
  //   }
  // }
};
