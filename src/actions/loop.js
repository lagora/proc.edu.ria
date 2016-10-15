import store from '../store';
import { update } from './update';
import { clear, render } from './render';


export const loop = elapsed => {
  const state = store.getState();
  if (state.renderer) {
    update(elapsed);
    clear(state);
    window.requestAnimationFrame(loop);
    render(state);
  }
}
