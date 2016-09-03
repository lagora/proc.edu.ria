// import THREE from 'three';
import store from './store';
import {
  init,
} from './actions';

const update = elapsed => {
}

const render = elapsed => {
  const state = store.getState();
  state.renderer.clear();
  state.renderer.render( state.scene, state.camera );
}

const loop = elapsed => {
  update(elapsed);
  window.requestAnimationFrame(loop);
  render(elapsed);
}


document.addEventListener("DOMContentLoaded", () => {
  init();
  loop();
});
