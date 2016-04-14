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
  // if (cfg.debug)  console.info('putBlock', data.index, data.subSeed, data.position, data.size)
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
  // if (cfg.debug)  console.info(cube.geometry, cube.faces)
  cube.castShadow = true
  cube.receiveShadow = true

  axes.forEach((axis) => {
    cube.position[axis] = data.position[axis]
  })

  // if (cfg.debug)  console.info('cube.position:', cube.position)
  return scene.add( cube )
}

let data = []

cfg.ws.onmessage = event => {
  if ('message' === event.type) {
    let incomingData = JSON.parse(event.data);
    console.log('incomingData', incomingData);
    if ('raw' === incomingData.type) {
      if (Array.isArray(incomingData.data)) {
        data = incomingData.data;
        let i = 0
        let intervalId = window.setInterval(() => {
          putBlock(data[i])
          i++
          if (i === data.length) {
            window.clearInterval(intervalId)
          }
        }, cfg.stepSeed)
      } else {
        putBlock(incomingData.data);
      }
    }
  }
}
