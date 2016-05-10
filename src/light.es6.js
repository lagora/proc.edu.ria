import THREE from "three"
import cfg from "./config.es6.js"

var HemisphereLight = new THREE.HemisphereLight( 0x777777, 0xcccccc, 0.5 )
var DirectionalLight = new THREE.DirectionalLight( 0xffffbb, 0.5 )
DirectionalLight.position.set( 0, 1, 0.75 )
var spotLight = new THREE.SpotLight( 0xffffff )
spotLight.position.set( 10, 100, 10 )

spotLight.castShadow = true;
let shadowMapSize = 2048;
spotLight.shadow.mapSize.width = shadowMapSize;
spotLight.shadow.mapSize.height = shadowMapSize;

spotLight.shadow.camera.near = cfg.near;
spotLight.shadow.camera.far = cfg.far;
spotLight.shadow.camera.fov = cfg.fov / 2;

export { HemisphereLight,  DirectionalLight,  spotLight }
