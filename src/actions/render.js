import store from '../store';
import { update } from './update';

export const SET_RATIO = 'SET_RATIO';

export const setRatio = () => store.dispatch({ type: SET_RATIO });
export const render = delta => {
  const state = store.getState();
  state.renderer.clear();
  requestAnimationFrame( update );
  state.renderer.render( state.scene, state.camera );
}
