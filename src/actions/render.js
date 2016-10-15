import store from '../store';

export const SET_RATIO = 'SET_RATIO';

export const setRatio = () => dispatch => dispatch({ type: SET_RATIO });
export const clear = state => {
  if (!state || !state.renderer) {
    return false;
  }
  state.renderer.clear();
}
export const render = state => {
  state.renderer.render( state.scene, state.camera );
}
