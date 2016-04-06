import { THREE, scene, camera, renderer } from './init.es6.js'
var OrbitControls = require('three-orbit-controls')(THREE)
import cfg from './config.es6.js'
import { HemisphereLight, HemisphereLightHelper, DirectionalLightHelper } from './light.es6.js'


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


cfg.ws.onopen = () => {
 //do something when connection estabilished
console.log('onopen')
cfg.ws.send('ready', cfg)
};

cfg.ws.onmessage = (message) => {
 //do something when message arrives
 ws.log('onmessage', message)
};

cfg.ws.onclose = function() {
 //do something when connection close
 console.log('onclose')
};
