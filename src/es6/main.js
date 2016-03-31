import { THREE, scene, camera, renderer } from './init.js'
// import rules from './rules.js'

var seed = `31d6cfe0d16ae931`
var functionsByRules = [{}]
for (var i = 0x0; i < 0xf; i++) {
  functionsByRules[0][i] = (i) => 0xa < i
}
console.log('functionsByRules', functionsByRules)

var rules = (data) => {
  if (1 < data.length) {
    let r = []
    for (var i = 0; i < data.length; i++) {
      r.push(rules(data.substring(i, i+1)))
    }
    return r
  } else {
    // console.log('data', data);
    return data;
  }
}
var done = rules(seed)
console.log('done', done)

var geometry = new THREE.BoxGeometry( 1, 1, 1 )
var material = new THREE.MeshLambertMaterial( { color: 0xffffff } )
var cube = new THREE.Mesh( geometry, material )
scene.add( cube )

var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 )
scene.add( light )

var lightHelper = new THREE.HemisphereLightHelper(light, 4)

var size = 5
var step = 1
var gridHelper = new THREE.GridHelper( size, step )
scene.add( gridHelper )

camera.position.x = 5
camera.position.y = 5
camera.position.z = 5
camera.lookAt(new THREE.Vector3())
// camera.rotation.x = -0.55;
// camera.position.y = 5;
// camera.position.z = 5;

document.body.appendChild( renderer.domElement )
var angle = 0
function render() {
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  // var rad = angle * (Math.PI / 180);
  // camera.position.x = cube.position.x + Math.sin(rad) * cfg.zoom;
  // camera.position.y = cube.position.z + Math.cos(rad) * cfg.zoom;
  camera.lookAt(new THREE.Vector3())

  lightHelper.update()
	requestAnimationFrame( render )
	renderer.render( scene, camera )
  angle += 0.25
}

render()
