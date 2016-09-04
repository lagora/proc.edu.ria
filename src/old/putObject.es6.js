var putObject = (scene, data) => {
  data = data.object;
  let vertices = new Float32Array( data.vertices.length * 3 ); // three components per vertex
  geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
  let material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
  let mesh = new THREE.Mesh( geometry, data.material );
  scene.add(mesh);
};

export default putObject;
