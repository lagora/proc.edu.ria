import { THREE, scene, camera, renderer } from './init.es6.js'
var OrbitControls = require('three-orbit-controls')(THREE)
import cfg from './config.es6.js'
import { HemisphereLight, HemisphereLightHelper, DirectionalLightHelper } from './light.es6.js'

let axes = ['x', 'y', 'z']

window.camereReset = () => {
  let sizeToUse = 'size'
  var distance = cfg[sizeToUse] * 1.5
  camera.position.x = distance
  camera.position.y = distance
  camera.position.z = distance
  camera.lookAt( { x: cfg[sizeToUse], y: cfg[sizeToUse], z: cfg[sizeToUse] })
}
window.camereReset()

window.controls = new OrbitControls(camera, renderer.domElement)
window.controls.autoRotate = cfg.autoRotate

document.body.appendChild( renderer.domElement )
var angle = 0
// document.querySelector('.editor').classList.remove('off')
document.getElementById('loading-info').classList.add('off')

function render() {
  if (cfg.autoRotate && window.controls.autoRotate) controls.update()

  if (cfg.debug) {
    HemisphereLightHelper.update()
    DirectionalLightHelper.update()
  }

  camera.lookAt(new THREE.Vector3())
  requestAnimationFrame( render )
  renderer.render( scene, camera )
  angle += 0.25
}
render()

var putBlock = (data) => {
  if (!data) {
    console.error('no data, aborting');
    return;
  }

  let geometry = new THREE.BoxGeometry(
    data.size.x, data.size.y, data.size.z,
    1, 1, 1
   )
  // let material = new THREE.MeshLambertMaterial( { color: c } )
  // let material = new THREE.MeshNormalMaterial( { wireframe: cfg.wireframe } )
  let material = new THREE.MeshPhongMaterial( {
    color: 0xdddddd,
    specular: 0x009900,
    shininess: 30,
    fog: true,
    shading: THREE.FlatShading
  } )
  // let material = new THREE.MeshDepthMaterial( { wireframe: cfg.wireframe } )
  // let material = new THREE.LineBasicMaterial( { fog: true })
  let cube = new THREE.Mesh( geometry, material )
  cube.castShadow = true
  cube.receiveShadow = true
  cube.name = data.name

  axes.forEach((axis) => {
    cube.position[axis] = data.position[axis]
  })

  scene.add( cube )
}

let data = []
let geometry = new THREE.BufferGeometry();
geometry.dynamic = true;

cfg.ws.onmessage = event => {
  if ('message' !== event.type) return;
  let incomingData = JSON.parse(event.data);
  if ('mesh' === incomingData.type) {
    scene.add(incomingData.mesh);
  } else if ('object' === incomingData.type) {
    console.log('incomingData', incomingData);
    let vertices = new Float32Array( incomingData.vertices.length * 3 ); // three components per vertex
    geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    let material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    let mesh = new THREE.Mesh( geometry, incomingData.material );
    scene.add(mesh);
  } else if ('raw' === incomingData.type) {
    putBlock(incomingData);
  } else {
    console.log('unrecognized incomingData:', incomingData);
  }
}
