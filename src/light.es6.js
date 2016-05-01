import THREE from 'three'
import { scene, camera, renderer } from './init.es6.js'
import cfg from './config.es6.js'

var HemisphereLight = new THREE.HemisphereLight( 0x777777, 0xcccccc, 0.5 )
scene.add( HemisphereLight )

if (cfg.debug) {
  var HemisphereLightHelper = new THREE.HemisphereLightHelper(HemisphereLight, 4)
  scene.add( HemisphereLightHelper)
}

var DirectionalLight = new THREE.DirectionalLight( 0xffffbb, 0.5 )
DirectionalLight.position.set( 0, 1, 0.75 )
scene.add( DirectionalLight )

var DirectionalLightHelper
if (cfg.debug) {
  DirectionalLightHelper = new THREE.DirectionalLightHelper( DirectionalLight, cfg.size + 1 )
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

export {
  HemisphereLight, HemisphereLightHelper,
  DirectionalLight, DirectionalLightHelper,
  spotLight, spotLightHelper
}
