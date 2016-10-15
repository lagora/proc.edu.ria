import store from './store';
import { loop } from './actions';
import { init } from './actions/init';
// import {
//   setPosition as setCameraPosition,
// } from './actions/camera';


document.addEventListener("DOMContentLoaded", () => {
  console.info('DOMContentLoaded');
  store.dispatch(init());
  loop();
  // document.querySelector('canvas').addEventListener('mouseup', event => {
  //   const state = store.getState();
  //   const { x, y, z } = store.getState().camera.position;
  //   setCameraPosition(x, y, z);
  // });
});
