function init(newState, action) {
  return Object.assign({}, newState, { renderer: action.renderer });
}

function enableShadowMap(newState, action) {
  const renderer = newState.renderer;
  renderer.shadowMap.enabled = true;
  return Object.assign({}, newState, { renderer });
}

function resize(newState, action) {
  newState.renderer.setSize(
    newState.w * newState.zoom,
    newState.h * newState.zoom
  );
  return newState;
}

function attach(newState, action) {
  document.body.appendChild( newState.renderer.domElement );
  return newState;
}

function clear(newState, action) {
  newState.renderer.clear();
  return newState;
}

function render(newState, action) {
  newState.renderer.render(
    newState.scene,
    newState.cameras[newState.camera]
  );
  return newState;
}

export { init, enableShadowMap, resize, attach, clear, render};
