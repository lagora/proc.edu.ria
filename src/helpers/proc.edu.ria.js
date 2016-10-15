export const makeCityPilar = THREE => size => {
  const position = { x: size / 2, y: -50, z: size / 2};
  const geometry = new THREE.BoxBufferGeometry(size, 100, size);
  const materialArgs = {
    color: 0xdddddd,
    specular: 0x009900,
    shininess: 30,
    fog: true,
    wireframe: false,
    shading: "FlatShading",
  };
  const material = new THREE.MeshPhongMaterial(materialArgs);
  const mesh = new THREE.Mesh( geometry, material );
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.position.set(position.x, position.y, position.z);
  return mesh;
}
