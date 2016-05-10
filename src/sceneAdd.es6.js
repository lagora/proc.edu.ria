function sceneAdd(scene, object) {
  if (object) {
    scene.add(object);
  } else {
    console.trace('not object to add');
  }
}

export default sceneAdd;
