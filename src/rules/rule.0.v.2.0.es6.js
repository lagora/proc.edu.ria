var rule = require('../../rules/rule.0.v.2.0.json');
const axes = ['x', 'y', 'z'];
//WIP
export default (cfg, data) => {
  let newData = [];
  console.log('"########"', rule.data);
  for (var i = 0; i < data.length; i++) {
    let bit = data[i];
    let index = bit.i;
    let type = 'raw';
    let level = 0;
    let levelSize = cfg.size;
    let subSeed = cfg.seed[index];
    let position = {};
    let size = {};
    axes.forEach((axis) => {
      position[axis] = bit[axis];
      if (!rule.data[subSeed].position || !rule.data[subSeed].position[axis]) {
        position[axis] += rule.data.default.position[axis];
      } else {
        position[axis] += rule.data[subSeed].position[axis];
      }
      if (!rule.data[subSeed].size || !rule.data[subSeed].size[axis]) {
        size[axis] = rule.data.default.size[axis];
      } else {
        size[axis] = rule.data[subSeed].size[axis];
      }

      // if (rule.data[subSeed].position) {
      //   if (rule.data[subSeed].position[axis]) {
      //     position[axis] += rule.data[subSeed].position[axis];
      //   } else {
      //     position[axis] += rule.data.default.position[axis];
      //   }
      // } else {
      //   position[axis] += rule.data.default.position[axis];
      // }
      // size[axis] = rule.data[subSeed].size[axis] ? rule.data[subSeed].size[axis]:rule.data.default.size[axis];
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
    newData.push({ raw, object });
  }
  return newData;
}
