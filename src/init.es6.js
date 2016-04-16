// import THREE from '../../node_modules/three/three.js'
import cfg from './config.es6.js'


var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera( cfg.fov, cfg.w / cfg.h, cfg.near, cfg.far )
var renderer = new THREE.WebGLRenderer()
renderer.shadowMap.enabled = true
scene.up = new THREE.Vector3(0, 0, 1)

if (cfg.debug) {
  var size = cfg.size + 1
  var step = 1
  var gridHelper = new THREE.GridHelper( size , step )
  if (cfg.debug)  console.info(
    'init',
    'gridHelper:', 'size:', size
  )
  scene.add( gridHelper )
}

renderer.setSize( cfg.w * cfg.zoom, cfg.h * cfg.zoom )

export { THREE, scene, camera, renderer }
