export const getRatio = width => height => width / height;
export const initClock = THREE => THREE.Clock();
export const initScene = (THREE) => {
  const scene = new THREE.Scene();
  scene.up = new THREE.Vector3(0, 0, 1);
  return scene;
};

export const getRenderer = THREE => width => height => zoom => {
  const renderer = new THREE.WebGLRenderer();
  document.body.appendChild( renderer.domElement );
  renderer.setSize( width * zoom, height * zoom );
  return renderer;
};

export const getPerspectiveCamera = THREE => fov => ratio => near => far => {
  return new THREE.PerspectiveCamera(fov, ratio, near, far);
}

export const setCameraPosition = camera => x => y => z => {
  camera.position.x = x;
  camera.position.y = y;
  camera.position.z = z;
  return camera;
}

export const setCameraLookAt = THREE => camera => x => y => z => {
   camera.lookAt(new THREE.Vector3(x, y, z));
   return camera;
};

export const getGridHelper = THREE => size => {
  const gridHelper = new THREE.GridHelper( size , 1 );
  gridHelper.position.x = size / 2;
  gridHelper.position.z = size / 2;
  return gridHelper;
};

export const getAxisHelper = THREE => size => {
  const axisHelper = new THREE.AxisHelper( size * 2 );
  axisHelper.position.x = size / 2;
  axisHelper.position.z = size / 2;
  return axisHelper;
};

export const getHemisphereLight = THREE => new THREE.HemisphereLight( 0x777777, 0xcccccc, 0.5 )

export const getHemisphereLightHelper = THREE => scene => {
  const helpers = scene.children
  .filter(object => object.type === 'HemisphereLight')
  .map(light => new THREE.HemisphereLightHelper(light, 4));
  return helpers.length ? helpers : [];
};

export const getDirectionalLight = THREE => {
  var directionalLight = new THREE.DirectionalLight( 0xffffbb, 0.5 );
  directionalLight.position.set( 0, 1, 0.75 );
  return directionalLight;
};

export const getDirectionalLightHelper = THREE => size => scene => {
  const helpers = scene.children
  .filter(object => object.type === 'DirectionalLight')
  .map(light => new THREE.DirectionalLightHelper(light, size + 1));
  return helpers.length ? helpers : [];
};

export const getSpotLight = THREE => size => near => far => fov => {
  var spotLight = new THREE.SpotLight( 0xffffff );
  spotLight.position.set( 0, size * 2, size );
  spotLight.castShadow = true;
  const shadowMapSize = 4096;
  spotLight.shadow.mapSize.width = shadowMapSize;
  spotLight.shadow.mapSize.height = shadowMapSize;
  spotLight.shadow.camera.near = near;
  spotLight.shadow.camera.far = far;
  spotLight.shadow.camera.fov = fov / 2;
  return spotLight;
};

export const getSpotLightHelper = THREE => size => scene => {
  const helpers = scene.children
  .filter(object => object.type === 'SpotLight')
  .map(light => new THREE.SpotLightHelper(light));
  return helpers.length ? helpers : [];
};

export const getBufferGeometry = THREE => new THREE.BufferGeometry();
export const addFog = THREE => near => far => new THREE.Fog(0xffffff, near, far);

export const initHelpers = state => {
    const { scene, size } = { ...state };
    const gridHelper = new THREE.GridHelper( gridSize , 1 );
    gridHelper.position.x = gridSize / 2;
    gridHelper.position.z = gridSize / 2;
    scene.add(gridHelper);

    const axisHelper = new THREE.AxisHelper( size * 2 );
    axisHelper.position.x = gridSize / 2;
    axisHelper.position.z = gridSize / 2;
    scene.add(axisHelper);

    return scene;
}
