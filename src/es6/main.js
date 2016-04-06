// import THREE from '../../node_modules/three/three.js'
import { THREE, scene, camera, renderer } from './init.js'
var OrbitControls = require('three-orbit-controls')(THREE)
import cfg from './config.js'
// import ProceduriaBuilder from './ProceduriaBuilder.js'
//
// var builder = new ProceduriaBuilder(cfg.seed, {
//   progress: function (percent) {
//     console.log('progress', percent)
//     document.getElementById('loading-info').textContent = `${percent} %`
//   }
// })

var HemisphereLight = new THREE.HemisphereLight( 0x777777, 0xcccccc, 0.5 )
scene.add( HemisphereLight )

if (cfg.debug) {
  var HemisphereLightHelper = new THREE.HemisphereLightHelper(HemisphereLight, 4)
  scene.add( HemisphereLightHelper)
}

var DirectionalLight = new THREE.DirectionalLight( 0xffffbb, 0.5 )
DirectionalLight.position.set( 0, 1, 0.75 )
scene.add( DirectionalLight )

if (cfg.debug) {
  var DirectionalLightHelper = new THREE.DirectionalLightHelper( DirectionalLight, cfg.size + 1 )
  scene.add( DirectionalLightHelper )
}

var spotLight = new THREE.SpotLight( 0xffffff )
spotLight.position.set( 10, 100, 10 )
if (cfg.debug) {
  var spotLightHelper = new THREE.SpotLightHelper( spotLight )
  scene.add( spotLightHelper )
}

spotLight.castShadow = true
let shadowMapSize = 4096
spotLight.shadow.mapSize.width = shadowMapSize
spotLight.shadow.mapSize.height = shadowMapSize

spotLight.shadow.camera.near = cfg.near
spotLight.shadow.camera.far = cfg.far
spotLight.shadow.camera.fov = cfg.fov / 2

scene.add( spotLight );


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
document.getElementById('reset').addEventListener('click', () => {
  builder.reset()
})
var angle = 0
// document.querySelector('.editor').classList.remove('off')
document.getElementById('loading-info').classList.add('off')

function render() {
  if (cfg.autoRotate && window.controls.autoRotate) controls.update()
  // builder.update()
  // camera.lookAt(new THREE.Vector3())

  if (cfg.debug) {
    HemisphereLightHelper.update()
    DirectionalLightHelper.update()
  }

  camera.lookAt(builder.getPositionAsVector3())
  requestAnimationFrame( render )
  renderer.render( scene, camera )
  angle += 0.25
}
render()

// builder.make()
