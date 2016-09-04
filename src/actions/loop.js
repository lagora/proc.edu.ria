import store from '../store';
import { update } from './update';
import { clear, render } from './render';


export const loop = () => {
  const state = store.getState();
  update();
  clear(state);
  window.requestAnimationFrame(loop);
  render(state);
}
