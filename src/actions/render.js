import store from '../store';

export const SET_RATIO = 'SET_RATIO';

export const setRatio = () => store.dispatch({ type: SET_RATIO });
export const clear = state => {
  state.renderer.clear();
}
export const render = state => {
  state.renderer.render( state.scene, state.camera );
}
