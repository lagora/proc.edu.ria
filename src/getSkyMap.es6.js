import THREE from 'three';

export default function getSkyMap(cfg) {
  let urls = [
    '../around.jpg',  '../around.jpg',
    '../top.jpg',   '../bottom.jpg',
    '../around.jpg', '../around.jpg'
  ];

  // var cubemap = new THREE.ImageUtils.loadTextureCube(urls); // load textures
  // cubemap.format = THREE.RGBFormat;
  var loader = new THREE.CubeTextureLoader();
  var cubemap = loader.load(urls);
  var shader = THREE.ShaderLib.cube; // init cube shader from built-in lib
  shader.uniforms.tCube.value = cubemap; // apply textures to shader

  // create shader material
  var skyBoxMaterial = new THREE.ShaderMaterial( {
    fragmentShader: shader.fragmentShader,
    vertexShader: shader.vertexShader,
    uniforms: shader.uniforms,
    depthWrite: false,
    side: THREE.BackSide
  });

  // create skybox mesh
  var skybox = new THREE.Mesh(
    new THREE.CubeGeometry(cfg.far, cfg.far, cfg.far),
    skyBoxMaterial
  );

  // scene.add(skybox);
  return skybox;
}
