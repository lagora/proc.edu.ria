function init(newState, action) {
  return Object.assign({}, newState, { scene: action.scene });
}

function up(newState, action) {
  let scene = newState.scene;
  scene.up = action.up || new THREE.Vector3(0, 0, 1);
  return Object.assign({}, newState, { scene });
}

function remove(newState, action) {
  newState[action.removeFrom] = newState[action.removeFrom].filter(name => name !== action.name);
  newState.scene.remove(action.name);
  return newState;
}

export { init, up, remove };
