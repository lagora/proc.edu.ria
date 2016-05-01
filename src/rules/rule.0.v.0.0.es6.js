var rule = require('../../rules/rule.0.v.0.0.json');
const axes = ['x', 'y', 'z'];

export default (cfg, data) => {
  let newData = [];
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
    newData.push({ raw, object });
  }
  return newData;
}
