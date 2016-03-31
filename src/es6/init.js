import THREE from '../../node_modules/three/three.js'
import cfg from './config.js'

var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera( 75, cfg.w / cfg.h, cfg.near, cfg.far )
var renderer = new THREE.WebGLRenderer()

renderer.setSize( cfg.w, cfg.h )

export { THREE, scene, camera, renderer }
