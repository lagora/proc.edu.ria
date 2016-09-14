import store from './store';
import { init, loop } from './actions';
import {
  setPosition as setCameraPosition,
} from './actions/camera';


document.addEventListener("DOMContentLoaded", () => {
  init();
  loop();
  document.querySelector('canvas').addEventListener('mouseup', event => {
    const state = store.getState();
    const { x, y, z } = store.getState().camera.position;
    setCameraPosition(x, y, z);
  });
});
